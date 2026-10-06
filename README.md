# CKBuilder dev log — Luong Thanh Tung

My personal dev log for the [Community Keeps Building](https://nervoscatalyst.org/community-keeps-building)
Builders' track on Nervos CKB.

This repository records my learning and progress week by week, as required by the
CKBuilder Handbook reporting standards: one report per week, published
contemporaneously, with screenshots and evidence.

- **Participant:** Luong Thanh Tung
- **GitHub:** [@luongthanhtung03](https://github.com/luongthanhtung03)
- **Track:** Builders'
- **Start date:** 26 August 2026
- **Report day:** every **Saturday** *(moved from Tuesday in Week 1.5, to align with my contract start)*
- **Status:** in the cohort — contract signed, twelve-week programme running to 19 December 2026

New to CKB? [**notes/orientation.md**](notes/orientation.md) explains what this is,
from the ground up, assuming nothing.

## Weekly reports

| Week | Period | Report |
|---|---|---|
| 1 | 26–27 Aug 2026 | [week-01-report.md](reports/week-01-report.md) |
| 1.5 | 28 Sep – 3 Oct 2026 | [week-01.5-report.md](reports/week-01.5-report.md) |

## Where things are

| | |
|---|---|
| [PLAN.md](PLAN.md) | my twelve-week study and build plan |
| [plans/](plans/) | day-by-day plans, one file per week |
| [reports/](reports/) | weekly dev-log reports |
| [notes/orientation.md](notes/orientation.md) | what CKB is, in plain language |
| [notes/glossary.md](notes/glossary.md) | every term, one line each |
| [notes/](notes/) | my own notes on CKB concepts |
| [notes/findings/](notes/findings/) | issues I have found in CKB tooling |
| [docs/resources.md](docs/resources.md) | the handbook's links, grouped by level |
| [evidence/](evidence/) | command logs and raw transaction JSON |
| [exercises/](exercises/) | code — tutorials and my own Scripts |
| [screenshots/](screenshots/) | screenshot evidence, by week |

## Highlights so far

- **A Type Script of my own** — [counter](exercises/counter-script/), in
  TypeScript. It may only be created at zero and only incremented by one.
  23 tests pass, of which 18 assert *failure* and the specific error code.
  Deployed to devnet, and the chain refused both invalid transitions I threw at
  it.
- **A transaction inspector** — [transfer-ckb](exercises/transfer-ckb/), built
  with CCC, used to verify the Cell Model against a transfer I made myself
  rather than take it from the docs. Write-up:
  [annotated transaction](notes/transaction-anatomy.md).
- **Four tooling issues** found on the beginner path and written up with
  suggested fixes, one of which blocks every contract test on Windows:
  [findings](notes/findings/offckb-install-observations.md).
- **CI** runs the typecheck and the contract tests on a clean machine, so the
  claims in this log are checked rather than asserted:
  [ci.yml](.github/workflows/ci.yml).

## The standard I hold myself to

Every week produces at least one of: a **public testnet explorer link** to a
transaction I made, a **green CI run** re-proving a claim on a clean machine, a
**deployed URL** a stranger can open, or a **filed issue or pull request** in
someone else's repository.

Never a claim whose only evidence is a file in this repository.

## Running the code

Everything is TypeScript. Each exercise is self-contained:

```bash
offckb node                     # terminal 1

# terminal 2 — inspect a transaction
cd exercises/transfer-ckb
npm install && npm run typecheck && npm run inspect

# terminal 2 — build, test and deploy the counter Script
cd exercises/counter-script
npm install && npm run build
npx jest tests/counter.mock.test.ts   # no node needed
npm run deploy && npm test            # needs the devnet
```

No private keys, `.env` files, or keystores are committed to this repository. The
only keys referenced anywhere are the well-known prefunded OffCKB devnet
development keys, which hold no real value, and they are redacted in the logs.
