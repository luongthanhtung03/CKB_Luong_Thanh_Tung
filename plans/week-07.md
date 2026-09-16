# Week 7 — Capstone v0.1: pay-per-call on testnet

**Period:** Mon 26 – Sat 31 Oct 2026 · **Report:** Sat 31 Oct · **Budget:** 48h
**Phase:** F — Capstone · first week of Phase 2

| Level | What ships |
|---|---|
| **Floor** | One API call metered and paid for, end to end, however manually |
| **Target** | A running service where N calls cost N payments, on testnet, with tests |
| **Stretch** | Two services sharing one funded route |

## Why this week looks like this

Phase 2 opens with the hardest, least-known thing first: whether the Fiber work from
Week 6 holds up under a real workload rather than a demo script.

**Get one call metered end to end before making anything good.** The failure mode here
is building a careful metering layer on top of a channel abstraction that turns out
not to work the way Week 6 suggested. One ugly end-to-end call on Monday is worth more
than three days of clean architecture built on an assumption.

## The day shape changes

Phase 2 drops the four-block structure. There is no new-material block — the learning
is done, and what remains is building.

| Mon | Tue | Wed | Thu | Fri | Sat |
|---|---|---|---|---|---|
| Channel from my own code | First metered call | N calls, N payments | Settlement | Tests and tidying | Report |

## Milestones

- ☐ A Fiber channel opened from the capstone's own code, not a script from Week 6
- ☐ One API call gated behind a payment
- ☐ N calls cost N payments, verified by a test rather than by watching
- ☐ The channel settles and the closing balance is right
- ☐ The whole flow runs from one command

## Evidence to capture

| File | What it shows |
|---|---|
| `screenshots/week-07/01-first-metered-call.png` | One call, one payment |
| `screenshots/week-07/02-n-calls-n-payments.png` | The test proving it scales |
| `screenshots/week-07/03-channel-settled.png` | Settlement on the explorer |
| `evidence/week-07-metering-run.log` | A full metered session |

## Next week

The failure paths — what happens when a payment does not succeed.
