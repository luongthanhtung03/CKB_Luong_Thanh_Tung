# Twelve-week study and build plan

Built from the CKBuilder Handbook. Twelve reports, every **Saturday**, from
19 September to 5 December 2026.

**Pace: 48 hours a week** — 8 hours a day, six days, Sunday off. That is against the
handbook's 4–5 hour minimum, and it is a deliberate choice with a cost attached; see
[The pace, honestly](#the-pace-honestly) below.

New here? Start with [`notes/orientation.md`](notes/orientation.md) — what CKB is,
in plain language. Day-by-day plans live in [`plans/`](plans/). The funding track
lives in [`plans/funding-track.md`](plans/funding-track.md).

## What changed, and why

The first version of this plan aimed at one outcome: finish the programme well
enough to earn the role-conversion interview. One capstone, started in Week 10, with
learning running almost to the end.

The goal is now bigger. I want **three finished projects, each with a funding
application behind it** — submitted to the CKB Eco Fund's Spark Program, and then to
the Community Fund DAO for a community vote.

That inverts the schedule. Three parallel projects cannot absorb a learning curve the
way one capstone can, so the learning has to be *finished* rather than ongoing when
the build phase opens:

- **Weeks 1.5–6 — learn everything.** All the foundations, compressed into six weeks.
- **Weeks 7–12 — build three projects**, and run six funding campaigns.

## Week numbering

Week 1 was completed before I signed the contract. This week is **Week 1.5**, a
bridge week, so that twelve full reporting weeks fall inside the contract period.

### Phase 1 — Learn (Weeks 1.5–6, 272 hours)

| Week | Period | Focus | Target — the public artifact |
|---|---|---|---|
| 1 | 26 Aug – 1 Sep | ✅ Environment and the Cell Model | *[published](reports/week-01-report.md)* |
| **1.5** | **16 – 19 Sep** | **Get onto testnet, and go public** | First testnet transaction; four findings filed with DevRel |
| 2 | 21 – 26 Sep | Addresses, witnesses, Molecule, CCC in depth | Hand-rolled address codec matching CCC byte for byte |
| 3 | 28 Sep – 3 Oct | xUDT, Spore and DOBs | My own token and my own DOB, both minted on testnet |
| 4 | 5 – 10 Oct | Rust on-chain, part 1 | Counter Script ported TypeScript → Rust, with a cycle comparison |
| 5 | 12 – 17 Oct | Rust on-chain part 2, then the front end | Rust lock on testnet; a deployed URL a stranger can open |
| 6 | 19 – 24 Oct | Fiber head-start, then scaffold | A payment routed across three Fiber nodes, driven from code |

### Phase 2 — Build and fund (Weeks 7–12, 288 hours)

| Week | Period | Build | Funding |
|---|---|---|---|
| 7 | 26 – 31 Oct | P1 v0.1: pay-per-call on testnet | — |
| 8 | 2 – 7 Nov | P1 metering and settlement; **P3 finished** | **P3 → Spark** |
| 9 | 9 – 14 Nov | P1 browser sessions; P2 extracted | **P3 `[DIS]`** |
| 10 | 16 – 21 Nov | **P2 v1.0 published** | **P3 `[VOT]` · P2 → Spark** |
| 11 | 23 – 28 Nov | P1 v0.2: recovery paths, CI green | **P2 `[DIS]`** · post #3 |
| 12 | 30 Nov – 5 Dec | **P1 shipped and deployed** | **P2 `[VOT]` · P1 → Spark** · retrospective |

P1's Community Fund DAO campaign runs 7–20 December, after the programme closes — a
discussion phase and a vote take fourteen days minimum, so no proposal posted in
Week 12 could resolve inside it. Running it late is the better trade anyway: it gets
written against a project that is already finished and documented.

## The three projects

| | Project | Repository | What it is |
|---|---|---|---|
| **P1** | Fiber pay-per-use API metering | `ckb-fiber-metering` | Pay per API call over a Fiber payment channel, with browser-held self-custody sessions |
| **P2** | Browser self-custody session kit | `ckb-session-kit` | The session layer from P1, extracted so anyone can reuse it |
| **P3** | CKB cycle tools | `ckb-cycle-tools` | A cycle profiler, a ckb-js-vm vs Rust benchmark harness, and the Windows toolchain fixes from my Week 1 findings |

They are not three independent projects, and that is the point. P2 is *extracted*
from P1, so building P1 builds most of P2. P3 is made of artifacts the learning phase
produces anyway — which is why it is the first one finished and the first one
submitted.

The hours are not split evenly. Pretending otherwise would produce three mediocre
projects instead of one strong one and two good ones:

| | P1 | P2 | P3 | Campaigning |
|---|---|---|---|---|
| Hours, Weeks 7–12 | **144** | 48 | 30 | 66 |

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
route, all driven from code rather than by hand. Then all three repositories
scaffolded before the build phase opens.

**F — Build and fund (7–12).** Three projects, six funding campaigns.

## The standard I hold myself to

Every week produces at least one of:

- a **public testnet explorer link** to a transaction I made,
- a **green CI run** re-proving a claim on a clean machine,
- a **deployed URL** a stranger can open,
- a **filed issue, pull request or forum post** in someone else's repository.

Never a claim whose only evidence is a file in my own repository.

This matters more now than it did, because the funding track depends on it. A
Community Fund DAO proposal is read by people deciding whether to give me money.
Every claim in it has to survive someone clicking the link.

## The pace, honestly

48 hours a week for eleven weeks is 2.7× the 18 hours the contract is reimbursed
against. The extra ~30 hours a week is an unpaid investment in the grant applications
and the conversion interview. That is a deliberate decision, made in September, and
it is recorded here so it is not rediscovered in November.

Two things keep it survivable.

**Sunday is genuinely off. Not negotiable.** At this pace the seventh day is the only
thing that makes Weeks 7–12 possible at all.

**Eight hours of reading does not work.** Deep new material tops out around three
hours a day for anyone, so the day is split four ways and only the first block is new
learning:

| Block | Hours | What |
|---|---|---|
| **A — New material** | 3h | Read, watch, derive. Mornings, when it is cheapest |
| **B — Prove it** | 3h | Write the code that demonstrates what block A claimed |
| **C — Rust** | 1h | Every day from Week 1.5. Not Week 3, not Week 5 |
| **D — Ship** | 1h | Commit, capture evidence, update `notes/log.md`, answer something public |

Weeks 4 and 5 shift the ratio: Rust expands to roughly four hours and new material
shrinks to two, because by then Rust *is* the new material.

## Difficulty

Each week is written at three levels, in [`plans/`](plans/):

| Level | Meaning |
|---|---|
| **Floor** | The week is not a failure if only this ships. Roughly 30 of the 48 hours |
| **Target** | What I plan for |
| **Stretch** | Only if Target came in early. Skipping it is not a miss |

Stretch is never attempted before Floor is done. **Two consecutive Floor-only weeks
mean P1 gets scoped down immediately** — shipping smaller and earlier beats a heroic
finish that never lands.

## Three threads running underneath every week

1. **Rust, one hour a day, from Week 1.5.** My background is TypeScript, so ownership
   and borrowing will be the slow part. Starting on day one buys roughly 34 hours of
   Rust before Week 4 turns it into the main event. This is the single change that
   decides whether the Rust weeks are hard or brutal.
2. **Upstream contributions.** Four are already written and waiting in
   `notes/findings/`; Week 1.5 files them. A merged pull request in someone else's
   repository is worth more than any amount of code in my own.
3. **A public action every single day.** A forum reply, an issue, a review, an answer.
   This is not politeness — a Community Fund DAO discussion post needs **30 likes in
   seven days** to reach a vote, and a cold post from an unknown account does not get
   them. Twelve weeks of showing up is what makes the first campaign land warm. See
   [`plans/funding-track.md`](plans/funding-track.md).

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
4. Update [`plans/funding-track.md`](plans/funding-track.md) if a campaign moved.
5. Revise next week's plan if I am behind. Move work; never delete it silently.
6. Commit and push everything in one commit.

This plan is a scaffold, not a contract. I will adjust it as I go and record any
changes in the weekly reports.
