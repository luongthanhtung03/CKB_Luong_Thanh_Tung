# Skills matrix

Self-rated every Saturday, after the report is written. Honest ratings only — the
point is to decide what next week needs, and an inflated row makes that decision
badly.

**Scale**

| | |
|---|---|
| **0** | Have not touched it |
| **1** | Followed a tutorial. Could not redo it without the tutorial |
| **2** | Can do it unaided, with documentation open |
| **3** | Can explain it to someone else, and debug it when it breaks |

A **3** means I could be asked about it in an interview and answer well. Nothing gets
a 3 for having been used once.

## Competencies

| # | Competency | W1 | W1.5 | W2 | W3 | W4 | W5 | W6 | W7 | W8 | W9 | W10 | W11 | W12 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Cell Model | 2 | | | | | | | | | | | | |
| 2 | Transaction construction | 2 | | | | | | | | | | | | |
| 3 | Addresses and encoding | 0 | | | | | | | | | | | | |
| 4 | Molecule and witnesses | 0 | | | | | | | | | | | | |
| 5 | CCC — client and cell collection | 1 | | | | | | | | | | | | |
| 6 | CCC — signers and wallets | 0 | | | | | | | | | | | | |
| 7 | Indexer and RPC queries | 1 | | | | | | | | | | | | |
| 8 | Testnet operation | 0 | | | | | | | | | | | | |
| 9 | xUDT and tokens | 0 | | | | | | | | | | | | |
| 10 | Spore and DOBs | 0 | | | | | | | | | | | | |
| 11 | Front end and wallet connection | 0 | | | | | | | | | | | | |
| 12 | Rust — language basics | 0 | | | | | | | | | | | | |
| 13 | Rust — ownership and borrowing | 0 | | | | | | | | | | | | |
| 14 | Rust — `no_std` and `ckb-std` | 0 | | | | | | | | | | | | |
| 15 | ckb-script-templates and the build | 0 | | | | | | | | | | | | |
| 16 | Script testing (ckb-testtool) | 2 | | | | | | | | | | | | |
| 17 | ckb-debugger and cycles | 1 | | | | | | | | | | | | |
| 18 | Script deployment and Type ID | 1 | | | | | | | | | | | | |
| 19 | Script security and adversarial testing | 1 | | | | | | | | | | | | |
| 20 | Fiber — channels | 0 | | | | | | | | | | | | |
| 21 | Fiber — invoices, HTLCs, routing | 0 | | | | | | | | | | | | |
| 22 | Fiber — programmatic control | 0 | | | | | | | | | | | | |
| 23 | Browser self-custody and key handling | 0 | | | | | | | | | | | | |
| 24 | Publishing a library others can use | 0 | | | | | | | | | | | | |
| 25 | CI and reproducible evidence | 2 | | | | | | | | | | | | |
| 26 | Technical writing for other people | 0 | | | | | | | | | | | | |

Week 1 ratings are set from what the Week 1 report actually demonstrates: a working
Type Script with 23 tests and CI earns a 2 on testing; a single devnet transfer does
not earn a 2 on anything to do with testnet.

Rows 14, 19, 22, 23, 24 and 26 were added when the plan changed in Week 1.5 — the
compressed schedule reaches further into Rust, Fiber and browser key handling than
the first version did, and those competencies were not being tracked at all.

## Running counters

| | Target | W1.5 | W2 | W3 | W4 | W5 | W6 | W7 | W8 | W9 | W10 | W11 | W12 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Upstream contributions filed | 5 | | | | | | | | | | | | |
| Technical posts published | 3 | | | | | | | | | | | | |
| Forum replies to other people | — | | | | | | | | | | | | |
| Likes received on my own posts | — | | | | | | | | | | | | |
| Rust hours (cumulative) | ~90 | | | | | | | | | | | | |
| Public explorer links | — | | | | | | | | | | | | |
| Level reached (F/T/S) | — | | | | | | | | | | | | |

**Rust hours, not Rust days.** The drip is an hour a day from Week 1.5 and expands to
four hours a day in Weeks 4–5. Counting days would hide that.

**The two reputation counters are not vanity metrics.** Being known in the ecosystem
is what turns a written contribution into one people actually read. If the reply and
like counters are still near zero in October, the public-writing thread is not
working and the plan needs changing while there is still time to change it.

## The rule this table exists for

Anything rated **≤1** that a later week depends on gets a remediation block scheduled
into the next week, **before** any new material.

Dependencies worth watching:

| Rating that matters | Blocks | Checkpoint |
|---|---|---|
| Testnet operation (8) | Everything from Week 1.5 on | — |
| CCC signers (6) | Week 5's front end, and the browser sessions in Week 9 | — |
| Rust ownership (13) | Weeks 4–5, and every on-chain component of the capstone | **⚠ Sat 24 Oct** |
| `no_std` and `ckb-std` (14) | Weeks 4–5 | **⚠ Sat 24 Oct** |
| Fiber channels (20) | The capstone, entirely | **⚠ Sat 7 Nov** |
| Fiber programmatic control (22) | The capstone, entirely | **⚠ Sat 7 Nov** |
| Browser self-custody (23) | Weeks 9–11 — the heart of the capstone | — |
| Technical writing (26) | The three forum posts, and the retrospective | — |

Row 23 is worth watching hardest. Weeks 9, 10 and 11 all sit on it, so a weak rating
there costs the last third of the programme rather than a single week.
