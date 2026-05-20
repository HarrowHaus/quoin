# Consolidation 2 Proposal — Type-scale tokens single source

**Phase 22 / Unification Audit · Consolidation 2**
**Status: HALTED at proposal phase — operator decision required on the blocking question (Section 2 below). All other questions have automatic resolutions per the extended-run brief, queued behind the blocker.**
**Author: Claude Code (Opus 4.7) · 2026-05-19**
**Reference audit:** `02_reference-packs/CONSOLIDATION-2-AUDIT.md`

---

## 1. Why this proposal halts before implementation

The operator's extended-run brief locked Q1–Q5 to enable autonomous execution of Consolidation 2, with one explicit hard-halt condition:

> *"Audit phase reveals specimens use genuinely different font families (not just different size values) → halt at proposal, surface the divergence for operator decision on whether tokens-baseline should standardize or whether specimens were intentionally diverse."*

That condition fired. **0 of 22 specimens reference baseline fonts. Specimens use Inter + JetBrains Mono unanimously; baseline declares Ranade + Junicode + Monaspace Neon.** This is the blocker.

Per the brief: "DO NOT halt to confirm" Q1–Q5; but DO halt if the listed hard-halt conditions trigger. This one triggered. No implementation runs until the operator chooses a resolution for the font-family question.

The remaining type-scale / weight / leading / tracking questions DO have automatic Q3/Q4/Q5 resolutions and are documented below — but they are queued behind the blocker, because the font-family decision may affect their interpretation (e.g., if specimens revert to baseline fonts, some specimen-side overrides become irrelevant).

## 2. The blocking decision — font-family (operator must resolve)

| | Specimens (22/22 unanimous) | tokens-baseline (the spec as shipped) |
|---|---|---|
| `--font-sans` | `'Inter Variable', 'Inter', system-ui, sans-serif` | `'Ranade Variable', 'Ranade', ui-sans-serif, system-ui, …` |
| `--font-display` | `'Inter Variable', 'Inter', system-ui, sans-serif` (same as sans) | `'Junicode 2', 'Junicode', ui-serif, Georgia, …` |
| `--font-mono` | `'JetBrains Mono Variable', 'JetBrains Mono', ui-monospace, monospace` | `'Monaspace Neon Var', 'Monaspace Neon', ui-monospace, …` |
| Delivery | Google Fonts CDN (`<link rel="stylesheet" href="fonts.googleapis.com/css2?…">` in every specimen) | Implies self-hosted licensed files (Junicode 2 is SIL OFL; Ranade is ITF freebie; Monaspace is SIL OFL) |
| Aesthetic | Modern web-development (Inter = the Inter-era default) | Editorial / typographic-craft ("a typesetter's discipline for the application web" per dossier §3.11) |

### Possible operator resolutions

1. **Option A — Specimens win.** Update baseline to Inter + JetBrains Mono. Concedes the dossier's "typesetter's discipline" positioning in favour of operational simplicity (CDN delivery, modern web default).

2. **Option B — Baseline wins.** Update specimens to Ranade + Junicode + Monaspace. Requires every specimen to either bundle @font-face declarations or to load from a Quoin-hosted CDN (which does not yet exist). Editorial aesthetic preserved.

