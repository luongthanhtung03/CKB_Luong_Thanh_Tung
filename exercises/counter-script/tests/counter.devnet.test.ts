/**
 * On-chain lifecycle for the counter Type Script, against the local devnet —
 * or public testnet with CKB_NETWORK=testnet (Week 1.5), where the same six
 * steps leave transactions anyone can open on the explorer.
 *
 * The mock tests prove the script logic in isolation. This one proves the same
 * rules hold when a real node is doing the verifying — including the case I most
 * wanted to see, which is the chain *refusing* a transaction that breaks the
 * rule. A script that only ever gets shown valid transactions has not been
 * tested.
 *
 * Testnet: PRIVATE_KEY must hold a funded testnet key, and the counter must be
 * deployed there (`npm run deploy -- --network testnet`).
 *
 * Requires: offckb node running, and `npm run deploy` already done so that
 * deployment/scripts.json points at the deployed code.
 */

import { hexFrom, ccc, hashTypeToBytes, type CellDepLike } from '@ckb-ccc/core';
import scripts from '../deployment/scripts.json';
import systemScripts from '../deployment/system-scripts.json';
import { buildClient, buildSigner } from './helper';

/** A u64 as 8 little-endian bytes, matching what the script reads. */
function u64le(value: bigint): `0x${string}` {
  const buf = new ArrayBuffer(8);
  new DataView(buf).setBigUint64(0, value, true);
  return hexFrom(new Uint8Array(buf));
}

type Network = 'devnet' | 'testnet';
const NETWORK: Network = process.env.CKB_NETWORK === 'testnet' ? 'testnet' : 'devnet';

/** Testnet commits a block every ~8s rather than on demand, so allow longer. */
const STEP_TIMEOUT = NETWORK === 'testnet' ? 300_000 : 120_000;
/** CCC's default wait is 60s; one slow testnet block exceeds it and every later step then reads a stale Cell. */
const COMMIT_TIMEOUT = STEP_TIMEOUT - 30_000;

type Deployed = (typeof scripts.devnet)['counter.bc'];

/** `MustIncrementByOne` in contracts/counter/src/index.ts. */
const MUST_INCREMENT_BY_ONE = 12;

/**
 * "It threw" is not enough — a rejection for low capacity or a bad signature
 * would pass too. Require the node's verdict to name my Script's own exit code.
 */
async function expectRejectedWithCode(send: Promise<unknown>, code: number) {
  const err = await send.then(
    () => { throw new Error('transaction was accepted'); },
    (e: unknown) => e,
  );
  const message = err instanceof Error ? err.message : String(err);
  expect(message).toMatch(new RegExp(`ValidationFailure.*error code ${code}(?!\\d)`, 's'));
  return message.match(/ValidationFailure[^,)]*/)?.[0] ?? message;
}

