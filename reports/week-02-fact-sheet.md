# Fact sheet — Week 2

Raw material for the weekly report. Facts and links only; the report itself is
written in my own words from this.

**Period:** 2026-10-05 to 2026-10-10

Almost all of the code below was committed on **Thursday 8 Oct**, in one long
session; device-loss recovery, server-verified unlocks and failure-path profiling
on **Friday 9 Oct**.
The 6 Oct commits in this repository are Week 1.5 work, already reported.

## Commits

| Repository | Commits | Range |
|---|---|---|
| ckb-session-kit | 15 | `fe30dbc..fdd27b4` |
| ckb-cycle-tools | 12 | `15be97d..2cbd14c` |
| CKB_Luong_Thanh_Tung | 2 | `cb1940b..134ce25` |

### What they add up to

**ckb-session-kit**: browser session keys with an on-chain spending scope.
- Session key created and kept in the browser (IndexedDB); spending scope checked before anything is signed.
- **Session lock**, a CKB lock script in Rust: the owner can do anything; the session key can spend only within a per-transaction limit, an optional single recipient and an optional rate limit. No cryptography in the script (it delegates to the standard locks): 4.3 KB, about 12,900 cycles.
- Deployed on testnet; every rule tested against the real network.
- Library API: `openSession` (wallet signs once) → `spendInSession` (no wallet) → `closeSession` (wallet signs once).
- Wallet demo on Vercel (CCC connector: JoyID, MetaMask, …).
- **Pay-per-read** example: 1 CKB payments into a creator's anyone-can-pay cell, signed by a session key that can pay nobody else. Second demo page `/read`.
- **Device-loss recovery**: the owner's wallet alone finds every session it opened (indexer prefix search on the lock args) and sweeps them back in one transaction; a planted decoy cell cannot block it. Recover panel on the demo.
- **Server-verified unlocks**: each payment names its article in a memo the session key signs; the server releases the text only after checking on-chain that this key paid for that article. No database. Article text no longer in the page.
- 22 tests run the lock in the real CKB-VM (57 tests in total); ready for npm, proven by a clean-install check in CI.

**ckb-cycle-tools**: cycle measurement for CKB scripts.
- Windows fix: finds the real `ckb-debugger` behind offckb's `.cmd` shim.
- Web inspector on Vercel: total cycles and script groups for any testnet transaction.
- `ckb-cycles` CLI: replays a transaction in ckb-debugger per script group; the groups add up to exactly the node's total (checked in CI against live testnet transactions).
- Benchmark: the same session lock in Rust and in TypeScript on ckb-js-vm, 20 scenarios, same decisions. Rust ≈ 12,300 cycles per accepted spend, ckb-js-vm ≈ 14.6M, of which ≈ 13.9M is VM start-up. Rebuilt and rerun in CI.
- **Failure-path profiling**: `ckb-cycles --file tx.json` profiles a transaction that is not on chain (about to be sent, or rejected) and shows which script refuses it and why. CI replays a real session-lock spend edited to overspend by one shannon and requires the lock's refusal code 12.
- Ready for npm, same clean-install check.

**CKB_Luong_Thanh_Tung**: plan switched to build-first on the two projects; Fiber example replaced by pay-per-read (overlaps FiberLatch, already funded).

## External evidence

