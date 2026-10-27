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
| **Session kit** | [`ckb-session-kit`](https://github.com/luongthanhtung03/ckb-session-kit) | Browser-held self-custody sessions: a session key created in the browser, allowed to spend only within a scope enforced on-chain (and a time limit enforced in the browser), so an app can act repeatedly without a wallet dialog every time |
| **Cycle tools** | [`ckb-cycle-tools`](https://github.com/luongthanhtung03/ckb-cycle-tools) | Cycle measurement for CKB Scripts: a per-script profiler, a ckb-js-vm vs Rust comparison harness, and the Windows toolchain fix from my Week 1 findings |

**Why not Fiber at all.** Pay-per-use over Fiber with signed access receipts
already exists as FiberLatch, a CKBuilder project now in its DAO phase. Building a
second one, even as a demo inside the session kit, would read as a duplicate. The
session kit's example is **pay-per-read** instead: 1 CKB on-chain payments into a
creator's anyone-can-pay cell, signed by a session key that can pay nobody else.
It uses only the session lock and standard CKB scripts, and no funded project
covers it.

This repository stays the dev log: the weekly reports live here and link to the work
in the two project repositories.

## What changed on 13 October: the first plan is built

By the end of Week 3, everything the first plan scheduled up to Week 8 was built
and on testnet: the session lock (Rust), sessions with no wallet dialog,
device-loss recovery, pay-per-read with server-verified unlocks, the cycle
profiler with failure-path profiling, the ckb-js-vm vs Rust harness, examples and
an API reference. Reviews from the community and an adversarial review found real
holes; each was fixed with a regression test, and the lock was redeployed.

So the remaining weeks build further on the same two ideas, aiming at things
people can see and use:

- **CKB Place** (session kit): a shared pixel board on testnet. Every pixel is a
  tiny payment signed by a session key, with no wallet popup; the board is
  rebuilt from the chain, with no server.
- **Pay-per-minute** (session kit): a player that pays its creator every minute
  while it plays, and stops when it stops.
- **Token sessions** (session kit): sessions that spend an xUDT token, not only
  CKB. A change to the lock, so it gets its own threat model and review first.
- **Cycles in the browser** (cycle tools): the web inspector shows each script
  group's cycles, by running ckb-debugger compiled to WebAssembly in the page.
- **Cycle reports on pull requests** (cycle tools): a GitHub Action that comments
  how each script's cycles changed, as gas reports do for Solidity.

## What changed on 26 October: the second plan is built

Everything the 13 October plan scheduled for Weeks 4 to 12 was built between 14 and
18 October and is live on testnet: CKB Place, the pay-per-minute player, token
sessions (with their own design, review and adversarial review), cycles in the
browser, cycle reports on pull requests, a hardening pass on both projects, and a
demo walkthrough. So the remaining weeks turn to getting the two projects used and
funded, and to two new pieces:

- **Subscriptions** (session kit): a creator charges a fixed amount once per period
  from a cell the subscriber controls, with no app or wallet online, and the
  subscriber can cancel at any time. Designed and reviewed before any code, as token
  sessions were.
- **Flamegraphs** (cycle tools): where inside a script the cycles go, per script
  group of a real transaction, in the CLI, the browser and the pull-request comment.
  It builds on ckb-debugger's own profiler rather than replacing it.
- **Adoption**: both packages at v1.0 on npm, the cycle report Action running on
  another CKB repository, a wallet compatibility table where every row is a testnet
  transaction, and issues or pull requests upstream for what the build ran into.

## What changed on 28 October: the third plan

By 27 October the plan's code was built through Week 9: subscriptions in CKB and in
tokens, the wallet table, flamegraphs in the CLI, the browser and the pull-request
comment. Both packages are on npm at 1.0.0, the cycle report Action has posted its
first public comment, and both projects are on the CKBuilder-projects tracker.

I then read recent Spark and Community Fund DAO threads to see what gets funded. What
I took from them:

- **Outside use counts most.** Committees and voters ask who uses a project before
  they ask what else it does. Public agreement from another team comes before code.
- **Spark funds work still ahead.** A project whose MVP is already complete can be
  sent away from Spark, so new features go in only when they are not part of a grant.
- **One Spark grant at a time per applicant.** Cycle tools go first; the session kit's
  application follows when the first one closes.
- **A first DAO ask stays small and testnet-first.** Audit and mainnet come after usage,
  not before it.

So the remaining weeks are harder in a different way: less building alone, more
evidence that someone else uses the work.

- **Mainnet cycle atlas** (cycle tools): what the most-used mainnet scripts cost, measured
  per script group with the same replay, published once as a reproducible report.
- **Demo checks** (both): the live demos are clicked through by a browser in CI every
  day, so a broken page is caught before a reviewer finds it.
- **Outside users** (both): the session kit offered to a community app that asked for
  fewer signature prompts; the cycle report Action set up on another CKB repository.
- **Upstream** (both): the issues found while building, filed with a reproduction and,
  where small, a fix.

## The weeks

| Week | Period | Session kit | Cycle tools | Public evidence |
|---|---|---|---|---|
| 1 | 26 Aug – 1 Sep | ✅ | | *[report](reports/week-01-report.md)* |
| 1.5 | 28 Sep – 3 Oct | ✅ | | *[report](reports/week-01.5-report.md)* |
| 2 | 5 – 10 Oct | ✅ Scaffold, CI; session lock on testnet; pay-per-read | ✅ Scaffold, per-group CLI, failure-path profiling, harness | *[report](reports/week-02-report.md)* |
| 3 | 12 – 17 Oct | ✅ Review fixes (errors 16–18), lock redeployed; examples, API reference | ✅ Review fixes: VM version by epoch, spoof-proof parsing, Type ID | *[report](reports/week-03-report.md)* |
| 4 | 19 – 24 Oct | ✅ Built ahead (14 – 18 Oct): CKB Place, pay-per-minute, token sessions, hardening, walkthrough | ✅ Built ahead: cycles in the browser, cycle reports on pull requests, hardening | Report |
| 5 | 26 – 31 Oct | ✅ v1.0 on npm; subscriptions designed, reviewed, on testnet (built ahead); related work in the README | ✅ v1.0 on npm; the Action's first public comment; flamegraphs (built ahead) | npm pages; [PR #1](https://github.com/luongthanhtung03/ckb-cycle-tools/pull/1); tracker issues #46, #47; review fixes reported back; forum post: the cycle comparison |
| 6 | 2 – 7 Nov | Demo checks in CI; offer the kit to CrowdCell or LockFit and get a public answer | **Mainnet cycle atlas**; demo checks in CI; ask CellScript or ckb-proxy-locks about the Action | Cycle tools → **Spark**; atlas report on Nervos Talk |
| 7 | 9 – 14 Nov | Integration plan with the app that said yes; short demo recordings | Spark work if approved: the Action as its own repository, on the GitHub Marketplace | Marketplace listing; recordings |
| 8 | 16 – 21 Nov | First integration steps on testnet with that app | The Action on another CKB repository (Spark) | A pull request in someone else's repo |
| 9 | 23 – 28 Nov | Upstream issues and pull requests (CCC, offckb, ckb-testtool) | Upstream (ckb-debugger) | Filed issues and PRs |
| 10 | 30 Nov – 5 Dec | Session kit → **Spark** when the cycle tools grant is closed | Spark docs, video, completion report | Spark completion report |
| 11 | 7 – 12 Dec | Spark work on the integration | Cycle tools `[DIS]`: a small first DAO ask (maintenance and adoption) | DAO discussion thread |
| 12 | 14 – 19 Dec | Final demo | Cycle tools `[VOT]` | Retrospective |

Subscriptions follow the token sessions path: design, review, code, then an
adversarial review before anything holds funds on testnet. If they need a change to
the lock, the change gets its own threat model first. The table is the order of
work, not a deadline; when a piece is done early the next one starts.

The related-work sections exist because the Spark and DAO reviews do not fund the
same idea twice: recurring payments (CKAutomata), shared spend limits (QuotaCell) and
Fiber access control (FiberLatch) sit close to parts of the session kit, so each
README says plainly what those projects do and where this one differs.

The demo is redeployed to Vercel every week from Week 3, so the deployed URL always
shows the current state.

## The checkpoint, with the fallback decided in advance

**⚠ Sat 24 Oct — the session lock must compile, pass its tests, and be on testnet.**
*Fallback:* the lock is written for ckb-js-vm instead, which already works here (the
counter Script, 23 tests, green CI). The cycle tools then measure exactly that
trade-off, so the fallback costs the session kit nothing it needs.

**Met on 8 October**, sixteen days early; the fallback was not needed. The cycle
tools measured the trade-off anyway, with both versions of the lock.

## Funding, kept honest

- **Spark = phase 1** (the prototype). **DAO = phase 2** (what comes after: mainnet,
  audit, maintenance). Both applications for a project are written in the same
  sitting so the two scopes stay clearly different.
- **One campaign live at a time.** If a project slips, its campaign slips with it.
- **Ask small.** The DAO quorum is 3× the amount asked for.
- **One Spark grant at a time** (28 October). Cycle tools apply first; the session kit
  applies when that grant is closed.
- **Usage before audit** (28 October). A first DAO ask covers maintenance and adoption
  on testnet; an audit and a mainnet deployment are asked for once someone uses the kit.

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
