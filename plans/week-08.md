# Week 8 — Fiber: two nodes, a channel, a payment

**Period:** Mon 2 – Sat 7 Nov 2026 · **Report:** Sat 7 Nov · **Budget:** 18h
**Phase:** D — Payment channels

| Level | What ships |
|---|---|
| **Floor** | One Fiber node built and running against testnet |
| **Target** | Two nodes, a channel opened, a payment sent, the channel closed cooperatively |
| **Stretch** | A third node, and a payment routed multi-hop through it |

## Why this week looks like this

The capstone lives here, so this week is about making the thing real before
depending on it. Fiber is newer than the rest of the stack: fewer tutorials, more
reading of source and of the documentation's rough edges. That is a feature — it is
where the opportunity map says the demand is, and it is where fewest people have
been.

Expect this week to be the least guided so far. Budget for reading code.

## Days

| Day | Date | Study (≈1h) | Build (≈2h) | Done when |
|---|---|---|---|---|
| Mon | 2 Nov | Payment channels from first principles; Lightning's commitment transactions and HTLCs | `notes/payment-channels.md` — in my own words, no jargon unexplained | I can explain why a channel is safe without trusting the other side |
| Tue | 3 Nov | [Fiber docs](https://www.fiber.world/docs) | Build and run one Fiber node against CKB testnet | Node running, synced, RPC answering |
| Wed | 4 Nov | Channel lifecycle: funding, commitment, closing | Run a second node; connect the two as peers | The nodes see each other |
| Thu | 5 Nov 🔥 | — | Open a channel between them, funded with testnet CKB | Funding transaction visible on the explorer |
| Fri | 6 Nov | Invoices and keysend | Send payments across the channel; close it cooperatively | Payment settled, closing transaction public |
| Sat | 7 Nov | — | Report; push; skills matrix | Report published with funding and closing links |

🔥 Thursday is the hard day. Opening a channel touches both the off-chain protocol
and the chain at once, and the failure modes are unfamiliar — peers that connect but
will not fund, capacity that is locked in the wrong direction, timeouts that look
like hangs.

## Reading

Fiber has less written documentation than the rest of CKB, so from here the
repository itself is a primary source.

| Day | Study item | Where |
|---|---|---|
| Mon | Payment channels from first principles | [The Lightning Network paper](https://lightning.network/lightning-network-paper.pdf) — sections 2–3 are the ones that matter · [Fiber overview](https://www.fiber.world/) |
| Tue | Running a node | [Fiber docs](https://www.fiber.world/docs) · [nervosnetwork/fiber](https://github.com/nervosnetwork/fiber) — the README's quick start |
| Wed | Channel lifecycle | [Fiber RPC reference](https://github.com/nervosnetwork/fiber/blob/develop/crates/fiber-lib/src/rpc/README.md) — the channel module |
| Fri | Invoices and keysend | Fiber RPC reference — the invoice and payment modules · [Fiber showcase](https://www.fiber.world/showcase) for how others use them |

The Lightning paper is long and Fiber is not identical to it. Read it for the *idea*
— why exchanging signed promises is safe when a chain can be appealed to — and take
the mechanics from Fiber's own documentation.

## What to write down as I go

Fiber's documentation is younger than the rest of CKB's. Anything that costs me
more than twenty minutes goes into `notes/findings/` immediately, with the
reproduction. By Week 12 that file is either a contribution or a blog post — the
Week 1 findings are the precedent, and they worked.

## Rust drip

Fiber's node is Rust. Reading it counts:

- Read the channel state machine — do not try to understand all of it, just follow
  one payment through
- Rust Book chapter 16 (concurrency) if the source demands it

## Evidence to capture

| File | What it shows |
|---|---|
| `screenshots/week-08/01-node-running.png` | Fiber node synced against testnet |
| `screenshots/week-08/02-peers-connected.png` | Two nodes peered |
| `screenshots/week-08/03-channel-open.png` | Channel funding on the explorer |
| `screenshots/week-08/04-payment-sent.png` | A payment settled off-chain |
| `screenshots/week-08/05-channel-closed.png` | Cooperative close on the explorer |
| `evidence/week-08-fiber-node.log` | Node startup and sync |
| `evidence/week-08-channel-lifecycle.json` | Channel open, pay, close |

## Next week

Drive all of it from TypeScript, and scaffold the capstone.
