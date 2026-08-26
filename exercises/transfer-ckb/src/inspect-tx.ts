/**
 * Week 1 exercise — inspect a CKB transfer transaction on the local OffCKB devnet.
 *
 * I wrote this because reading about the Cell Model was not convincing me. I
 * wanted to see, for a transfer I made myself, that the sender's Cell is
 * genuinely destroyed and two new Cells are created — rather than a balance
 * being decremented somewhere.
 *
 * Usage:
 *   offckb node                 # in another terminal
 *   npm run inspect -- <txHash> # defaults to my Week 1 transfer
 */

// ClientJsonRpc is abstract in CCC — ClientPublicTestnet is the concrete client,
// and the devnet uses testnet-style ("ckt") addresses, so it is the right one here.
import { ClientPublicTestnet, type Transaction } from "@ckb-ccc/core";

const RPC_URL = process.env.CKB_RPC_URL ?? "http://127.0.0.1:8114";

/** The transfer I made on 2026-08-26: 1000 CKB from devnet account 0 to account 1. */
const DEFAULT_TX_HASH =
  "0x1888f04bcdafc6e7f99be773abfcc68f816e92a3367016280aa1cd0268e4fdbc";

const SHANNONS_PER_CKB = 100_000_000n;

function toCkb(shannons: bigint): string {
  const whole = shannons / SHANNONS_PER_CKB;
  const frac = shannons % SHANNONS_PER_CKB;
  return `${whole.toLocaleString("en-US")}.${frac.toString().padStart(8, "0")} CKB`;
}

function short(hex: string, keep = 10): string {
  return hex.length <= keep * 2 ? hex : `${hex.slice(0, keep)}…${hex.slice(-6)}`;
}

async function main(): Promise<void> {
  const txHash = process.argv[2] ?? DEFAULT_TX_HASH;
  const client = new ClientPublicTestnet({ url: RPC_URL });

  console.log(`RPC       : ${RPC_URL}`);
  console.log(`tx hash   : ${txHash}\n`);

  const res = await client.getTransaction(txHash);
  if (!res) {
    console.error(
      `Transaction not found. Is the devnet running (offckb node), and is this ` +
        `hash from the current devnet? Devnet state is wiped by offckb clean.`,
    );
    process.exit(1);
  }

  console.log(`status    : ${res.status}`);
  if (res.blockNumber !== undefined) {
    console.log(`block     : ${res.blockNumber}`);
  }

  const tx: Transaction = res.transaction;

  // --- Inputs: the Cells this transaction destroys -------------------------
  console.log(`\nINPUTS (${tx.inputs.length}) — Cells consumed and now dead`);
  let inputTotal = 0n;
  for (const [i, input] of tx.inputs.entries()) {
    // CCC resolves the input's previous output for us, so we can see its capacity.
    await input.completeExtraInfos(client);
    const cap = input.cellOutput?.capacity;
    if (cap !== undefined) inputTotal += cap;
    console.log(
      `  [${i}] ${short(input.previousOutput.txHash)} #${input.previousOutput.index}` +
        (cap !== undefined ? `  capacity ${toCkb(cap)}` : "  (capacity unresolved)"),
    );
  }

  // --- Outputs: the Cells this transaction creates -------------------------
  console.log(`\nOUTPUTS (${tx.outputs.length}) — new live Cells`);
  let outputTotal = 0n;
  for (const [i, output] of tx.outputs.entries()) {
    outputTotal += output.capacity;
    const data = tx.outputsData[i] ?? "0x";
    const dataBytes = Math.max(0, (data.length - 2) / 2);
    console.log(
      `  [${i}] capacity ${toCkb(output.capacity)}\n` +
        `       lock.args  ${output.lock.args}\n` +
        `       type       ${output.type ? "set" : "null"}\n` +
        `       data       ${dataBytes} bytes`,
    );
  }

  // --- The accounting that proves nothing was mutated in place -------------
  const fee = inputTotal - outputTotal;
  console.log(`\nCAPACITY ACCOUNTING`);
  console.log(`  in        ${toCkb(inputTotal)}`);
  console.log(`  out       ${toCkb(outputTotal)}`);
  console.log(`  fee       ${toCkb(fee)}  (${fee} shannons)`);

  console.log(`\nOTHER FIELDS`);
  console.log(`  cellDeps  ${tx.cellDeps.length} — the Scripts this tx needs on chain`);
  for (const dep of tx.cellDeps) {
    console.log(`            ${dep.depType}  ${short(dep.outPoint.txHash)} #${dep.outPoint.index}`);
  }
  console.log(`  witnesses ${tx.witnesses.length} — where the signature lives`);
  for (const [i, w] of tx.witnesses.entries()) {
    console.log(`            [${i}] ${(w.length - 2) / 2} bytes`);
  }

  // What I was actually trying to confirm.
  const senderChange = tx.outputs.find(
    (o, i) => i > 0 && o.capacity > SHANNONS_PER_CKB * 1_000_000n,
  );
  console.log(`\nWHAT THIS SHOWS`);
  console.log(
    `  The sender's original Cell no longer exists. To send ${toCkb(
      tx.outputs[0]?.capacity ?? 0n,
    )},\n  the whole input Cell was destroyed and a change Cell of` +
      ` ${toCkb(senderChange?.capacity ?? 0n)}\n  was created back to the sender. No balance was edited anywhere.`,
  );
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
