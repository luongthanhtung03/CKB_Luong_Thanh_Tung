# Week 8 — The failure paths

**Period:** Mon 16 – Sat 21 Nov 2026 · **Report:** Sat 21 Nov · **Budget:** 48h
**Phase:** F — Capstone

| Level | What ships |
|---|---|
| **Floor** | A payment that fails mid-call loses no money and double-charges nobody |
| **Target** | All three failure paths below handled, with tests |
| **Stretch** | A fuzz run that interrupts payments at random points and always settles correctly |

## Why this week looks like this

A metering system that works when everything succeeds is a demo. What makes it a
project is what happens when things go wrong, and in a payment system "goes wrong"
means someone's money is in the wrong place.

Three failures, in order of how likely they are:

1. **A payment fails halfway through a call.** Was the call served? Was it charged?
   Both answers have to be the same answer.
2. **The channel runs out of capacity mid-session.** The service has to stop cleanly
   rather than serve calls it cannot charge for.
3. **The client disappears without settling.** The funds cannot simply be stuck.

None of these have a tutorial. All three are the difference between something I would
demonstrate and something I would let a stranger use.

## Day shape

| Mon | Tue | Wed | Thu | Fri | Sat |
|---|---|---|---|---|---|
| Mid-call failure | Mid-call failure | Capacity exhaustion | Abandoned client | Tests | Report |

## Milestones

- ☐ A payment failing mid-call leaves no money lost and no double charge
- ☐ Channel capacity exhaustion stops the service cleanly, with a useful error
- ☐ A client that vanishes without settling is recoverable
- ☐ Each failure path has a test that provokes it deliberately
- ☐ The test suite runs green on a clean machine in CI

## The bar

Each failure path needs a test that **causes** the failure rather than mocking it.
A test that asserts the error handler works when called directly proves the handler
compiles, not that the system recovers.

## Evidence to capture

| File | What it shows |
|---|---|
| `screenshots/week-08/01-payment-failure-handled.png` | A mid-call failure, handled |
| `screenshots/week-08/02-capacity-exhausted.png` | Running out of channel capacity, gracefully |
| `screenshots/week-08/03-abandoned-client.png` | A vanished client, resolved |
| `screenshots/week-08/04-ci-green.png` | The failure-path suite green in CI |
| `evidence/week-08-failure-path-tests.log` | Full test output |

## Next week

Browser self-custody sessions — paying without a wallet dialog on every call.
