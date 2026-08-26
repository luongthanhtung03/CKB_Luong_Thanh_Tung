# CKBuilder Weekly Report — Week 1

**Participant:** Luong Thanh Tung
**GitHub:** [@luongthanhtung03](https://github.com/luongthanhtung03)
**Reporting period:** 26–27 August 2026
**Publication date:** 27 August 2026
**Status:** application submitted, awaiting confirmation of my place in the cohort

## Goal

Get a real CKB development environment running, make one real transaction, and
verify the Cell Model against that transaction rather than taking it on trust
from the documentation. Also set up this dev log properly so that every later
week has somewhere to go.

Having done that on day one faster than I expected, I carried on into the part of
my own plan I had pencilled in for weeks 5 and 6, and wrote a Type Script.

## What I did

- Read the CKBuilder Handbook in full, including the reporting standards.
- Set this repository up as my dev log, with a report template, a plan, and a
  `.gitignore` that excludes `.env`, private keys and keystores.
- Wrote an eight-week study and build plan ([PLAN.md](../PLAN.md)).
- Installed `@offckb/cli` 0.4.13 and started a local CKB devnet (CKB 0.208.0).
- **Transferred 1000 CKB** from devnet account 0 to account 1 and confirmed the
  transaction committed on chain.
- **Wrote a TypeScript tool** using CCC that reads a transaction back off the
  node and prints its full anatomy — inputs resolved to their capacities,
  outputs, the implicit fee, cell deps, witnesses.
- Used that output to write a field-by-field
  [annotated transaction](../notes/transaction-anatomy.md).
- **Wrote, built, tested and deployed a Type Script** — a counter that may only
  be created at zero and only incremented by one — with 23 tests, including two
  transactions the chain correctly refused
  ([exercises/counter-script](../exercises/counter-script/)).
- Added **CI** so the claims in this log are checked on a clean machine rather
  than only on mine ([.github/workflows/ci.yml](../.github/workflows/ci.yml)).
- Found and wrote up **four tooling issues on the beginner path**, one of which
  blocks every contract test on Windows
  ([findings](../notes/findings/offckb-install-observations.md)).

## Commands and results

```console
$ npm install -g @offckb/cli
added 133 packages in 19s

$ offckb --version
0.4.13

$ offckb node
CKB 0.208.0 installed successfully.
Launching CKB devnet Node...
CKB devnet is ready at http://127.0.0.1:8114.

$ curl -s -H 'Content-Type: application/json' \
    -d '{"id":1,"jsonrpc":"2.0","method":"get_tip_block_number","params":[]}' \
    http://127.0.0.1:8114
{"jsonrpc":"2.0","result":"0x2","id":1}

$ offckb balance ckt1...cytcyd8          # account 0, before
CKB: 42000000

$ offckb transfer ckt1...48ucew 1000 --privkey <REDACTED_DEVNET_KEY>
Successfully transfer, txHash: 0x1888f04bcdafc6e7f99be773abfcc68f816e92a3367016280aa1cd0268e4fdbc

$ offckb balance ckt1...cytcyd8          # account 0, after
CKB: 41998999.99999536

$ offckb balance ckt1...48ucew           # account 1, after
CKB: 42001000
```

Then my own tool, against that transaction:

```console
$ cd exercises/transfer-ckb && npm run typecheck    # tsc --noEmit, exit 0
$ npm run inspect

status    : committed
block     : 16

INPUTS (1) — Cells consumed and now dead
  [0] 0x1bb87da3…5b1bf7 #22  capacity 42,000,000.00000000 CKB

OUTPUTS (2) — new live Cells
  [0] capacity 1,000.00000000 CKB
       lock.args  0x758d311c8483e0602dfad7b69d9053e3f917457d
       type       null
       data       0 bytes
  [1] capacity 41,998,999.99999536 CKB
       lock.args  0x8e42b1999f265a0078503c4acec4d5e134534297
       type       null
       data       0 bytes

CAPACITY ACCOUNTING
  in        42,000,000.00000000 CKB
  out       41,999,999.99999536 CKB
  fee       0.00000464 CKB  (464 shannons)

OTHER FIELDS
  cellDeps  1 — depGroup 0x4d804f14…e76293 #0
  witnesses 1 — 85 bytes
```

## The counter Type Script

This is the part I am most pleased with, and it was not in my week 1 plan.

Having seen from the annotated transaction that a Script *validates* rather than
computes, I wanted to write one, because I did not fully believe I understood the
distinction until I had. So I scaffolded a TypeScript contract project with
`offckb create --language typescript` and wrote a Type Script enforcing one rule
I could state in a sentence:

> A counter Cell holds a little-endian u64. It may only be created with the value
> 0, and it may only be updated by incrementing it by exactly one.

The script counts the counter Cells on each side of the transaction —
`SOURCE_GROUP_INPUT` and `SOURCE_GROUP_OUTPUT` conveniently see only Cells
carrying this same Type Script — and allows exactly two shapes: `0 in, 1 out` is
a creation and must start at zero, `1 in, 1 out` is an increment and must be
exactly plus one. Everything else is refused, including merges, splits and
destruction, because none of those has an obvious right answer.

**23 tests pass.** Only 5 of them assert success; the other 18 assert failure and
the specific error code, so a test cannot pass because the script failed for some
unrelated reason.

```console
$ npm test

PASS tests/counter.mock.test.ts
  creation      accepts 0; rejects 1; rejects 9999
  increment     accepts 0->1, 41->42; rejects 41->41, 41->43, 41->40, huge jump
  overflow      rejects incrementing a counter already at u64 max
  bad data      rejects 4 bytes, 0 bytes, 16 bytes
  bad shape     rejects destroy, merge 2->1, split 1->2, create two at once

PASS tests/counter.devnet.test.ts
  √ creates a counter at 0
  √ increments 0 -> 1
  √ increments 1 -> 2
  √ the chain refuses to skip from 2 to 4
  √ the chain refuses to move the counter backwards
  √ increments 2 -> 3 after the rejections, proving the Cell is still usable

Test Suites: 2 passed, 2 total
Tests:       23 passed, 23 total
```

Deployed to devnet with type-id as tx `0x3048711a…`, and the on-chain lifecycle:

| step | tx |
|---|---|
| create counter at 0 | `0x788e5151cbb2a62b7cc981208de5c0501ea37611a5977c24de7e1a8f88498dad` |
| increment 0 → 1 | `0xe62adbedfdfaea9084b7c9bb6fd96ea4e4b1465c81a6b510b59ad5c91e961234` |
| increment 1 → 2 | `0xbf85d0d229fe7ac253910f3bf15793137a2188245da0966a77f6d066ebd0fcaf` |
| **skip 2 → 4** | **refused by the node** |
| **reverse 2 → 1** | **refused by the node** |
| increment 2 → 3 | `0x4c0533af6083d527c02d16bb594734b9f5accf55453569a77ba8ba03faa30eff` |

Those two refusals are the whole point. Both transactions were well formed and
correctly signed. The only thing wrong with them was that they broke my rule, and
the chain would not have them. Then the last test increments the same Cell
successfully, which shows the refusals did not damage anything.

Full write-up and run instructions:
[`exercises/counter-script/README.md`](../exercises/counter-script/README.md).

## Evidence

| Item | Result | Evidence |
|---|---|---|
| `@offckb/cli` installed, devnet running | CKB 0.208.0, tip advancing | [`evidence/week-01-devnet-session.log`](../evidence/week-01-devnet-session.log) |
| Transfer CKB tutorial (devnet) | Committed, block 16 | tx `0x1888f04bcdafc6e7f99be773abfcc68f816e92a3367016280aa1cd0268e4fdbc` |
| Raw transaction from the node | Retrieved | [`evidence/tx-transfer-1000ckb.json`](../evidence/tx-transfer-1000ckb.json) |
| TypeScript tx inspector (CCC) | `tsc --noEmit` clean, runs | [`exercises/transfer-ckb/`](../exercises/transfer-ckb/) |
| Inspector output | Captured | [`evidence/week-01-inspect-tx.log`](../evidence/week-01-inspect-tx.log) |
| Annotated transaction | Written | [`notes/transaction-anatomy.md`](../notes/transaction-anatomy.md) |
| Cell Model notes | Written | [`notes/cell-model.md`](../notes/cell-model.md) |
| Counter Type Script | Written, built, deployed | [`exercises/counter-script/`](../exercises/counter-script/) |
| Counter tests | 23 passed (17 mock + 6 on-chain) | [`evidence/week-01-counter-script-tests.log`](../evidence/week-01-counter-script-tests.log) |
| Script deployment (devnet, type-id) | Committed | tx `0x3048711a51b92edec5fcfaa319edcbd19ac29fb3e2d7125d60e69f698af667ff` |
| Invalid transitions refused on chain | 2 of 2 refused | see the counter table above |
| CI | Typecheck + contract build and tests | [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) |
| Tooling findings | 4 issues, write-up ready to send | [`notes/findings/`](../notes/findings/offckb-install-observations.md) |
| Eight-week plan | Written | [`PLAN.md`](../PLAN.md) |

### Screenshots

| | What it shows |
|---|---|
| [`01-devnet-status.png`](../screenshots/week-01/01-devnet-status.png) | `offckb status` — CKB Node Monitor 0.208.0, devnet at block 234, 100% synced, epoch 0, difficulty 256H |
| [`02-balances.png`](../screenshots/week-01/02-balances.png) | account 0 at `41998999.99999536` and account 1 at `42001000` after the transfer — sender down 1000 CKB plus 464 shannons of fee, recipient up exactly 1000 |
| [`03-inspect-tx.png`](../screenshots/week-01/03-inspect-tx.png) | my inspector against the real transaction: one input Cell destroyed, two output Cells created, the implicit fee, cell deps and witnesses |
| [`04-typecheck.png`](../screenshots/week-01/04-typecheck.png) | `npm run typecheck` — `tsc --noEmit`, exit 0 under strict |

Transaction hashes are on a local devnet, so they are not on a public explorer.
Repeating both tutorials on testnet, with public explorer links, is my week 2
task.

## Problems and how I fixed them

**1. The `offckb` name on npm is not the OffCKB tool.**

Before installing anything globally I checked the package, out of habit. The
documented command is `npm install -g @offckb/cli`, but the CLI binary is called
`offckb`, so the obvious guess is `npm install -g offckb`. That name is taken —
by something else:

```console
$ npm view offckb description homepage
description = 'Placeholder package for offckb - reserved name'
homepage = 'https://github.com/yourusername/offckb-placeholder#readme'
```

It is inert today, and I am not suggesting anything malicious is happening — it
looks like ordinary name reservation. But it is a guessable name for a globally
installed developer tool sitting directly on the newcomer path, and whoever holds
it can publish to it later. I have written this up with a suggested fix and I
would like to send it to CKB DevRel.

**2. Windows: the CPU-feature fallback reports itself like a crash.**

`offckb node` opens with `The system cannot find the path specified.` and then
prints a raw `MODULE_NOT_FOUND` require-stack next to `Failed to detect CPU
features`. Everything then works correctly — the portable binary is downloaded,
the node starts and mines. So it is cosmetic, but on the most common beginner
platform the first thing you see looks like two errors. Suggested fix is in the
findings note.

**3. `ClientJsonRpc` is abstract in CCC.**

My first version of the inspector did `new ClientJsonRpc(url)` and `tsc` rejected
it with `TS2511: Cannot create an instance of an abstract class`. The concrete
client is `ClientPublicTestnet`, which takes a `{ url }` config — and it is the
right one for a devnet, because devnet uses testnet-style `ckt` addresses. Worth
knowing before week 3, when I will be in CCC properly.

**4. I walked straight into the same trap I had just written up.**

While taking the screenshots for this report I ran `npx tsc --noEmit` from the
repository root instead of from `exercises/transfer-ckb/`. There is no local
TypeScript at the root, so `npx` went to the registry, found a package named
`tsc`, and installed it:

```console
$ npx tsc --noEmit
Need to install the following packages:
tsc@2.0.4
Ok to proceed? (y) y

                This is not the tsc command you are looking for

- Use npm install typescript to first add TypeScript to your project before using npx
- Use yarn to avoid accidentally running code from un-installed packages
```

This is embarrassing, given that finding #1 above is *exactly this hazard* and I
had written it up an hour earlier. But it turned out to be the most useful thing
that happened today, because of what the owner of `tsc` has done with the name.
They hold it deliberately and it does nothing except redirect you to
`typescript`. The guessable name is owned by the community and turned into a
signpost.

That is precisely the fix I was groping towards for `offckb`, and now I can point
at a working precedent for it instead of just asserting it. The full argument is
in the [findings note](../notes/findings/offckb-install-observations.md).

The fix on my side was to stop using `npx tsc` and use the `typecheck` script in
`package.json`, which resolves the local compiler and cannot wander off to the
registry.

**5. Losing precision on capacity.**

My first pass converted capacities to `number` to format them, and the change
output came out as a clean `41,999,000` instead of `41,998,999.99999536` — which
made the fee look like zero and briefly convinced me CKB had no transaction fee.
Capacities are shannons and need `bigint` arithmetic all the way through. This
was my own bug and it is the one that taught me the most today.

**6. Every contract test failed on Windows, and the error message was misleading.**

The first run of the counter tests failed 17 out of 17 with:

```console
ckb-debugger not found. Please install it first:
https://github.com/nervosnetwork/ckb-standalone-debugger
```

Which is not true — `offckb create` had installed it, and reported success. The
executable goes into offckb's own data directory, and what goes onto `PATH` is a
`ckb-debugger.cmd` shim. `ckb-testtool` spawns `ckb-debugger` without a shell,
and Windows will not resolve a bare name to a `.cmd` that way. So on Windows the
shim is invisible to the one tool that needs it.

I fixed it as a jest `globalSetup` that puts the real executable's directory on
`PATH`, so `npm test` now works with no manual steps
([`tests/jest.setup.cjs`](../exercises/counter-script/tests/jest.setup.cjs)).

The detour worth recording: I first wrote it as `setupFiles` and it changed
nothing. `setupFiles` runs inside jest's per-file sandbox, so the `PATH` change
never reaches the `spawnSync`. `globalSetup` runs in the parent process before
the workers fork, so they inherit it. I would not have guessed that, and it is
the sort of thing that would have stopped me for an evening if I had not been
reading the failure carefully.

This is finding #4, and it is the one I would fix first if I were on the tooling
team — not because it is the most interesting, but because it silently blocks
every beginner on Windows who reaches the contract-testing stage, and it tells
them to go and install something they already have.

## What I learned

The thing I actually wanted to settle was whether "Cells, not accounts" is a real
mechanism or just vocabulary. It is real, and the transaction proves it:

- My 42,000,000 CKB Cell **no longer exists**. To send 1000 CKB, the entire input
  Cell was destroyed and two new Cells were created — one for the recipient, one
  of change back to me. The change Cell is not my old Cell with a smaller number
  in it; it is a different Cell that happens to be locked to the same args.
- An input is a **pointer**, not an amount. It carries a `previous_output` (tx
  hash + index) and nothing else. My tool had to go and resolve the previous
  output to learn what the input was worth. The transaction genuinely does not
  state how much is being sent — you infer it.
- **There is no fee field.** The fee is whatever the inputs exceed the outputs
  by; here, 464 shannons. Once inputs are pointers rather than amounts, an
  explicit fee field would be redundant, but I did not expect this.
- `cell_deps` was the field I understood least from reading and most from seeing.
  A transaction has to declare the on-chain Cells holding the Script code that
  verifies it. Scripts live in Cells too. There is no implicit contract registry.
- The witness sits deliberately outside the signed structure, because a signature
  cannot be part of what it signs. 85 bytes rather than a bare 65-byte signature,
  because it is a Molecule-serialized wrapper — which is my first concrete reason
  to care about Molecule later on.

Then, from writing the Script:

- **A Type Script is a predicate, not a function.** I kept starting to write "now
  set the counter to n+1" and having to delete it. The transaction already
  contains the proposed next value; the script only grades it. Reading this in the
  docs did not teach me it — writing the same wrong line four times did.
- **Cell data has no schema.** Nothing prevents someone creating a Cell with my
  Type Script and four bytes of data in it. So the length check is not defensive
  padding; without it every comparison after it is meaningless. Three of my tests
  exist only because of this.
- **Rejecting is most of the job.** The happy path took ten minutes. Deciding what
  to do about merges, splits and destruction took much longer. I chose to refuse
  all of them, because an unclear case a script silently permits is a hole.
- **Overflow has to be said out loud.** `u64::MAX + 1` wraps to zero, which would
  let someone reset a counter by overflowing it. One line of code, but I only
  thought of it because I was writing failure tests instead of success tests.

I would rather record what I still cannot do than overstate this. I have not
touched testnet at all, so none of my transaction hashes are publicly verifiable.
I do not know how a `ckt1…` address is derived from a lock script. I cannot decode
those 85 witness bytes by hand. My Script is a toy — it has no access control, so
anyone who can unlock the Cell can increment it, and I have not thought about what
happens if two people try at once. And I have written no dApp front end at all.

## Next step

Repeat **Transfer CKB** and complete **Store Data on Cell** on the public
testnet, using the faucet, so the next report carries public explorer links
rather than devnet-only hashes. Then send the four tooling findings to CKB DevRel,
and add access control to the counter Script so only a designated owner can
increment it — which means finally understanding lock args properly.

## Note to the programme director

I submitted my application and have not had a confirmation yet, but I understood
from a fellow cohort member that I could start on the first steps of the guidance
in the meantime, so I have made a start and I am publishing this on the day I did
the work, as the reporting standards ask.

I would be grateful for confirmation of my place in the cohort when you have a
moment, so I know my reports are being counted from this week. In the meantime I
will keep publishing every Tuesday regardless.

I would also welcome a pointer on the OffCKB npm name issue in
[`notes/findings/offckb-install-observations.md`](../notes/findings/offckb-install-observations.md)
— whether that is worth raising with CKB DevRel directly or opening as an issue
on `ckb-devrel/offckb`.
