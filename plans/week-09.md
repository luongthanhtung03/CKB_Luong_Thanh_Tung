# Week 9 — Fiber from code, and the capstone scaffold

**Period:** Mon 9 – Sat 14 Nov 2026 · **Report:** Sat 14 Nov · **Budget:** 18h
**Phase:** D — Payment channels

| Level | What ships |
|---|---|
| **Floor** | A TypeScript client that opens a channel and pays an invoice |
| **Target** | That, plus the capstone scaffolded with its **failing tests written first** |
| **Stretch** | A channel funded with my Week 3 token rather than plain CKB |

## Why this week looks like this

Week 8 did everything by hand. Nothing built on hand-driven steps survives, so this
week converts all of it into code — and then writes the capstone's tests *before*
its implementation, so that Weeks 10 and 11 have something unambiguous to build
against.

Writing the tests first is not a purity exercise. It is how the scope stops moving
once building starts.

## Days

| Day | Date | Study (≈1h) | Build (≈2h) | Done when |
|---|---|---|---|---|
| Mon | 9 Nov | The Fiber RPC surface, method by method | A typed TypeScript client; open a channel from code | Channel opened without touching a terminal |
| Tue | 10 Nov | Invoice encoding; payment states | Generate and pay invoices from code | Payment completed programmatically, state confirmed |
| Wed | 11 Nov 🔥 | — | Failure paths: no route, insufficient balance, peer offline, timeout | Each failure produces a distinct, handled error — not a hang |
| Thu | 12 Nov | Re-read the capstone brief and the feedback on it | Scaffold `capstone/` — metered API server, Fiber payer, session store | Skeleton runs and does nothing, cleanly |
| Fri | 13 Nov | — | **Write the failing tests**: one per invariant from the brief | Every invariant has a test, and every test fails for the right reason |
| Sat | 14 Nov | — | Report; push; skills matrix | Report published |

🔥 Wednesday is the hard day. Happy paths are easy; a payment system is defined by
what it does when the money does not move. A peer that goes offline mid-payment is
the case that matters, and the one most likely to hang rather than fail.

## Reading

| Day | Study item | Where |
|---|---|---|
| Mon | The Fiber RPC surface | [Fiber RPC reference](https://github.com/nervosnetwork/fiber/blob/develop/crates/fiber-lib/src/rpc/README.md) — read all of it once, then the channel module properly |
| Tue | Invoice encoding, payment states | Same reference, invoice and payment modules · [BOLT 11](https://github.com/lightning/bolts/blob/master/11-payment-encoding.md) for the encoding Fiber's invoices are modelled on |
| Thu | My own capstone brief | `capstone/BRIEF.md`, written Week 7, plus whatever Neon and DevRel sent back |

Fiber ships a `fiber-cli` crate that exposes every RPC method from the command line.
Reading its subcommands is the fastest way to see the whole API surface at once,
before writing a typed client against it.

## The invariants to test

From the capstone brief. Sharpen the wording, but they will be close to:

1. A request is never served before its payment is confirmed.
2. A session never spends more than its funded cap.
3. A failed payment never leaves the client debited and the service unserved.
4. A closed channel never loses funds that were owed at closing time.
5. A replayed payment proof never buys a second request.

Invariant 5 is the one to think hardest about. It is where this kind of system
usually breaks.

## Rust drip

Wind down to reading only — the remaining weeks are TypeScript-heavy. Keep reading
Fiber's source when its behaviour surprises me.

## Evidence to capture

| File | What it shows |
|---|---|
| `screenshots/week-09/01-channel-from-code.png` | Channel opened programmatically |
| `screenshots/week-09/02-invoice-paid.png` | Invoice paid from code |
| `screenshots/week-09/03-failure-handled.png` | Peer-offline handled, not hanging |
| `screenshots/week-09/04-failing-tests.png` | Invariant tests, failing as intended |
| `evidence/week-09-fiber-client.log` | Full programmatic run |

## Next week

Make the failing tests pass. Capstone v0.1.
