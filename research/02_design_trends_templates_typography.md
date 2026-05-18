# Quoin v1.0 Launch Reference Document

**Lead research feeding three downstream phases: theme pack research, template pack research, and Forme/typography pack research. Date: May 17, 2026. Quoin launch target: mid-to-late 2026.**

---

## PART 1 — 2026 DESIGN TREND FORECAST

### Section 1A: 2026 Trend Taxonomy (10 named trends)

Each entry: visual signature · palette · type · motion · depth · ornament · layout · exemplars · sources · trajectory · Quoin pack recommendation.

#### 1. Calm Ivory Editorial (peaking)

**Visual signature:** Warm-paper page surface (never #fff), serif display at broadsheet scale, achromatic UI with single earthy accent held in reserve, word-level `text-decoration` underline replacing color as the sole emphasis mechanism.

- **Palette:** `#faf9f5` (Ivory Light page base), `#141413` (near-black ink), `#d97757` (terracotta accent, held in reserve in tokens), `#f0eee6` and `#e3dacc` (warm card surfaces).
- **Type:** Anthropic Sans (UI/body, tight tracking) + Anthropic Serif (display at 91px / weight 400 on dark cards). Both are proprietary to Anthropic; historically the site used Styrene by Berton Hasebe + Tiempos by Klim. Anthropic Mono appears in metadata/category labels.
- **Motion:** Restrained, ~200–280ms ease-out on link/button states; page transitions absent or instant.
- **Depth:** Effectively flat. No drop shadows. Color-surface differentiation (cream cards on ivory page) substitutes for elevation.
- **Ornament:** Thick text-decoration underline on a single headline keyword; otherwise zero.
- **Layout:** Single-column editorial measure with full-bleed dark feature cards as interludes; asymmetric `borderRadius` on the primary CTA (0px 0px 8px 8px — flat top, rounded bottom).
- **Exemplars:** anthropic.com, claude.ai/cli_landing, openai.com, modern Substack publication chrome.
- **Published sources:** Refero Styles Anthropic style reference; FontOfWeb anthropic.com design tokens extraction; Webspec "The Top New & Current Website Design Trends to Watch in 2026" (Feb 2026); Type Today "Styrene in use: ANTHROP\\C".
- **Trajectory:** Peaking.
- **Quoin pack recommendation:** **YES** — `@quoin/theme-vellum`.

#### 2. Liquid Linear (established → bifurcating)

**Visual signature:** Near-black or warm-neutral surface, hairline borders, frosted-glass material as elevation, optional gradient-violet anchor, restrained chromatic budget.

- **Palette:** `#08090a`–`#16161a` near-black grounds; warm-gray neutrals; single purple/violet accent `#5e6ad2`-family; optional gradient mesh top-third.
- **Type:** Vercel uses Geist (OFL); Geist Sans + Geist Mono + Geist Pixel (Geist Pixel released February 6, 2026 with five variants).
- **Motion:** GPU-driven specular highlights; 250–400ms cubic-bezier; page transitions subtle.
- **Depth:** Custom frosted-glass material — Linear built their own implementation of Apple's WWDC-2025 Liquid Glass rather than adopting Apple's APIs.
- **Ornament:** Hairlines, focus rings, frosted overlays only.
- **Layout:** Inverted-L app chrome; Linear's `ResponsiveSlot` component hides header content by priority based on available space.
- **Exemplars:** linear.app, vercel.com, raycast.com, cursor.com.
- **Published sources:** linear.app/now/behind-the-latest-design-refresh; linear.app/now/linear-liquid-glass; vercel.com/font; vercel.com/blog/introducing-geist-pixel.
- **Trajectory:** Established and bifurcating into "warm-Linear" and "cold-Linear" directions.
- **Quoin pack recommendation:** **YES** — `@quoin/theme-graphite` (cold-Linear) AND `@quoin/theme-aurora` (warm-Linear).

#### 3. Tactile Warmth / Texture Return (emerging)

**Visual signature:** Grain overlays, organic gradients, material-inspired surfaces, warmth as deliberate counter to AI sterility.

- **Palette:** Earthy/muted tones. Pantone Color of the Year 2026 is **PANTONE 11-4201 Cloud Dancer**, announced December 4, 2025. Companion palette: cream, sand, oat, terracotta, dusty olive.
- **Type:** Mixed serif-and-sans; humanist sans paired with editorial serifs.
- **Motion:** Slow (400–800ms), eased, sparse.
- **Depth:** Texture replaces shadow. SVG noise filters; grain overlays at 3–8% opacity.
- **Ornament:** Subtle grain, hand-rule dividers, archival photography.
- **Layout:** Magazine-grid rhythm, generous margins, asymmetric content blocks.
- **Exemplars:** klim.co.nz, are.na, notion.so.
- **Published sources:** Webspec 2026 trends; Wix "11 Biggest Web Design Trends of 2026"; Webflow Blog "8 web design trends to watch in 2026".
- **Trajectory:** Emerging.
- **Quoin pack recommendation:** **YES** — `@quoin/theme-letterpress`.

#### 4. Honest Brutalism / Editorial Mono (emerging, niche)

**Visual signature:** Monospaced UI, asymmetric typography, exposed structure, near-black grounds with one ultra-bright accent.

- **Palette:** True-black/near-black grounds; paper-cream or terminal-green text; one acidic accent.
- **Type:** Monaspace / Geist Mono / Departure Mono / IBM Plex Mono in nav; JetBrains Mono in code.
- **Motion:** Snap. 80–150ms linear; no easing.
- **Depth:** Zero. Hairline borders only, often dashed.
- **Ornament:** ASCII rules, terminal prompt characters, Unicode box-drawing.
- **Layout:** Asymmetric, grid-broken, deliberate column-collision.
- **Exemplars:** rauno.me, posthog.com, departuremono.com, commitmono.com.
- **Trajectory:** Emerging in technical-brand subculture.
- **Quoin pack recommendation:** **YES** — `@quoin/theme-terminal`.

#### 5. Dopamine Saturation (peaking — broad-consumer)

**Visual signature:** Hyper-saturated palettes; neon pink, electric blue, acid red; high-contrast pairings; Y2K-nostalgia overtones.

- **Palette:** Neon magenta `oklch(70% 0.25 350)`, acid lime `oklch(78% 0.2 130)`, electric blue `oklch(60% 0.3 270)`.
- **Type:** Bold display sans (PP Editorial New, PP Fragment Sans, Clash Display).
- **Motion:** Energetic, 250–500ms with spring/overshoot.
- **Depth:** Flat with colored glow shadows.
- **Layout:** Magazine-poster grids; oversized type.
- **Exemplars:** Vacation, Lush, Headspace, Starface.
- **Trajectory:** Peaking in consumer-lifestyle; declining in B2B.
- **Quoin pack recommendation:** **MAYBE** — `@quoin/theme-arcade`.

#### 6. Organic Anti-Grid / Flowing Layouts (emerging)

**Visual signature:** Flowing lines, soft gradients, irregular section boundaries.

- **Palette:** Soft pastel-to-mid gradients; cream-to-coral, sage-to-cream.
- **Type:** Humanist sans; occasional display-serif pairing.
- **Motion:** Slow, fluid (600–1200ms ease-in-out); scroll-tied morphing.
- **Depth:** Soft gradient washes; little hard shadow.
- **Layout:** Sections without right angles; flow-into-flow transitions.
- **Exemplars:** stripe.com, wise.com, cash.app.
- **Trajectory:** Emerging in marketing-site context.
- **Quoin pack recommendation:** **YES** — `@quoin/theme-bloom`.

#### 7. Big Editorial Headline / Display-Type Centerpiece (established)

**Visual signature:** Type IS the design. 100px+ headlines; headline-as-hero with minimal supporting content.

- **Type:** PP Fragment, PP Editorial New, GT Alpina, Söhne, Inter Display, Anthropic Serif. Variable font axes exposed.
- **Motion:** Type-centric — weight/width morph on scroll; character-cycling hover.
- **Layout:** Headline takes 60–80% of first screen.
- **Exemplars:** pangrampangram.com, productiontype.com, displaay.net, klim.co.nz, fontshare.com.
- **Trajectory:** Established for typographic brands.
- **Quoin pack recommendation:** **YES** — `@quoin/theme-broadsheet`. Overlaps with Forme template line.

#### 8. Geist Precision / Swiss Black-and-White (established)

**Visual signature:** Tight Swiss grid; pure-black-on-white or pure-white-on-black; single accent used sparingly.

- **Palette:** `#000`/`#fff` plus one accent. Hairline `1px` borders at `#e5e5e5`.
- **Type:** Geist Sans + Geist Mono + Geist Pixel (OFL).
- **Motion:** Very short (120–200ms cubic-bezier), purposeful.
- **Depth:** Flat. Hairline borders only.
- **Exemplars:** vercel.com, v0.dev, replit.com, basement.studio.
- **Published sources:** vercel.com/font; vercel.com/geist/typography; vercel.com/design/guidelines.
- **Trajectory:** Established and now defining the developer-tooling visual default.
- **Quoin pack recommendation:** **YES** — `@quoin/theme-geist`.

#### 9. Stripe Atmospheric Gradient (established, mature)

**Visual signature:** Recognizable gradient-mesh atmospheric backdrop occupying the upper page.

- **Palette:** Cream `#f6f9fc`, Indigo `#533afd`, Indigo Deep `#4434d4`, Navy `#0a2540`.
- **Type:** Söhne by Klim Type Foundry, designed by Kris Sowersby, released 2019. Weight 300 display tier with negative tracking from -1.4px (at 56px) to -0.2px (at smaller sizes). Tabular numerics on any monetary cell. `ss01` enabled globally for the single-story `a`.
- **Motion:** Smooth, 250–400ms.
- **Depth:** Soft diffused shadow `rgba(0,0,0,0.2) 0 0 32px 8px`; 4px and 6px radii for buttons/cards.
- **Exemplars:** stripe.com, brex.com, wise.com, ramp.com.
- **Trajectory:** Mature; widely copied.
- **Quoin pack recommendation:** **MAYBE** — `@quoin/theme-vapor`, only if the gradient generator is novel.

#### 10. Liquid Glass / Frosted Material (emerging, post-WWDC 2025)

**Visual signature:** Frosted-glass material with physically-modeled light response.

- **Palette:** Translucent overlays at 30–60% opacity with `backdrop-filter: blur(12px–24px)`; tinted-glass variants.
- **Motion:** Light moves through space; 200–400ms organic ease.
- **Depth:** Material AS depth, not shadow.
- **Layout:** Floating bars, tab bars that can change shape.
- **Exemplars:** linear.app mobile (Oct 2025); iOS 26 system.
- **Trajectory:** Emerging strongly in 2026; oversaturation risk.
- **Quoin pack recommendation:** **MAYBE** — `@quoin/theme-prism`. Ship as opt-in.

### Section 1B: Counter-trends (recede / avoid)

1. **Pure glassmorphism (2021–2022 wave)** — stale unless reincarnated as Liquid Glass.
2. **Neumorphism (2020–2022)** — universally dead.
3. **Peak maximalist illustration (2022–2023 Stripe-derivative)** — Stripe themselves have receded from this.
4. **Y2K sticker-pack neubrutalism (2023–2024)** — now associated with template-mills.
5. **Generic Linear-clone "dark + purple glow"** — themes must differentiate, not replicate.

### Section 1C: Cross-trend baseline expectations (every 2026 theme must meet)

- **OKLCH color authoring** with sRGB hex fallbacks via `@supports`. Global oklch() support is 91.98% as of April 2026.
- **P3 wide-gamut opt-in.** Ship P3-saturated and sRGB-clamped variants; respect `@media (color-gamut: p3)`.
- **Variable font usage** wherever source supports them.
- **Dark mode as default consideration.** Light AND dark per theme. Use `prefers-color-scheme` plus opt-in toggle.
- **`prefers-reduced-motion` respect.** Motion tokens define reduced-motion fallback.
- **Tabular numerics by token.** `text-body-tabular` composite sets `font-variant-numeric: tabular-nums`.
- **APCA contrast targeting.** Default Lc ≥ 60 for body, Lc ≥ 75 for fine print.
- **System font fallback stack with metric overrides** (`ascent-override`, `descent-override`, `size-adjust`).
- **`font-display: swap` + subset strategy.** Latin core preloaded; non-Latin Unicode-range lazy-loaded. WOFF2 only.
- **Touch target minimums.** 44×44 CSS px (Apple HIG / WCAG 2.5.5).

### Section 1D: Theme pack recommendations (10 packs)

| Pack | Lineage | Use case | Reference |
|---|---|---|---|
| `@quoin/theme-vellum` | Calm Ivory Editorial | Research labs, AI, scholarly publishing | anthropic.com |
| `@quoin/theme-graphite` | Cold Liquid Linear / Geist | Developer tooling, infra, B2B SaaS | vercel.com |
| `@quoin/theme-aurora` | Warm Liquid Linear | Project management, productivity | linear.app |
| `@quoin/theme-letterpress` | Tactile Warmth | Studio sites, agency portfolios | klim.co.nz |
| `@quoin/theme-terminal` | Honest Brutalism / Mono | Engineering blogs, terminal apps | rauno.me / departuremono.com |
| `@quoin/theme-broadsheet` | Big Editorial Headline | Editorial publications | pangrampangram.com |
| `@quoin/theme-bloom` | Organic Anti-Grid | Consumer apps, lifestyle SaaS | stripe.com derivative |
| `@quoin/theme-arcade` | Dopamine Saturation | Consumer products, creator tools | Vacation suncare |
| `@quoin/theme-prism` | Liquid Glass | Mobile-first, post-iOS-26 native feel | linear.app mobile |
| `@quoin/theme-vapor` | Stripe Atmospheric | Fintech, payment infra, dev-marketing | stripe.com |

---

## PART 2 — REFERENCE-SITE TEARDOWNS

### Section 2A: Per-template-type teardowns

#### Personal blog (longform essay site)
- **References:** rauno.me, paulgraham.com, gwern.net, jasonsantamaria.com.
- **IA:** Home (essay list) → essay → optional notes/about. 2–4 routes.
- **ATF:** Typographic wordmark + lede paragraph OR direct table-of-contents. No hero imagery.
- **Distinctive moves:** Marginalia / footnotes-as-sidenotes; reading-progress affordance; full typographic ownership; keyboard navigation.
- **Density:** 1,500–10,000+ words per essay. Single column 65–75ch.
- **Primitives required:** Long-form article body, footnote pattern, prev/next nav, RSS link, sidenote.
- **Quoin approach:** `@quoin/template-longform`.

#### Library docs (multi-version, with API reference)
- **References:** stripe.com/docs, react.dev, tailwindcss.com/docs, vercel.com/docs, linear.app/docs.
- **IA:** Sidebar (3-level) + main + on-page TOC + version switcher + command palette (⌘K).
- **Distinctive moves:** Deep-link everything; anchored headings with `scroll-margin-top`; tabular numerics; ellipsis character; scroll position persists on back/forward; locale-aware formatting.
- **Primitives required:** Sidebar nav (3-level), command palette, code block with copy + language switcher, callout, version switcher, on-page TOC, search overlay.
- **Quoin approach:** `@quoin/template-docs-pro`.

#### SaaS landing (developer-tooling subgenre)
- **References:** stripe.com, vercel.com, linear.app, cursor.com, posthog.com.
- **IA:** 5–8 pages — home, product (1–3), pricing, docs, blog, customers, login.
- **ATF:** Animated hero with product mock OR headline + dual CTA.
- **Distinctive moves:** Trust strip, social proof below hero, feature grid (3 or 6), interactive product demo embed, pricing CTA above footer.
- **Primitives required:** Hero with animated product mock, logo strip, feature grid, testimonial, pricing table, FAQ accordion, footer-mega.
- **Quoin approach:** `@quoin/template-saas-pro`.

#### Pricing-only page
- **References:** stripe.com/pricing, linear.app/pricing, vercel.com/pricing, openai.com/api/pricing.
- **IA:** One page — table + FAQ + sales CTA.
- **Distinctive moves:** Annual/monthly toggle, "most popular" tier highlighting, enterprise tier with "talk to sales" CTA.
- **Primitives required:** Pricing card, tier comparison table, toggle, FAQ accordion.
- **Quoin approach:** `@quoin/template-pricing`.

#### Issue tracker (Linear-style)
- **References:** linear.app, height.app, plane.so, github.com/issues.
- **IA:** Inverted-L chrome — left sidebar + top action bar + main view + properties drawer. Routes: /inbox /issues /projects /views /settings.
- **Distinctive moves:** ResponsiveSlot-pattern header, instant transitions without spinners, ⌘K command palette as primary nav.
- **Primitives required:** Sidebar tree, top action bar, issue list row, issue detail drawer, command palette, multi-select with bulk action, status pill, assignee avatar.
- **Quoin approach:** `@quoin/template-app-tracker`.

#### Type foundry / font specimen site
See **Part 3C — Forme** for full specification.

(Full 25–30 template teardowns produced in template-pack execution phase.)

### Section 2B: Pattern primitive census

| Pattern | Templates needing | Priority |
|---|---|---|
| Hero (5+ variants) | 25+ | P0 |
| Footer-mega | 28+ | P0 |
| Header / top-nav (4+ variants) | 30 | P0 |
| Button system | 30 | P0 |
| Form field (full set) | 25+ | P0 |
| Feature grid | 20+ | P0 |
| Pricing tiers | 10+ | P0 |
| Testimonial | 15+ | P0 |
| Logo strip / trust bar | 12+ | P1 |
| Code block with copy + language label | 8+ | P1 |
| Command palette (⌘K) | 6+ | P1 |
| Sidebar nav (3-level, collapsible) | 6+ | P1 |
| FAQ accordion | 15+ | P1 |
| Article body | 10+ | P1 |
| CTA banner | 18+ | P1 |
| Auth form | 5 | P1 |
| Dashboard shell | 5+ | P1 |
| Data table | 6+ | P1 |
| Specimen block | 5 (Forme) | P2 |
| Glyph grid | 5 (Forme) | P2 |
| Variable axis slider | 5 (Forme) + 1 (settings) | P2 |
| OpenType feature toggle | 5 (Forme) | P2 |
| Comparison view | 6 (Forme + comparison page) | P2 |
| License matrix | 5 (Forme) | P2 |

### Section 2C: Production-quality benchmarks

1. **All states designed.** Empty, sparse, dense, error, loading, success.
2. **Typographic precision.** Curly quotes; ellipsis character; tabular numerics for monetary/comparison cells.
3. **Focus management.** Visible focus rings; focus trap in modals; autofocus on primary input only on desktop.
4. **Microstates.** Hover, active, focus, disabled, loading — each explicitly designed.
5. **Locale-aware.** Date, time, number, currency formatting via `Intl.*` APIs.
6. **Internationalization.** Layouts handle short, average, very-long content.
7. **Accessible naming.** Icons have labels; status conveyed by text + color.
8. **Performance budget.** LCP < 2.5s, CLS < 0.1, INP < 200ms.
9. **Deep-linkability.** Filters, tabs, pagination, expanded panels all in URL.
10. **Forgiving interactions.** 44×44 minimum hit targets.
11. **AI-prototyping discipline.** Components structurally legible — tokens → atoms → molecules → blocks.

---

## PART 3 — IDENTITY TYPOGRAPHY RESEARCH + FORME SPECIFICATION

### Section 3A: Junicode 2 OpenType feature inventory

**License:** SIL Open Font License 1.1. Source: github.com/psb1558/Junicode-font. Designer: Peter S. Baker.

**Stylistic Sets (ssXX):**

| Tag | Named | Visual effect |
|---|---|---|
| ss01 | Alternate-thorn-and-eth | Nordic Þ Ð þ ð shapes |
| ss02 | Insular-letter-forms | Medieval Northern-European insular forms |
| ss03 | Alternate-Greek | Alternative Greek glyph shapes |
| ss04 | High-overline | Higher overline |
| ss05 | Medium-high-overline | Mid-high overline |
| ss06 | Enlarged-minuscules | Lowercase scaled to cap-height |
| ss07 | Underdotted | Dot-below diacritic |
| ss08 | Contextual-long-s | Long-s used contextually |
| ss10 | Entities | Entity glyphs |
| ss12 | Early-English-futhorc | Anglo-Saxon runic |
| ss13 | Elder-futhark | Elder Futhark runic |
| ss14 | Younger-futhark | Younger Futhark runic |
| ss15 | Long-branch-to-short-twig | Runic variant |
| ss16 | Contextual-r-rotunda | Round-r after rounded letters |
| ss17 | Rare-digraphs | Rare digraph forms |
| ss18 | Old-style-punctuation-spacing | Pre-typewriter punctuation spacing |
| ss19 | Latin-to-Gothic | Gothic-blackletter shapes |
| ss20 | Low-diacritics | Lower-positioned diacritics |

**Character Variants (cvXX) — 90+ defined**, including cv01 Alternate A (3 variants), cv02 Alternate a (5 variants), and continuing through cv99.

**Standard OpenType features:** `liga` (default on), `dlig`, `hlig`, `hist`, `smcp`, `c2sc`, `c2sp`, `onum`, `lnum`, `pnum`, `tnum`, `sups`, `subs`, `frac`, `numr`, `dnom`, `kern` (default on), `mark`/`mkmk`, `locl`, `case`.

**Variation axes:** Standard `wght` and `wdth`, plus the `ENLA` axis (Enlarged-Minuscules) driven via `font-variation-settings`.

**Browser support (May 2026):** `font-feature-settings` universal. `font-variant-alternates: styleset()` Chrome/Firefox support; Safari partial — always provide `font-feature-settings` fallback. `font-variation-settings` universal.

**Highest-identity-differentiation features for Quoin showcase:**
1. `ss02` (Insular letter forms) — most visually distinctive.
2. `ss06` (Enlarged minuscules) — unique inverse-small-caps.
3. `ss08` (Contextual long-s) — period-piece signal.
4. `ss12`–`ss15` — full Anglo-Saxon and Norse runic substitution.
5. `hlig` — historical ligatures.
6. `ss16` — contextual r-rotunda.

**Recommended activation defaults:**

```css
/* Showcase / hero / identity moments */
.text-junicode-showcase {
  font-family: "Junicode VF", "Junicode", "Iowan Old Style", "Cambria", serif;
  font-feature-settings: "kern", "liga", "calt", "onum", "pnum";
}

/* Rare period-showcase moments */
.text-junicode-medieval {
  font-feature-settings: "kern", "liga", "calt", "hlig", "ss02", "ss08", "ss16";
}

/* Body */
.text-junicode-body {
  font-feature-settings: "kern", "liga", "calt", "onum", "pnum";
}
```

### Section 3B: Pairing harmonics — Junicode + Ranade + Monaspace + Departure Mono

**Stack roles:**

| Face | License | Role |
|---|---|---|
| Junicode 2 | OFL 1.1 | Display + headline + identity |
| Ranade | OFL via ITF Fontshare | Body + general UI |
| Monaspace (5 textures) | OFL 1.1 | UI labels, nav, data tables, code |
| Departure Mono | OFL 1.1 | Pixel-period captions, terminal accents |

**Ranade vitals:** Designed by Easha Ranade at Indian Type Foundry. 10 styles across 5 weights × upright + oblique italic. Tall x-height; ascenders rise slightly above cap-height. Neo-grotesque with sharp diagonal-stroke contrast. Uppercase has no descenders. Distributed under OFL via Fontshare.

**Monaspace five-texture assignments:**

| Texture | Genre | Quoin context |
|---|---|---|
| **Neon** | Neo-grotesque sans | Primary mono-label role |
| **Argon** | Humanist sans | Marketing-doc inline code |
| **Xenon** | Slab serif | Inline `<kbd>`, editorial code |
| **Radon** | Handwriting | Annotations |
| **Krypton** | Mechanical sans | AI suggestion text |

**Departure Mono characteristics:** OFL 1.1, designed by Helena Zhang, released Sept 2024. Single style. v1.350 ships 775 glyphs. **Pixel-perfect at multiples of 11px.** 80s/90s command-line aesthetic.

**Suggested type scale:**

```css
--text-display:        "Junicode VF" 96px / 1.05 / 400 / -0.02em;
--text-headline-lg:    "Junicode VF" 64px / 1.1  / 400 / -0.015em;
--text-headline-md:    "Junicode VF" 48px / 1.15 / 500 / -0.01em;
--text-headline-sm:    "Junicode VF" 32px / 1.2  / 500 / -0.005em;

--text-title-lg:       "Ranade"      24px / 1.25 / 600 / 0;
--text-title-md:       "Ranade"      20px / 1.3  / 600 / 0;
--text-title-sm:       "Ranade"      16px / 1.35 / 600 / 0;

--text-body-lg:        "Ranade"      18px / 1.55 / 400 / 0;
--text-body-md:        "Ranade"      16px / 1.55 / 400 / 0;
--text-body-sm:        "Ranade"      14px / 1.5  / 400 / 0;

--text-label-lg:       "Monaspace Neon" 14px / 1.4 / 500 / 0.02em / uppercase;
--text-label-md:       "Monaspace Neon" 12px / 1.4 / 500 / 0.04em / uppercase;
--text-label-sm:       "Monaspace Neon" 11px / 1.4 / 500 / 0.06em / uppercase;

--text-mono:           "Monaspace Neon" 14px / 1.55 / 400 / 0;
--text-mono-caption:   "Departure Mono" 11px / 1.45 / 400 / 0;
--text-mono-kbd:       "Monaspace Xenon" 13px / 1.4 / 500 / 0;
```

**Font loading strategy:**

```html
<link rel="preconnect" href="https://cdn.quoin.style" crossorigin>
<link rel="preload" href="/fonts/Ranade-Variable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/Junicode-Variable.woff2" as="font" type="font/woff2" crossorigin>
```

```css
@font-face {
  font-family: "Ranade";
  src: url("/fonts/Ranade-Variable.woff2") format("woff2-variations");
  font-weight: 100 700;
  font-display: swap;
  ascent-override: 95%;
  descent-override: 25%;
  line-gap-override: 0%;
  size-adjust: 100%;
}
```

Self-host all four identity faces. Latin core preloaded; Greek/Cyrillic/runic lazy-loaded via Unicode-range. WOFF2 only.

### Section 3C: Forme aesthetic specification

Forme is a deliberately specialized template/pattern line for typography-and-letterpress-aesthetic sites.

**Reference canon:** klim.co.nz, pangrampangram.com, productiontype.com, grillitype.com, monaspace.githubnext.com, commitmono.com, displaay.net, sharptype.co, lineto.com, abcdinamo.com, dinamodarkroom.com, fontgauntlet.com, fontshare.com.

**18 Forme Primitives:**

#### F.01 — Specimen Block
Huge type rendered AS content. `<section class="forme-specimen" data-specimen-scale="display">` containing text at 8vw–18vw. Pattern: `@quoin/pattern-specimen-block`.

#### F.02 — Glyph Grid
Exhaustive character browser, paginated by Unicode block, click-to-magnify. `<div class="forme-glyph-grid">` of `<button class="forme-glyph">` cells. Pattern: `@quoin/pattern-glyph-grid`.

#### F.03 — OpenType Feature Toggle Panel
Two-pane controls + live preview. Toggling applies `font-feature-settings` in real time. Pattern: `@quoin/pattern-otf-toggles`.

#### F.04 — Variable Axis Slider Rail
`<div class="forme-axis-rail">` with `<input type="range">` per axis. Updates `font-variation-settings`. Pattern: `@quoin/pattern-axis-rail`.

#### F.05 — Comparison View
Two faces side-by-side at matched optical sizes. Drag-to-resize divider. Pattern: `@quoin/pattern-comparison-pane`.

#### F.06 — Sample Text Input
`<div contenteditable="true">` styled at display size. Persistent via sessionStorage. Pattern: `@quoin/pattern-text-tester`.

#### F.07 — License Matrix Table
Multi-axis pricing (company size × style × license × territory). Pattern: `@quoin/pattern-license-matrix`.

#### F.08 — Specimen Book PDF Download
Print-fidelity specimen as downloadable artifact. CTA group. Pattern: `@quoin/pattern-specimen-cta`.

#### F.09 — Designer/Foundry Credit Panel
Designer, foundry, year, language coverage stats. Pattern: `@quoin/pattern-credit-panel`.

#### F.10 — Usage Gallery / "In Use"
Editorial-grid of client work. Filterable. Pattern: `@quoin/pattern-in-use-gallery`.

#### F.11 — Character-Cycling Hover State
Text cycles through alternative glyphs from `cvXX` sets. ~80ms cadence, settles after 300–500ms. Respects `prefers-reduced-motion`. Pattern: `@quoin/pattern-char-cycle`.

#### F.12 — Mono-Only Navigation
Site-wide navigation in monospaced face. All caps, 0.04–0.08em letter-spacing. Pattern: `@quoin/pattern-nav-mono`.

#### F.13 — Specimen-Scale Generous Whitespace
`min-height: 100vh`, `padding-block: clamp(8rem, 20vh, 16rem)`. Token: `@quoin/tokens-forme-spacing`.

#### F.14 — Keyboard Navigation HUD
Persistent footer revealing keyboard shortcuts. Pattern: `@quoin/pattern-kbd-hud`.

#### F.15 — In-Browser Font Builder
Pre/post-purchase customization. Bakes font client-side via `opentype.js`. Pattern: `@quoin/pattern-font-builder` (v1.1 candidate).

#### F.16 — Variable-Font Animated Playground
Standalone playground animating every variable axis. Template: `@quoin/template-forme-playground`.

#### F.17 — Process / Essay Long-Form Editorial
Foundry-as-publisher long essays. Pattern: `@quoin/pattern-foundry-essay`.

#### F.18 — Foundry / About Surface
Designer roster, manifesto, hiring. Pattern: `@quoin/pattern-foundry-about`.

**Forme template pack candidates:**

- `@quoin/template-forme-foundry` — Full multi-typeface foundry site (Klim/Pangram archetype). Patterns: F.01, F.02, F.03, F.04, F.05, F.06, F.07, F.08, F.09, F.10, F.13, F.17, F.18.
- `@quoin/template-forme-microsite` — Single-typeface promotional microsite (Commit Mono / Geist Font / Monaspace archetype). Patterns: F.01, F.02, F.03, F.04, F.06, F.08, F.12, F.13, F.14.
- `@quoin/template-forme-playground` — Variable-font playground tool. Patterns: F.04, F.06, F.13, F.16.

---

## Closing — Open Questions & Gaps Requiring Follow-Up

1. **Ranade full ss/cv inventory.** ITF's full OpenType feature listing for Ranade not retrievable from primary sources. Verify against Fontshare's per-style download specimen sheet.
2. **Junicode 2 italic readiness.** Docs say italic is "not yet ready." Confirm release status before promising italic body-text support.
3. **Anthropic Sans/Serif licensing.** Proprietary. `@quoin/theme-vellum` must use a near-equivalent OFL pair.
4. **Geist Pixel five-variant integration.** Decide whether Quoin pixel-mono tokens map to Departure Mono or Geist Pixel or both.
5. **Liquid Glass capability detection.** Gate physical-light variant behind capability detection.
6. **APCA vs WCAG 2.2 policy.** Target both — APCA primary, WCAG as compliance fallback.
7. **Sharp Type / Dinamo primitive re-verification.** Re-verify via fresh manual inspection during Forme execution.
8. **AI-tool fidelity to `font-variation-settings`.** Validate whether v0 / Cursor / Claude Code correctly emit when generating components.
9. **Anthropic site real-time refresh.** Re-verify within 30 days of `@quoin/theme-vellum` lock.
