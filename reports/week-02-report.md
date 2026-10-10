# CKBuilder Weekly Report — Week 2

**Participant:** Luong Thanh Tung ([@luongthanhtung03](https://github.com/luongthanhtung03))
**Track:** Builders'
**Week:** 2 — 5 – 10 Oct 2026
**Publication date:** 2026-10-10

> **Tooling.** Built with Claude Code as a pair programmer; every commit is
> co-authored. 

---

## This week in one table

| | |
|---|---|
| **Focus** | Switching from learn-then-build to building two open-source projects |
| **ckb-session-kit** | Browser session keys with a Rust lock that enforces spending limits on-chain — [repo](https://github.com/luongthanhtung03/ckb-session-kit) · [demo](https://ckb-session-kit.vercel.app/) · [pay-per-read](https://ckb-session-kit.vercel.app/read) |
| **ckb-cycle-tools** | Cycle measurement for CKB scripts: web inspector, `ckb-cycles` CLI, Rust vs ckb-js-vm benchmark — [repo](https://github.com/luongthanhtung03/ckb-cycle-tools) · [inspector](https://ckb-cycle-tools.vercel.app/) |
| **Session lock on testnet** | Deployed in [`0xab2e…43d2`](https://testnet.explorer.nervos.org/transaction/0xab2e69b8b97c15bddeb80954edd6d33befcd2fe9e4243377a46f14a3e1c343d2) — 4.3 KB, about 12,900 cycles per run |
| **Rust vs ckb-js-vm** | Same lock, same 20 scenarios, same decisions: ≈ 12,300 cycles in Rust vs ≈ 14.6M on ckb-js-vm |
| **CI** | Green on both repos, Linux + Windows — [session-kit](https://github.com/luongthanhtung03/ckb-session-kit/actions/runs/37874631590) · [cycle-tools](https://github.com/luongthanhtung03/ckb-cycle-tools/actions/runs/37875175616) |
| **Commits** | 29 across three repositories |

---

## Goal for this week

Until now I was following a learn-then-build plan: exercises first, a project later.
At the start of this week I changed it to **build first**, on two small public projects
that other CKB developers can actually use, with every claim backed by a testnet
transaction, a green CI run or a live URL. The new plan is in
[`PLAN.md`](../PLAN.md).

## What I did

### ckb-session-kit — sign once, then pay with no wallet popup

Every on-chain payment normally opens a wallet dialog. That is fine for one big
payment and unusable for many small ones. The session kit lets the user's wallet sign
**once** to fund a session; after that, a key held in the browser can pay on its own,
but only inside limits the network itself enforces.

- **Session lock, a CKB lock script in Rust.** The owner can do anything with the
  cell. The session key can only spend within a per-transaction limit, optionally to
  one recipient only, and optionally at a limited rate. The script carries no
  cryptography of its own: it delegates signature checks to the standard locks of the
  owner and the session key. 4.3 KB, about 12,900 cycles.
- **Deployed on testnet, every rule tested against the real network** — both the
  spends it must accept and the ones it must refuse, with their error codes.
- **Library API on CCC:** `openSession` (wallet signs once) → `spendInSession`
  (no wallet) → `closeSession` (wallet signs once), proven end to end on testnet.
- **Wallet demo on Vercel** using the CCC connector (JoyID, MetaMask, …).
- **Pay-per-read example.** Articles cost 1 CKB each, paid by the session key into
  the creator's anyone-can-pay cell. The session can pay nobody else. The server
  releases an article only after checking on-chain that the requesting key paid for
  that article — no database.
- **Device-loss recovery.** If the browser key is lost, the owner's wallet alone
  finds every session it opened and sweeps them back in one transaction.
- **Tests:** 57 in total, 22 of which run the lock in the real CKB-VM. The npm
  package is checked in CI by installing it into an empty project.

### ckb-cycle-tools — where do the cycles go?

- **Windows fix:** finds the real `ckb-debugger` behind offckb's `.cmd` shim, which
  tools that spawn it by name cannot see.
- **Web inspector** on Vercel: total cycles and script groups for any testnet
  transaction.
- **`ckb-cycles` CLI:** replays a transaction in ckb-debugger, one script group at a
  time; the groups add up to exactly the node's total, checked in CI against live
  testnet transactions.
- **Failure-path profiling:** `ckb-cycles --file tx.json` profiles a transaction
  that is not on chain — one about to be sent, or one the node rejected — and shows
  which script refuses it and why.
- **Benchmark:** the session lock ported to TypeScript on ckb-js-vm and run against
  the Rust version over the same 20 scenarios. Both make the same decision every
  time. Rust ≈ 12,300 cycles per accepted spend; ckb-js-vm ≈ 14.6M, of which ≈ 13.9M
  is the VM starting up. Rebuilt and rerun in CI on every push.

## Evidence

| Item | Result | Link |
|---|---|---|
| Session lock deployed | Committed | [`0xab2e…43d2`](https://testnet.explorer.nervos.org/transaction/0xab2e69b8b97c15bddeb80954edd6d33befcd2fe9e4243377a46f14a3e1c343d2) |
| Session key spends exactly the limit, no owner signature | Committed | [`0x48b3…e828`](https://testnet.explorer.nervos.org/transaction/0x48b3bde2a50bb8ba3aff0800e850b2aa521793b35628d165eab7f22f984be828) |
| Rate-limited cell accepted once mature | Committed | [`0xd203…58cb`](https://testnet.explorer.nervos.org/transaction/0xd2038582a6099ede9e1b906f257509ca0a50ec9a7aba2c12e39b519319b458cb) |
| Library flow: open (owner signs once) | Committed | [`0x5835…b2b8`](https://testnet.explorer.nervos.org/transaction/0x5835048d4226f0b74be01cd79664d7e4dce67ea8aa77bb9d3468e896d27bf2b8) |
| Library flow: pay 100 CKB, session key only | Committed | [`0x9448…5c77`](https://testnet.explorer.nervos.org/transaction/0x9448e354252d71913d18fda2ba6d2460e1d78c2c0e4123eb8068482d7ec05c77) |
| Pay-per-read: 1 CKB read, session key only | Committed | [`0x2dc6…81bf`](https://testnet.explorer.nervos.org/transaction/0x2dc6b584b5e136507745385a5b829fd314838acd1e3e630a7a91d120641281bf) |
| Pay-per-read: session swept back on close | Committed | [`0x8dc5…9cf5`](https://testnet.explorer.nervos.org/transaction/0x8dc5260ebfb232939cff48570610d61d620d2c727675ec2498be956458309cf5) |
| Recovery: keys dropped, one owner transaction sweeps every session back | Committed | [`0x4efd…eeaf`](https://testnet.explorer.nervos.org/transaction/0x4efd8b7875c8a0f2883ac2b21ed509ff86c72012e6f4a24816783aa25e02eeaf) |
| Server-verified read: article released to the payer only | Committed | [`0x5aee…6942`](https://testnet.explorer.nervos.org/transaction/0x5aeeb65326efb1ff2d651ba22f5a685c224162e974b51ceb9638f6576d056942) |
| Rejected cases and every other link | — | READMEs of [ckb-session-kit](https://github.com/luongthanhtung03/ckb-session-kit#readme) and [ckb-cycle-tools](https://github.com/luongthanhtung03/ckb-cycle-tools#readme) |
| CI, ckb-session-kit | Green: Linux + Windows, lock built and tested in CKB-VM, clean install | [run 37874631590](https://github.com/luongthanhtung03/ckb-session-kit/actions/runs/37874631590) |
| CI, ckb-cycle-tools | Green: live testnet profile, failure-path replay, Rust vs ckb-js-vm benchmark, clean install | [run 37875175616](https://github.com/luongthanhtung03/ckb-cycle-tools/actions/runs/37875175616) |
| Live demos | Deployed on Vercel | [session](https://ckb-session-kit.vercel.app/) · [pay-per-read](https://ckb-session-kit.vercel.app/read) · [inspector](https://ckb-cycle-tools.vercel.app/) |

## What went wrong, and how I fixed it

**Expiry cannot be enforced on-chain.** My first design had the lock refuse a session
key after an expiry time. On CKB a script can use `since` to prove that time *has*
passed, but never that it has *not* — so an on-chain expiry would not stop a leaked
key. Expiry stays in the browser, and the on-chain rules became the ones the network
really can enforce: how much per transaction, to whom, and how often.

**CCC silently raised my outputs.** A session-lock cell needs at least 121 CKB
(153 with a recipient) just to exist. When I asked for less, CCC raised the amount
without saying so, and the numbers stopped matching. The library now checks this
first and throws a clear error.

**1 CKB payments looked impossible.** Any new cell needs at least 61 CKB, so a
1 CKB payment cannot create one. The fix was to top up the creator's existing
anyone-can-pay cell instead — something the session lock already allowed, so the
deployed lock did not have to change.

**Proving who paid, without a database.** A transaction hash is public, so anyone
could show it to the server and claim the article. Each payment now carries a memo,
signed by the session key, naming the article it pays for, and the request for the
article is signed by the same key. The server checks both against the chain.

**Recovering sessions without the lost key.** The session cells' lock args contain the
lost key's hash, so they cannot be looked up directly. They begin with the owner's
lock hash, though, so a prefix search finds them all. Cells with malformed args are
skipped, because the lock rejects those even for the owner — I left one such decoy
cell on testnet to prove it cannot block recovery.

**Type ID does not run in ckb-debugger.** It is built into the node, not a script on
chain. The CLI adds its fixed 1,000,000 cycles, and the totals match the node exactly.

**Benchmark CI failed on Linux.** esbuild's `bin/esbuild` is a JavaScript file on
Windows but a native binary on Linux, so `node bin/esbuild` broke. The build now uses
esbuild's JavaScript API on every platform.

**Dropping the Fiber example.** The plan had a Fiber pay-per-use example. A session
cell cannot fund a Fiber channel directly, and Fiber pay-per-use is already covered by
FiberLatch, a funded project. I replaced it with pay-per-read, which nobody else is
building.

## What I learned

The biggest lesson was about what a lock script can and cannot promise. A CKB script
only sees the transaction in front of it: the cells it destroys, the cells it creates,
and what the witnesses prove. So the rules that work on-chain are rules about that
transaction — how much leaves the cell, where it goes, how long the cell has existed.
"This key stops working on Friday" is not that kind of rule, because no transaction
can prove that Friday has not arrived yet. Once I saw that, the design became clear:
the chain enforces the limits that cap the damage, and the browser handles the rest.

The second lesson was how much a lock can do without any cryptography. The session
lock does not verify a single signature itself. It requires that a cell under the
owner's lock, or the session key's lock, sits in the same transaction, and lets
those standard locks do the checking. That is why it is 4.3 KB and about 12,900
cycles, and why it never needed its own audit-sensitive crypto code.

And the benchmark put a number on a choice I had only read about: for a small lock
like this, almost all of ckb-js-vm's cost is starting the VM, not running my logic.

## Hours

Estimated from commit times; the work came in two long sessions.

| Mon | Tue | Wed | Thu | Fri | Sat |
|---|---|---|---|---|---|
| 0 | 1 | 3 | 3 | 3 | 2 |

Tuesday's commits in my log repo belong to Week 1.5 and are in that report.

## Next week

- Test both demo pages with a real wallet (JoyID) and fix whatever that shows.
- Post both projects on the CKBuilder-projects board, and file my OffCKB findings
  upstream at `ckb-devrel/offckb`.
- Publish `ckb-session-kit` and `ckb-cycle-tools` to npm.
- Cycle tools: a Windows setup guide, and v1.0 docs ahead of a Spark application.
