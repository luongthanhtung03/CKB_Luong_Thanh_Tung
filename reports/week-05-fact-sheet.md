# Fact sheet - Week 5

Raw material for the weekly report. Facts and links only; the report itself is
written in my own words from this.

Running sheet: started Tue 27 Oct 2026, add to it through the week.

**Period:** 2026-10-26 to 2026-10-31 (Mon 26 to Sat 31 Oct).

Not counted here: the evening of Mon 26 Oct to early Tue 27 Oct (re-plan, v1.0,
subscriptions, token subscriptions, flamegraphs, wallet matrix). The Week 4 report
already covers that work, up to ckb-session-kit `c8d926a` and ckb-cycle-tools
`c18e673`. Week 5 starts with the first commit after those.

- Tue 27 Oct, morning (08:17 to 08:21): related work in both READMEs, plan follow-up.
- Tue 27 Oct, evening (18:45 to 19:08): benchmark refresh, then hardening in both projects.
- Tue 27 Oct, evening (19:42 to 20:04): the Action's security review fixes; the session lock's
  reproducible build check.
- Tue 27 Oct, night (22:31 to 22:44): push, CI, a Windows fix, npm publish of both 1.0.0 packages.
- Wed 28 Oct, night (01:19 to 03:04): third plan written (local); mainnet cycle atlas; daily demo
  smoke checks in both repos.
