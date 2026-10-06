# Scratch log

Append-only. One line per session, dated. This is raw material for the weekly
reports, not a report itself.

## 2026-08-26

- Read the CKBuilder Handbook end to end. The reporting standards are the part I
  need to get right: one report a week, contemporaneous, on GitHub, with evidence.
- Set up this repository: `reports/`, `notes/`, `evidence/`, `screenshots/`,
  `exercises/`.
- Wrote `PLAN.md` — eight weeks, Tuesday as report day.
- Checked toolchain: node v22.16.0, npm 10.9.2, git 2.49.0.
- Checked the npm package before installing globally. `offckb` is a placeholder
  package by someone else; the real one is `@offckb/cli`. Wrote it up in
  `notes/findings/`.
- Installed `@offckb/cli` 0.4.13. `offckb node` downloaded CKB 0.208.0 and
  started a devnet. It prints a scary-looking MODULE_NOT_FOUND during CPU
  detection but works fine — also written up.
- Devnet RPC up at 127.0.0.1:8114, tip advancing.
- Transferred 1000 CKB, account 0 -> account 1.
  tx 0x1888f04bcdafc6e7f99be773abfcc68f816e92a3367016280aa1cd0268e4fdbc,
  committed in block 16.
- Wrote `exercises/transfer-ckb/src/inspect-tx.ts` in TypeScript with CCC to read
  the tx back. Hit TS2511 — `ClientJsonRpc` is abstract, use
  `ClientPublicTestnet({url})`.
- Then hit my own precision bug: formatting capacity via `number` rounded
  41,998,999.99999536 to 41,999,000 and made the fee look like zero. bigint all
  the way through. This was the useful mistake of the day.
- Wrote `notes/transaction-anatomy.md`. The Cell Model checks out — the input
  Cell is genuinely destroyed, the change is a new Cell, and there is no fee
  field at all.
- Took four screenshots for evidence: devnet status TUI, both balances after the
  transfer, the inspector output, and the typecheck.
- Then ran `npx tsc --noEmit` from the repo root by mistake and npx installed a
  registry package called `tsc` — the exact hazard I had written up for `offckb`
  an hour earlier. Turns out whoever owns `tsc` keeps it purely as a signpost
  pointing at `typescript`. That is the precedent for the fix I was suggesting
  for offckb, so my own mistake made the finding stronger. Use
  `npm run typecheck`, never `npx tsc`.
- Still no confirmation on my application. Publishing anyway, same day as the
  work, since I was told I could begin the first steps of the guidance.
- Next: redo both tutorials on testnet with the faucet so I have public explorer
  links; extend the inspector to decode `outputs_data`; send the OffCKB findings
  to DevRel.

## 2026-10-06

- Testnet at last. Key generated into a gitignored `.env`; funded from the faucet
  with `offckb deposit --network testnet`. First transfer:
  0xb7855e7e43c2c716afef2bbf8e568c239927ac04794bf8e8b7b44470f29f3eea, block 22653473.
- Inspector against testnet broke twice: a cellbase gave a fee of `-569.-15772065`,
  and "change = the output over 1M CKB" was a devnet-only accident. Change is now
  found by lock.
- Counter Script deployed to testnet with Type ID:
  0xa21da18ff3f142127cf63d6e705d64c14577fb99a9a0cbf74f47fb70b6ad66cf.
  The devnet suite runs against it with `CKB_NETWORK=testnet` — 6/6, and the two
  refusals now have to carry my exit code 12, not just any error.
- One run failed 5/6: CCC's 60s `waitTransaction` default is shorter than a slow
  testnet block, and everything after the first timeout built on a stale Cell.
- Rust 1.99 + `riscv64imac-unknown-none-elf` (GNU host, no VS Build Tools).
  `exercises/rust-smoke`: 952-byte `no_std` Script, `Run result: 0`, 595 cycles.
- OffCKB findings re-checked — all four still stand. Drafted as three issues.
