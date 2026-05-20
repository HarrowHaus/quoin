# @quoin/tokens-baseline

A deliberately neutral Quoin token pack. The "Helvetica" of token packs —
defensible defaults that work for anything, and the safest base to fork
from when building a project-specific token pack.

## Design decisions

- **OKLCH greyscale.** A ten-step stone palette in OKLCH preserves
  perceptual uniformity across the lightness range and renders
  consistently on wide-gamut displays. No baked-in chroma — the only
  saturated entries are the status colours.
- **System font stack — vocabulary, not aesthetic.** Baseline declares
  font tokens with system-stack fallbacks: `ui-sans-serif, system-ui,
  -apple-system, …` for sans; the platform serif for prose; `ui-monospace`
  for code. No webfont fetch, no FOIT, no licensing cost. Specific brand
  fonts (Junicode 2, Ranade, Monaspace, IBM Plex, Inter, etc.) belong in
  **aesthetic packs** — when you want a specific typographic identity,
  install or author an aesthetic pack that overrides these tokens with
  specific faces. The 5 `--font-mono-*` typographic variants are named
  slots in the canonical namespace: baseline points all five at the same
  generic mono stack; aesthetic packs differentiate them with specific
  faces (Monaspace Argon for warm, Xenon for slab, etc.). The reference-
  pack specimens demonstrate patterns using Inter + JetBrains Mono via
  Google Fonts as a neutral substrate so pattern anatomy is foregrounded
  over typography choice. _Phase 22 / Consolidation 2 architectural lock,
  2026-05-20: brand fonts are scoped to future aesthetic-pack work, not
  to baseline._
- **Conservative type scale.** Eight steps from `xs` (0.75rem) to
  `display` (4.5rem), with a sensible default of 1rem. Larger ratios
  between steps as the scale climbs — `lg`/`xl`/`2xl` close together
  for body emphasis, `3xl`/`display` further apart for headlines.
- **Generous spacing scale.** Eleven base steps (`0`, `1`-`8`, `12`,
  `16`, `24`, `32`), in rem. Layered against this, role-specific spacing
  tokens (`--space-stack-*`, `--space-inline-*`, `--space-card`, etc.)
  so vocabulary packs reference an intent, not a step number.
- **Restrained motion.** Three durations (120 / 200 / 320 ms) and three
  curves (standard / decelerate / accelerate). Enough for any reasonable
  transition without inviting motion-as-decoration.

## Scope

Implements every name in the canonical semantic-token namespace defined
in [`00_spec/tokens.md` §2](../../00_spec/tokens.md). A token pack that
omits any required name fails compiler validation. This pack is the
reference for what completeness looks like.

## Files

- `tokens/index.json` — DTCG-format token graph. Loaded by the compiler.
- `tokens.css` — same tokens emitted as CSS custom properties on `:root`.
  Link this stylesheet when using `@quoin/impl-raw-css`, or alongside
  Tailwind v4 to resolve `@quoin/impl-tailwind`'s arbitrary-value
  classes (`bg-[var(--accent)]`, etc.).

## Project overrides

The intended branding mechanism is a project-local `quoin.tokens.json`
that overrides specific semantic tokens — typically `--accent` and one
or two font families. See `00_spec/tokens.md` §5.

```json
{
  "accent":        { "$value": "oklch(58% 0.18 250)" },
  "font-display":  { "$value": "'Inter', system-ui, sans-serif" }
}
```

## Cross-references

- Spec: [`00_spec/tokens.md`](../../00_spec/tokens.md) — canonical
  semantic namespace and three-layer model.
- Pack format: [`00_spec/pack-format.md`](../../00_spec/pack-format.md) §4 — token pack contract.
- Compiler validation: every token pack is checked against the
  canonical namespace at compile-time by
  [`@quoin/compiler/findMissingSemanticTokens`](../../01_compiler/src/token-resolver.ts).
