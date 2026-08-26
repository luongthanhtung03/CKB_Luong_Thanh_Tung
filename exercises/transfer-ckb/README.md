# Exercise — Transfer CKB, and read the transaction back

Week 1. The Handbook's first tutorial is Transfer CKB. I did the transfer with
the OffCKB CLI, then wrote a small TypeScript tool to read the resulting
transaction back off the chain and print its anatomy, because I wanted to check
the Cell Model claims against a transaction I had actually made.

## What it does

`src/inspect-tx.ts` takes a transaction hash, fetches it from a CKB node with
[CCC](https://docs.ckbccc.com/), resolves each input's previous output so the
input capacities are visible, and prints inputs, outputs, the implicit fee,
cell deps and witnesses.

## Run it

```bash
# terminal 1
offckb node

# terminal 2
cd exercises/transfer-ckb
npm install
npm run inspect                 # defaults to my week 1 transfer
npm run inspect -- 0x<txHash>   # or any other devnet tx
npm run typecheck               # tsc --noEmit, strict
```

`CKB_RPC_URL` overrides the endpoint (defaults to `http://127.0.0.1:8114`).

Devnet state does not survive `offckb clean`, so the default hash only resolves
against the devnet instance I created it on. Pass your own hash otherwise.

## Output

```
INPUTS (1) — Cells consumed and now dead
  [0] 0x1bb87da3…5b1bf7 #22  capacity 42,000,000.00000000 CKB

OUTPUTS (2) — new live Cells
  [0] capacity 1,000.00000000 CKB
       lock.args  0x758d311c8483e0602dfad7b69d9053e3f917457d
       type       null
       data       0 bytes
  [1] capacity 41,998,999.99999536 CKB
       lock.args  0x8e42b1999f265a0078503c4acec4d5e134534297
       type       null
       data       0 bytes

CAPACITY ACCOUNTING
  in        42,000,000.00000000 CKB
  out       41,999,999.99999536 CKB
  fee       0.00000464 CKB  (464 shannons)
```

Full run: [`evidence/week-01-inspect-tx.log`](../../evidence/week-01-inspect-tx.log).
Field-by-field write-up: [`notes/transaction-anatomy.md`](../../notes/transaction-anatomy.md).

## Notes for myself

- `ClientJsonRpc` is abstract in CCC 1.19. `ClientPublicTestnet` is the concrete
  client, and it takes a `url`, so it works against a devnet as long as you
  remember devnet uses testnet-style `ckt` addresses.
- An input carries only a pointer (`previous_output`), not a capacity. You have
  to resolve it — `input.completeExtraInfos(client)` does that.
- There is no fee field. The fee is inputs minus outputs.
- Capacities are `bigint` shannons. Do not convert to `number` before doing
  arithmetic, or you will lose the last digits of a 42-million-CKB Cell.