- Wed 28 Oct, evening (19:44 to 20:31): plan change after the programme manager's advice; ckb-testtool
  integration (mentor's suggestion on #46); security evidence report (asked for on #47).
- Wed 28 Oct, night (20:46 to 21:29): adversarial CKB-VM lock tests; error 13 refused on public testnet;
  ckb-script-templates end-to-end test; cross-version check across ckb-debugger releases; code review of
  both repos (20 findings).
- Fri 30 Oct, morning (11:01 to 11:39): all 20 review findings fixed with tests; push; CI green;
  replies posted on #46 and #47.
- Fri 30 Oct, afternoon to evening (12:14 to 19:30): cycle-tools 1.1.0 prepared; full security audit
  of both repos (round 1, 10 findings), each with a failing test, all fixed and pushed.
- Sat 31 Oct, night (00:46 to 02:35): audit round 2 (20 findings) from six angles, all fixed; push;
  CI green; cycle-tools 1.1.0 published on npm; new charger key on the live demo.
- Thu 29 Oct: no commits; the first scheduled demo smoke checks ran (green).

Times are local (UTC+7), as in the commit log.

> **Push state (27 Oct, 22:44).** Everything is pushed: ckb-session-kit `817ec57`,
> ckb-cycle-tools `46b3542`. CI green on the release commits (session-kit run 40531788757 at
> `6c2188d`, cycle-tools run 40532566433 at `d978ba7`). Both packages are on npm as 1.0.0.
> CKB_Luong_Thanh_Tung is pushed (`30f7c9d`); the Week 4 report and fact sheet are
> still uncommitted there.

> **Push state:** all three repos pushed 28 Oct evening (cycle-tools `f9a49ac`, session-kit `cbad3cb`, CKB_Luong_Thanh_Tung `86c0175`).

> **Push state (30 Oct, 11:39).** Everything is pushed: ckb-session-kit `e28846d`, ckb-cycle-tools `9b81f0b`.
> CI green on both heads: session-kit run 41003788996, cycle-tools run 41004147044.

> **Push state (31 Oct, end of week).** Everything is pushed: ckb-session-kit `f51f07c`,
> ckb-cycle-tools `3127518`, CKB_Luong_Thanh_Tung `86c0175`. CI green on both heads
> (session-kit run 41116458634, cycle-tools run 41115025747). npm: ckb-session-kit 1.0.0,
> ckb-cycle-tools 1.1.0.

## Commits

| Repository | When | Commits | Range / what | Pushed |
|---|---|---|---|---|
| CKB_Luong_Thanh_Tung | Tue 27 Oct 08:17 | 1 | `30f7c9d` PLAN.md: related work, review follow-up, tracker issues, named adoption targets | yes |
| ckb-cycle-tools | Tue 27 Oct 08:18 | 1 | `5fbe5d9` README "Related work" | yes |
| ckb-session-kit | Tue 27 Oct 08:19-08:21 | 2 | `75d4568` README "Related work"; `49227cd` lock-test count 57 -> 74 | yes |
| ckb-cycle-tools | Tue 27 Oct 18:45 | 3 | `6c35243..7b283a5` benchmark refresh | yes |
| ckb-cycle-tools | Tue 27 Oct 18:50-19:08 | 7 | `1a466d8..488ac27` hardening | yes |
| ckb-session-kit | Tue 27 Oct 18:50-19:08 | 10 | `1d8e1c2..04d03fb` hardening, docs | yes |
| ckb-cycle-tools | Tue 27 Oct 19:42-19:45 | 4 | `58ed182..3125fa2` Action security review fixes | yes |
| ckb-session-kit | Tue 27 Oct 20:04 | 3 | `43a21dc..a4f57e5` reproducible lock build, CI lock-hash job | yes |
| ckb-session-kit | Tue 27 Oct 22:31-22:44 | 2 | `6c2188d` changelog 1.0.0 dated; `817ec57` npm install section | yes |
| ckb-cycle-tools | Tue 27 Oct 22:31-22:44 | 3 | `ef23b3e` changelog; `d978ba7` Windows short-path fix; `46b3542` npm install section | yes |
| ckb-cycle-tools | Tue 27 Oct, after 22:44 | 1 | `bd19b11` docs: the Action's first public comment, on PR #1 | yes |
| CKB_Luong_Thanh_Tung | Wed 28 Oct 01:19 | 1 | `af39d19` the third plan: outside use first, one Spark grant at a time, mainnet cycle atlas | yes |
| ckb-cycle-tools | Wed 28 Oct 01:33-03:04 | 12 | `dc2c742` daily demo smoke; `9abfe2b..2dbb45e` mainnet cycle atlas, `pack:check` | yes |
| ckb-session-kit | Wed 28 Oct 01:36 | 1 | `a2eea1b` daily demo smoke | yes |
| CKB_Luong_Thanh_Tung | Wed 28 Oct 19:44-20:31 | 2 | `80d7e76` mentor feedback drives Weeks 6-12; `86c0175` cycle tools to Spark in Week 10 | yes |
| ckb-cycle-tools | Wed 28 Oct 19:45-19:55 | 4 | `b62a907..f9a49ac` ckb-testtool integration, `ckb-cycles scan` | yes |
| ckb-session-kit | Wed 28 Oct 20:03 | 3 | `3208acc..cbad3cb` full rejection text logged, evidence logs, security evidence report | yes |
| ckb-session-kit | Wed 28 Oct 20:46-21:04 | 3 | `0149aec` adversarial CKB-VM lock tests; `695ef50` smoke step 8b (third-party payment); `2a7574c` evidence: error 13 refused on testnet | yes |
| ckb-cycle-tools | Wed 28 Oct 20:52-21:29 | 3 | `1b4a053` flamegraph frames named from the ELF symbol table; `39195db` ckb-script-templates end-to-end test, CI job `templates-e2e`; `fd567cd` cross-version check | yes |
| ckb-session-kit | Fri 30 Oct 11:04-11:19 | 11 | `4cc3285..e28846d` the 10 review fixes, with tests; changelog | yes |
| ckb-cycle-tools | Fri 30 Oct 11:01-11:39 | 12 | `04ad2b7..a1e678f` the 10 review fixes, with tests; `d4b1e26` Action posts nothing when comments cannot be listed; `9b81f0b` Windows test timeout | yes |
| ckb-session-kit | Fri 30 Oct 12:14-18:32 | 3 | `98f85bd`, `8fafdc3` reason codes for missing cells and a payTo that is not anyone-can-pay; `ddb96e2` last charge dated from the lock's history | yes |
| ckb-cycle-tools | Fri 30 Oct 18:32-18:34 | 2 | `3ec23c9` release 1.1.0 (`ckb-cycles scan`, ckb-testtool integration); `b3d66ec` package named in every npx line | yes |
| ckb-session-kit | Fri 30 Oct 18:55-19:26 | 12 | `bd87285..a865e50` audit round 1: failing tests, then the fixes (incl. merge) | yes |
| ckb-cycle-tools | Fri 30 Oct 18:52-19:30 | 7 | `bf367d7..c3a6ed5` audit round 1: failing tests, then the fixes (incl. merge) | yes |
| ckb-session-kit | Sat 31 Oct 00:48-02:35 | 14 | `47b174a..9e8a243` audit round 2: failing tests, fuzz suite, fixes, CSP, pinned actions (incl. merges); `f51f07c` the demo's charger is a key of its own | yes |
| ckb-cycle-tools | Sat 31 Oct 00:46-02:24 | 6 | `4d07fa4..3127518` audit round 2: failing tests, fixes, security headers, changelog; CI test fix | yes |

Totals: ckb-session-kit 64, ckb-cycle-tools 64 (merge commits included), CKB_Luong_Thanh_Tung 4 (all pushed).

## What was built

**Related work (27 Oct, morning)**
- ckb-session-kit README "Related work" (`75d4568`): CKAutomata (recurring payments,
  overlap with subscriptions), QuotaCell (shared team allowance), FiberLatch and
  Fiber Encrypted Data Payment (pay-per-read on Fiber vs on L1), wallet and login
  projects (JoyID, Corven Connect, CKB KeyWay). Each entry says what the project does,
  from its own post or repo, and where the kit differs.
- ckb-cycle-tools README "Related work" (`5fbe5d9`): ckb-debugger (the engine, and what
  is added on top), ckb-devnet-explorer, CKB Contract Flow, CKBadger, CellScript's cost
  report (method close to the ckb-js-vm vs Rust harness).
- PLAN.md (`30f7c9d`): related-work reasoning (Spark and DAO do not fund the same idea
  twice), Week 5 evidence list (npm pages, forum post, review fixes reported back,
  both projects on the CKBuilder-projects tracker), named adoption targets for Week 8
  (LockFit, CrowdCell for the kit; CellScript for the Action).
- README fix (`49227cd`): 74 tests run the lock in CKB-VM, not 57.

**Benchmark refresh: ckb-js-vm vs Rust on the current lock (27 Oct)**
- The ckb-js-vm session lock now follows the current Rust lock (`6c35243`): errors 16
  (one change cell), 17 (key cell may not grow), 18 (no type scripts), token sessions
  19 and 20, in the Rust lock's order and with its error codes.
- 58 scenarios, up from 20 (`968e3a2`): the 20 from 8 Oct unchanged, 18 new plain CKB
  scenarios, 20 token-session scenarios. Rust lock pinned to session-kit `49227cd`.
  Both implementations agree on every accept/reject decision.
- RESULTS.md regenerated (`7b283a5`), with the 8 Oct numbers beside it:
  - Rust 7,656 B binary; ckb-js-vm 30,917 B bytecode + 410,248 B VM.
  - Mean accepted plain spend: Rust 14,758 cycles, ckb-js-vm 15,037,968.
  - Mean accepted token spend: Rust 20,348, ckb-js-vm 15,518,698.
  - Median ratio 1009x. ckb-js-vm start-up (cheapest run) 14,272,805 cycles; the lock's
    own logic is about 765,163 of an accepted spend (5%).
  - Same 20 scenarios as 8 Oct: Rust mean 12,263 -> 15,393 (+26%), ckb-js-vm
    14,573,318 -> 15,074,377 (+3%); median ratio 2027x -> 1609x.

**Hardening, both projects (27 Oct, evening)**
- Vitest 3.2.7 -> 4.1.12, past GHSA-5gmw-xhrv-c9v3 (critical, tinypool prototype
  pollution to RCE) and GHSA-82fw-gwwq-j7x9 (`1d8e1c2`, `1a466d8`). Dev only, nothing in
  the published packages changes. session-kit: same 269 tests pass, 74 lock tests skip
  without the RISC-V build (343 with it, as in CI).
- cycle-tools: esbuild 0.25.12 -> 0.28.2 (Vite 8 peer); it bundles the ckb-js-vm lock to
  the same bytes, so the bytecode and the cycles in cycles.json are unchanged.
- CI on Node 20, 22 and 24, the range `engines` promises (`7be41e7`, `8c6dc36`).
- CI also runs weekly, to catch dependency rot in quiet weeks (`6b3d4c1`, `9827132`).
- actions/checkout and actions/setup-node v7, off the deprecated node20 runtime
  (`55e366c`, `889513d`).
- Read-only token for the CI workflow (`d4642c3`, `69700d7`).
- session-kit CI checks the ckb-debugger tarball's SHA-256 before running it, the same
  pinned checksum as cycle-tools, re-verified against the v1.1.1 release asset
  (`d3466d5`).
- Builds start from an empty dist, so a deleted module is never packed (`ea40bfc`,
  `bb25589`); npm pack tarballs ignored (`04d03fb`, `488ac27`).
- Docs: subscriptions in the changelog's demo line (`cf4bda5`); the design doc's proposed
  subscription surface points to API.md for the built one (`04350a5`).

**Link check (27-28 Oct, no commit)**
- Every testnet transaction link in both repos' docs is committed on testnet (checked with
  get_transaction on testnet.ckb.dev; one first-try RPC error re-checked as committed). All other
  links return 200, except expected non-links (the POST-only RPC URL, explorer home rate limit, localhost).
  Log: drafts/link-check-2026-10-28.log (private).

