# Consolidation 1 Audit — Spacing tokens single source

**Phase 22 / Unification Audit · Consolidation 1**
**Status: AUDIT COMPLETE — awaiting operator review of proposal**
**Audit author: Claude Code (Opus 4.7) · 2026-05-19**

---

## 1. Operator-provided framing

Operator's session-start directive: *"Begin with Consolidation 1 (spacing tokens single source)."* The phrase is the working brief. Interpretation: **establish a single canonical source of truth for the spacing scale across the catalog; eliminate drift, hardcoded one-offs, and inconsistent aliases.**

Dossier §2.1's exact enumeration of Consolidation 1 was not provided in the v3 handoff package text; operator framing per the dossier-reference doc Option 2 is the operative definition.

## 2. Canonical source as currently shipped

`02_reference-packs/tokens-baseline/tokens.css` defines the canonical spacing scale in **`rem` units** (lines 78-102):

| Token | tokens-baseline value | Pixel equivalent (at 16px root) |
|---|---|---|
| `--space-0` | 0 | 0 |
| `--space-1` | 0.25rem | 4px |
| `--space-2` | 0.5rem | 8px |
| `--space-3` | 0.75rem | 12px |
| `--space-4` | 1rem | 16px |
| `--space-5` | 1.25rem | 20px |
| `--space-6` | 1.5rem | 24px |
| `--space-8` | 2rem | 32px |
| `--space-10` | 2.5rem | 40px |
| `--space-12` | 3rem | 48px |
| `--space-16` | 4rem | 64px |
| `--space-20` | 5rem | 80px |
| `--space-24` | 6rem | 96px |
| `--space-32` | 8rem | 128px |
| `--space-stack-compact` | 0.5rem | 8px |
| `--space-stack-normal` | 1rem | 16px |
| `--space-stack-loose` | 2rem | 32px |
| `--space-inline-tight` | 0.25rem | 4px |
| `--space-inline-normal` | 0.5rem | 8px |
| `--space-inline-loose` | 1rem | 16px |
| `--space-card` | 1.5rem | 24px |
| `--space-panel` | 1.5rem | 24px |
| `--space-frame` | 1rem | 16px |

**Notable gap:** `--space-section` is NOT in `tokens-baseline`. It was introduced ad-hoc in specimens (see §4 below) and never promoted upstream.

## 3. Specimen inline bootstrap drift (CATEGORY A)

Every pattern specimen inline-declares a `:root { ... }` token block (per the post-bootstrap-regression convention from session b/dad252a/...→f3e7e0c). Audit found those declarations drift from `tokens-baseline`:

| Token | tokens-baseline | Specimen bootstrap | Drift | Severity |
|---|---|---|---|---|
| `--space-1` | 0.25rem (4px) | `4px` | unit mismatch only | LOW |
| `--space-2` | 0.5rem (8px) | `6px` | **value drift −2px** | **HIGH** |
| `--space-3` | 0.75rem (12px) | `8px` | **value drift −4px** | **HIGH** |
| `--space-4` | 1rem (16px) | `12px` | **value drift −4px** | **HIGH** |
| `--space-5` | 1.25rem (20px) | `16px` | **value drift −4px** | **HIGH** |
| `--space-6` | 1.5rem (24px) | `20px` | **value drift −4px** | **HIGH** |
| `--space-8` | 2rem (32px) | `32px` | unit mismatch only | LOW |
| `--space-card` | 1.5rem (24px) | varies: 16px / 20px / 24px | **value drift + inconsistency** | **CRITICAL** |
| `--space-panel` | 1.5rem (24px) | varies: 24px / 32px | **value drift + inconsistency** | **HIGH** |
| `--space-section` | (not defined) | `64px` (some specimens only) | **orphan token** | **HIGH** |

**The specimen scale is a compressed-by-roughly-25% variant of the tokens-baseline scale**, with additional inconsistency on the semantic tokens (card / panel / section).

## 4. Per-pattern drift table — `--space-card`, `--space-panel`, `--space-section`

| Pattern | `--space-card` | `--space-panel` | `--space-section` | Notes |
|---|---|---|---|---|
| button-system | **16px** | 24px | ❌ missing | Earliest P0; outlier card value |
| testimonial | 20px | 32px | ❌ missing | Pre-section-token era |
| feature-grid | 20px | 32px | ❌ missing | Pre-section-token era |
| form-fields | 20px | 32px | ❌ missing | Pre-section-token era |
| pricing-tiers | 24px | 32px | ❌ missing | First inter-pattern composition; baseline card adopted |
| footer-mega | 24px | 32px | ✓ 64px | First specimen with --space-section |
| nav-marketing | 24px | 32px | ✓ 64px | |
| nav-app-chrome | 24px | 32px | ✓ 64px | |
| data-table | 24px | 32px | ✓ 64px | |
| form-validation | 24px | 32px | ✓ 64px | |
| modal-dialog | 24px | 32px | ✓ 64px | |
| toast-notifier | 24px | 32px | ✓ 64px | |
| empty-state | 24px | 32px | ✓ 64px | |
| stat-card | 24px | 32px | ✓ 64px | |
| page-header | 24px | 32px | ✓ 64px | |
| hero-type-only | 24px | 32px | ✓ 64px | |
| hero-animated | 24px | 32px | ✓ 64px | |
| hero-gradient-mesh | 24px | 32px | ✓ 64px | |
| hero-brand-photo | 24px | 32px | ✓ 64px | |
| hero-video | 24px | 32px | ✓ 64px | |
| nav-docs | 24px | 32px | ✓ 64px | |
| nav-editorial | 24px | 32px | ✓ 64px | |

