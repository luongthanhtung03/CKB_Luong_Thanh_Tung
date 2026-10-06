# Week 10 — The session library reaches v1.0

**Period:** Mon 30 Nov – Sat 5 Dec 2026 · **Report:** Sat 5 Dec · **Budget:** 48h
**Phase:** F — Capstone

| Level | What ships |
|---|---|
| **Floor** | The session library published and installable |
| **Target** | That, plus the capstone consuming it from the registry rather than a local path |
| **Stretch** | A second worked example, with a different wallet connector |

## Why this week looks like this

A library nobody but me can use is not a library, it is a subdirectory with extra
steps. This week is about making the session layer genuinely usable by someone who
has never seen the capstone.

**The test for that is mechanical:** the capstone switches to consuming the
**published package**, not a relative path. If that breaks, the library was not ready
— it was just the capstone's internals with a folder around them.

The other half of the week goes back into the capstone, folding the session work in
properly now that it lives behind a stable interface.

## Day shape

| Mon | Tue | Wed | Thu | Fri | Sat |
|---|---|---|---|---|---|
| Library API and docs | Standalone example | Publish | Capstone consumes it | Capstone integration | Report |

## What "publishable" means here

- An **installable package**, versioned, with a changelog.
- A **worked example that never mentions the capstone**. If the only way to
  understand the library is to read the capstone, the API is wrong.
- Documentation written for someone who has not read any of my other code.
- A README that says what it does *and what it deliberately does not do* — the
  security scope from Week 9 belongs here, prominently.
- Its own CI, green.

## Milestones

- ☐ The library is published and installable
- ☐ The capstone consumes it from the registry, not a local path
- ☐ A worked example that never references the capstone
- ☐ The security scope documented in the README
- ☐ Library CI green independently of the capstone's

## Evidence to capture

| File | What it shows |
|---|---|
| `screenshots/week-10/01-package-published.png` | The package on the registry |
| `screenshots/week-10/02-standalone-example.png` | The example running on its own |
| `screenshots/week-10/03-capstone-uses-published.png` | The capstone building against the published version |
| `screenshots/week-10/04-library-ci.png` | Library CI green |
| `evidence/week-10-example-run.log` | The standalone example running |

## Next week

v0.2 — device-loss recovery, and the last week of real build hours.
