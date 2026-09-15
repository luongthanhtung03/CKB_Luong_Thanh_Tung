# Resources

**This is not the handbook.** It is my own index of the public links the handbook
points to, grouped by level, plus the RFCs and tools I have needed that it does not
list. The handbook itself is a cohort document that required a login to read, so it
is not republished here.

It exists so that the [day-by-day plans](../plans/) can link straight to a source
for every study item, without depending on a document I have to log in to open.

**Deprecated — ignore these wherever old tutorials mention them:** Lumos, Capsule.

## Start here

| | |
|---|---|
| [Introduction to Nervos CKB](https://docs.nervos.org/docs/ckb-fundamentals/nervos-blockchain) | Core concepts and terminology |
| [How CKB works](https://docs.nervos.org/docs/getting-started/how-ckb-works) | Getting started |
| [Quick start](https://docs.nervos.org/docs/getting-started/quick-start) | Environment setup, networks and RPCs |
| [Introduction to Script](https://docs.nervos.org/docs/script/intro-to-script) | Smart contracts on CKB |
| [CKB Academy](https://academy.ckb.dev/courses) | Lessons 1 and 2 |

Community-written:

- [Learning CKB — 24 lessons across 5 phases](https://website-sooty-chi-72.vercel.app/lessons) by Jnr.bit
- [Learn CKB in 45 minutes](https://github.com/truthixify/learn-ckb-in-45-minutes) by truthixify

My own: [orientation](../notes/orientation.md) · [glossary](../notes/glossary.md)

## Beginner

The five tutorials:

1. [Transfer CKB](https://docs.nervos.org/docs/dapp/transfer-ckb)
2. [Store Data on Cell](https://docs.nervos.org/docs/dapp/store-data-on-cell)
3. [Create Fungible Token](https://docs.nervos.org/docs/dapp/create-token)
4. [Create DOB](https://docs.nervos.org/docs/dapp/create-dob)
5. [Build a Simple Lock](https://docs.nervos.org/docs/dapp/simple-lock)

CCC — the main TypeScript toolkit:

| | |
|---|---|
| [CCC docs](https://docs.ckbccc.com/docs/CCC) | Common Chain Connector |
| [CCC App](https://docs.ckbccc.com/docs/ccc-app) | App integration |
| [CCC Playground](https://docs.ckbccc.com/docs/playground) | Test code in the browser |
| [Code examples](https://docs.ckbccc.com/docs/code-examples) | |
| [API reference](https://api.ckbccc.com/) | |

Also: [L1 developer course](https://nervos.gitbook.io/developer-training-course/lab-exercise-setup)
(ignore the Lumos and Capsule labs).

Other languages: [Rust SDK](https://docs.nervos.org/docs/sdk-and-devtool/rust) ·
[CKB-CLI](https://docs.nervos.org/docs/sdk-and-devtool/ckb-cli) ·
[Go](https://docs.nervos.org/docs/sdk-and-devtool/go) ·
[Java](https://docs.nervos.org/docs/sdk-and-devtool/java)

## Tools

| | |
|---|---|
| [OffCKB](https://docs.nervos.org/docs/sdk-and-devtool/offckb) | Local devnet and project templates |
| [Testnet faucet](https://faucet.nervos.org/) | Free testnet CKB |
| [Testnet explorer](https://testnet.explorer.nervos.org/) | Public transaction proof |
| [CKB Debugger](https://github.com/nervosnetwork/ckb-standalone-debugger) | Run scripts standalone, read cycles |
| [CKB Tools](https://ckb.tools/) | Address and hash utilities |
| [CKB AI MCP](https://ckb-ai.ckbdev.com/) | CKB context for AI tooling |

## Intermediate

Script development course:

| | | | |
|---|---|---|---|
| [1 — Validation Model](https://docs.nervos.org/docs/script-course/intro-to-script-1) | [2 — Script Basics](https://docs.nervos.org/docs/script-course/intro-to-script-2) | [3 — UDT](https://docs.nervos.org/docs/script-course/intro-to-script-3) | [4 — WebAssembly](https://docs.nervos.org/docs/script-course/intro-to-script-4) |
| [5 — Debugging](https://docs.nervos.org/docs/script-course/intro-to-script-5) | [6 — Type ID](https://docs.nervos.org/docs/script-course/intro-to-script-6) | [7 — Duktape Examples](https://docs.nervos.org/docs/script-course/intro-to-script-7) | [8 — Performant WASM](https://docs.nervos.org/docs/script-course/intro-to-script-8) |
| [9 — Cycle Reductions](https://docs.nervos.org/docs/script-course/intro-to-script-9) | [10 — Language Choices](https://docs.nervos.org/docs/script-course/intro-to-script-10) | | |

- [Rust scripting](https://docs.nervos.org/docs/script/rust/rust-quick-start) · [JS scripting](https://docs.nervos.org/docs/script/js/js-quick-start)
- [Ecosystem scripts and libraries](https://docs.nervos.org/docs/ecosystem-scripts/introduction)
- [Molecule and serialization](https://docs.nervos.org/docs/serialization/serialization-molecule-in-ckb)

Tokens and assets:

- sUDT: [standard](https://docs-xi-two.vercel.app/docs/rfcs/0025-simple-udt/0025-simple-udt) · [tutorial](https://github.com/nervosnetwork/ckb-cli/wiki/UDT-%28sudt%29-Operations-Tutorial)
- xUDT: [introduction](https://docs.nervos.org/docs/tech-explanation/xudt) · [how it works](https://docs.nervos.org/docs/ecosystem-scripts/xudt#how-xudt-works) · [RFC 0052](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0052-extensible-udt/0052-extensible-udt.md)
- Spore / DOB: [introduction](https://docs.nervos.org/docs/tech-explanation/spore-protocol) · [docs](https://docs.spore.pro/) · [cookbook](https://github.com/sporeprotocol/dob-cookbook) · [decoder server](https://github.com/sporeprotocol/dob-decoder-standalone-server)
- Nervos DAO: [RFC 0023](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0023-dao-deposit-withdraw/0023-dao-deposit-withdraw.md) · [source](https://github.com/nervosnetwork/ckb-system-scripts/blob/master/c/dao.c) · [NervDAO](https://github.com/ckb-devrel/nervdao)

## Payment channels — my capstone area

| | |
|---|---|
| [Fiber Network](https://www.fiber.world/) | Lightning-compatible channels on CKB |
| [Fiber documentation](https://www.fiber.world/docs) | |
| [Fiber showcase](https://www.fiber.world/showcase) | Open-source community projects |
| [Perun](https://github.com/perun-network/perun-ckb-contract) | The other channel system on CKB |
| [2026 opportunity map](https://talk.nervos.org/t/ai-machine-payments-and-fiber-in-2026-an-opportunity-map-for-ckb-and-fiber-developers/10665) | Where the demand is — RCS, BSS, PCO, LFB |

## Advanced

- **SSRI**: [introduction](https://talk.nervos.org/t/en-cn-script-sourced-rich-information-script/8256/2) · [SDK](https://crates.io/crates/ckb-ssri-std) · [docs](https://docs.rs/ckb-ssri-std/0.0.1/ckb_ssri_std/) · [server](https://github.com/ckb-devrel/ssri-server) · [Pausable UDT](https://github.com/Alive24/pausable-udt)
- **RGB++**: [introduction](https://rgbpp.com/docs/introduction) · [light paper](https://talk.nervos.org/t/rgb-protocol-light-paper-translation/7790) · [resources](https://rgbpp.com/docs/resources) · [SDK](https://github.com/ckb-devrel/ccc/tree/rgbpp-sdk) · [explorer](https://explorer.rgbpp.io/en)
- **iCKB**: [whitepaper](https://ickb.org/) · [GitHub](https://github.com/ickb/) · [SDK](https://github.com/ickb/sdk) · [deep dive](https://www.nervos.org/knowledge-base/Unlocking_CKB_Liquidity_iCKB)

## Specifications

[nervosnetwork/rfcs](https://github.com/nervosnetwork/rfcs) — the ones I have needed:

| RFC | Subject |
|---|---|
| [0021](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0021-ckb-address-format/0021-ckb-address-format.md) | Address format |
| [0022](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0022-transaction-structure/0022-transaction-structure.md) | Transaction structure |
| [0023](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0023-dao-deposit-withdraw/0023-dao-deposit-withdraw.md) | Nervos DAO |
| [0025](https://docs-xi-two.vercel.app/docs/rfcs/0025-simple-udt/0025-simple-udt) | sUDT |
| [0052](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0052-extensible-udt/0052-extensible-udt.md) | xUDT |

## Background reading

- [Nervos Nation videos](https://www.youtube.com/c/NervosNation)
- [Overview of a layered blockchain](https://www.nervos.org/knowledge-base/nervos_overview_of_a_layered_blockchain)
- [Understanding our ethos](https://www.nervos.org/knowledge-base/ckb_understanding_our_ethos)
- [Tokenomics of Nervos Network](https://www.nervos.org/knowledge-base/tokenomics_of_nervos_network)
- [The future of onboarding](https://www.nervos.org/knowledge-base/account_abstraction_where_were_going)
- [A blockchain developer's dream](https://www.nervos.org/knowledge-base/ckb_blockchain_developers_dream)
- [Bitcoin vs CKB security models](https://www.nervos.org/knowledge-base/bitcoin_and_ckb_security_models)
- [Web5: extra decentralized](https://www.nervos.org/knowledge-base/web5-extra-decentralized)
- [Comparing blockchain VMs](https://www.nervos.org/knowledge-base/comparing_blockchain_virtual_machines)

## Programme

- [Community Keeps Building](https://nervoscatalyst.org/community-keeps-building)
- [CKB AI scholarship](https://nervoscatalyst.org/ckb-ai-scholarship.html)
- [Spark programme](https://talk.nervos.org/t/ckb-eco-fund-spark-program-mini-grant-initiative/8752)
- [CKB Community Fund DAO](https://talk.nervos.org/t/ckb-community-fund-dao-willing-to-back-every-ckb-buidler-up)
- [talk.nervos.org](https://talk.nervos.org)
