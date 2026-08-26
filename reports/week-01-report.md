# CKBuilder Weekly Report — Week 1

**Participant:** Luong Thanh Tung
**GitHub:** [@luongthanhtung03](https://github.com/luongthanhtung03)
**Reporting period:** 26 August – 1 September 2026
**Publication date:** 1 September 2026
**Status:** application submitted, awaiting confirmation of my place in the cohort

## Goal for this week

Set up my dev log the way the Handbook requires, read the Handbook end to end so
I understand what the programme expects, and get my local CKB development
environment ready so that Week 2 can be spent on the actual tutorials rather
than on tooling.

## What I did

- Read the CKBuilder Handbook in full, including the reporting standards and the
  Introduction section links.
- Created this repository as my personal CKBuilder dev log, following the
  structure the Handbook asks for: weekly reports, screenshots as evidence, and
  notes in my own words.
- Wrote an eight-week study and build plan ([PLAN.md](../PLAN.md)) that maps the
  Handbook's Introduction → Beginner → application phases onto a 4–5 hour weekly
  commitment, and fixed Tuesday as my report day.
- Added a `.gitignore` that excludes `.env`, private keys, and keystore files, so
  I do not leak secrets as the repository grows.
- Confirmed my base toolchain: Node.js v22.16.0, npm 10.9.2, git 2.49.0.
- Started my first concept notes on the Cell Model
  ([notes/cell-model.md](../notes/cell-model.md)).

## Commands and output

```bash
$ node -v
v22.16.0

$ npm -v
10.9.2

$ git --version
git version 2.49.0.windows.1
```

## Evidence

| Item | Result | Link |
|---|---|---|
| Dev-log repository created | Done | this repository |
| Eight-week plan | Done | [PLAN.md](../PLAN.md) |
| Weekly report template | Done | [week-template.md](week-template.md) |
| Cell Model notes started | In progress | [notes/cell-model.md](../notes/cell-model.md) |
| OffCKB devnet running | Not yet — planned for Week 2 | — |

<!-- TODO before publishing: take a screenshot of your terminal showing the
     node / npm / git versions, save it as screenshots/week-01/01-toolchain.png,
     and add a row for it in the table above. -->

## What went wrong, and how I fixed it

Nothing broke technically this week, because I deliberately did not start the
tutorials yet. The real difficulty was working out the right order to learn
things in. The Handbook lists a lot of material — CCC, the script course, sUDT
and xUDT, Spore, SSRI, RGB++, Fiber — and my first instinct was to open all of
it at once. Looking at another cohort member's dev log helped me see that the
people who make progress pick one thing per week and finish it with evidence,
rather than reading broadly. So I wrote the plan first and closed the other tabs.

The second thing I resolved was a process question rather than a technical one.
The Handbook says reports must be contemporaneous and that reimbursement is
pro-rata against the log, so the habit matters more than the volume. I set up the
template and fixed my report day now, in Week 1, rather than improvising later.

## What I learned

- CKB does not have accounts holding balances. State lives in **Cells**, and a
  transaction consumes input Cells and creates output Cells rather than mutating
  anything in place. This is closer to Bitcoin's UTXO model than to Ethereum's
  account model.
- A Cell's **capacity** is both its CKByte balance and its storage limit — the
  Cell cannot hold more bytes than its capacity allows. Storage and money are the
  same resource, which is a design decision I had not come across before.
- Every Cell has a **Lock Script** (who is allowed to consume this Cell) and
  optionally a **Type Script** (what rules any transaction touching this Cell
  must satisfy). Authorisation and application logic are deliberately separated.
- Scripts on CKB do not compute new state. They **validate** a transaction that
  someone else has already assembled off-chain, and either accept or reject it.
- CKB-VM runs RISC-V, which is why scripts can be written in Rust, C, or even
  JavaScript rather than in a chain-specific language.

I want to be honest that these are things I have read and can restate, not things
I have yet proven to myself by running code. Verifying them on a real devnet is
exactly what Week 2 is for.

## Next week

Install OffCKB, run a local devnet, and complete the **Transfer CKB** and
**Store Data on Cell** tutorials — on the devnet first and then on testnet — so
that the Week 2 report contains real transaction hashes and explorer links.

## Note to the programme director

I submitted my application and have not had a confirmation yet, but I understood
from a fellow cohort member that I could begin working through the first steps of
the guidance in the meantime. So I have started, and I am publishing this Week 1
report on schedule. I would be grateful for confirmation of my place in the
cohort when you have a moment, so that I know my reports are being counted from
this week onwards.
