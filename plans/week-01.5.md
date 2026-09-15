# Week 1.5 — Understand it, then go public

**Period:** Tue 15 – Sat 19 Sep 2026 · **Report:** Sat 19 Sep · **Budget:** ~12h
**Phase:** A — Understand it, and go public

> Planning happened on Tue 15 and the plan landed on Wed 16, so the working table
> below runs Wed–Sat. The reporting period stays Tue–Sat.

| Level | What ships |
|---|---|
| **Floor** | `orientation.md` written, and one testnet transfer with a public explorer link |
| **Target** | The table below, complete |
| **Stretch** | Store Data on Cell on testnet as well, with its own explorer link |

## Why this week looks like this

Two things are worth more than any new code right now. First, understanding what
CKB actually is — Week 1 produced working software, but built by following steps
rather than from a model of the system. Second, getting off devnet. Everything so
far lives on a local chain that vanishes and that nobody else can check. Testnet is
mostly a configuration change and it is the largest single jump in credibility
available.

## Days

| Day | Date | Study (≈1h) | Build (≈2h) | Done when |
|---|---|---|---|---|
| Wed | 16 Sep | [Nervos blockchain intro](https://docs.nervos.org/docs/ckb-fundamentals/nervos-blockchain), [How CKB works](https://docs.nervos.org/docs/getting-started/how-ckb-works), [Intro to Script](https://docs.nervos.org/docs/script/intro-to-script) | Read and correct `notes/orientation.md`; rewrite anything I cannot say in my own words | I can explain the Cell Model out loud, without notes, to someone who knows nothing |
| Thu | 17 Sep | [CKB Academy](https://academy.ckb.dev/courses) lessons 1–2 | Finish `notes/glossary.md`; skim all five beginner tutorials to see the shape of what is coming | No term in the handbook I cannot define in one line |
| Fri | 18 Sep 🔥 | Testnet vs devnet; the [faucet](https://faucet.nervos.org/); the explorer | Fund a testnet address, then [Transfer CKB](https://docs.nervos.org/docs/dapp/transfer-ckb) **on testnet** | A public explorer link to a transfer I signed myself |
| Sat | 19 Sep | — | Point `inspect-tx` at testnet RPC; **file the four findings**; write the report; update README and PLAN; push | Four issue URLs live in the report's evidence table |

🔥 **Friday is the hard day.** Not because the transfer is difficult — it is the
same code as Week 1 — but because everything around it is new: real network
latency, a faucet with rate limits, a config that has to point somewhere else, and
no reset button when something goes wrong.

## Saturday's first hour

The four findings in [`notes/findings/offckb-install-observations.md`](../notes/findings/offckb-install-observations.md)
are already written up with suggested fixes. One of them blocks every contract test
on Windows. The checkbox `[ ] Sent to CKB DevRel` is still unticked.

One hour turns private notes into public contributions with my name on them. It is
the highest-value hour in the entire twelve weeks, and it is sitting there for free.

- File #1, #2 and #4 as issues on the OffCKB repository (#4 with the
  `offckb create` reproduction from 9 Sep attached — it proves the bug is in the
  untouched template, not in my code).
- Post a short summary thread on [talk.nervos.org](https://talk.nervos.org) linking
  the issues.
- Tick the checkbox. Record the URLs.

## Before the first push

Testnet keys are real keys. `.gitignore` already covers `.env*`, `*.key`, `*.pem`,
`keystore/` and `wallets/`, but verify rather than assume:

```bash
git status --porcelain            # nothing unexpected staged
git ls-files | grep -Ei 'env|key|pem|wallet|keystore'   # must return nothing
```

## Evidence to capture

Screenshot the moment each command succeeds. Do not reconstruct on Saturday.

| File | What it shows |
|---|---|
| `screenshots/week-01.5/01-faucet.png` | Testnet tokens received |
| `screenshots/week-01.5/02-transfer-sent.png` | The transfer command succeeding |
| `screenshots/week-01.5/03-explorer.png` | The transaction on the public explorer |
| `screenshots/week-01.5/04-inspect-testnet.png` | `inspect-tx` reading a real testnet transaction |
| `screenshots/week-01.5/05-findings-filed.png` | The filed issues |
| `evidence/week-01.5-testnet-transfer.json` | Raw transaction JSON |
| `evidence/week-01.5-inspect-tx.log` | Inspector output |

## Reading

- [Introduction to Nervos CKB](https://docs.nervos.org/docs/ckb-fundamentals/nervos-blockchain)
- [How CKB works](https://docs.nervos.org/docs/getting-started/how-ckb-works)
- [Quick start](https://docs.nervos.org/docs/getting-started/quick-start) — the networks and RPC section
- [Introduction to Script](https://docs.nervos.org/docs/script/intro-to-script)
- [CKB Academy](https://academy.ckb.dev/courses) lessons 1 and 2
- [Transfer CKB](https://docs.nervos.org/docs/dapp/transfer-ckb)

## Next week

Week 2 answers, by hand, the two questions left open in `orientation.md`: how a
`ckt1…` address is derived from a lock script, and what is inside the 85 bytes of a
`WitnessArgs`.
