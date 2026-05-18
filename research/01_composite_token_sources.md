# Quoin v1.0: Design Token Source Reference and Vocabulary Pack Expansion Plan

## TL;DR
- **27 of 30 token packs are reachable at source-faithful composite-layer fidelity** with the URLs and licenses documented below; 3 systems (Stripe, Linear, Spotify Encore) are permanent Tier C with documented reasons (no public token export).
- **Recommended Tier-A execution order:** Material 3, Carbon, Fluent 2, Polaris, Atlassian, Spectrum, Open Props, USWDS, GOV.UK, Tailwind, Radix, MUI, Ant Design, Bootstrap, Base Web — these have the richest composite-layer specs and the cleanest licenses (MIT / Apache-2.0 / BSD / OGL).
- **Vocab packs: ship 22 total for v1.0** — keep the existing 10, add 12 new packs (commerce, settings, dataviz, auth, nav, content, notifications, states, search, comments, calendar, kanban) plus one Material-style and one Fluent-style framework-mirror pack.

## Key Findings

1. **Composite-layer data is broadly public for first-party systems.** Material 3, Carbon, Polaris, Fluent 2, Primer, Atlassian, Spectrum, Workday Canvas, Gestalt, Twilio Paste, USWDS, GOV.UK, Open Props, Tailwind, Bootstrap, MUI, Ant Design, Mantine, Bulma, Orbit, Base Web, Evergreen, EUI all publish at least 7 of the 11 DTCG composite categories Quoin needs. The category most commonly missing across the board is **aspect-ratio tokens** (only Open Props, Bootstrap utilities, and a few others document these). The second most commonly missing is **blur** (only Open Props, Fluent 2 indirectly, and Material 3 Expressive have it as a token).

2. **Three systems must remain Tier C.** Stripe, Linear, and Spotify Encore each have proprietary token systems with no public export. Stripe publishes a *partial* skin surface via the Elements Appearance API and Stripe Apps `css` prop (typed names like `xxlarge`, not raw px). Linear ships no public tokens — its "Method" page is principles only. Spotify Encore is internal; only qualitative blog posts exist. For these three, Quoin should ship color-only Tier C packs with a documented "no public composite spec" reason.

3. **License compatibility surprise: Elastic UI is NOT MIT.** Per `elastic/eui` LICENSE.txt on GitHub: "Source code in this repository is covered by (i) a dual license under the Server Side Public License, v 1 and the Elastic License 2.0" — confirmed by Elastic's own blog announcing the move from Apache 2.0 to dual ELv2/SSPL. If Quoin's pack-distribution model embeds extracted token values, this matters — extracted token values from EUI cannot be redistributed under MIT, so EUI should ship as "values referenced, not extracted." Every other system on the 30-list is MIT, Apache-2.0, BSD, or OGL (USWDS / GOV.UK).

4. **shadcn/ui has the thinnest composite surface by design.** shadcn intentionally ships only `--radius` (with a derived radius scale), color tokens, and accordion animation keyframes. It has no shadow tokens, no motion-duration tokens, no z-index scale, no font-weight scale. This is not an extraction failure — it's the system's design philosophy ("you bring Tailwind defaults"). The Quoin shadcn pack should compose shadcn-color + Tailwind-default-shadow + Tailwind-default-motion to fill the composite layer.

5. **Tailwind defaults are the de-facto fallback for any "thin" system.** Tailwind v4's `--shadow-*`, `--ease-*` (linear/in/out/in-out), `--duration-*` (75/100/150/200/300/500/700/1000), and `--radius-*` scales are the most commonly inherited composite scales among web design systems. HeroUI v3 confirms this inheritance verbatim in its release notes: "Tailwind CSS v4's native CSS variable approach shaped the entire theming system" (heroui.com/docs/react/releases/v3-0-0). shadcn and Geist also lean on Tailwind defaults; the broader pattern beyond these three named systems is observable but not all individually sourced.

## Details

### Section 1 — Per-Pack Composite-Token Source Reference (30 systems)

Categories key: A=shadows, B=durations, C=easings, D=transitions, E=focus, F=border-widths, G=font-weights, H=typography composites, I=z-index, J=opacity, K=aspect-ratios, L=container-widths, M=blur, N=icon-sizes, O=stroke-styles. ✅=publicly documented; ⚠️=partial/inferred; ❌=not publicly documented.

#### 1. Material Design 3 (Google)
- Canonical doc: `https://m3.material.io/styles/elevation/tokens` (elevation), `https://m3.material.io/styles/motion/easing-and-duration/tokens-specs` (motion), `https://m3.material.io/styles/typography/type-scale-tokens` (typography), `https://m3.material.io/styles/motion/overview/specs` (motion overview).
- Code mirror: `material-components/material-tokens` and `material-components/material-web` on GitHub.
- Format: documented as named tokens (CSS, Dart, Kotlin emitted), source-of-truth is the m3.material.io spec.
- License: Apache-2.0 (`material-components/material-web`).
- Coverage: A✅ B✅ C✅ D✅ E⚠️ F⚠️ G✅ H✅ (display/headline/title/body/label × small/medium/large) I⚠️ J⚠️ K❌ L⚠️ M⚠️ (M3 Expressive adds 'physics') N⚠️ O❌
- Notes: M3 Expressive — announced at Google I/O May 2025 — replaces the older easing+duration motion model with a spring physics system. Per the published spec coverage (supercharge.design): "The physics system is replacing the previous system based on easing and duration." Ship both classic m3 and m3-expressive variants since classic m3 will remain in real-world products for years.

#### 2. Carbon (IBM)
- Canonical doc: `https://carbondesignsystem.com/elements/motion/overview/`, `/elements/shadow/overview/`, `/elements/typography/type-tokens/`, `/elements/spacing/overview/`.
- Code: `@carbon/motion`, `@carbon/themes`, `@carbon/type`, `@carbon/layout`, `@carbon/react/scss/motion`.
- Format: Sass + JSON via Style Dictionary.
- License: Apache-2.0.
- Coverage: A✅ (elevation 0–4 via `@carbon/themes`) B✅ (`$duration-fast-01/02`, `$duration-moderate-01/02`, `$duration-slow-01/02`) C✅ (six easing tokens including productive-entrance/exit, expressive-entrance/exit, standard-productive, standard-expressive) D⚠️ (composites computed via `motion()` mixin) E✅ (focus token) F✅ G✅ H✅ I⚠️ J❌ K❌ L⚠️ (container scale) M❌ N✅ (`icon-size`) O❌

