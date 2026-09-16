# Week 9 — P3's first vote, and P2 gets extracted

**Period:** Mon 9 – Sat 14 Nov 2026 · **Report:** Sat 14 Nov · **Budget:** 48h
**Phase:** F — Build and fund

| Project | Hours | This week's milestone |
|---|---|---|
| **P1** `ckb-fiber-metering` | 24h | Browser self-custody session working inside P1 |
| **P2** `ckb-session-kit` | 14h | The session layer extracted into its own library |
| **P3** `ckb-cycle-tools` | 2h | Respond to Spark feedback |
| Campaigning | 8h | **P3 `[DIS]` live, 9–15 Nov** — answer every reply, daily |

| Level | What ships |
|---|---|
| **Floor** | P3's `[DIS]` posted, and a browser session that signs one payment without a wallet popup |
| **Target** | That, plus P2 existing as a separate installable package with its own tests |
| **Stretch** | P3's `[DIS]` clears 30 likes before day 7 |

## Why this week looks like this

**Two things start that cannot be rushed later.**

The browser self-custody session is the heart of P1's story — pay-per-call is
unusable if every call opens a wallet dialog. It is also, by construction, the whole
of P2. So this week builds it *inside* P1 where it can be tested against something
real, and then pulls it out.

P2 could not have started earlier. It is extracted, not designed from scratch, and
extracting something that does not exist yet is not possible. That is the cost of the
high-reuse choice, and it is why P2's Spark submission is in Week 10 rather than Week 8.

## The `[DIS]` phase is not post-and-wait

P3's discussion post goes up Monday and needs **30 likes by Sunday 15 November** to
reach a vote. Eight hours are allocated to campaigning this week and most of them are
replies.

**Answer every reply the day it appears.** A question left for three days is a
proposal that looks abandoned. This is the single highest-leverage use of the
campaigning hours, and it is the thing that ten weeks of daily forum presence was
building toward.

**If it does not reach 30 likes by day 7:** do not repost it. That burns the same
audience twice. Pull it, publish the Spark completion report instead, and let P2's
campaign be the first vote — by then there are four more weeks of reputation behind
it. This is written down in [`funding-track.md`](funding-track.md) and it is decided
on the day, not deferred.

## Milestones

- ☐ P3 `[DIS]` posted · link and daily like count recorded in `funding-track.md`
- ☐ Every reply answered within a day
- ☐ A browser session signs a payment with no wallet interaction
- ☐ The session survives a page reload
- ☐ Session key material never leaves the browser, and I can prove it
- ☐ P2 is a separate package with its own tests and CI, consumed by P1 as a dependency

## Day shape

| Mon | Tue | Wed | Thu | Fri | Sat |
|---|---|---|---|---|---|
| Campaign + P1 | P1 | P1 | P2 | P2 | P2 + report |

Campaigning is not a block this week — it is thirty minutes every morning, checking
the thread before anything else.

## Evidence to capture

| File | What it shows |
|---|---|
| `screenshots/week-09/01-dis-posted.png` | The `[DIS]` post live |
| `screenshots/week-09/02-session-no-popup.png` | A payment signed with no wallet dialog |
| `screenshots/week-09/03-session-survives-reload.png` | Session persistence |
| `screenshots/week-09/04-p2-extracted.png` | P2 installed and used by P1 |
| `evidence/week-09-session-tests.log` | Session library test output |

## Next week

P3's vote opens. P2 reaches v1.0 and goes to Spark.
