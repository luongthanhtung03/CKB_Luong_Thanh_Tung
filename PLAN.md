# Eight-week study and build plan

Built from the CKBuilder Handbook. Target pace is 4–5 hours per week, with one
report published every Tuesday. This is a scaffold, not a contract — I will
adjust it as I go and record any changes in the weekly reports.

| Week | Period | Focus | Main output |
|---|---|---|---|
| 1 | 26 Aug – 1 Sep | Environment and the Cell Model | OffCKB devnet running, cell-model notes |
| 2 | 2 – 8 Sep | First transactions | Transfer CKB + Store Data on Cell, testnet tx hashes |
| 3 | 9 – 15 Sep | CCC and tokens | Create Fungible Token, CCC Playground notes |
| 4 | 16 – 22 Sep | DOBs and a first app | Create DOB, small CCC app of my own |
| 5 | 23 – 29 Sep | Validation model and locks | Rust + RISC-V toolchain, Build a Simple Lock |
| 6 | 30 Sep – 6 Oct | Rust scripts and testing | One type script, passing and failing tests |
| 7 | 7 – 13 Oct | Capstone choice and community | Capstone brief, defect report on another project |
| 8 | 14 – 20 Oct | Ship v0.1 | Working app on testnet with verifiable tx hashes |

## Phase 1 — Understand the Cell (weeks 1–2)

- Introduction to Nervos CKB; How CKB works; Quick start
- Intro to Script
- CKB Academy lesson 1
- Tutorials: Transfer CKB, Store Data on Cell
- Deliverable: an annotated transaction with every field labelled

## Phase 2 — Build with CCC (weeks 3–4)

- CCC docs, CCC App, CCC Playground, code examples
- CKB Academy lesson 2; xUDT introduction
- Spore protocol and the DOB Cookbook
- RPC and the indexer
- Tutorials: Create Fungible Token, Create DOB
- Deliverable: a page that connects a wallet, shows balance, lists cells, sends CKB

## Phase 3 — Write Scripts (weeks 5–6)

- Script course Class 1 (Validation Model), Class 2 (Script Basics),
  Class 5 (Debugging), Class 6 (Type ID)
- Rust quick start for CKB scripts; ckb-debugger; Molecule serialization
- Tutorial: Build a Simple Lock
- Deliverable: one type script enforcing a rule I can state in a sentence,
  with tests proving both the valid and the invalid transition

## Phase 4 — Ship something (weeks 7–8)

- Pick one advanced track and go deep: SSRI, RGB++, Fiber Network, iCKB, or Nervos DAO
- Write a capstone brief and discuss it with the programme director and CKB DevRel
- Test another builder's project and send them a real defect report
- Deliverable: a basic application on testnet, with a README a stranger can follow

## Working habits

1. Screenshot the moment a command succeeds — do not reconstruct evidence on report day.
2. Keep an append-only dated scratch log in `notes/log.md`.
3. Commit small and often, so the history corroborates that the work was contemporaneous.
4. Never commit `.env`, private keys, or seed phrases.