#### 3. Polaris (Shopify)
- Canonical doc: `https://polaris.shopify.com/tokens/shadow`, `https://polaris.shopify.com/tokens/motion`, `https://polaris-react.shopify.com/design/depth/shadow-tokens`.
- Code: `@shopify/polaris-tokens` (npm), JSON output in `dist/`.
- Format: JSON, CSS variables (`--p-*`), Sass.
- License: "Custom license based on MIT" (per `@shopify/polaris-tokens` README — confirm before redistribution).
- Coverage: A✅ (elevation/inset/bevel × 100–600 scale plus component-specific) B✅ C✅ D✅ E✅ F✅ G✅ H✅ (heading/body × xs/sm/md/lg) I⚠️ J✅ K❌ L⚠️ M❌ N✅ O❌

#### 4. Fluent 2 (Microsoft)
- Canonical doc: `https://fluent2.microsoft.design/elevation`, `/motion`, `/design-tokens`.
- Code: `@fluentui/react-components`, `@fluentui/web-components`; token JSON in `fluentui-token-pipeline` (`https://microsoft.github.io/fluentui-token-pipeline/naming.html`).
- Format: TS/JS objects, JSON pipeline.
- License: MIT.
- Coverage: A✅ (shadow ramp: shadow2/4/8/16/28/64 plus brand variants via luminosity equation) B⚠️ (durations as `durationUltraFast/Faster/Faster/Fast/Normal/Slow/Slower/UltraSlow`) C⚠️ (`curveAccelerateMid`, `curveDecelerateMid`, `curveEasyEase`) D⚠️ E⚠️ F✅ (stroke width via Global.StrokeWidth.*) G✅ H✅ (Display/LargeTitle/Title1-3/Subtitle1-2/Body1-2/Caption1-2) I⚠️ J❌ K❌ L⚠️ M❌ N⚠️ O❌
- Notes: Fluent shadows are *generated* from a luminosity equation per surface color; consider shipping the formula reference, not just frozen values.

