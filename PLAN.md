# Twelve-week study and build plan

Built from the CKBuilder Handbook. Twelve reports, every **Saturday**, from
19 September to 5 December 2026. Target pace is **18 hours per week** (3 hours a
day, six days) against the handbook's 4–5 hour minimum.

New here? Start with [`notes/orientation.md`](notes/orientation.md) — what CKB is,
in plain language. Day-by-day plans live in [`plans/`](plans/).

## Week numbering

Week 1 was completed before I signed the contract. This week is **Week 1.5**, a
bridge week, so that twelve full reporting weeks fall inside the contract period.

| Week | Period | Focus | Target — the public artifact |
|---|---|---|---|
| 1 | 26 Aug – 1 Sep | ✅ Environment and the Cell Model | *[published](reports/week-01-report.md)* |
| **1.5** | **15 – 19 Sep** | **Orientation, then testnet** | Primer published, testnet explorer links, four findings filed with DevRel |
| 2 | 21 – 26 Sep | Addresses, witnesses, Molecule | Hand-rolled address codec matching CCC byte for byte |
| 3 | 28 Sep – 3 Oct | CCC in depth, xUDT | My own fungible token, minted on testnet |
| 4 | 5 – 10 Oct | dApp front end | A deployed public URL: connect wallet, send CKB, move my token |
| 5 | 12 – 17 Oct | DOBs, then Rust in earnest | DOB minted and live in the dApp; Rust and RISC-V toolchain working |
| 6 | 19 – 24 Oct | Rust scripts, Simple Lock | Rust lock deployed to testnet, a cell locked and unlocked |
| 7 | 26 – 31 Oct | Rust Type Script, cycles, capstone brief | Counter ported TypeScript → Rust, with a cycle-count comparison |
| 8 | 2 – 7 Nov | Fiber fundamentals | Two Fiber nodes, a channel opened, a payment sent and settled |
| 9 | 9 – 14 Nov | Fiber from code, capstone scaffold | Channel and invoice driven programmatically, failing tests written first |
| 10 | 16 – 21 Nov | Capstone v0.1 | A working pay-per-call demo on testnet |
| 11 | 23 – 28 Nov | Capstone v0.2 — browser sessions | Browser self-custody session, failure paths handled, CI green |
| 12 | 30 Nov – 5 Dec | Ship | Public deploy, a README a stranger can follow, twelve-week retrospective |

## Phases

**A — Understand it, and go public (1.5–2).** Write the orientation primer, then
move everything off my laptop and onto public testnet. Addresses, witnesses and
Molecule decoded by hand rather than taken on trust.

**B — Build with CCC and ship a dApp (3–5).** CCC in depth, the indexer, xUDT,
Spore and DOBs. Ends with a deployed page a stranger can use: connect a wallet, see
a balance, send CKB, move a token I issued.

**C — Write scripts in Rust (6–7).** Script course classes 1, 2, 5 and 6. The Rust
and RISC-V toolchain. Build a Simple Lock, then port my counter Type Script from
TypeScript to Rust and measure the difference in cycles.

**D — Payment channels (8–9).** Fiber Network: run nodes, open a channel, route a
payment, then drive all of it from code. Capstone scaffolded, with its failing
tests written before the implementation.

**E — Capstone (10–12).** Pay-per-use API metering over Fiber, with browser-held
self-custody sessions — the BSS/RCS shape from the 2026 opportunity map. Shipped,
documented, deployed.

## The standard I hold myself to

Every week produces at least one of:

- a **public testnet explorer link** to a transaction I made,
- a **green CI run** re-proving a claim on a clean machine,
- a **deployed URL** a stranger can open,
- a **filed issue, pull request or forum post** in someone else's repository.

Never a claim whose only evidence is a file in my own repository.

## Difficulty

Each week is written at three levels, in [`plans/`](plans/):

| Level | Meaning |
|---|---|
| **Floor** | The week is not a failure if only this ships. Roughly 12 of the 18 hours |
| **Target** | What I plan for |
| **Stretch** | Only if Target came in early. Skipping it is not a miss |

Stretch is never attempted before Floor is done. Two consecutive Floor-only weeks
mean the capstone gets scoped down — shipping smaller beats a heroic finish that
never lands.

## Three threads running underneath every week

1. **Rust, 30 minutes a day from Week 3.** My background is TypeScript, so
   ownership and borrowing will be the slow part. Starting early buys ~15 hours of
   Rust before Week 6 needs it, thin enough to actually absorb.
2. **Five upstream contributions.** Four are already written and waiting in
   `notes/findings/`; Week 1.5 files them. A merged pull request in someone else's
   repository is worth more than any amount of code in my own.
3. **Three technical posts on talk.nervos.org**, around Weeks 4, 7 and 11. Not
   summaries of documentation — those exist. The things that did not exist when I
   needed them.

## Working habits

1. Screenshot the moment a command succeeds — do not reconstruct evidence on report day.
2. Keep an append-only dated scratch log in `notes/log.md`.
3. Commit small and often, so the history corroborates that the work was contemporaneous.
4. Never commit `.env`, private keys, or seed phrases.

## Every Saturday

1. Write the report from [`reports/week-template.md`](reports/week-template.md).
2. Update the private reflection — not published.
3. Update [`plans/skills-matrix.md`](plans/skills-matrix.md).
4. Revise next week's plan if I am behind. Move work; never delete it silently.
5. Commit and push everything in one commit.

This plan is a scaffold, not a contract. I will adjust it as I go and record any
changes in the weekly reports.
