# Week 1.5 — Get onto testnet, and go public

**Period:** Wed 16 – Sat 19 Sep 2026 · **Report:** Sat 19 Sep · **Budget:** 32h (4-day week)
**Phase:** A — Get onto testnet and go public

| Level | What ships |
|---|---|
| **Floor** | One testnet transaction with a public explorer link, and the four findings filed |
| **Target** | The table below — plus the counter Script deployed to testnet |
| **Stretch** | The devnet test suite re-run against the testnet deployment, green |

## Why this week looks like this

Everything I have built so far runs on a local devnet that disappears when I run
`offckb clean`. Week 1's own report says it plainly: *"I have not touched testnet at
all, so none of my transaction hashes are publicly verifiable."* That is still true
on 16 September.

The entire differentiator of this repository is that every claim is checkable by
someone else. Right now none of them are. So this week is not about learning
something new — it is about moving what I already have somewhere it can be seen.

Two things also start this week that pay off much later:

- **Rust, from day one.** An hour a day starting now is 34 hours before Week 4 needs
  it. Starting in Week 3 as originally planned would leave it cold.
- **A forum account that is not brand new in December.** Being useful to other people
  in the ecosystem is not something that can be started in the last fortnight.

## The four findings

`notes/findings/offckb-install-observations.md` has been sitting in this repository
since 27 August with four written-up findings and an unticked checkbox at the bottom:
`[ ] Sent to CKB DevRel`. Finding #4 blocks **every contract test on Windows** for
every developer who hits it, and I have already proved it reproduces on an untouched
`offckb create` template.

Filing them is roughly one hour of work that converts four private notes into four
public contributions with my name on them. It is the highest-value hour in the entire
twelve weeks and it has been deferred twice. It happens Saturday morning, first.

## Days

| Day | Date | A — New material (3h) | B — Prove it (3h) | C — Rust (1h) | D — Ship (1h) | Done when |
|---|---|---|---|---|---|---|
| Wed | 16 Sep | Testnet vs devnet; the faucet; the explorer; testnet key hygiene | Generate a testnet address, fund it from the faucet, **send my first testnet transaction** | Install `rustup`, add the `riscv64imac-unknown-none-elf` target, install `cargo-generate`, compile a hello-world | Explorer link into `notes/log.md` | A public explorer page shows a transaction I signed |
| Thu | 17 Sep | CCC client configuration for public testnet; how the public RPC differs from devnet | Point `inspect-tx` at testnet; decode a real testnet transaction end to end | Rustlings 1–20 (variables, functions, if, primitive types) | Create the Nervos Talk account; introduce myself; reply to two existing threads | `inspect-tx` prints a transaction I did not create, pulled from public testnet |
| Fri | 18 Sep 🔥 | Script deployment to testnet; dep cells, `scripts.json`, migrations | Deploy the counter Script to **testnet**; run the devnet suite against the testnet deployment | Rustlings 21–40 (vecs, structs, enums) | Capture evidence files as they happen, not after | `deployment/scripts.json` has a real testnet entry and the tests pass against it |
| Sat | 19 Sep | — | **File all four findings** as issues on `ckb-devrel/offckb`, first thing | The Rust Book ch. 4 — ownership | **Write the real Week 1.5 report**; update the skills matrix; push | Four issue URLs exist, and the report contains no placeholder |

🔥 Friday is the hard day. Deploying to testnet is not the same as deploying to
devnet — the capacity has to come from somewhere real, the migration files matter,
and a mistake costs testnet CKB and a faucet wait rather than an `offckb clean`.

## ⚠ Before the first push this week

I now hold real testnet keys. `.gitignore` already covers `.env*`, `*.key`, `*.pem`,
`keystore/` and `wallets/`, but *covered by .gitignore* and *not in a tracked file*
are different claims. Before the first push:

```bash
git grep -nEi '(private[_ ]?key|mnemonic|seed phrase|0x[0-9a-f]{64})' -- . ':!*.md' || echo "clean"
```

A 64-hex match is not automatically a key — transaction hashes look the same. Read
every hit rather than trusting the count.

## About `reports/week-01.5-report.md`

That file currently exists as an **unfilled template**, dated 19 September, with
placeholder rows claiming a first testnet transaction (`0x____`) and four findings
filed. Neither had happened when it was written.

It gets rewritten on Saturday **from evidence captured during the week**. Nothing in
it is reconstructed, and no placeholder survives. The check is mechanical:

```bash
grep -n '0x____\|_____' reports/week-01.5-report.md && echo "NOT READY" || echo "clean"
```

## Evidence to capture

| File | What it shows |
|---|---|
| `screenshots/week-01.5/01-faucet-funded.png` | Testnet address funded |
| `screenshots/week-01.5/02-testnet-transfer.png` | The transfer on the public explorer |
| `screenshots/week-01.5/03-inspect-tx-testnet.png` | My inspector reading public testnet |
| `screenshots/week-01.5/04-counter-deployed-testnet.png` | The deployed Script on the explorer |
| `screenshots/week-01.5/05-findings-filed.png` | The four issues on `ckb-devrel/offckb` |
| `evidence/week-01.5-testnet-transfer.json` | The raw transaction |
| `evidence/week-01.5-inspect-tx.log` | Inspector output against testnet |
| `evidence/week-01.5-counter-testnet-tests.log` | Test suite against the testnet deployment |

## Reading

| Day | Study item | Where |
|---|---|---|
| Wed | Testnet, faucet, explorer | [Testnet faucet](https://faucet.nervos.org/) · [Testnet explorer](https://testnet.explorer.nervos.org/) · [Devnet vs testnet](https://docs.nervos.org/docs/node/run-devnet-node) |
| Thu | CCC client configuration | [CCC docs](https://docs.nervos.org/docs/sdk-and-devtool/ccc) · `ClientPublicTestnet` in the CCC source |
| Fri | Script deployment | [Deploy a Script](https://docs.nervos.org/docs/script/deploy-a-script) · [Type ID](https://docs.nervos.org/docs/tech-explanation/type-id) · offckb's own `deployment/README.md` |
| Sat | — | Rust Book [ch. 4 — Ownership](https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html) |

## Rust

**Starts today, one hour a day, no exceptions.** Target for this week: toolchain
installed with the RISC-V target, and Rustlings through structs and enums. The goal
is not competence yet — it is that Week 4 does not open cold.

| Day | Rust |
|---|---|
| Wed | `rustup`, `riscv64imac-unknown-none-elf`, `cargo-generate`, hello-world compiles |
| Thu | Rustlings 1–20 |
| Fri | Rustlings 21–40 |
| Sat | The Rust Book ch. 4 — ownership |

## Next week

Addresses, witnesses and Molecule decoded by hand, and CCC in depth.
