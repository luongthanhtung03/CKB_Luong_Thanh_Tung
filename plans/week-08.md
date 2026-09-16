# Week 8 — P3 ships and goes to Spark

**Period:** Mon 2 – Sat 7 Nov 2026 · **Report:** Sat 7 Nov · **Budget:** 48h
**Phase:** F — Build and fund

| Project | Hours | This week's milestone |
|---|---|---|
| **P1** `ckb-fiber-metering` | 26h | Metering and settlement survive the failure paths |
| **P3** `ckb-cycle-tools` | 10h | **Finished** — v1.0 tagged |
| Campaigning | **12h** | **P3 → Spark**, and P3's DAO ask written in the same sitting |

| Level | What ships |
|---|---|
| **Floor** | P3 submitted to Spark |
| **Target** | That, plus P1 handling a payment that fails mid-call without losing money or double-charging |
| **Stretch** | P3's `[DIS]` post drafted and reviewed before Monday |

## Why this week looks like this

**The first funding application goes out.** P3 is the cheapest of the three projects
and the first finished, which is exactly why it goes first: it puts a grant on the
record in early November, and whatever the committee says comes back in about a week
— in time to inform how P2's and P1's applications are written.

P1's work this week is the unglamorous half. A metering system that works when
everything succeeds is a demo. What makes it fundable is what happens when a payment
fails halfway through a call, when the channel runs out of capacity mid-session, and
when the client disappears without settling.

## The two applications, written together

This is the week the rule in [`funding-track.md`](funding-track.md) gets its first
test. Both of P3's applications are written **in the same sitting**:

- **Spark (phase 1)** — the prototype. The profiler and the comparison harness that
  exist now.
- **Community Fund DAO (phase 2)** — what comes after. Keeping it working against
  upstream changes, more platforms, CI integration.

They must describe different work, visibly, to someone reading quickly. If I cannot
tell them apart in ten seconds, neither can a voter — and three funding asks in six
weeks only reads as a builder shipping if each one buys something the last did not.

**If I cannot describe a genuine phase 2 for P3, it takes the Spark grant and stops
there.** That is an acceptable outcome, decided this week rather than fudged in
November.

## Milestones

- ☐ A payment failing mid-call leaves no money lost and no double charge
- ☐ Channel capacity exhaustion is handled, not crashed on
- ☐ A client that disappears without settling is recoverable
- ☐ P3 v1.0 tagged, CI green, README stranger-runnable, LICENSE present
- ☐ P3 Spark application **submitted** · link recorded in `funding-track.md`
- ☐ P3 phase-1/phase-2 split written into `funding-track.md`

## Day shape

| Mon | Tue | Wed | Thu | Fri | Sat |
|---|---|---|---|---|---|
| P1 | P1 | P1 | P3 | Applications | Applications + report |

## Evidence to capture

| File | What it shows |
|---|---|
| `screenshots/week-08/01-payment-failure-handled.png` | A mid-call failure, handled |
| `screenshots/week-08/02-capacity-exhausted.png` | Running out of channel capacity, gracefully |
| `screenshots/week-08/03-p3-v1-tagged.png` | P3 v1.0 released |
| `screenshots/week-08/04-spark-submitted.png` | The Spark application, submitted |
| `evidence/week-08-failure-path-tests.log` | The failure-path test suite |

## Next week

P3's `[DIS]` goes live — seven days, 30 likes needed. P2 gets extracted from P1.
