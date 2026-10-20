# Fact sheet — Week 3

Raw material for the weekly report. Facts and links only; the report itself is
written in my own words from this.

**Period:** 2026-10-11 to 2026-10-17 (Sunday 11 Oct included: after the Week 2 report).
All commits fell on Sun 11, Tue 13 and Wed 14 Oct. Work from 18 Oct on belongs to Week 4.

## Commits

| Repository | Commits | Range |
|---|---|---|
| ckb-session-kit | 28 | `62b5686..9820557` |
| ckb-cycle-tools | 17 | `c78f68e..2055f23` (+2 merges) |
| CKB_Luong_Thanh_Tung | 1 | `9f9adbf` (plan rewrite) |

## What was built (end-of-week state)

**ckb-session-kit**
- Review fixes in the lock, each with CKB-VM tests: error 16 no splitting (community
  review, 62b5686), 17 key cell may not grow with a recipient (CrowdCell review, d067dbb),
  18 no type scripts in session mode (adversarial review, f7e2cfd).
- Library fixes: one memo per payment tx (3220b41); key saved before funding, tabs
  cannot overwrite, recovery cannot be blocked (cf345d9); owner locks that need no
  signature refused (2f29149).
- Lock redeployed 13 Oct (errors 16–18), then again 14 Oct with token sessions; earlier
  deployments kept in `TESTNET_LEGACY_DEPLOYMENTS` so their sessions stay recoverable.
- Examples (node-quickstart, browser-session, paywall-server) + docs/API.md with a test
  that every export is documented (3fa1874).
- CKB Place `/place` (pixel board rebuilt from payment memos, no server).
- Pay-per-minute `/listen` (generative Web Audio, server releases a minute only to the payer).
- Token sessions (xUDT): design + threat model reviewed before code (45c76da), lock T1–T5
  (errors 19, 20), library, code review (no critical/high; all findings fixed), deployed,
  demo `/tokens` with a demo token anyone can mint.
- Hardening review (2H 4M 6L), all fixed (2356503, ecb1a83, 9820557).
- End state: lock 7.6 KB, 15,651 cycles per run (29,031 on a token spend), 57 CKB-VM
  tests, 271 tests total.

**ckb-cycle-tools**
- Header replay: Nervos DAO withdrawal now matches the node (was 8,058 cycles short) (c78f68e).
- Name your own scripts on the web page and CLI (da70f90).
- Replay on the VM version of the block's epoch; only ckb-debugger's own result lines are
  trusted (c1d5390); hardfork epochs from the node's `get_consensus` (b9de92f).
- Per-group cycles in the browser: ckb-debugger 0.200.1 WASM in a Web Worker; matches native
  on 15,675,038 / 2,607,561 / 1,787,335 (5e3f1f6).
- PR cycle reports: `report`, `diff`, `mock` subcommands, binary substitution, composite
  GitHub Action with a sticky comment, dogfood workflow (62b3941, a8c6943).
- Hardening review (2H 4M), all fixed: exit 2 for environment errors, diff gate gaps,
  own sticky comment only, ckb-debugger sha256 pinned, worker timeout. 126 tests.

**CKB_Luong_Thanh_Tung**
- PLAN.md rewritten 13 Oct: the first plan was built; five new pieces (9f9adbf).

## External evidence

