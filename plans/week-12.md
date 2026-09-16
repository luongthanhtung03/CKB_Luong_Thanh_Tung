# Week 12 — Ship it, and the retrospective

**Period:** Mon 30 Nov – Sat 5 Dec 2026 · **Report:** Sat 5 Dec · **Budget:** 48h
**Phase:** F — Capstone · final week of the programme

| Level | What ships |
|---|---|
| **Floor** | The capstone deployed publicly, and the twelve-week retrospective published |
| **Target** | That, plus a README a stranger follows successfully without asking me anything |
| **Stretch** | A grant application submitted for the capstone |

## This is not a build week

**Roughly half of this week is writing.** The scope decision was made on 28 November;
anything not on that list is already cut.

The temptation this week is to add one more feature instead of writing the documents
that make the work legible to someone else. The code is not what is short — the
writing is. A capstone nobody can run is worth less than a smaller one with
documentation that works.

## Day shape

| Mon | Tue | Wed | Thu | Fri | Sat |
|---|---|---|---|---|---|
| Finish the cut list | Deploy | README and docs | Retrospective | Retrospective | Report and push |

## The retrospective

Not a summary of the twelve reports. It is the document I would hand to someone
deciding what I am capable of, and it answers:

- What existed on 26 August, and what exists on 5 December.
- **Three things I can do now that I could not do then**, each with a link that
  proves it.
- The two checkpoints — did Rust land by 10 October, did Fiber route by 24 October —
  and what happened when one did not, if one did not.
- What the capstone is, who it is for, and what it cost to build.
- What I would do differently, stated once, without self-flagellation.

**The evidence standard applies here more than anywhere else.** Every claim in this
document is one that someone will click.

## The bar for "shipped"

- Deployed at a **public URL** I can send to someone.
- It talks to **public testnet**, not a local node.
- A **stranger follows the README** and gets it running without asking me a question.
  Test this with an actual person if at all possible.
- CI green, including the failure paths.
- The README says what it does **and what it does not do** — the known limits, stated
  plainly, are what make the rest of it credible.

## Milestones

- ☐ The capstone deployed at a public URL
- ☐ The README followed successfully by someone who has never seen it
- ☐ CI green on a clean machine
- ☐ Twelve-week retrospective published
- ☐ Final skills matrix, all twelve columns filled
- ☐ Every report links evidence that still resolves

## Evidence to capture

| File | What it shows |
|---|---|
| `screenshots/week-12/01-deployed.png` | The capstone live at a public URL |
| `screenshots/week-12/02-full-flow.png` | The complete pay-per-call flow in production |
| `screenshots/week-12/03-stranger-readme.png` | Someone else running it from the README |
| `screenshots/week-12/04-skills-matrix-final.png` | Twelve columns filled |
| `evidence/week-12-production-run.log` | A real session against the deployed service |

## The last check

Walk the whole repository as if reading it for the first time:

- Does every explorer link still resolve?
- Does the Week 1.5 report still say only what actually happened?
- Can someone reconstruct what I did, in order, from `git log` alone?

Twelve weeks of evidence is only worth anything if all of it still stands up on the
last day.
