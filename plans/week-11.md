# Week 11 — P1 v0.2, and P2's vote

**Period:** Mon 23 – Sat 28 Nov 2026 · **Report:** Sat 28 Nov · **Budget:** 48h
**Phase:** F — Build and fund

| Project | Hours | This week's milestone |
|---|---|---|
| **P1** `ckb-fiber-metering` | 26h | v0.2 — recovery paths, device loss, CI green |
| **P2** `ckb-session-kit` | 10h | Hardened against what real P1 usage exposed |
| **P3** `ckb-cycle-tools` | 2h | — |
| Campaigning | 10h | **P2 `[DIS]` 23–29 Nov** · **forum post #3** |

| Level | What ships |
|---|---|
| **Floor** | P2's `[DIS]` posted, and P1's CI green on a clean machine |
| **Target** | That, plus a user who loses their device can recover their channel balance |
| **Stretch** | P2's `[DIS]` clears 30 likes early |

## Why this week looks like this

**This is the last week P1 gets real build hours.** Week 12 is half writing. Anything
architectural that is not done by Saturday 28 November does not go into P1 — it goes
into the "what phase 2 would add" section of the DAO proposal, which is a better place
for it anyway.

**Device loss is the question that decides whether P1 is fundable.** Self-custody in
a browser means the keys live somewhere that can be cleared, and "your money is gone
if you clear your cookies" is not a product. Whatever the answer is — a recovery
phrase, a co-signing fallback, an on-chain timeout that returns funds — it has to
exist and it has to be demonstrated.

P2 gets ten hours of hardening driven by what using it inside P1 actually exposed.
Real usage is the only honest source of a library's bug list.

## Forum post #3

The third and last of the writing thread. The subject writes itself by now: a Fiber
integration write-up — what it took to drive Fiber from application code, what the
documentation does not say, and what I would tell someone starting on Monday.

Same bar as the first two: **write what did not exist when I needed it.** Week 6 was
spent reading Fiber's source because the documentation stopped. That gap is the post.

It also lands mid-campaign, three days into P2's `[DIS]`, which does no harm at all.

## Milestones

- ☐ P2 `[DIS]` posted · link and daily like count recorded
- ☐ Every reply answered within a day
- ☐ Device loss recovery works, and is demonstrated on video or in a test
- ☐ A channel left open by a vanished client resolves without manual intervention
- ☐ P1's CI green on a clean machine, including the failure paths
- ☐ Forum post #3 published · link recorded
- ☐ P2 hardened against the issues real usage exposed

## Day shape

| Mon | Tue | Wed | Thu | Fri | Sat |
|---|---|---|---|---|---|
| Campaign + P1 | P1 | P1 | P1 | P2 | Post #3 + report |

Thirty minutes every morning on the `[DIS]` thread before anything else.

## ⚠ The Week 12 scope decision

**On Saturday 28 November, decide what P1 ships with — and write it down.** Week 12
has 18 build hours for P1 and 22 hours of writing. Anything still open on 30 November
is already cut; the only question is whether that is acknowledged on the 28th or
discovered on the 4th.

## Evidence to capture

| File | What it shows |
|---|---|
| `screenshots/week-11/01-p2-dis-posted.png` | P2's discussion post live |
| `screenshots/week-11/02-device-loss-recovery.png` | Recovery after losing the browser |
| `screenshots/week-11/03-abandoned-channel-resolved.png` | A vanished client, resolved |
| `screenshots/week-11/04-p1-ci-green.png` | Full CI on a clean machine |
| `screenshots/week-11/05-post-3.png` | Forum post #3 |
| `evidence/week-11-recovery-test.log` | The recovery path test suite |

## Next week

P1 ships. P2's vote opens. P1 goes to Spark, and the twelve-week retrospective.
