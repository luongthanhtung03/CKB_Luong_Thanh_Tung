# Day-by-day plans

One file per week. Weeks 1.5–6 are day-level tables with a concrete **Done when** for
every day — a binary check, not a feeling. Weeks 7–12 are week-level, for a reason
explained below.

The twelve-week overview lives in [`../PLAN.md`](../PLAN.md).

## Phase 1 — Learn

| Week | Dates | Plan | Report |
|---|---|---|---|
| 1.5 | 16 – 19 Sep | [week-01.5.md](week-01.5.md) | [week-01.5-report.md](../reports/week-01.5-report.md) |
| 2 | 21 – 26 Sep | [week-02.md](week-02.md) | |
| 3 | 28 Sep – 3 Oct | [week-03.md](week-03.md) | |
| 4 | 5 – 10 Oct | [week-04.md](week-04.md) | |
| 5 | 12 – 17 Oct | [week-05.md](week-05.md) | |
| 6 | 19 – 24 Oct | [week-06.md](week-06.md) | |

## Phase 2 — Capstone

| Week | Dates | Plan | Report |
|---|---|---|---|
| 7 | 26 – 31 Oct | [week-07.md](week-07.md) | |
| 8 | 2 – 7 Nov | [week-08.md](week-08.md) | |
| 9 | 9 – 14 Nov | [week-09.md](week-09.md) | |
| 10 | 16 – 21 Nov | [week-10.md](week-10.md) | |
| 11 | 23 – 28 Nov | [week-11.md](week-11.md) | |
| 12 | 30 Nov – 5 Dec | [week-12.md](week-12.md) | |

## Why Weeks 7–12 are not day-level yet

Writing a day-by-day plan for Week 11 today would be fiction. By then the shape of
the work depends on things I cannot know in September: whether Fiber does what its
documentation says, and how much of the session layer turns out to be reusable once
I try to factor it out.

So Weeks 7–12 carry **hour allocations per project and a milestone**, which is enough
to hold the schedule honest, and they get written out day-level at the **Week 6
boundary** — once Fiber's real behaviour is known. That is a planned step, not a gap.

## The shape of a day

Eight hours, split four ways. Only the first block is new material, because eight
hours of reading does not work for anyone.

| Block | Hours | What |
|---|---|---|
| **A — New material** | 3h | Read, watch, derive. Mornings, when it is cheapest |
| **B — Prove it** | 3h | Write the code that demonstrates what block A claimed |
| **C — Rust** | 1h | Every day, from Week 1.5. Not Week 3, not Week 5 |
| **D — Ship** | 1h | Commit, capture evidence, update `notes/log.md`, do one public thing |

**Weeks 4 and 5 shift the ratio** — Rust expands to roughly four hours and block A
shrinks to two, because by then Rust *is* the new material.

**Block C is not optional and not deferrable.** An hour a day from 16 September buys
about 34 hours of Rust before Week 4 turns it into the main event. Skipping it during
a busy week is borrowing against the hardest part of the plan.

**Block D always includes one public action** — a forum reply, an issue, a review, an
answer to someone else's question. Being a known name in the ecosystem is not
something that can be started in November; it is twelve weeks of showing up, a few
minutes at a time.

## How to read a daily row

| Column | What it means |
|---|---|
| **A — New material** | What to read *before* touching the keyboard. Sources are linked in the week's **Reading** section |
| **B — Prove it** | What to actually make. This is where the evidence comes from |
| **C — Rust** | The day's hour of Rust, named specifically so it cannot dissolve into "some Rust" |
| **D — Ship** | The commit, the evidence file, and the day's public action |
| **Done when** | A binary check. Either it is true or it is not — no "made progress" |

**A `—` in the A column means no new reading that day.** Those hours go to building.
This is deliberate: it happens on Saturdays, and on days continuing something already
started where stopping to read would break the thread.

**🔥 marks the hard problem.** Exactly one day a week, where there is no tutorial and
the answer has to be derived from a specification or from source. These days overrun.
That is expected — the surrounding days carry the slack.

**⚠ marks a checkpoint.** A named date where something must be true or a written
fallback fires. There are two, and both are in the learning phase: Rust compiling by
Sat 10 Oct, and Fiber routing by Sat 24 Oct. Both fallbacks are in `../PLAN.md` and
in the week file itself. A checkpoint that slips silently is worse than no checkpoint.

## Where the study material comes from

Mostly the [CKBuilder Handbook](../docs/resources.md), which is the programme's own
reading list. Beyond it:

- **RFCs** (`nervosnetwork/rfcs`) for anything the docs describe but do not specify —
  address format, transaction structure, syscalls.
- **Source code**, from Week 6 onward. Fiber's documentation is younger than the rest
  of CKB's, so some answers only exist in the repository.
- **The Rust Book and Rustlings** for the daily Rust hour, from Week 1.5.

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
  evidence that the script works. Those screenshots are often better than the success
  ones.

Each week file ends with an **Evidence to capture** table naming the files in
advance. Filling it in as the week goes makes Saturday assembly rather than
archaeology.

## Floor / Target / Stretch

Floor is the non-negotiable minimum — roughly 30 of the 48 hours. Target is what I
plan for. Stretch only happens if Target came in early, and skipping it is not a
miss. **Stretch is never attempted before Floor is done.**

**Two consecutive Floor-only weeks mean the capstone gets scoped down immediately.** Not
discussed, not deferred to the next review — scoped down that Saturday. Shipping
smaller and earlier beats a heroic finish that never lands.

## How the plan is maintained

Every Saturday, after the report is written:

1. Update [`skills-matrix.md`](skills-matrix.md) — self-rate 0–3 across the
   competency list, and tick off contributions, posts, likes and Rust hours.
2. Re-read next week's plan. If the matrix says I am behind on something the next
   week depends on, move work into it — visibly, never by quietly deleting. Anything
   rated ≤1 that a later week needs gets a remediation block scheduled before new
   material.
3. Commit the report, the matrix and the revised plan together.

The plan is expected to change. What is not expected is for it to change silently —
`git log` on these files is part of the evidence.
