# Fact sheet — Week 4

Raw material for the weekly report. Facts and links only; the report itself is
written in my own words from this.

**Period:** 2026-10-18 to 2026-10-24, plus the session of Mon 26 Oct evening to
Tue 27 Oct just after midnight (stated separately: the re-plan and the new work
happened then, before this report was written).

- Sun 18 Oct: docs commits in both projects.
- Tue 20 Oct: the Week 3 report.
- Wed 21 to Sat 24 Oct: no commits.
- Mon 26 Oct 23:14 to Tue 27 Oct 00:04 (commit times): re-plan, v1.0, subscriptions, flamegraphs, wallet matrix.

## Commits

| Repository | When | Commits | Range / what |
|---|---|---|---|
| ckb-session-kit | Sun 18 Oct | 1 | `7c08956` WALKTHROUGH.md + README "Limits" |
| ckb-cycle-tools | Sun 18 Oct | 1 | `dfcb310` README "Limits" |
| CKB_Luong_Thanh_Tung | Tue 20 Oct | 1 | `dd8b4d7` Week 3 report |
| CKB_Luong_Thanh_Tung | 26 Oct | 1 | `57acb44` PLAN.md: Weeks 5-12 re-planned |
| ckb-session-kit | 26-27 Oct | 13 | `04ba670..cf6a0d5` |
| ckb-cycle-tools | 26-27 Oct | 6 | `e0c2af3..ade8cb6` (4 by a builder agent on a branch, reviewed and merged) |

## What was built

**18 Oct (Week 4 proper)**
- Demo walkthrough of every session-kit page (script for a recorded demo); "Limits" in both READMEs.

**26-27 Oct**
- PLAN.md re-planned: subscriptions, flamegraphs, adoption (npm v1.0, Action on another repo,
  wallet table), upstream issues, Spark then DAO.
- Both packages at 1.0.0 + CHANGELOG; clean-install pack check passes. npm publish is my step.
- **Subscriptions** (session kit), no lock change:
  - design doc; 6 CKB-VM tests on the deployed binary (charge after a period ok; 14, 12, 13, 17 refused; cancel alone)
  - adversarial design review → opening pays the first period, access follows payments
    (`paidThroughBlock`), account id committed (hashed) under the subscriber's signature
  - code review → one payment must cover every subscription it creates; charges merge all mature cells;
    lookups capped and failing closed
  - library: open / charge / cancel / verify / status (stateless server check) / blocksForSeconds
  - demo `/subscribe` + `/api/subscription` + `/api/subscription/charge` (needs CHARGER_KEY on Vercel)
  - a charge costs the lock 20,999 cycles
- **Wallet matrix** (`npm run matrix:wallets`): session open / pay / sweep / key back / subscribe / cancel with
  each owner lock, signed as that wallet signs. secp256k1, Omnilock-BTC (UniSat), Omnilock-Doge, Nostr: all pass.
  Omnilock-EVM (MetaMask, OKX EVM) was **refused by our own owner-lock allowlist** (auth flag 0x12 missing):
  fixed `cf6a0d5`; EVM row re-run passed all 6 steps.
- **Flamegraphs** (cycle tools): `ckb-cycles flame` (SVG + folded stacks + costliest functions; `--bin` unstripped
  build checked against the deployed binary's cycles). On a real charge: lock 20,999 cycles, top cost `lock_hash`.
  Then, in the PR cycle report: cycles.json `symbols` + `functions`, the PR comment lists which functions changed.
- **Token subscriptions** (27 Oct, builder agent branch, reviewed + merged): xUDT price, CKB max_per_tx 0;
  6 CKB-VM tests with the real xUDT; smoke:subscription-token on testnet: open, 14 and 12 refused, 2 charges,
  cancel ([charge 1](https://testnet.explorer.nervos.org/transaction/0x7aa3872fec7e32e5b1f4e719d034a0d7310f717aa128642a1bfb2d252efceb6d)).
- Tests: session-kit 343, cycle-tools 155.
- Both demos: Next.js 16.4.0 → 16.4.3 (critical advisory GHSA-2464-fhr4-w9xw). Pushed 27 Oct, CI green.
- Drafts (not posted): Spark application for cycle tools, 8 upstream issue drafts (offckb, ckb-testtool,
  ckb-standalone-debugger, CCC).

## External evidence

| Kind | What | Link |
|---|---|---|
| Testnet | Subscription opened, first period paid | [0x383242a3…](https://testnet.explorer.nervos.org/transaction/0x383242a3bf89ae8007fc8fc4f7ec04420718c2e32590bdbbd445bcf4c4e2a1b9) |
| Testnet | Charge 1 / charge 2 | [0xf98e36b2…](https://testnet.explorer.nervos.org/transaction/0xf98e36b2f5ef1bb86875fb0989e32f25f67807bc95e34aa273b497db5eebdb16) · [0x930beb93…](https://testnet.explorer.nervos.org/transaction/0x930beb93436c884f679f691a901eec1db4742fd69cd28e8d63b4eb386de260e0) |
| Testnet rejection | Early charge, error 14 | drafts/smoke-subscription-v2.log |
| Testnet | Cancelled by the subscriber, 153 CKB back | [0x235c9d2e…](https://testnet.explorer.nervos.org/transaction/0x235c9d2e4fc2205fa552c144890002f611c362402b62ceb1dc8540160c459c4f) |
| Testnet | Wallet matrix, 4 owner locks x 6 steps | drafts/wallet-matrix.log (table) |
| CI run | green, both | [session-kit](https://github.com/luongthanhtung03/ckb-session-kit/actions/runs/40401082471) · [cycle-tools](https://github.com/luongthanhtung03/ckb-cycle-tools/actions/runs/40401590474) |
| Deployed URL | /subscribe live; inspector draws .folded flamegraphs | https://ckb-session-kit.vercel.app/subscribe · https://ckb-cycle-tools.vercel.app/ |
| Issue / PR / forum post elsewhere | none yet (drafts ready) | |

## Problems hit

- Design let the first period be free and the period be reset; found by review before testnet, fixed in the library.
- One payment could renew several subscriptions; found by code review, fixed.
- Account id was written on-chain in clear; now hashed.
- MetaMask owners refused by our own allowlist (Omnilock 0x12); found by the wallet matrix, fixed.
- Testnet blocks slowed to minutes; script moved to HTTP RPC, waits up to an hour, resumes.
- Stripped binaries profile as one frame, and Rust names contain `;`; unstripped build checked by cycles, bracket-aware split.

## Hours

| Sun 18 | Mon 19 | Tue 20 | Wed 21 | Thu 22 | Fri 23 | Sat 24 | Mon 26 |
|---|---|---|---|---|---|---|---|
| | | | | | | | |

## Pair programming

Claude Code (with background agents for the reviews, the drafts and one builder branch) wrote the
re-plan draft, release prep, subscriptions design/tests/library/demo, the wallet matrix, flamegraphs,
and ran the testnet scripts. I chose the four directions for Weeks 5-12 and approved the plan.
