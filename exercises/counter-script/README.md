# Counter — a CKB Type Script in TypeScript

My first CKB Script. Written, built, tested, and deployed to a local devnet on
27 August 2026.

## The rule

> A counter Cell holds a little-endian u64. It may only be created with the value
> 0, and it may only be updated by incrementing it by exactly one.

I picked a rule I could state in one sentence on purpose, because the interesting
part is not the arithmetic — it is that a Type Script never *computes* the next
value. It is handed a finished transaction that somebody else assembled
off-chain, and its only job is to answer yes or no.

So the script counts how many counter Cells appear on each side of the
transaction and decides which transition is being attempted:

| inputs | outputs | meaning | accepted if |
|---:|---:|---|---|
| 0 | 1 | creation | the new value is 0 |
| 1 | 1 | increment | output is exactly input + 1 |
| anything else | | — | rejected |

The last row is deliberate. Merging two counters, splitting one in two, or
destroying one with no replacement are all refused, because none of them has an
obvious correct answer and a Type Script should not guess.

`SOURCE_GROUP_INPUT` and `SOURCE_GROUP_OUTPUT` are what make this readable — they
iterate only the Cells in the transaction carrying *this same Type Script*, so
the script never filters other people's Cells out by hand.

## Files

| | |
|---|---|
| [`contracts/counter/src/index.ts`](contracts/counter/src/index.ts) | the Script |
| [`tests/counter.mock.test.ts`](tests/counter.mock.test.ts) | 17 tests in CKB-VM via ckb-testtool, no node needed |
| [`tests/counter.devnet.test.ts`](tests/counter.devnet.test.ts) | 6 tests against a real node |
| [`tests/jest.setup.cjs`](tests/jest.setup.cjs) | Windows workaround so tests can find `ckb-debugger` |

## Run it

```bash
npm install
npm run build
npx jest tests/counter.mock.test.ts   # no node required
```

For the on-chain suite:

```bash
offckb node                            # separate terminal
npm run deploy                         # or: offckb deploy --network devnet --target dist -o deployment --type-id --yes
npm test                               # builds, then runs both suites
```

## Results

23 tests, all passing. Full output:
[`evidence/week-01-counter-script-tests.log`](../../evidence/week-01-counter-script-tests.log).

**17 mock tests.** Only three of them assert success. The rest assert failure
*and* the specific error code, so a test cannot pass because the script happened
to fail for an unrelated reason:

```
creation      accepts 0; rejects 1; rejects 9999
increment     accepts 0->1, 41->42; rejects 41->41, 41->43, 41->40, and a huge jump
overflow      rejects incrementing a counter already at u64 max
bad data      rejects 4 bytes, 0 bytes, 16 bytes
bad shape     rejects destroy, merge 2->1, split 1->2, create two at once
```

**6 devnet tests**, deployed as tx
`0x3048711a51b92edec5fcfaa319edcbd19ac29fb3e2d7125d60e69f698af667ff`:

| step | result |
|---|---|
| create counter at 0 | `0x788e5151cbb2a62b7cc981208de5c0501ea37611a5977c24de7e1a8f88498dad` |
| increment 0 → 1 | `0xe62adbedfdfaea9084b7c9bb6fd96ea4e4b1465c81a6b510b59ad5c91e961234` |
| increment 1 → 2 | `0xbf85d0d229fe7ac253910f3bf15793137a2188245da0966a77f6d066ebd0fcaf` |
| **skip 2 → 4** | **rejected by the node** |
| **reverse 2 → 1** | **rejected by the node** |
| increment 2 → 3 | `0x4c0533af6083d527c02d16bb594734b9f5accf55453569a77ba8ba03faa30eff` |

Those two rejections are the point of the whole exercise. Both transactions were
well formed and correctly signed; the only thing wrong with them was that they
broke my rule, and the chain refused them. The final test then increments the
same Cell successfully, which proves the rejections did not damage anything.

## What I learned doing this

- **A Type Script is a predicate, not a function.** I kept starting to write "now
  set the counter to n+1" and having to stop. The transaction already contains
  the answer; the script only grades it.
- **Cell data has no schema.** Nothing stops someone creating a Cell with this
  Type Script and four bytes of data in it, so the length check is not defensive
  padding — without it every comparison downstream is meaningless. Three of my
  tests exist only because of this.
- **Rejecting is most of the job.** The happy path took ten minutes. Deciding
  what to do about merges, splits and destruction took much longer, and being
  strict was the right answer: an unclear case that a script silently permits is
  a hole.
- **Overflow needs saying out loud.** `u64::MAX + 1` wraps to 0, which would let
  someone reset a counter by overflowing it. One line, but I only thought of it
  because I was writing failure tests rather than success tests.
- **`bigint` throughout.** Same lesson as the transfer exercise. A u64 does not
  fit in a JS `number`, and this time the compiler could not catch it for me.

## Windows note

`npm test` fails out of the box on Windows: ckb-testtool reports
`ckb-debugger not found` even though offckb installed it successfully. The
executable lands in offckb's data directory, and the `.cmd` shim that goes on
`PATH` cannot be resolved by a shell-less `child_process` spawn.
[`tests/jest.setup.cjs`](tests/jest.setup.cjs) fixes it as a jest `globalSetup`.
Written up properly in
[`notes/findings/`](../../notes/findings/offckb-install-observations.md#4-windows-ckb-testtool-cannot-find-the-ckb-debugger-that-offckb-installed).

Note that `setupFiles` does not work for this — it runs inside jest's per-file
sandbox and the `PATH` change never reaches the spawn. `globalSetup` runs in the
parent before the workers fork.
