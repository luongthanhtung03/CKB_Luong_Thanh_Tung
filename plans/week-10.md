# Week 10 — Capstone v0.1

**Period:** Mon 16 – Sat 21 Nov 2026 · **Report:** Sat 21 Nov · **Budget:** 18h
**Phase:** E — Capstone

| Level | What ships |
|---|---|
| **Floor** | One paid API call working end to end on testnet |
| **Target** | A working pay-per-call demo: priced endpoint, invoice, payment, service, spend cap |
| **Stretch** | A second service paid from the same funded route — the RCS pattern |

## Why this week looks like this

This is the week the capstone becomes real. The tests were written in Week 9, so
the job is narrow: make them pass, in order, without inventing new scope.

The idea: an API that charges per request, paid over a Fiber channel. The client
opens one channel, then makes hundreds of calls, each settled instantly off-chain
for a fraction of a CKB. On-chain that is two transactions total. That is a thing
the chain alone cannot do, and it is what payment channels are for.

## Days

> From Week 10 the **Study** column becomes **Focus**. By this point the reading is
> done and the work is building: no new sources, all three hours on the capstone.
> Anything still needed is looked up as it comes up, from the Reading sections of
> Weeks 8 and 9.

| Day | Date | Focus | Build | Done when |
|---|---|---|---|---|
| Mon | 16 Nov | Pricing and challenge | A metered endpoint that returns a price and a payment challenge when unpaid | An unpaid request is refused with a priced challenge |
| Tue | 17 Nov | Invoice per request | Server issues an invoice; client pays over Fiber | Invoice generated and paid for one call |
| Wed | 18 Nov 🔥 | Proof of payment | Server verifies payment, then serves — and never the other way round | Invariants 1 and 5 pass: nothing served unpaid, no proof reusable |
| Thu | 19 Nov | Session state | Track spend per session; enforce the funded cap | Invariant 2 passes: the cap holds under repeated calls |
| Fri | 20 Nov | End to end | The full happy path on testnet; record a demo | A hundred calls over one channel, two on-chain transactions |
| Sat | 21 Nov | — | Report; push; skills matrix | Report published with the demo |

🔥 Wednesday is the hard day, and the one that decides whether this is a real system
or a toy. Verify-then-serve must be genuinely ordered, and a payment proof must be
single-use. Replay is where this class of system usually breaks.

## The demo to record

Not a screenshot — a short screen recording:

1. A funded channel, open.
2. A hundred API calls in a loop, each paid, each served, latency visible.
3. The spend counter climbing and stopping at the cap.
4. The explorer showing **two** on-chain transactions for all hundred calls.

Point 4 is the whole argument. It is the number that makes the case on its own.

## Scope discipline

If Wednesday slips, Thursday and Friday absorb it and the Stretch is dropped. What
does not happen is broadening. New ideas go into `notes/capstone-ideas.md` and stay
there until Week 12 has shipped.

## Evidence to capture

| File | What it shows |
|---|---|
| `screenshots/week-10/01-unpaid-refused.png` | Unpaid request refused with a price |
| `screenshots/week-10/02-invoice-paid.png` | Invoice paid, request served |
| `screenshots/week-10/03-replay-refused.png` | A reused payment proof rejected |
| `screenshots/week-10/04-cap-enforced.png` | Spend cap holding |
| `screenshots/week-10/05-two-txs.png` | Explorer: 100 calls, 2 transactions |
| `evidence/week-10-demo.md` | Demo recording link and transcript |
| `evidence/week-10-invariant-tests.log` | Invariant tests passing |

## Next week

Move the client into the browser: self-custody sessions, no account required.
