# CKBuilder Weekly Report — Week 1

**Participant:** Luong Thanh Tung
**GitHub:** [@luongthanhtung03](https://github.com/luongthanhtung03)
**Reporting period:** 26 August 2026 (first day)
**Publication date:** 26 August 2026
**Status:** application submitted, awaiting confirmation of my place in the cohort

## Goal

Get a real CKB development environment running, make one real transaction, and
verify the Cell Model against that transaction rather than taking it on trust
from the documentation. Also set up this dev log properly so that every later
week has somewhere to go.

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
- Found and wrote up **three npm/tooling issues on the beginner path**, one of which I
  think is worth the project's attention
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
| Tooling findings | 3 issues, write-up ready to send | [`notes/findings/`](../notes/findings/offckb-install-observations.md) |
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

I would rather record what I still cannot do than overstate this. I have not
written a Script, I have not touched testnet, I do not yet know how a `ckt1…`
address is derived from a lock script, and I cannot decode those 85 witness bytes
by hand. Those are on the plan.

## Next step

Repeat **Transfer CKB** and complete **Store Data on Cell** on the public
testnet, using the faucet, so the week 2 report carries public explorer links
rather than devnet-only hashes. Then extend the inspector to decode
`outputs_data`, and send the OffCKB findings to CKB DevRel.

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
