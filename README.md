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
- **Report day:** every Tuesday
- **Status:** application submitted, awaiting confirmation of my place in the cohort

## Weekly reports

| Week | Period | Report |
|---|---|---|
| 1 | 26 Aug 2026 | [week-01-report.md](reports/week-01-report.md) |

## Where things are

| | |
|---|---|
| [PLAN.md](PLAN.md) | my eight-week study and build plan |
| [reports/](reports/) | weekly dev-log reports |
| [notes/](notes/) | my own notes on CKB concepts |
| [notes/findings/](notes/findings/) | issues I have found in CKB tooling |
| [evidence/](evidence/) | command logs and raw transaction JSON |
| [exercises/](exercises/) | code from the Handbook tutorials |
| [screenshots/](screenshots/) | screenshot evidence, by week |

## Highlights so far

- **Week 1** — local devnet running on CKB 0.208.0, first transfer committed on
  chain (`0x1888f04b…`), and a [TypeScript transaction inspector](exercises/transfer-ckb/)
  built with CCC to verify the Cell Model against a transaction I made myself.
  Write-up: [annotated transaction](notes/transaction-anatomy.md).
- Two issues found on the OffCKB beginner install path, written up with
  suggested fixes: [findings](notes/findings/offckb-install-observations.md).

## Running the code

Everything is TypeScript. Each exercise is self-contained:

```bash
offckb node                    # terminal 1

cd exercises/transfer-ckb      # terminal 2
npm install
npm run typecheck
npm run inspect
```

No private keys, `.env` files, or keystores are committed to this repository. The
only keys referenced anywhere are the well-known prefunded OffCKB devnet
development keys, which hold no real value, and they are redacted in the logs.
