# Glossary

Every term I have met on CKB, in one line each, written the way I wish someone had
explained it to me. Alphabetical. Grows every week.

Longer explanations live in [`orientation.md`](orientation.md).

| Term | Meaning |
|---|---|
| **args** | Extra bytes handed to a script when it runs. A signature lock puts the owner's key hash here, so one script binary serves everybody |
| **bech32m** | The text encoding that turns a lock script into a readable `ckb1…` / `ckt1…` address with a built-in typo check |
| **block** | A batch of transactions, added to the chain roughly every 8 seconds on CKB |
| **capacity** | The size of a cell in bytes, and simultaneously the CKB it holds. 1 CKB = 1 byte |
| **CCC** | Common Chain Connector. The TypeScript library for wallets, cell lookup and transaction building. My main tool |
| **cell** | The one and only unit of storage on CKB: capacity, data, lock script, type script |
| **cell dep** | A cell a transaction reads but does not consume — normally the cell holding a script's compiled code |
| **CKB** | Common Knowledge Base. The blockchain. Also the name of its token |
| **CKB-VM** | The RISC-V virtual machine every node runs scripts inside |
| **ckb-debugger** | Runs one script standalone, printing the failure reason and the cycle count |
| **ckb-js-vm** | A JavaScript engine compiled to RISC-V, so scripts can be written in TypeScript |
| **ckb-testtool** | Test harness that runs scripts against a simulated chain, no node required |
| **code hash** | A hash identifying *which* script to run. Either the hash of the code itself, or a Type ID |
| **cycles** | Units of computation counted by CKB-VM while a script runs. CKB's equivalent of gas |
| **data** | The free-form bytes inside a cell |
| **dead cell** | A cell that has already been spent. Gone permanently |
| **dep group** | A single cell dep that expands into several — a shorthand for "these scripts always travel together" |
| **devnet** | A blockchain running locally on my machine. Instant, fake, resettable, invisible to anyone else |
| **DOB** | Digital Object. An on-chain asset under the Spore protocol; NFT-like, but content stored on-chain |
| **explorer** | Website that displays any transaction on a public network. Where my evidence links point |
| **faucet** | Website that gives out free testnet tokens |
| **Fiber Network** | CKB's Lightning-compatible payment channel network. My capstone sits here |
| **hash** | A fixed-size fingerprint of some data. Same input, same fingerprint; changing one byte changes it completely |
| **hash type** | Says how to interpret a code hash: `data`, `data1`, `data2` or `type` |
| **HTLC** | Hashed Time-Lock Contract. Lets a payment hop safely through strangers: released against a secret, auto-refunded on timeout |
| **iCKB** | Protocol that makes locked Nervos DAO deposits tradeable |
| **indexer** | Service answering "which live cells have this lock script?". Without it I cannot find cells to spend |
| **input** | A pointer to an existing live cell that a transaction destroys |
| **invoice** | An encoded request for payment, in Fiber and Lightning |
| **live cell** | A cell that exists now and can still be spent |
| **lock script** | The program deciding *may this cell be spent?* My address is one of these, written as text |
| **mainnet** | The real network, with real money. Not touching it |
| **Molecule** | The binary serialization format CKB encodes structured data in |
| **multi-hop** | Paying someone I have no direct channel with, by routing through people who do |
| **Nervos DAO** | Lock CKB to earn a share of new issuance. Similar to staking |
| **node** | One computer running the CKB software |
| **OffCKB** | Tool that runs a pre-funded devnet locally and scaffolds projects |
| **output** | A new cell created by a transaction |
| **payment channel** | Lock funds on-chain once, then exchange signed promises off-chain, and settle on-chain once at the end |
| **Perun** | The other payment-channel system on CKB |
| **private key** | The secret that proves I authorised a transaction. Never committed, ever |
| **RFC** | Request For Comments. The numbered specification documents defining CKB's standards |
| **RGB++** | Issues assets on Bitcoin, using CKB to run logic Bitcoin cannot |
| **RISC-V** | An open, royalty-free CPU instruction set. CKB scripts compile to it |
| **RPC** | The HTTP interface a node exposes. How my code talks to the chain |
| **script** | A compiled program stored on-chain that returns 0 (allowed) or an error code (refused) |
| **serialization** | Turning structured data into a flat run of bytes, and back again |
| **since** | A field on an input that blocks spending until a given time or block height |
| **Spore** | The protocol behind DOBs |
| **SSRI** | Script-Sourced Rich Information. Lets a script describe its own behaviour to applications |
| **sUDT** | The simplest CKB token standard. Roughly ERC-20 |
| **testnet** | A real, shared, public network with worthless tokens. Where my public evidence comes from |
| **transaction** | A request to destroy some cells and create others |
| **Type ID** | A code-hash scheme giving a script a stable identity that survives upgrades |
| **type script** | The program deciding *is this state change legal?*. Runs on both inputs and outputs |
| **UTXO** | Unspent Transaction Output — Bitcoin's model of spendable chunks. CKB's cell is a generalised version |
| **witness** | The per-input data a lock script reads — usually the signature |
| **WitnessArgs** | The Molecule structure a witness normally holds: `lock`, `input_type`, `output_type` |
| **xUDT** | Extensible token standard. sUDT plus attachable custom rules |

---

*Started Week 1.5. Any term I have to look up twice gets added here the second time.*
