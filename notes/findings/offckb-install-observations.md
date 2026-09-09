# Findings from my first days of CKB tooling — 26–27 Aug 2026

Four things, all on Windows, all on the beginner path.

- **#1** and **#2** are OffCKB install issues. #1 is a name hazard, #2 is cosmetic.
- **#3** is not a CKB issue at all — I caused it myself — but it is the same
  hazard as #1, and it shows how another ecosystem already solved it. It belongs
  here as the argument for fixing #1.
- **#4** is the one I would fix first. It blocks every contract test on Windows,
  and the error message points the beginner at exactly the wrong conclusion.

I would like to send all of these to CKB DevRel.

---

## 1. The bare `offckb` name on npm is not the real package

The documented install command is:

```bash
npm install -g @offckb/cli
```

The CLI binary you then run is called `offckb`, so the natural guess for anyone
who has lost the docs tab is `npm install -g offckb`. That name **is** taken on
npm, but not by the Nervos tool:

```console
$ npm view offckb name version description homepage repository
name = 'offckb'
version = '1.0.0'
description = 'Placeholder package for offckb - reserved name'
homepage = 'https://github.com/yourusername/offckb-placeholder#readme'
repository = {
  type: 'git',
  url: 'git+https://github.com/yourusername/offckb-placeholder.git'
}
```

Compare the real one:

```console
$ npm view @offckb/cli name version description homepage repository
name = '@offckb/cli'
version = '0.4.13'
description = 'ckb development network for your first try'
homepage = 'https://github.com/ckb-devrel/offckb#readme'
repository = { url: 'git+https://github.com/ckb-devrel/offckb.git', type: 'git' }
```

So `offckb` is an unclaimed-name placeholder pointing at a `yourusername/`
template repository — not published by ckb-devrel.

**Why it matters.** Right now the package is inert, so the only cost is a
confused beginner wondering why `offckb --version` does not work. But the name
sits directly on the newcomer path for a developer tool that is run globally,
and whoever controls it can publish whatever they like to it later. Global
install plus a name people will guess is a combination worth closing off.

**Suggested fix.** Ask npm to transfer or dispute the `offckb` name to
ckb-devrel, or publish a real `offckb` package under the org that either aliases
`@offckb/cli` or prints "you probably want `npm install -g @offckb/cli`". Either
way the guessable name ends up owned by the project rather than by a stranger.

I want to be clear that I am not claiming this is currently malicious. It reads
like ordinary name reservation. It is the shape of the risk I am reporting, not
an incident.

---

## 2. Windows: a `MODULE_NOT_FOUND` object is printed during CPU detection

On first run, `offckb node` printed this before downloading the CKB binary:

```console
$ offckb node
The system cannot find the path specified.
CKB Binary not found, download and install the new version 0.208.0..
Failed to detect CPU features, using portable binary {"code":"MODULE_NOT_FOUND","requireStack":["C:\\Users\\Admin\\AppData\\Roaming\\npm\\node_modules\\@offckb\\cli\\build\\index.js"]}
downloading https://github.com/nervosnetwork/ckb/releases/download/v0.208.0/ckb_v0.208.0_x86_64-pc-windows-msvc.zip ..
CKB 0.208.0 installed successfully.
Launching CKB devnet Node...
CKB devnet is ready at http://127.0.0.1:8114.
```

Everything worked afterwards — the node started, mined, and accepted my
transaction. So this is cosmetic. But two parts of it look like failure to a
beginner:

- `The system cannot find the path specified.` with no context, as the very
  first line of output.
- A raw `MODULE_NOT_FOUND` require-stack dumped as JSON next to a "Failed to"
  message.

The CPU-feature detection appears to fall back to the portable binary correctly.
The bug is that the fallback reports itself like a crash.

**Suggested fix.** Catch the `MODULE_NOT_FOUND` case and log something like
`CPU feature detection unavailable on this platform, using the portable CKB
binary` at info level, without the require stack. It costs nothing and removes a
"did I break it?" moment on the most common beginner platform.

---

## 3. The same hazard, already solved: `npx tsc`

I did this to myself, and it is the reason I now think finding #1 is worth
fixing rather than just noting.

Taking screenshots for this report, I ran `npx tsc --noEmit` from the repository
root instead of from `exercises/transfer-ckb/`. There is no local TypeScript at
the root, so `npx` went to the registry, found a package literally named `tsc`,
and offered to install it:

```console
$ npx tsc --noEmit
Need to install the following packages:
tsc@2.0.4
Ok to proceed? (y) y

npm warn deprecated tsc@2.0.4: Package no longer supported.

                This is not the tsc command you are looking for

To get access to the TypeScript compiler, tsc, from the command line either:

- Use npm install typescript to first add TypeScript to your project before using npx
- Use yarn to avoid accidentally running code from un-installed packages
```

The structure is identical to the OffCKB case. The command you type is `tsc`, but
the package is `typescript`. So the guessable name is wrong, and people guess it.

What is interesting is what the owner of `tsc` did about it:

```console
$ npm view tsc description repository
description = 'A deprecated release of the TypeScript compiler'
repository = { url: 'git+https://github.com/basarat/tsc.git', type: 'git' }
```

Rather than leave the guessable name to a stranger, someone in that community
holds it and has turned it into a **signpost**. It does nothing except tell you
the correct package name. Note also the last line of its own output — *"Use yarn
to avoid accidentally running code from un-installed packages"* — which is the
package warning you about the exact class of risk it exists to neutralise.

