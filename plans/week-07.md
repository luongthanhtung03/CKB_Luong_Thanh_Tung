# Week 7 — Two languages, one script, measured

**Period:** Mon 26 – Sat 31 Oct 2026 · **Report:** Sat 31 Oct · **Budget:** 18h
**Phase:** C — Write scripts in Rust

| Level | What ships |
|---|---|
| **Floor** | The counter Type Script ported to Rust, with the mock tests passing |
| **Target** | The port, **cycle counts measured against the TypeScript original**, access control added, and the capstone brief sent |
| **Stretch** | **Post #2** — publish the comparison |

## Why this week looks like this

I have the same script written in two languages: TypeScript via ckb-js-vm from
Week 1, and Rust from this week. That is an unusual position, and it makes a
measurement possible that I have not found published anywhere — *what does running
a script through a JavaScript interpreter on RISC-V actually cost, in cycles,
against native Rust doing the same job?*

Handbook Class 10 discusses language choice, and Class 9 covers cycle reduction,
but neither puts real numbers on this exact comparison. Numbers from a working
example are worth more than opinion, and this is the single most distinctive thing
the twelve weeks can produce.

## Days

| Day | Date | Study (≈1h) | Build (≈2h) | Done when |
|---|---|---|---|---|
| Mon | 26 Oct | [Class 10: Language Choices](https://docs.nervos.org/docs/script-course/intro-to-script-10) | Port the counter rule to Rust: create at zero, increment by exactly one | The Rust script builds |
| Tue | 27 Oct | `ckb-testtool` in Rust | Port the 23 tests — 5 success, 18 failure with specific error codes | All 23 pass in Rust |
| Wed | 28 Oct 🔥 | [Class 9: Cycle Reductions](https://docs.nervos.org/docs/script-course/intro-to-script-9) | Measure both under `ckb-debugger`; identical transactions, identical rule | A table of cycle counts for both, same workload |
| Thu | 29 Oct | [Class 6: Type ID](https://docs.nervos.org/docs/script-course/intro-to-script-6) | Add owner-only access control; deploy to testnet with Type ID | Only the designated owner can increment, proven on testnet |
| Fri | 30 Oct | — | Write the capstone brief; send to Neon and CKB DevRel | Brief sent, and a copy committed |
| Sat | 31 Oct | — | Report; **Post #2**; push | Report published, comparison public |

🔥 Wednesday is the hard day, and the most valuable one in the plan. Measuring
fairly is the difficult part: same transaction shape, same number of cells, same
data, binary sizes recorded, and the ckb-js-vm interpreter's own startup cost
separated from the script logic. An unfair comparison is worse than none.

## Reading

| Day | Study item | Where |
|---|---|---|
| Mon | Language choice on CKB | [Class 10: Language Choices](https://docs.nervos.org/docs/script-course/intro-to-script-10) |
| Tue | Testing scripts in Rust | [ckb-testtool](https://github.com/nervosnetwork/ckb-testtool) · [`ckb-std` docs](https://docs.rs/ckb-std/) |
| Wed | Cycles and how to reduce them | [Class 9: Cycle Reductions](https://docs.nervos.org/docs/script-course/intro-to-script-9) · [Class 8: Performant WASM](https://docs.nervos.org/docs/script-course/intro-to-script-8) |
| Thu | Type ID | [Class 6: Type ID](https://docs.nervos.org/docs/script-course/intro-to-script-6) · [Type ID explained](https://docs.nervos.org/docs/script/type-id) |

Classes 9 and 10 are the closest the documentation comes to the comparison being
measured on Wednesday — worth reading first, precisely so the measurement can show
something they do not.

Friday and Saturday are marked `—`: writing the brief and the report is the work.

## The capstone brief

Following the structure used elsewhere in the cohort — Problem · Smallest useful
user flow · On-chain responsibilities · Off-chain responsibilities · Invariants ·
Non-goals · Test plan · Screenshot plan · Risks.

Subject: **pay-per-use API metering over Fiber, with browser-held self-custody
sessions.** The BSS and RCS shapes from the 2026 opportunity map, which names both
as things to validate next. Send it early enough that feedback can still change the
design — Friday of Week 7 leaves two clear weeks before building starts.

## Rust drip

- Rust Book chapters 14–16, skimming what does not apply on-chain
- Whatever the port actually made me look up — that is the real syllabus now

## Evidence to capture

| File | What it shows |
|---|---|
| `screenshots/week-07/01-rust-tests.png` | 23 tests passing in Rust |
| `screenshots/week-07/02-cycles-ts.png` | Cycle count, TypeScript version |
| `screenshots/week-07/03-cycles-rust.png` | Cycle count, Rust version |
| `screenshots/week-07/04-access-control.png` | Non-owner increment refused on testnet |
| `evidence/week-07-cycle-comparison.md` | The measurement, with method written out |
| `evidence/week-07-rust-test-run.log` | Full test output |

## Next week

Fiber Network. Two nodes, a channel, and a payment.
