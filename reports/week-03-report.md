# CKBuilder Weekly Report — Week 3

**Participant:** Luong Thanh Tung ([@luongthanhtung03](https://github.com/luongthanhtung03))
**Track:** Builders'
**Publication date:** 2026-10-18


---

## This week in one table

| | |
|---|---|
| **Focus** | Fix what reviewers found, then build the next five pieces on the same two projects |
| **ckb-session-kit** | Review fixes in the lock (errors 16–18), CKB Place, pay-per-minute, token sessions (xUDT) — [demo](https://ckb-session-kit.vercel.app/) · [place](https://ckb-session-kit.vercel.app/place) · [listen](https://ckb-session-kit.vercel.app/listen) · [tokens](https://ckb-session-kit.vercel.app/tokens) |
| **ckb-cycle-tools** | Per-group cycles in the browser (ckb-debugger in WebAssembly), cycle reports on pull requests — [inspector](https://ckb-cycle-tools.vercel.app/) |
| **Session lock on testnet** | Redeployed twice: [13 Oct](https://testnet.explorer.nervos.org/transaction/0x37cfe04f64fd4dbec3803a972a51b7080f9ca1a3042535e97b7a756d0e03b071) (review fixes), [14 Oct](https://testnet.explorer.nervos.org/transaction/0xf3098bdb9a7bb1c500990be0f1159b7e66f507fef6b7a4f904046024284877f2) (token sessions) — 7.6 KB, 15,651 cycles per run |
| **Tests** | session-kit 271 (57 run the lock in the real CKB-VM) · cycle-tools 126 |
| **CI** | Green on both — [session-kit](https://github.com/luongthanhtung03/ckb-session-kit/actions/runs/38544798257) · [cycle-tools](https://github.com/luongthanhtung03/ckb-cycle-tools/actions/runs/38545115025) |
| **Commits** | 46 across three repositories |

---

## Goal for this week

Week 2 ended with both projects live on testnet. This week I wanted
outside eyes on the session lock, and to fix whatever they found before building
anything new on top of it. With the first plan built, I then rewrote
[`PLAN.md`](../PLAN.md) around five new pieces and started on them.

## What I did

### Reviews of the session lock, and the fixes

The lock holds funds, so I asked for review: two from the community (one from the
CrowdCell builder) and one adversarial review, run as a deliberate attempt to break it.
Each finding became a new rule in the lock, with CKB-VM tests that fail on the old
binary:

- **Error 16, no splitting.** The rate limit is per cell. A session key could send
  its change back as several cells and then spend all of them in one block. Now a
  session spend may return at most one cell to the session lock: cells merge, never
  multiply.
- **Error 17, the key cell may not grow.** With a recipient set, a leaked key could
  move money into its own key cell and pay anyone from there. Now outputs under the
  key's lock can hold no more than the key's inputs brought in.
- **Error 18, no type scripts.** A leaked key could give the change cell a type
  script it controls, and that script could later refuse every spend, the owner's
  sweep included, freezing the whole balance. Session cells now carry no type.

Fixes in the library from the same reviews: a payment transaction may carry only
one memo (one payment had been able to unlock several articles); the session key
is saved before the funding transaction is sent, so a closed tab never strands
funds; an owner lock that needs no signature (anyone-can-pay) is refused, since it
would give anyone owner mode.

Deployed code on CKB cannot change, so each fix meant a **redeploy** under a new
code hash. Older deployments stay in `TESTNET_LEGACY_DEPLOYMENTS`, so recovery still
finds sessions opened under them. `npm run smoke:lock` proved every rule on testnet,
the new ones included: the network rejected each attack with its error code.

I also added runnable examples and an [API reference](https://github.com/luongthanhtung03/ckb-session-kit/blob/main/docs/API.md)
with a test that fails if any export is missing from it.

### A new plan, and five new pieces

By 13 Oct everything the first plan scheduled up to Week 8 was built. I rewrote
the plan around five pieces people can see and use, and built them:

- **CKB Place** — a shared 32×32 pixel board. One wallet signature opens a session
  that can pay only the board; each batch of pixels is a 0.1 CKB-per-pixel payment
  signed by the session key, with the pixels in the payment's memo. The board is
  rebuilt from the chain, with no server and no database.
- **Pay-per-minute** — a player for generative Web Audio tracks. While it plays, the
  session key pays 0.5 CKB for the next minute; the server releases each minute
  only to the key that paid for it. Pause, and the payments stop.
- **Token sessions (xUDT)** — a session can hold a token as well as CKB. The lock
  caps token units per payment (error 20) the way it caps shannons, and tokens
  always come back as tokens. Because this changes a lock that holds funds, I wrote
  the threat model first, had it reviewed before any code, then had the code
  reviewed adversarially. No critical or high findings; every finding was fixed.
  The [/tokens](https://ckb-session-kit.vercel.app/tokens) page is pay-per-read in a
  demo token anyone can mint.
- **Cycles in the browser** — the cycle inspector now shows each script group's
  cycles in the page, by running ckb-debugger's WebAssembly build in a Web Worker.
  It gives the same numbers as the native debugger on every transaction I checked
  (15,675,038 · 2,607,561 · 1,787,335).
- **Cycle reports on pull requests** — `ckb-cycles report` and `diff`, and a GitHub
  Action that keeps one comment on a PR showing how each script's cycles changed,
  and above all whether an accept turned into a reject.

### Hardening

I ended the week with a hardening review of both libraries (session kit: 2 high,
4 medium, 6 low; cycle tools: 2 high, 4 medium) and fixed all of them. Examples:
the session kit now signs before it sends and sizes the key cell from the owner's
lock (JoyID and Omnilock cells need 63 CKB, not 61); the cycle tools read hardfork
epochs from the node, pin ckb-debugger's checksum, and use exit code 2 for
"environment error", so a CI gate cannot pass because a node was down.

## Evidence

| Item | Result | Link |
|---|---|---|
| Lock redeployed with errors 16–18 | Committed | [`0x37cf…b071`](https://testnet.explorer.nervos.org/transaction/0x37cfe04f64fd4dbec3803a972a51b7080f9ca1a3042535e97b7a756d0e03b071) |
| Lock with token sessions deployed | Committed | [`0xf309…77f2`](https://testnet.explorer.nervos.org/transaction/0xf3098bdb9a7bb1c500990be0f1159b7e66f507fef6b7a4f904046024284877f2) |
| Session key spends exactly its limit, current lock | Committed | [`0xe2fc…0a8b`](https://testnet.explorer.nervos.org/transaction/0xe2fced3a5d73059465f0b9400acdf0cba3fc27e441b82d1faebcbe44b1b20a8b) |
| Errors 12, 14, 16, 17, 18 rejected by the network, then owner sweep | Committed | [`0x8019…bae5`](https://testnet.explorer.nervos.org/transaction/0x8019404b3708050660b921201ec534cc7f20ef68fa1e836012d33f531066bae5) |
| CKB Place: 29 pixels, 2.9 CKB, no wallet | Committed | [`0x91ac…d0f5`](https://testnet.explorer.nervos.org/transaction/0x91acae7b00a0210e3779b76ec974395964ba65e7797780dd3a9d815e4245d0f5) |
| Pay-per-minute: minute 0, released to the payer | Committed | [`0x10df…55c7`](https://testnet.explorer.nervos.org/transaction/0x10df4596aaad21201c33784fb28387d8f129d4bcf546c6a54b49ea8cb48c55c7) |
| Token session: 3 units, no wallet | Committed | [`0xa8d1…4a88`](https://testnet.explorer.nervos.org/transaction/0xa8d1d98f8fd5b22cab9fd989b58a39995171e7099b1df5df46292c6ca8f94a88) |
| Token session: 11 units in a 10-unit session refused (code 20); 94 units swept back | Committed | [`0x798c…0a5d`](https://testnet.explorer.nervos.org/transaction/0x798c65c8ab49de39eb5aeb084c386f6ec1e1803e12636129ba73ace24b710a5d) |
| /tokens: 2 units for an article, released by the server | Committed | [`0x9a16…1dee`](https://testnet.explorer.nervos.org/transaction/0x9a16f6601309af1deec985c55a7537195047c28630d0cae719e8e8afc3d01dee) |
| Every other link | — | READMEs of [ckb-session-kit](https://github.com/luongthanhtung03/ckb-session-kit#readme) and [ckb-cycle-tools](https://github.com/luongthanhtung03/ckb-cycle-tools#readme) |
| CI, ckb-session-kit | Green: lock built and tested in CKB-VM, Linux + Windows, clean install | [run 38544798257](https://github.com/luongthanhtung03/ckb-session-kit/actions/runs/38544798257) |
| CI, ckb-cycle-tools | Green: live testnet replay, WASM replay, benchmark, clean install | [run 38545115025](https://github.com/luongthanhtung03/ckb-cycle-tools/actions/runs/38545115025) |
| Live demos | Deployed on Vercel | [place](https://ckb-session-kit.vercel.app/place) · [listen](https://ckb-session-kit.vercel.app/listen) · [tokens](https://ckb-session-kit.vercel.app/tokens) · [inspector](https://ckb-cycle-tools.vercel.app/) |

## What went wrong, and how I fixed it

**A per-cell rule is only as strong as the cell count.** The rate limit said "each
cell must age N blocks", and I had not noticed the key itself could create more
cells. The fix (error 16) was not a stronger rate limit but a rule that keeps the
cell count from growing.

**Deployed code cannot be patched.** On CKB, a fix to the lock is a new code hash,
and sessions under the old one keep the old rules. I redeployed, and kept every
earlier deployment in the library so their sessions can still be found and swept.
That needed about 5,400 testnet CKB at a time, more than my test key held, so I
topped it up from the faucet first.

**One payment, several articles.** The memo travels in a witness the session key
signs, but a transaction can have several witnesses. One transaction that paid the
creator once could carry memos for several articles. Now the server accepts a
payment only if it carries exactly one memo.

**A DAO withdrawal replayed 8,058 cycles short.** Nervos DAO reads the header of
the block its input was created in, and my replay did not provide it. Each input
now carries its block, and the DAO withdrawal matches the node exactly; CI checks it.

**Old transactions on the wrong VM.** A 2023 testnet transaction did not match the
node on today's CKB-VM. The replay now runs each `type` script on the VM version of
its block's epoch, using the hardfork schedule the node itself reports.

**A script's logs could fake its result.** The CLI read ckb-debugger's output, and a
script can print anything. Now only the debugger's final lines are read, and they
must agree with its exit code.

**The replay could not run in a browser.** It used Node built-ins. I split the pure
part (building the mock transaction, grouping, parsing) from the native runner, so
the same code runs with the WebAssembly debugger in the page.

## What I learned

Reviews found things my own tests could not, because my tests checked the rules I
had thought of. Each finding had the same shape: a leaked key does something
allowed one step at a time — split a cell, move money into its own cell, add a type
script — and the steps together break a rule. So now I ask of every rule what it
assumes about the rest of the transaction, and write a test for the attacker who
breaks that assumption.

Immutable code changes how you ship. A fix is not done when the test passes; it is
done when there is a new deployment, a way for old sessions to get out, and the
network itself has rejected the attack on testnet.

On the tools side: a measuring tool has to distrust what it measures. A script's
output, an old block's VM version, a node that reports zero cycles — each can make
a wrong number look right, and a wrong number is worse than none.

## Hours

| Mon | Tue | Wed | Thu | Fri | Sat |
|---|---|---|---|---|---|
| 2 | 3 | 2 | 0 | 0 | 3 |

## Next week

- Publish `ckb-session-kit` and `ckb-cycle-tools` to npm.
- Run the cycle-report Action on a real pull request and link its comment.
- Post the ckb-js-vm vs Rust cycle comparison on Nervos Talk.
- Prepare the cycle tools' Spark application.