describe(`counter type script on ${NETWORK}`, () => {
  let client: ccc.Client;
  let signer: ccc.SignerCkbPrivateKey;
  let counterType: { codeHash: string; hashType: string; args: string };
  let cellDeps: CellDepLike[];
  let lock: { codeHash: string; hashType: string; args: string };

  /** Outpoint of the live counter Cell, updated as the lifecycle advances. */
  let live: { txHash: string; index: number };

  beforeAll(async () => {
    // The template's testnet client expects a local offckb proxy; go to the public RPC directly.
    client = NETWORK === 'testnet' ? new ccc.ClientPublicTestnet() : buildClient('devnet');
    signer = buildSigner(client);

    const jsVm = systemScripts[NETWORK]['ckb_js_vm']!;
    const counterCode = (scripts as Record<Network, Record<string, Deployed>>)[NETWORK]['counter.bc'];
    if (!counterCode) throw new Error(`counter.bc is not deployed on ${NETWORK} — see deployment/scripts.json`);

    // ckb-js-vm is the on-chain Script; my bytecode is selected via its args.
    counterType = {
      codeHash: jsVm.script.codeHash,
      hashType: jsVm.script.hashType,
      args: hexFrom(
        '0x0000' +
          counterCode.codeHash.slice(2) +
          hexFrom(hashTypeToBytes(counterCode.hashType)).slice(2) +
          '0000000000000000000000000000000000000000000000000000000000000000',
      ),
    };

    cellDeps = [
      ...jsVm.script.cellDeps.map((c) => c.cellDep),
      ...counterCode.cellDeps.map((c) => c.cellDep),
    ];

    const signerLock = (await signer.getRecommendedAddressObj()).script;
    lock = {
      codeHash: signerLock.codeHash,
      hashType: signerLock.hashType,
      args: signerLock.args,
    };
  }, STEP_TIMEOUT);

  /** Build a transaction that moves the counter to `next`, consuming `from` if given. */
  async function buildTx(next: bigint, from?: { txHash: string; index: number }) {
    const tx = ccc.Transaction.from({
      inputs: from ? [{ previousOutput: from }] : [],
      outputs: [{ lock, type: counterType }],
      outputsData: [u64le(next)],
      cellDeps,
    });
    await tx.completeInputsByCapacity(signer);
    await tx.completeFeeBy(signer, 1000);
    return tx;
  }

  test('creates a counter at 0', async () => {
    const tx = await buildTx(0n);
    const txHash = await signer.sendTransaction(tx);
    await client.waitTransaction(txHash, 0, COMMIT_TIMEOUT);

    console.log(`created counter at 0 — tx ${txHash}`);
    live = { txHash, index: 0 };

    const cell = await client.getCell(live);
    expect(cell).toBeTruthy();
    expect(cell!.outputData).toBe(u64le(0n));
  }, STEP_TIMEOUT);

  test('increments 0 -> 1', async () => {
    const tx = await buildTx(1n, live);
    const txHash = await signer.sendTransaction(tx);
    await client.waitTransaction(txHash, 0, COMMIT_TIMEOUT);

    console.log(`incremented 0 -> 1 — tx ${txHash}`);
    live = { txHash, index: 0 };

    const cell = await client.getCell(live);
    expect(cell!.outputData).toBe(u64le(1n));
  }, STEP_TIMEOUT);

  test('increments 1 -> 2', async () => {
    const tx = await buildTx(2n, live);
    const txHash = await signer.sendTransaction(tx);
    await client.waitTransaction(txHash, 0, COMMIT_TIMEOUT);

    console.log(`incremented 1 -> 2 — tx ${txHash}`);
    live = { txHash, index: 0 };

    const cell = await client.getCell(live);
    expect(cell!.outputData).toBe(u64le(2n));
  }, STEP_TIMEOUT);

  test('the chain refuses to skip from 2 to 4', async () => {
    // This is the test that matters. The transaction is well formed and properly
    // signed; the only thing wrong with it is that it breaks my rule. If the
    // node accepts this, the Type Script is not doing its job.
    const tx = await buildTx(4n, live);

    const verdict = await expectRejectedWithCode(signer.sendTransaction(tx), MUST_INCREMENT_BY_ONE);
    console.log(`chain rejected 2 -> 4, as it should: ${verdict}`);

    // and the counter is untouched
    const cell = await client.getCell(live);
    expect(cell!.outputData).toBe(u64le(2n));
  }, STEP_TIMEOUT);

  test('the chain refuses to move the counter backwards', async () => {
    const tx = await buildTx(1n, live);
    const verdict = await expectRejectedWithCode(signer.sendTransaction(tx), MUST_INCREMENT_BY_ONE);
    console.log(`chain rejected 2 -> 1, as it should: ${verdict}`);
  }, STEP_TIMEOUT);

  test('increments 2 -> 3 after the rejections, proving the Cell is still usable', async () => {
    const tx = await buildTx(3n, live);
    const txHash = await signer.sendTransaction(tx);
    await client.waitTransaction(txHash, 0, COMMIT_TIMEOUT);

    console.log(`incremented 2 -> 3 — tx ${txHash}`);
    const cell = await client.getCell({ txHash, index: 0 });
    expect(cell!.outputData).toBe(u64le(3n));
  }, STEP_TIMEOUT);
});