3. **Option C — Both, with explicit roles (Claude Code's recommendation; flagged per "flag-and-continue").** Baseline keeps Ranade/Junicode/Monaspace as the canonical type vocabulary. Specimens explicitly use Inter as a "render-anywhere" override for documentation purposes. The spec documents this as the canonical pattern: framework declares vocabulary; brand layer (theme packs) swaps the actual face. Specimens override the vocabulary via inline `:root` per the existing post-bootstrap convention — adding an explicit `<!-- specimen-only Inter override; production swaps via theme pack -->` comment to make the intent legible.

4. **Option D — None of the above.** Operator surfaces a different resolution.

**Claude Code recommends Option C** because:
- It preserves the dossier-locked editorial positioning.
- It matches how design systems typically separate type-vocabulary contracts from brand-face delivery.
- It requires the smallest behavioral change (specimens already work; baseline's intentional fonts stay).
- It documents the existing reality cleanly rather than concealing it.

But this is operator territory — recommendation is non-binding per the brief.

## 3. Automatic resolutions queued behind the blocker

These would execute autonomously once the font-family decision is locked, per Q3/Q4/Q5 of the extended-run brief:

### 3.1 Type-size (xl / 2xl / 3xl / 4xl) — auto-resolution per Q3

Per Q3 ("dominant convention across 18+ of 22 = canonical"), the following changes to `tokens-baseline` apply:

| Token | Current baseline | Auto-resolution | # specimens supporting |
|---|---|---|---|
| `--type-size-xl` | 1.25rem | **1.5rem** | 22 / 22 |
| `--type-size-2xl` | 1.5rem | **2rem** | 20 / 22 |
| `--type-size-3xl` | 1.875rem | **2.5rem** | 20 / 22 |
| `--type-size-4xl` | 2.25rem | **3.5rem** | 13 of 22 declare (the other 9 simply don't use the token; majority of those who declare it pick 3.5rem) |

Tokens unchanged: `--type-size-xs / sm / md / lg / 5xl / display` — specimens already match baseline.

### 3.2 Tracking-tight (split convergence) — FLAGGED FOR OPERATOR REVIEW

Specimens split 15 (-0.01em) vs 7 (-0.02em, matches baseline). **Q4 majority threshold (18) not met.** Per the brief's flag-and-continue protocol this is logged for operator decision but does not block execution; default would be **Option α** (baseline wins) since no clear specimen majority exists.

### 3.3 Tracking-wide — FLAGGED FOR OPERATOR REVIEW

Specimens: 16 of 22 use 0.08em; baseline says 0.05em. **Q4 majority threshold (18) not met (16 < 18).** Closer to majority than tracking-tight, but still below threshold. Default per Option α: baseline wins.

### 3.4 Leading-prose — auto-resolution per Q4 (majority met)

20 / 22 specimens use 1.55; baseline says 1.6. Q4 majority threshold met. Auto-resolution: **baseline updates to 1.55.** (This is the inverse direction from Consolidation 1's spacing — there, baseline was right and specimens were wrong. Here, specimens are right and baseline is wrong, per Q4's "dominant convention" rule.)

### 3.5 Leading-display orphan — auto-resolution per Q5

18 / 22 specimens declare `--leading-display: 1.05`. Not in baseline. Per Q5 (parallel to `--space-section` in Consolidation 1), **add `--leading-display: 1.05` to tokens-baseline.**

### 3.6 Font-weight — no drift

No changes.

## 4. Implementation plan (queued behind blocker)

Once font-family resolution is operator-locked, the implementation would proceed identically to Consolidation 1:

1. **tokens-baseline updates** — apply automatic resolutions (3.1, 3.4, 3.5). Add operator's font-family decision (3 options pending). Apply flagged-token decisions (3.2, 3.3) per operator's pick.
2. **5 batches of 5 specimens** — same ordering as Consolidation 1 (button-system / testimonial / feature-grid / footer-mega / empty-state first; data-table / nav-app-chrome / heroes later).
3. **Per-batch verification** — full validator suite + 2-pattern spot-check (per Q2 extended-run brief).
4. **Closing batch** — extend bootstrap-integrity gate with a `TYPOGRAPHY_VALUE_CONTRACT` (parallel to Consolidation 1's `SPACING_VALUE_CONTRACT`). Cover type-size, font-weight, leading, tracking values. Smoke-test with bad input.
5. **Final report.**

Estimated scope (assuming font-family resolution is Option C — smallest change): tokens-baseline edits ~10 lines (+leading-display, type-size xl/2xl/3xl/4xl bumps, leading-prose 1.55, font-family override comment); specimen edits per file similar to Consolidation 1 batch sizes; gate extension ~30 lines of new contract + check logic.

If resolution is Option A or B, implementation scope changes significantly.

## 5. Open questions for operator

1. **Q-blocker (MUST resolve before implementation):** Which font-family resolution — Option A (specimens win) / B (baseline wins) / C (both, with explicit roles) / D (something else)?

2. **Q-flagged-1 (NOT blocking — Option α default applies cleanly):** `--tracking-tight` — keep baseline `-0.02em` (the Option α default) or move to specimen-majority `-0.01em` (which doesn't have a clear 18+ majority)?

3. **Q-flagged-2 (NOT blocking — Option α default applies cleanly):** `--tracking-wide` — keep baseline `0.05em` (the Option α default) or move to specimen-majority `0.08em` (16 of 22; below Q4 threshold)?

4. **Q-confirm-1 (auto-resolution per Q3, surfaced for operator awareness):** Type-size xl/2xl/3xl/4xl updates to specimen-majority values are Q3-automatic. Operator can override if intent of these tokens differs from what specimens have been doing.

5. **Q-confirm-2 (auto-resolution per Q4, surfaced for operator awareness):** `--leading-prose: 1.6 → 1.55` per specimen majority.

6. **Q-confirm-3 (auto-resolution per Q5, surfaced for operator awareness):** Add `--leading-display: 1.05` to baseline.

## 6. Stop condition

This proposal halts here. **No code changes. No commits.** Awaiting operator resolution of the Q-blocker (font-family question) before Consolidation 2 implementation can proceed.

Per the operator's "DO NOT auto-advance to Consolidation 3" rule, the session stops here even though it could in principle move to other unblocked work. The autonomous extended-run mode was scoped to Consolidation 2; the blocker means Consolidation 2 cannot complete autonomously.

---

**Operator: please respond with the font-family resolution + any answers to Q-flagged-1/2. The auto-resolutions 4–6 will apply by default unless operator overrides.**
