/**
 * Create (once) the private key I use on public testnet, and print its address.
 *
 * The key lives in `.env` next to this package — gitignored at the repo root —
 * and is never printed. Running this again only reads the existing key, so the
 * address stays stable across runs.
 *
 * Usage:
 *   npm run testnet:key
 */

import { randomBytes } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { ClientPublicTestnet, SignerCkbPrivateKey, hexFrom } from "@ckb-ccc/core";

const ENV_FILE = new URL("../.env", import.meta.url);

function loadOrCreateKey(): { key: string; created: boolean } {
  if (existsSync(ENV_FILE)) {
    const match = readFileSync(ENV_FILE, "utf8").match(/^TESTNET_PRIVATE_KEY=(0x[0-9a-f]{64})$/m);
    if (match?.[1]) return { key: match[1], created: false };
  }
  // A real CSPRNG — not Math.random, which is what a faucet helper might reach for.
  const key = hexFrom(randomBytes(32));
  writeFileSync(
    ENV_FILE,
    `# Public TESTNET key only. Never put mainnet funds behind it. Gitignored.\nTESTNET_PRIVATE_KEY=${key}\n`,
    { flag: "a" },
  );
  return { key, created: true };
}

async function main(): Promise<void> {
  const { key, created } = loadOrCreateKey();
  const signer = new SignerCkbPrivateKey(new ClientPublicTestnet(), key);
  const address = await signer.getRecommendedAddress();
  console.log(created ? "created a new testnet key in .env" : "using the existing key in .env");
  console.log(`address : ${address}`);
  console.log(`explorer: https://testnet.explorer.nervos.org/address/${address}`);
}

// The public-RPC client keeps a connection open, so Node never exits on its own.
main().then(() => process.exit(0)).catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
