# Consolidation 1 Proposal — Spacing tokens single source

**Phase 22 / Unification Audit · Consolidation 1**
**Status: PROPOSAL — awaiting operator review and approval before any implementation**
**Author: Claude Code (Opus 4.7) · 2026-05-19**
**Reference audit:** `02_reference-packs/CONSOLIDATION-1-AUDIT.md`

---

## What's being consolidated

Establish a single canonical source of truth for the spacing scale across the entire catalog. Resolve:

1. The **specimen-vs-baseline drift** (specimens use a compressed px scale; baseline uses a wider rem scale).
2. The **`--space-card` / `--space-panel` inconsistency** (variable across 4 patterns).
3. The **`--space-section` orphan** (used in 17 patterns but never promoted to baseline).
4. The **bootstrap-integrity coverage gap** (gate doesn't detect value drift).

## Before-state inventory

Per the audit document. Summary: 22 / 22 patterns drift; magnitude varies from −2px (`--space-2`) to −4px on most numeric scale tokens; `--space-card` shows 3 distinct values across patterns; `--space-section` is missing from baseline.

## The architectural decision required

**Operator must choose between two scales as the canonical source:**

### Option α — Canonical = tokens-baseline as currently shipped (wider scale, rem-native)

Spacing follows the existing tokens-baseline values: `--space-1: 0.25rem` through `--space-32: 8rem`. **Specimens are wrong** and must be corrected to match.

- **Pro:** tokens-baseline is the v1.0 specification artifact. Respecting it preserves all downstream conformance (DTCG validators, theme packs, host implementations).
- **Pro:** rem units respect user font-size preferences (accessibility-positive). px units in specimens silently override accessibility settings.
- **Pro:** 0.25rem base unit (4px at default) is the established Tailwind / Stripe / Linear convention; wider spacing scale matches modern marketing/app-shell aesthetics.
- **Con:** Every existing specimen (22 patterns) needs its inline bootstrap rewritten. Visual rhythm of every specimen shifts wider on first render. Operator-visual-verification of all 22 specimens required post-change.
- **Con:** The catalog has accumulated 22 patterns' worth of visual choices (paddings, gaps, layouts) calibrated against the *narrower* specimen scale. Switching to the wider scale may surface awkward layouts that need adjusting.

### Option β — Canonical = the de-facto specimen scale (narrower px scale)

Update tokens-baseline to match what specimens have been doing: `--space-1: 4px`, `--space-2: 6px`, `--space-3: 8px`, `--space-4: 12px`, etc. Add `--space-section: 64px`.

- **Pro:** No specimens need to change. Visual catalog stays exactly as-shipped.
- **Pro:** Reflects the actual choices already made; doesn't roll back work.
- **Con:** Departs from convention. The non-Fibonacci-ish 4/6/8/12/16/20/32 scale doesn't follow a clean ratio. (Baseline's 4/8/12/16/20/24/32 follows a clean +4 ratio above `--space-1`.)
- **Con:** px units in canonical tokens are accessibility-regressive (user font-size scaling no longer affects spacing).
- **Con:** Re-publishing tokens-baseline at v1.x with breaking value changes ripples through every theme pack + implementation pack downstream.

### Option γ — Hybrid: rem-native + narrower scale

Update tokens-baseline to use the narrower scale BUT in rem units: `--space-1: 0.25rem` (4px), `--space-2: 0.375rem` (6px), `--space-3: 0.5rem` (8px), `--space-4: 0.75rem` (12px), `--space-5: 1rem` (16px), `--space-6: 1.25rem` (20px), `--space-8: 2rem` (32px), `--space-section: 4rem` (64px), `--space-card: 1.5rem` (24px), `--space-panel: 2rem` (32px).

- **Pro:** Specimens stay visually identical (rem at 16px root produces same pixel values).
- **Pro:** Accessibility-positive (rem respects user font-size).
- **Pro:** Adds `--space-section` to the canonical surface.
- **Con:** Still a non-clean scale (0.375 / 0.5 / 0.75 / 1 / 1.25 — not even multiples of 0.25rem).
- **Con:** Still represents a breaking change for tokens-baseline at v1.x.

### Claude Code's recommendation

**Option α** is recommended. Rationale:
1. tokens-baseline is the v1.0 specification artifact and the contract that themes / implementations / downstream consumers depend on. Rewriting it to match accumulated specimen drift is a structural concession to the wrong artifact.
2. The 4 / 8 / 12 / 16 / 20 / 24 / 32 (px equivalent) scale is the established modern web convention (Tailwind default spacing scale).
3. Specimen drift is *easier to repair* than baseline drift. Specimens have 22 files; tokens-baseline has 1 file + N downstream consumers.
4. The specimens shipped during P0 and P1 were specimens — they were never the contract. The contract was always tokens-baseline.

But this is operator-only territory. The decision affects every theme pack, every aesthetic pack, every downstream implementation.

## After-state — assuming Option α

If Option α is approved:

### A. `tokens-baseline/tokens.css` additions

Add `--space-section`:
```css
:root {
  /* … existing tokens … */
  --space-section: 4rem;  /* 64px — page-level vertical rhythm */
}
```

No other changes to baseline (the canonical scale is correct as-shipped).

### B. Specimen inline bootstrap normalization

