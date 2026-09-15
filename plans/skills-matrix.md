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

A **3** means I could be asked about it in an interview and answer well. Nothing
gets a 3 for having been used once.

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
| 14 | ckb-script-templates and the build | 0 | | | | | | | | | | | | |
| 15 | Script testing (ckb-testtool) | 2 | | | | | | | | | | | | |
| 16 | ckb-debugger and cycles | 1 | | | | | | | | | | | | |
| 17 | Script deployment and Type ID | 1 | | | | | | | | | | | | |
| 18 | Fiber — channels | 0 | | | | | | | | | | | | |
| 19 | Fiber — invoices, HTLCs, routing | 0 | | | | | | | | | | | | |
| 20 | CI and reproducible evidence | 2 | | | | | | | | | | | | |

Week 1 ratings are set from what the Week 1 report actually demonstrates: a working
Type Script with 23 tests and CI earns a 2 on testing; a single devnet transfer does
not earn a 2 on anything to do with testnet.

## Running counters

| | Target | W1.5 | W2 | W3 | W4 | W5 | W6 | W7 | W8 | W9 | W10 | W11 | W12 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Upstream contributions filed | 5 | | | | | | | | | | | | |
| Technical posts published | 3 | | | | | | | | | | | | |
| Rust drip days (cumulative) | ~60 | — | — | | | | | | | | | | |
| Public explorer links | — | | | | | | | | | | | | |
| Level reached (F/T/S) | — | | | | | | | | | | | | |

## The rule this table exists for

Anything rated **≤1** that a later week depends on gets a remediation block
scheduled into the next week, **before** any new material.

Dependencies worth watching:

| Rating that matters | Blocks |
|---|---|
| Rust ownership (13) | Weeks 6–7 |
| CCC signers (6) | Week 4 |
| Fiber channels (18) | Weeks 9–11 |
| Testnet operation (8) | Everything from Week 1.5 on |
