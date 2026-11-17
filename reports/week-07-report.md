# CKBuilder Weekly Report — Week 7

**Participant:** Luong Thanh Tung ([@luongthanhtung03](https://github.com/luongthanhtung03))
**Track:** Builders'
**Week:** 7 — 9 – 14 Nov 2026 (work started on 7 Nov, after the Week 6 report)
**Publication date:** 2026-11-17

> **Tooling.** Built with Claude Code as a pair programmer; every commit is
> co-authored. This report was drafted by Claude Code from my fact sheet and
> reviewed and edited by me.

---

## This week in one table

| | |
|---|---|
| **Focus** | The CrowdCell integration: the opt-in pledge session built as a pull request on CrowdCell's frontend and run with real funds on public testnet against CrowdCell's live contracts; a fix for CrowdCell's pledge retry found by that run; the mainnet cycle atlas re-run with ckb-cycle-tools 1.3.0 |
| **Dates** | 7 Nov: Week 7 plan, CrowdCell patch on kit 2.2.0, funded testnet runs, retry follow-up, atlas re-run pushed · 9 – 14 Nov: 5 hours, reduced week |
| **CrowdCell** | Pledge from a session with no wallet prompt, including a pledge rebuilt after losing a race, on [testnet](https://testnet.explorer.nervos.org/transaction/0x4659b9b2bde18f2038b2b9b4930402f283c1cff3db55ef730b6a2f64b317ca28); the deployment it used [confirmed](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/6#issuecomment-6802463538) by CrowdCell's builder |
| **ckb-cycle-tools** | [Mainnet atlas, 7 Nov](https://github.com/luongthanhtung03/ckb-cycle-tools/blob/main/atlas/2026-11-07/report.md): 1,002 of 1,002 random transactions match the node |
| **Community** | Owl Pilot's builder [went through](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/51#issuecomment-6803109061) the session-kit notes I posted and mapped each to their design |
| **CI** | [cycle-tools run 42346115533](https://github.com/luongthanhtung03/ckb-cycle-tools/actions/runs/42346115533) green on the atlas commit; scheduled runs on both release commits still green on 16 Nov ([cycle-tools](https://github.com/luongthanhtung03/ckb-cycle-tools/actions/runs/43855610329), [session-kit](https://github.com/luongthanhtung03/ckb-session-kit/actions/runs/43859779098)) |

---

## Goal for this week

Turn CrowdCell's yes from Week 6 into a pull request: an opt-in pledge session
on top of ckb-session-kit 2.2.0, tested on public testnet against the contracts
CrowdCell's live site runs. Also re-run the mainnet cycle atlas with the new
ckb-cycle-tools 1.3.0 and get the week's outside posts ready.

## What I did

### The CrowdCell pull request (7 Nov)

CrowdCell's builder agreed in Week 6 to an opt-in session for the pledge retry,
the one place a backer is asked to sign twice. The patch is built on CrowdCell's
frontend, on ckb-session-kit 2.2.0:

- `lib/pledgeSession.ts` opens, loads and closes a pledge session and funds a
  pledge the page built. Before anything is signed it checks that the funded
  transaction still has the page's campaign input and its three outputs, plus
  only the session's own change and key cells.
- In the page's retry loop the session pays when one is open and covers the
  pledge; otherwise the existing wallet path runs unchanged.
- A small panel under the pledge form, collapsed, testnet only and off by
  default, shows the cap, what is left, the expiry and a Close button that
  refunds everything to the wallet.

The backer stays the wallet: the receipt and the refund address are the
wallet's, so refunds, receipt reclaims and CrowdCell's indexer are unchanged.
No contract changes. It builds, type-checks and lints the same as CrowdCell's
main branch, and it is ready to open.

### The pull request's own code, with real funds on testnet (7 Nov)

I ran the patch's `pledgeSession.ts` unchanged from a script, with a secp256k1
key as the wallet, on a test campaign of my own, against the five contracts
taken from the cell deps of a
[live CrowdCell pledge](https://testnet.explorer.nervos.org/transaction/0x20807a9966508e3afb86afdb6ad1e7725b2c28e4a5b6c1f45f923779ee911928).

- [Session opened](https://testnet.explorer.nervos.org/transaction/0x07a0a862efcc10d329d87a3b2b5c73ae93fb35eec1e59187d9b68e7fa968a544)
  with one wallet signature (budget 1,425 CKB).
- [A 100 CKB pledge from the session](https://testnet.explorer.nervos.org/transaction/0xaa2551bc2e240446b8cd1c0a7e998ae307b67ea945a093cc68d9aaa6ec83c73d)
  with no wallet signature; the receipt is under the wallet's lock.
- A forced race: a second backer's pledge
  [took the campaign cell first](https://testnet.explorer.nervos.org/transaction/0x119c31a0ec17ce35ac1c636a83fe554c12d3d8b8eebebc455e8d90728d2bb4a6);
  the session pledge was refused, rebuilt on top of it and
  [sent with no wallet signature](https://testnet.explorer.nervos.org/transaction/0x4659b9b2bde18f2038b2b9b4930402f283c1cff3db55ef730b6a2f64b317ca28).
  This is the case the integration is for.
- A pledge one CKB over the session's limit was refused by the kit before
  signing; another wallet could not close the session.
- Close, one wallet signature:
  [sweep](https://testnet.explorer.nervos.org/transaction/0xfeac937d58b632f22027180fd573bee6bb9c30a64fadc6cf987d8001030b5ca7)
  and [key cell](https://testnet.explorer.nervos.org/transaction/0xddcac7b1877a88386d566654be6617ac5f1e395ad0bbbb1b5cded21a3aa0fe64).
- After the deadline, the campaign was
  [finalized](https://testnet.explorer.nervos.org/transaction/0x4be6c79ea5fc9e623acf8fff673a676ba07c2ae43a3b2c1dcb1fd64121598942)
  and every pledge refunded, the session-funded ones to the wallet
  ([one refund](https://testnet.explorer.nervos.org/transaction/0xacb3e9da4cfcff63eb8d927aedf7f0439dcd4e0b5af6ca1d81fd5b51e825c1c5)).

On 11 Nov CrowdCell's builder
[confirmed](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/6#issuecomment-6802463538)
that the live site runs the deployment redeployed on 31 Oct, which is the one
these runs used.

### A fix for CrowdCell's pledge retry (7 Nov)

In two of the three runs the race step gave up after three attempts. The logs
showed why: the rival pledge was still in the node's pool, so every resend was
refused as a failed RBF replacement, and CrowdCell's loop only waits 30 seconds
for the campaign cell to move before rebuilding on the same cell. On testnet a
pledge often takes longer than that to commit. This is CrowdCell's existing
loop, not the session code, and on the wallet path each useless resend also
asks the backer to approve again.

The follow-up keeps the loop but waits up to 90 seconds when the refusal is an
RBF one (the rival is pending), and keeps 30 seconds when the cell is dead or
unknown. It moves the wait into a small `pledgeRetry.ts` with 7 unit tests, and
covers the wallet and session paths the same way. In three new funded runs the
rival was still pending each time, and each time the pledge waited, rebuilt
once on the rival's output and landed with no wallet signature:

| Run | Waited | Rival pledge | Rebuilt pledge |
|---|---|---|---|
| 1 | 49.1 s | [0x87747419…](https://testnet.explorer.nervos.org/transaction/0x8774741904827a78db28498be839b286e005dd8d34e8f11ef0c520d92eec6f81) | [0xa4dbfe7a…](https://testnet.explorer.nervos.org/transaction/0xa4dbfe7a23d8c2ab4e50e7e3060d277b65bc5faab1a2a1c94e39fb71b209dcb6) |
| 2 | 68.4 s | [0xd20cc8f9…](https://testnet.explorer.nervos.org/transaction/0xd20cc8f9cce0d4b98ecc9b7912991c9265997e967eec9bd1a64457698c471c75) | [0x9f8aa865…](https://testnet.explorer.nervos.org/transaction/0x9f8aa865cb552592c15599f04e2ec467fd28190523de082a1772b0e9229afca8) |
| 3 | 47.2 s | [0x8d87cc51…](https://testnet.explorer.nervos.org/transaction/0x8d87cc5114701a2f52665bcd8f56a628cad0869866a76dfd709beaf3ebd57f48) | [0x1e372eb4…](https://testnet.explorer.nervos.org/transaction/0x1e372eb4ebf9206b39a7e705b864a16a4fc1fcc15e84e5889daf41631d24172d) |

In run 2 the old 30-second loop would have given up. Every transaction of the
six runs was checked as committed, and every pledge was refunded. The testnet
CKB spent is almost all CrowdCell's 440 CKB campaign deposit per run, which its
campaign lock holds for about 180 days.

### The mainnet cycle atlas, re-run with 1.3.0 (7 Nov)

I re-ran the atlas on recent mainnet blocks with ckb-cycle-tools 1.3.0
([report](https://github.com/luongthanhtung03/ckb-cycle-tools/blob/main/atlas/2026-11-07/report.md),
[commit `23182e2`](https://github.com/luongthanhtung03/ckb-cycle-tools/commit/23182e2),
[CI green](https://github.com/luongthanhtung03/ckb-cycle-tools/actions/runs/42346115533)).

- Random sample: every 12th block from 20,932,885 to 20,946,673 (about 39
  hours), 1,002 transactions, all matching the node's recorded cycles, none
  excluded. The default lock, secp256k1_blake160, is 71.9% of all cycles; the
  median transaction costs 1,729,190 cycles
  ([example](https://explorer.nervos.org/transaction/0xaaa7827937f21e309a1dd4f8bb9bc05bc0f85af398f152aabb18d6e7943bb645)).
- Targeted sample for 22 scripts (xUDT, Omnilock, Spore, RGB++, iCKB and
  others): 650 replays, 604 matched, none mismatched, 46 older transactions
  have no cycle total on the public node and are listed as not recorded.
- The 389 transactions that are in both this run and the 28 Oct run give the
  same cycles, results and script names for every group, so the differences
  between the two reports come from the chain, not the tool.

The README now states 1.3 as the current status and says that `--functions`
needs the `.debug` files
([commit `708fed9`](https://github.com/luongthanhtung03/ckb-cycle-tools/commit/708fed9)).

### Plan for the rest of the programme (7 Nov)

I moved the CrowdCell pull request up from Week 8 to Week 7, carried the Week 6
outside posts into this week, and kept the Cells cycle-report workflow for the
Spark stage in Week 10
([plan commit `a665717`](https://github.com/luongthanhtung03/CKB_Luong_Thanh_Tung/commit/a665717)).

## Commands and output

```bash
# CrowdCell follow-up, run 2 (testnet), the race step
5. rival backer pledged 100 CKB from its wallet first (wallet path, other client), taking the same campaign cell
   session attempt 1 on campaign cell 0xd7214e9e10e4...:0: refused (ErrorClientRBFRejected): PoolRejectedRBF:
     RBF rejected: Tx's current fee is 3768, expect it to >= 6078 to replace old txs
     then waited 68.4 s of 90 s (pool pending: true), cell moved: true
   session attempt 2 on campaign cell 0xd20cc8f9cce0...:0: sent
   rebuilt session pledge sent after 2 attempts, wallet signatures during the race: 0
   it spends the rival's campaign output: true

# the same step before the fix (PR run 3)
   session attempt 1 ... refused (ErrorClientRBFRejected): PoolRejectedRBF ...
   session attempt 2 ... refused (ErrorClientRBFRejected): PoolRejectedRBF ...
   session attempt 3 ... refused (ErrorClientRBFRejected): PoolRejectedRBF ...
   RACE FAILED: Other pledges kept landing first. Please try again in a moment.

# atlas, 7 Nov
Random sample: 1002 transactions, all matched the node, none excluded.
Targeted samples for 22 scripts: 650 replays, 604 matched, 0 mismatch, 46 not recorded.
```

## Evidence

| Item | Result | Link |
|---|---|---|
| Session opened by the PR's code | One wallet signature | [tx](https://testnet.explorer.nervos.org/transaction/0x07a0a862efcc10d329d87a3b2b5c73ae93fb35eec1e59187d9b68e7fa968a544) |
| Pledge from the session | No wallet signature, receipt under the wallet lock | [tx](https://testnet.explorer.nervos.org/transaction/0xaa2551bc2e240446b8cd1c0a7e998ae307b67ea945a093cc68d9aaa6ec83c73d) |
| Pledge rebuilt after losing a race | No wallet signature | [rival](https://testnet.explorer.nervos.org/transaction/0x119c31a0ec17ce35ac1c636a83fe554c12d3d8b8eebebc455e8d90728d2bb4a6) · [rebuilt](https://testnet.explorer.nervos.org/transaction/0x4659b9b2bde18f2038b2b9b4930402f283c1cff3db55ef730b6a2f64b317ca28) |
| Close and refunds | Everything back to the wallet | [sweep](https://testnet.explorer.nervos.org/transaction/0xfeac937d58b632f22027180fd573bee6bb9c30a64fadc6cf987d8001030b5ca7) · [key cell](https://testnet.explorer.nervos.org/transaction/0xddcac7b1877a88386d566654be6617ac5f1e395ad0bbbb1b5cded21a3aa0fe64) · [finalize](https://testnet.explorer.nervos.org/transaction/0x4be6c79ea5fc9e623acf8fff673a676ba07c2ae43a3b2c1dcb1fd64121598942) · [refund](https://testnet.explorer.nervos.org/transaction/0xacb3e9da4cfcff63eb8d927aedf7f0439dcd4e0b5af6ca1d81fd5b51e825c1c5) |
| Live contracts used | Cell deps of a live CrowdCell pledge; confirmed by the builder | [pledge](https://testnet.explorer.nervos.org/transaction/0x20807a9966508e3afb86afdb6ad1e7725b2c28e4a5b6c1f45f923779ee911928) · [#6](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/6#issuecomment-6802463538) |
| Retry waits for a pending rival | 3 of 3 races landed (1 of 3 before) | [run 1](https://testnet.explorer.nervos.org/transaction/0xa4dbfe7a23d8c2ab4e50e7e3060d277b65bc5faab1a2a1c94e39fb71b209dcb6) · [run 2](https://testnet.explorer.nervos.org/transaction/0x9f8aa865cb552592c15599f04e2ec467fd28190523de082a1772b0e9229afca8) · [run 3](https://testnet.explorer.nervos.org/transaction/0x1e372eb4ebf9206b39a7e705b864a16a4fc1fcc15e84e5889daf41631d24172d) |
| Mainnet atlas, 1.3.0 | 1,002 of 1,002 matched; 604 of 650 targeted matched, 0 mismatch | [report](https://github.com/luongthanhtung03/ckb-cycle-tools/blob/main/atlas/2026-11-07/report.md) · [commit](https://github.com/luongthanhtung03/ckb-cycle-tools/commit/23182e2) · [CI](https://github.com/luongthanhtung03/ckb-cycle-tools/actions/runs/42346115533) |
| README status | 1.3, `--functions` note | [commit `708fed9`](https://github.com/luongthanhtung03/ckb-cycle-tools/commit/708fed9) |
| Release commits, scheduled CI | Green on 16 Nov | [cycle-tools](https://github.com/luongthanhtung03/ckb-cycle-tools/actions/runs/43855610329) · [session-kit](https://github.com/luongthanhtung03/ckb-session-kit/actions/runs/43859779098) |
| Owl Pilot | Session-kit notes mapped to their design | [#51](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/51#issuecomment-6803109061) |
| Plan update | Week 7 is the CrowdCell PR | [commit `a665717`](https://github.com/luongthanhtung03/CKB_Luong_Thanh_Tung/commit/a665717) · [CI](https://github.com/luongthanhtung03/CKB_Luong_Thanh_Tung/actions/runs/42346119138) |

## What went wrong, and how I fixed it

**A race the session could not win.** Two of the first three testnet runs gave
up in the race step. The session itself behaved correctly (it never outbid the
rival and never asked for a wallet signature), but CrowdCell's loop stopped
waiting after 30 seconds while the rival was still pending, so every resend hit
the same cell. Waiting up to 90 seconds on an RBF refusal fixed it: three of
three runs landed.

**Two copies of CCC.** CrowdCell's wallet connector pins its wallets to
`@ckb-ccc/core` 1.12.2, and the kit needs 1.23, so the bundle carries both and
TypeScript reported 7 errors where the two meet. Bumping CrowdCell's own copy
did not remove the second one and made the lockfile change five times larger,
so I dropped it and bridged the two with type-only casts. Runtime calls across
the two copies were checked on testnet before any funded run.

**Which contracts are live.** The repo's main branch did not match the
contracts the live site uses. I took the cell deps from a live pledge, checked
each binary's hash, and found they match a newer branch; the funded runs used
that branch, and the builder later confirmed it.

**An atlas run without a commit id.** The re-run ran from an exact export of
the 1.3.0 release without `.git`, so the report could not record the commit. I
added it by hand and rebuilt the report from the saved data, and said so in the
commit message. A sentence in the forum draft about when the unknown scripts
were deployed was also wrong; it now gives the dates from the chain (October
2021 and June 2022).

## What I learned

Running an integration with real funds finds things a type checker cannot. The
session code was right on the first run, but the run showed a timing problem in
the app around it that only appears when testnet is slow and a rival pledge sits
in the pool. The fix is small, and it helps CrowdCell's backers whether or not
they use a session.

Checking which contracts are live from a live transaction, rather than from the
repo, was the right call: the repo's default branch was behind the site.

## Hours

| Mon 9 | Tue 10 | Wed 11 | Thu 12 | Fri 13 | Sat 14 |
|---|---|---|---|---|---|
| 0 | 1 | 1 | 2 | 0 | 1 |

## Next week

- Rebase the CrowdCell patch and the retry follow-up on CrowdCell's current
  main, run the JoyID checks by hand, and open the pull request.
- File the upstream issues and the ckb-script-templates questions that are
  ready, and post the mainnet cycle atlas on Nervos Talk.
