# Week 10 — P3's vote, P2 published

**Period:** Mon 16 – Sat 21 Nov 2026 · **Report:** Sat 21 Nov · **Budget:** 48h
**Phase:** F — Build and fund

| Project | Hours | This week's milestone |
|---|---|---|
| **P1** `ckb-fiber-metering` | 18h | Session work folded back in; P1 runs on published P2 |
| **P2** `ckb-session-kit` | 18h | **v1.0 published** — docs, examples, on npm |
| **P3** `ckb-cycle-tools` | 2h | — |
| Campaigning | 10h | **P3 `[VOT]` 16–22 Nov** · **P2 → Spark** + P2's DAO ask |

| Level | What ships |
|---|---|
| **Floor** | P2 published and submitted to Spark |
| **Target** | That, plus P3's vote closed with a result, whatever it is |
| **Stretch** | P3's vote passes |

## Why this week looks like this

**The first vote closes.** P3's `[VOT]` runs 16–22 November on Metaforo: token-weighted,
needing a quorum of 3× the ask and ≥51% approval. Whatever the outcome, it produces
the first real data about how many voters actually turn up for someone at my level of
visibility — which directly informs how big P1's ask should be in December.

**P2 has to be genuinely publishable, not just extracted.** A library nobody but me
can use is not a project, it is a subdirectory. The bar is an installable package, a
worked example that does not reference P1, and documentation written for someone who
has never seen P1.

The test for that: P1 switches to consuming **the published package**, not a local
path. If that breaks, P2 was not ready.

## Two campaigns in one week, and they do not overlap

P3 is at `[VOT]` — the discussion is over and the voting is passive. P2 goes to
**Spark**, which is a committee, not a vote. So nothing is competing for the same
likes. That is deliberate, and it is why P2's `[DIS]` waits until Week 11.

The rule holds: **never two `[DIS]` phases live at once.**

P2's two applications get written in the same sitting, same as P3's:

- **Spark (phase 1)** — the library as it exists: session creation, signing, persistence.
- **DAO (phase 2)** — adoption work: more wallet integrations, a security review,
  maintenance.

If there is no honest phase 2 for P2, it takes the Spark grant and stops.

## Milestones

- ☐ P3 `[VOT]` opened · link recorded · result recorded when it closes
- ☐ P2 v1.0 published and installable
- ☐ P1 consumes P2 from the registry, not a local path
- ☐ A worked example that never mentions P1
- ☐ P2 Spark application **submitted** · link recorded
- ☐ P2 phase-1/phase-2 split written into `funding-track.md`

## Day shape

| Mon | Tue | Wed | Thu | Fri | Sat |
|---|---|---|---|---|---|
| P2 | P2 | P2 | P1 | P1 + applications | Applications + report |

## Evidence to capture

| File | What it shows |
|---|---|
| `screenshots/week-10/01-vot-opened.png` | P3's vote live |
| `screenshots/week-10/02-vot-result.png` | The result, whatever it is |
| `screenshots/week-10/03-p2-published.png` | P2 on the registry |
| `screenshots/week-10/04-p1-uses-published-p2.png` | P1 building against the published package |
| `evidence/week-10-p2-example-run.log` | The standalone example running |

## Next week

P2's `[DIS]` goes live. P1 hardens: recovery paths and device loss.
