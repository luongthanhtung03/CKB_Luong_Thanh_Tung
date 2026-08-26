# Notes — the Cell Model

My own notes, written to check whether I actually understand this. Anything I am
unsure about is marked with a question mark so I can come back to it.

## The thing I had to unlearn

I came in expecting accounts with balances. CKB does not work that way. There is
no row somewhere saying "Tung has 5000 CKB". Instead there is a set of **Cells**,
each one owned by a lock, and my balance is just the sum of the capacity of the
Cells I am able to unlock.

A transaction therefore does not *change* a balance. It **consumes** some input
Cells and **creates** some output Cells. The consumed Cells are gone — they
become dead — and the new ones are live. This is the UTXO idea, generalised.

## Capacity

Capacity is the part that surprised me most. A Cell's capacity is measured in
CKBytes, and it is simultaneously:

- the amount of value the Cell holds, and
- the maximum number of bytes the Cell is allowed to occupy.

So storing data on chain is not paid for with a one-off fee. You must lock up
capacity for as long as the data exists, and you get it back when the Cell is
consumed. Holding CKB *is* holding the right to use state space.

There is a minimum size for any Cell, because the Cell's own fields (capacity,
lock, type, data) take up space themselves. I have seen 61 CKBytes quoted as the
floor for the simplest possible Cell. (? — check this against the docs when I do
the Store Data on Cell tutorial.)

## Lock Script vs Type Script

Every Cell has a Lock Script. It answers one question: **may this Cell be
consumed?** The usual answer is "only if the transaction carries a valid
signature for this address".

A Cell may also have a Type Script. It answers a different question: **is this
transaction allowed to exist, given the rules of this asset?** A token's Type
Script is what stops me from minting tokens out of nothing.

So the split is: Lock is authorisation, Type is application rules. In Ethereum
both of these live inside one contract, so this separation is the piece I most
want to see working in practice.

## Validation, not computation

The part I need to sit with: a CKB script does not produce state. Transactions
are assembled **off-chain** by the client, and the script's only job on chain is
to look at the finished transaction and return success or failure.

The mental model for writing a script is therefore not "what should happen next"
but "what must be true for me to accept this". (? — I think this is also why
cycle limits matter: the chain is paying to verify, not to compute.)

## Questions to answer by running code

Answered on 26 Aug 2026 by making a real transfer on the devnet and reading it
back — see [transaction-anatomy.md](transaction-anatomy.md).

- ~~What is a `cell_dep`, and why must a transaction declare the scripts it uses
  as dependencies?~~ **Answered.** Script code lives in Cells too. A transaction
  points at the Cell holding the code that verifies it, because there is no
  implicit contract registry on chain. My transfer had one, a `dep_group` for the
  default secp256k1 lock.
- ~~What exactly is in a transaction's `witnesses` field?~~ **Partly answered.**
  It is where the signature goes, and it sits outside the signed structure
  because a signature cannot be part of what it signs. Mine was 85 bytes, not the
  65 I expected, because it is a Molecule-serialized `WitnessArgs` wrapper. I
  still cannot decode those bytes by hand — that is the remaining half.
- The 61 CKByte minimum Cell size: still not verified. Do it during Store Data
  on Cell.
- What does a Type Script actually get to see — the input Cells as well as the
  outputs? My transfer had no Type Script at all (`type: null`), so this is still
  open.
- How is a CKB address derived from a Lock Script? Still open. I can see that
  `lock.args` matches the `lock_arg` from `offckb accounts`, but not how the
  `ckt1…` string is built from args plus code hash plus hash type.

## Things I got wrong

I assumed a transaction states the amount being sent. It does not — inputs are
pointers to Cells, outputs are new Cells, and the amount is something you infer
from the difference. That also explains why there is no fee field: the fee is
just inputs minus outputs.
