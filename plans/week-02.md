# Week 2 — Transactions to the bone

**Period:** Mon 5 – Sat 10 Oct 2026 · **Report:** Sat 10 Oct · **Budget:** 48h
**Phase:** B — Transactions to the bone

| Level | What ships |
|---|---|
| **Floor** | An address decoder that reads a `ckt1…` address back into its lock script |
| **Target** | A full round-trip codec matching CCC byte for byte, the witness fully decoded, and CCC's transaction pipeline understood well enough to build one without a tutorial |
| **Stretch** | Forum post #1 published — the Windows contract-testing setup |

## Why this week looks like this

Two questions from `orientation.md` get closed by hand this week. Both are things
every CKB developer uses daily and very few can actually explain — which is exactly
why they are worth the time. Neither has a tutorial. Both are derivable from the RFCs
if I read carefully enough.

The second half is CCC in depth. Not "how do I call CCC" — I can already do that —
but what it is doing underneath: how it chooses cells, how it computes capacity and
fees, where the change output comes from, and what it does when there is not enough
capacity. Every project in Phase 2 is built on this, so a shallow understanding here
costs six weeks later.

## Days

| Day | Date | A — New material (3h) | B — Prove it (3h) | C — Rust (1h) | D — Ship (1h) | Done when |
|---|---|---|---|---|---|---|
| Mon | 5 Oct | [RFC 0021 — address format](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0021-ckb-address-format/0021-ckb-address-format.md) | Scaffold `exercises/addr-tool`; write the failing tests first, from the RFC's own examples | Rustlings 41–60 (strings, modules, options) | Commit; reply to one forum thread | Tests exist and fail for the right reason |
| Tue | 6 Oct | bech32 and bech32m; why the checksum constant changed | Implement bech32m encode/decode from scratch — no library | Rustlings: error handling, `Result` | Commit; reply to one forum thread | The RFC's worked examples round-trip |
| Wed | 7 Oct 🔥 | Full vs short payload format; `hash_type` encoding | Lock script → `ckt1…` and back, by hand | Rustlings: generics, traits | Commit; evidence captured | My output matches CCC's for three addresses, byte for byte |
| Thu | 8 Oct 🔥 | [Molecule](https://docs.nervos.org/docs/serialization/serialization-molecule-in-ckb); the `WitnessArgs` schema; secp256k1 signing and what exactly gets signed | Decode a Molecule `table` and `vector` header on paper, then in code; `notes/witness-args.md` with all 85 bytes labelled | Rustlings: lifetimes | Commit; evidence captured | Every byte accounted for, no `?` left; and I can state what the signing message is made of |
| Fri | 9 Oct | CCC internals: cell collection, capacity arithmetic, fee rate, change outputs, the error paths | Build a transaction with CCC that deliberately runs out of capacity, and one that pays a deliberately wrong fee. Read the source for the path my code takes | The Rust Book ch. 8 — collections | Open a docs issue on anything genuinely unclear | I can explain where the change output comes from, and what CCC does when capacity is short |
| Sat | 10 Oct | — | **Forum post #1** — the Windows contract-testing setup that blocked me in Week 1; report; push | The Rust Book ch. 9 — errors | Report, matrix, push | Post is live with a URL, and the report links it |

🔥 Two hard days. Wednesday and Thursday both require deriving the answer from a
specification rather than following instructions. Expect them to overrun — that is
what Friday's slack is for.

## The bar for "matches CCC"

Not "looks the same". Assert it in a test:

```ts
expect(myEncode(script)).toBe(ccc.Address.fromScript(script, client).toString());
```

Three addresses minimum, covering both `hash_type: "type"` and `hash_type: "data"`.
If they differ by even one character, the difference is the lesson.

## Forum post #1

The Week 1 findings are the seed: `ckb-testtool` cannot find the `ckb-debugger` that
offckb installed, because the `.cmd` shim is invisible to a bare-name
`child_process` spawn — which blocks every contract test on Windows. I have a
working `jest.setup.cjs` workaround and a reproduction on an untouched template.

Nobody has written this up. Windows developers hitting it currently have to derive
the workaround themselves. That is what makes it worth posting rather than a
summary of documentation that already exists.

It is also the first of the three posts, and the one most likely to be useful to
somebody immediately.

## Evidence to capture

| File | What it shows |
|---|---|
| `screenshots/week-02/01-addr-roundtrip.png` | Codec tests passing against CCC |
| `screenshots/week-02/02-witness-decoded.png` | The annotated witness bytes |
| `screenshots/week-02/03-capacity-error.png` | CCC's behaviour when capacity runs short |
| `screenshots/week-02/04-forum-post.png` | Post #1 live on talk.nervos.org |
| `evidence/week-02-addr-tool-tests.log` | Full test output |
| `evidence/week-02-witness-raw.json` | The raw witness being decoded |

## Reading

| Day | Study item | Where |
|---|---|---|
| Mon | Address format | [RFC 0021](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0021-ckb-address-format/0021-ckb-address-format.md) · [Addresses explained](https://docs.nervos.org/docs/tech-explanation/address) |
| Tue | bech32 and bech32m | [BIP-173](https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki) · [BIP-350](https://github.com/bitcoin/bips/blob/master/bip-0350.mediawiki) — RFC 0021 says which CKB uses and why |
| Wed | Full vs short payload, `hash_type` | RFC 0021, "Payload Format Types" |
| Thu | Molecule, `WitnessArgs`, signing | [Molecule in CKB](https://docs.nervos.org/docs/serialization/serialization-molecule-in-ckb) · [RFC 0022](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0022-transaction-structure/0022-transaction-structure.md) · [`blockchain.mol`](https://github.com/nervosnetwork/ckb/blob/develop/util/types/schemas/blockchain.mol) |
| Fri | CCC internals | [CCC docs](https://docs.nervos.org/docs/sdk-and-devtool/ccc) · the `ckb-ccc` source — start at the transaction builder and follow `completeInputsByCapacity` |

`blockchain.mol` is the authoritative answer for Thursday — the `WitnessArgs` table is
defined there in about five lines. Everything else is derived from it.

## Rust

An hour a day, continuing from Week 1.5. Target: Rustlings complete through
lifetimes, and the Rust Book through chapter 9.

## Next week

xUDT, Spore and DOBs — my own token and my own DOB, both on testnet.
