# CKBuilder Weekly Report — Week 6

**Participant:** Luong Thanh Tung ([@luongthanhtung03](https://github.com/luongthanhtung03))
**Track:** Builders'
**Week:** 6 — 2 – 7 Nov 2026
**Publication date:** 2026-11-07

> **Tooling.** Built with Claude Code as a pair programmer; every commit is
> co-authored. This report was drafted by Claude Code from my fact sheet and
> reviewed and edited by me.

---

## This week in one table

| | |
|---|---|
| **Focus** | gpBlockchain's review of the session kit on [#47](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/47#issuecomment-6571727115), built point by point and shown on public testnet; five releases on npm; a first pledge funded from a session on CrowdCell's live scripts; a second, adversarial review of both projects answered with code |
| **Dates** | 2 Nov: review received, built, tested on testnet, answered; outreach and forum post · 3 Nov: 2.0.0 on npm, CrowdCell said yes, session-funded pledge on testnet, cycle tools for spawning scripts and fork PRs · 4 – 5 Nov: pool lag result and `--vm-id` findings posted, ckb-js-vm start-up floor measured, 2.1.0 and 1.2.0 on npm · 5 – 7 Nov: adversarial reviews of #46 and #47 built and answered; 2.2.0 and 1.3.0 on npm |
| **npm** | [ckb-session-kit 2.0.0](https://www.npmjs.com/package/ckb-session-kit/v/2.0.0) and [2.1.0](https://www.npmjs.com/package/ckb-session-kit/v/2.1.0) and [2.2.0](https://www.npmjs.com/package/ckb-session-kit/v/2.2.0) · [ckb-cycle-tools 1.2.0](https://www.npmjs.com/package/ckb-cycle-tools/v/1.2.0) and [1.3.0](https://www.npmjs.com/package/ckb-cycle-tools/v/1.3.0) · 1.0.0 of the kit deprecated |
| **Mentor** | Every point of the review answered on [#47](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/47#issuecomment-6580963574) the same day, with testnet logs; the follow-up [answered](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/47#issuecomment-6604125735) and [measured](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/47#issuecomment-6661196536) |
| **ckb-session-kit** | Owner locks only in reviewed configurations, with every unlocking path documented; total outflow across inputs and across lock groups tested in CKB-VM; several payers at once on public testnet; a way past the 16-cell cap; `fundInSession` for app-built transactions; `minConfirmations` for payment checks; a warning when an owner lock runs a build that was not reviewed |
| **ckb-cycle-tools** | Honest reports for scripts that spawn other scripts; the PR Action works for pull requests from forks; a manifest of what each report was measured with; failure paths labelled the way the node runs them; replays checked across the Mirana and Meepo hard forks |
| **Community** | CrowdCell agreed to an integration ([#6](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/6#issuecomment-6582214765)); Cells said a cycle-report workflow is welcome ([#39](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/39#issuecomment-6585814542)); two ckb-debugger issues reported on [#45](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/45#issuecomment-6661265151), which XuJiandong [will fix](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/45#issuecomment-6674466920); first Nervos Talk post ([t/11115](https://talk.nervos.org/t/same-lock-script-in-rust-and-in-ckb-js-vm-15k-cycles-vs-15m/11115)) |
| **Tests** | session-kit 693 (was 462) · cycle-tools 384, plus 26 skipped, 24 of them needing the network (was 262) |
| **CI** | Green on the latest commit of each repo: [session-kit run 42333639526](https://github.com/luongthanhtung03/ckb-session-kit/actions/runs/42333639526) · [cycle-tools run 42333643966](https://github.com/luongthanhtung03/ckb-cycle-tools/actions/runs/42333643966) |

---

## Goal for this week

Act on the mentor's full review of the session kit, show each fix on public
testnet rather than only in tests, release it, and start the integration with an
outside app that the review asked for. Late in the week a second reviewer
attacked both projects; I built what the points showed was missing before
replying.

## What I did

### The mentor's review, point by point (2 Nov)

gpBlockchain reviewed ckb-session-kit on [#47](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/47#issuecomment-6571727115)
on 2 Nov: two problems, three review points and four pieces of
guidance. I split the work into three branches and merged all three the same day.

| Review point | What was built |
|---|---|
| Expiry and leaked keys | Docs: browser expiry revokes nothing on chain; funds are at risk until recovery confirms |
| Payers competing for the creator's cells | Payout cell picked from confirmed cells not spent in the node's pool; retries with backoff; more payout cells at setup |
| Total outflow across inputs | 23 CKB-VM tests against the deployed binary; a warning when a session has no rate limit |
| The 16-cell cap | `clearPlantedCells`: the subscriber sweeps third-party cells back without cancelling |
| Combining subscription cells | Tests: merged mature cells pay one period's price, in CKB and in a real xUDT token |
| Trusting the owner's lock | Owner locks allowed only in reviewed configurations; PW-Lock and Nostr in PoW mode refused |
| Block-count periods | Docs: a period is a number of blocks, not a fixed time, with a link to the average block time chart |
| Keep subscriptions and the dedicated lock | Kept |
| Build with a community app | Integration offered to CrowdCell, accepted, and the kit side built (below) |

**Total outflow across inputs.** The review asked whether a session key could
spend more than the limit by using several cells in one transaction. 23 new tests
in CKB-VM, against the binary with the deployed code hash `0xab419466…4c08ce`,
cover the limit spread over three cells, a session with no rate limit drained in
one go, merged subscription cells, two subscriptions in one transaction and the
owner's sweep of many cells. The lock held in every case: cells with the same
args share one per-transaction limit. The results are a table in
[SECURITY-EVIDENCE.md](https://github.com/luongthanhtung03/ckb-session-kit/blob/main/docs/SECURITY-EVIDENCE.md),
and `openSession` now warns before signing when a session has no rate limit
([merge `825326a`](https://github.com/luongthanhtung03/ckb-session-kit/commit/825326a)).

**Owner locks from reviewed configurations only.** I read the unlock paths of
each lock the kit could meet from its source, then made the kit refuse the ones
that can open without the owner's signature: anyone-can-pay, PW-Lock (its
deployed build is the anyone-can-pay variant), always-success, Omnilock in
anyone-can-pay or admin mode, and the Nostr lock in proof-of-work mode.
Configurations I have not reviewed are refused unless the app opts in, with a
warning. secp256k1, multisig, Omnilock in its signing modes, Nostr signing mode
and JoyID still work, as do all five rows of the wallet matrix
([merge `3980697`](https://github.com/luongthanhtung03/ckb-session-kit/commit/3980697)).

**Payers competing for cells, and the 16-cell cap.** A payment now picks a
payout cell that is confirmed and not already spent by a transaction in the
node's pool, and retries with backoff when the node refuses a conflict. A send
whose outcome is unknown is never retried, so nothing is paid twice. Chained
payments were not built; the README says why. For the cap, cells of another type
no longer count toward it, and the subscriber can sweep cells planted by someone
else without cancelling
([merge `c3c9ac4`](https://github.com/luongthanhtung03/ckb-session-kit/commit/c3c9ac4)).

### The same fixes on public testnet (2 Nov)

Three new scripts, each with its log in the repo:

- **Several payers at once**
  ([log](https://github.com/luongthanhtung03/ckb-session-kit/blob/main/docs/evidence/2026-11-02-smoke-contention.log)):
  two rounds of four simultaneous payments to the same creator, all eight
  committed. One real collision happened: the node refused it as an RBF
  replacement and the library retried it to success. The run also measured that,
  right after a send, the public endpoint could still report the spent cell as
  live for about 0.9 s, which is why the retry is needed on top of the pool
  check (where that delay comes from is measured below).
- **Cells planted by a third party**
  ([log](https://github.com/luongthanhtung03/ckb-session-kit/blob/main/docs/evidence/2026-11-02-smoke-clear-planted.log)):
  16 cells planted under a subscription blocked its status and charges; the
  subscriber cleared them in
  [one transaction](https://testnet.explorer.nervos.org/transaction/0x7c8fd82ecf418b56aa445da94173046c0bb7d95bacc36a6d186f1088c0de44ea)
  (2,448 CKB back), and the next charge came
  [on time](https://testnet.explorer.nervos.org/transaction/0xbbf18fb02252b70941a17b25abebf7740a7a9305fab8b1292906c032af52b4a7),
  dated from the opening, not from the cleanup.
- **Owner locks**
  ([log](https://github.com/luongthanhtung03/ckb-session-kit/blob/main/docs/evidence/2026-11-02-smoke-owner-locks.log)):
  17 owner-lock cases, each with the verdict promised. The refused ones stop
  before anything is signed or sent. Real sessions were opened and closed under
  secp256k1, multisig v2, Omnilock and Nostr signing mode
  ([one opening](https://testnet.explorer.nervos.org/transaction/0x59ee26132f6ca3740112717942eb20c35246ff05a08c3a27ee778e9fd70bfcdb)).
  Why PW-Lock is refused, on chain: a PW-Lock cell
  [spent with no witness at all](https://testnet.explorer.nervos.org/transaction/0x36410febd935b570377806b9605cb3bf90ac56c02f8e3cdf58ec4208d1f5bcc8).

I replied on [#47](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/47#issuecomment-6580963574)
the same evening with all nine points and these logs.

### My own adversarial review, then 2.0.0 (2 – 3 Nov)

Before releasing, I reviewed the week's code as an attacker would. Nothing
critical or high; two medium and six low findings, each fixed test-first
([merge `c8b0e84`](https://github.com/luongthanhtung03/ckb-session-kit/commit/c8b0e84)).
The main ones: look-alike token cells that counted toward the cell cap but were
never swept (now filtered exactly and swept back), a history budget that anyone
could fill cheaply (now only spends count, so blocking it takes more than 1,024
transactions per period, about 157,000 CKB), and a send with an unknown outcome
that could have been retried (now a typed `SendOutcomeUnknownError`, never
retried).

The owner-lock refusals mean some calls that 1.0.0 accepted are now refused, so
under semver this is a major version. I released it as
[2.0.0](https://www.npmjs.com/package/ckb-session-kit/v/2.0.0) instead of the
planned 1.1.0, with upgrade notes in the
[changelog](https://github.com/luongthanhtung03/ckb-session-kit/blob/main/CHANGELOG.md).
CI was green on the release commit.

### An outside team said yes (2 – 3 Nov)

The review's last point was to build the next example with a team willing to
integrate. I offered the kit to CrowdCell, a crowdfunding app on CKB, on
[#6](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/6#issuecomment-6581121560).
Its builder [said yes](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/6#issuecomment-6582214765):
use it for the pledge retry, the one place a backer is asked to sign again, as an
opt-in path, in a testnet PR the builder will review. I
[confirmed the scope](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/6#issuecomment-6583803418)
and asked which deployment is live on testnet.

### Funding an app's own transaction from a session (3 Nov)

A pledge is a transaction CrowdCell builds itself: its campaign cell, its typed
pledge and receipt cells, its cell deps. Until now the kit could only pay to a
fixed recipient. `fundInSession` takes a transaction the app built and adds the
session's cells to pay for it, with the key cell paying the fee; `sendWithSession`
builds, funds, signs with the session key and sends, and retries only when the
node names one of the session's own cells as spent. A session with an on-chain
recipient, an input under the owner's lock, or an outflow over the session's
per-transaction limit is refused before anything is signed
([merge `7a597ff`](https://github.com/luongthanhtung03/ckb-session-kit/commit/7a597ff);
README section [Funding an app-built transaction](https://github.com/luongthanhtung03/ckb-session-kit/blob/main/README.md#funding-an-app-built-transaction)).

It is tested against CrowdCell's real scripts: 9 CKB-VM tests run the session
lock together with CrowdCell's five live testnet binaries (campaign lock and
type, pledge, pledge lock, receipt), and every group passes on a session-funded
pledge, while an over-limit spend, a wrong recipient or an extra change cell is
refused. On public testnet, on a test campaign of my own,
[a 100 CKB pledge was funded from a session](https://testnet.explorer.nervos.org/transaction/0x282adf8e8a25bef1bde96d285856c96c1fd7d1f4ff7d28da3e67669879a12b67)
with no wallet input; a 101 CKB pledge, one shannon over the limit, was refused
before signing; after the deadline the campaign was finalized and the pledge
[refunded](https://testnet.explorer.nervos.org/transaction/0xa2e7acc7f95cf88c42f462ee470502e5d26934356c52fa30d37f444096c07d25)
([log](https://github.com/luongthanhtung03/ckb-session-kit/blob/main/docs/evidence/2026-11-02-fund-pledge.log)).
This is the kit side of the CrowdCell integration, released in
[2.1.0](https://www.npmjs.com/package/ckb-session-kit/v/2.1.0) on 5 Nov.

### Where the 0.9 s came from (3 – 5 Nov)

gpBlockchain [followed up](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/47#issuecomment-6594553842)
on two points. On the pool lag, the suggestion was that the public endpoint's load balancer
might send the transaction and the next query to different nodes. I checked
that testnet.ckbapp.dev answers from two node ids and
[replied](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/47#issuecomment-6604125735)
that I would measure it against a single node. The new `smoke:pool-lag` script
tags every answer with the node that gave it. On testnet.ckb.dev (one node) the
node that took the send never showed the spent input as live, from the first
poll on (20 sends, 158 polls). On testnet.ckbapp.dev every "still live" answer
came from the other backend, in 13 of 20 sends, for up to about half a second,
and one kept-alive connection still reached both backends. So the delay is
propagation between backends, as suspected, not the node's own pool check.
I [posted the result](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/47#issuecomment-6661196536)
on 5 Nov
([commit `58bc4c1`](https://github.com/luongthanhtung03/ckb-session-kit/commit/58bc4c1);
logs: [one node](https://github.com/luongthanhtung03/ckb-session-kit/blob/main/docs/evidence/2026-11-03-smoke-pool-lag-testnet.ckb.dev.log),
[two backends](https://github.com/luongthanhtung03/ckb-session-kit/blob/main/docs/evidence/2026-11-03-smoke-pool-lag-testnet.ckbapp.dev.log)).

On JoyID the mentor said it cannot be assessed, since its contract is closed source. The
kit keeps accepting it, and the docs now say it was reviewed from its
documentation only and show how an app can refuse JoyID owners itself
([commit `71e2fe8`](https://github.com/luongthanhtung03/ckb-session-kit/commit/71e2fe8)).

### ckb-cycle-tools: spawning scripts and pull requests from forks (3 Nov)

**Scripts that spawn other scripts.** Crowns' match script spawns its game
script, so I built a small fixture of the same shape (a parent lock that spawns
a child by its data2 hash through a pipe) and checked the tool on it. The cycle
totals match ckb-debugger exactly, child included, and the PR diff catches a
change in the child's cost (+18.81% in the heavy case). ckb-debugger profiles
only the spawning script, so the function list now says so instead of showing
the parent's functions as if they were the whole cost, and the tool warns when a
swapped-in binary is still named by its old hash in a cell's data
([merge `b85713c`](https://github.com/luongthanhtung03/ckb-cycle-tools/commit/b85713c)).

**Pull requests from forks.** Cells
[said yes](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/39#issuecomment-6585814542)
to a cycle-report workflow, with conditions: pull requests there come from
forks, whose token cannot comment, no `pull_request_target`, and the cycle
change shown as information, not a failing check. The Action now supports all
three: a `pull_request` job measures and uploads the report, a `workflow_run`
job checks it and posts it, an `informational` input turns a crossed threshold
into a warning, and the base can be measured with the PR's own config
([merge `e390f62`](https://github.com/luongthanhtung03/ckb-cycle-tools/commit/e390f62)).
I [confirmed the four points](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/39#issuecomment-6604144050).

### Releases (5 and 7 Nov)

[ckb-session-kit 2.1.0](https://www.npmjs.com/package/ckb-session-kit/v/2.1.0)
ships `fundInSession` and `sendWithSession`, and
[ckb-cycle-tools 1.2.0](https://www.npmjs.com/package/ckb-cycle-tools/v/1.2.0)
ships spawn support and the fork-PR Action. Both are tagged on GitHub with CI
green on the release commits
([session-kit run 42054142888](https://github.com/luongthanhtung03/ckb-session-kit/actions/runs/42054142888),
[cycle-tools run 42054151477](https://github.com/luongthanhtung03/ckb-cycle-tools/actions/runs/42054151477)).
ckb-session-kit 1.0.0 is deprecated on npm and points to 2.x.

On 7 Nov the work from the second review (below) went out as
[ckb-session-kit 2.2.0](https://www.npmjs.com/package/ckb-session-kit/v/2.2.0) and
[ckb-cycle-tools 1.3.0](https://www.npmjs.com/package/ckb-cycle-tools/v/1.3.0), again tagged and with CI green on the release
commits ([run 42333639526](https://github.com/luongthanhtung03/ckb-session-kit/actions/runs/42333639526), [run 42333643966](https://github.com/luongthanhtung03/ckb-cycle-tools/actions/runs/42333643966)).

### A second review, built before answering (5 – 7 Nov)

On 5 Nov tydeptrai21042004 posted adversarial reviews of both projects: seven
points on [#46](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/46#issuecomment-6661397199)
and five on [#47](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/47#issuecomment-6661311552).
I mapped each point to the code, built what was missing, and replied on
[#46](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/46#issuecomment-6701331007)
and [#47](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/47#issuecomment-6701357806)
on 7 Nov with links to each change.

**ckb-cycle-tools.**

- *A gated diff now fails when a group that accepted starts rejecting*, even if
  it uses fewer cycles. Before, that only failed with `fail-on-result-change`
  ([commit `8b123bc`](https://github.com/luongthanhtung03/ckb-cycle-tools/commit/8b123bc)).
- *Failure paths labelled the way the node runs them.* From ckb-script's source,
  lock groups run first, then type groups, and verification stops at the first
  failure. A rejected transaction's report now names the group where the node
  stops and lists the groups it never runs. The README has a table of where each
  replay input comes from, and of what a flamegraph can and cannot attribute
  ([merge `4b80e60`](https://github.com/luongthanhtung03/ckb-cycle-tools/commit/4b80e60)).
- *A manifest in every report*: tool and ckb-debugger versions, the debugger
  binary's sha256, the commit, and per scenario the VM version, an inputs hash
  and each swapped-in binary's hash. A scenario whose inputs changed is shown as
  not compared, and a gated diff fails on it
  ([merge `e83c041`](https://github.com/luongthanhtung03/ckb-cycle-tools/commit/e83c041)).
- *The per-transaction cycle limit.* A transaction whose groups each fit but
  whose total passes the node's limit is now flagged, and the CLI exits 1
  ([commit `ce409f9`](https://github.com/luongthanhtung03/ckb-cycle-tools/commit/ce409f9)).
- *Replays across hard forks.* 24 real transactions on both sides of Mirana and
  Meepo, mainnet and testnet: all 18 after each fork match the node's recorded
  total, at the VM version the replay picks
  ([compat/HARDFORK.md](https://github.com/luongthanhtung03/ckb-cycle-tools/blob/main/compat/HARDFORK.md)).

**ckb-session-kit.**

- *Accounting across lock groups.* A new property test runs the deployed lock in
  CKB-VM on transactions with 2 to 4 lock groups (independent owners, shared or
  separate keys, strangers paying the fee, value moved into another group's
  change) and checks each accepted group's net loss directly. No violation in
  4,000 transactions; the invariant is written down in
  [SECURITY-EVIDENCE.md](https://github.com/luongthanhtung03/ckb-session-kit/blob/main/docs/SECURITY-EVIDENCE.md#accounting-invariant-across-groups)
  ([merge `33743b7`](https://github.com/luongthanhtung03/ckb-session-kit/commit/33743b7)).
- *`minConfirmations`* on `verifyAccess`, `verifySubscription` and
  `subscriptionStatus`: a valid but too recent payment returns `unconfirmed`,
  one whose block left the main chain returns `reorged`
  ([commit `7a46fdf`](https://github.com/luongthanhtung03/ckb-session-kit/commit/7a46fdf)).
- *Every unlocking path of each accepted owner lock*, from the deployed code:
  in the configurations the kit accepts, every path signs the whole transaction,
  and the mainnet Omnilock build has no CoBuild or open-transaction mode
  ([docs/design/owner-locks.md](https://github.com/luongthanhtung03/ckb-session-kit/blob/main/docs/design/owner-locks.md)).
  Omnilock, JoyID and the Nostr lock can be upgraded under their type ids, so
  opening a session now reads the owner lock's live code and warns when it is
  not a build that was reviewed. It warns rather than refuses, so a vendor
  upgrade does not block new sessions
  ([commit `d492883`](https://github.com/luongthanhtung03/ckb-session-kit/commit/d492883)).
- *Docs for the rest*: how a subscription's payment history is reconstructed and
  why a third party's cells add no period
  ([subscriptions.md](https://github.com/luongthanhtung03/ckb-session-kit/blob/main/docs/design/subscriptions.md#how-a-payment-history-is-reconstructed)),
  and what a compromised page can and cannot do
  ([README](https://github.com/luongthanhtung03/ckb-session-kit/blob/main/README.md#if-the-page-is-compromised)).

### Introducing the work (2 – 7 Nov)

- **Nervos Talk:** [Same lock script in Rust and in ckb-js-vm: 15k cycles vs 15M](https://talk.nervos.org/t/same-lock-script-in-rust-and-in-ckb-js-vm-15k-cycles-vs-15m/11115),
  the benchmark from ckb-cycle-tools: one lock written twice, 58 scenarios, Rust
  about 1,000x cheaper. It drew two detailed replies on how the startup cost
  should be measured, and I shared it in the CKBuilders Telegram group on 3 Nov.
- **Cycle tools on #45 (Crowns):** I
  [offered them](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/45#issuecomment-6583488263)
  for the spawn-based match script and, after XuJiandong pointed to
  ckb-debugger, [explained](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/45#issuecomment-6604164877)
  how the tool builds on it and asked about profiling spawned VMs. XuJiandong suggested
  ckb-debugger's `--vm-id`, and the Crowns builder
  [liked the idea](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/45#issuecomment-6628696264)
  of cycle changes on each PR. I tried `--vm-id` on the spawn fixture and
  [reported two problems](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/45#issuecomment-6661265151):
  the replayed child exits early unless it asks for exactly its inherited fd
  count, and the flamegraph uses the root script's symbols. XuJiandong
  [replied](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/45#issuecomment-6674466920)
  that they will fix them.
- **ckb-js-vm start-up floor:** in the CKBuilders group a builder asked whether
  the 14.3M-cycle floor shrinks with smaller bytecode. I measured it: the VM
  itself is about 3.57M, loading bytecode about 64 cycles per byte, and
  initialising `@ckb-js-std/core` about 6.6M, the largest part
  ([RESULTS.md](https://github.com/luongthanhtung03/ckb-cycle-tools/blob/main/benchmarks/session-lock/RESULTS.md#startup-floor-vs-bytecode-size)).
- **Cycle tools on #39 (Cells):** offered as one workflow file, accepted with
  conditions, built (above).
- **Notes compared with Owl Pilot**
  ([#51](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/51#issuecomment-6583088900)),
  another session-key project: which owner locks are safe to trust, and payers
  competing for cells. Its builder
  [will look at](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/51#issuecomment-6623683583)
  the session kit's security evidence.

## Evidence

| Item | Result | Link |
|---|---|---|
| Mentor's review | Received 2 Nov | [#47](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/47#issuecomment-6571727115) |
| Reply, all 9 points | Posted with testnet logs | [#47](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/47#issuecomment-6580963574) |
| Mentor's follow-up and my reply | Load balancing; JoyID | [follow-up](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/47#issuecomment-6594553842) · [reply](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/47#issuecomment-6604125735) |
| ckb-session-kit 2.0.0 | On npm | [npm](https://www.npmjs.com/package/ckb-session-kit/v/2.0.0) · [tag v2.0.0](https://github.com/luongthanhtung03/ckb-session-kit/tree/v2.0.0) |
| Several payers at once | 8 of 8 committed, 1 collision retried | [log](https://github.com/luongthanhtung03/ckb-session-kit/blob/main/docs/evidence/2026-11-02-smoke-contention.log) · [a payment](https://testnet.explorer.nervos.org/transaction/0x1a57ed95420fba300460a9d1c2299fa538fd571cc4e0887f55a353d98dea8706) |
| Planted cells cleared | 16 cells swept back, charge on time | [log](https://github.com/luongthanhtung03/ckb-session-kit/blob/main/docs/evidence/2026-11-02-smoke-clear-planted.log) · [clear](https://testnet.explorer.nervos.org/transaction/0x7c8fd82ecf418b56aa445da94173046c0bb7d95bacc36a6d186f1088c0de44ea) · [charge](https://testnet.explorer.nervos.org/transaction/0xbbf18fb02252b70941a17b25abebf7740a7a9305fab8b1292906c032af52b4a7) |
| Owner locks on testnet | 17 of 17 as promised | [log](https://github.com/luongthanhtung03/ckb-session-kit/blob/main/docs/evidence/2026-11-02-smoke-owner-locks.log) · [PW-Lock spent with no witness](https://testnet.explorer.nervos.org/transaction/0x36410febd935b570377806b9605cb3bf90ac56c02f8e3cdf58ec4208d1f5bcc8) |
| Total outflow across inputs | 23 CKB-VM cases, table per case | [SECURITY-EVIDENCE.md](https://github.com/luongthanhtung03/ckb-session-kit/blob/main/docs/SECURITY-EVIDENCE.md) |
| Pledge funded from a session | Committed on testnet, CrowdCell's live scripts | [pledge](https://testnet.explorer.nervos.org/transaction/0x282adf8e8a25bef1bde96d285856c96c1fd7d1f4ff7d28da3e67669879a12b67) · [refund](https://testnet.explorer.nervos.org/transaction/0xa2e7acc7f95cf88c42f462ee470502e5d26934356c52fa30d37f444096c07d25) · [log](https://github.com/luongthanhtung03/ckb-session-kit/blob/main/docs/evidence/2026-11-02-fund-pledge.log) |
| Pool lag per node | One node: 0 live answers after a send; two backends: up to ~0.5 s | [one node](https://github.com/luongthanhtung03/ckb-session-kit/blob/main/docs/evidence/2026-11-03-smoke-pool-lag-testnet.ckb.dev.log) · [two backends](https://github.com/luongthanhtung03/ckb-session-kit/blob/main/docs/evidence/2026-11-03-smoke-pool-lag-testnet.ckbapp.dev.log) |
| Spawning scripts in cycle-tools | Totals match ckb-debugger | [merge `b85713c`](https://github.com/luongthanhtung03/ckb-cycle-tools/commit/b85713c) |
| PR Action for fork PRs | `workflow_run` posting, informational mode | [merge `e390f62`](https://github.com/luongthanhtung03/ckb-cycle-tools/commit/e390f62) |
| CI, testnet evidence pushed | Green | [run 41468114917](https://github.com/luongthanhtung03/ckb-session-kit/actions/runs/41468114917) |
| CI, owner-lock evidence | Green | [run 41482234695](https://github.com/luongthanhtung03/ckb-session-kit/actions/runs/41482234695) |
| CI, 2.0.0 release commit | Green | [run 41487320321](https://github.com/luongthanhtung03/ckb-session-kit/actions/runs/41487320321) |
| CI, session-kit (pool lag) | Green | [run 41654994920](https://github.com/luongthanhtung03/ckb-session-kit/actions/runs/41654994920) |
| CI, cycle-tools (fork PRs) | Green | [run 41640322438](https://github.com/luongthanhtung03/ckb-cycle-tools/actions/runs/41640322438) |
| Cross-version check on GitHub | Green | [run 41447914099](https://github.com/luongthanhtung03/ckb-cycle-tools/actions/runs/41447914099) |
| Integration offer, CrowdCell | Accepted | [offer](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/6#issuecomment-6581121560) · [yes](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/6#issuecomment-6582214765) · [scope](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/6#issuecomment-6583803418) |
| Cycle report for Cells | Welcome, with conditions | [offer](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/39#issuecomment-6583861249) · [yes](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/39#issuecomment-6585814542) · [confirmed](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/39#issuecomment-6604144050) |
| Cycle tools for Crowns | Discussed with the builder and XuJiandong | [offer](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/45#issuecomment-6583488263) · [reply](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/45#issuecomment-6604164877) |
| Notes with Owl Pilot | Posted | [#51](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/51#issuecomment-6583088900) |
| ckb-session-kit 2.2.0, ckb-cycle-tools 1.3.0 | On npm, tagged, CI green | [kit 2.2.0](https://www.npmjs.com/package/ckb-session-kit/v/2.2.0) · [tools 1.3.0](https://www.npmjs.com/package/ckb-cycle-tools/v/1.3.0) · [run 42333639526](https://github.com/luongthanhtung03/ckb-session-kit/actions/runs/42333639526) · [run 42333643966](https://github.com/luongthanhtung03/ckb-cycle-tools/actions/runs/42333643966) |
| ckb-session-kit 2.1.0, ckb-cycle-tools 1.2.0 | On npm, tagged, CI green | [kit 2.1.0](https://www.npmjs.com/package/ckb-session-kit/v/2.1.0) · [tools 1.2.0](https://www.npmjs.com/package/ckb-cycle-tools/v/1.2.0) · [run 42054142888](https://github.com/luongthanhtung03/ckb-session-kit/actions/runs/42054142888) · [run 42054151477](https://github.com/luongthanhtung03/ckb-cycle-tools/actions/runs/42054151477) |
| Second review, #46 | 7 points, built, answered | [review](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/46#issuecomment-6661397199) · [reply](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/46#issuecomment-6701331007) |
| Second review, #47 | 5 points, built, answered | [review](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/47#issuecomment-6661311552) · [reply](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/47#issuecomment-6701357806) |
| Accounting across lock groups | 4,000 transactions in CKB-VM, no violation | [invariant](https://github.com/luongthanhtung03/ckb-session-kit/blob/main/docs/SECURITY-EVIDENCE.md#accounting-invariant-across-groups) |
| Replays across hard forks | 18 of 18 post-fork totals match the node | [HARDFORK.md](https://github.com/luongthanhtung03/ckb-cycle-tools/blob/main/compat/HARDFORK.md) |
| Owner-lock unlocking paths | Every accepted path signs the whole transaction | [owner-locks.md](https://github.com/luongthanhtung03/ckb-session-kit/blob/main/docs/design/owner-locks.md) |
| ckb-debugger `--vm-id` | Two problems reported, fix promised | [report](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/45#issuecomment-6661265151) · [reply](https://github.com/Nervos-Community-Catalyst/CKBuilder-projects/issues/45#issuecomment-6674466920) |
| ckb-js-vm start-up floor | VM 3.57M, core import 6.6M | [RESULTS.md](https://github.com/luongthanhtung03/ckb-cycle-tools/blob/main/benchmarks/session-lock/RESULTS.md#startup-floor-vs-bytecode-size) |
| Forum post | Nervos Talk, Infrastructure | [t/11115](https://talk.nervos.org/t/same-lock-script-in-rust-and-in-ckb-js-vm-15k-cycles-vs-15m/11115) |
| Plan update | Week 6 is the review | [PLAN.md](https://github.com/luongthanhtung03/CKB_Luong_Thanh_Tung/blob/main/PLAN.md) |

## What went wrong, and how I fixed it

**A congested testnet node.** The public node I had used, testnet.ckb.dev, had
about 22,000 transactions pending and kept dropping connections in the middle of
the contention run. I moved the runs to testnet.ckbapp.dev (same RBF settings,
an almost empty pool) and checked its settings at the start of each log.

**The pool check alone was not enough.** The contention run showed that right
after a send, the endpoint still reported the spent cell as live for about
0.9 s, so two payers could pick the same cell even with the pool check. The node
refuses the second one, and the retry with backoff covers it; the run shows that
happening once. The next day's measurement showed the delay comes from the
endpoint's two backends, not from the node's own check.

**A history budget anyone could fill.** My own review found that a stranger
could block a subscription's status by creating cheap transactions under its
lock. Now only spends count, and blocking it takes more than 1,024 transactions
per period, about 157,000 CKB. A complete fix would need the lock itself to
change; the docs give the limit.

**A version number that would have misled.** I had prepared the release as
1.1.0, but refusing PW-Lock and unreviewed owner locks breaks code that worked
on 1.0.0. I renumbered it 2.0.0 and wrote upgrade notes for each refusal.

**CrowdCell's deployment file was behind its live app.** Neither the repo's
deployment JSON nor the frontend defaults match the scripts CrowdCell's live
app uses. I took the cell deps from a live pledge transaction instead, checked
each binary's hash, and fetch them in a script rather than commit them, since
the repo has no licence file.

**A report that hid most of the cost.** On the spawn fixture, the tool listed
the parent's own functions as the costliest in a 762k-cycle group whose profile
covered only 15k of it. The report now says how much of the group the profile
covers and that the rest is in the spawned script.

**A gap the reviewer found.** With only `fail-above` set, a group that went
from accept to reject with fewer cycles passed the PR check, because a result
change only failed with `fail-on-result-change`. A rejection is never an
improvement, so a gated diff now fails on it by default.

**A flaky test before the release.** One CLI test fell back to a public node
and sometimes ran past vitest's 5 s limit. I gave it 20 s before tagging 1.2.0
rather than let a red run sit on the release commit.

**A stale count in the README.** It said 116 CKB-VM lock tests when there were
already 118; it now matches the suite.

## What I learned

A mentor's review is most useful when the answer is a transaction, not a
paragraph. Each point I could show on testnet (payers colliding, planted cells,
refused owner locks) produced a finding that the tests had not: the 0.9 s lag
never appears in CKB-VM and only showed up on a real endpoint. And measuring it
again on a single node, as the mentor suggested, turned a guess into a number.

Trusting an input lock is a question about its code, not its name. PW-Lock looks
like a signature lock, but the deployed build takes the anyone-can-pay path with
no signature at all, and one testnet transaction proves it. Reading each lock's
unlock paths from source was slower than keeping a list of names, but it is the
only way the allowlist means something.

And asking an outside team early pays off. CrowdCell answered within an hour
with the one flow where the kit helps their users, and Cells answered with the
exact constraints their CI has. Both turned into working code within a day.

## Hours

| Mon 2 | Tue 3 | Wed 4 | Thu 5 | Fri 6 | Sat 7 |
|---|---|---|---|---|---|
|2 |2 |3 |2 |0 |2 |

## Next week

- Open the testnet PR on CrowdCell for the pledge retry, on top of 2.2.0.
- Open the cycle-report workflow PR on Cells, tested first on a pull request from a fork.
- Profile spawned scripts once the `--vm-id` fixes land in ckb-debugger.
- Post the mainnet cycle atlas on Nervos Talk.
- File the upstream issues found while building (offckb, ckb-testtool, ckb-debugger, CCC), and send the ckb-testtool integration questions to the ckb-script-templates maintainers.
