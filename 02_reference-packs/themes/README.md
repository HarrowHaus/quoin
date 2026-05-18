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

# Serve and open — file:// won't load external font CDNs via all browsers.
python -m http.server -d 02_reference-packs/themes 8765
# → http://localhost:8765/showcase.html
```

The validator asserts each theme passes cross-trend baseline checks
(non-empty light/dark/P3 overrides), compiles a minimal source through
the full pipeline, and has a distinct (accent, surface, text-emphasis)
signature relative to every other theme. The showcase renders one
shared source through every (theme × mode) so visual diversity can be
inspected side-by-side.

## About the showcase

The showcase HTML is a **static page** — it does NOT depend on
impl-tailwind output. An earlier draft compiled the source through
impl-tailwind, which emitted Tailwind arbitrary-value classes like
`text-[var(--type-size-display)]`. A static HTML page without a
Tailwind bundle treats those as inert strings: every cell rendered
identically except for colour. The current `showcase.js` writes the
composition with semantic class names backed by real CSS that reads
from CSS custom properties, sidestepping the issue entirely.

If a future showcase needs to render an impl-tailwind-compiled source,
it MUST also bundle a Tailwind CSS file — otherwise the demo lies
about what the theme packs do.

### Font loading

Every theme stack ships with OFL fonts or Apple system fonts only —
no commercial faces. Verified-and-current sources as of May 17 2026:

| Source | Families |
|---|---|
| Google Fonts CSS link | Source Serif 4 Variable, Inter Variable, DM Serif Display, JetBrains Mono Variable |
| Fontshare CSS link | Ranade Variable |
| jsDelivr (`@font-face`) | Junicode 2 Beta VF, Junicode VF (Roman + Italic), Monaspace Neon / Argon / Xenon / Radon / Krypton, Geist Variable, Geist Mono Variable |
| Vendored locally (`./_fonts/`) | `DepartureMono-Regular.woff2` (OFL by Helena Zhang, `departuremono.com`) — repo ships only a `.zip` release; no CDN-direct path |

Aliased family names — `Geist Variable`, `Geist Mono Variable`,
`Monaspace Neon Variable` — point at the same WOFF2 binary as the
canonical name. Themes can reference either form and the first stack
entry resolves.

### Apple system-font exception

`theme-prism` retains `SF Pro Display` / `SF Pro Text` / `SF Mono` as
the primary face in its stack. These are Apple proprietary fonts that
resolve from the OS on macOS / iOS with zero network load — they're
the only non-OFL faces in any Quoin theme stack. Rationale: a theme
that targets the iOS-26 native register would feel wrong with anything
but the actual system font on Apple platforms; on non-Apple platforms
the user falls back to Inter (OFL) and never sees them.

### Commercial-font cleanup (pre-Phase-Templates)

Phase Themes initially aliased several commercial peer-foundry faces
as primary entries in theme stacks. These were removed in a single
cleanup commit before Phase Templates because they wouldn't load for
self-hosting consumers and created license risk:

| Pack | Removed faces | Now leads with |
|---|---|---|
| `theme-vellum` | Tiempos Headline / Text, Styrene B LC, Anthropic Mono | Source Serif 4 + Inter + JetBrains Mono |
| `theme-letterpress` | Tiempos Headline / Text, Untitled Sans | Junicode 2 + Ranade + Monaspace Neon + Departure Mono |
| `theme-broadsheet` | PP Editorial New, GT Alpina, PP Fragment Sans | Junicode 2 + Ranade |
| `theme-bloom` | PP Editorial New, Synonym, Plein, General Sans | DM Serif Display + Inter |
| `theme-arcade` | PP Editorial New, Clash Display, PP Fragment Sans | Inter Display + Inter |
| `theme-vapor` | Söhne, Söhne Mono, Helvetica Neue | Inter Display + Inter + JetBrains Mono |
| `theme-graphite` | Pixelify Sans (mono-pixel fallback) | Geist Pixel → Departure Mono → monospace |

Visual differentiation survives the removal because each pack's
primary identity face (Junicode, Ranade, Geist, Source Serif 4,
Monaspace, DM Serif Display, Inter Display) is OFL and carries the
register independently of the commercial peer faces it used to alias.

### Headline scaling

The headline uses container queries:

```css
font-size: clamp(1.75rem, 18cqi, var(--type-size-display, 3rem));
```

At ~440px cell width, the middle term (18cqi ≈ 79px) caps before any
theme's `--type-size-display` (4.5rem–11rem). Broadsheet's canonical
11rem (176px) only renders at viewport widths above ~1000px-per-cell.
This is the deliberate trade-off: every cell shows a comparable
headline-tier render, but the full display tier reads only at wide
viewports.

## License

MIT. Theme packs ship overrides only — font files must be licensed
separately according to each foundry's terms (see per-theme READMEs
for substitution notes).
