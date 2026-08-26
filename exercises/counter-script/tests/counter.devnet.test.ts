/**
 * On-chain lifecycle for the counter Type Script, against the local devnet.
 *
 * The mock tests prove the script logic in isolation. This one proves the same
 * rules hold when a real node is doing the verifying — including the case I most
 * wanted to see, which is the chain *refusing* a transaction that breaks the
 * rule. A script that only ever gets shown valid transactions has not been
 * tested.
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

describe('counter type script on devnet', () => {
  let client: ccc.Client;
  let signer: ccc.SignerCkbPrivateKey;
  let counterType: { codeHash: string; hashType: string; args: string };
  let cellDeps: CellDepLike[];
  let lock: { codeHash: string; hashType: string; args: string };

  /** Outpoint of the live counter Cell, updated as the lifecycle advances. */
  let live: { txHash: string; index: number };

  beforeAll(async () => {
    client = buildClient('devnet');
    signer = buildSigner(client);

    const jsVm = systemScripts.devnet['ckb_js_vm']!;
    const counterCode = scripts.devnet['counter.bc']!;

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
  }, 60_000);

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
    await client.waitTransaction(txHash);

    console.log(`created counter at 0 — tx ${txHash}`);
    live = { txHash, index: 0 };

    const cell = await client.getCell(live);
    expect(cell).toBeTruthy();
    expect(cell!.outputData).toBe(u64le(0n));
  }, 120_000);

  test('increments 0 -> 1', async () => {
    const tx = await buildTx(1n, live);
    const txHash = await signer.sendTransaction(tx);
    await client.waitTransaction(txHash);

    console.log(`incremented 0 -> 1 — tx ${txHash}`);
    live = { txHash, index: 0 };

    const cell = await client.getCell(live);
    expect(cell!.outputData).toBe(u64le(1n));
  }, 120_000);

  test('increments 1 -> 2', async () => {
    const tx = await buildTx(2n, live);
    const txHash = await signer.sendTransaction(tx);
    await client.waitTransaction(txHash);

    console.log(`incremented 1 -> 2 — tx ${txHash}`);
    live = { txHash, index: 0 };

    const cell = await client.getCell(live);
    expect(cell!.outputData).toBe(u64le(2n));
  }, 120_000);

  test('the chain refuses to skip from 2 to 4', async () => {
    // This is the test that matters. The transaction is well formed and properly
    // signed; the only thing wrong with it is that it breaks my rule. If the
    // node accepts this, the Type Script is not doing its job.
    const tx = await buildTx(4n, live);

    await expect(signer.sendTransaction(tx)).rejects.toThrow();
    console.log('chain rejected 2 -> 4, as it should');

    // and the counter is untouched
    const cell = await client.getCell(live);
    expect(cell!.outputData).toBe(u64le(2n));
  }, 120_000);

  test('the chain refuses to move the counter backwards', async () => {
    const tx = await buildTx(1n, live);
    await expect(signer.sendTransaction(tx)).rejects.toThrow();
    console.log('chain rejected 2 -> 1, as it should');
  }, 120_000);

  test('increments 2 -> 3 after the rejections, proving the Cell is still usable', async () => {
    const tx = await buildTx(3n, live);
    const txHash = await signer.sendTransaction(tx);
    await client.waitTransaction(txHash);

    console.log(`incremented 2 -> 3 — tx ${txHash}`);
    const cell = await client.getCell({ txHash, index: 0 });
    expect(cell!.outputData).toBe(u64le(3n));
  }, 120_000);
});
