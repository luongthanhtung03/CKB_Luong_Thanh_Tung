# Orientation — what CKB is, and what I am actually doing here

Written for the version of me that started this programme without knowing what any
of it meant. Nothing here assumes prior blockchain knowledge. Every term is defined
before it is used.

If you only read one section, read [The one idea](#the-one-idea-that-makes-everything-else-make-sense).

---

## 1. The ground floor

A **blockchain** is a shared database that nobody owns, copied across thousands of
computers, where anyone can check that everyone else followed the rules. There is
no administrator who can quietly edit a row.

A **node** is one of those computers running the software.

A **transaction** is a request to change what the database holds. Nodes check it
against the rules; if it passes, it becomes permanent.

A **wallet** holds a secret number — a **private key**. Signing a transaction with
that key proves you authorised it. Lose the key, lose the ability to act.

Three different blockchains store three different things:

| | Stores | Rules live in |
|---|---|---|
| **Bitcoin** | Coins, as unspent chunks | A fixed, simple script language |
| **Ethereum** | Accounts with balances, and contracts holding their own data | Contract code, run on-chain |
| **CKB** | **Cells** | Scripts attached to each cell |

CKB stands for **Common Knowledge Base**. It is a layer-1 blockchain — meaning a
base network in its own right, not something built on top of another chain —
made by the Nervos Network.

---

## 2. A Cell

Everything in CKB is a cell. A cell is a box with exactly four things in it:

| Part | What it is |
|---|---|
| **capacity** | How big the box is, measured in bytes |
| **data** | Whatever bytes you choose to put inside |
| **lock script** | A program answering: *may this box be opened?* |
| **type script** | A program answering: *is this box legal?* |

The **CKB token** (also written CKByte) is the network's currency, and here is the
part that surprised me:

> **1 CKB = 1 byte of on-chain storage.**

To store 100 bytes on-chain you must hold 100 CKB and lock them into that cell. You
have not *spent* them — they are parked. Destroy the cell and the 100 CKB come
back, free to use again. **Storage is rented by locking tokens, not bought by
spending them.** A cell cannot hold more bytes than its capacity, and the four
fields above all count toward that capacity, not just `data`.

This is why a cell has a minimum size (61 bytes for the simplest kind): the lock
script and the bookkeeping fields have to fit somewhere.

---

## 3. Transactions destroy and create — they never edit

A CKB transaction says:

> *Destroy these cells. Create these cells.*

That is all it does. There is no "update" operation anywhere in CKB.

- **Inputs** — the cells being destroyed. An input is not a copy of the cell; it is
  a **pointer** to a cell that already exists on-chain (a transaction hash plus an
  index). The network looks it up.
- **Outputs** — the brand-new cells being created.
- Capacity in must be **greater than or equal to** capacity out. The difference is
  the **transaction fee**, paid to whoever mines the block. There is no separate
  "fee" field anywhere in a CKB transaction — the fee is implied by the gap.

Once a cell is used as an input it is gone forever. It is now a **dead cell**. Cells
that still exist and can be spent are **live cells**.

So "increment a counter from 5 to 6" really means: *destroy the cell containing 5,
create a cell containing 6.* The rule that stops you jumping from 5 to 9 lives in
that cell's type script.

**This is exactly what my counter script from Week 1 does.**

---

## 4. Two kinds of script

A **script** is a real, compiled program stored on-chain. Both kinds do the same
mechanical thing: they run, and they return `0` for "allowed" or an error number
for "refused". Every script attached to a transaction must return 0, or the whole
transaction is rejected.

**Lock script — the padlock.** *Who may spend this cell?* Usually it means
"whoever can produce a signature from this key". A lock script runs only when its
cell is being **spent** (used as an input).

Your wallet address *is* a lock script, written out as text. That is the whole
secret of what an address is.

**Type script — the rulebook.** *Is this state change legal?* It runs whenever its
cell appears as an **input or an output**, which is what lets it police
transitions. A token uses one to stop you minting coins out of nothing. My counter
uses one to enforce "+1 exactly".

A type script is optional; a lock script is not.

Both are compiled to **RISC-V**, an open instruction set — the same kind of thing
as x86 or ARM, but free for anyone to implement. They run inside **CKB-VM**, the
virtual machine every node uses to execute scripts. Because it is real RISC-V,
almost any language that compiles to it can be used: Rust, C, and (via a small
interpreter called **ckb-js-vm**) JavaScript and TypeScript.

**Cycles** are the unit of work CKB-VM counts while running a script — CKB's
equivalent of Ethereum's "gas". A transaction has a cycle limit. Fewer cycles means
a cheaper, faster script, which is why cycle counts are worth measuring.

---

## 5. The one idea that makes everything else make sense

On **Ethereum**, you send a transaction and *the chain computes the result*. You do
not know the outcome until the network runs your contract.

On **CKB**, **you compute the result on your own machine, and the chain only checks
your work.**

You build the entire transaction locally — here are the cells to destroy, here are
the exact cells to create — and the network runs the scripts purely to verify you
were allowed to do it. Scripts never *produce* the new state. They only ever say
yes or no about a state you already wrote down.

> **Computation off-chain. Verification on-chain.**

Once this clicks, everything else in the handbook falls into place:

- It explains why every tutorial is really about *building a transaction in
  TypeScript*. That is the actual job.
- It explains why scripts return 0 or an error, rather than returning a value.
- It explains why you need an **indexer** (below) — to find the cells you want to
  spend, since nothing indexes them for you by default.
- It explains why payment channels fit CKB so naturally: if the chain is only a
  verifier, most of the work can happen somewhere else entirely.

---

## 6. Networks — where the work happens

| Network | What it is | Money | Public proof? |
|---|---|---|---|
| **devnet** | A blockchain running on my own laptop, via OffCKB. Instant, resettable | Fake | **No** — it vanishes, nobody else can see it |
| **testnet** | A real, shared, public network. Tokens are free from a faucet and worth nothing | Worthless | **Yes** — public explorer links |
| **mainnet** | The real network | Real | Yes |

A **faucet** is a website that sends you free testnet tokens.
An **explorer** is a website showing any transaction on a public network — this is
where evidence for the dev log comes from.

**Everything in Week 1 was devnet.** That work was real, but nobody outside my
laptop could verify it. Moving to testnet is mostly a configuration change, and it
is the single biggest jump in credibility available to me.

---

## 7. The tools

| Tool | What it does for me |
|---|---|
| **OffCKB** | Runs a devnet on my machine, pre-funded, plus project templates |
| **CCC** (Common Chain Connector) | The TypeScript library I write against: connect wallets, find cells, build and sign transactions. My main tool |
| **ckb-js-vm** | Lets me write on-chain scripts in TypeScript instead of Rust |
| **ckb-testtool** | Runs scripts against a simulated chain so I can test without a node |
| **ckb-debugger** | Runs a script standalone, prints the failure and the cycle count |
| **ckb-cli** | Command-line wallet and node tool, written in Rust |
| **indexer** | A service that answers "which live cells have this lock script?" — without it I cannot find anything to spend |
| **RPC** | The HTTP interface a node exposes. All my code talks to a node this way |
| **faucet / explorer** | Free testnet tokens; public proof of my transactions |

Deprecated, per the handbook — ignore these wherever old tutorials mention them:
**Lumos** and **Capsule**.

---

## 8. The protocols the handbook name-drops

| Name | One line |
|---|---|
| **sUDT** | The simplest token standard. CKB's equivalent of Ethereum's ERC-20 |
| **xUDT** | Extensible version of sUDT — lets me attach custom rules for minting and governance |
| **Spore / DOB** | Digital objects (NFT-like), with the content stored fully on-chain, not on some server |
| **Nervos DAO** | Lock CKB, earn a share of new issuance. Similar to staking |
| **Molecule** | The binary serialization format everything on CKB is encoded in. "Serialization" = turning structured data into a flat run of bytes |
| **Fiber Network** | **My capstone.** Lightning-style payment channels on CKB |
| **Perun** | The other payment-channel system on CKB |
| **SSRI** | Lets a script describe its own behaviour, so apps can ask the script what it can do |
| **RGB++** | Issues assets on Bitcoin, using CKB to run the logic Bitcoin cannot |
| **iCKB** | Makes locked Nervos DAO deposits tradeable again |

### What a payment channel is, since it is my capstone

Putting every small payment on a blockchain is slow and wasteful. A **payment
channel** fixes this:

1. Two parties lock funds on-chain **once**. That is one transaction.
2. They then exchange **signed promises** directly with each other — thousands of
   them if they like. Instant, near-free, never touching the chain.
3. When done, they settle the final balance on-chain. That is the second, and last,
   transaction.

If either side cheats or disappears, the other can take the latest signed promise
to the chain and claim what they are owed. Safety comes from the chain being the
final referee, not from trusting the other party.

**Fiber Network** is CKB's implementation, compatible with Bitcoin's Lightning
Network. Terms I will meet there:

- **channel** — the locked, shared pot between two parties
- **invoice** — a request for payment, encoded as a string
- **HTLC** (Hashed Time-Lock Contract) — the trick that lets a payment hop safely
  through strangers: each hop is released only against a secret, and refunded
  automatically if it times out
- **multi-hop** — paying someone you have no channel with, by routing through
  people who do
- **keysend** — paying someone without an invoice

---

## 9. What I actually do in this programme

Concretely, over twelve weeks:

1. **Write TypeScript that builds transactions** — the core skill.
2. **Build a web app** people connect a real wallet to, deployed at a public URL.
3. **Write on-chain scripts**, first in TypeScript, then in Rust.
4. **Run nodes** — a CKB node, then Fiber nodes, and move payments through a
   channel.
5. **Contribute to real open-source repositories** — file issues, reproductions and
   pull requests against the actual CKB projects.
6. **Publish a dev log every Saturday** on GitHub. This is a hard requirement:
   reimbursement is pro-rata and tied directly to it.
7. **Ship a capstone application** on testnet, with a README a stranger can follow.

So: yes, this is blockchain. Yes, open-source contributions. Yes, my own
application.

---

## 10. The three levels in the handbook

| Level | What it really means | My weeks |
|---|---|---|
| **Beginner** | Understand cells and transactions. The five tutorials — Transfer CKB, Store Data on Cell, Create Fungible Token, Create DOB, Build a Simple Lock. Learn CCC. Build a basic app | 1.5 – 5 |
| **Intermediate** | The ten-class Script development course. Real scripts in Rust. Token standards, Spore, Nervos DAO, Molecule, proper debugging | 5 – 7 |
| **Advanced** | Protocol-level work: SSRI, RGB++, xUDT internals, iCKB — and the payment-channel networks, Fiber and Perun | 8 – 12 |

Finishing inside Beginner is what "completed the programme" looks like. Reaching
Advanced **with something shipped and publicly verifiable** is the goal. My capstone
sits deliberately in Advanced.

---

## 11. What comes out of it

- **Weekly reimbursement**, pro-rata, tied strictly to the dev log.
- **A public portfolio** — every claim backed by an explorer link, a green CI run, a
  deployed URL, or an issue filed in someone else's repository.
- **Possible grant funding** via the Spark programme or the CKB Community Fund DAO.
- **A role-conversion interview** at the end, at a higher salary.

The standard I hold myself to: *never a claim whose only evidence is a file in my
own repository.*

---

## 12. Open questions

Kept here deliberately. Each one gets struck out when I can answer it in my own
words, and the date recorded.

- [ ] How exactly is a `ckt1…` address derived from a lock script, byte by byte?
- [ ] What is inside the 85 bytes of a `WitnessArgs`?
- [ ] What does the `dep_group` cell dep type do, and why is it not just a list?
- [ ] Where does the 61-byte minimum cell size come from, field by field?
- [ ] What is a "Type ID", and what problem does it solve?
- [ ] How does a Fiber channel actually settle if the other side goes offline?

---

*Written Week 1.5 (16 September 2026). Revised as understanding improves — see
`git log` on this file for the history.*
