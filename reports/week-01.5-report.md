# CKBuilder Weekly Report — Week 1.5

**Participant:** Luong Thanh Tung ([@luongthanhtung03](https://github.com/luongthanhtung03))
**Track:** Builders'
**Week:** 1.5 — planned for 28 Sep – 3 Oct; the work below was done on 6 Oct 2026
**Publication date:** 2026-10-06

> **Note on scheduling.** My report day moves from Tuesday to **Saturday** from this
> week onward, to line up with the start of my contract.
>
> **Tooling.** Built with Claude Code as a pair programmer; commits are co-authored.

---

## This week in one table

| | |
|---|---|
| **Focus** | Moving everything off the local devnet and onto public testnet |
| **First testnet transaction** | [`0xb7855e7e…9f3eea`](https://testnet.explorer.nervos.org/transaction/0xb7855e7e43c2c716afef2bbf8e568c239927ac04794bf8e8b7b44470f29f3eea) — 1,000 CKB, block 22,653,473 |
| **Counter Script on testnet** | Deployed in [`0xa21da18f…b6ad66cf`](https://testnet.explorer.nervos.org/transaction/0xa21da18ff3f142127cf63d6e705d64c14577fb99a9a0cbf74f47fb70b6ad66cf), upgradable via Type ID |
| **On-chain test suite on testnet** | 6 / 6 passing, including two transactions the chain refused |
| **Rust** | Toolchain + RISC-V target; a 952-byte Rust Script runs in CKB-VM — `Run result: 0`, 595 cycles |
| **My testnet address** | [`ckt1qzda0c…qatqhlut3d`](https://testnet.explorer.nervos.org/address/ckt1qzda0cr08m85hc8jlnfp3zer7xulejywt49kt2rr0vthywaa50xwsqdxgu0tk5xzhek725dy84e92x6zg9sqatqhlut3d) — every transaction below is listed there |

---

## Goal for this week

Everything I had built ran on a local devnet that disappears on `offckb clean`, so
none of my transaction hashes could be checked by anyone else. The goal was to move
what I already had onto public testnet, so that from here on every claim in this log
carries a link.

## What I did

- **Sent my first transaction on public testnet**, signed with my own key. The key is
  generated with a CSPRNG into a gitignored `.env` and never printed
  ([`testnet-key.ts`](../exercises/transfer-ckb/src/testnet-key.ts)); funding came
  from the Nervos faucet via `offckb deposit --network testnet`. The transfer itself is
  [`testnet-transfer.ts`](../exercises/transfer-ckb/src/testnet-transfer.ts): declare
  one output, let CCC collect inputs, add change and set the fee, then wait for commit.
- **Pointed my transaction inspector at public testnet** and decoded three real
  transactions: my transfer, a stranger's three-Cell transaction, and a cellbase.
  Real traffic broke two assumptions the devnet had let me get away with — see below.
- **Deployed the counter Type Script to testnet** — the ckb-js-vm Script from Week 1,
  29,933 bytes of bytecode, deployed with Type ID so it can be upgraded in place.
  Code hash `0x07f377f9…6ec1d2cc`, recorded in
  [`deployment/scripts.json`](../exercises/counter-script/deployment/scripts.json).
- **Ran the on-chain test suite against the testnet deployment** — the same file as
  devnet, switched with `CKB_NETWORK=testnet`. Create at 0, increment to 1 and 2, have
  the chain refuse 2 → 4 and 2 → 1, then increment to 3. I also tightened the two
  refusal tests: they used to pass on *any* error; now they require the node's verdict
  to carry my Script's own exit code, `12` (`MustIncrementByOne`).
- **Installed Rust with the RISC-V target and wrote the smallest CKB Script I could** —
  [`exercises/rust-smoke`](../exercises/rust-smoke/): `no_std`, no `ckb-std`, one
  entry point that makes the `exit` syscall (93). 952 bytes, and the native
  `ckb-debugger` runs it to `Run result: 0` in 595 cycles. Week 4 does not start cold.
- **Re-checked my four OffCKB tooling findings** against today's registry before
  filing them. Nothing they depend on has changed — the bare `offckb` npm name is still
  a third-party placeholder, and `@offckb/cli` 0.4.13 and `ckb-testtool` 1.0.5 are the
  versions they were reproduced on — so they are written up as three issues for
  `ckb-devrel/offckb` ([findings](../notes/findings/offckb-install-observations.md)).

## Commands and output

```console
$ npm run testnet:transfer -- ckt1qzda0c…psx36d8v 1000
balance : 9999 CKB (before)
tx hash : 0xb7855e7e43c2c716afef2bbf8e568c239927ac04794bf8e8b7b44470f29f3eea
status  : committed in block 22653473

$ CKB_RPC_URL=https://testnet.ckb.dev npm run inspect -- 0xb7855e7e…9f3eea
INPUTS (1) — Cells consumed and now dead
  [0] 0x40bcd18d…ca3286 #0  capacity 9,999.99900000 CKB
OUTPUTS (2) — new live Cells
  [0] capacity 1,000.00000000 CKB
  [1] capacity 8,999.99884584 CKB  ← back to an input's lock
CAPACITY ACCOUNTING
  fee       0.00015416 CKB  (15416 shannons)

$ offckb deploy --network testnet --target dist --type-id --privkey-file <key>
contract counter.bc deployed, tx hash: 0xa21da18ff3f142127cf63d6e705d64c14577fb99a9a0cbf74f47fb70b6ad66cf
tx committed.

$ CKB_NETWORK=testnet npx jest tests/counter.devnet.test.ts --verbose
  counter type script on testnet
    √ creates a counter at 0
    √ increments 0 -> 1
    √ increments 1 -> 2
    √ the chain refuses to skip from 2 to 4
    √ the chain refuses to move the counter backwards
    √ increments 2 -> 3 after the rejections, proving the Cell is still usable
  chain rejected 2 -> 4, as it should: ValidationFailure: see error code 12 …
Tests:       6 passed, 6 total

$ ckb-debugger --bin target/riscv64imac-unknown-none-elf/release/rust-smoke
Run result: 0
All cycles: 595
```

## Evidence

| Item | Result | Link |
|---|---|---|
| Testnet CKB from the faucet | 10,000 CKB received | [`0x40bcd18d…ca3286`](https://testnet.explorer.nervos.org/transaction/0x40bcd18d3df14c5e221dfa7ee1f04c47498202663820c6d3bb9444e000ca3286) |
| First testnet transfer | Committed, block 22,653,473 | [`0xb7855e7e…9f3eea`](https://testnet.explorer.nervos.org/transaction/0xb7855e7e43c2c716afef2bbf8e568c239927ac04794bf8e8b7b44470f29f3eea) · [log](../evidence/week-01.5-testnet-transfer.log) |
| Inspector reading public testnet | 3 transactions decoded | [log](../evidence/week-01.5-inspect-tx.log) |
| Counter Script deployed to testnet | Committed | [`0xa21da18f…b6ad66cf`](https://testnet.explorer.nervos.org/transaction/0xa21da18ff3f142127cf63d6e705d64c14577fb99a9a0cbf74f47fb70b6ad66cf) |
| Counter created at 0 | Committed | [`0x58aef31e…ada8a82b`](https://testnet.explorer.nervos.org/transaction/0x58aef31e49477a95ae0749049964a1107da6ce943ca74febfc9fbbf0ada8a82b) |
| Counter 0 → 1 | Committed | [`0x96685b3b…d20c2afc4d`](https://testnet.explorer.nervos.org/transaction/0x96685b3b8dc56747f5ce0a2f9b9bcab68c27c4327d6254f9880064d20c2afc4d) |
| Counter 1 → 2 | Committed | [`0xc5740da8…f5ae631468`](https://testnet.explorer.nervos.org/transaction/0xc5740da838df7db9e538aa58dee1a8856bc770a3b516d55f56cbb9f5ae631468) |
| Counter 2 → 4 and 2 → 1 | Refused by the chain, error code 12 | [log](../evidence/week-01.5-counter-testnet-tests.log) |
| Counter 2 → 3 | Committed | [`0x64f695a2…a72b77ac`](https://testnet.explorer.nervos.org/transaction/0x64f695a23416d9a7b2d34bb7025140c90991b82e9f1dea98e103bc13a72b77ac) |
| Rust toolchain, Script runs in CKB-VM | `Run result: 0`, 595 cycles | [log](../evidence/week-01.5-rust-toolchain.log) |
| OffCKB findings re-checked | All still stand | [log](../evidence/week-01.5-findings-recheck.log) |

## What went wrong, and how I fixed it

**My inspector was only correct on devnet.** Run against public testnet, it printed
a fee of `-569.-15772065 CKB` for a cellbase — a block-reward transaction whose only
input is the null outpoint, so there is nothing to subtract from. And it found "the
change output" as *the output over a million CKB*, which only ever worked because
devnet's genesis Cells are enormous. The fix was to stop guessing from amounts: a
cellbase is detected by its null outpoint, and change is now identified by lock — an
output under the same lock script as one of the inputs. That is what change actually
*is* in the Cell Model, and it holds on any network.

**The testnet suite failed five of six on one run, and none of it was the Script.**
CCC's `waitTransaction` gives up after 60 seconds. On devnet, blocks come on demand;
on testnet one slow block took longer than that, so the 0 → 1 step timed out and every
later step built on a stale Cell — which produced a cascade of misleading errors,
including a real `error code 12` from my Script for an increment that *looked* valid.
The fix was a commit timeout sized to testnet, and the lesson is that on a public chain,
the first failure is the only one worth reading.

**The refusal tests were weaker than they looked.** `rejects.toThrow()` would also
pass if the transaction were rejected for low capacity or a bad signature. They now
assert that the node's message names my Script's exit code — so a pass means the
chain refused *because of my rule*.

**The scripts never exited.** The public-RPC client keeps a connection open, so each
script printed its result and then hung. They now exit explicitly once `main` resolves.

## What I learned

The idea that reframed everything else for me is that CKB does not compute state —
it verifies it. On a chain like Ethereum you submit a request and the network works out
the result. On CKB you work out the result yourself, write down precisely which cells
are destroyed and which are created, and the network's only job is to run the attached
scripts and decide whether you were allowed to.

This week made that concrete. The two refused counter transactions were well formed and
properly signed; the only thing wrong with them was that they broke my rule, and the
node's answer was my Script's own exit code. And the change output is not a field
anywhere — it is just a new Cell that happens to carry the sender's lock, which is
exactly how the inspector now finds it.

## Next week

The four findings go to `ckb-devrel/offckb` as three issues. Then the two questions I
left open in the orientation document, answered by hand: how a `ckt1…` address is
derived from a lock script, and what is inside the 85 bytes of a `WitnessArgs` — the
same 85-byte witness my testnet transfer carries. Plan:
[`plans/week-02.md`](../plans/week-02.md).
