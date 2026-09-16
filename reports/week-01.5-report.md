# CKBuilder Weekly Report — Week 1.5

> ## ⚠ DRAFT — NOT YET TRUE
>
> This file is a **template filled with placeholders**, not a report. It was written
> ahead of the work. As of 16 September none of the following has happened: the
> testnet transaction, the inspector reading testnet, or the four findings being
> filed. Every `____` below is a claim with nothing behind it.
>
> It gets **rewritten on Saturday 19 September from evidence captured during the
> week**, and nothing in it is reconstructed afterwards. Do not publish, link or
> quote this file until that has happened.
>
> Check before publishing: `grep -n '0x____\|_____' reports/week-01.5-report.md`
> — it must return nothing.

---

**Participant:** Luong Thanh Tung ([@luongthanhtung03](https://github.com/luongthanhtung03))
**Track:** Builders'
**Reporting period:** 2026-09-15 to 2026-09-19
**Publication date:** 2026-09-19
**Commit:** `_____`

> **Note on scheduling.** My report day moves from Tuesday to **Saturday** from this
> week onward, to line up with the start of my contract. Every subsequent report
> will be published on a Saturday.

---

## This week in one table

| | |
|---|---|
| **Focus** | Writing my own orientation material, then moving all work onto public testnet |
| **First testnet transaction** | [`0x____`](https://testnet.explorer.nervos.org/transaction/0x____) |
| **Contributions filed** | 4 tooling findings sent to CKB DevRel |
| **New documents** | [orientation](../notes/orientation.md), [glossary](../notes/glossary.md), [12-week plan](../PLAN.md) |
| **Hours** | ~12 |

---

## Goal for this week

Two things. First, to write my own explanation of CKB from the ground up — the Cell
Model, scripts, and the verification-not-computation model — in language precise
enough that I could hand it to someone starting from nothing. Second, to move off
the local devnet and onto public testnet, so that from here on every claim in this
log carries a link anyone can check.

## What I did

<!-- Only things actually finished. Bullets. -->

- **Wrote [`notes/orientation.md`](../notes/orientation.md)** — my own explanation of
  CKB: the Cell Model, capacity as rented storage, transactions as destroy-and-create,
  lock scripts against type scripts, and the computation-off-chain /
  verification-on-chain model that the rest of the design follows from. Written
  under a rule that no term is used before it is defined.
- **Wrote [`notes/glossary.md`](../notes/glossary.md)** — every term I have met on
  CKB, one line each.
- **First transaction on public testnet** — _____
- **Pointed the transaction inspector at testnet** — the
  [inspector](../exercises/transfer-ckb/) built in Week 1 now reads live testnet
  transactions over RPC.
- **Filed four tooling findings with CKB DevRel** — _____
- **Published a [twelve-week plan](../PLAN.md)** with
  [day-by-day scheduling](../plans/) and a
  [skills matrix](../plans/skills-matrix.md).

## Commands and output

```bash
# the commands that mattered, with real output
```

## Evidence

| Item | Result | Link |
|---|---|---|
| Testnet CKB received from faucet | | |
| Transfer CKB on testnet | | |
| Inspector reading a testnet transaction | | |
| Finding #1 — `offckb` npm name | Filed | |
| Finding #2 — Windows CPU detect `MODULE_NOT_FOUND` | Filed | |
| Finding #4 — `ckb-debugger` `.cmd` shim, blocks all contract tests on Windows | Filed | |
| Orientation and glossary published | | |

## What went wrong, and how I fixed it

<!-- At least one real problem, why it happened, and the fix. -->

## What I learned

<!-- In my own words. -->

The idea that reframed everything else for me this week is that CKB does not
compute state — it verifies it. On a chain like Ethereum you submit a request and
the network works out the result. On CKB you work out the result yourself, write
down precisely which cells are destroyed and which are created, and the network's
only job is to run the attached scripts and decide whether you were allowed to.

That single distinction explains a string of things that had seemed arbitrary when
I met them in Week 1: why a script returns `0` or an error rather than a value; why
there is no fee field anywhere in a transaction, only the gap between input and
output capacity; why an indexer is necessary at all; and why payment channels fit
this architecture so naturally, which is the direction my capstone takes.

## Next week

Answer, by hand, the two questions I left open in the orientation document: how a
`ckt1…` address is derived from a lock script, and what is inside the 85 bytes of a
`WitnessArgs`. Target is a hand-written address codec whose output matches CCC byte
for byte. Plan: [`plans/week-02.md`](../plans/week-02.md).
