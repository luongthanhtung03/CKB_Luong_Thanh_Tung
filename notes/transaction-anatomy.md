# An annotated CKB transaction

This is the first transaction I made myself, dissected field by field. I made it
on the local OffCKB devnet on 26 Aug 2026: 1000 CKB from devnet account 0 to
devnet account 1.

- **tx hash:** `0x1888f04bcdafc6e7f99be773abfcc68f816e92a3367016280aa1cd0268e4fdbc`
- **status:** committed, block 16
- **raw JSON:** [`evidence/tx-transfer-1000ckb.json`](../evidence/tx-transfer-1000ckb.json)
- **tool I wrote to read it:** [`exercises/transfer-ckb/src/inspect-tx.ts`](../exercises/transfer-ckb/src/inspect-tx.ts)

I did this because reading about the Cell Model was not convincing me. I wanted
to see whether a transfer really destroys and recreates Cells, or whether that is
just a way of describing something that is secretly a balance update.

## What the transaction contains

```
INPUTS (1) — Cells consumed and now dead
  [0] 0x1bb87da3…5b1bf7 #22  capacity 42,000,000.00000000 CKB

OUTPUTS (2) — new live Cells
  [0] capacity 1,000.00000000 CKB
       lock.args  0x758d311c8483e0602dfad7b69d9053e3f917457d   <- account 1 (recipient)
       type       null
       data       0 bytes
  [1] capacity 41,998,999.99999536 CKB
       lock.args  0x8e42b1999f265a0078503c4acec4d5e134534297   <- account 0 (me, change)
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

## Field by field

### `inputs`

One entry, and it is not an amount — it is a **pointer**: a `previous_output`
made of a transaction hash and an index. It says "the Cell that transaction
`0x1bb87da3…` created at index 22". That Cell held the whole 42,000,000 CKB the
genesis block gave account 0.

Consuming it kills it. After this transaction that Cell is dead and can never be
referenced as an input again — that is what stops double spending.

The input carries **no capacity field of its own.** To find out how much it was
worth, my script had to go and resolve the previous output. The transaction only
knows where the money came from, not how much it was; the node checks that.

### `outputs`

Two new Cells, and this is the part that settled the question for me. I sent
1000 CKB, but there is no "41,999,000 remaining" anywhere. Instead:

- output[0] — a brand new 1000 CKB Cell, locked to account 1's args
- output[1] — a brand new 41,998,999.99999536 CKB Cell, locked back to my own args

My original Cell is gone. The "change" output is not my old Cell with a smaller
number in it; it is a different Cell that happens to be locked to the same
person. Nothing was edited in place. So the model is real, not a metaphor.

Both `lock.args` values match the `lock_arg` fields that `offckb accounts`
printed for accounts 1 and 0 respectively, which is how I confirmed which output
is which.

### `capacity`

The two outputs sum to 464 shannons less than the input. That difference is the
fee — it is not a field anywhere in the transaction. **The fee is implicit**: it
is whatever the inputs exceed the outputs by, and the miner collects it. I had
expected an explicit `fee` field and there isn't one.

464 shannons is 0.00000464 CKB, which is essentially nothing, but the mechanism
is what matters.

### `outputs_data`

`["0x", "0x"]` — both empty, 0 bytes. A plain transfer stores no data. This is
the field the Store Data on Cell tutorial will fill, and it is bounded by the
Cell's capacity, which is the storage-equals-money idea made concrete.

### `type`

`null` on both outputs. Plain CKB needs no application rules, so there is no
Type Script. A token transfer would have one here, and that Script would be what
enforces "you cannot create tokens out of nothing".

### `cell_deps`

One entry, `dep_type: dep_group`. This is the transaction pointing at *the
Script code it needs the node to run* — the default secp256k1 lock. CKB does not
keep an implicit registry of contracts; a transaction has to declare the on-chain
Cells holding the code that verifies it. The `dep_group` type means it is a
bundle of several out-points rather than one.

This answers one of my open questions from `cell-model.md`. Scripts live in Cells
too, and using one means depending on the Cell that holds it.

### `witnesses`

One entry, 85 bytes. The signature. It is deliberately *outside* the signed
transaction structure, because the signature cannot be part of what it signs.
The Lock Script reads this field to decide whether the input may be consumed.

85 bytes is larger than a bare 65-byte secp256k1 signature, because it is a
Molecule-serialized `WitnessArgs` wrapper with the signature in its `lock`
field — which is my first practical reason to care about Molecule in week 6.

## What I got wrong before doing this

I assumed the transaction would say how much was being sent. It does not. It
lists Cells to destroy and Cells to create, and "the amount sent" is something
you infer from the difference. Once that clicked, the fee having no field of its
own stopped being surprising too.

## Still open

- Why index 22 (`0x16`) specifically? Presumably genesis issues many Cells to
  each account rather than one big one. I should check by listing account 0's
  live Cells before and after.
- What exactly is inside those 85 witness bytes? I want to decode the
  `WitnessArgs` structure by hand rather than trusting the label.
- How is the `ckt1…` address derived from `lock.args` plus the code hash?