#### 5. Primer (GitHub)
- Canonical doc: `https://primer.style/product/primitives/`, `https://primer.style/foundations/primitives`.
- Code: `@primer/primitives` (npm), JSON in `src/tokens`, CSS in `dist/css`.
- Format: JSON5 → CSS via Style Dictionary; W3C DTCG-compliant.
- License: MIT (`"license": "MIT"` in primitives `package.json`).
- Coverage: A✅ (`shadow.floating.*`, `shadow.resting.*`, `shadow.inset`) B✅ (W3C duration tokens, recent PR #1301) C✅ (functional motion tokens, PR #1350) D✅ E✅ (consolidated focus-outline-color/width/offset, PR #1344) F✅ G✅ H✅ (`text-[role]-shorthand-[size]` with display/title/body/subtitle/caption/codeBlock/codeInline) I✅ (z-index scale 0–600 with `behind/default/sticky/dropdown/overlay/modal/popover/skipLink`, PR #1319) J⚠️ K❌ L⚠️ (breakpoints) M❌ N⚠️ O❌

#### 6. Atlassian Design System
- Canonical doc: `https://atlassian.design/foundations/tokens/design-tokens`, `https://atlassian.design/components/tokens/all-tokens`, `https://atlassian.design/tokens/design-tokens`.
- Code: `@atlaskit/tokens`.
- Format: CSS custom properties (`--ds-*`) + `token()` runtime fn.
- License: Apache-2.0.
- Coverage: A✅ (elevation.shadow.raised/overflow/overlay) B⚠️ C⚠️ D⚠️ E⚠️ F⚠️ G✅ H✅ (font.heading.{large,medium,small,xsmall,xxsmall,xxlarge}, font.body, font.code) I⚠️ J✅ (opacity.disabled/loading) K❌ L⚠️ M❌ N⚠️ O❌
- Notes: Atlassian's tokens are best surveyed through the "All tokens" page, which is the canonical filterable token registry.

#### 7. Lightning (Salesforce)
- Canonical doc: `https://www.lightningdesignsystem.com/design-tokens/` (SLDS 1) and SLDS 2 styling hooks docs at `https://www.lightningdesignsystem.com/styling-hooks/` (referenced via developer.salesforce.com).
- Code: `@salesforce-ux/design-system` (npm).
- Format: YAML / SCSS / CSS / JSON / iOS / Android (via theo).
- License: BSD-3-Clause (`@salesforce-ux/design-system`).
- Coverage: A✅ (shadow tokens: drop shadow 1–3 + button-focus, button-pressed) B✅ (timing tokens: `timing-instantly`, `timing-immediately`, `timing-quickly`, `timing-promptly`, `timing-slowly`) C⚠️ D⚠️ E✅ (brand focus ring) F✅ G✅ (light/regular/bold) H✅ I⚠️ J❌ K❌ L⚠️ (media query tokens) M❌ N✅ (square sizing tokens) O❌

#### 8. Spectrum (Adobe)
- Canonical doc: `https://spectrum.adobe.com/page/design-tokens/`; new home `https://github.com/adobe/spectrum-design-data` (renamed from `adobe/spectrum-tokens` — NPM names unchanged).
- Code: `@adobe/spectrum-tokens` (v12+ slimmed; v11.8 archived as `@adobe/spectrum-tokens-deprecated`); CSS in `@spectrum-css/tokens`.
- Format: JSON (DTCG schema property `$schema`), built via StyleDictionary; outputs Android/CSS/Dart/iOS/Swift/JS/SCSS.
- License: Apache-2.0.
- Coverage: A✅ B✅ C✅ D✅ E✅ F✅ G✅ H✅ (heading XL/L/M/S/XS, body XL–XXS, detail, code) I⚠️ J✅ K❌ L⚠️ M⚠️ N✅ (workflow icon sizes) O❌

#### 9. Mineral UI (Broadcom)
- Canonical doc: `https://mineral-ui.netlify.app/tokens` (archived).
- Code: `mineral-ui/mineral-ui` GitHub (archived ~2020).
- Format: JS (camelCase), Sass (kebab-case `$mnrl-*`), JSON (via Theo).
- License: MIT.
- Coverage: A✅ (`boxShadow_1`..`boxShadow_5`) B❌ C❌ D❌ E❌ F⚠️ G✅ H✅ I❌ J❌ K❌ L❌ M❌ N✅ O❌
- Notes: Project is unmaintained; values still resolvable but cease to track current. Recommend keeping in Quoin catalog as a "historical" reference pack only.

#### 10. Pinterest Gestalt
- Canonical doc: `https://gestalt.pinterest.systems/foundations/motion/guidelines` and `/foundations/design_tokens`.
- Code: `gestalt-design-tokens` (npm), Style Dictionary multi-platform output.
- Format: JSON → CSS/SCSS/Android/iOS/Swift via Style Dictionary.
- License: Apache-2.0 (Pinterest open-sources Gestalt).
- Coverage: A✅ (elevation tokens) B✅ (duration recommendations 100–200ms, motion guidelines page) C✅ (six easings: e.g., `cubic-bezier(0.55,0,0,1)` for push, `cubic-bezier(0,0.4,0,1.4)` for play, plus linear for color/opacity) D⚠️ E⚠️ F⚠️ G✅ H✅ I⚠️ J✅ (recent addition of fully transparent) K❌ L⚠️ M❌ N✅ O❌

#### 11. Twilio Paste
- Canonical doc: `https://paste.twilio.design/tokens` and `/tokens/design-tokens-package`.
- Code: `@twilio-paste/design-tokens` (multi-format).
- Format: JSON (Theo), Sass, CSS custom props, iOS, Android.
- License: MIT.
- Coverage: A✅ (`shadowElevation05..400`, `shadowBorder*` for status states, `shadowFocus`) B⚠️ (no first-class duration tokens; transitions hardcoded) C⚠️ D⚠️ E✅ (`shadowFocus`) F✅ (`borderWidth0..40`) G✅ H✅ (heading 10–60, body, label) I✅ (zIndex bucket exists in theme object: dataVisualization, zIndices etc.) J⚠️ K❌ L⚠️ M❌ N✅ (`iconSize*`) O❌

#### 12. Workday Canvas Kit
- Canonical doc: `https://canvas.workday.com/tokens/overview/`, `/tokens/depth/`, `/tokens/motion/`, `/styles/tokens/motion`.
- Code: `@workday/canvas-tokens-web` (new three-tier system: base / system / brand), `@workday/canvas-kit-react/tokens` (legacy).
- Format: CSS variables + JS theme; values shifted from px to rem in v10.
- License: Apache-2.0 (`Workday/canvas-kit`).
- Coverage: A✅ (`depth[1..6]` plus `none`; two-shadow composite per level) B❌ (per docs: "motion is not currently available as tokens in Canvas") C❌ D❌ E⚠️ F⚠️ G✅ H✅ (`type.levels.{title,heading,body,subtext}.{large,medium,small}` plus variants hint/error/inverse) I⚠️ J⚠️ K❌ L⚠️ M❌ N⚠️ O❌
- Notes: Motion intentionally not tokenized — Quoin should mark Canvas motion as Tier C with reason "system explicitly states motion is not a token category."

#### 13. BBC GEL
- Canonical doc: `https://bbc.github.io/gel/` (Technical Guide); typography at `https://github.com/bbc/gel-typography`.
- Code: `gel-typography`, `gel-sass-tools` npm packages.
- Format: Sass (with `@use` API in v6+).
- License: Apache-2.0 (BBC public-sector via Open Government Licence for non-code docs; code is Apache-2.0).
- Coverage: A❌ (GEL doesn't publish a shadow scale) B❌ C❌ D❌ E❌ F❌ G✅ (`canon-bold`, etc.) H✅ (typography scale: trafalgar / canon / paragon / pica / minion / etc., with group-a/b/c/d font-size × line-height responsive tiers) I❌ J❌ K❌ L❌ M❌ N⚠️ O❌
- Notes: GEL is primarily a typography + iconography system; ship as a typography-and-grid pack only and note no shadow/motion scale exists publicly.

#### 14. USWDS
- Canonical doc: `https://designsystem.digital.gov/design-tokens/` plus subpages: `/color/system-tokens/`, `/shadow/`, `/spacing-units/`, `/typesetting/`, `/opacity/`, `/order/` (z-index).
- Code: `@uswds/uswds` npm; Sass tokens.
- Format: SCSS + JSON.
- License: Public Domain (CC0)-ish — USWDS is a US Government work in the public domain in the US.
- Coverage: A✅ (shadow 1–5) B❌ (motion is not a published token category) C❌ D❌ E✅ F⚠️ G✅ H✅ (typeset scale) I✅ (z-index utility tokens) J✅ K⚠️ L⚠️ M❌ N⚠️ O❌

#### 15. GOV.UK Design System
- Canonical doc: `https://design-system.service.gov.uk/`, `/get-started/focus-states/`, `/styles/colour/`.
- Code: `govuk-frontend` (Sass).
- Format: Sass mixins/functions (`govuk-focused-text`, `govuk-functional-colour`).
- License: MIT (`govuk-frontend`), content under Open Government Licence v3.0.
- Coverage: A⚠️ (limited; mostly transform-based focus shadow `0 4px 0 0 #0b0c0c`) B❌ C❌ D❌ E✅ (canonical focus state: 3px yellow `#ffdd00` ring + 1px black bottom border) F✅ G✅ H✅ I❌ J❌ K❌ L⚠️ M❌ N⚠️ O❌

#### 16. Open Props
- Canonical doc: `https://open-props.style/`.
- Code: `open-props` npm (`https://www.npmjs.com/package/open-props`); JSON tokens at `https://unpkg.com/open-props/open-props.tokens.json`.
- Format: CSS custom properties; ships individual modules per category.
- License: MIT.
- Coverage: A✅ (shadow-1..6 + inner-shadows) B✅ (`durations.min.css` extras pack) C✅ (8 easings + 5 in/out + 5 elastic + 5 squish) D✅ E⚠️ F✅ (`border-size-1..5`) G✅ (font-weight-1..9) H✅ (font-size-00..8, font-lineheight, font-letterspacing) I✅ (zindex-1..5 plus layers) J✅ K✅ (`aspect-square`, `aspect-landscape`, `aspect-portrait`, `aspect-widescreen`, `aspect-ultrawide`, `aspect-golden`) L⚠️ M❌ N⚠️ O❌
- Notes: Open Props is the most token-complete system on the list — second only to Material 3 in category coverage and ahead of M3 on aspect-ratios and elastic easings.

#### 17. Radix Colors / Radix Themes (WorkOS)
- Canonical doc: `https://www.radix-ui.com/themes/docs/theme/shadows`, `/colors`, `/themes/docs/overview/styling`; source `radix-ui/colors` (CSS files per scale).
- Code: `@radix-ui/colors` (npm); `@radix-ui/themes` for composite tokens.
- Format: CSS files per scale; CSS custom properties under Themes.
- License: MIT (Copyright © 2022-present WorkOS).
- Coverage: A✅ (`--shadow-1..6` under Themes) B⚠️ C⚠️ D⚠️ E✅ (`--focus-*` scale, `--focus-8` for outlines) F⚠️ G⚠️ H⚠️ (Themes ships Text component scales) I⚠️ J✅ (alpha variants of every step) K❌ L⚠️ M❌ N⚠️ O❌
- Notes: `@radix-ui/colors` itself is color-only; Radix *Themes* adds the composite tokens (shadows, radii, focus). Distinguish these two packs in Quoin catalog.

#### 18. Tailwind (defaults)
- Canonical doc: `https://tailwindcss.com/docs/box-shadow`, `/transition-duration`, `/transition-timing-function`, `/border-width`, `/font-weight`, `/z-index`, `/opacity`, `/aspect-ratio`, `/blur`.
- Code: `tailwindcss` npm; Tailwind v4 ships `@theme` CSS variables (`--shadow-*`, `--ease-*`, `--duration-*`, `--radius-*`, `--blur-*`, `--container-*`, `--text-*`, `--font-weight-*`).
- Format: CSS custom properties (v4) + JS theme (v3).
- License: MIT.
- Coverage: A✅ B✅ (75/100/150/200/300/500/700/1000 ms) C✅ (`linear`, `in [cubic-bezier(0.4,0,1,1)]`, `out [cubic-bezier(0,0,0.2,1)]`, `in-out [cubic-bezier(0.4,0,0.2,1)]`) D✅ E⚠️ (`--ring`) F✅ G✅ H⚠️ (text- utilities, not a composite scale) I✅ (auto/0/10/20/30/40/50) J✅ K✅ (auto/square/video) L✅ (container scale) M✅ N⚠️ O❌
- Notes: Tailwind defaults are the implicit baseline Quoin should treat as the canonical "modern web" composite scale; shadcn, HeroUI v3, Geist all approximate it.

#### 19. Geist (Vercel)
- Canonical doc: `https://vercel.com/geist/material` (elevation/Material types), `https://vercel.com/geist`.
- Code: Not fully open-sourced; partial unofficial Figma at `https://www.figma.com/community/file/1330020847221146106/geist-design-system-vercel`; legacy `@geist-ui/style` package on npm.
- Format: CSS classes (`zi-*` legacy), brand tokens in component repo.
- License: MIT for `@geist-ui/style`; main Geist design system is publicly browsable but not packaged for redistribution.
- Coverage: A✅ (Material types: base/small/medium/large/tooltip/menu/modal/fullscreen — encode elevation role) B⚠️ (spring animations described but no token export) C⚠️ (damping: 200 mentioned in Remotion skill) D⚠️ E⚠️ F⚠️ (border = `--ds-gray-400`) G✅ (100–900 via Geist Sans) H✅ (typography classes with negative tracking on headings) I⚠️ J⚠️ K❌ L⚠️ M❌ N⚠️ O❌
- Notes: Geist publishes guidance pages but does not ship a clean token JSON. The `vercel-labs/skill-remotion-geist` skill repo (`https://github.com/vercel-labs/skill-remotion-geist`) is the closest thing to an extractable spec — values referenced there include `--ds-green-700`, `--ds-gray-400`, dark `#0a0a0a` background.

#### 20. shadcn/ui
- Canonical doc: `https://ui.shadcn.com/docs/theming`, `/docs/components/accordion`.
- Code: copy-paste components; `tailwindcss-animate` plugin.
- Format: CSS custom properties (`--background`, `--foreground`, `--radius` etc.) + Tailwind config animations.
- License: MIT.
- Coverage: A❌ B❌ C❌ D⚠️ (Radix accordion keyframes only) E⚠️ (`--ring` color only) F❌ G❌ H❌ I❌ J❌ K❌ L❌ M❌ N❌ O❌
- Notes: shadcn ships color + `--radius` only by design. The Quoin shadcn pack should compose `shadcn-color + tailwind-default-everything-else`. Document this as composition, not a Tier C gap.

#### 21. Mailchimp
- Canonical doc: `https://ux.mailchimp.com/patterns` — fully removed from public access in early 2025. Per designsystems.surf/design-systems/mailchimp: "as of start-2025, it has been removed from public access, and all links to it are now broken."
- Code: None public.
- Format: HTML/CSS reference (historical); CSS class names (`zin-lv2` etc.).
- License: Proprietary.
- Coverage: A❌ B❌ C❌ D❌ E❌ F❌ G⚠️ H⚠️ I⚠️ (`zin-lv*` class-name layering) J❌ K❌ L❌ M❌ N❌ O❌
- Notes: Tier C. Ship color only with documented reason: "Mailchimp Pattern Library has been removed from public access (early 2025); no token export exists."

#### 22. Stripe
- Canonical doc: `https://docs.stripe.com/stripe-apps/style`, `https://docs.stripe.com/elements/appearance-api`.
- Code: `@stripe/stripe-js` (Elements only), no design-system package.
- Format: Typed string tokens (`xxlarge`, `body`, `primary`) — not raw px.
- License: Proprietary.
- Coverage: A❌ B❌ C❌ D❌ E❌ F⚠️ G⚠️ H⚠️ I❌ J❌ K❌ L❌ M❌ N❌ O❌
- Notes: **Tier C with documented reason: no public token spec exists.** Internal system "Sail" is referenced in employee portfolios but not published. The Elements Appearance API exposes `fontFamily, fontSizeBase, fontWeightNormal, borderRadius, colorPrimary, colorText, colorTextSecondary, colorTextPlaceholder` — these are merchant-skin variables, insufficient for a composite-layer pack.

#### 23. Linear
- Canonical doc: `https://linear.app/method`, Karri Saarinen blog posts at `https://karrisaarinen.com/`.
- Code: None public.
- Format: N/A.
- License: Proprietary.
- Coverage: All categories ❌. Public statements describe "mostly colors, type, icons and components" without published values.
- Notes: **Tier C with documented reason: no public token export.** The widely-imitated "Linear aesthetic" is a third-party reverse-engineering exercise. Quoin should ship a Linear-inspired *vocabulary pack* (commanding patterns: command palette, issue cards, statuses) rather than a Linear *token pack*.

#### 24. Spotify Encore
- Canonical doc: `https://spotify.design/article/can-i-get-an-encore-spotifys-design-system-three-years-on`.
- Code: `@spotify-internal/encore-web` (very small public surface); Backstage (Apache-2.0) is separate.
- Format: Internal.
- License: Mostly proprietary; some packages Apache-2.0.
- Coverage: Qualitative only. Mentions "color, type styles, motion, spacing, plus guidelines."
- Notes: **Tier C with documented reason: Encore is largely internal.** Ship color-only based on Spotify brand kit (green `#1ED760`, blacks) and document the gap.

#### 25. Bootstrap 5.3
- Canonical doc: `https://getbootstrap.com/docs/5.3/customize/sass/`, `/utilities/z-index/`, `/helpers/focus-ring/`.
- Code: `bootstrap` npm (SCSS source).
- Format: SCSS + CSS custom properties (`--bs-*`).
- License: MIT.
- Coverage: A✅ (`$box-shadow`, `$-sm`, `$-lg`, `$-inset`) B✅ (`$transition-base`, `$-fade`, `$-collapse`, `$-collapse-width`) C⚠️ (composites use string transitions) D✅ E✅ (focus-ring: width `.25rem`, opacity `.25`, blur `0`, `box-shadow: 0 0 $blur $width $color`) F✅ (`$border-width` 1px, `$border-widths` map) G✅ (light/normal/medium/semibold/bold/bolder) H✅ I✅ (dropdown 1000, sticky 1020, fixed 1030, offcanvas-backdrop 1040, offcanvas 1045, modal-backdrop 1050, modal 1055, popover 1070, tooltip 1080, toast 1090) J⚠️ K✅ (`$aspect-ratios` map → .ratio-1x1 etc.) L✅ (`$container-max-widths`) M❌ N❌ O❌

#### 26. Bulma
- Canonical doc: `https://bulma.io/documentation/customize/concepts/`, `/customize/list-of-sass-variables/`.
- Code: `bulma` npm.
- Format: SCSS variables + CSS custom properties (`--bulma-*`).
- License: MIT.
- Coverage: A✅ (single `$shadow: 0 0.5em 1em -0.125em rgba($scheme-invert,0.1), 0 0px 0 1px rgba($scheme-invert,0.02)`) B✅ (`$speed`) C✅ (`$easing: ease-out`) D⚠️ E❌ F⚠️ G✅ (light/normal/medium/semibold/bold/extrabold) H✅ ($size-1..$size-7) I❌ J❌ K❌ L⚠️ M❌ N❌ O❌
- Notes: Bulma is intentionally minimal on composites — one shadow, one speed, one easing. Pack should faithfully reflect that minimalism.

#### 27. Chakra UI
- Canonical doc: `https://www.chakra-ui.com/docs/theming/tokens` (v3) and v2 equivalent.
- Code: `@chakra-ui/theme` (npm).
- Format: TS theme object with `shadows`, `transition`, `zIndices`, `radii`, `borders`, `lineHeights`, `letterSpacings`, `fontSizes`, `fontWeights`, `fonts`, `space`, `sizes`, `breakpoints`, `colors`.
- License: MIT.
- Coverage: A✅ (xs/sm/base/md/lg/xl/2xl/outline/inner/dark-lg) B✅ (transition.duration: ultra-fast 50ms, faster 100, fast 150, normal 200, slow 300, slower 400, ultra-slow 500) C✅ (`ease-in`, `ease-out`, `ease-in-out`) D⚠️ E⚠️ F✅ G✅ (hairline 100, thin 200, light 300, normal 400, medium 500, semibold 600, bold 700, extrabold 800, black 900) H✅ (textStyles defined for headings/body) I✅ (hide -1, auto, base 0, docked 10, dropdown 1000, sticky 1100, banner 1200, overlay 1300, modal 1400, popover 1500, skipLink 1600, toast 1700, tooltip 1800) J✅ K❌ L⚠️ M❌ N❌ O❌
- Notes: Chakra ships one of the most thorough composite-token surfaces of any open-source web framework — particularly z-index and transitions.

#### 28. Mantine v7
- Canonical doc: `https://mantine.dev/theming/theme-object/`, `https://mantine.dev/styles/css-variables/`.
- Code: `@mantine/core` (npm).
- Format: TS theme + auto-generated CSS variables (`--mantine-*`).
- License: MIT.
- Coverage: A✅ (xs/sm/md/lg/xl) B⚠️ (single `--mantine-transition-timing-function`, no scale) C❌ D⚠️ E✅ (focusRing mode 'auto'|'always'|'never') F❌ G✅ H✅ (headings h1–h6 with fontSize/lineHeight/fontWeight) I⚠️ (CSS variables `--mantine-z-index-app/modal/popover/overlay/max` but not in theme object) J❌ K❌ L⚠️ (breakpoints) M❌ N❌ O❌

#### 29. MUI (Material UI) v6
- Canonical doc: `https://mui.com/material-ui/customization/default-theme/`, `/customization/transitions/`, `/customization/z-index/`, `/customization/shadows/`, `/customization/typography/`.
- Code: `@mui/material` (npm); CSS variables generated via `cssVariables: true` with `--mui-*` prefix.
- Format: TS theme object → optional CSS variables.
- License: MIT.
- Coverage: A✅ (Array(25): elevations 0–24, each with three composite shadows) B✅ (shortest 150, shorter 200, short 250, standard 300, complex 375, enteringScreen 225, leavingScreen 195) C✅ (easeInOut `cubic-bezier(0.4,0,0.2,1)`, easeOut `cubic-bezier(0,0,0.2,1)`, easeIn, sharp) D✅ E⚠️ F❌ G✅ H✅ (h1–h6, subtitle1/2, body1/2, button, caption, overline) I✅ (mobileStepper 1000, fab 1050, speedDial 1050, appBar 1100, drawer 1200, modal 1300, snackbar 1400, tooltip 1500) J❌ K❌ L⚠️ (breakpoints) M❌ N❌ O❌

#### 30. Ant Design v5
- Canonical doc: `https://ant.design/docs/react/customize-theme/` and the design-token reference table embedded on `/docs/react/customize-theme#design-token`.
- Code: `antd` npm; token JSON in `antd/es/version/token.json`.
- Format: TS via `ConfigProvider theme={{ token }}`; CSS-in-JS at runtime.
- License: MIT.
- Coverage: A✅ (`boxShadow`, `boxShadowSecondary`, `boxShadowTertiary`) B✅ (`motionDurationFast: 0.1s`, `motionDurationMid: 0.2s`, `motionDurationSlow: 0.3s`) C✅ (`motionEaseInOut: cubic-bezier(0.645,0.045,0.355,1)`, plus easeInOutCirc, easeOut, easeInBack, easeInQuint, easeOutQuint, easeOutCirc, easeOutBack) D✅ E✅ (`controlOutline`, `controlOutlineWidth: 2`) F✅ (`lineWidth: 1`, `lineWidthBold: 2`, `lineWidthFocus`) G✅ H✅ (`fontSizeHeading1`..`5`) I✅ (`zIndexBase: 0`, `zIndexPopupBase: 1000`) J✅ (`opacityLoading`, `opacityImage`) K❌ L⚠️ M❌ N❌ O❌

#### Tier C / "extra" systems

- **Base Web (Uber)** — `https://baseweb.design/components/tokens/`. MIT. Lighting (shadows: shallowAbove/Below, deepAbove/Below), animation timing (`timing100`..`timing1000`), easing (easeOutCurve, easeInOutQuinticCurve, etc), typography (font100..font1450, HeadingXXLarge..LabelXSmall), borders (border100..600, radius100..500). One of the richest motion-token surfaces of any system on this list. Verbatim from Base Motion PR #3171: "Our Base Motion use beats in ms."
- **Evergreen (Segment)** — `https://evergreen.segment.com/`. MIT (icons under Apache-2.0 from BlueprintJS). Elevation 0–4 with explicit box-shadow strings, font scale 100–900, layer appearances. No motion-duration tokens.
- **Clarity (VMware)** — `https://clarity.design/documentation/tokens/code`. MIT. Three-tier model: `--cds-global-*` → `--cds-alias-*` → `--clr-*` component tokens. Motion category exists but specific values require reading SCSS source.
- **Elastic UI (EUI)** — `https://eui.elastic.co/docs/getting-started/theming/tokens/`. **License caveat: dual-licensed under Server Side Public License v1 and Elastic License 2.0 (per `elastic/eui` LICENSE.txt), NOT MIT.** Animation `{extraFast, fast, normal, slow, extraSlow, bounce, resistance}`, shadows via `useEuiShadow()`, font size via `useEuiFontSize`, icon sizes, focus tokens. Quoin should reference values without redistributing.
- **HeroUI (formerly NextUI)** — `https://heroui.com/docs/customization/theme` (v2 Tailwind plugin) and `https://heroui.com/docs/react/releases/v3-0-0` (v3 native CSS variables, OKLCH). MIT. v3 ships `--shadow-surface`, `--shadow-overlay`, `--radius`, `--border`, color tokens. v3 explicitly removed typography variables; per the v3.0.0-beta.1 changelog (v3.heroui.com): "Several typography-related variables have been removed in favor of using Tailwind's typography utilities directly. The design system now focuses on color and spacing tokens, letting Tailwind handle typography." Motion via `[data-entering]`/`[data-pressed]` attributes + `data-reduce-motion` global; no numeric duration tokens.
- **Orbit (Kiwi.com)** — `https://orbit.kiwi/foundation/design-tokens/`. MIT. Documented categories: border-radius, color, breakpoint, duration, box-shadow, size, font-family, font-weight, z-index, modifier, spacing, opacity. JS / JSON / Sass / Tailwind preset all available. One of the most token-complete on this entire 30-system list.

### Section 2 — Vocabulary Pack Expansion Plan (10 existing → 22 for v1.0)

The existing 10 packs cover system primitives (editorial, dashboard, shadcn, radix, headless, ark, daisy, dashboard-extended, marketing, docs) plus 5d additions (essentials, app-shell, forms). Gaps in production-site coverage:

#### Recommended new packs (12)

1. **commerce** — product card, price stack, variant selector, add-to-cart, mini-cart, review stars, shipping/returns disclosure, badge ribbon, sticky buy-button. Justification: real e-commerce stores account for the largest single category of "Astro Themes." Drawn from Shopify Polaris, Geist commerce examples, NextJS commerce reference.
2. **settings** — preference rows, toggle groups, account section headers, danger zone, billing card, member rows. Justification: every authenticated app needs this; observable in shadcn examples, Linear settings, Vercel dashboard.
3. **dataviz** — chart card, stat panel ("KPI tile"), legend, axis-label, sparkline container, tooltip-data, ranges/buckets, percentage bar. Justification: Tremor, Visx, Recharts all expose component shapes that need primitive backing.
4. **auth** — sign-in card, sign-up form, OAuth button row, password-reset flow, MFA code input, magic-link sent state, recovery codes panel. Justification: Clerk, WorkOS, Supabase Auth UI all use a near-identical primitive set.
5. **nav** — mega menu, command palette (kbd-style), mobile drawer, breadcrumb, sub-nav tabs, sidebar w/ collapse, app launcher grid. Justification: nav patterns differ enough from current `app-shell` that they merit a dedicated pack.
6. **content** — article header, prose body, photo essay frame, video player chrome (controls, scrubber, captions toggle), audio player, embed container, blockquote-with-attribution, footnote, callout. Justification: editorial pack is too generic; content-pack adds rich-media chrome.
7. **notifications** — toast, banner alert, inbox row, notification center popover, badge counter, "marketing announcement" bar. Justification: Sonner, react-hot-toast, Mantine notifications all converge on this shape.
8. **states** — empty state, loading state (skeleton variants), error state (network/permission/404), success confirmation, in-progress task, "no results" search. Justification: observable in every shadcn `blocks` example, every starter template.
9. **search** — search bar with suggestions, results list with snippet+highlight, filter rail, facet chips, saved-search row, recent-search panel. Justification: distinct from `forms` pack; needed for any site with search.
10. **calendar** — date picker (single, range), time picker, schedule grid (week/day), event card, agenda list, availability slot. Justification: Cal.com, Linear cycles, Reservely all need calendar primitives.
11. **kanban** — board column, card with tags+assignee, swimlane, drag-handle, work-in-progress limit indicator, drop zone, mini-board sidebar. Justification: Linear, Trello, Notion all converge.
12. **comments** — comment thread root, reply, mention chip, reaction picker, edit/delete menu, comment composer with mentions, resolved-thread indicator. Justification: Notion, Linear, Figma comment patterns all overlap.

#### Recommended framework-mirror vocab packs (2)

13. **material-vocab** — Material 3 component vocabulary (top app bar, navigation rail, FAB, extended FAB, segmented buttons, snackbar, banner, list-item three-line, side-sheet, bottom-sheet). Justification: many users want "shadcn-like ergonomics but Material visual language" — this pack expresses Material's component vocabulary as Quoin semantic primitives independent of Material code.
14. **fluent-vocab** — Fluent 2 component vocabulary (CommandBar, MessageBar, TeachingBubble, Pivot tabs, PeoplePicker, DocumentCard, Persona, ActivityFeed). Justification: enterprise apps targeting Microsoft 365 aesthetics; Fluent has a distinctive componentry that doesn't fully fit `dashboard`.

(Mantine-style and Chakra-style framework mirrors are *less* unique than Material/Fluent — they already approximate the shadcn vocabulary; treat as future v1.1 candidates rather than v1.0 ship items.)

This brings the v1.0 total to **22 vocabulary packs**, within the target band of 20–25.

#### Docs-site primitive review (Starlight / Docusaurus / Nextra / Mintlify / Fumadocs)

The current `docs` pack covers: sidebar nav, on-this-page rail, prose, code block, callouts, breadcrumb. Observed *additional* primitives in modern doc frameworks that should fold into `docs` or a `docs-extended` micro-pack:

- **Version switcher** + **language switcher** dropdowns (Mintlify, Nextra)
- **Search trigger w/ kbd shortcut hint** (Starlight, Fumadocs)
- **API reference grid** — endpoint card, request/response tabs, parameter table (Mintlify, Fern)
- **Card grid** for landing-style doc indexes (Starlight, Astro Themes pattern)
- **Tab group for code samples** across languages (Docusaurus, Nextra)
- **Diff block** + **terminal block** + **video embed within prose** (Fumadocs, Nextra)
- **"Edit this page on GitHub" footer row** (universal)

Recommendation: extend the existing `docs` pack rather than ship a new one, except for **api-reference** which warrants its own micro-pack if there's appetite for a 23rd. Mark it as v1.1 candidate.

### Section 3 — Per-Pack Execution Priority

Ordered by composite-source richness × visual differentiation potential × license cleanliness:

**Tier 1 (refine first — highest showcase impact, cleanest sources):**
1. Material 3 — most-recognized visual language; richest motion + elevation spec; Apache-2.0.
2. Carbon — most distinctive enterprise look (heavy borders, no rounding); Apache-2.0; full motion spec.
3. Open Props — most token-complete; serves as Quoin's "reference completeness" benchmark; MIT.
4. Tailwind defaults — implicit baseline for the modern web; MIT; v4 `@theme` mirrors Quoin's structure.
5. Spectrum — Apache-2.0; new DTCG `$schema` integration aligns with Quoin's W3C 2025.10 stance.
6. Fluent 2 — distinctive shadow generation formula; MIT.

**Tier 2 (refine second — strong sources, slightly less differentiation):**
7. Polaris — distinctive bevel + elevation system; "custom MIT-based" license requires confirmation.
8. Atlassian — full token registry; Apache-2.0.
9. Primer — recently consolidated focus + z-index + motion as W3C-compliant; MIT.
10. USWDS — public-domain; distinctive government aesthetic; complete shadow + opacity + z-index.
11. GOV.UK — distinctive yellow focus ring is a recognizable showcase moment; MIT/OGL.
12. MUI — canonical Array(25) elevation is iconic; MIT.
13. Ant Design — distinctive eight-easing scale; MIT.
14. Bootstrap — z-index scale is the de facto industry standard; MIT.
15. Chakra UI — best-organized z-index + transition token set; MIT.
16. Radix Themes — important for shadcn-adjacent designs; MIT.
17. Twilio Paste — strong shadow scale (border+elevation+focus); MIT.
18. Workday Canvas Kit — distinct two-shadow depth composite; Apache-2.0 (motion intentionally untokenized).
19. Pinterest Gestalt — six easings with distinctive playful curve; Apache-2.0.
20. Salesforce Lightning — five timing tokens with semantic names; BSD-3-Clause.

**Tier 3 (composite is shallow or proprietary — last priority):**
21. Base Web — rich motion + lighting; MIT — but lower brand recognition.
22. Orbit (Kiwi) — feature-complete; MIT — lower brand recognition.
23. Evergreen — five-elevation spec; MIT — project is in maintenance mode.
24. EUI — feature-rich but **Elastic License 2.0 / SSPL** — reference only, don't redistribute.
25. HeroUI v3 — fresh OKLCH tokens; MIT but breaking-change churn vs v2.
26. Clarity — three-tier but specifics behind SCSS source; MIT.
27. Mantine — composite is shallow (single timing fn); MIT.
28. Bulma — intentionally minimal (1 shadow, 1 speed); MIT.
29. shadcn/ui — composes from Tailwind defaults; MIT.
30. BBC GEL — typography-only system; Apache-2.0 / OGL.
31. Mineral UI — archived; MIT — historical reference only.

**Permanent Tier C (color-only with documented gap):**
- Stripe — no public composite spec; ship Elements Appearance-derived color skin.
- Linear — no public token export; ship community-extracted color approximation + note.
- Spotify Encore — internal system; ship Spotify-brand color approximation + note.
- Mailchimp — pattern library fully removed from public access in early 2025; ship historical color extraction + note.

### Section 4 — Honest Gaps

**Systems where composite data genuinely isn't publicly available:**

1. **Stripe** — public surface: Elements Appearance API (`fontFamily`, `fontSizeBase`, `fontWeightNormal`, `borderRadius`, `colorPrimary`, `colorText`, `colorTextSecondary`, `colorTextPlaceholder`) and Stripe Apps named tokens (`xxlarge`, `body`, etc.). Missing: shadows, motion, z-index, full typography scale, focus rings. Realistic alternative: ship a "Stripe-inspired" color-only pack with a 350ms motion approximation and document the gap. Mark Tier C with reason "Stripe does not publish a design system."

2. **Linear** — public surface: Karri Saarinen public statements + Method page (principles, not values). Missing: everything except colors people have reverse-engineered. Realistic alternative: ship a community-extracted Linear color pack and a `linear-vocab` (command palette, issue card, status pills) vocabulary pack. The vocabulary contribution is more honest than a token contribution here.

3. **Spotify Encore** — public surface: Spotify brand colors (green `#1ED760`, blacks); design.spotify.com blog posts qualitatively describing tokens. Missing: numeric spec for anything beyond color. Realistic alternative: ship Spotify-brand color pack with documented gap.

4. **Mailchimp** — Pattern Library fully removed from public access in early 2025 (designsystems.surf: "as of start-2025, it has been removed from public access, and all links to it are now broken"). Missing: clean token export, and now even the historical reference. Realistic alternative: ship a historical extraction from pre-removal archived sources with a clearly-dated note.

5. **Geist (Vercel)** — public surface: documentation pages exist (`vercel.com/geist/material`, etc.) but no clean token JSON export. Missing: durable, machine-readable token file. Realistic alternative: extract values from the `vercel-labs/skill-remotion-geist` repo (which references `--ds-gray-400`, `--ds-green-700`, spring damping 200) and document that the values are scraped from a sibling skill, not from a token package. Acceptable Tier B / Tier C boundary.

6. **BBC GEL** — public surface: typography + grid + icons only. Missing: shadow scale, motion, z-index, focus rings. Realistic alternative: ship as a typography-and-grid-only pack and document that GEL is intentionally not a composite token system — it predates the W3C DTCG era.

7. **Mineral UI** — public surface: still in GitHub, but project archived ~2020. Missing: motion, z-index, focus, modern token types. Realistic alternative: ship a "historical reference" pack with a note that it's no longer maintained upstream.

**For systems where motion is intentionally absent (not a gap, a stance):**

- **Workday Canvas Kit** explicitly states motion is not currently available as tokens.
- **GOV.UK** explicitly avoids motion tokens (accessibility/respect for `prefers-reduced-motion`).
- **USWDS** does not publish motion as a token category.

Quoin should respect these stances — do not invent motion values for these systems; instead inherit Tailwind defaults or compose from a sibling pack, with a documented note that the upstream system does not specify motion.

## Recommendations

**Phase 1 (week 1):** Refine Tier-1 packs (Material 3, Carbon, Open Props, Tailwind, Spectrum, Fluent 2). These six will unlock the strongest visual showcase since they're the most-recognized systems and have the cleanest, most complete sources.

**Phase 2 (week 2):** Refine Tier-2 packs (Polaris through Lightning, 14 packs). All have first-party token packages or canonical docs. Confirm Polaris's "custom MIT-based" license language before shipping.

**Phase 3 (week 3):** Refine Tier-3 packs (Base Web through Mineral UI, 11 packs). For EUI specifically: reference values via documentation links, do not embed extracted token values in the Quoin pack — this preserves license compliance with the dual ELv2/SSPL terms.

**Phase 4 (week 3, parallel):** Ship the four Tier-C packs (Stripe, Linear, Spotify, Mailchimp) as color-only with documented gap reasons. Add the two "vocabulary-only" framework mirrors (material-vocab, fluent-vocab) since they don't require composite token extraction.

**Phase 5 (week 4):** Ship 12 new vocabulary packs (commerce, settings, dataviz, auth, nav, content, notifications, states, search, calendar, kanban, comments). Source primitive shapes from shadcn examples, Astro Theme catalog, and the framework-vocab references gathered above.

**Triggers to revisit Tier classification:**
- If Stripe publishes a public design system → upgrade Stripe to Tier B.
- If Linear publishes tokens (per recurring community ask of Karri Saarinen) → upgrade Linear to Tier B.
- If Vercel publishes Geist as an npm package with token JSON → upgrade Geist to Tier A.
- If Mineral UI ships a v2 release → upgrade from "historical" to active.
- If EUI relicenses under MIT/Apache-2.0 (unlikely given Elastic's strategic stance) → upgrade redistribution stance.

## Caveats

- **License confirmations are required before redistribution** for: Polaris ("custom license based on MIT"), EUI (dual ELv2/SSPL — do not embed extracted values), Spectrum (Apache-2.0, but the repo recently moved to `adobe/spectrum-design-data` so confirm package origin), Mineral UI (archived — MIT but unmaintained), USWDS (US Government public-domain in the US only; international redistribution conventionally treated as Public Domain but not formally licensed). Treat license as a per-pack publishing gate.
- **Material 3 Expressive (announced at Google I/O May 2025)** is a full motion replacement, not a partial overlay. Per supercharge.design covering the M3 Expressive spec: "The physics system is replacing the previous system based on easing and duration." Decide whether to ship both `m3` (classic easing+duration) and `m3-expressive` (physics) as separate packs, or merge with a flag. The current research data covers the older system more completely; expressive will require separate research.
- **shadcn/ui's design philosophy is composition over extraction.** Don't treat shadcn's thinness as a missing-data gap — it's a deliberate architectural stance ("use Tailwind defaults for everything that's not radius+color"). The shadcn pack in Quoin should explicitly compose `shadcn-color + radix-radius + tailwind-shadow + tailwind-motion`.
- **Naming drift between docs and code is real** for Carbon (v10→v11), Spectrum (v11→v12), Mantine (v6→v7), HeroUI (v2→v3), Atlassian (legacy `@atlaskit/theme` → new `@atlaskit/tokens`), Polaris (v9→v11→v12). For each pack, pin the source to a specific version and note the date of extraction so re-extractions can detect upstream churn.
- **The 30-system × 15-category coverage matrix is necessarily approximate.** A "✅" for a system means the category is publicly documented in *some* form — not that every sub-token Quoin wants exists upstream. Expect 5–10% per-token fill-in work during pack refinement (e.g., a system may publish shadows but not the inner-shadow variant Quoin's namespace expects).
