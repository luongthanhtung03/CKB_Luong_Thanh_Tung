# Week 5 — Digital objects, then Rust in earnest

**Period:** Mon 12 – Sat 17 Oct 2026 · **Report:** Sat 17 Oct · **Budget:** 18h
**Phase:** B → C — the handover week

| Level | What ships |
|---|---|
| **Floor** | A DOB minted on testnet, and the Rust/RISC-V toolchain compiling a hello-world script |
| **Target** | The DOB live in my dApp, and a Rust script building and running under `ckb-debugger` |
| **Stretch** | A custom DOB decoder for a trait the cookbook does not cover |

## Why this week looks like this

This is the pivot. The first half finishes the Beginner track — DOBs are the last
of the five tutorials I have not done. The second half opens the Intermediate one,
by getting the Rust toolchain working *before* Week 6 needs it. Toolchain problems
are the classic way to lose three days, so they get their own budgeted slot rather
than ambushing me later.

## Days

| Day | Date | Study (≈1h) | Build (≈2h) | Done when |
|---|---|---|---|---|
| Mon | 12 Oct | [Spore protocol](https://docs.nervos.org/docs/tech-explanation/spore-protocol), [Spore docs](https://docs.spore.pro/) | Notes on the DOB cell layout and the decoder model | I can explain what is on-chain vs what a decoder renders |
| Tue | 13 Oct | [DOB Cookbook](https://github.com/sporeprotocol/dob-cookbook) | [Create DOB](https://docs.nervos.org/docs/dapp/create-dob) on testnet | My DOB on the public explorer |
| Wed | 14 Oct | — | Add a DOB view and mint button to the Week 4 dApp | A DOB minted from the browser, rendering on the page |
| Thu | 15 Oct 🔥 | [Rust quick start for scripts](https://docs.nervos.org/docs/script/rust/rust-quick-start) | Install `rustup`, the `riscv64` target and [ckb-script-templates](https://github.com/cryptape/ckb-script-templates); build the generated script | `cargo build --release` produces a RISC-V binary |
| Fri | 16 Oct | [Class 1: Validation Model](https://docs.nervos.org/docs/script-course/intro-to-script-1) | Run the built script under `ckb-debugger`; make it fail deliberately and read the error | I can read a cycle count and an exit code from the debugger |
| Sat | 17 Oct | — | Report; push; skills matrix | Report published |

🔥 Thursday is the hard day, and it is hard for an unglamorous reason: Windows
toolchain setup. Budget the whole slot. If it overruns, Friday absorbs it — the
Rust toolchain working is Floor, the debugger session is not.

## Reading

| Day | Study item | Where |
|---|---|---|
| Mon | Spore and DOB model | [Spore protocol](https://docs.nervos.org/docs/tech-explanation/spore-protocol) · [Spore docs](https://docs.spore.pro/) |
| Tue | DOB recipes | [DOB Cookbook](https://github.com/sporeprotocol/dob-cookbook) · [How-to recipes](https://docs.spore.pro/category/how-to-recipes) · [Create DOB](https://docs.nervos.org/docs/dapp/create-dob) |
| Thu | Rust toolchain for scripts | [Rust quick start](https://docs.nervos.org/docs/script/rust/rust-quick-start) · [ckb-script-templates](https://github.com/cryptape/ckb-script-templates) |
| Fri | The validation model | [Class 1: Validation Model](https://docs.nervos.org/docs/script-course/intro-to-script-1) |

Thursday's project is generated with
`cargo generate gh:cryptape/ckb-script-templates workspace`. The template supports
Windows with the stable Rust toolchain and Clang, which matters here.

Wednesday is marked `—` because it is continuing Tuesday's DOB work into the dApp —
stopping to read would break the thread.

## Rust drip

Doubling this week, since Thursday onward is Rust anyway.

- Rust Book chapters 7–10: modules, collections, **error handling**, generics and traits
- Rustlings: `options`, `error_handling`, `generics`
- On-chain scripts are `no_std` — no heap by default, no `println!`. Worth knowing
  now so it is not a surprise on Thursday.

## Evidence to capture

| File | What it shows |
|---|---|
| `screenshots/week-05/01-dob-minted.png` | DOB on the explorer |
| `screenshots/week-05/02-dob-in-app.png` | DOB rendering in my dApp |
| `screenshots/week-05/03-cargo-build.png` | Rust script compiling to RISC-V |
| `screenshots/week-05/04-debugger.png` | `ckb-debugger` output with cycle count |
| `evidence/week-05-dob-mint.json` | Raw mint transaction |
| `evidence/week-05-toolchain.log` | Versions: rustc, cargo, target, debugger |

## Next week

Build a Simple Lock, in Rust, deployed to testnet.