**Three drift classes visible:**
1. **button-system** has `--space-card: 16px` — unique outlier.
2. **testimonial / feature-grid / form-fields / button-system** use `--space-card: 16-20px` (older P0 convention).
3. **All other 18 patterns** use `--space-card: 24px` (current convention).

**Five patterns are missing `--space-section`:** button-system, testimonial, feature-grid, form-fields, pricing-tiers.

## 5. Hardcoded px usage (CATEGORY B)

Audit found a small set of hardcoded pixel values that bypass the token system. Mostly micro-spacing (1-6px) for visual fine-tuning:

| Pattern | Location | Hardcoded value | Token equivalent if used |
|---|---|---|---|
| data-table | `gap: 2px` | row action cluster spacing | (no 2px token; could be `--space-1` ÷ 2) |
| form-fields | `margin: 1px 0 0`, `inset: 2px`, `inset: 4px` | input adornment positioning | (sub-token spacing) |
| form-validation | `margin: 2px 0 0`, `padding: 2px 0` | message icon offset | (sub-token spacing) |
| modal-dialog | `padding: 1px 6px` | kbd pill padding | (sub-token spacing) |
| nav-app-chrome | `padding: 1px 5px`, `padding: 1px 6px`, `gap: 2px` (×2) | badge + cluster micro-spacing | (sub-token spacing) |
| nav-docs | `padding: 1px 6px`, `gap: 2px` (×2) | sidebar badge + group spacing | (sub-token spacing) |
| stat-card | `gap: 2px` | unit-prefix/suffix spacing | (sub-token spacing) |
| testimonial | `gap: 2px` (×2) | star-rating + avatar-stack gaps | (sub-token spacing) |

**All hardcoded values are sub-token (1-6px) — used for fine-tuning beneath the 4px granularity of `--space-1`.** None of the hardcoded values are at "real" spacing scales (8/12/16/20/24/32). The hardcoded pattern is consistent: **micro-spacing for icon-text alignment, badge padding, list-item separation**. This is a legitimate gap in the token scale, not a violation.

## 6. Primitive JSON token-reference inventory (CATEGORY C)

Every pattern's `primitives/index.json` declares a `tokens` block per primitive that documents which canonical tokens the primitive consumes. These are **documentation**, not compilable — they describe the contract. Sampled inventory:

- `pattern-button-system / action-button.tokens.padding` references `--space-2 --space-3` (correct format, tokens-baseline names).
- `pattern-data-table / data-table-cell.tokens.padding` references `var(--space-3) var(--space-card)` (correct).
- `pattern-hero-video / hero-video-section.tokens.padding` references `0` (literal — special case for full-bleed).

**No drift in CATEGORY C.** Primitive JSON correctly references tokens-baseline-named tokens. The drift is entirely in CATEGORY A (specimen inline bootstrap values).

## 7. Bootstrap-integrity gate behavior

The current `bootstrap-integrity.js` gate (under `02_reference-packs/scripts/`) checks:

1. HTTP 200 ✓
2. At least one foundation sentinel token defined inline ✓ (passes — specimens declare tokens)
3. Every `var(--X)` reference (without fallback) has `--X` defined inline ✓ (passes — drift values are defined; the gate doesn't check values match canonical)
4. No off-list `<link rel="stylesheet">` ✓

**The bootstrap-integrity gate does NOT detect Category A drift** because it only checks for *presence* of definitions, not value-correctness against canonical. This is a gap in the gate's coverage.

## 8. Severity summary

| Category | Pattern count affected | Visual impact | Operator-visible impact |
|---|---|---|---|
| A. Specimen bootstrap drift (px vs canonical rem; value drift in numeric tokens) | 22 / 22 | Specimens render visibly tighter than canonical — every `--space-3` is 8px in specimen vs 12px canonical | Specimens are NOT a faithful preview of production rendering. A host installing the pattern + tokens-baseline would see roughly 50% more spacing than the specimen demonstrates. |
| A.1. `--space-card` drift (16/20/24) | 4 / 22 | button-system / testimonial / feature-grid / form-fields render with tighter card padding than newer patterns | Inconsistent across the catalog. Specimens of the same category look subtly different. |
| A.2. `--space-section` orphan | 5 / 22 missing; 17 / 22 use 64px | Patterns without `--space-section` have no oversized vertical rhythm available | Newer patterns rely on a token that isn't in tokens-baseline |
| B. Hardcoded sub-token px | 8 / 22 | None — all values are <8px micro-spacing | Token scale lacks `--space-half-1` (2px) granularity needed for badges + adornments |
| C. Primitive JSON drift | 0 / 22 | None | Clean |

**The blast radius of Consolidation 1 is large** — every specimen needs editing, plus tokens-baseline needs decisions on:
- Add `--space-section`?
- Should `--space-card` and `--space-panel` differ (they're both 1.5rem currently)?
- Is the catalog's de-facto compressed scale (4/6/8/12/16/20/32) the intended scale, or is the canonical 4/8/12/16/20/24/32 the intended scale?

This last question is **architectural and requires operator decision**. The audit cannot decide it.
