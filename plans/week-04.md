# Week 4 — The front end

**Period:** Mon 5 – Sat 10 Oct 2026 · **Report:** Sat 10 Oct · **Budget:** 18h
**Phase:** B — Build with CCC and ship a dApp

| Level | What ships |
|---|---|
| **Floor** | A local page that connects a wallet and shows a balance |
| **Target** | A **deployed public URL**: connect wallet, see balance and cells, send CKB, move my token |
| **Stretch** | **Post #1** on talk.nervos.org — the Windows contract-testing setup that blocked me in Week 1 |

## Why this week looks like this

Everything so far runs in a terminal. A terminal proves competence to me; a URL
proves it to everybody else. This is the first artifact I can put in front of a
person who will never clone a repository — which includes, eventually, an
interviewer.

## Days

| Day | Date | Study (≈1h) | Build (≈2h) | Done when |
|---|---|---|---|---|
| Mon | 5 Oct | [CCC App](https://docs.ckbccc.com/docs/ccc-app), the connector and wallet support | Scaffold the app; wire up wallet connect | A real wallet connects and the page shows my address |
| Tue | 6 Oct | Signers in the browser vs a private key in Node | Balance and live-cell list, read from the indexer | The page shows the same numbers the explorer does |
| Wed | 7 Oct | Transaction building in the browser | Send CKB from the UI on testnet | A transfer signed in the browser, live on the explorer |
| Thu | 8 Oct 🔥 | — | Show and transfer my Week 3 token from the UI | Token balance and a token transfer, both from the page |
| Fri | 9 Oct | — | Deploy publicly; write a README a stranger can follow; handle the empty-wallet and wrong-network cases | Someone else opens the URL and it works without me present |
| Sat | 10 Oct | — | Report; **Post #1**; push | Report published, post linked |

🔥 Thursday is the hard day. Displaying a token means reading cells filtered by
type script and decoding the amount yourself — the UI does not do it for you.

## The bar for "deployed"

Not "runs on my machine". Someone who has never seen the project opens the link on
their own device, connects their own wallet, and moves testnet CKB — with no
instructions from me beyond what is on the page. Test this on a phone.

## Reading

| Day | Study item | Where |
|---|---|---|
| Mon | The connector and wallet support | [CCC App](https://docs.ckbccc.com/docs/ccc-app) · [Code examples](https://docs.ckbccc.com/docs/code-examples) |
| Tue | Signers in the browser vs a key in Node | [CCC API](https://api.ckbccc.com/) — the `Signer` classes · [CCC docs](https://docs.ckbccc.com/docs/CCC) |
| Wed | Transaction building in the browser | [Code examples](https://docs.ckbccc.com/docs/code-examples) · [Playground](https://docs.ckbccc.com/docs/playground) |

Thursday and Friday are marked `—` because they build on Monday–Wednesday's
reading. All three hours go into the code.

## Rust drip

- Rust Book chapters 4–6: **ownership**, borrowing, structs, enums
- Rustlings: `move_semantics`, `structs`, `enums`
- Chapter 4 is the one that matters. Expect it to be slow, and let it be slow.

## Post #1

The four findings are filed as issues by now. A post is different: it is the guide
that did not exist when I needed it. Working title — *"Getting CKB contract tests
running on Windows"*. Concrete, reproducible, and aimed at the next person who hits
the `.cmd` shim problem.

## Evidence to capture

| File | What it shows |
|---|---|
| `screenshots/week-04/01-wallet-connected.png` | Wallet connected in the browser |
| `screenshots/week-04/02-balance.png` | Balance and cell list |
| `screenshots/week-04/03-send-ckb.png` | Transfer signed from the UI |
| `screenshots/week-04/04-token-ui.png` | Token balance and transfer |
| `screenshots/week-04/05-deployed.png` | The live public URL |
| `evidence/week-04-ui-transfer.json` | Raw transaction from the UI |

## Next week

Digital objects, and then Rust in earnest.
