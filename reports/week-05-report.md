# CKBuilder Weekly Report — Week 5

**Participant:** Luong Thanh Tung ([@luongthanhtung03](https://github.com/luongthanhtung03))
**Track:** Builders'
**Week:** 5 — 26 – 31 Oct 2026 (the evening of 26 Oct is in the Week 4 report)
**Publication date:** 2026-11-02

> **Tooling.** Built with Claude Code as a pair programmer; every commit is
> co-authored. This report was drafted by Claude Code from my fact sheet and
> reviewed and edited by me.

---

## This week in one table

| | |
|---|---|
| **Focus** | Both packages on npm, the mentors' first suggestions built, two security audits of both repos |
| **Dates** | 27 Oct: hardening, release · 28 Oct: plan change, mentor suggestions · 30 Oct: review fixes, replies, audit round 1 · 31 Oct: audit round 2, 1.1.0 |
| **npm** | ckb-session-kit 1.0.0 · ckb-cycle-tools 1.0.0, then 1.1.0 |
| **Mentors** | Assigned on the tracker (quake, gpBlockchain); every suggestion from the first review built the same day and answered on [#46](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/46) and [#47](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/47) |
| **ckb-session-kit** | Security evidence report; error 13 now refused on public testnet; 42 adversarial CKB-VM tests and a fuzz suite; reproducible lock build checked in CI |
| **ckb-cycle-tools** | cycles.json from ckb-testtool tests (`ckb-cycles scan`); ckb-script-templates end to end in CI; 14 ckb-debugger builds compared; mainnet cycle atlas |
| **Security** | 50 findings over three reviews, each fixed with a test; lock source unchanged |
| **Tests** | session-kit 462 · cycle-tools 262 |
| **CI** | Green on both — [session-kit](https://github.com/luongthanhtung03/ckb-session-kit/actions/runs/41116458634) · [cycle-tools](https://github.com/luongthanhtung03/ckb-cycle-tools/actions/runs/41115025747); daily demo smoke checks green since 29 Oct |

---

## Goal for this week

Put both projects where other people can use them (npm, the CKBuilder-projects
tracker), act on what the mentors ask for, and make sure what is published holds up.

## What I did

### Hardening and the 1.0.0 release (27 Oct)

- Dependencies past two Vitest advisories (one critical), CI on Node 20, 22 and 24
  (the range the packages promise), a weekly CI run for quiet weeks, read-only CI
  tokens, and a checksum check on the ckb-debugger download.
- **The session lock builds byte for byte the same.** With rustc pinned, a new CI
  job rebuilds the lock on Windows and checks its hash against the deployed code hash
  `0xab419466…4c08ce`. The README shows how anyone can check it in three commands.
- The ckb-js-vm vs Rust benchmark had fallen five rules behind the current lock.
  Ported, now 58 scenarios, and pinned to the exact lock commit it measures. Rust
  is about 1,000x cheaper in cycles (median ratio 1009x).
- A security review of the cycle-report Action before release: the PR comment
  stays under GitHub's size limit, a PR cannot make the Action quote files outside
  the checkout, and control characters in names are neutralised.
- Published [ckb-session-kit](https://www.npmjs.com/package/ckb-session-kit) and
  [ckb-cycle-tools](https://www.npmjs.com/package/ckb-cycle-tools) 1.0.0 on npm.
- Both READMEs now have a "Related work" section: which CKB projects are close to
  each one, and where they differ.

### A change of plan (28 Oct)

The programme manager advised not to apply for grants before the programme ends,
and to spend the remaining weeks improving the tools and introducing them to the
community. I asked if one Spark application could go in during Week 10 so it is in
review when the programme ends, and that was agreed. [PLAN.md](../PLAN.md) now
has Weeks 6 to 9 driven by mentor feedback.

### What the mentors asked for, built the same day (28 Oct)

On [#46](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/46),
quake pointed out that writing cycles.json by hand is the slow part, and suggested
working from the ckb-testtool tests that ckb-script-templates projects already have.

- **ckb-testtool integration.** A small helper crate saves each test's transaction
  as it runs; `ckb-cycles scan` turns the saved files into cycles.json, matching
  binaries by data hash. No hand-written mocks.
- **ckb-script-templates end to end, in CI.** A fresh project generated from the
  template, profiled, then changed: a 1,000-step loop shows up as +12,018 cycles
  (+167.94%) on that contract and 0% on the other one.
- **Cross-version check** (asked for by a second commenter): 35 scenarios under 14
  ckb-debugger builds from 0.121.0 to 1.1.1, native and WebAssembly, 455 runs, all
  identical to 1.1.1. The browser's build is one of them, so the web inspector gives
  the same numbers as the CLI.

On [#47](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/47),
the request was one reproducible report of the security evidence:

- **[SECURITY-EVIDENCE.md](https://github.com/luongthanhtung03/ckb-session-kit/blob/main/docs/SECURITY-EVIDENCE.md)**:
  for each lock rule, where the lock checks it, the accepted and rejected testnet
  transactions with the node's error text, the CKB-VM tests, and how to rebuild the
  exact binary. `npm run evidence` re-checks every hash.
- **Error 13 (pay only the recipient) refused by public testnet**, the last rule
  that had only been shown in CKB-VM for the third-party case. Node's answer:
  `ValidationFailure: see error code 13`.
- **42 adversarial tests** in CKB-VM against the deployed binary, written as a
  leaked session key or a malicious app: sibling cells, lookalike locks with the
  same code hash, DAO and Type ID cells and more. None found a fault.

I replied on both issues on 30 Oct with what was built.

### A mainnet cycle atlas (28 Oct)

1,000 mainnet transactions from 26–27 Oct replayed script by script; all 1,000
matched the node's totals. The default secp256k1 lock is 93.7% of all cycles.
Median cost per script group: xUDT 20,498, Spore 103,953, Omnilock 1,458,708,
JoyID 6,844,452. [Report](https://github.com/luongthanhtung03/ckb-cycle-tools/blob/main/atlas/2026-10-28/report.md).

### Three reviews, 50 findings, all fixed (28–31 Oct)

- **Code review** of both repos (28 Oct): 20 findings, fixed on 30 Oct, each with
  a test.
- **Security audit, round 1** (30 Oct), of everything, not only new code: 10
  findings, no Critical or High. The two that mattered most: a mock file could make
  ckb-debugger embed any file from the CI runner into a public report, and the live
  demo's charger key was also the creator's key. Both fixed; the demo now has a
  charger key of its own, holding only fee cells.
- **Security audit, round 2** (31 Oct), from six angles: fuzzing the lock, failures
  over time, supply chain, the browser, mainnet readiness, and whether the cycle
  report's verdicts can be trusted.
  - The lock held: about 12,000 mutated transactions all refused with the
    documented error code, about 10,000 random ones matched an independent model.
    No secrets in the history of any of the three repos.
  - 20 findings, all fixed. The biggest group was in the cycle report: a PR that
    adds a contract, removes a scenario or runs over the cycle limit could pass the
    gate. The session kit now opens new cells only under the current deployment,
    checked on chain, and handles lost replies and stale caches.

Every finding got a failing test before its fix. The lock source did not change.

### 1.1.0 (31 Oct)

I held ckb-cycle-tools 1.1.0 until audit round 2 was fixed, then published it:
`ckb-cycles scan`, the ckb-testtool integration, and both rounds' fixes.

## Evidence

| Item | Result | Link |
|---|---|---|
| ckb-cycle-tools 1.1.0 | On npm | [npm](https://www.npmjs.com/package/ckb-cycle-tools/v/1.1.0) |
| ckb-session-kit 1.0.0 | On npm | [npm](https://www.npmjs.com/package/ckb-session-kit) |
| Error 13, third party paid | Rejected by public testnet, error 13 | [log](https://github.com/luongthanhtung03/ckb-session-kit/blob/main/docs/evidence/2026-10-28-smoke-lock.log) |
| That run's funding and owner sweep | Committed | [`0x6f47…c710`](https://testnet.explorer.nervos.org/transaction/0x6f47708384ceccad1d19f7307dc8f487ebd54db65a54a511197a59b24822c710) · [`0xa3e4…d144`](https://testnet.explorer.nervos.org/transaction/0xa3e43a1e7ef05712dc7d97047027ea14bc73702be1e66e4df6b7d0b1f704d144) |
| Security evidence, per rule | One report, re-checkable | [SECURITY-EVIDENCE.md](https://github.com/luongthanhtung03/ckb-session-kit/blob/main/docs/SECURITY-EVIDENCE.md) |
| Rebuilt lock = deployed code hash | Green in CI on Windows | [run 40531788757](https://github.com/luongthanhtung03/ckb-session-kit/actions/runs/40531788757) |
| ckb-script-templates end to end | Green in CI | [run 41004147044](https://github.com/luongthanhtung03/ckb-cycle-tools/actions/runs/41004147044) |
| Cross-version check | 455 of 455 runs identical | [compat/RESULTS.md](https://github.com/luongthanhtung03/ckb-cycle-tools/blob/main/compat/RESULTS.md) |
| Mainnet cycle atlas | 1,000 of 1,000 matched the node | [report](https://github.com/luongthanhtung03/ckb-cycle-tools/blob/main/atlas/2026-10-28/report.md) |
| Replies to the mentors' review | Posted | [#46 quake](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/46#issuecomment-6521399061) · [#46](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/46#issuecomment-6521402846) · [#47](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/47#issuecomment-6521508801) |
| CI after all fixes, ckb-session-kit | Green | [run 41116458634](https://github.com/luongthanhtung03/ckb-session-kit/actions/runs/41116458634) |
| CI after all fixes, ckb-cycle-tools | Green | [run 41115025747](https://github.com/luongthanhtung03/ckb-cycle-tools/actions/runs/41115025747) |
| Daily demo smoke check | Green since 29 Oct | [session kit](https://github.com/luongthanhtung03/ckb-session-kit/actions/runs/40867604814) · [cycle tools](https://github.com/luongthanhtung03/ckb-cycle-tools/actions/runs/40867568135) |
| Live demos | Deployed on Vercel | [session kit](https://ckb-session-kit.vercel.app/) · [inspector](https://ckb-cycle-tools.vercel.app/) |

## What went wrong, and how I fixed it

**The gate trusted a clean run.** Every cycle-report test had both sides of the
comparison run cleanly, so none covered a missing binary, a stopped run or a
deleted scenario, and in those cases the gate could say "no change". Audit round 2
found it; I held 1.1.0 until it was fixed.

**A test that passed only on my machine.** After that fix, a scenario with a
missing binary still runs, so two tests needed ckb-debugger. My machine has one,
CI's test jobs do not, and [CI failed](https://github.com/luongthanhtung03/ckb-cycle-tools/actions/runs/41114079903).
The tests now use a stand-in debugger.

**One key doing two jobs.** The demo server's charger key was the creator's key, so
leaking it would also expose the creator's income. It is now a separate key that
holds only fee cells, set on Vercel.

**A benchmark describing an older lock.** The ckb-js-vm port was five rules behind
the Rust lock, so the published comparison measured something that was no longer
deployed. Ported, and the benchmark now pins the lock commit it measures.

**Windows paths.** The new Windows CI job found that the runner's short temp path
(`RUNNER~1`) made a missing file look like it was outside the checkout. Fixed with
a regression test.

## What I learned

The on-chain lock was not the weak part. About 12,000 mutated transactions and 42
adversarial tests found nothing in it. Every real finding was in the code around
it: a CI gate that trusted a clean run, a server key doing two jobs, caches that
kept spent cells alive, a reply lost in the network. A small lock is easy to make
correct; the library and tools around it are where the bugs live, so that is
where the next reviews should look.

An audit also works best when it is asked a narrow question. "Review the repo"
found code smells; "can the cycle report give a wrong verdict?" found five ways
it could.

Last, feedback beats my own plan. The mentors asked for three things I had not
planned (ckb-testtool, ckb-script-templates, cross-version checks), and building
them the same day made the cycle tools fit how CKB developers already work,
instead of asking them to write cycles.json by hand.

## Hours

| Mon 26 | Tue 27 | Wed 28 | Thu 29 | Fri 30 | Sat 31 |
|---|---|---|---|---|---|
|2 |3 |3 |3 |2 | |

## Next week

- Answer gpBlockchain's review of the session kit on #47 (posted 2 Nov).
- Post the cycle comparison on Nervos Talk.
- File the upstream issues found while building (offckb, ckb-testtool, ckb-debugger, CCC).
- Offer the session kit to CrowdCell or LockFit, and the ckb-testtool integration to the ckb-script-templates maintainers.
