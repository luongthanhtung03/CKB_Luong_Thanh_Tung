# Week 7 — P1 v0.1: pay-per-call on testnet

**Period:** Mon 26 – Sat 31 Oct 2026 · **Report:** Sat 31 Oct · **Budget:** 48h
**Phase:** F — Build and fund · first week of Phase 2

| Project | Hours | This week's milestone |
|---|---|---|
| **P1** `ckb-fiber-metering` | **32h** | A caller pays per API call over a Fiber channel, on testnet |
| **P3** `ckb-cycle-tools` | 12h | Polished: docs, CI, a README a stranger can follow |
| Campaigning | 4h | Write P3's Spark application draft |

| Level | What ships |
|---|---|
| **Floor** | One API call metered and paid for, end to end, however manually |
| **Target** | A running service where N calls cost N payments, on testnet, with tests |
| **Stretch** | Two services sharing one funded route |

## Why this week looks like this

Phase 2 opens with the hardest, least-known thing first. P1 is the flagship, it has
144 of the 288 build hours, and everything about it depends on the Fiber work from
Week 6 actually holding up under a real workload rather than a demo script.

**Get one call metered end to end before making anything good.** The failure mode
here is building a beautiful metering layer on top of a channel abstraction that
turns out not to work the way Week 6 suggested. One ugly end-to-end call on Monday
or Tuesday is worth more than three days of clean architecture.

P3 gets 12 hours because it is nearly done — the comparison harness from Week 4 is
most of it. This week makes it presentable, because next week it gets submitted.

## The day shape changes

Phase 2 drops the four-block structure. There is no new material block: the learning
is done, and what remains is building. The rule that replaces it:

**One primary project per day.** Never three in one day. Context-switching between
three codebases is how 48 hours produces 30 hours of work.

| Mon | Tue | Wed | Thu | Fri | Sat |
|---|---|---|---|---|---|
| P1 | P1 | P1 | P1 | P3 | P3 + report |

## Milestones

- ☐ A Fiber channel opened from P1's own code, not a script from Week 6
- ☐ One API call gated behind a payment
- ☐ N calls cost N payments, verified by a test
- ☐ The channel settles and the balance is right
- ☐ P3's README, docs and CI are presentable to a stranger
- ☐ P3's Spark application drafted

## Evidence to capture

| File | What it shows |
|---|---|
| `screenshots/week-07/01-first-metered-call.png` | One call, one payment |
| `screenshots/week-07/02-n-calls-n-payments.png` | The test proving it scales |
| `screenshots/week-07/03-channel-settled.png` | Settlement on the explorer |
| `screenshots/week-07/04-p3-ci-green.png` | P3's CI passing |
| `evidence/week-07-metering-run.log` | A full metered session |

## Next week

P1 metering and settlement hardened; P3 finished and **submitted to Spark**.
