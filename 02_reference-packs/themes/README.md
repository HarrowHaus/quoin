# Quoin Theme Packs — v1.0 catalogue

Ten theme packs covering the 2026 trend landscape per the research
forecast (`research/02_design_trends_templates_typography.md` Part 1
Section 1A). Each pack overrides canonical token values from
`@quoin/tokens-baseline` to express a distinct visual register, and
each ships light + dark + P3 wide-gamut variants.

## The 10 packs

| Pack | Lineage (research §1A) | Reference site | Use case |
|---|---|---|---|
| [`@quoin/theme-vellum`](./vellum) | Calm Ivory Editorial (peaking) | anthropic.com | Research labs, AI, scholarly publishing |
| [`@quoin/theme-graphite`](./graphite) | Geist Precision / Cold Liquid Linear | vercel.com | Developer tooling, infra, B2B SaaS |
| [`@quoin/theme-aurora`](./aurora) | Warm Liquid Linear | linear.app | Project management, productivity |
| [`@quoin/theme-letterpress`](./letterpress) | Tactile Warmth (Pantone Cloud Dancer) | klim.co.nz | Studio sites, agency portfolios |
| [`@quoin/theme-terminal`](./terminal) | Honest Brutalism / Mono | rauno.me / departuremono.com | Engineering blogs, terminal apps |
| [`@quoin/theme-broadsheet`](./broadsheet) | Big Editorial Headline | pangrampangram.com | Editorial publications, type-forward brands |
| [`@quoin/theme-bloom`](./bloom) | Organic Anti-Grid | stripe.com derivative | Consumer apps, lifestyle SaaS |
| [`@quoin/theme-arcade`](./arcade) | Dopamine Saturation | Vacation (suncare) | Consumer products, creator tools |
| [`@quoin/theme-prism`](./prism) | Liquid Glass (opt-in) | linear.app mobile | Mobile-first, iOS-26-adjacent feel |
| [`@quoin/theme-vapor`](./vapor) | Stripe Atmospheric (with novel layered-mesh) | stripe.com | Fintech, payment infrastructure |

## Cross-trend baseline (every theme meets)

- **OKLCH authoring** with sRGB hex documented for traceability.
- **Light + dark mode** required — neither is "the original."
- **P3 wide-gamut** opt-in variants for the accent + status colours.
- **Theme overrides only canonical token names.** Adding a new name
  throws a `PackValidationError` at load time.
- **APCA contrast targeting**: Lc ≥ 60 body, Lc ≥ 75 fine print
  (operator-side verification).
- **Identity typography respected** where used (Quoin's
  Junicode + Ranade + Monaspace + Departure Mono stack).
- **System-font fallback stacks** populated throughout so packs
  render even when the named OFL faces aren't installed.

## Composition order

Theme overrides apply between the token pack and project tokens at
compile time:

```
token pack → theme (light) → project overrides → vocab + pattern → icon → impl
```

Dark + P3 variants are carried through to the implementation pack so
it can emit `[data-theme="dark"]` and `@media (color-gamut: p3)`
blocks.

## Use one

```ts
import { compile, loadTokenPack, loadThemePack } from "@quoin/compiler";

const tokenPack = await loadTokenPack("./node_modules/@quoin/tokens-baseline");
const themePack = await loadThemePack("./node_modules/@quoin/theme-graphite");
compile({ source, tokenPack, themePack, vocabularyPacks, implementationPack });
```

## Verify

```bash
# Run the cross-theme validator (10 manifests, baseline checks, diversity).
node 02_reference-packs/themes/validate.js

# Generate the side-by-side showcase HTML (20 cells, 10 themes × light/dark).
node 02_reference-packs/themes/showcase.js
open 02_reference-packs/themes/showcase.html
```

The validator asserts each theme passes cross-trend baseline checks
(non-empty light/dark/P3 overrides), compiles a minimal source through
the full pipeline, and has a distinct (accent, surface, text-emphasis)
signature relative to every other theme. The showcase renders one
shared source through every (theme × mode) so visual diversity can be
inspected side-by-side.

## License

MIT. Theme packs ship overrides only — font files must be licensed
separately according to each foundry's terms (see per-theme READMEs
for substitution notes).
