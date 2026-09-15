# Week 6 — Rust scripts, and a lock of my own

**Period:** Mon 19 – Sat 24 Oct 2026 · **Report:** Sat 24 Oct · **Budget:** 18h
**Phase:** C — Write scripts in Rust

| Level | What ships |
|---|---|
| **Floor** | The Simple Lock tutorial built and passing its tests locally |
| **Target** | A Rust lock **deployed to testnet**, a cell locked with it, and that cell unlocked |
| **Stretch** | A variant beyond the tutorial — multisig, or a time lock using `since` |

## Why this week looks like this

A lock script is the most consequential thing on CKB: it is the only thing standing
between a cell and anyone who wants it. Writing one in Rust, deploying it publicly,
locking real testnet value behind it and then unlocking it is the first time my own
code guards something on a network other people can see.

## Days

| Day | Date | Study (≈1h) | Build (≈2h) | Done when |
|---|---|---|---|---|
| Mon | 19 Oct | [Class 2: Script Basics](https://docs.nervos.org/docs/script-course/intro-to-script-2) | Read the generated template line by line; annotate what every syscall does | I can explain entry point, args loading and exit codes |
| Tue | 20 Oct | Syscalls: `load_script`, `load_witness`, `load_cell` | [Build a Simple Lock](https://docs.nervos.org/docs/dapp/simple-lock) — compile it | The lock builds and its tests pass locally |
| Wed | 21 Oct | Deployment, and why the code hash changes when the binary does | Deploy the lock to **devnet**; lock a cell; unlock it | Both transactions succeed on devnet |
| Thu | 22 Oct 🔥 | — | Deploy to **testnet**; lock a cell; unlock it | Lock, deposit and unlock, all three public on the explorer |
| Fri | 23 Oct | [Class 5: Debugging](https://docs.nervos.org/docs/script-course/intro-to-script-5) | Break the lock deliberately in four ways; confirm each specific error code | Four failure tests, each asserting its own error code |
| Sat | 24 Oct | — | Report; push; skills matrix | Report published with three testnet links |

🔥 Thursday is the hard day. Deploying to testnet costs real capacity, the code hash
must be recorded correctly, and an unlock that fails leaves the cell stuck until I
work out why. This is the first time a mistake actually costs something.

## Carry forward the Week 1 standard

The counter script shipped with 23 tests, 18 of them asserting failure *and* the
specific error code. The same bar applies here. A lock that passes its happy path
proves almost nothing — a lock that refuses four different attacks, each with the
error I expected, proves it works.

## Reading

| Day | Study item | Where |
|---|---|---|
| Mon | Script structure | [Class 2: Script Basics](https://docs.nervos.org/docs/script-course/intro-to-script-2) · [Minimal script example](https://docs.nervos.org/docs/script/rust/rust-example-minimal-script) |
| Tue | Syscalls | [RFC 0009 — VM syscalls](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0009-vm-syscalls/0009-vm-syscalls.md) · [`ckb-std` docs](https://docs.rs/ckb-std/) for the Rust wrappers |
| Wed | Deployment and code hashes | [Type ID](https://docs.nervos.org/docs/script/type-id) · [Class 6](https://docs.nervos.org/docs/script-course/intro-to-script-6) |
| Fri | Debugging | [Class 5: Debugging](https://docs.nervos.org/docs/script-course/intro-to-script-5) · [ckb-debugger](https://github.com/nervosnetwork/ckb-standalone-debugger) |

RFC 0009 is the one that repays careful reading. Every syscall `ckb-std` exposes is
specified there, and knowing what each one actually costs is what Week 7's cycle
measurement depends on.

## Rust drip

Now the main event rather than a side habit, but keep the daily half hour for the
language itself:

- Rust Book chapters 11–13: testing, closures, iterators
- `no_std` patterns: fixed buffers, no allocation, no panics that unwind
- Rustlings: `traits`, `lifetimes`

## Evidence to capture

| File | What it shows |
|---|---|
| `screenshots/week-06/01-lock-built.png` | Rust lock compiling |
| `screenshots/week-06/02-deployed-testnet.png` | Deployment transaction on the explorer |
| `screenshots/week-06/03-cell-locked.png` | A cell guarded by my lock |
| `screenshots/week-06/04-cell-unlocked.png` | The unlock transaction |
| `screenshots/week-06/05-failure-tests.png` | Four failure tests, each with its error code |
| `evidence/week-06-lock-deploy.json` | Deployment transaction and code hash |
| `evidence/week-06-test-run.log` | Full test output |

## Next week

Port the counter Type Script from TypeScript to Rust, and measure what that
actually costs in cycles — a comparison nobody has published.
