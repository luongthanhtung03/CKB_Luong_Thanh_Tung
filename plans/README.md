# Day-by-day plans

One file per week. Each is a Monday-to-Saturday table with a concrete **Done when**
for every day — a binary check, not a feeling.

The twelve-week overview lives in [`../PLAN.md`](../PLAN.md).

| Week | Dates | Plan | Report |
|---|---|---|---|
| 1.5 | 15 – 19 Sep | [week-01.5.md](week-01.5.md) | [week-01.5-report.md](../reports/week-01.5-report.md) |
| 2 | 21 – 26 Sep | [week-02.md](week-02.md) | |
| 3 | 28 Sep – 3 Oct | [week-03.md](week-03.md) | |
| 4 | 5 – 10 Oct | [week-04.md](week-04.md) | |
| 5 | 12 – 17 Oct | [week-05.md](week-05.md) | |
| 6 | 19 – 24 Oct | [week-06.md](week-06.md) | |
| 7 | 26 – 31 Oct | [week-07.md](week-07.md) | |
| 8 | 2 – 7 Nov | [week-08.md](week-08.md) | |
| 9 | 9 – 14 Nov | [week-09.md](week-09.md) | |
| 10 | 16 – 21 Nov | [week-10.md](week-10.md) | |
| 11 | 23 – 28 Nov | [week-11.md](week-11.md) | |
| 12 | 30 Nov – 5 Dec | [week-12.md](week-12.md) | |

## How to read a daily row

Each day is 3 hours, normally split **1 hour study, 2 hours build**. The split is a
default, not a rule — a day that needs two hours of reading gets two hours of
reading.

| Column | What it means |
|---|---|
| **Study** | What to read *before* touching the keyboard. Every source is listed with a link in that week's **Reading** section at the bottom of the file |
| **Build** | What to actually make. This is where the evidence comes from |
| **Done when** | A binary check. Either it is true or it is not — no "made progress" |

**A `—` in the Study column means no new reading that day.** All 3 hours go to
building. This is deliberate, not an oversight: it happens on Saturdays (report
day) and on days where the work is continuing something already started, and
stopping to read would break the thread.

**🔥 marks the hard problem.** Exactly one day a week, where there is no tutorial
and the answer has to be derived from a specification or from source. These days
overrun. That is expected — the surrounding days carry the slack.

## Where the study material comes from

Mostly the [CKBuilder Handbook](../docs/resources.md), which is the programme's own
reading list. Beyond it:

- **RFCs** (`nervosnetwork/rfcs`) for anything the docs describe but do not
  specify — address format, transaction structure, syscalls.
- **Source code**, from Week 8 onward. Fiber's documentation is younger than the
  rest of CKB's, so some answers only exist in the repository.
- **The Rust Book and Rustlings** for the daily Rust drip from Week 3.

Every one of these is linked from [`../docs/resources.md`](../docs/resources.md) or
from the week's own Reading section. **If a study item has no link anywhere, that is
a bug in the plan — fix it rather than guessing.**

## When to take screenshots

The rule that matters: **screenshot the moment a command succeeds, not on report
day.** Reconstructing evidence on Saturday is how reports become fiction, and it is
the first thing that would not survive scrutiny.

In practice:

- The instant a **Done when** goes true — that is the screenshot.
- Any terminal output worth quoting gets piped to `evidence/` as it happens:
  `npm test 2>&1 | tee ../../evidence/week-06-test-run.log`
- Every **public explorer page** for a transaction, as soon as it confirms. The link
  alone is enough for the report, but the screenshot survives if the explorer ever
  reorganises its URLs.
- **Failures worth keeping** — a script correctly refusing an invalid transaction is
  evidence that the script works. Those screenshots are often better than the
  success ones.

Each week file ends with an **Evidence to capture** table naming the files in
advance. Filling it in as the week goes makes Saturday assembly rather than
archaeology.

## Floor / Target / Stretch

Floor is the non-negotiable minimum — roughly 12 of the 18 hours. Target is what I
plan for. Stretch only happens if Target came in early, and skipping it is not a
miss. **Stretch is never attempted before Floor is done.**

## How the plan is maintained

Every Saturday, after the report is written:

1. Update [`skills-matrix.md`](skills-matrix.md) — self-rate 0–3 across the
   competency list, and tick off contributions, posts and Rust days.
2. Re-read next week's plan. If the matrix says I am behind on something the next
   week depends on, move work into it — visibly, never by quietly deleting.
   Anything rated ≤1 that a later week needs gets a remediation block scheduled
   before new material.
3. Commit the report, the matrix and the revised plan together.

The plan is expected to change. What is not expected is for it to change silently —
`git log` on these files is part of the evidence.
