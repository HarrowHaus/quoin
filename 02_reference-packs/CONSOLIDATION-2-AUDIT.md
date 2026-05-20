# Consolidation 2 Audit — Type-scale tokens single source

**Phase 22 / Unification Audit · Consolidation 2 (dossier §2.1 item #9)**
**Status: AUDIT COMPLETE — HALT TRIGGERED AT PROPOSAL PHASE**
**Audit author: Claude Code (Opus 4.7) · 2026-05-19 (extended-run mode, Consolidation 2 scope)**

---

## 1. Halt summary (top of report — read this first)

**Operator-pre-locked hard-halt condition triggered.** Operator instruction (Consolidation 2 extended-run brief):

> *"Audit phase reveals specimens use genuinely different font families (not just different size values) → halt at proposal, surface the divergence for operator decision on whether tokens-baseline should standardize or whether specimens were intentionally diverse."*

The audit found exactly this: **all 22 specimens use `Inter Variable` + `JetBrains Mono Variable`. `tokens-baseline` declares `Ranade Variable` + `Junicode 2` + `Monaspace Neon Var`. 0 of 22 specimens use baseline fonts.** This is not minor unit-drift; it is fundamental family divergence. Operator decision required before any implementation.

The audit was completed end-to-end so the morning report contains the full convergence picture across all typography token families (type-size, font-weight, leading, tracking) — not just the blocking question. **No implementation, no specimen edits, no commits this turn.**

## 2. Canonical source as currently shipped (`02_reference-packs/tokens-baseline/tokens.css`)

### §3.8 type sizes (px equivalents at 16px root)
| Token | Baseline | Notes |
|---|---|---|
| `--type-size-xs` | 0.75rem | 12px |
| `--type-size-sm` | 0.875rem | 14px |
| `--type-size-md` | 1rem | 16px |
| `--type-size-lg` | 1.125rem | 18px |
| `--type-size-xl` | **1.25rem (20px)** | drift candidate |
| `--type-size-2xl` | **1.5rem (24px)** | drift candidate |
| `--type-size-3xl` | **1.875rem (30px)** | drift candidate |
| `--type-size-4xl` | **2.25rem (36px)** | drift candidate |
| `--type-size-5xl` | 3rem | 48px |
| `--type-size-display` | 4.5rem | 72px |

### §3.20 font families
| Token | Baseline value |
|---|---|
| `--font-sans` | `'Ranade Variable', 'Ranade', ui-sans-serif, system-ui, …, sans-serif` |
| `--font-serif` | `'Junicode 2', 'Junicode', ui-serif, Georgia, …, serif` |
| `--font-mono` | `'Monaspace Neon Var', 'Monaspace Neon', ui-monospace, …, monospace` |
| `--font-display` | `'Junicode 2', 'Junicode', ui-serif, Georgia, …, serif` |

### §3.21 font weights
| Token | Baseline | Notes |
|---|---|---|
| `--font-weight-light` | 300 | (rarely inlined by specimens) |
| `--font-weight-regular` | 400 | |
| `--font-weight-medium` | 500 | |
| `--font-weight-semibold` | 600 | |
| `--font-weight-bold` | 700 | |
| `--font-weight-black` | 900 | (rarely inlined) |

### §3.19 leading multipliers
| Token | Baseline | Notes |
|---|---|---|
| `--leading-tight` | **1.15** | drift candidate (1 specimen uses 1.1) |
| `--leading-normal` | 1.4 | (not inlined by any specimen) |
| `--leading-prose` | **1.6** | drift candidate (20 specimens use 1.55) |
| `--leading-loose` | 1.9 | (not inlined) |

### §3.9 tracking
| Token | Baseline | Notes |
|---|---|---|
| `--tracking-tight` | **−0.02em** | drift candidate |
| `--tracking-normal` | 0em | |
| `--tracking-wide` | **0.05em** | drift candidate |

### Additional specimen-inlined tokens that exist outside §3.8-§3.21
- `--leading-display`: 18 of 22 specimens declare `1.05`. **NOT in tokens-baseline.** Orphan token (parallel to `--space-section`'s pre-Consolidation-1 state).

## 3. Specimen drift by category (CATEGORY A — value drift) and family (CATEGORY B — fundamental divergence)

### CATEGORY A — Type-size values

Convergence across 22 specimens, value counted as the dominant declaration:

| Token | Specimen majority value | Baseline | Drift | # of 22 |
|---|---|---|---|---|
| `--type-size-xs` | 0.75rem | 0.75rem | ✓ match | 22 / 22 |
| `--type-size-sm` | 0.875rem | 0.875rem | ✓ match | 20 / 22 (2 don't declare) |
| `--type-size-md` | 1rem | 1rem | ✓ match | 20 / 22 |
| `--type-size-lg` | 1.125rem | 1.125rem | ✓ match | 19 / 22 (1 declares 1.25rem) |
| `--type-size-xl` | **1.5rem** | **1.25rem** | **DRIFT** (+0.25rem) | 22 / 22 |
| `--type-size-2xl` | **2rem** | **1.5rem** | **DRIFT** (+0.5rem) | 20 / 22 |
| `--type-size-3xl` | **2.5rem** | **1.875rem** | **DRIFT** (+0.625rem) | 20 / 22 |
| `--type-size-4xl` | **3.5rem** | **2.25rem** | **DRIFT** (+1.25rem) | 13 / 22 (9 don't declare) |

**Pattern of drift:** xs/sm/md/lg match baseline exactly; xl/2xl/3xl/4xl all systematically larger than baseline. Specimens implement a "promoted scale" where xl ≈ baseline 2xl, 2xl ≈ baseline 3xl, 3xl ≈ baseline 4xl, 4xl ≈ baseline 5xl. **The drift is consistent and large** — 0.25 to 1.25 rem per token.

### CATEGORY A — Font weights

| Token | Specimen value | Baseline | Drift | # of 22 |
|---|---|---|---|---|
| `--font-weight-regular` | 400 | 400 | ✓ match | 17 / 22 (5 don't declare) |
| `--font-weight-medium` | 500 | 500 | ✓ match | 22 / 22 |
| `--font-weight-semibold` | 600 | 600 | ✓ match | 20 / 22 |
| `--font-weight-bold` | 700 | 700 | ✓ match | 16 / 22 |

**Clean.** No drift on font-weight values. The 4-token subset every specimen uses (regular / medium / semibold / bold) matches baseline exactly.

### CATEGORY A — Leading

| Token | Specimen majority | Baseline | Drift | # of 22 |
|---|---|---|---|---|
| `--leading-tight` | 1.15 | 1.15 | ✓ match | 21 / 22 (1 declares 1.1) |
| `--leading-prose` | **1.55** | **1.6** | **DRIFT** (−0.05) | 20 / 22 |
| `--leading-display` | 1.05 (not in baseline) | (orphan) | **ORPHAN TOKEN** | 18 / 22 |
| `--leading-normal` | (no specimen declares) | 1.4 | n/a | 0 / 22 |

**`--leading-display` parallels `--space-section`'s pre-Consolidation-1 state** — used by majority of specimens (18 of 22) but never promoted to baseline.

### CATEGORY A — Tracking

| Token | Specimen majority | Baseline | Drift | # of 22 |
|---|---|---|---|---|
| `--tracking-tight` | **−0.01em** (15) | **−0.02em** | **DRIFT** (split 15/7 across specimens) | 22 / 22 |
| `--tracking-normal` | 0 | 0em | ✓ match | 17 / 22 |
| `--tracking-wide` | **0.08em** (16) | **0.05em** | **DRIFT** (+0.03em) | 20 / 22 |

`--tracking-tight` shows split convergence (15 specimens use −0.01em, 7 use baseline −0.02em). `--tracking-wide` has clear specimen majority at 0.08em (baseline 0.05em).

### CATEGORY B — Font families (THE BLOCKING DIVERGENCE)

| Token | Specimen value (22/22 unanimous) | Baseline value | Status |
|---|---|---|---|
| `--font-sans` | `'Inter Variable', 'Inter', system-ui, sans-serif` | `'Ranade Variable', 'Ranade', ui-sans-serif, system-ui, …` | **FUNDAMENTALLY DIVERGENT** |
| `--font-display` | `'Inter Variable', 'Inter', system-ui, sans-serif` (same as sans) | `'Junicode 2', 'Junicode', ui-serif, Georgia, …` | **FUNDAMENTALLY DIVERGENT** |
| `--font-mono` | `'JetBrains Mono Variable', 'JetBrains Mono', ui-monospace, monospace` | `'Monaspace Neon Var', 'Monaspace Neon', ui-monospace, …` | **FUNDAMENTALLY DIVERGENT** |
| `--font-serif` | (not declared in specimens) | `'Junicode 2', 'Junicode', ui-serif, …` | not specimen-inlined |

**0 of 22 specimens reference baseline fonts.** Specimens uniformly use Google-Fonts-loaded Inter + JetBrains Mono. Baseline declares Ranade + Junicode + Monaspace Neon (variable / display / mono respectively).

Notably: every specimen also includes a Google Fonts `<link rel="stylesheet">` for Inter + JetBrains Mono, while baseline's fonts (Ranade, Junicode, Monaspace Neon) require licensed self-hosted files. The specimen choice reflects a "render-anywhere via Google Fonts CDN" optimization that the baseline does not match.

## 4. Severity summary

| Category | Tokens affected | Patterns affected | Resolution complexity | Operator decision required? |
|---|---|---|---|---|
| **B. Font-family divergence** | 3 (`--font-sans`, `--font-display`, `--font-mono`) | 22 / 22 | **HIGH** — affects every theme pack + implementation pack downstream | **YES — blocking** |
| A. Type-size drift (xl/2xl/3xl/4xl) | 4 tokens | 22 / 22 (degrees vary by token) | MEDIUM — apply Q3 ("dominant convention wins") | NO if Q3 applies; YES if reverse direction (baseline wins) preferred |
| A. Tracking drift (tight, wide) | 2 tokens | 22 / 22 | MEDIUM — apply Q4 | Likely Q4 |
| A. Leading drift (prose) | 1 token | 20 / 22 | LOW — single value harmonization | Q4 applies cleanly |
| A. Leading orphan (`--leading-display`) | 1 token | 18 / 22 | LOW — add to baseline at majority value | Q5 applies cleanly (parallel to `--space-section`) |
| Font weights | (no drift) | n/a | n/a | n/a |

## 5. The blocking decision — font-family

Specimens and baseline express two fundamentally different typographic intentions:

**Specimen convention (22/22 unanimous):** Inter (sans + display) + JetBrains Mono. Google-Fonts-CDN delivery. Modern web-development aesthetic. Zero licensing entanglement (Inter is SIL OFL; JetBrains Mono is SIL OFL).

**Baseline convention (the spec):** Ranade Variable (sans), Junicode 2 (display + serif), Monaspace Neon Var (mono). Self-hosted licensed delivery. Editorial / typographic-craft aesthetic. Licensing terms vary per face — Ranade is ITF freebie, Junicode 2 is SIL OFL, Monaspace is SIL OFL.

These reflect different brand decisions. Neither is wrong on its face; both are deliberate.

**Possible operator resolutions:**

1. **Option A — Specimens win, baseline updates to Inter + JetBrains Mono.** Rationale: the specimens reflect what's actually been shipping; CDN delivery is operationally simpler; Inter is the modern-web default. Consequence: `tokens-baseline` ships with non-editorial fonts, which contradicts the "Quoin is a typesetter's discipline" positioning from the dossier §3.11.

2. **Option B — Baseline wins, specimens update to Ranade + Junicode + Monaspace.** Rationale: baseline IS the spec; specimens were placeholder-grade. Consequence: every specimen needs font @font-face declarations or a Quoin-hosted CDN endpoint for Ranade/Junicode/Monaspace. Specimens stop rendering correctly without those fonts (or the Google Fonts CDN URL changes). Licensing nuance per font.

3. **Option C — Both, with explicit roles.** `--font-sans` stays Ranade (for Quoin-branded interfaces), `--font-display` stays Junicode (for the typesetter-craft aesthetic), but specimens are explicitly placeholder using a "render-anywhere" font stack that overrides via `:root` for demonstration purposes. Document this in the spec as the canonical pattern: specimens use Inter for rendering; production hosts swap to their licensed brand font via theme packs.

4. **Option D — None of the above; surface a different resolution.**

Claude Code's recommendation (provided per operator's "flag-and-continue" guidance, NOT auto-applied): **Option C.** It honors both the dossier positioning (Quoin = editorial discipline) AND the operational reality (specimens have been Inter-rendered through P0 and P1). It also matches how design systems typically work — the framework declares the type vocabulary; the brand layer swaps the actual face. This option requires the smallest behavioral change (specimens already work; baseline's intentional Ranade/Junicode/Monaspace stays) but does require explicit documentation of the override pattern in the spec.

## 6. Additional drift questions (non-blocking, queued behind the family decision)

These can be resolved by Q3/Q4/Q5 automatically once the family decision is locked:

- **Type-size:** Q3 says "dominant convention wins." Specimens dominate on xl/2xl/3xl/4xl. Baseline values are smaller. **Q3-default outcome:** specimen values become canonical; baseline updates xl/2xl/3xl/4xl to specimen scale.
- **Tracking-tight:** 15/22 use −0.01em, 7/22 use baseline −0.02em. **Not a clear majority (>18) per Q4 threshold.** **Flag for operator decision.** Closer-to-Inter-tracking convention (−0.01em) is more readable for body text at high resolutions; baseline's −0.02em is tighter for editorial display.
- **Tracking-wide:** 16/22 use 0.08em, baseline says 0.05em. **18-majority threshold not met (16 < 18).** **Flag for operator decision.**
- **Leading-prose:** 20/22 use 1.55, baseline says 1.6. **Q4 majority threshold met (20 ≥ 18).** Specimen wins per Q4; baseline updates to 1.55.
- **Leading-display orphan:** 18/22 use 1.05. **Q5 applies cleanly:** add `--leading-display: 1.05` to baseline (parallel to `--space-section` in Consolidation 1).
- **Type-size-2xl, type-size-3xl outliers:** 20/22 use 2rem/2.5rem. 2 specimens don't declare them. Q4 threshold met for those that do.
- **`--type-size-5xl`** in tokens-baseline (3rem): no specimen declares it. Q3/Q4 don't apply — keep baseline.
- **`--type-size-display`** in tokens-baseline (4.5rem): no specimen declares it. Keep baseline.

## 7. What this audit did NOT do

- **No specimen edits.** No tokens-baseline edits. No commits. No bootstrap-integrity gate extension.
- **No implementation of Q3/Q4/Q5 defaults yet.** They would apply automatically per the extended-run brief — but Q1's hard halt for font-family divergence preempts the rest.

## 8. Verification of catalog state at audit time

| Check | Result |
|---|---|
| `npm test` | 96/96 PASS |
| `validate.js` | 80/80 PASS |
| `bootstrap-integrity.js` (post-Consolidation-1 with spacing-value contract) | 22/22 PASS |
| `content-completeness.js` | 18/18 enrolled OK |

Catalog is currently green. The Consolidation 2 audit observed drift but did not introduce any regression.
