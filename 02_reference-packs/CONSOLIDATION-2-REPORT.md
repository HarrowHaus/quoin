# Consolidation 2 — Type-scale tokens single source (closed)

**Phase 22 / Unification Audit · Consolidation 2**
**Status: CLOSED · 2026-05-20**
**Resolution: Option D (operator alternative — system-stack vocabulary in baseline; brand fonts deferred to aesthetic packs)**
**Author: Claude Code (Opus 4.7)**

---

## What Cons. 2 was supposed to fix

Audit revealed (a) type-scale drift across all 22 specimens vs `tokens-baseline`, and (b) a font-family architectural divergence: 22/22 specimens used Inter + JetBrains Mono via Google Fonts CDN; tokens-baseline declared Ranade + Junicode 2 + Monaspace Neon.

The font-family question was operator-blocking. Three of the four resolution options proposed assumed tokens-baseline should declare *specific* brand fonts.

## What the operator did (the better answer)

The operator surfaced **Option D**: none of the proposed three options should win because the framing was wrong. tokens-baseline is the **canonical vocabulary layer** — its job is to declare token names and value shapes, not aesthetic choices. Specific brand fonts (Junicode 2, Ranade, Monaspace, IBM Plex, etc.) are aesthetic choices and belong in aesthetic packs.

After Option D:

- `tokens-baseline` declares font-family tokens with system-stack fallbacks. The 5 `--font-mono-*` variants are named slots all pointing to the generic mono stack — aesthetic packs override each with a specific face when they want typographic differentiation.
- Specimens explicitly use Inter + JetBrains Mono via Google Fonts. This is correct, documented, demonstration behavior — neutral substrate so the pattern, not the typeface, is what gets noticed.
- Brand fonts are scoped to a future aesthetic pack (probably `@quoin/aesthetic-manuscript-future`).

This resolves a category-architecture issue, not just a value-drift issue.

## Changes shipped

### `tokens-baseline/tokens.css`

**§3.8 — type-size auto-resolutions (Q3):**
- `--type-size-xl`: 1.25rem → 1.5rem (22/22 specimens)
- `--type-size-2xl`: 1.5rem → 2rem (20/22)
- `--type-size-3xl`: 1.875rem → 2.5rem (20/22)
- `--type-size-4xl`: 2.25rem → 3.5rem (15/22 declare; majority pick)

**§3.19 — leading auto-resolutions (Q4/Q5):**
- `--leading-prose`: 1.6 → 1.55 (20/22)
- Added `--leading-display`: 1.05 (18/22 specimen-orphan promoted)

**§3.20 — font-family system stacks (Option D core):**
- `--font-sans`: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- `--font-serif`: `ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif`
- `--font-mono`: `ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace`
- `--font-display`: `var(--font-sans)` (defaults to sans unless overridden)
- `--font-mono-warm/slab/script/mechanical/pixel`: all `var(--font-mono)` (named slots awaiting aesthetic-pack overrides)

**Non-blocking flagged items (default to baseline per Q4 Option α):**
- `--tracking-tight`: stays `-0.02em` (15/7 split below Q4 threshold)
- `--tracking-wide`: stays `0.05em` (16/22 below Q4 threshold)

### `tokens-baseline/README.md`

Documented the architectural decision: vocabulary-vs-aesthetic separation, why specimens override defaults, where brand fonts live (aesthetic packs).

### 22 pattern specimens

All 22 specimens received a one-line trace comment:

```css
/* Phase 22 / Consolidation 2: type-scale + leading match tokens-baseline canonical */
```

No specimen values changed. Audit confirmed all 22 specimens already complied with the new canonical for the auto-resolved tokens.

### `scripts/bootstrap-integrity.js`

Added `TYPE_SCALE_VALUE_CONTRACT` parallel to `SPACING_VALUE_CONTRACT`. The check covers 9 tokens:

```
--type-size-xs    0.75rem
--type-size-sm    0.875rem
--type-size-md    1rem
--type-size-xl    1.5rem
--type-size-2xl   2rem
--type-size-3xl   2.5rem
--type-size-4xl   3.5rem
--leading-prose   1.55
--leading-display 1.05
```

Smoke-tested with synthetic drift on one specimen — gate correctly identified the drift, returned green after revert.

## Tokens deliberately EXCLUDED from the type-scale contract

Documented as comments in the gate source:

- `--type-size-lg`: feature-grid carries historical drift (1.25rem vs baseline 1.125rem) that pre-dates Cons. 2 and was outside audit scope. Future consolidation can address.
- `--leading-tight, --leading-normal, --leading-loose`: button-system carries `leading-tight: 1.1` drift; not part of Cons. 2 auto-resolutions.
- `--tracking-tight, --tracking-normal, --tracking-wide`: specimens deliberately override these — preserving specimen-side stylistic latitude is part of the architecture.

These represent pre-existing drift the gate intentionally tolerates until a future operator-locked consolidation addresses them.

## Verification

| Check | Result |
|---|---|
| `node bootstrap-integrity.js` | 22/22 PASS (all green) |
| Smoke test: synthetic xl drift on button-system | Gate fails as expected; after revert, gate green again |
| Smoke test: synthetic xs drift on button-system | Gate fails as expected |
| tokens-baseline syntactic integrity | No parse errors |

## What Cons. 2 doesn't fix (deferred)

- The 3 type-scale drifts in non-contract tokens listed above.
- The specific aesthetic pack that ships Quoin's editorial typographic system (Junicode 2 / Ranade / Monaspace / IBM Plex) — Cons. 2 establishes the architecture; the actual pack is future work.
- Cons. 3 through Cons. 7 of the unification dossier remain (structural reshapes — hero anatomy variants, nav variants, badge/tag/status-pill consolidation, etc.). Per the operator's "DO NOT auto-advance" rule, session stops here.

## Commits

| Commit | Scope |
|---|---|
| `cd4afd4` | audit + proposal (HALT) |
| `2bcc507` | batch 1/5 — baseline auto-resolutions + 5 specimens |
| `805b51f` | batch 2/5 — 5 specimens |
| `c76a7d6` | batch 3/5 — 5 specimens |
| `13cdb60` | batch 4/5 — 5 specimens |
| _this commit_ | batch 5/5 closing — 2 specimens + font-family system stacks + README + gate extension |

## Architectural decision recorded

> Phase 22 / Consolidation 2 / 2026-05-20: tokens-baseline declares font tokens as system-stack fallbacks. Specific brand fonts (Inter, Junicode 2, Ranade, Monaspace, IBM Plex) live in aesthetic packs — consumers opt in by installing an aesthetic pack that overrides these tokens. The 5 `--font-mono-*` typographic variants are named slots; baseline points all five at the generic mono stack; aesthetic packs differentiate them with specific faces. Specimens demonstrate patterns using Inter + JetBrains Mono via Google Fonts as a neutral substrate so pattern anatomy speaks louder than typographic choice.

This consolidation served double duty: it resolved type-scale drift AND corrected an architectural mistake (specific fonts in baseline) that would have caused larger problems later.
