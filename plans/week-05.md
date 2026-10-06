# Week 5 — Rust part 2, then the front end

**Period:** Mon 26 – Sat 31 Oct 2026 · **Report:** Sat 31 Oct · **Budget:** 48h
**Phase:** D — Rust on-chain

| Level | What ships |
|---|---|
| **Floor** | A simple lock in Rust, deployed to testnet, locking and unlocking a cell |
| **Target** | That, plus Type ID upgradability, plus a deployed dApp URL a stranger can open |
| **Stretch** | A lock beyond the tutorial — time-lock or multisig |

## Why this week is split in two

**Monday to Thursday is Rust.** A lock script is a different problem from a type
script: a type script asks *is this state change legal*, a lock script asks *may this
cell be spent at all*. Writing one closes the last gap in "can build any CKB
application" on the on-chain side.

**Friday and Saturday are the front end**, and 16 hours is genuinely enough — this is
the one part of the whole plan that is home territory. I have written TypeScript for
years and CCC handles the wallet layer. Giving it a full week would be padding a
schedule that has no room for padding.

Type ID matters more than it looks. Without it, a deployed script can never be
upgraded, and every project in Phase 2 deploys scripts. Getting it wrong in October
is cheap; getting it wrong in the capstone in December is not.

## Days

| Day | Date | A — New (2h) | B — Build (1h) | C — Rust (4h) | D — Ship (1h) | Done when |
|---|---|---|---|---|---|---|
| Mon | 26 Oct | Lock scripts vs type scripts; what a lock is actually allowed to inspect | Generate the lock project; write the failing tests first | Rust: signature verification, working with fixed-size byte arrays | Commit | Tests exist and fail for the right reason |
| Tue | 27 Oct | Signature checking inside a script; what the script can and cannot see of the witness | Implement the simple lock | Rust: borrowing across syscall boundaries | Commit; reply to one forum thread | A cell locked by my script unlocks with the right signature |
| Wed | 28 Oct 🔥 | Script security: validation completeness; what a malicious transaction looks like | Write the attacks: unlock without a signature, replay another cell's signature, unbalanced outputs | Rust: exhaustive matching, making invalid states unrepresentable | Commit; evidence captured | Every attack is rejected, each with its own specific error code |
| Thu | 29 Oct 🔥 | [Type ID](https://docs.nervos.org/docs/tech-explanation/type-id); upgradable deployment; dep cell management | Deploy the lock to **testnet** with Type ID; then **upgrade it in place** and prove the old cell still works | Rust: finishing the lock; cycle-check it | Explorer links for both deployments | I have two explorer links — the deploy and the upgrade — and the same script hash across both |
| Fri | 30 Oct | CCC in the browser; wallet connectors; what changes when the signer is a wallet | Scaffold the dApp; connect a wallet; read and display a balance | Rust: 1h only — back to drip | Commit | A wallet connects and the page shows a real testnet balance |
| Sat | 31 Oct | — | Send CKB and move my Week 3 token from the UI; **deploy to a public URL**; report; push | — | Report, matrix, push | A stranger can open the URL, connect a wallet and move a token |

🔥 Wednesday and Thursday. Wednesday is adversarial thinking, which is a different
skill from writing the happy path and is the one that matters for a lock. Thursday is
Type ID, where the failure mode is subtle — an upgrade that silently produces a
*different* script hash looks like it worked until nothing can find the script.

## The bar for the dApp

Not a demo that works on my machine with my node. The check is:

- It is deployed at a URL I can send to someone.
- It talks to **public testnet**, not a local node.
- A wallet I did not build connects to it.
- It can send CKB *and* move the token I issued in Week 3.
- The README says what to do if the faucet is empty.

## The bar for the lock

Before Tuesday counts as done:

- What does my lock inspect, and what is it deliberately ignoring?
- What stops someone reusing a signature from a different transaction?
- If two cells use this lock in the same transaction, what happens?

If any answer is "the tutorial did it", Tuesday is not done.

## Evidence to capture

| File | What it shows |
|---|---|
| `screenshots/week-05/01-lock-tests-green.png` | Lock tests passing |
| `screenshots/week-05/02-attacks-rejected.png` | Each attack rejected with its own error code |
| `screenshots/week-05/03-lock-deployed.png` | The lock on the explorer |
| `screenshots/week-05/04-type-id-upgrade.png` | The upgrade, same script hash |
| `screenshots/week-05/05-dapp-wallet-connected.png` | Wallet connected, balance shown |
| `screenshots/week-05/06-dapp-token-sent.png` | Token moved from the UI |
| `evidence/week-05-lock-tests.log` | Full test output including the attacks |
| `evidence/week-05-typeid-migration.json` | Both deployment migrations |

## Reading

| Day | Study item | Where |
|---|---|---|
| Mon | Locks vs type scripts | [Intro to Script](https://docs.nervos.org/docs/script/intro-to-script) · my own `notes/orientation.md` |
| Tue | Signature checking | [`ckb-std`](https://docs.rs/ckb-std) · the [secp256k1 lock source](https://github.com/nervosnetwork/ckb-system-scripts) |
| Wed | Script security | [Script security](https://docs.nervos.org/docs/script/script-security) · the RFCs on transaction validation |
| Thu | Type ID | [Type ID](https://docs.nervos.org/docs/tech-explanation/type-id) · [RFC 0022](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0022-transaction-structure/0022-transaction-structure.md) |
| Fri | CCC in the browser | [CCC docs](https://docs.nervos.org/docs/sdk-and-devtool/ccc) · the `@ckb-ccc/connector` package |

## Rust

Four hours a day Monday to Thursday, then back to the one-hour drip on Friday. By
Thursday the Rust on-chain block is complete: type script, lock script, tests,
debugger, cycles, deployment, upgrade.

## Next week

Fiber — the last week of the learning phase.
