# Week 12 — Ship

**Period:** Mon 30 Nov – Sat 5 Dec 2026 · **Report:** Sat 5 Dec · **Budget:** 18h
**Phase:** E — Capstone

| Level | What ships |
|---|---|
| **Floor** | The capstone deployed publicly, with a README a stranger can follow |
| **Target** | That, plus two cold-start tests survived, a defect report filed, and the twelve-week retrospective |
| **Stretch** | A **Spark or CKB Community Fund DAO application** drafted and submitted |

## Why this week looks like this

No new features. This week converts twelve weeks of work into something other
people can evaluate — which is the only form the work counts in, for the programme
and for the interview.

The handbook asks for one thing not yet done: testing another builder's project and
sending them a real defect report. Thursday does that.

## Days

> From Week 10 the **Study** column becomes **Focus**. By this point the reading is
> done and the work is building: no new sources, all three hours on the capstone.
> Anything still needed is looked up as it comes up, from the Reading sections of
> Weeks 8 and 9.

| Day | Date | Focus | Build | Done when |
|---|---|---|---|---|
| Mon | 30 Nov | Security pass | Key handling reviewed; no secrets in history; threat notes written | `git log -p` shows no key ever committed; limitations written down |
| Tue | 1 Dec | Documentation | README a stranger can follow; an architecture diagram; deploy publicly | The live URL works from a device I have never used |
| Wed | 2 Dec 🔥 | Cold start | Two people run it from the README alone; fix whatever breaks | Both got it working, and I changed the README because of what they hit |
| Thu | 3 Dec | Community | Test another builder's project; send a real defect report | A filed issue with a reproduction, in someone else's repository |
| Fri | 4 Dec | Retrospective | The twelve-week writeup; **draft the grant application** | Retrospective written; application drafted |
| Sat | 5 Dec | — | Final report; **Post #3** if not yet published; push | Twelve reports published |

🔥 Wednesday is the hard day, and the most humbling. Watching someone fail to run
your own project from your own instructions finds more real defects in an hour than
a week of self-testing. Do not help them. Write down where they get stuck.

## The retrospective — what the interview actually reads

`reports/retrospective.md`, written for someone deciding whether to convert my role:

| Section | Contents |
|---|---|
| What I built | The capstone, in three sentences, with the live link |
| The numbers | 100 calls / 2 on-chain transactions; cycle counts, TypeScript vs Rust; test counts |
| Public evidence | Every explorer link, deployment, CI run, in one table |
| Contributions | The five filed, with their URLs and what happened to each |
| Writing | The three posts |
| What I can do now that I could not in August | Specific and checkable, not adjectives |
| What I would do next | The honest roadmap, including what is unfinished |

Twelve weeks of skills-matrix rows sit behind this. The progression is the argument.

## The grant application

The handbook is explicit that a good idea can open the door to
[Spark](https://talk.nervos.org/t/ckb-eco-fund-spark-program-mini-grant-initiative/8752)
or the [Community Fund DAO](https://talk.nervos.org/t/ckb-community-fund-dao-willing-to-back-every-ckb-buidler-up).
The capstone targets something the 2026 opportunity map names as a priority, which
is a reasonable case to make.

Walking into a role-conversion conversation with a funding application in flight is
a different conversation from walking in with a finished course.

## Final checks

```bash
git ls-files | grep -Ei 'env|key|pem|wallet|keystore'   # must return nothing
```

- Twelve reports, one per week, each published on its Saturday
- Every claim in every report backed by something outside this repository
- The live URL works from a device that has never seen the project
- `notes/orientation.md` open questions: struck through, with dates

## Evidence to capture

| File | What it shows |
|---|---|
| `screenshots/week-12/01-deployed.png` | The live capstone |
| `screenshots/week-12/02-cold-start.png` | Someone else running it |
| `screenshots/week-12/03-defect-report.png` | The filed defect report |
| `screenshots/week-12/04-grant-draft.png` | The grant application |
| `evidence/week-12-final-summary.md` | Every link, in one table |
