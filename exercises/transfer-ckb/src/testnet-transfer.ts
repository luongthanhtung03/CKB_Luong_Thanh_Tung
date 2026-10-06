/**
 * Send CKB on public testnet, signed with my own key, and wait for it to commit.
 *
 * Same transfer as Week 1, but this time the result is on a public chain with an
 * explorer page anyone can open — not a devnet that `offckb clean` erases.
 *
 * Usage:
 *   npm run testnet:transfer -- <toAddress> [amountCkb]   # default 1000 CKB
 */

import { readFileSync } from "node:fs";
import { Address, ClientPublicTestnet, SignerCkbPrivateKey, Transaction, fixedPointFrom } from "@ckb-ccc/core";

function testnetKey(): string {
  const env = readFileSync(new URL("../.env", import.meta.url), "utf8");
  const key = env.match(/^TESTNET_PRIVATE_KEY=(0x[0-9a-f]{64})$/m)?.[1];
  if (!key) throw new Error("no TESTNET_PRIVATE_KEY in .env — run `npm run testnet:key` first");
  return key;
}

async function main(): Promise<void> {
  const [toAddress, amount = "1000"] = process.argv.slice(2);
  if (!toAddress) throw new Error("usage: npm run testnet:transfer -- <toAddress> [amountCkb]");

  const client = new ClientPublicTestnet();
  const signer = new SignerCkbPrivateKey(client, testnetKey());
  const from = await signer.getRecommendedAddress();
  const { script: toLock } = await Address.fromString(toAddress, client);

  console.log(`from    : ${from}`);
  console.log(`to      : ${toAddress}`);
  console.log(`amount  : ${amount} CKB`);
  console.log(`balance : ${(await signer.getBalance()) / 100_000_000n} CKB (before)`);

  // Declare only the output I care about; CCC collects inputs to cover it,
  // adds my change output, and sets the fee from the fee rate.
  const tx = Transaction.from({
    outputs: [{ lock: toLock, capacity: fixedPointFrom(amount) }],
  });
  await tx.completeInputsByCapacity(signer);
  await tx.completeFeeBy(signer); // default fee rate, change back to me

  const txHash = await signer.sendTransaction(tx);
  console.log(`\ntx hash : ${txHash}`);
  console.log(`explorer: https://testnet.explorer.nervos.org/transaction/${txHash}`);

  process.stdout.write("waiting for commit");
  for (let i = 0; i < 120; i++) {
    const res = await client.getTransaction(txHash);
    if (res?.status === "committed") {
      console.log(`\nstatus  : committed in block ${res.blockNumber}`);
      return;
    }
    process.stdout.write(".");
    await new Promise((r) => setTimeout(r, 5_000));
  }
  console.log("\nstill not committed after 10 minutes — check the explorer link above");
}

// The public-RPC client keeps a connection open, so Node never exits on its own.
main().then(() => process.exit(0)).catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