**This is the fix I was reaching for in #1.** For CKB the equivalent would be
ckb-devrel owning `offckb` on npm and having it print "you probably want
`npm install -g @offckb/cli`". It costs one tiny publish, it removes a beginner
dead end, and it means the guessable entry point to a globally installed CKB tool
is owned by the project instead of by whoever registered it first.

For what it is worth, this was my own error and it cost me five minutes. But the
reason it only cost five minutes is that somebody had already thought about it.

---

## 4. Windows: `ckb-testtool` cannot find the `ckb-debugger` that offckb installed

This one is a real blocker rather than cosmetic, and it stops every contract test
on Windows.

`offckb create` installs the native debugger and reports success:

```console
✅ ckb-debugger shim updated: C:\Users\Admin\AppData\Roaming\npm\ckb-debugger.cmd
✅ ckb-debugger installed successfully at
   C:\Users\Admin\AppData\Local\offckb-nodejs\Data\tools\ckb-debugger.exe (version 1.1.1).
```

But every test then fails with:

```console
ckb-debugger not found. Please install it first:
https://github.com/nervosnetwork/ckb-standalone-debugger
    at Function.checkSpawnResult (node_modules/ckb-testtool/.../core.js:663:19)
```

**Why.** The real executable goes into offckb's own data directory, which is not
on `PATH`. What goes onto `PATH` is a `ckb-debugger.cmd` shim in the npm global
directory. `ckb-testtool` spawns `ckb-debugger` via `child_process` without a
shell, and Windows will not resolve a bare name to a `.cmd` file that way — that
resolution is a shell feature. So on Windows the shim is invisible to the very
tool it exists for.

Both halves are individually reasonable. The combination does not work.

**Workaround.** Put the directory holding the real `.exe` on `PATH` for the test
run. I did this as a jest `globalSetup` so `npm test` just works:
[`exercises/counter-script/tests/jest.setup.cjs`](../../exercises/counter-script/tests/jest.setup.cjs).

Worth noting that `setupFiles` does *not* work for this, which cost me a while.
It runs inside jest's per-file sandbox and the `PATH` change never reaches the
`spawnSync`. `globalSetup` runs in the parent process before the workers fork, so
they inherit it.

**Suggested fix**, either end:

- *offckb*: install the binary somewhere already on `PATH`, or write a real
  `.exe` shim rather than a `.cmd` one.
- *ckb-testtool*: on Windows, look in offckb's tools directory as a fallback, or
  spawn with `shell: true` so `.cmd` resolves, or honour an env var such as
  `CKB_DEBUGGER_PATH`.

The second is probably the better place — ckb-testtool already knows it needs
this binary, and it is the component producing the error message.

### Addendum, 9 Sep 2026 — this reproduces on the untouched template

When I first hit this I assumed I had misconfigured my own project. I had not.
`offckb create` scaffolds a project whose own test suite fails on Windows, with
no edits from me at all:

```console
$ offckb create quickstart-hello-world --language typescript
...
🎉 Project created successfully!
🔧 Checking the ckb-debugger installation...
✅ ckb-debugger shim updated: C:\Users\Admin\AppData\Roaming\npm\ckb-debugger.cmd
ckb-debugger 1.1.1 is already installed at ...\tools\ckb-debugger.exe.

$ npm run build
🎉 All contracts built successfully!

$ npm test
Test Suites: 1 failed, 1 passed, 2 total
Tests:       1 failed, 1 passed, 2 total
```

The devnet test passes. The mock test — the one that needs `ckb-debugger` — fails.

There are two layers to it:

1. **As shipped**, `tests/hello-world.mock.test.ts` calls
   `verifier.setWasmDebuggerEnabled(true)`, and that path fails with a bare
   `Transaction verification failed. See details above.` — no indication of what
   is actually wrong.
2. The template's own comment on that line says *"if you are using the native
   ckb-debugger, you can delete the following line."* Deleting it surfaces the
   real error instead — `checkSpawnResult`, which is finding #4: the native
   debugger is installed but not reachable by a bare-name spawn.

Applying the `globalSetup` PATH fix from
[`counter-script`](../../exercises/counter-script/tests/jest.setup.cjs) to the
generated project takes it to 2 passed / 2 total.

**Why this matters more than I first thought.** Deploying works fine out of the
box — `npm run build` and `npm run deploy` both succeed, and I have a
`hello-world` contract live on devnet. So a newcomer following the quick start
reaches a working deployment and *then* runs the tests the template told them to
run, and gets a failure with a misleading message. The first thing that breaks
is the first thing they did not write themselves, which is the worst possible
place for it.

I no longer think this is only a `ckb-testtool` issue. Whatever the fix, the
generated project should pass its own tests on a supported platform.


---

## Environment

| | |
|---|---|
| OS | Windows 10 Pro 19045 |
| Node | v22.16.0 |
| npm | 10.9.2 |
| `@offckb/cli` | 0.4.13 |
| CKB | 0.208.0 (`x86_64-pc-windows-msvc`, portable) |
| `ckb-debugger` | 1.1.1 |
| `ckb-testtool` | 1.0.5 |

## Status

- [ ] Sent to CKB DevRel / opened an issue on `ckb-devrel/offckb`