Every specimen's inline `:root { ... }` updated to mirror tokens-baseline values verbatim:

```css
:root {
  color-scheme: light dark;

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-card: 1.5rem;
  --space-panel: 1.5rem;
  --space-section: 4rem;
  /* … other tokens unchanged … */
}
```

### C. Specimen production-style block — no changes needed

All `var(--space-X)` references in pattern CSS stay the same. They were always referencing tokens by name; the values resolve from the bootstrap block. With the bootstrap normalized, references resolve to the canonical values.

### D. Visual delta — must be operator-verified

After Option α implementation, every specimen will render with wider spacing than today:
- `--space-3` references: 8px → 12px (+50%)
- `--space-4` references: 12px → 16px (+33%)
- `--space-card` references in early P0: 16-20px → 24px (+20-50%)
- `--space-card` references in newer patterns: 24px → 24px (no change)
- `--space-panel` references: 24-32px → 24px (some compress, some expand)
- `--space-section` references: 64px → 64px (no change once promoted)

This visual delta affects every specimen and is the primary risk of Option α. **The byte-equivalence verification step (skill Step 5.7) becomes operator-eye-verification because specimens WILL diff.** This requires explicit operator approval that the post-change visual is acceptable.

### E. Bootstrap-integrity gate extension

Per Phase 22 / `quoin-unification-auditor` skill Step 4.7: extend bootstrap-integrity gate to detect **value drift** (currently only checks presence). Proposed addition:

```javascript
// New gate check: specimens must use rem-native spacing
const SPACING_VALUE_CONTRACT = {
  '--space-1': '0.25rem',
  '--space-2': '0.5rem',
  '--space-3': '0.75rem',
  // … etc, mirrors tokens-baseline
};
// Fail any specimen where defined value doesn't match contract.
```

This closes the gap that allowed Category A drift to accumulate undetected through 22 patterns.

## After-state — assuming Option β

If Option β is approved instead, the operation reverses:
- tokens-baseline updated to specimen values (px-native, narrower scale).
- Add `--space-section: 4rem` (or px equivalent) to tokens-baseline.
- Specimens stay as-is.
- Downstream theme packs / aesthetic packs that consume tokens-baseline need re-validation against the new values.
- Specimens that lack `--space-section` (5 patterns) still need the inline bootstrap updated to include it.

## Migration path

The migration path differs significantly by Option chosen. Drafted in detail only once Option is operator-locked.

For Option α (Claude Code's recommendation):
1. Update `tokens-baseline/tokens.css` to add `--space-section: 4rem` (~1 line addition).
2. Update each of 22 specimens' inline `:root` block — 22 file edits, each ~10 lines of token-value updates.
3. No primitive JSON changes (Category C was clean).
4. Operator visual verification of all 22 specimens (URLs preserved from prior session-end reports).
5. Operator approval of visual delta.
6. Extend bootstrap-integrity gate with value-contract check.
7. Single commit per `quoin-unification-auditor` skill convention.

Estimated implementation time: 30-60 minutes of file edits + however long operator visual verification takes.

## Reverse-lineage table (N/A for this consolidation)

This is not a building-block primitive promotion. No reverse-lineage table is created. The tokens-baseline ALREADY ships as the canonical source — Consolidation 1 just enforces single-source by removing drift in specimens.

## Byte-equivalence verification plan

**Byte-equivalence will NOT hold for Option α.** Specimens will render visibly differently — wider spacing throughout. This is the entire point of the consolidation: the prior specimens were wrong; the post-consolidation specimens are correct.

Therefore the skill's Step 5.7 "byte-equivalence" check is replaced with **operator visual verification** for this consolidation. Operator opens each of 22 specimens post-change, confirms the new spacing is the intended editorial choice, approves or sends a list of patterns needing further adjustment.

**For Option β:** byte-equivalence is trivially preserved (specimens don't change). tokens-baseline becomes the source of drift — downstream consumers may diff against the new baseline.

## Open questions for operator

1. **Which Option (α / β / γ)?**
2. **For Option α:** Acknowledge that 22 specimens will render visibly different post-change. Want to do them in batches (e.g., 5 patterns at a time, with visual review between batches) or all-at-once?
3. **`--space-section` semantic:** is 64px (4rem) the correct value for "page section" rhythm? Or should it be smaller (3rem = 48px) or larger (5rem = 80px)?
4. **`--space-card` vs `--space-panel`:** tokens-baseline currently has them both at 1.5rem (24px). Specimens use card=24px and panel=32px. Should these differ in baseline? Proposed: keep card at 1.5rem (24px), bump panel to 2rem (32px) to match the specimen convention that's stabilized across 18 of 22 patterns.
5. **The 8 patterns with hardcoded sub-token px (gap: 2px etc.)** — leave as-is (sub-token granularity is a real gap; baseline lacks 2px) OR add `--space-half-1: 0.125rem` (2px) to baseline to cover them?

## Stop conditions

This proposal halts here. No implementation occurs until operator answers Q1 (Option choice) at minimum, ideally Q2-Q5 as well.

Per the `quoin-unification-auditor` skill, Steps 4-7 (implementation, verification, commit, status report) execute ONLY after explicit operator approval.

---

**End of proposal. Operator: please review and direct.**
