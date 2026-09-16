# Week 6 — Fiber head-start, then scaffold

**Period:** Mon 19 – Sat 24 Oct 2026 · **Report:** Sat 24 Oct · **Budget:** 48h
**Phase:** E — Fiber · last week of the learning phase

> **⚠ Second checkpoint.** See [Checkpoint](#-checkpoint-sat-24-oct).

| Level | What ships |
|---|---|
| **Floor** | Two Fiber nodes, one channel, one payment sent and settled |
| **Target** | A payment routed across three nodes, driven entirely from code, plus all three repositories scaffolded with green CI |
| **Stretch** | A UDT-funded channel, not just CKB |

## Why this week exists at all

This is the week the 8h/day choice bought. In the six-week version of the plan, Weeks
1.5–5 cover the 215 hours of core learning; this week is the extra.

It is spent on Fiber because Fiber is the single deepest risk in the plan. It is a
young project, its documentation is thinner than the rest of CKB's, and a multi-node
local setup is fiddly in ways that do not show up until you try it. **P1 depends on it
entirely.**

Finding that out now, with a written fallback ready, is worth far more than finding
it out in Week 9 with two other projects already in flight.

The last two days scaffold all three repositories. Doing it now rather than in Week 7
means Phase 2 opens with three green CI pipelines already running, and the technical
sections of all three grant applications drafted while the architecture is fresh
rather than reconstructed in December.

## Days

| Day | Date | A — New (3h) | B — Prove it (3h) | C — Rust (1h) | D — Ship (1h) | Done when |
|---|---|---|---|---|---|---|
| Mon | 19 Oct | What a payment channel is; Lightning's model and where Fiber departs from it | Build and run **two** Fiber nodes locally; get them talking | Rust drip — reading Fiber's own source counts | Commit; reply to one forum thread | Two nodes are up and see each other as peers |
| Tue | 20 Oct | Channel lifecycle: open, fund, update, settle, close; what lands on-chain and when | Open a channel, send a payment, settle it, close it — by hand first | Rust drip | Explorer links for the funding and settlement transactions | A channel has opened and closed, and both on-chain transactions are on the explorer |
| Wed | 21 Oct 🔥 | HTLCs and invoices; how a payment is routed without trusting the middle | Add a **third** node; route a payment through it | Rust drip | Commit; evidence captured | A payment reaches a node my node has no direct channel with |
| Thu | 22 Oct 🔥 | The node RPC surface; what can be driven programmatically and what cannot | **Drive all of it from code** — open, pay, settle, close, with no manual steps. Write the failing tests first | Rust drip | Commit; evidence captured | A single script opens a channel, routes a payment and settles it, repeatably |
| Fri | 23 Oct | — | Scaffold `ckb-fiber-metering`, `ckb-session-kit`, `ckb-cycle-tools`: README, **LICENSE**, `.gitignore`, CI | Rust drip | Three repositories pushed public | Three green CI badges |
| Sat | 24 Oct | — | Draft the technical sections of all three grant applications; report; push | — | Report, matrix, funding tally, push | Each project has a phase-1/phase-2 scope split written in `funding-track.md` |

🔥 Wednesday and Thursday. Multi-hop routing is where a payment channel network stops
being "two people with a shared balance" and starts being a network — and it is the
part most likely to not work first time. Thursday's programmatic control is the thing
P1 is actually built on; doing it by hand does not count.

## ⚠ Checkpoint: Sat 24 Oct

**By the end of this week, a payment must route across three nodes under program
control.** Phase 2 opens on Monday and P1 has 144 hours allocated to it on the
assumption that Fiber works.

**If it has not happened by Saturday, the fallback fires before Phase 2 opens:**

> P1 pivots to a **simpler off-chain settlement model** — signed usage receipts,
> accumulated off-chain, settled periodically on-chain. This keeps the entire Web5
> pay-per-use story, keeps the browser self-custody session work, and therefore
> leaves **P2 completely unaffected**. What it drops is the routing layer, which is
> the part that was not working anyway.

The decision is made on Saturday 24 October, in the report, in writing. Not carried
into Week 7 as an open question.

## Scaffolding — what "scaffolded" means

Not an empty repository with a README. Each of the three gets:

- A **LICENSE** file. Spark requires open-source licensing and it is not negotiable,
  so it goes in the first commit rather than being remembered in November.
- A README that states what the project is and what it is not, in plain language.
- A CI pipeline copied from this repository's `.github/workflows/ci.yml` — including
  the `ckb-debugger` download step, which is the pattern that already works.
- The `.gitignore` from this repository, so testnet keys are covered from commit one.
- One real commit. Not "initial commit" — something that does a thing.

`ckb-cycle-tools` starts furthest along: the comparison harness from Week 4 is most
of it already.

## Evidence to capture

| File | What it shows |
|---|---|
| `screenshots/week-06/01-two-nodes-peered.png` | Two Fiber nodes connected |
| `screenshots/week-06/02-channel-funded.png` | The funding transaction on the explorer |
| `screenshots/week-06/03-payment-settled.png` | A payment sent and settled |
| `screenshots/week-06/04-multihop-route.png` | A payment across three nodes |
| `screenshots/week-06/05-programmatic-run.png` | The whole cycle driven by one script |
| `screenshots/week-06/06-three-repos-ci.png` | Three green CI badges |
| `evidence/week-06-fiber-node.log` | Node logs from the multi-hop run |
| `evidence/week-06-channel-lifecycle.json` | The on-chain transactions for open and close |

## Reading

| Day | Study item | Where |
|---|---|---|
| Mon | Payment channels, Fiber's model | [`nervosnetwork/fiber`](https://github.com/nervosnetwork/fiber) README · [Fiber docs](https://docs.nervos.org/docs/fiber/) |
| Tue | Channel lifecycle | The Fiber repository's own docs directory — and the source where the docs stop |
| Wed | HTLCs, invoices, routing | Lightning's BOLT specs for the concepts; Fiber's source for what it actually does |
| Thu | The node RPC | The RPC definitions in the Fiber repository — this is the authoritative answer |

**Expect to read source this week.** Fiber's documentation is younger than the rest
of CKB's. That is not a complaint — it is why this week is worth six days, and it is
also where a contribution opportunity is most likely to appear.

## Next week

Phase 2 opens. P1 v0.1 — pay-per-call working on testnet.
