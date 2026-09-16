# Week 4 — Rust on-chain, part 1

**Period:** Mon 5 – Sat 10 Oct 2026 · **Report:** Sat 10 Oct · **Budget:** 48h
**Phase:** D — Rust on-chain

> **⚠ This is the load-bearing week of the plan.** See [Checkpoint](#-checkpoint-sat-10-oct).

| Level | What ships |
|---|---|
| **Floor** | A Rust script that compiles, passes one test, and runs under `ckb-debugger` |
| **Target** | The counter Type Script ported TypeScript → Rust, same assertions passing, deployed to testnet |
| **Stretch** | Forum post #2 — the measured cycle comparison |

## Why this week looks like this

**The block ratio inverts this week.** Rust stops being an hour a day and becomes the
main event: roughly **4h Rust, 2h everything else, 1h build, 1h ship**. Three weeks of
daily drip means this opens warm rather than cold — that was the whole point of
starting on 16 September.

The port is deliberate. I am not writing a new script in Rust; I am writing a script
I already understand, in a language I do not. That isolates the variable. When
something fails, it is Rust or the toolchain — never the logic, because the logic has
23 passing assertions in TypeScript to compare against.

That same property is what makes the cycle comparison possible, and the cycle
comparison is the seed of **P3**.

## Days

| Day | Date | A — New (2h) | B — Build (1h) | C — Rust (4h) | D — Ship (1h) | Done when |
|---|---|---|---|---|---|---|
| Mon | 5 Oct | `no_std` — what it removes and why a script needs it; the `ckb-std` entry point | Generate a project with `ckb-script-templates`; get the empty script building | Rust Book ch. 15 — smart pointers, `Box`, and why `alloc` matters here | Commit the scaffold | An empty Rust script builds to a RISC-V binary |
| Tue | 6 Oct | `ckb-std` syscalls: loading cells, scripts, witnesses | Port the counter's *read* path — load the cell, read the count | Rust: slices, byte handling, `from_le_bytes` | Commit; reply to one forum thread | The script reads a counter value out of cell data |
| Wed | 7 Oct 🔥 | Script error codes; how a failure is returned and what the runner sees | Port the *validation* path — the create-at-zero and increment-by-one rules | Rust: pattern matching on `Result`, custom error enums | Commit; evidence captured | All 23 assertions from the TypeScript suite pass against the Rust script |
| Thu | 8 Oct | `ckb-testtool` in Rust; how it differs from the TypeScript harness | Get the full test suite running in Rust, including the 18 failure assertions | Rust: writing tests, `#[test]`, assertions | Commit | The Rust suite runs green, and the failure cases fail with the *specific* expected error code |
| Fri | 9 Oct 🔥 | `ckb-debugger`: cycles, what consumes them, how to read a profile | **Measure**: same assertions, ckb-js-vm vs Rust, cycle counts for both | Rust: reading disassembly output without panicking about it | Capture the raw numbers into `evidence/` | I have a table of cycle counts for both implementations, produced by a command I can re-run |
| Sat | 10 Oct | — | Deploy the Rust script to **testnet**; **forum post #2** | — | Report, matrix, funding tally, push | The Rust script is live on testnet and the comparison is published |

🔥 Wednesday and Friday. Wednesday is where Rust's ownership rules meet byte
manipulation and the borrow checker stops being theoretical. Friday is measurement
work with no tutorial — reading a cycle profile is a skill, not a command.

## ⚠ Checkpoint: Sat 10 Oct

**By the end of this week, a Rust script must compile, pass its tests, and be
deployed to testnet.** 87 hours of this plan assume Rust arrives. Rust was rated 0 in
the skills matrix in Week 1, and everything in Phase 2 that touches on-chain code
depends on this week working.

**If it has not happened by Saturday, the fallback fires — that day, not the
following week:**

> P1's on-chain components fall back to **ckb-js-vm**, which already works here with
> 23 passing tests and green CI. What is lost is the cycle-efficiency story. What is
> not lost is anything else — the Fiber work, the session work, and P2 are all
> unaffected. Rust then continues as a one-hour daily drip through Phase 2, and P3
> absorbs the comparison work.

Writing this down now is the point. A checkpoint decided in the moment, while tired
and behind, is not a decision — it is a drift.

## Forum post #2 — the cycle comparison

This one is genuinely unpublished. Plenty of people have opinions about ckb-js-vm
versus native Rust; I will have **the same script, with the same assertions,
measured both ways**, which is a different kind of claim.

Requirements for it to be worth posting:

- The comparison command is in the repository and anyone can re-run it.
- Both implementations pass the identical assertion set — otherwise it is not a
  comparison.
- The numbers include the failure paths, not just the happy path.
- The write-up says what the measurement does *not* show.

This is the seed of **P3 — `ckb-cycle-tools`**. The harness built this week is most
of that project, which is why P3 is the cheapest of the three and the first to ship.

## Evidence to capture

| File | What it shows |
|---|---|
| `screenshots/week-04/01-rust-builds.png` | First RISC-V binary produced |
| `screenshots/week-04/02-rust-tests-green.png` | All 23 assertions passing in Rust |
| `screenshots/week-04/03-error-codes.png` | Failure cases returning the specific expected codes |
| `screenshots/week-04/04-cycle-comparison.png` | The two cycle counts side by side |
| `screenshots/week-04/05-rust-deployed-testnet.png` | The Rust script on the explorer |
| `evidence/week-04-rust-test-run.log` | Full Rust test output |
| `evidence/week-04-cycles-jsvm.txt` | Raw ckb-debugger output, ckb-js-vm |
| `evidence/week-04-cycles-rust.txt` | Raw ckb-debugger output, Rust |

## Reading

| Day | Study item | Where |
|---|---|---|
| Mon | `no_std`, `ckb-std` | [Script development](https://docs.nervos.org/docs/script/intro-to-script) · [`ckb-std` docs](https://docs.rs/ckb-std) · [`ckb-script-templates`](https://github.com/cryptape/ckb-script-templates) |
| Tue | Syscalls | [RFC 0009 — VM syscalls](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0009-vm-syscalls/0009-vm-syscalls.md) |
| Wed | Error codes | The `ckb-std` error module; my own Week 1 counter script for the assertion list |
| Thu | `ckb-testtool` | [`ckb-testtool`](https://github.com/nervosnetwork/ckb-testtool) |
| Fri | Cycles | [`ckb-debugger`](https://github.com/nervosnetwork/ckb-standalone-debugger) · [RFC 0014 — VM cycle limits](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0014-vm-cycle-limits/0014-vm-cycle-limits.md) |

## Next week

Rust part 2 — lock scripts, Type ID, upgradable deployment — and then the front end.