| Kind | What | Link |
|---|---|---|
| Testnet tx | Lock redeployed with errors 16–18 (13 Oct) | https://testnet.explorer.nervos.org/transaction/0x37cfe04f64fd4dbec3803a972a51b7080f9ca1a3042535e97b7a756d0e03b071 |
| Testnet tx | Lock with token sessions deployed (14 Oct) | https://testnet.explorer.nervos.org/transaction/0xf3098bdb9a7bb1c500990be0f1159b7e66f507fef6b7a4f904046024284877f2 |
| Testnet tx | smoke:lock on the current lock: session key spends exactly max_per_tx | https://testnet.explorer.nervos.org/transaction/0xe2fced3a5d73059465f0b9400acdf0cba3fc27e441b82d1faebcbe44b1b20a8b |
| Testnet tx | smoke:lock: owner sweeps everything back (12, 14, 16, 17, 18 rejected on the way) | https://testnet.explorer.nervos.org/transaction/0x8019404b3708050660b921201ec534cc7f20ef68fa1e836012d33f531066bae5 |
| Testnet tx | Quickstart example: pay 61 CKB, no wallet | https://testnet.explorer.nervos.org/transaction/0x75e3673ce82d202dd76bd30903f199b83eddd0e4b2085fd45b2cd286cf27fea7 |
| Testnet tx | CKB Place: 29 pixels, 2.9 CKB, no wallet | https://testnet.explorer.nervos.org/transaction/0x91acae7b00a0210e3779b76ec974395964ba65e7797780dd3a9d815e4245d0f5 |
| Testnet tx | Pay-per-minute: minute 0 | https://testnet.explorer.nervos.org/transaction/0x10df4596aaad21201c33784fb28387d8f129d4bcf546c6a54b49ea8cb48c55c7 |
| Testnet tx | Token session: 3 units, no wallet | https://testnet.explorer.nervos.org/transaction/0xa8d1d98f8fd5b22cab9fd989b58a39995171e7099b1df5df46292c6ca8f94a88 |
| Testnet tx | Token session: 94 units swept back (11 units refused, code 20) | https://testnet.explorer.nervos.org/transaction/0x798c65c8ab49de39eb5aeb084c386f6ec1e1803e12636129ba73ace24b710a5d |
| Testnet tx | /tokens flow: 2 units for an article, released by the server | https://testnet.explorer.nervos.org/transaction/0x9a16f6601309af1deec985c55a7537195047c28630d0cae719e8e8afc3d01dee |
| CI run | ckb-session-kit at 9820557, green | https://github.com/luongthanhtung03/ckb-session-kit/actions/runs/38544798257 |
| CI run | ckb-cycle-tools at 2055f23, green | https://github.com/luongthanhtung03/ckb-cycle-tools/actions/runs/38545115025 |
| Deployed URL | CKB Place, pay-per-minute, token pay-per-read | https://ckb-session-kit.vercel.app/place · /listen · /tokens |
| Deployed URL | Per-group cycles in the browser | https://ckb-cycle-tools.vercel.app/ |
| Elsewhere | Community reviews (incl. CrowdCell builder) acted on | commit messages 62b5686, d067dbb |

## Problems hit

- Rate limit per cell defeated by splitting change → error 16.
- Leaked key could park funds in its key cell and pay anyone → error 17.
- Change given an attacker-controlled type could freeze the balance → error 18.
- One payment tx with several memos unlocked several articles → one memo per tx.
- Anyone-can-pay owner lock would give anyone owner mode → refused in openSession.
- Deployed code is immutable → every lock fix is a redeploy; legacy deployments kept for recovery.
- JoyID/Omnilock owner cells need 63 CKB; a 62 CKB key cell could not be returned → sized from owner lock.
- DAO withdrawal replay 8,058 cycles short (headers missing) → input headers replayed.
- 2023 txs mismatched on the current VM → VM version from the block's epoch.
- Script logs could fake ckb-debugger's result lines → only final lines read, cross-checked with exit code.
- Replay code used Node built-ins → split pure replay, so it runs in the browser.

## Hours

| Mon | Tue | Wed | Thu | Fri | Sat |
|---|---|---|---|---|---|
| ? | ? | ? | ? | ? | ? |

(Tung to fill. Commits: Sun 11, Tue 13, Wed 14 only.)

## Pair programming

Claude Code wrote most of the code and ran the testnet scripts, and several
Claude agents worked in parallel on separate branches (place, minute, browser
cycles, PR action) plus review agents (token design, token lock code, hardening).
Tung chose the five new pieces, approved the plan rewrite and the redeploys,
and claimed the testnet CKB for the redeploys from the faucet.
