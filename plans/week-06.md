# Week 6 — Fiber

**Period:** Mon 2 – Sat 7 Nov 2026 · **Report:** Sat 7 Nov · **Budget:** 48h
**Phase:** E — Fiber · last week of the learning phase

> **⚠ Second checkpoint.** See [Checkpoint](#-checkpoint-sat-24-oct).

| Level | What ships |
|---|---|
| **Floor** | Two Fiber nodes, one channel, one payment sent and settled |
| **Target** | A payment routed across three nodes, driven entirely from code, with the capstone scaffolded against it |
| **Stretch** | A UDT-funded channel, not just CKB |

## Why this week exists at all

This is the week the 8h/day pace bought. Weeks 1.5–5 cover the 215 hours of core
learning; this week is the extra.

It is spent on Fiber because Fiber is the single deepest risk in the plan. It is a
young project, its documentation is thinner than the rest of CKB's, and a multi-node
local setup is fiddly in ways that do not show up until you try it. **The capstone
depends on it entirely.**

Finding that out now, with a written fallback ready and six weeks still to run, is
worth far more than finding it out in Week 9.

The last two days scaffold the capstone, so that Phase 2 opens with a repository
structure and a green pipeline rather than with a blank directory.

## Days

| Day | Date | A — New (3h) | B — Prove it (3h) | C — Rust (1h) | D — Ship (1h) | Done when |
|---|---|---|---|---|---|---|
| Mon | 2 Nov | What a payment channel is; Lightning's model and where Fiber departs from it | Build and run **two** Fiber nodes locally; get them talking | Rust drip — reading Fiber's own source counts | Commit; reply to one forum thread | Two nodes are up and see each other as peers |
| Tue | 3 Nov | Channel lifecycle: open, fund, update, settle, close; what lands on-chain and when | Open a channel, send a payment, settle it, close it — by hand first | Rust drip | Explorer links for the funding and settlement transactions | A channel has opened and closed, and both on-chain transactions are on the explorer |
| Wed | 4 Nov 🔥 | HTLCs and invoices; how a payment is routed without trusting the middle | Add a **third** node; route a payment through it | Rust drip | Commit; evidence captured | A payment reaches a node my node has no direct channel with |
| Thu | 5 Nov 🔥 | The node RPC surface; what can be driven programmatically and what cannot | **Drive all of it from code** — open, pay, settle, close, with no manual steps. Write the failing tests first | Rust drip | Commit; evidence captured | A single script opens a channel, routes a payment and settles it, repeatably |
| Fri | 6 Nov | — | Scaffold the capstone: package layout, **LICENSE**, CI, and the first failing integration test | Rust drip | Commit; evidence captured | The capstone builds and its first test fails for the right reason |
| Sat | 7 Nov | — | Write the capstone's architecture note while it is fresh; report; push | — | Report, matrix, push | The architecture note says what the capstone is, and what it deliberately is not |

🔥 Wednesday and Thursday. Multi-hop routing is where a payment channel network stops
being "two people with a shared balance" and starts being a network — and it is the
part most likely to not work first time. Thursday's programmatic control is the thing
the capstone is actually built on; doing it by hand does not count.

## ⚠ Checkpoint: Sat 7 Nov

**By the end of this week, a payment must route across three nodes under program
control.** Phase 2 opens on Monday, and the whole capstone is allocated on the
assumption that Fiber works.

**If it has not happened by Saturday, the fallback fires before Phase 2 opens:**

> The capstone pivots to a **simpler off-chain settlement model** — signed usage
> receipts, accumulated off-chain, settled periodically on-chain. This keeps the
> entire pay-per-use story and all of the browser self-custody session work. What it
> drops is the routing layer, which is the part that was not working anyway.

The decision is made on Saturday 7 November, in the report, in writing. Not carried
into Week 7 as an open question.

## Scaffolding — what "scaffolded" means

Not an empty directory with a README:

- A README that states what the capstone is and what it is not, in plain language.
- A CI job extending `.github/workflows/ci.yml` — including the `ckb-debugger`
  download step, which is the pattern that already works here.
- **The first integration test, written and failing.** Writing the test before the
  implementation is the habit that kept Week 1's counter Script honest, and the
  capstone is where it matters most.
- One real commit. Not "initial commit" — something that does a thing.

## Evidence to capture

| File | What it shows |
|---|---|
| `screenshots/week-06/01-two-nodes-peered.png` | Two Fiber nodes connected |
| `screenshots/week-06/02-channel-funded.png` | The funding transaction on the explorer |
| `screenshots/week-06/03-payment-settled.png` | A payment sent and settled |
| `screenshots/week-06/04-multihop-route.png` | A payment across three nodes |
| `screenshots/week-06/05-programmatic-run.png` | The whole cycle driven by one script |
| `screenshots/week-06/06-capstone-scaffold.png` | The capstone building, first test failing as intended |
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

Phase 2 opens. Capstone v0.1 — pay-per-call working on testnet.