**Action security review (27 Oct, evening; cycle-tools `58ed182..3125fa2`)**
- The PR comment can no longer exceed GitHub's 65,536-character limit (names capped, then
  function details, unchanged groups and the last rows dropped, each with an "N left out" line).
- `ckb-cycles report --root`: files a PR's cycles.json names must sit inside the checkout,
  symlinks resolved, so a PR cannot make the Action quote another file in a public comment.
- Bare links, right-to-left override and control characters in names are neutralised.
- Action README: a Security section, a pinned commit instead of `@main`, a 30-minute timeout.
- Follow-up `d978ba7`: Windows runners' 8.3 temp path (RUNNER~1) made a missing file look
  outside the checkout; found by the new Windows CI job, fixed with a regression test.
- Write-up: drafts/action-security-review.md (private).

**Reproducible session lock build (27 Oct, evening; session-kit `43a21dc..a4f57e5`)**
- rustc pinned to 1.99.0 (contracts/session-lock/rust-toolchain.toml).
- `npm run check:lock-hash`: the built binary's data hash equals the deployed code hash
  0xab419466...4c08ce (byte-identical, 7,656 bytes). A 1.95.0 build is rejected, so the pin matters.
- New CI job `lock-hash` on Windows (the host the deployed binary was built on) runs it on every
  push; green on its first run (run 40531788757).
- README: "verify the deployed lock yourself" in three commands.

**Release (27 Oct, night)**
- ckb-session-kit 1.0.0 and ckb-cycle-tools 1.0.0 published on npm by me; a clean install of
  both from the registry imports every export and runs `ckb-cycles --help`.
- CHANGELOGs dated, READMEs have an Install section (`817ec57`, `46b3542`).

