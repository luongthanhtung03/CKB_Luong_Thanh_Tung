# Twelve-week build plan

Built from the CKBuilder Handbook. Twelve reports, every **Saturday**, from
3 October to 19 December 2026.

New here? Start with [`notes/orientation.md`](notes/orientation.md) — what CKB is, in
plain language.

## What changed on 8 October: build first

The first version of this plan spent six weeks studying and six building. After
Weeks 1 and 1.5 — testnet transfers, a Type Script deployed with its suite passing
on testnet, a Rust script running under `ckb-debugger` — I am switching to
**building from Week 2 onwards**. The handbook counts building as progress just as it
counts study, and what I learn now comes from the problems the projects run into.

Two projects, both public, both open source, both aimed at the
[Spark programme](https://talk.nervos.org/t/ckb-eco-fund-spark-program-mini-grant-initiative/8752)
and then the
[CKB Community Fund DAO](https://talk.nervos.org/t/ckb-community-fund-dao-willing-to-back-every-ckb-buidler-up):

| Project | Repository | What it is |
|---|---|---|
| **Session kit** | [`ckb-session-kit`](https://github.com/luongthanhtung03/ckb-session-kit) | Browser-held self-custody sessions: a session key created in the browser, allowed to sign only within a scope and time limit enforced on-chain, so an app can act repeatedly without a wallet dialog every time |
| **Cycle tools** | [`ckb-cycle-tools`](https://github.com/luongthanhtung03/ckb-cycle-tools) | Cycle measurement for CKB Scripts: a per-script profiler, a ckb-js-vm vs Rust comparison harness, and the Windows toolchain fix from my Week 1 findings |

**Why not the Fiber metering capstone.** Pay-per-use over Fiber with signed access
receipts already exists as FiberLatch, a CKBuilder project now in its DAO phase.
Building a second one is not a good use of the weeks. Fiber pay-per-use survives as a
demo app inside the session kit, which is the part nobody has built.

This repository stays the dev log: the weekly reports live here and link to the work
in the two project repositories.

## The weeks

| Week | Period | Session kit | Cycle tools | Public evidence |
|---|---|---|---|---|
| 1 | 26 Aug – 1 Sep | ✅ | | *[report](reports/week-01-report.md)* |
| 1.5 | 28 Sep – 3 Oct | ✅ | | *[report](reports/week-01.5-report.md)* |
| **2** | **5 – 10 Oct** | Scaffold: TypeScript, CCC, tests, CI | Scaffold; Windows `ckb-debugger` shim fix ported | Both repos public; project filed in CKBuilder-projects |
| 3 | 12 – 17 Oct | Session key generated and held in the browser, signs a testnet transfer | CLI: per-script cycle table for a transaction | **Live demo on Vercel**; testnet explorer link; upstream issue/PR for the shim |
| 4 | 19 – 24 Oct | Session **lock script** — scope and expiry enforced on-chain (Rust) | Failure-path profiling; CI on Linux and Windows | ⚠ Checkpoint: session lock on testnet |
| 5 | 26 – 31 Oct | Delegate → act N times with no wallet dialog → revoke | Comparison harness: same assertions on ckb-js-vm and Rust | Explorer links; green CI |
| 6 | 2 – 7 Nov | Survives reload; expiry UX; device-loss recovery | **v1.0 on npm**, docs, Windows guide | Cycle tools → **Spark** |
| 7 | 9 – 14 Nov | Packaged API and examples | Spark deliverables | Forum post: the cycle comparison |
| 8 | 16 – 21 Nov | Fiber pay-per-use example app | Maintenance | Cycle tools `[DIS]` |
| 9 | 23 – 28 Nov | **v1.0 on npm** | — | Cycle tools `[VOT]`; session kit → **Spark** |
| 10 | 30 Nov – 5 Dec | Spark deliverables, hardening | Phase 2 if funded | |
| 11 | 7 – 12 Dec | Phase 2 scope | — | Session kit `[DIS]` |
| 12 | 14 – 19 Dec | Final demo | — | Session kit `[VOT]`; retrospective |

The demo is redeployed to Vercel every week from Week 3, so the deployed URL always
shows the current state.

## The checkpoint, with the fallback decided in advance

**⚠ Sat 24 Oct — the session lock must compile, pass its tests, and be on testnet.**
*Fallback:* the lock is written for ckb-js-vm instead, which already works here (the
counter Script, 23 tests, green CI). The cycle tools then measure exactly that
trade-off, so the fallback costs the session kit nothing it needs.

## Funding, kept honest

- **Spark = phase 1** (the prototype). **DAO = phase 2** (what comes after: mainnet,
  audit, maintenance). Both applications for a project are written in the same
  sitting so the two scopes stay clearly different.
- **One campaign live at a time.** If a project slips, its campaign slips with it.
- **Ask small.** The DAO quorum is 3× the amount asked for.

## The standard I hold myself to

Every week produces at least one of:

- a **public testnet explorer link** to a transaction I made,
- a **green CI run** re-proving a claim on a clean machine,
- a **deployed URL** a stranger can open,
- a **filed issue, pull request or forum post** in someone else's repository.

Never a claim whose only evidence is a file in my own repository.

## Scope control

| Level | Meaning |
|---|---|
| **Floor** | The week is not a failure if only this ships |
| **Target** | What I plan for |
| **Stretch** | Only if Target came in early. Skipping it is not a miss |

Stretch is never attempted before Floor is done. **Two Floor-only weeks in a row mean
the session kit gets scoped down that Saturday.** One primary project per day, never
both. Sunday is off.

## Working habits

1. Screenshot the moment a command succeeds — do not reconstruct evidence on report day.
2. Commit small and often, so the history corroborates that the work was contemporaneous.
3. Never commit `.env`, private keys, or seed phrases.
4. I build with Claude Code as a pair programmer, and the reports say so.

## Every Saturday

1. Fill in [`reports/week-fact-sheet-template.md`](reports/week-fact-sheet-template.md)
   from the week's commits, CI runs, explorer links and deployments.
2. Write the report myself from [`reports/week-template.md`](reports/week-template.md),
   using the fact sheet as the source.
3. Revise next week if I am behind. Move work; never delete it silently.
4. Commit and push.

This plan is a scaffold, not a contract. Changes are recorded in the weekly reports.
