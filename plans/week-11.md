# Week 11 — v0.2: recovery, and the last build week

**Period:** Mon 23 – Sat 28 Nov 2026 · **Report:** Sat 28 Nov · **Budget:** 48h
**Phase:** F — Capstone

| Level | What ships |
|---|---|
| **Floor** | CI green on a clean machine, including every failure path |
| **Target** | A user who loses their device can recover their channel balance |
| **Stretch** | Forum post #3 published — the Fiber integration write-up |

## Why this week looks like this

**This is the last week with real build hours.** Week 12 is half writing. Anything
architectural that is not done by Saturday 28 November does not go into the capstone
— it goes into the "future work" section, which is a more honest place for it than a
rushed implementation.

**Device loss is the question that decides whether this is a product or a demo.**
Self-custody in a browser means the key lives somewhere that can be cleared, and
"your money is gone if you clear your browser data" is not something I would ship.

Whatever the answer turns out to be — a recovery phrase, a co-signing fallback, an
on-chain timeout that returns the funds to the payer — it has to exist and it has to
be demonstrated rather than described.

## Day shape

| Mon | Tue | Wed | Thu | Fri | Sat |
|---|---|---|---|---|---|
| Recovery design | 🔥 Recovery implementation | Recovery tests | CI hardening | Post #3 | Report |

🔥 Tuesday. Recovery from lost key material is a genuine design problem with no
default answer, and the wrong choice is one that quietly reintroduces custody.

## Forum post #3

The third and last of the writing thread: a Fiber integration write-up — what it took
to drive Fiber from application code, what the documentation does not cover, and what
I would tell someone starting on Monday.

Same bar as the first two: **write what did not exist when I needed it.** Week 6 was
spent reading Fiber's source because the documentation stopped. That gap is the post.

## Milestones

- ☐ Device-loss recovery works, and is demonstrated in a test or on video
- ☐ A channel left open by a vanished client resolves without manual intervention
- ☐ Recovery does not reintroduce custody — I can explain why
- ☐ CI green on a clean machine, including the failure paths
- ☐ Forum post #3 published

## ⚠ The Week 12 scope decision

**On Saturday 28 November, decide what the capstone ships with — and write it down in
the report.** Week 12 has roughly 18 build hours and the rest is documentation and the
retrospective. Anything still open on 30 November is already cut; the only question is
whether that is acknowledged on the 28th or discovered on the 4th.

## Evidence to capture

| File | What it shows |
|---|---|
| `screenshots/week-11/01-device-loss-recovery.png` | Recovery after losing the browser |
| `screenshots/week-11/02-abandoned-channel-resolved.png` | A vanished client, resolved |
| `screenshots/week-11/03-ci-green-clean.png` | Full CI on a clean machine |
| `screenshots/week-11/04-post-3.png` | Forum post #3 |
| `evidence/week-11-recovery-test.log` | The recovery path test suite |

## Next week

Ship it, and write the twelve-week retrospective.
