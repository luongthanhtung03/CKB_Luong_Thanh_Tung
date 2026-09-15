# Week 11 — Capstone v0.2: browser self-custody sessions

**Period:** Mon 23 – Sat 28 Nov 2026 · **Report:** Sat 28 Nov · **Budget:** 18h
**Phase:** E — Capstone

| Level | What ships |
|---|---|
| **Floor** | The Week 10 flow driven from a browser page rather than a script |
| **Target** | A self-custody session: unlock, spend, resume — no account, no server-held key. CI green |
| **Stretch** | **Post #3** on talk.nervos.org — the Fiber integration writeup |

## Why this week looks like this

Week 10 proved the mechanism with a script. This week makes it something a person
could actually use — and it is the half the opportunity map calls *Browser
Self-Custody Sessions*, listing it among the things to validate next, with the
recovery question still open.

The honest version of this is worth more than a polished one that hides the hard
part. The recovery story gets documented as it really is, including what does not
work yet.

## Days

> From Week 10 the **Study** column becomes **Focus**. By this point the reading is
> done and the work is building: no new sources, all three hours on the capstone.
> Anything still needed is looked up as it comes up, from the Reading sections of
> Weeks 8 and 9.

| Day | Date | Focus | Build | Done when |
|---|---|---|---|---|
| Mon | 23 Nov | Key derivation in the browser | Derive a session key from a passkey or passphrase; never send it anywhere | The key never leaves the device, and I can show that |
| Tue | 24 Nov | Session opening | Open and fund a session from the page | A session opened in the browser, funding visible on the explorer |
| Wed | 25 Nov | Reusable state | Persist session state; resume after a page reload | A reload resumes mid-session without re-funding |
| Thu | 26 Nov 🔥 | Recovery | What happens on device loss, cleared storage, upgrade mid-session | Each case either recovers, or fails safely and says so plainly |
| Fri | 27 Nov | Hardening | Full test suite; CI green on a clean machine; failure paths from Week 9 re-checked in the browser | CI green, every invariant covered |
| Sat | 28 Nov | — | Report; **Post #3**; push | Report published |

🔥 Thursday is the hard day and there is no clean answer to it — the opportunity map
says so itself. Document what the system does in each case, honestly. "Funds are
recoverable by closing the channel from the counterparty side, but the session
cannot be resumed" is a real engineering answer. Pretending the case does not exist
is not.

## What "self-custody" has to mean here

- The session key is derived on the device and never transmitted.
- The server cannot spend the session's funds, only claim what was paid to it.
- Closing the channel does not require the server to cooperate.

If any of these is not true in the implementation, the README says so. An accurate
limitation reads better than an overstated claim, and it is the kind of thing a
reviewer checks.

## Post #3

The Fiber integration writeup: what it takes to drive Fiber from TypeScript, what
the documentation does not yet cover, and what I got wrong on the way. Link the
findings filed along the way.

## Evidence to capture

| File | What it shows |
|---|---|
| `screenshots/week-11/01-session-open.png` | Session opened from the browser |
| `screenshots/week-11/02-paying.png` | Calls paid from the page |
| `screenshots/week-11/03-resume.png` | Session resumed after reload |
| `screenshots/week-11/04-recovery.png` | A recovery case handled |
| `screenshots/week-11/05-ci-green.png` | CI green on a clean machine |
| `evidence/week-11-session-lifecycle.json` | Full session, open to close |

## Next week

Ship it. Public deploy, a README a stranger can follow, and the retrospective.
