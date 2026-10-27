# CKBuilder Weekly Report — Week 4

**Participant:** Luong Thanh Tung ([@luongthanhtung03](https://github.com/luongthanhtung03))
**Track:** Builders'
**Week:** 4 — 18 – 24 Oct 2026, with the work of the evening of 26 Oct (dates below)
**Publication date:** 2026-10-27

> **Tooling.** Built with Claude Code as a pair programmer; every commit is
> co-authored. This report was drafted by Claude Code from my fact sheet and
> reviewed and edited by me.

---

## This week in one table

| | |
|---|---|
| **Focus** | The second plan was already built, so: a new plan, v1.0 of both packages, subscriptions, flamegraphs |
| **Dates** | 18 Oct: walkthrough and limits docs · 20 Oct: Week 3 report · 26 Oct evening (last commit 00:04 on the 27th): everything else in this report |
| **ckb-session-kit** | **Subscriptions** on the deployed lock, with no lock change: library, demo page, proven on testnet |
| **ckb-cycle-tools** | **`ckb-cycles flame`**: where inside a script the cycles go, by function; the PR comment lists which functions changed; the web inspector draws the flamegraph |
| **Packages** | Both at 1.0.0 with a changelog, checked from a clean install |
| **Wallets** | Sessions and subscriptions run on testnet with five kinds of owner lock (CKB, MetaMask/EVM, UniSat/BTC, Dogecoin, Nostr) |
| **Tests** | session-kit 343 · cycle-tools 155 |
| **Security** | Both demos moved to Next.js 16.4.3, past a critical advisory in 16.4.0 |
| **CI** | Green on both — [session-kit](https://github.com/luongthanhtung03/ckb-session-kit/actions/runs/40401082471) · [cycle-tools](https://github.com/luongthanhtung03/ckb-cycle-tools/actions/runs/40401590474) |

---

## Goal for this week

Everything the 13 October plan scheduled for Weeks 4 to 12 was built between 14
and 18 October. So the goal was to plan the remaining weeks around getting the two
projects used and funded, and to start the two new pieces in that plan.

## What I did

### A walkthrough and the limits (18 Oct)

A [walkthrough](https://github.com/luongthanhtung03/ckb-session-kit/blob/main/docs/WALKTHROUGH.md)
of every page of the session kit, written as the script for a recorded demo, and
a "Limits" section in both READMEs: what each project does not do, in one place.

### The plan for Weeks 5 to 12 (26 Oct, evening)

[`PLAN.md`](../PLAN.md) now has a third section: subscriptions and flamegraphs as
the new pieces; v1.0 on npm, the cycle-report Action on another CKB repository and
a wallet compatibility table for adoption; issues and pull requests upstream for
what the build ran into; Spark, then the DAO.

### Subscriptions, on the lock already deployed

A creator charges a fixed price once per period from a cell the subscriber owns,
while the subscriber is offline, and the subscriber cancels alone at any time.

The finding that made this cheap: **the deployed session lock already enforces
it.** Move the roles: the subscriber is the owner, the creator's server holds the
session key, the price is the per-payment limit, the period is the rate limit, the
creator's address is the recipient. I wrote that down as a design first and proved
it with six tests that run the deployed binary in CKB-VM: a charge after a full
period is accepted; an early one (error 14), one over the price (12) and one to
anyone else (13) are refused; the subscriber cancels alone.

An adversarial review of the design then found that the subscriber's money was
safe but the creator's was not. The first period was free (a new cell cannot be
charged for a whole period), and a subscriber could re-create the cell to reset its
age. Also, anyone could present someone else's subscription. All three are fixed
in the library:
- the opening pays the first period;
- access follows payments, not the live cell;
- the opening commits to a hashed account id under the subscriber's signature.

A code review of the implementation found one more: one payment could renew several
subscriptions. A transaction must now pay the sum of the prices of every
subscription it creates.

On 27 Oct the same flow also runs in a token (an xUDT such as a stablecoin), still
on the same lock: the per-payment CKB limit is 0, so no CKB ever leaves the cell,
and the price is the per-payment token limit. On testnet the network refused an
early charge (14) and a charge that tried to move one shannon of CKB (12); two
token charges went through a period apart.

The [/subscribe](https://ckb-session-kit.vercel.app/subscribe) page opens a
subscription with one signature. Members' notes come from a server that keeps no
database: it checks the chain on every request. The page asks the creator's server
to charge when a period ends.

### Flamegraphs of a script's cycles

`ckb-cycles flame` runs each script group in ckb-debugger's flamegraph mode and
writes an SVG and folded stacks, with the costliest functions in the terminal.
Deployed binaries are stripped, so the tool takes an unstripped build of the same
code and checks that it costs exactly the same cycles as the deployed binary. On a
real subscription charge it shows the session lock's 20,999 cycles by function; the
largest cost is reading lock hashes.

Then in the pull-request cycle report: a project can name an unstripped build of
each script, and the PR comment lists, under each changed script, which functions
got more or less expensive.

### Which wallets work

A script runs the session and subscription flows with each kind of owner lock the
demo's wallet picker gives, signed the way that wallet signs: open, pay, sweep, key
cell back, subscribe, cancel. CKB's default lock, Omnilock for Bitcoin (UniSat) and
Dogecoin wallets, and the Nostr lock passed every step on testnet. The MetaMask row
did not: my own check of the owner's lock, which refuses locks that do not verify a
signature, did not know Omnilock's auth flag 0x12, the one CCC gives Ethereum
wallets. So every MetaMask owner was refused before signing. Fixed with a test; on the
re-run the MetaMask row passed every step too.

### v1.0

Both packages are at 1.0.0 with a changelog, and pass their clean-install check.
Publishing to npm is the next step.

## Evidence

| Item | Result | Link |
|---|---|---|
| Subscription opened, first period paid | Committed | [`0x3832…a1b9`](https://testnet.explorer.nervos.org/transaction/0x383242a3bf89ae8007fc8fc4f7ec04420718c2e32590bdbbd445bcf4c4e2a1b9) |
| Charge 1, creator's key only | Committed | [`0xf98e…db16`](https://testnet.explorer.nervos.org/transaction/0xf98e36b2f5ef1bb86875fb0989e32f25f67807bc95e34aa273b497db5eebdb16) |
| Charge 2, a period later | Committed | [`0x930b…60e0`](https://testnet.explorer.nervos.org/transaction/0x930beb93436c884f679f691a901eec1db4742fd69cd28e8d63b4eb386de260e0) |
| Early charge | Rejected by the network, error 14 | [README, the 26 Oct run](https://github.com/luongthanhtung03/ckb-session-kit#subscriptions) |
| Token subscription: charge of 2 units, no CKB out (27 Oct) | Committed | [`0x7aa3…eb6d`](https://testnet.explorer.nervos.org/transaction/0x7aa3872fec7e32e5b1f4e719d034a0d7310f717aa128642a1bfb2d252efceb6d) |
| Cancelled by the subscriber alone, 153 CKB back | Committed | [`0x235c…9c4f`](https://testnet.explorer.nervos.org/transaction/0x235c9d2e4fc2205fa552c144890002f611c362402b62ceb1dc8540160c459c4f) |
| Flamegraph of a charge, unstripped build = deployed cycles | 20,999 = 20,999 | [tx `0x50ae…3092`](https://testnet.explorer.nervos.org/transaction/0x50ae6df49d411a5766da1c9717da9e6ff34670194b389779f717fcee71a03092) |
| Wallet compatibility, 5 owner locks x 6 steps | All committed | [README table](https://github.com/luongthanhtung03/ckb-session-kit#which-wallets-can-own-a-session) |
| CI, ckb-session-kit | Green: lock built and tested in CKB-VM, Linux + Windows, clean install | [run 40401082471](https://github.com/luongthanhtung03/ckb-session-kit/actions/runs/40401082471) |
| CI, ckb-cycle-tools | Green: live testnet replay, WASM replay, benchmark, clean install | [run 40401590474](https://github.com/luongthanhtung03/ckb-cycle-tools/actions/runs/40401590474) |
| Live demos | Deployed on Vercel | [subscribe](https://ckb-session-kit.vercel.app/subscribe) · [inspector, with flamegraphs](https://ckb-cycle-tools.vercel.app/) |

## What went wrong, and how I fixed it

**The rule held, the business did not.** The lock bounded what the creator could
take, which is what I had checked. The review asked the opposite question, what the
subscriber could avoid paying, and found a free first period and a period that could
be reset. Both were fixed by changing what counts as paid, not by changing the lock.

**One payment, many subscriptions.** The check asked "did this transaction pay one
price?" instead of "did it pay every subscription it opened?". Same shape as Week
3's one-payment-several-articles bug, in a new place.

**An account id on-chain in clear.** The first version wrote the account id into the
opening as plain text. It is now a hash, so the id can double as the secret the
browser presents to the creator.

**MetaMask owners refused by my own check.** The owner-lock allowlist was right to
exist (an owner lock that signs nothing would hand anyone owner mode) but listed
Omnilock auth flags 0x00 to 0x07, and CCC gives Ethereum wallets 0x12. No test used
the lock a real wallet produces; the wallet matrix does now.

**Testnet slowed to minutes per block** during the testnet run, which looked like a
hang. The script now talks to the node over HTTP, waits up to an hour, and can resume
a run that was cut short.

**Profiles with no names.** A deployed script is stripped, so its profile is one
frame. Function names that contain `;` (Rust's `[u8; 32]`) also broke the stack
format. The tool now takes an unstripped build and checks it costs the same, and
splits stacks only outside brackets.

## What I learned

A review is most useful when it changes the question. Week 3's reviews asked what a
leaked key could do; this week's asked what each side of a deal could avoid. The
same lock passed the first question and needed library changes for the second.

## Hours

| Sun 18 | Mon 19 | Tue 20 | Wed 21 | Thu 22 | Fri 23 | Sat 24 |
|---|---|---|---|---|---|---|
|2 |3 |0 |0 |2 |3 |3 |

## Next week

- Publish both packages to npm.
- Run the cycle-report Action on a real pull request, then on another CKB repository.
- Post the cycle comparison on Nervos Talk, and the cycle tools' Spark application.
- File the upstream issues found while building (offckb, ckb-testtool, ckb-debugger, CCC).
