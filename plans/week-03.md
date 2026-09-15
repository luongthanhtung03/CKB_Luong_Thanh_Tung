# Week 3 — CCC in depth, and my own token

**Period:** Mon 28 Sep – Sat 3 Oct 2026 · **Report:** Sat 3 Oct · **Budget:** 18h
**Phase:** B — Build with CCC and ship a dApp · **Rust drip starts**

| Level | What ships |
|---|---|
| **Floor** | A fungible token issued on testnet, with an explorer link |
| **Target** | The token plus a small CLI that mints, transfers and reports balance |
| **Stretch** | Read CCC's source for the path my own code takes, and file one docs issue from it |

## Why this week looks like this

Up to now CCC has been something I copy from tutorials. This week it becomes
something I understand: how it finds cells, how it decides change, how it collects
signatures. Issuing a token is the excuse — the real outcome is being able to
predict what CCC will do before running it.

## Days

| Day | Date | Study (≈1h) | Build (≈2h) | Done when |
|---|---|---|---|---|
| Mon | 28 Sep | [CCC docs](https://docs.ckbccc.com/docs/CCC): Client, Signer, Transaction | Run three [CCC Playground](https://docs.ckbccc.com/docs/playground) examples; write `notes/ccc-model.md` | I can name what Client, Signer and Transaction each own |
| Tue | 29 Sep | The indexer: querying cells by lock and by type | Query my own testnet cells directly over RPC, no CCC | I get the same cell list CCC gets, from raw RPC |
| Wed | 30 Sep | [xUDT introduction](https://docs.nervos.org/docs/tech-explanation/xudt), [how xUDT works](https://docs.nervos.org/docs/ecosystem-scripts/xudt#how-xudt-works) | Notes on the token cell layout: where the amount lives, what the type script checks | I can draw a token cell from memory |
| Thu | 1 Oct | [RFC 0052 — xUDT](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0052-extensible-udt/0052-extensible-udt.md) | [Create Fungible Token](https://docs.nervos.org/docs/dapp/create-token) on testnet | My token exists on the public explorer |
| Fri | 2 Oct 🔥 | — | `exercises/token-cli` — mint, transfer, balance. Written from the SDK, not the tutorial | Token moved between two addresses I control, both transactions public |
| Sat | 3 Oct | — | Report; push; skills matrix | Report published |

🔥 Friday is the hard day: the tutorial hands you a script, the CLI makes you own
the whole flow — cell collection, change, fee, and the failure cases.

## Reading

| Day | Study item | Where |
|---|---|---|
| Mon | CCC: Client, Signer, Transaction | [CCC docs](https://docs.ckbccc.com/docs/CCC) · [API reference](https://api.ckbccc.com/) · [Playground](https://docs.ckbccc.com/docs/playground) |
| Tue | The indexer | [RPCs overview](https://docs.nervos.org/docs/getting-started/rpcs) · [CKB RPC reference](https://github.com/nervosnetwork/ckb/blob/develop/rpc/README.md) — the `get_cells` method under the Indexer module |
| Wed | xUDT cell layout | [xUDT introduction](https://docs.nervos.org/docs/tech-explanation/xudt) · [how xUDT works](https://docs.nervos.org/docs/ecosystem-scripts/xudt#how-xudt-works) |
| Thu | The xUDT standard | [RFC 0052](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0052-extensible-udt/0052-extensible-udt.md) · [Create Fungible Token](https://docs.nervos.org/docs/dapp/create-token) |

Note on Tuesday: the indexer used to be a separate service, but has been part of the
CKB node since v0.106.0 — enabled with `--indexer`, or via the `Indexer` module in
`ckb.toml`. Old tutorials referring to a standalone `ckb-indexer` are out of date.

## Rust drip starts today

**30 minutes every day, before anything else.** This is the single change that
decides whether Week 6 feels hard or brutal.

- [The Rust Book](https://doc.rust-lang.org/book/) chapters 1–3 this week
- [Rustlings](https://github.com/rust-lang/rustlings): `variables`, `functions`, `if`
- Log each day in `notes/log.md` with a one-line note on what was new

Coming from TypeScript, ownership and borrowing are the parts that will not click
by reading. They click by getting the compiler error repeatedly. That is the point
of doing this daily rather than in one block.

## Evidence to capture

| File | What it shows |
|---|---|
| `screenshots/week-03/01-playground.png` | CCC Playground examples running |
| `screenshots/week-03/02-token-minted.png` | Token issuance on the explorer |
| `screenshots/week-03/03-token-transfer.png` | Token transfer on the explorer |
| `screenshots/week-03/04-cli-balance.png` | `token-cli` reporting balances |
| `evidence/week-03-token-mint.json` | Raw mint transaction |

## Next week

The front end. A page a stranger can open, connect a wallet to, and move both CKB
and my token with.
