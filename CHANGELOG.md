# Changelog

All notable changes to the Quoin language, compiler, reference packs, and
docs site. Format follows [Keep a Changelog](https://keepachangelog.com/),
versioning follows pre-1.0 conventions until v1.0.0 publication.

## [Unreleased]

### Typography distinctness — aurora / arcade / vapor redesigned with distinct OFL faces (2026-05-17)

After the commercial-font cleanup three themes shared
`Inter Display Variable + Inter Variable` as their typography
(aurora, arcade, vapor — the cross-diversity observation flagged
in the cleanup commit). Operator approved redesigning all three
with typographically distinct OFL faces so each pack carries its
own identity register independently of palette + radius + shadow
differentiation.

| Pack | Now leads with | Foundry / source | Aesthetic role |
|---|---|---|---|
| `theme-aurora` | **Manrope** | OFL by Mikhail Sharanda (Google Fonts) | Geometric grotesque with subtle humanist warmth — the warm-Linear register, distinct from Geist and Inter |
| `theme-arcade` | **Unbounded** | OFL by Indian Type Foundry (Google Fonts) | Bold geometric display with rounded terminals — Y2K-adjacent maximalist register that Inter Display couldn't carry |
| `theme-vapor` | **IBM Plex Sans / Sans Condensed / Mono** | OFL by IBM (Google Fonts) | Canonical institutional grotesque — fintech / enterprise register; mono variant strengthens data-table register |

After the redesign the catalogue has **9 distinct primary faces
across 10 themes**:

- vellum: Source Serif 4 Display
- graphite: Geist Variable
- aurora: Manrope Variable
- letterpress: Junicode 2
- terminal: Monaspace Neon Variable
- broadsheet: Junicode 2 *(intentionally shared with letterpress — the Quoin identity stack; differentiation via type scale + surface treatment)*
- bloom: DM Serif Display
- arcade: Unbounded
- prism: SF Pro Display
- vapor: IBM Plex Sans Condensed

The only intentional overlap is broadsheet / letterpress sharing the
Junicode 2 + Ranade Quoin-identity pairing. Every other pack has a
distinct primary face. Cross-pack typographic diversity restored
without re-introducing commercial fonts.

#### Showcase

`showcase.js` Google Fonts CSS link extended to load Manrope,
Unbounded, and IBM Plex Sans / Condensed / Mono alongside the
existing faces. The legend at the top of the page lists every
loaded face. Verified in Chrome DevTools: each theme's computed
`font-family` resolves to its declared OFL primary face (Manrope
Variable, Unbounded, IBM Plex Sans Condensed); `document.fonts`
shows all three new families at status `"loaded"`.

#### Validation

All validators still pass: 10/10 themes cross-diversity, 80/80
reference checks, all Phase 0.5-extension checks, 96/96 compiler
tests, 40/40 harvested packs.

### Pre-Phase-Templates cleanup — commercial fonts removed + Departure Mono vendored + Universal Gate (2026-05-17)

Three followup tasks before Phase Templates, shipped as a single
cleanup commit.

#### Commercial fonts removed from all theme stacks

Operator decision: no commercial fonts in any Quoin pack — they
wouldn't load for self-hosting consumers and create license risk. The
following were stripped from theme override files; each affected
theme now leads with an OFL-only font stack:

| Pack | Removed faces | Primary face is now |
|---|---|---|
| `theme-vellum` | Tiempos Headline, Tiempos Text, Styrene B LC, Anthropic Mono | Source Serif 4 + Inter + JetBrains Mono |
| `theme-letterpress` | Tiempos Headline, Tiempos Text, Untitled Sans | Junicode 2 + Ranade + Monaspace Neon + Departure Mono |
| `theme-broadsheet` | PP Editorial New, GT Alpina, PP Fragment Sans | Junicode 2 + Ranade |
| `theme-bloom` | PP Editorial New, Synonym, Plein Variable, General Sans | DM Serif Display + Inter |
| `theme-arcade` | PP Editorial New, Clash Display, PP Fragment Sans | Inter Display + Inter |
| `theme-vapor` | Söhne, Söhne Mono, Helvetica Neue | Inter Display + Inter + JetBrains Mono |
| `theme-graphite` | Pixelify Sans (mono-pixel fallback) | Geist Pixel → Departure Mono → monospace |

`theme-prism` retains SF Pro Display / SF Pro Text / SF Mono as the
documented Apple-system-font exception — these resolve from the OS on
macOS / iOS with zero network load and fall back to Inter elsewhere.

Per-theme READMEs updated to document the substitution.

#### Departure Mono vendored

Pixelify Sans does NOT substitute for Departure Mono — different
aesthetic (soft pixel-art vs rigid 80s terminal). `rektdeckard/departure-mono`
ships only a `.zip` release with no CDN-direct WOFF2 path, so the v1.500
WOFF2 (22 KB, SIL OFL 1.1 by Helena Zhang of helenazhang.com) is now
vendored at `02_reference-packs/themes/_fonts/DepartureMono-Regular.woff2`
alongside its OFL license file. The showcase declares a relative
`@font-face` pointing at the vendored binary.

Pixelify Sans removed from the showcase font-loading list and from
theme stacks. The composition gained a `.composition-caption` element
using `var(--font-mono-pixel)` so every cell visibly exercises the
mono-pixel slot — verified that terminal, letterpress (explicit
overrides) and vellum / vapor / aurora / arcade / prism / broadsheet
/ bloom (baseline inheritance) all render Departure Mono in the
caption tier. Graphite shows `Geist Pixel` first in the stack and
falls through to Departure Mono since Geist Pixel isn't loaded.

#### Universal Gate added to PHASE_GATES

A new "Universal Gate — Visual regression checkpoint" section sits at
the top of `PHASE_GATES.md` and applies to every future visual phase
(Templates, Patterns, Icons, Marketing, Docs Refresh, harrow.haus
rebuild, Examples Gallery, Showcase Wall). Every visual phase must
ship a screenshot grid that:

- Renders every pack / template / pattern at production scale
- Shows light + dark side by side
- Uses realistic content density (not "Hello World")
- Attaches computed-style spot-checks (font-family, font-size, padding)
- Dumps `document.fonts` with all referenced faces at status `"loaded"`
- Fails the gate if two cells look identical beyond palette

Why the gate exists: during Phase Themes the initial showcase passed
every programmatic validator but rendered every cell as Times New
Roman because (1) no `@font-face` declarations existed in the HTML
and (2) Tailwind arbitrary-value classes were inert without a Tailwind
CSS bundle. The validator had no way to detect this. The Universal
Gate makes visual verification mandatory and explicit; future visual
phase prompts reference it.

#### Cross-diversity observation

After the commercial-font removal, three themes share the
`Inter Display Variable + Inter Variable` typography stack:
**aurora**, **arcade**, **vapor**. Visual differentiation between them
now relies entirely on palette + border radius + shadow recipe + surface
saturation — typography no longer participates. They remain
distinguishable in the showcase via:

- Border radius: aurora 12px, arcade 20px, vapor 6px, prism 28px
- Shadow recipe: aurora subtle 2-layer warm, arcade hot magenta glow
  (oklch(70% 0.25 350 / 0.45) 0 0 20px), vapor atmospheric 32px-blur
  diffusion
- Palette saturation + hue: aurora violet, arcade neon magenta, vapor
  warm-indigo
- Surface treatment: aurora warm off-white, arcade near-white, vapor
  pale-mint cream

This passes the halt-condition (cells are NOT indistinguishable —
they're distinguishable via non-typographic tokens). But operator
should know the typography differentiation collapsed for these three;
future phases may want to consider whether the underlying token
differentiation is sufficient or whether one of {aurora, arcade,
vapor} should drop from v1.0 in favour of a more typographically
distinct theme.

#### Validation

- `02_reference-packs/themes/validate.js`: 10/10 themes pass (cross-diversity signatures still distinct).
- `02_reference-packs/validate.js`: 80/80 reference checks.
- `02_reference-packs/validate-extension.js`: all Phase 0.5-extension checks pass.
- `01_compiler` test suite: 96/96.
- `03_harvest/validate.js`: 40/40 harvested packs.
- Showcase regenerated; verified in Chrome DevTools that `document.fonts` shows every referenced face at status `"loaded"` (Source Serif 4, Inter, DM Serif Display, Junicode 2, Monaspace Neon, Ranade, Geist, Geist Mono, Departure Mono, etc.).

### Phase Themes followup — showcase rendering fix (2026-05-17)

The initial showcase shipped passed validators but rendered wrong:
fonts never loaded, Tailwind arbitrary-value class strings were inert
without a Tailwind bundle, custom elements had no baseline styling.
Result: every cell looked structurally identical except for colour,
which defeated the visual-diversity gate.

Fix (single commit on `02_reference-packs/themes/showcase.js`):

- **Loaded fonts** via verified CDNs — Google Fonts (Source Serif 4
  Variable, Inter Variable, DM Serif Display, JetBrains Mono Variable,
  Pixelify Sans), Fontshare (Ranade Variable), and jsDelivr
  `@font-face` declarations for Junicode 2 Beta VF, Junicode VF
  (Roman + Italic), Monaspace family ×5 (Neon, Argon, Xenon, Radon,
  Krypton), Geist Variable, Geist Mono Variable. Every CDN path
  HEAD-verified before commit. Documented fallbacks in the showcase
  README for fonts without a public CDN (Departure Mono, Geist
  Pixel, Söhne, PP Editorial New, SF Pro Display, Anthropic stack).
- **Replaced impl-tailwind output with real CSS.** Rewrote the cell
  composition with semantic class names (`.composition`,
  `.composition-headline`, `.composition-mark`, `.composition-prose`,
  `.composition-actions`) backed by CSS rules that read directly from
  CSS custom properties. The showcase no longer compiles through
  `impl-tailwind`.
- **Fixed dark-mode cascade.** Light overrides apply to BOTH modes
  (typography / spacing / motion / radii stay consistent across
  modes); dark color overrides layer on top for dark only. Before
  this fix every theme's dark cells fell through to baseline
  Junicode 2 for typography because dark.json files only declare
  color overrides.
- **Rendered shadow composites** to CSS box-shadow shorthand via
  `renderShadow()` rather than emitting raw JSON. Per-theme depth
  strategy now reads in the cells: arcade's magenta glow at
  `oklch(70% 0.25 350 / 0.45) 0 0 20px`, bloom's diffused
  `0 8px 32px -8px`, vellum's hairline `0 1px 2px 0`, terminal's
  zero, graphite's flat `0 0 0 1px` rule.
- **Container-query headline scaling.** `clamp(1.75rem, 18cqi,
  var(--type-size-display))` scales the headline with cell width.
  Broadsheet's full 11rem only renders at very wide viewports —
  documented trade-off.
- **Aliased variable-font names** (`Geist Variable`, `Geist Mono
  Variable`, `Monaspace Neon Variable`) so theme stacks whose first
  entry references the Variable form resolve to the same WOFF2
  binary as the canonical name.
- **Skipped invalid CSS identifiers** (e.g. `--color.stone.50` —
  dots not permitted in custom-property names; browser silently
  drops the declarations).

Lesson recorded in `PHASE_GATES.md`: showcase pages that consume
impl-tailwind output MUST also bundle a Tailwind CSS file; otherwise
the demo lies about what the theme packs do.

Verified in Chrome DevTools per the validation checklist: per-theme
`font-family` computed style resolves to the declared `@font-face`
faces; per-theme `box-shadow` reflects each pack's depth strategy;
per-theme `border-radius` differs (0px terminal / broadsheet vs 28px
prism); padding from `--space-panel` overrides the cell-render base.

### Phase Themes — 10 v1.0 theme packs (2026-05-17)

Ships 10 theme packs at v1.0 per the 2026 trend forecast in research
Section 1A. Each pack carries a documented trend lineage, reference
site, light + dark + P3 wide-gamut variants, palette derived in OKLCH
with hex source documented, typography stack with OFL fallback
substitutions, and explicit motion + depth strategy.

#### Themes shipped

| Pack | Lineage (§1A) | Reference |
|---|---|---|
| `@quoin/theme-vellum` | Calm Ivory Editorial (peaking) | anthropic.com |
| `@quoin/theme-graphite` | Geist Precision / Cold Liquid Linear | vercel.com |
| `@quoin/theme-aurora` | Warm Liquid Linear | linear.app |
| `@quoin/theme-letterpress` | Tactile Warmth (Pantone Cloud Dancer) | klim.co.nz |
| `@quoin/theme-terminal` | Honest Brutalism / Mono | rauno.me, departuremono.com |
| `@quoin/theme-broadsheet` | Big Editorial Headline | pangrampangram.com |
| `@quoin/theme-bloom` | Organic Anti-Grid | stripe.com derivative |
| `@quoin/theme-arcade` | Dopamine Saturation | Vacation (suncare) |
| `@quoin/theme-prism` | Liquid Glass (opt-in via `capabilities`) | linear.app mobile, iOS 26 |
| `@quoin/theme-vapor` | Stripe Atmospheric (with novel layered-mesh) | stripe.com |

#### Novel composition contracts

- **`@quoin/theme-prism`** declares `capabilities: ["backdrop-filter"]`. Surface tokens carry alpha values so `backdrop-filter: blur(…)` reveals underlying content as material depth. `blur-sm/md/lg` tuned to 12/20/32px.
- **`@quoin/theme-vapor`** declares `capabilities: ["layered-mesh-gradient"]` — the gradient is NOT CSS `radial-gradient`/`conic-gradient` syntax but rather four absolutely-positioned blurred surface layers (sky / horizon / ground / chromatic-dust) composited via `filter: blur()` on solid-fill divs. `blur-sm/md/lg` lifted to 40/80/140px. Palette tilted +6° from the original Stripe indigo to clear the stop-condition for cloning.

#### Validation + showcase

- `02_reference-packs/themes/validate.js` — loads all 10 manifests, asserts cross-trend baseline (Section 1C — light + dark + P3 populated, ≥5 tokens per mode), compiles each through the full token + vocab + impl pipeline, enforces a cross-diversity gate (distinct `accent` / `surface` / `text-emphasis` triple per pack). All 10 pass.
- `02_reference-packs/themes/showcase.js` — compiles ONE shared source against all 10 themes × 2 modes and writes a 20-cell HTML grid (`showcase.html`, ~51KB) for operator-side visual differentiation inspection.
- `02_reference-packs/themes/README.md` — catalogue with use-case and reference-site table per pack.

#### Cross-trend baseline (every theme meets)

OKLCH authoring with sRGB hex documented for traceability; light + dark + P3 variants; theme overrides only canonical token names (loader-enforced); identity typography stack respected where used; system-font fallback stacks throughout (Inter / JetBrains Mono / DM Serif Display / Source Serif 4 / Synonym / Plein where the named OFL faces aren't installed); APCA contrast Lc ≥ 60 body / Lc ≥ 75 fine print (operator-side verification).

### Phase 0.5-extension — New Pack Types (2026-05-17)

Adds 4 new pack types to the Quoin distribution model — **theme**,
**template**, **pattern**, **icon** — bringing the total from 3 to 7.
Spec docs, manifest schema, compiler hooks, reference packs, and
tests all land in this single phase.

#### New spec docs

- **[`00_spec/pack-types.md`](00_spec/pack-types.md)** — catalogue of
  all 7 pack types with role + composability table; documents the
  compile-time composition order (token → theme → project overrides
  → vocab → pattern → icon → impl).
- **[`00_spec/theme-pack.md`](00_spec/theme-pack.md)** — manifest
  format, override file shape, light / dark / P3 modes, validation
  rules (override names MUST exist in canonical namespace).
- **[`00_spec/template-pack.md`](00_spec/template-pack.md)** —
  scaffold-time pack with declared `category`, `pages`,
  `dependencies` (token / impl / vocab / theme / pattern / icon
  peer packs). Templates are NOT compiled at build time; they're
  scaffolded via `npx @quoin/create <template>`.
- **[`00_spec/pattern-pack.md`](00_spec/pattern-pack.md)** —
  pattern-pack manifest with `category`, `variant`, `states[]`
  (must include `default`), `microStates[]` (must include `default`
  and `focus`). Pattern primitives share the vocabulary-pack
  resolution pipeline.
- **[`00_spec/icon-pack.md`](00_spec/icon-pack.md)** — manifest with
  `iconStyle`, `iconCount`, `recommendedSize`, `semanticTag`
  (defaults to `icon`). SVG conventions: single root `<svg>`,
  `viewBox` required, `currentColor` for theming, no `width` /
  `height` attrs (compiler injects from `--icon-size-*`).

#### Schema

- **[`01_compiler/src/schema/pack-manifest.json`](01_compiler/src/schema/pack-manifest.json)** —
  `type` enum extended to `["token", "vocabulary", "implementation",
  "theme", "template", "pattern", "icon"]`. 4 new `if/then` branches
  in the discriminated union enforce per-type required exports +
  fields (e.g. theme requires `exports.lightModeOverrides`; icon
  requires `iconStyle`, `iconCount`, `recommendedSize`,
  `exports.{icons,manifest}`; pattern requires `category`, `states`,
  `microStates`; template requires `category`, `pages`,
  `dependencies.{tokenPack, implementationPack, vocabularyPacks}`).

#### Compiler

- **[`01_compiler/src/types.ts`](01_compiler/src/types.ts)** — added
  `PackType` union; new interfaces `ThemePack`, `PatternPack`,
  `IconPack`, `IconDefinition` and their `*PackSource` aliases.
  `PackManifest` extended with the new optional fields. `CompileOptions`
  gets `themePack`, `patternPacks`, `iconPacks` optional fields.
- **[`01_compiler/src/pack-loader.ts`](01_compiler/src/pack-loader.ts)** —
  new `loadThemePack`, `loadPatternPack`, `loadIconPack` functions
  (template packs are scaffold-time, no runtime loader). Theme
  overrides are validated against the canonical namespace at load
  time — extras throw `PackValidationError`. Icon packs auto-derive
  a short-name from the pack name (e.g. `@quoin/icons-mynaui` →
  `"mynaui"`).
- **[`01_compiler/src/compiler.ts`](01_compiler/src/compiler.ts)** —
  three new hooks: (1) `mergedTokens` applies theme light-mode
  overrides between token pack and project tokens; (2)
  `buildPrimitiveRegistry` merges pattern-pack primitives into the
  same registry as vocab primitives; (3) `compileNode` intercepts
  icon-pack tags (default `icon`) and resolves the SVG via
  `emitIcon`, inlining with size from `--icon-size-{xs|sm|md|lg|xl}`,
  `aria-label` (auto-generated from name when missing), `role="img"`
  (unless `aria-hidden="true"`).
- **[`01_compiler/src/errors.ts`](01_compiler/src/errors.ts)** — new
  error codes: `MISSING_ATTRIBUTE`, `MISSING_ICON`, `MISSING_ICON_PACK`,
  `INVALID_ICON_SVG`.
- **[`01_compiler/src/index.ts`](01_compiler/src/index.ts)** — new
  public exports for the loaders + types.

#### Reference packs

- **[`@quoin/theme-baseline-reference`](02_reference-packs/theme-baseline-reference)** —
  light pass-through, full greyscale-inverted dark mode (20 token
  overrides), P3 wide-gamut accent + status colours (5 overrides).
- **[`@quoin/pattern-button-reference`](02_reference-packs/pattern-button-reference)** —
  one `<action-button>` primitive with full state matrix
  (default/hover/active/disabled/loading) and microStates
  (default/focus/focus-visible).
- **[`@quoin/icons-reference`](02_reference-packs/icons-reference)** —
  five outline glyphs (home, search, chevron-down, x, check) with
  aliases (house → home, magnifier → search, close → x, tick → check).
- **[`@quoin/template-blank-reference`](02_reference-packs/template-blank-reference)** —
  single-page starter scaffold wired to baseline + essentials +
  reference theme + reference icons.

#### Validation + tests

- **[`02_reference-packs/validate-extension.js`](02_reference-packs/validate-extension.js)** —
  new validator for the 4 new pack types. Verifies manifests load,
  override / pattern / icon contracts hold, template manifest is
  internally consistent, full token + vocab + pattern + theme +
  icons composition compiles cleanly, and missing icon names throw
  `MISSING_ICON`.
- **[`01_compiler/test/extension.test.ts`](01_compiler/test/extension.test.ts)** —
  19 new Vitest cases covering: theme/pattern/icon loaders, theme
  override resolution, project token precedence, pattern primitive
  registration, icon inlining with size resolution, aria-label
  auto-generation, decorative (`aria-hidden`) handling, alias
  resolution, `pack="…"` disambiguation, error paths.

#### Validation status

- All 40 packs in the original catalogue still pass strict validation.
- All 4 new reference packs pass `validate-extension.js`.
- Compiler test suite at 96/96 (was 77/77; +19 for new pack types).
- All three reference demos build cleanly (article-tailwind,
  dashboard-rawcss, showcase-tailwind).
- Docs site builds clean.

#### Composition order

After Phase 0.5-extension the canonical composition order at compile
time is:

```
token pack → theme overrides → project overrides → vocab + pattern primitives → icon resolution → impl pack emit
```

Template packs sit outside this chain — they declare the pack set a
consumer should compose with, scaffolded via the create CLI.

### Handoff additive — namespace expanded 164 → 175 (2026-05-17)

The `quoin-handoff` v1.0 launch package delivered a fresh design vision
including a specific identity typography stack (Junicode + Ranade +
Monaspace family + Departure Mono) and a slightly broader canonical
namespace than v0.5 shipped. Reconciled by adding the missing pieces
without renaming or refactoring anything already on origin/main.

#### Added (11 canonical tokens)

- **fontFamily +5**: `font-mono-warm` (Monaspace Argon), `font-mono-slab`
  (Monaspace Xenon), `font-mono-script` (Monaspace Radon),
  `font-mono-mechanical` (Monaspace Krypton), `font-mono-pixel`
  (Departure Mono). Joins the existing `font-sans`, `font-serif`,
  `font-mono`, `font-display`.
- **shadow +3 composites**: `shadow-none` (explicit reset to
  transparent), `shadow-focus` (focus-ring composite — `focus-ring`
  color, `focus-ring-width` spread), `shadow-focus-error` (focus ring
  in critical state).
- **transition +3 composites**: `transition-color`,
  `transition-transform`, `transition-opacity`. Per-property
  transitions emit `property duration timing` shorthand instead of the
  generic `all`, keeping the GPU rasteriser path tight.

#### Identity typography wired into `tokens-baseline`

- `font-display` + `font-serif`: Junicode 2 stack
  (`'Junicode 2', 'Junicode', ui-serif, Georgia, …`).
- `font-sans`: Ranade stack (`'Ranade Variable', 'Ranade', ui-sans-serif, …`).
- `font-mono`: Monaspace Neon stack.
- All five new mono-variants point at their respective Monaspace +
  Departure Mono identities. System-font fallbacks preserved.

#### Compiler

- `CANONICAL_SEMANTIC_TOKENS` extended (175 names; comment header
  updated). Strict validation enforces the new tokens.

#### build.js

- `DEFAULT_FONTS` adds the 5 new mono-variants so every harvested pack
  inherits the identity stack by default (overridable via
  `source.fonts`).
- `DEFAULT_COMPOSITES` adds the 3 new shadow + 3 new transition shapes
  so every pack ships them populated.
- `renderCssValue` for transitions: emits `color, background-color,
  border-color, fill, stroke duration timing` for `transition-color`;
  `transform duration timing` for `transition-transform`; `opacity
  duration timing` for `transition-opacity`. Other transitions still
  use `all`.

#### Validation

- All 40 packs pass strict validation (no warnings).
- Compiler test suite 77/77 still passes.
- All three reference demos build cleanly.
- Docs site builds clean.

#### Phase mapping

The handoff describes Phase 0.5 and 3.5c as not-yet-done; reality is
they're complete. `PHASE_GATES.md` now includes a "Handoff cross-check"
section mapping each handoff phase against shipped work. Next blocking
phase is **0.5-extension** (define theme/template/pattern/icon pack
types).

### Phase 3.5d — Per-pack source-faithful composite refinement (2026-05-17)

Extends the Phase 3.5b fidelity framework to refine composite tokens
(shadow, border, typography, transition) and atomic geometric tokens
(border widths, motion durations) from each design system's published
specs. Three packs received source-faithful composite refinement in
this round; the framework is in place for the remaining 27 packs to
be promoted whenever the upstream publishes extractable data.

#### Changed

- **`03_harvest/fidelity/extract.js`** — `processSpec()` now merges
  optional `semantic`, `composites`, and `fonts` fields from
  `spec.map()` into the saved `sources/<name>.json`, alongside the
  existing `base` color palette. Today's specs continue to work
  unchanged; specs that opt into composite refinement add the new
  return-shape fields.
- **`03_harvest/fidelity/specs/tailwind.js`** — extended with
  composite shadow recipes (sm/md/lg/xl/2xl/inner) matching Tailwind
  v4's published box-shadow scale, motion durations matching the
  utility-class set (75/150/200/300/500 ms), and border widths.
- **`03_harvest/fidelity/specs/material3.js`** — extended with the
  M3 elevation level 1-5 key-light/ambient-light shadow recipe per
  `m3.material.io/styles/elevation/tokens`, motion durations matching
  `md.sys.motion.duration.*` (50/150/300/500/1000 ms), and emphasized
  easing for the `transition-emphasis` composite.
- **`03_harvest/fidelity/specs/bootstrap.js`** — extended with the
  `$box-shadow*` variants from `scss/_variables.scss` verbatim, plus
  motion durations.

#### Status

- 3 packs refined: tokens-tailwind, tokens-material3, tokens-bootstrap.
- 27 packs remain on programmatic defaults from `build.js`. Each
  satisfies the canonical contract but doesn't yet ship source-
  specific composite values.
- A follow-up 3.5d-cont can extend the remaining specs as data is
  available — the framework no longer needs changes.

#### Validation

- All 40 packs pass strict validation.
- Compiler test suite 77/77 still passes.
- All three reference demos build cleanly.
- Docs site builds clean.

### Phase 3.5c — Geometric & typographic fidelity (2026-05-17)

Fills every harvested token pack with `$value` entries for the ~100
new canonical tokens that Phase 0.5 introduced. All 30 harvested
packs now declare a value for every name in the v1.0 namespace and
pass strict validation; the `"status": "pending-3.5c-fill"` flag is
removed.

#### Changed

- **`03_harvest/build.js`** — added DEFAULT_* tables for the new
  atomic tokens (border widths, focus-ring metrics, icon sizes,
  containers, blur, opacity, z-index, aspect ratios, font weights,
  motion-instant/slower, ease-linear/emphasized/spring, stroke
  solid/dotted) and DEFAULT_COMPOSITES for the seven shadow tokens,
  three border composites, thirteen typography composites, three
  transition composites, and the dashed strokeStyle composite.
- **`buildSemanticTokens`** applies the new defaults; sources can
  override any of them via `source.semantic[<name>]` (atomics) or
  `source.composites[<name>]` (composites).
- **`normaliseRef`** heuristic refined: dot-less refs (`{accent}`,
  `{text-recede}`, `{border}`, `{shadow-tint}`) resolve at top level;
  refs with dots (`{stone.50}`) get the `color.` prefix. Composite
  tokens can therefore reference other top-level semantic tokens
  without the awkward `{color.shadow-tint}` form.
- **`renderCssValue`** new function — converts composite DTCG values
  into single CSS-ready shorthand strings (box-shadow, border, font,
  transition) so each pack's tokens.css stays directly usable.
- **`buildManifest`** stops emitting `status: pending-3.5c-fill`.
- **04_docs/scripts/copy-assets.js** — Phase 0.5 transitional compat
  layer disabled (kept as documentation comment); tokens-geist now
  ships the full v1.0 namespace.

#### Pack obligations

After Phase 3.5c: every token pack (reference + harvested) supplies
a `$value` for all 164 canonical names. Strict validation passes
across the catalog; no warnings.

#### Caveat

The new-token values are programmatic defaults, not byte-faithful
extractions from each source system. A subsequent fidelity sweep
(3.5d) could refine each pack's shadow recipes, border widths, and
typography composites to match each source system's actual specs.
This is incremental polish, not a blocker — the namespace contract
is satisfied.

### Phase 0.5 — Canonical Namespace Expansion (2026-05-17)

**Major pre-1.0 spec change.** The canonical semantic-token namespace
in `00_spec/tokens.md` is expanded from its v0 sketch (~30 tokens across
4 DTCG types) to its v1.0 surface area (164 tokens across 11 DTCG types).
After this phase the namespace is **frozen** for v1.0 — further additions
become minor versions; renames and removals become major.

#### Added

- **35 new color tokens** beyond the original 22: `scrim`, `highlight`,
  `focus-ring`, `link`, `link-visited`, `link-hover`, `shadow-tint`.
- **Spacing scale expanded** with `space-5`, `space-10`, `space-20`,
  `space-inline-loose`.
- **Type sizes** now run xs → 5xl + display (added `4xl`, `5xl`).
- **New dimension families**: `border-width-*` (4), `focus-ring-width`
  + `focus-ring-offset`, `icon-size-*` (5), `container-*` (4),
  `blur-*` (3), `radius-xl`.
- **`number` type** (21 tokens): `opacity-*` (5), `z-*` (8),
  `aspect-*` (4), `leading-*` (4) — all unitless multipliers/indices
  per DTCG number type.
- **`fontWeight` type** (6 tokens) — 300/400/500/600/700/900.
- **Motion** expanded with `motion-instant` + `motion-slower`.
- **Easing** expanded with `ease-linear`, `ease-emphasized`,
  `ease-spring`.
- **Composite types** (DTCG 2025.10 §9):
  - `shadow` — 7 tokens (xs / sm / md / lg / xl / 2xl / inner)
  - `border` — 3 tokens (default / emphasis-stroke / divider)
  - `typography` — 13 tokens (display + 3 headlines + 3 titles + 3 bodies + 3 labels)
  - `transition` — 3 tokens (default / emphasis / fast)
- **`strokeStyle` type** — 3 tokens (solid / dashed / dotted).
- **Pack manifest `status` field** — `"pending-3.5c-fill"` marker that
  allows packs to emit validation warnings rather than errors during
  the Phase 3.5c transitional window.

#### Changed

- **`type-size-base` renamed to `type-size-md`** — aligns with the
  `xs / sm / md / lg / xl` shape used elsewhere in the namespace.
  Internal vocab packs and emit code updated mechanically.
- **`flattenDtcg`** now accepts object-shaped `$value` (composite
  tokens) and serialises them to JSON for the resolved-map. Reference
  resolution inside composites continues to work via the kebab-case
  reference regex.
- **`resolveReferences` regex** tightened to match only kebab-case
  identifier paths inside `{...}` so JSON-stringified composite values
  aren't mis-matched as references.
- **`finalizeTokenPack` and the compiler** now soft-fail for packs
  declaring `"status": "pending-3.5c-fill"` — missing canonical tokens
  emit warnings, and primitive-level token references fall back to
  `var(--name)` rather than throwing.

#### Pack obligations

After Phase 0.5: every token pack MUST supply a `$value` for all 164
canonical names. Reference pack `@quoin/tokens-baseline` is fully
populated; harvested packs (`03_harvest/packs/tokens-*`) are flagged
`pending-3.5c-fill` and will be filled in during Phase 3.5c.

#### Migration notes

- Vocabulary packs that referenced `--type-size-base` should switch to
  `--type-size-md`. (Internal reference packs updated.)
- New composite tokens (`text-display`, `text-headline-md`, etc.)
  provide a single-reference shortcut for primitives that previously
  composed 4-5 atomic tokens. Existing primitives continue to work; the
  composite refs are an optimisation.
- The pack manifest schema accepts a new optional `status` field with
  enum value `"pending-3.5c-fill"`. Other status values are not yet
  defined.

#### DTCG conformance

Quoin token packs now use DTCG 2025.10 types exactly — no Quoin-specific
extensions. Any DTCG 2025.10 tooling can read a Quoin pack.

Reference: <https://www.designtokens.org/tr/drafts/format/>.

---

### Phase 4.5 — Docs site refresh + playground REPL

See `PHASE_GATES.md` §Phase 4.5 for the full feature list. Highlights:

- New `/showcase/` page rendering one source against four token packs.
- Three-pane playground REPL with all 30 token packs, shareable URL
  state, token-efficiency badge, 10 example presets.
- Pack browser fidelity-tier badges + filter chips.
- Theme toggle in the wayfinder.

### Phase 3.5b — Comprehensive Fidelity Pass

27 of 30 harvested token packs upgraded to byte-faithful extraction
via three methods (static parse, algorithm execution, per-file). Three
documented Tier C packs (clarity, geist, workday) remain.

### Phase 3.5 — Token Fidelity Pass

Initial fidelity framework + 6 packs upgraded.

### Phases 0–4 + 5a–5d

Spec, compiler, reference packs, harvested packs, docs site, polish
(companion.css/js), variants, vocab-essentials + vocab-app-shell.