| Kind | What | Link |
|---|---|---|
| Testnet transaction | Session lock deployed | [0xab2e…43d2](https://testnet.explorer.nervos.org/transaction/0xab2e69b8b97c15bddeb80954edd6d33befcd2fe9e4243377a46f14a3e1c343d2) |
| Testnet transaction | Session key spends exactly the limit, no owner signature | [0x48b3…e828](https://testnet.explorer.nervos.org/transaction/0x48b3bde2a50bb8ba3aff0800e850b2aa521793b35628d165eab7f22f984be828) |
| Testnet transaction | Rate-limited cell accepted once mature | [0xd203…58cb](https://testnet.explorer.nervos.org/transaction/0xd2038582a6099ede9e1b906f257509ca0a50ec9a7aba2c12e39b519319b458cb) |
| Testnet transaction | Library flow: open (owner signs once) | [0x5835…b2b8](https://testnet.explorer.nervos.org/transaction/0x5835048d4226f0b74be01cd79664d7e4dce67ea8aa77bb9d3468e896d27bf2b8) |
| Testnet transaction | Library flow: pay 100 CKB, session key only | [0x9448…5c77](https://testnet.explorer.nervos.org/transaction/0x9448e354252d71913d18fda2ba6d2460e1d78c2c0e4123eb8068482d7ec05c77) |
| Testnet transaction | Pay-per-read: 1 CKB read, session key only | [0x2dc6…81bf](https://testnet.explorer.nervos.org/transaction/0x2dc6b584b5e136507745385a5b829fd314838acd1e3e630a7a91d120641281bf) |
| Testnet transaction | Pay-per-read: session swept back on close | [0x8dc5…09cf5](https://testnet.explorer.nervos.org/transaction/0x8dc5260ebfb232939cff48570610d61d620d2c727675ec2498be956458309cf5) |
| Testnet transaction | Recovery: keys dropped, one owner transaction sweeps every session back | [0x4efd…eaf](https://testnet.explorer.nervos.org/transaction/0x4efd8b7875c8a0f2883ac2b21ed509ff86c72012e6f4a24816783aa25e02eeaf) |
| Testnet transaction | Server-verified read: route released the article to the payer only | [0x5aee…6942](https://testnet.explorer.nervos.org/transaction/0x5aeeb65326efb1ff2d651ba22f5a685c224162e974b51ceb9638f6576d056942) |
| Testnet transaction | All links, with the rejected cases | READMEs of [ckb-session-kit](https://github.com/luongthanhtung03/ckb-session-kit#readme) and [ckb-cycle-tools](https://github.com/luongthanhtung03/ckb-cycle-tools#readme) |
| CI run | ckb-session-kit: tests on Linux + Windows, lock built and tested in CKB-VM, clean install | [run 37874631590](https://github.com/luongthanhtung03/ckb-session-kit/actions/runs/37874631590) |
| CI run | ckb-cycle-tools: tests, live testnet profile, failure-path replay, Rust vs ckb-js-vm benchmark, clean install | [run 37875175616](https://github.com/luongthanhtung03/ckb-cycle-tools/actions/runs/37875175616) |
| Deployed URL | Session demo (wallet) | https://ckb-session-kit.vercel.app/ |
| Deployed URL | Pay-per-read | https://ckb-session-kit.vercel.app/read |
| Deployed URL | Transaction inspector | https://ckb-cycle-tools.vercel.app/ |
| Issue / PR / forum post elsewhere | none yet: the two CKBuilder-projects issues are drafted in `drafts/ckbuilder-projects-issues.md`, not posted | — |

## Screenshots

- None taken yet. Worth taking before writing: `/` with an open session, `/read`
  after an unlock, the inspector on a session-lock transaction, a green CI run.
  Save under `screenshots/week-02/`.

## Problems hit

- **Windows `.cmd` shim.** ckb-testtool spawns `ckb-debugger` by bare name; on
  Windows offckb installs it as a `.cmd` shim that such a spawn cannot see. Fix:
  resolve the real executable (ckb-cycle-tools `resolveDebugger`).
- **CCC silently raises small outputs.** An output below its occupied capacity is
  raised without warning: a session-lock cell needs 121 CKB (153 with a
  recipient). The library now checks and throws a clear error instead.
- **Expiry cannot be enforced on-chain.** `since` only proves time has passed,
  never that it has not. Expiry stays in the browser; the on-chain limits are
  outflow, recipient and rate.
- **Type ID cannot run in ckb-debugger.** It is built into the node. The CLI
  charges its fixed 1,000,000 cycles and the totals still match the node exactly.
- **Benchmark CI failed on Linux.** esbuild's `bin/esbuild` is a native binary on
  Linux, so `node bin/esbuild` failed. Fix: esbuild's JS API.
- **1 CKB payments.** A new cell needs at least 61 CKB. Fix: pay into the
  creator's anyone-can-pay cell (top-up), which the session lock already allowed.
- **Fiber dropped.** A session cell cannot fund a Fiber channel directly (the
  lock needs the key cell in the same transaction), and Fiber pay-per-use
  overlaps FiberLatch, already funded. Replaced by pay-per-read.
- **Recovering without the key.** The session cells' lock args contain the lost
  key's hash, so they cannot be looked up directly. They begin with the owner's
  lock hash, so a prefix search finds them; cells with malformed args are
  filtered, because the lock rejects them even for the owner.
- **Proving who paid, with no database.** A payment hash is public, so it cannot
  be the proof by itself. The payment carries a memo in the witness the session
  key signs, and the claim is signed by the same key; the server checks both on
  the chain.
- **Demo framework.** The demo was first built with Vite, against the agreed
  Next.js; switched to Next.js the same day.

## Hours

| Mon | Tue | Wed | Thu | Fri | Sat |
|---|---|---|---|---|---|
| | | | | | |

*(to fill in)*

## Pair programming

Claude Code (Claude Opus 5.5) wrote nearly all of this week's code, tests,
scripts and README text, ran the testnet transactions with my testnet key, and
watched CI. Every commit carries the `Co-Authored-By: Claude` line.

What I decided: build-first on two projects instead of learn-then-build; Next.js
demos on Vercel; the terminal look of both demos; the session-lock design
(delegation to standard locks, on-chain limits, expiry off-chain); dropping Fiber
because it overlaps a funded project; "keep building" past the week plan. I set
up the Vercel projects.

*(Add what you did yourself and what you studied from the code.)*

Still to do by me: test both demo pages with a real wallet (JoyID); post the two
CKBuilder-projects issues; publish both packages to npm.