**Upstream repro work (27 Oct, outside the repos)**
- All 8 upstream drafts (drafts/upstream-issues.md) re-run against the latest published
  versions, each with a standalone repro in upstream-repros/01..08 (README with steps and
  real output). Still reproduces with @offckb/cli 0.4.13, offckb develop b444332 and the
  0.5.0 canary; ckb-testtool 1.0.5; ckb-debugger 1.1.1; @ckb-ccc/core 1.23.0.
- Local patches (git format-patch, not pushed) for 5 of them:
  1. offckb: real ckb-debugger.exe next to the .cmd shim on Windows
  2. ckb-testtool: CKB_DEBUGGER_PATH and a clearer spawn error (the repro found a second
     symptom, EINVAL from a .cmd path)
  3. ckb-testtool: ESM imports resolved
  4. ckb-debugger: flamegraph frames joined so Rust names with `;` survive
  7. offckb: quiet first-run CPU-detection log on Windows
- Issues only: 5 (ckb-debugger full-mode "All cycles" leaves out binary loading),
  6 (CCC raises an output capacity silently; question only), 8 (offckb npm name).
- Filing order decided (offckb shim first, with its PR).

**Tracker issues: mentors assigned, first review (27-28 Oct)**
- A programme maintainer assigned a mentor to each issue on 27 Oct, 17:50 UTC: quake for cycle tools
  (#46), gpBlockchain for the session kit (#47).
- #46, quake (28 Oct, 01:13 UTC): suggests integrating with ckb-script-templates and a cargo bench
  workflow. Preparing the mocks and binary mappings behind cycles.json is a lot of setup; tuning
  happens during local development, so reuse the existing Rust ckb-testtool scenarios, generate the
  files automatically and profile freshly built contracts. On-chain replay stays useful for bringing
  real transactions into regression tests.
  https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/46#issuecomment-6457989550
- #46, a second commenter (not the mentor, 28 Oct, 05:25 UTC): agrees with quake; also suggests
  cross-version checks across CKB-VM and ckb-debugger (the CLI and the browser use different
  builds), configurable regression thresholds on the Action (they already exist: `fail-above`,
  `fail-on-result-change`), and testing the Action in one or two independent repositories.
  https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/46#issuecomment-6461407433
- #47, the same second commenter (28 Oct, 05:24 UTC): suggests one reproducible report of the
  security evidence: RPC rejection logs for failed transactions next to the successful hashes and the
  exact contract version, covering spending limits, recipient restrictions, rate limits and owner
  recovery. gpBlockchain has not commented yet (as of 28 Oct evening).
  https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/47#issuecomment-6461390811

**Plan change (28 Oct; CKB_Luong_Thanh_Tung `af39d19`, `80d7e76`, `86c0175`, pushed)**
- Advice from the programme manager: do not apply to Spark or the Community Fund DAO before the
  programme is over; spend the remaining weeks developing the tools and introducing them to the
  community.
- Asked the same day whether one Spark application could go in during Week 10, so it is in review
  when the programme ends: agreed.
- New plan: one application during the programme, cycle tools to Spark in Week 10 (30 Nov - 5 Dec);
  the session kit applies only after that grant is closed; DAO applications after 19 Dec. Weeks 6-9
  are driven by the mentor feedback (testtool integration, ckb-script-templates workflow,
  cross-version checks, security evidence), introducing the work (forum posts, outside PRs) and
  upstream issues. The Spark deliverables (Marketplace repo, outside repo, guide, video) stay unbuilt
  until the grant.
- Spark draft updated for Week 10 (drafts/spark-cycle-tools.md, private).

**ckb-testtool integration (28 Oct evening; cycle-tools `b62a907..f9a49ac`, pushed; on npm in 1.1.0)**
- The mentor's suggestion on #46, built the same day.
- `integrations/ckb-testtool`: a helper crate (about 40 lines). `ckb_cycles_testtool::verify_tx`
  returns what `context.verify_tx` returns; when `CKB_CYCLES_MOCKS` names a directory it also saves
  `context.dump_tx(&tx)` there, accepted or rejected, named after the test.
- `ckb-cycles scan <dir>`: writes cycles.json from those mocks, one scenario per file, binaries from
  `build/release` matched by data hash, `<name>.debug` as the symbols build; reports files no test
  deployed and code cells that are none of the binaries.
- A `make cycles` target (build, tests, scan, report) documented in the README.
- Fixture project in the template's layout (test/fixtures/testtool-project): 6 scenarios, 1 rejected
  (exit 5); heaviest test 468,128 cycles, `args_loop::work` 440,320 of it.
- Design and open questions for the maintainers (dump inside ckb-testtool, or in the template; is
  `cargo bench` wanted): docs/design/testtool-integration.md.

**Security evidence report (28 Oct evening; session-kit `3208acc..cbad3cb`, pushed)**
- The request on #47, built the same day: ckb-session-kit/docs/SECURITY-EVIDENCE.md.
- Per rule: what it is, where the lock checks it, accepted and rejected testnet transactions with the
  node's error text, and the CKB-VM tests. Code hash 0xab419466...4c08ce (data2), deploy cell
  0xf3098bdb...77f2, rustc 1.99.0 rebuild command, 74 CKB-VM tests passing on 28 Oct (116 later
  that night, below).
- On current testnet: errors 12 (spending limit), 20 (token limit), 14 (rate limit), 16 (no
  splitting), 17 (key cell may not grow), 18 (no type scripts) rejected; owner sweep, recovery and
  cancel accepted. CKB-VM only: errors 10, 11, 15, 19, and error 13's third-party case.
- Every hash re-checked on 28 Oct with read-only `get_transaction`; `npm run evidence` repeats it from
  the raw logs. The smoke scripts now log the node's full rejection text (`3208acc`).
- Its own "Not covered" section: not audited, testnet only; expiry not on chain; per-cell rate limit;
  raceable sweep; earlier rejections kept only 220 characters of node text.

**Error 13 refused on public testnet; adversarial CKB-VM tests (28 Oct night; session-kit `0149aec..2a7574c`, pushed)**
- Error 13 (pay only the recipient) is now refused by public testnet, the one lock rule that was
  CKB-VM only for the third-party case. A recipient-scoped cell (recipient: the owner) pays 100 CKB,
  exactly `max_per_tx`, to a fresh key's lock, so only the recipient rule can object; built by hand,
  because `spendInSession` refuses it before signing (smoke step 8b, `npm run smoke:lock -- --third-party`).
- Node's full answer: `TransactionFailedToVerify ... source: Inputs[0].Lock, cause: ValidationFailure:
  see error code 13`, RPC code -302, `errorCode: 13`. The same run repeated errors 12, 14, 16, 17, 18
  with the node's full text.
- Funding tx (three session cells and the key cell):
  https://testnet.explorer.nervos.org/transaction/0x6f47708384ceccad1d19f7307dc8f487ebd54db65a54a511197a59b24822c710
- Owner sweep, every cell back:
  https://testnet.explorer.nervos.org/transaction/0xa3e43a1e7ef05712dc7d97047027ea14bc73702be1e66e4df6b7d0b1f704d144
- Log: docs/evidence/2026-10-28-smoke-lock.log; SECURITY-EVIDENCE.md updated (error 13 row: rejected and
  accepted, full node text).
- 116 CKB-VM lock tests (was 74), 42 of them adversarial: a leaked session key or a malicious app building
  the transactions (sibling cells, lookalike locks with the same code hash, DAO and Type ID cells, and
  more), run against the deployed binary in ckb-debugger. No case found a fault; lock source unchanged.
  `npx vitest run test/session-lock.test.ts -t "adversarial"`.

**ckb-script-templates end-to-end (28 Oct night; cycle-tools `39195db`, pushed)**
- scripts/templates-e2e.sh: generates a fresh workspace from ckb-script-templates (commit pinned) with
  cargo-generate, two contracts, swaps in `ckb_cycles_testtool::verify_tx`, runs the tests with
  `CKB_CYCLES_MOCKS`, `ckb-cycles scan`, `report`, then a 1,000-step loop in one contract and `diff`.
- Result: 7,156 cycles per contract, the same the tests print; after the change +12,018 (+167.94%),
  `__ckb_std_main +12,008`; the untouched contract 0%.
- New CI job `templates-e2e` (Linux), diff in the job summary; green on its first GitHub run (run 41004147044).
- Proposal for the template maintainers written (drafts/script-templates-proposal.md, private): two
  questions, dump inside ckb-testtool's `verify_tx` vs a template change, and `make cycles` vs `cargo bench`.

**Cross-version check (28 Oct night; cycle-tools `fd567cd`, pushed)**
- The suggestion on #46: the same scenarios replayed under every ckb-debugger release from 0.121.0 to
  1.1.1, native and WebAssembly. 35 scenarios, 14 builds, 455 runs (1,170 script groups) compared with
  native 1.1.1: 455 identical, 0 different, 0 could not run.
- The web page's WebAssembly build (from ckb-testtool 1.0.5) is byte for byte the 0.200.1 wasm32-wasip1
  asset, so that row covers the browser.
- Same transactions under CKB-VM versions 0, 1, 2: differences only from the hardforks (explained in
  RESULTS.md).
- compat/RESULTS.md; workflow compat.yml runs it when compat files change.
- Also: flamegraph `func_0x...` frames named from the build's ELF symbol table (`1b4a053`).

**Code review of both repos, 20 findings, all fixed (review 28 Oct night, fixes 30 Oct; pushed)**
- /code-review (high) on both repos, 10 findings each; all 20 confirmed and fixed, each with a test.
- ckb-session-kit (`4cc3285..e28846d`):
  1. Subscription cancel: a planted max-amount token cell could push out the subscriber's own cell; own cells first.
  2. Owner sweep (close, recover) had no u128 overflow guard; one shared guard for sweeps and charges.
  3. recoverSessions: an accepted sweep with a lost reply was reported as failed; fixed faults were hidden behind retries.
  4. Subscription rate limit checked any cell's age; now the newest charge.
  5. Store: a stale save of the same key dropped the on-chain binding.
  6. Demo charge route: creator-side faults now 503 with retry, not 409.
  7. Charger fee cell and payout cell were always the first match; now a random pick.
  8. Paywall: payment inputs resolved in parallel, memo cell fetched once.
  9. Subscription: each creating transaction fetched once, in parallel.
  10. Duplicated anyone-can-pay check, top-up pick and memo scan made one helper each.
- ckb-cycle-tools (`04ad2b7..a1e678f`):
  1. Cross-version: a failed reference run was counted as a match.
  2. Cross-version: native tx files named by slug only; now by id hash.
  3. ELF names: absolute symbols and linker markers could rename the root frame.
  4. Action: a failed sticky-comment update fell through to a second comment.
  5. templates-e2e: mock count compared with -eq (macOS `wc` padding).
  6. ELF names: every legacy Rust escape decoded.
  7. Cross-version: node retry three times, as documented (was six).
  8. Flamegraph: each symbols build read once per transaction.
  9. Flamegraph: builds read through the injectable readBinary.
  10. Cross-version: uses replay.ts selectorFor, copy dropped.
- Added while fixing: the Action posts nothing when comments cannot be listed (`d4b1e26`); longer
  timeout for sticky-comment tests on Windows runners (`9b81f0b`).
- Tests after the fixes: session-kit 398 (116 CKB-VM), cycle-tools 230.

**Mainnet cycle atlas (28 Oct night; cycle-tools `9abfe2b..2dbb45e`, pushed)**
- 1,000 transactions from every 12th block, 20,835,876 to 20,851,152 (26-27 Oct), replayed per script
  group in ckb-debugger 1.1.1; all 1,000 matched the node's totals.
- secp256k1_blake160 93.7% of cycles, median 1,647,788 per group; costliest tx 111,979,599 (68 owners);
  694 of 1,000 update d.id's time oracle.
- Targeted samples for 22 scripts (653 replays, 601 matched, none mismatched, 52 old ones with no
  recorded total). Medians: xUDT 20,498, Spore 103,953, Omnilock 1,458,708, JoyID 6,844,452.
- Reproduce command in the README; the atlas is repository-only, and `pack:check` fails if it reaches
  the npm package (`5ebe021`).

**Daily demo smoke checks (28 Oct night; cycle-tools `dc2c742`, session-kit `a2eea1b`, pushed)**
- A scheduled workflow opens each live demo in a real browser every day (cycle tools: including the
  in-browser ckb-debugger). Read-only; signs and sends nothing. First scheduled runs 29 Oct
  (session-kit 40867604814, cycle-tools 40867568135); green every day since.

**Replies on the tracker issues (30 Oct)**
- #46, to quake: the ckb-testtool integration and `ckb-cycles scan` built from the suggestion.
  https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/46#issuecomment-6521399061
- #46, to the second commenter: thresholds already exist; cross-version check and templates end-to-end done.
  https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/46#issuecomment-6521402846
- #47: the security evidence is now one reproducible report (SECURITY-EVIDENCE.md).
  https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/47#issuecomment-6521508801
- gpBlockchain (mentor) answered on #47 on 31 Oct, promising a look; the full review came on 2 Nov
  (Week 6). https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/47#issuecomment-6538069728

**More library work (30 Oct, midday; session-kit `98f85bd`, `ddb96e2`, `8fafdc3`)**
- The payer's own missing cells get a reason code; so does a payTo that is not anyone-can-pay.
- A subscription's last charge is dated from the lock's history.

**Security audit round 1 (30 Oct; session-kit `bd87285..a865e50`, cycle-tools `bf367d7..c3a6ed5`, pushed)**
- Whole of both repos, not only new commits; five local review agents, every finding re-checked and
  given a failing test before it was fixed. No Critical or High finding. The deployed lock is
  byte-identical and holds against every rule its docs promise. 10 findings, all fixed:
  1. cycle-tools: a mock with a `{{ data <path> }}` directive made ckb-debugger embed any file on the
     runner, getting past `--root`; such directives are now refused.
  2. session-kit: a planted foreign-typed cell sharing a key hash could block `recoverSessions` for
     that session; recovery now groups by the full session lock.
  3. Demo: the server's charger key was the creator's key; now a separate key (`setup:charger`) that
     holds only fee cells.
  4. session-kit: the fee came from the first key cell, so a small gift cell could block every spend;
     now the largest.
  5. Demo `/api/subscription`: 100 planted cells meant 3,307 RPC calls per request; reads now bounded.
  6. cycle-tools: a PR's cycles.json `rpc` field picked the host the runner calls; ignored under `--root`.
  7. cycle-tools: names with newlines could forge workflow commands in the CI log; cleaned.
  8. Action: the PR's build could take the comment token (same job); the token is kept out of its reach.
  9. session-kit: an unsigned memo added by a relay made `verifyAccess` refuse a real payment; only
     signature-covered memos count.
  10. README: with a recipient set, the fee still goes to the miner, outside the recipient rule.
- Also: GitHub actions pinned to commit SHAs, no persisted checkout token.

**Security audit round 2 (31 Oct; session-kit `47b174a..9e8a243`, cycle-tools `4d07fa4..3127518`, pushed)**
- Six angles, one local agent each: fuzzing the lock, state and failures over time, supply chain and
  secrets, browser/UI, mainnet readiness, the cycle tools' verdicts.
- Lock fuzzing in CKB-VM: about 750 library-built transactions all accepted, about 12,000 mutations all
  refused with the documented error code, about 10,000 random transactions/args matched an independent
  model. No crash; lock source unchanged. Merged as a property/fuzz suite (`27871fc`).
- No secrets in any commit of the three repos. `pack:check` fails if the npm tarball ships anything but
  dist and docs (`47b174a`).
- 20 findings, all fixed with tests. The most important:
  - cycle-tools gate (5 findings): a contract added in a PR turned off the comparison for every scenario;
    a binary matching no cell dep was shown as "same"; a run over the cycle limit read as 0 cycles and
    passed `--fail-above`; the base used the PR's cycles.json, so a deleted scenario's regression
    disappeared; removed or renamed groups passed. Now: no wrong verdicts from stopped runs, missing or
    unmatched binaries or removed groups, and the base is measured with its own cycles.json.
  - session-kit: `openSession` accepted older testnet deployments (13 Oct, 8 Oct) with weaker rules, and
    never checked the deployment against the client's network or its code cell; new cells now go only
    under the current deployment, checked on chain.
  - session-kit: lost replies and caches (the demo forgetting a key after an unknown send, a close that
    could never finish, spent cells kept live by the cache, access granted from cache after a reorg),
    `closeSession` not checking the signer is the owner, typed fee errors.
  - Demos: a full Content-Security-Policy on the session kit; security headers on the inspector.
- Remaining note: an advisory in `elliptic` via @ckb-ccc, no fix available upstream, not on our
  signing path.

**Releases and the live demo (31 Oct)**
- ckb-cycle-tools 1.1.0 published on npm by me (`ckb-cycles scan`, the ckb-testtool integration,
  both audit rounds' fixes), held until audit round 2 was fixed.
- New charger key on the live session-kit demo (Vercel `CHARGER_KEY`), holding only testnet fee cells;
  the charge route checked live (409 for an unknown subscription).

**Tests at the end of the week:** session-kit 462 passing (CKB-VM lock tests, adversarial and fuzz
included); cycle-tools 262 passing, 2 skipped. Run locally 2 Nov at the pushed heads.

## External evidence

| Kind | What | Link |
|---|---|---|
| CI run | ckb-session-kit, Node 20/22/24 + lock-hash on Windows | https://github.com/luongthanhtung03/ckb-session-kit/actions/runs/40531788757 |
| CI run | ckb-cycle-tools, Node 20/22/24 + bench-session-lock | https://github.com/luongthanhtung03/ckb-cycle-tools/actions/runs/40532566433 |
| Repo page | Related work, session kit (pushed) | https://github.com/luongthanhtung03/ckb-session-kit#related-work |
| Repo page | Related work, cycle tools (pushed) | https://github.com/luongthanhtung03/ckb-cycle-tools#related-work |
| Repo page | Refreshed benchmark, 58 scenarios | https://github.com/luongthanhtung03/ckb-cycle-tools/blob/main/benchmarks/session-lock/RESULTS.md |
| Pull request | the cycle-report Action's first public comment (demo PR, not merged): 5 of 10 groups changed, slowed scenario +2.94% | https://github.com/luongthanhtung03/ckb-cycle-tools/pull/1#issuecomment-6446884745 |
| npm | ckb-session-kit 1.0.0 | https://www.npmjs.com/package/ckb-session-kit |
| npm | ckb-cycle-tools 1.0.0 | https://www.npmjs.com/package/ckb-cycle-tools |
| Tracker issue | session kit on CKBuilder-projects (posted 27 Oct) | https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/47 |
| Tracker issue | cycle tools on CKBuilder-projects (posted 27 Oct) | https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/46 |
| Tracker comment | quake (mentor) on #46: ckb-script-templates / ckb-testtool | https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/46#issuecomment-6457989550 |
| Repo page | ckb-testtool integration, README section | https://github.com/luongthanhtung03/ckb-cycle-tools#from-ckb-testtool-tests-ckb-script-templates-projects |
| Repo page | helper crate | https://github.com/luongthanhtung03/ckb-cycle-tools/tree/main/integrations/ckb-testtool |
| Repo page | mainnet cycle atlas report | https://github.com/luongthanhtung03/ckb-cycle-tools/blob/main/atlas/2026-10-28/report.md |
| Repo page | security evidence report | https://github.com/luongthanhtung03/ckb-session-kit/blob/main/docs/SECURITY-EVIDENCE.md |
| Repo page | PLAN.md, new Weeks 6-12 | https://github.com/luongthanhtung03/CKB_Luong_Thanh_Tung/blob/main/PLAN.md |
| CI run | demo smoke, first scheduled run, session kit (29 Oct) | https://github.com/luongthanhtung03/ckb-session-kit/actions/runs/40867604814 |
| CI run | demo smoke, first scheduled run, cycle tools (29 Oct) | https://github.com/luongthanhtung03/ckb-cycle-tools/actions/runs/40867568135 |
| Tracker reply | #46, to quake | https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/46#issuecomment-6521399061 |
| Tracker reply | #46, to the second commenter | https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/46#issuecomment-6521402846 |
| Tracker reply | #47 | https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/47#issuecomment-6521508801 |
| npm | ckb-cycle-tools 1.1.0 | https://www.npmjs.com/package/ckb-cycle-tools/v/1.1.0 |
| CI run | ckb-session-kit at `f51f07c`, after both audit rounds | https://github.com/luongthanhtung03/ckb-session-kit/actions/runs/41116458634 |
| CI run | ckb-cycle-tools at `3127518`, after both audit rounds | https://github.com/luongthanhtung03/ckb-cycle-tools/actions/runs/41115025747 |
| Repo page | session-kit changelog, audit fixes | https://github.com/luongthanhtung03/ckb-session-kit/blob/main/CHANGELOG.md |
| Repo page | cycle-tools changelog, 1.1.0 | https://github.com/luongthanhtung03/ckb-cycle-tools/blob/main/CHANGELOG.md |
| Repo page | property and fuzz tests of the lock | https://github.com/luongthanhtung03/ckb-session-kit/blob/main/test/property-fuzz.test.ts |
| CI run | ckb-session-kit at `e28846d`, after the review fixes (Node 20/22/24, lock-hash, session-lock) | https://github.com/luongthanhtung03/ckb-session-kit/actions/runs/41003788996 |
| CI run | ckb-cycle-tools at `9b81f0b`, after the review fixes, incl. first `templates-e2e` run | https://github.com/luongthanhtung03/ckb-cycle-tools/actions/runs/41004147044 |
| Repo page | error 13 testnet log (28 Oct smoke, step 8b) | https://github.com/luongthanhtung03/ckb-session-kit/blob/main/docs/evidence/2026-10-28-smoke-lock.log |
| Testnet tx | 28 Oct smoke funding | https://testnet.explorer.nervos.org/transaction/0x6f47708384ceccad1d19f7307dc8f487ebd54db65a54a511197a59b24822c710 |
| Testnet tx | 28 Oct smoke owner sweep | https://testnet.explorer.nervos.org/transaction/0xa3e43a1e7ef05712dc7d97047027ea14bc73702be1e66e4df6b7d0b1f704d144 |
| Repo page | 116 CKB-VM lock tests (42 adversarial) | https://github.com/luongthanhtung03/ckb-session-kit/blob/main/test/session-lock.test.ts |
| Repo page | ckb-script-templates end-to-end script | https://github.com/luongthanhtung03/ckb-cycle-tools/blob/main/scripts/templates-e2e.sh |
| Repo page | cross-version results, ckb-debugger 0.121.0-1.1.1 | https://github.com/luongthanhtung03/ckb-cycle-tools/blob/main/compat/RESULTS.md |
| Deployed URL | unchanged this week (session kit /subscribe, inspector with flamegraphs) | https://ckb-session-kit.vercel.app/ · https://ckb-cycle-tools.vercel.app/ |

## Screenshots

- None this week; every item above has a public link (npm, CI runs, tracker comments, testnet explorer).

## Problems hit

- Vitest 3.2.7, the last 3.x, still pulled a vulnerable tinypool and @vitest/mocker; the
  only fix was the major upgrade. Vitest 4's Vite 8 then required esbuild 0.27 or 0.28;
  checked that the bench bundle is byte-identical, so recorded cycles stay valid.
- The ckb-js-vm port had fallen 5 rules behind the Rust lock since 8 Oct, so the
  published comparison described an older lock. Ported, and the benchmark now pins the
  exact session-kit commit it measures.
- The README still said 57 CKB-VM lock tests after token sessions and subscriptions
  added more; corrected to 74.
- CI tested only Node 22 while `engines` promised a wider range; now 20, 22 and 24.
- A stale module left in dist could be packed; builds now clear dist first.
- Upstream drafts written 26 Oct linked files that were not public yet; re-checked each
  draft against the latest upstream release before filing.
- The cycle-report gate could give wrong verdicts (audit round 2): every earlier test had both
  sides of a comparison run cleanly, so none covered a missing binary, a stopped run or a removed
  scenario. Fixed before 1.1.0 went to npm, which is why the publish was held.
- cycle-tools CI failed once after the round-2 fixes (run 41114079903, `5b13f23`): a missing binary
  now still runs, so two tests needed a ckb-debugger; CI's test jobs install none, and a real one
  found on my machine hid it. Fixed with a stand-in debugger in the test (`3127518`).
- The demo's charger key was the creator's key, so a leak of the server key would also have
  exposed the creator's income. Now a separate key holding only fee cells.

## Hours

| Mon 26 | Tue 27 | Wed 28 | Thu 29 | Fri 30 | Sat 31 |
|---|---|---|---|---|---|
|2 |3 |3 |3 |2 | |

## Pair programming

Claude Code wrote the related-work sections from each project's public post or repo,
ported the five newer lock rules to the ckb-js-vm benchmark, re-ran and rewrote
RESULTS.md, did the dependency and CI hardening, and re-ran the upstream repros with
background agents. It also built the mentors' suggestions, and ran both audit rounds
with local review agents and fixed every finding with a test. I chose which projects to
compare against, agreed the plan change with the programme manager, decided to hold
1.1.0 until the audits were fixed, published it, posted the replies on #46 and #47 and
set the new charger key on Vercel.
