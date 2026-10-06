# Twelve-week study and build plan

Built from the CKBuilder Handbook. Twelve reports, every **Saturday**, from
3 October to 19 December 2026.

**Pace: 48 hours a week** — 8 hours a day, six days, Sunday off, against the
handbook's 4–5 hour minimum.

New here? Start with [`notes/orientation.md`](notes/orientation.md) — what CKB is, in
plain language. Day-by-day plans live in [`plans/`](plans/).

## What changed from the first version of this plan

The first version spread the learning across nine weeks and started the capstone in
Week 10. That left the capstone three weeks, which is not enough for the thing I want
to build.

So the shape is inverted: **all the foundations compress into six weeks, and the
capstone gets six.**

- **Weeks 1.5–6 — learn.** Everything needed to build a CKB application, finished.
- **Weeks 7–12 — build.** The capstone, with the learning already done.

The pace went from 18 hours a week to 48 to make that possible. See
[The pace, honestly](#the-pace-honestly).

**Rescheduled on 28 September.** Work paused from 17 to 27 September, before Week 1.5
had started in earnest. Rather than compress the missed fortnight into the weeks that
follow, every week moved two weeks later with its content unchanged: Week 1.5 now
runs 28 Sep – 3 Oct, and Week 12 ends on 19 December instead of 5 December. Both
checkpoints moved with it — Rust to Sat 24 Oct, Fiber to Sat 7 Nov.

## Week numbering

Week 1 was completed before I signed the contract. This week is **Week 1.5**, a
bridge week, so that twelve full reporting weeks fall inside the contract period.

### Phase 1 — Learn (Weeks 1.5–6, 272 hours)

| Week | Period | Focus | Target — the public artifact |
|---|---|---|---|
| 1 | 26 Aug – 1 Sep | ✅ Environment and the Cell Model | *[published](reports/week-01-report.md)* |
| **1.5** | **28 Sep – 3 Oct** | **Get onto testnet, and go public** | First testnet transaction; four findings filed with DevRel |
| 2 | 5 – 10 Oct | Addresses, witnesses, Molecule, CCC in depth | Hand-rolled address codec matching CCC byte for byte |
| 3 | 12 – 17 Oct | xUDT, Spore and DOBs | My own token and my own DOB, both minted on testnet |
| 4 | 19 – 24 Oct | Rust on-chain, part 1 | Counter Script ported TypeScript → Rust, with a cycle comparison |
| 5 | 26 – 31 Oct | Rust on-chain part 2, then the front end | Rust lock on testnet; a deployed URL a stranger can open |
| 6 | 2 – 7 Nov | Fiber | A payment routed across three Fiber nodes, driven from code |

### Phase 2 — Build (Weeks 7–12, 288 hours)

| Week | Period | Milestone |
|---|---|---|
| 7 | 9 – 14 Nov | v0.1 — a caller pays per API call over a Fiber channel, on testnet |
| 8 | 16 – 21 Nov | Metering and settlement survive the failure paths |
| 9 | 23 – 28 Nov | Browser self-custody session — a payment signed with no wallet dialog |
| 10 | 30 Nov – 5 Dec | The session layer factored into a reusable library with its own tests |
| 11 | 7 – 12 Dec | v0.2 — device-loss recovery, abandoned channels resolved, CI green |
| 12 | 14 – 19 Dec | Shipped: public deploy, stranger-runnable README, retrospective |

## The capstone

**Pay-per-use API metering over Fiber**, with browser-held self-custody sessions —
the BSS/RCS shape from the 2026 opportunity map. A caller pays per API call over a
payment channel, and the browser holds its own session key so that paying for a call
does not mean approving a wallet dialog every time.

It is chosen because it is a Web2 business model — metered API billing — running on
CKB rails, which is the kind of thing the ecosystem says it wants and does not yet
have many examples of.

## Phases

**A — Get onto testnet and go public (1.5).** Everything so far has been on a local
devnet that disappears when I clean it. Nothing is verifiable by anyone else. That
changes first, because every later claim depends on it.

**B — Transactions to the bone (2).** Addresses, witnesses and Molecule decoded by
hand rather than taken on trust. CCC in depth: cell collection, capacity, fee rates,
change, error paths.

**C — Standards (3).** sUDT and xUDT, Spore and DOBs. My own token and my own DOB,
both on testnet, both visible in an explorer.

**D — Rust on-chain (4–5).** The long pole. `ckb-script-templates`, `ckb-std`,
`no_std`, `ckb-testtool`, `ckb-debugger` and cycle counting. Ends with a lock script
of my own on testnet, and — because it is the one week the front end fits — a
deployed dApp.

**E — Fiber (6).** Two nodes, a channel, a payment, a settlement, and a three-node
route, all driven from code rather than by hand.

**F — Capstone (7–12).** Built with the learning already finished.

## The standard I hold myself to

Every week produces at least one of:

- a **public testnet explorer link** to a transaction I made,
- a **green CI run** re-proving a claim on a clean machine,
- a **deployed URL** a stranger can open,
- a **filed issue, pull request or forum post** in someone else's repository.

Never a claim whose only evidence is a file in my own repository.

## The pace, honestly

48 hours a week is 2.7× the 18 hours this contract is reimbursed against. The extra
time is mine, invested deliberately rather than logged. It is recorded here so the
reports are read against the right expectation.

Two things keep it survivable.

**Sunday is genuinely off. Not negotiable.** At this pace the seventh day is the only
thing that makes Weeks 7–12 possible at all.

**Eight hours of reading does not work.** Deep new material tops out around three
hours a day for anyone, so a Phase 1 day is split four ways and only the first block
is new learning:

| Block | Hours | What |
|---|---|---|
| **A — New material** | 3h | Read, watch, derive. Mornings, when it is cheapest |
| **B — Prove it** | 3h | Write the code that demonstrates what block A claimed |
| **C — Rust** | 1h | Every day from Week 1.5. Not Week 3, not Week 5 |
| **D — Ship** | 1h | Commit, capture evidence, update `notes/log.md` |

Weeks 4 and 5 shift the ratio: Rust expands to roughly four hours and new material
shrinks to two, because by then Rust *is* the new material.

**Phase 2 drops the four-block structure** — the learning is done, and what remains is
building.

## Difficulty

Each week is written at three levels, in [`plans/`](plans/):

| Level | Meaning |
|---|---|
| **Floor** | The week is not a failure if only this ships. Roughly 30 of the 48 hours |
| **Target** | What I plan for |
| **Stretch** | Only if Target came in early. Skipping it is not a miss |

Stretch is never attempted before Floor is done. **Two consecutive Floor-only weeks
mean the capstone gets scoped down immediately** — shipping smaller and earlier beats
a heroic finish that never lands.

## Two checkpoints, with the fallback decided in advance

**⚠ Sat 24 Oct — a Rust script must compile, pass its tests, and be deployed.**
87 hours of Phase 1 assume Rust arrives, and it was rated 0 in Week 1. *Fallback:* the
capstone's on-chain components fall back to ckb-js-vm, which already works here with
23 passing tests and green CI. The cycle-efficiency story is lost; nothing else is.

**⚠ Sat 7 Nov — a payment must route across three Fiber nodes under program control.**
Fiber is a young project with thinner documentation than the rest of CKB, and the
capstone depends on it entirely. *Fallback:* the capstone pivots to signed usage
receipts settled periodically on-chain, which keeps the whole pay-per-use story and
drops only the routing layer.

A checkpoint decided in the moment, while tired and behind, is a drift rather than a
decision. Both are written down now, in the week files, with the dates.

## Three threads running underneath every week

1. **Rust, one hour a day, from Week 1.5.** My background is TypeScript, so ownership
   and borrowing will be the slow part. Starting on day one buys roughly 34 hours of
   Rust before Week 4 turns it into the main event. This is the single change that
   decides whether the Rust weeks are hard or brutal.
2. **Upstream contributions.** Four are already written and waiting in
   `notes/findings/`; Week 1.5 files them. A merged pull request in someone else's
   repository is worth more than any amount of code in my own.
3. **Three technical posts on talk.nervos.org**, in Weeks 2, 4 and 11. Not summaries
   of documentation — those exist. The things that did not exist when I needed them:
   the Windows contract-testing setup, the ckb-js-vm vs Rust cycle comparison, and a
   Fiber integration write-up.

## Working habits

1. Screenshot the moment a command succeeds — do not reconstruct evidence on report day.
2. Keep an append-only dated scratch log in `notes/log.md`.
3. Commit small and often, so the history corroborates that the work was contemporaneous.
4. Never commit `.env`, private keys, or seed phrases.

Habit 3 slipped once: the first twelve-week plan landed as a single 1,890-line commit
across 21 files. Contemporaneous history is part of the evidence standard, so it is
worth naming the miss rather than quietly not repeating it.

## Every Saturday

1. Write the report from [`reports/week-template.md`](reports/week-template.md).
2. Update the private reflection — not published.
3. Update [`plans/skills-matrix.md`](plans/skills-matrix.md).
4. Revise next week's plan if I am behind. Move work; never delete it silently.
5. Commit and push everything in one commit.

This plan is a scaffold, not a contract. I will adjust it as I go and record any
changes in the weekly reports.
