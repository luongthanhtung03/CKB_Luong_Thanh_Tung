# Findings while installing OffCKB on Windows — 26 Aug 2026

Two things I hit on my first install. Neither blocked me, but both would confuse
a beginner, so I am writing them up to send to CKB DevRel.

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

## Environment

| | |
|---|---|
| OS | Windows 10 Pro 19045 |
| Node | v22.16.0 |
| npm | 10.9.2 |
| `@offckb/cli` | 0.4.13 |
| CKB | 0.208.0 (`x86_64-pc-windows-msvc`, portable) |

## Status

- [ ] Sent to CKB DevRel / opened an issue on `ckb-devrel/offckb`
