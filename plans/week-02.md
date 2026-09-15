# Week 2 — Addresses, witnesses, Molecule

**Period:** Mon 21 – Sat 26 Sep 2026 · **Report:** Sat 26 Sep · **Budget:** 18h
**Phase:** A — Understand it, and go public

| Level | What ships |
|---|---|
| **Floor** | An address decoder that reads a `ckt1…` address back into its lock script |
| **Target** | A full round-trip codec matching CCC byte for byte, plus the witness decoded |
| **Stretch** | Generate the codec's test vectors from real testnet addresses pulled off the explorer |

## Why this week looks like this

Two questions from `orientation.md` get closed by hand this week. Both are things
every CKB developer uses daily and very few can actually explain — which is exactly
why they are worth the time. Neither has a tutorial. Both are derivable from the
RFCs if I read carefully enough.

## Days

| Day | Date | Study (≈1h) | Build (≈2h) | Done when |
|---|---|---|---|---|
| Mon | 21 Sep | [RFC 0021 — address format](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0021-ckb-address-format/0021-ckb-address-format.md) | Scaffold `exercises/addr-tool`; write the failing tests first, from the RFC's own examples | Tests exist and fail for the right reason |
| Tue | 22 Sep | bech32 and bech32m; why the checksum constant changed | Implement bech32m encode/decode from scratch — no library | The RFC's worked examples round-trip |
| Wed | 23 Sep 🔥 | Full vs short payload format; `hash_type` encoding | Lock script → `ckt1…` and back, by hand | My output matches CCC's for three addresses, byte for byte |
| Thu | 24 Sep | [Molecule and serialization](https://docs.nervos.org/docs/serialization/serialization-molecule-in-ckb) | Decode a Molecule `table` and `vector` header on paper first, then in code | I can find any field's offset without running anything |
| Fri | 25 Sep 🔥 | The `WitnessArgs` schema | `notes/witness-args.md` — all 85 bytes of a real witness, labelled | Every byte accounted for. No `?` left in the file |
| Sat | 26 Sep | — | [Store Data on Cell](https://docs.nervos.org/docs/dapp/store-data-on-cell) on testnet if not already done; report; push | Report published with an explorer link |

🔥 Two hard days this week. Wednesday and Friday both require deriving the answer
from a specification rather than following instructions. Expect them to overrun —
that is what the Thursday/Saturday slack is for.

## The bar for "matches CCC"

Not "looks the same". Assert it in a test:

```ts
expect(myEncode(script)).toBe(ccc.Address.fromScript(script, client).toString());
```

Three addresses minimum, covering both `hash_type: "type"` and `hash_type: "data"`.
If they differ by even one character, the difference is the lesson.

## Evidence to capture

| File | What it shows |
|---|---|
| `screenshots/week-02/01-addr-roundtrip.png` | Codec tests passing against CCC |
| `screenshots/week-02/02-witness-decoded.png` | The annotated witness bytes |
| `screenshots/week-02/03-store-data-testnet.png` | Data cell on the public explorer |
| `evidence/week-02-addr-tool-tests.log` | Full test output |
| `evidence/week-02-witness-raw.json` | The raw witness being decoded |

## Reading

Every study item above, with its source:

| Day | Study item | Where |
|---|---|---|
| Mon | Address format | [RFC 0021](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0021-ckb-address-format/0021-ckb-address-format.md) · [Addresses explained](https://docs.nervos.org/docs/tech-explanation/address) |
| Tue | bech32 and bech32m | [BIP-173 (bech32)](https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki) · [BIP-350 (bech32m)](https://github.com/bitcoin/bips/blob/master/bip-0350.mediawiki) — RFC 0021 says which CKB uses and why |
| Wed | Full vs short payload, `hash_type` | RFC 0021, "Payload Format Types" section |
| Thu | Molecule | [Molecule in CKB](https://docs.nervos.org/docs/serialization/serialization-molecule-in-ckb) · [Molecule spec](https://github.com/nervosnetwork/molecule) |
| Fri | `WitnessArgs` | [RFC 0022 — transaction structure](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0022-transaction-structure/0022-transaction-structure.md) · the schema itself in [`blockchain.mol`](https://github.com/nervosnetwork/ckb/blob/develop/util/types/schemas/blockchain.mol) |

`blockchain.mol` is the authoritative answer for Friday — the `WitnessArgs` table is
defined there in about five lines. Everything else is derived from it.

## Rust drip

Not yet — starts Week 3. This week's spare capacity goes into the two hard problems.

## Next week

CCC in depth, and issuing my own fungible token on testnet.
