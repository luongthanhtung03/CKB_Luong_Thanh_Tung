# Week 9 — Browser self-custody sessions

**Period:** Mon 23 – Sat 28 Nov 2026 · **Report:** Sat 28 Nov · **Budget:** 48h
**Phase:** F — Capstone

| Level | What ships |
|---|---|
| **Floor** | A browser session signs one payment with no wallet dialog |
| **Target** | A session that survives a reload, with key material provably never leaving the browser |
| **Stretch** | Session expiry and renewal, without interrupting a running call |

## Why this week looks like this

This is the heart of the capstone. Pay-per-call is unusable if every call opens a
wallet dialog — nobody is going to approve a signature a hundred times to read a
hundred API responses. The session is what makes the idea work at all, and it is also
the part I have never built before.

**Self-custody is the constraint that makes it interesting.** Handing the key to the
service would solve the UX problem instantly and destroy the point. The session key
has to live in the browser, be usable without interaction, and still be the user's
alone.

Three questions decide whether this works, and all three are Wednesday's:

- What exactly is the session key allowed to authorise, and what can it not do?
- Where does it live, and what clears it?
- If the page is hostile or compromised, what is the blast radius?

## Day shape

| Mon | Tue | Wed | Thu | Fri | Sat |
|---|---|---|---|---|---|
| Session creation | Signing without a dialog | 🔥 Scope and blast radius | Persistence across reload | Factor it out | Report |

🔥 Wednesday is the hard problem. It is a design question with security consequences
and no tutorial — the answer has to be reasoned about rather than looked up.

## Friday: factor it out

The session layer has nothing to do with API metering. It is a general problem —
any CKB application that wants to act repeatedly on a user's behalf in a browser has
it.

So on Friday it comes out of the capstone into its own package, with its own tests,
consumed by the capstone as a dependency. That is better engineering regardless, and
it is the difference between a feature and something reusable.

## Milestones

- ☐ A browser session signs a payment with no wallet interaction
- ☐ The session survives a page reload
- ☐ Session key material never leaves the browser, and I can demonstrate that
- ☐ The scope of what a session key can authorise is written down and enforced
- ☐ The session layer is a separate package with its own tests and CI

## Evidence to capture

| File | What it shows |
|---|---|
| `screenshots/week-09/01-session-created.png` | Session established |
| `screenshots/week-09/02-session-no-popup.png` | A payment signed with no wallet dialog |
| `screenshots/week-09/03-session-survives-reload.png` | Session persistence |
| `screenshots/week-09/04-session-scope-enforced.png` | An out-of-scope action, refused |
| `evidence/week-09-session-tests.log` | Session test output |

## Next week

The session library reaches v1.0, and the capstone consumes it as a published package.
