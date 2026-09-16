# Week 3 — Standards: xUDT, Spore and DOBs

**Period:** Mon 28 Sep – Sat 3 Oct 2026 · **Report:** Sat 3 Oct · **Budget:** 48h
**Phase:** C — Standards

| Level | What ships |
|---|---|
| **Floor** | My own fungible token issued and transferred on testnet |
| **Target** | Token plus a DOB, both minted on testnet, both with a decoder I wrote |
| **Stretch** | A decoder for a DOB trait the cookbook does not cover |

## Why this week looks like this

Almost every application on CKB is one of two things underneath: a fungible token or
a piece of structured on-chain data. xUDT is the first, Spore and DOBs are the
second. Knowing both is most of what "can build any CKB application" actually means.

The week is also the last one before Rust takes over. Everything from here that is
written in TypeScript gets written this week; Weeks 4 and 5 are Rust.

There is a specific trap to avoid: it is possible to mint a token by following the
tutorial without understanding the type script that governs it. The test for whether
that happened is Wednesday's — being able to say what makes a mint valid and what an
invalid one would look like, before writing any code.

## Days

| Day | Date | A — New material (3h) | B — Prove it (3h) | C — Rust (1h) | D — Ship (1h) | Done when |
|---|---|---|---|---|---|---|
| Mon | 28 Sep | sUDT vs xUDT; why xUDT exists; amount encoding | Issue my own token on **testnet**; transfer it to a second address | The Rust Book ch. 10 — generics, traits, lifetimes | Explorer links to both transactions | The token and the transfer are both visible on the public explorer |
| Tue | 29 Sep | The xUDT type script: args, extension scripts, the owner-lock mint rule | Write the failing tests first: a mint I should not be allowed to make, and a transfer that should not balance | The Rust Book ch. 11 — writing tests | Commit; reply to one forum thread | Both tests fail for the reason I predicted, not a different one |
| Wed | 30 Sep 🔥 | Spore and DOB: cluster, spore, the decoder model; DOB/0 and DOB/1 | Mint a DOB on **testnet**, in a cluster I created | Rust: `Option`/`Result` combinators in anger | Explorer link; screenshot | The DOB renders from its own on-chain data, and I can say which bytes produced which trait |
| Thu | 1 Oct 🔥 | DOB decoding in detail; where the decoder runs and what it is allowed to assume | Write my own decoder for a trait the cookbook does not cover | Rust: iterators and closures | Commit; evidence captured | My decoder produces the right output for a DOB I minted, and I can explain a case where it would fail |
| Fri | 2 Oct | A first look at SSRI — what problem it solves and why it exists | Read the xUDT source for the path a transfer takes; file a docs issue on anything genuinely unclear | Rust: modules, crates, `Cargo.toml` layout | Issue filed in someone else's repository | I can explain, unprompted, why SSRI exists |
| Sat | 3 Oct | — | Fold the token and the DOB into one page in the existing inspector; report; push | The Rust Book ch. 13 | Report, matrix, push | Report published with four explorer links |

🔥 Two hard days. Wednesday's is understanding the Spore data model rather than
copying the mint command. Thursday's has no tutorial at all by definition — the trait
is chosen *because* the cookbook does not cover it.

## The bar for "I understand xUDT"

Before Monday's mint counts as done, I can answer without looking:

- What is in the type script's `args`, and why that and not something else?
- What stops me minting tokens I do not own?
- Where is the amount stored, in what byte order, and how many bytes?
- What would a transaction that unbalances the supply look like, and which check
  rejects it?

If any answer is "the tutorial did it for me", Monday is not done.

## Evidence to capture

| File | What it shows |
|---|---|
| `screenshots/week-03/01-token-issued.png` | Token issuance on the explorer |
| `screenshots/week-03/02-token-transfer.png` | Transfer between my addresses |
| `screenshots/week-03/03-invalid-mint-rejected.png` | The mint that should fail, failing |
| `screenshots/week-03/04-dob-minted.png` | The DOB on the explorer |
| `screenshots/week-03/05-custom-decoder.png` | My decoder producing the trait |
| `evidence/week-03-xudt-tests.log` | Test output including the deliberate failures |
| `evidence/week-03-dob-data.json` | The DOB's raw on-chain data |

## Reading

| Day | Study item | Where |
|---|---|---|
| Mon | sUDT and xUDT | [Create a token](https://docs.nervos.org/docs/dapp/create-token) · [RFC 0025 — sUDT](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0025-simple-udt/0025-simple-udt.md) · [xUDT](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0052-extensible-udt/0052-extensible-udt.md) |
| Tue | The xUDT type script | The [xUDT source](https://github.com/nervosnetwork/ckb-production-scripts) |
| Wed | Spore and DOB | [Create a DOB](https://docs.nervos.org/docs/dapp/create-dob) · [Spore docs](https://docs.spore.pro/) |
| Thu | DOB decoding | [DOB decoder templates](https://github.com/sporeprotocol/dob-decoder-standalone-server) · the Spore protocol RFC |
| Fri | SSRI | [SSRI](https://docs.nervos.org/docs/sdk-and-devtool/ssri) |

## Rust

An hour a day. Target: the Rust Book through chapter 13, and comfortable with
`Result`, iterators and module layout. Next week this becomes four hours a day, so
this is the last week where Rust is a background thread.

## ⚠ Looking ahead to next week

Week 4 is the checkpoint week. Before Monday 5 October, confirm the toolchain from
Week 1.5 still works:

```bash
rustup target list --installed | grep riscv64
cargo generate --help
```

If either fails, fix it on Sunday. Week 4 has no room to spend a morning on `rustup`.

## Next week

Rust on-chain, part 1 — and the first checkpoint.
