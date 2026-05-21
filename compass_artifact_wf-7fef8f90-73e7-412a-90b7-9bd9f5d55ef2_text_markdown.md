# Quoin Strategic + Technical Dossier
## Gap Analysis, Unification Proposal, and Next-Frontier Dossier for the 2026 Landscape

**Date:** May 19, 2026 · **Operator:** Bug / Donald Pilger (Harrow Haus) · **Repo:** github.com/HarrowHaus/quoin
**Status:** 22 pattern packs shipped · 8 queued · 14 vocab packs (target 50+) · DTCG 2025.10 baseline locked
**Audience:** Claude Opus 4.7 orchestrating Claude Opus 4.7 in Claude Code; operator directs via markdown dossiers

---

## TL;DR

- **Quoin's positioning is structurally correct for the 2026 landscape.** The Jan 6 2026 Tailwind layoffs (75% of engineering eliminated; revenue −80% per Adam Wathan's GitHub PR #2388 disclosure with 75 million monthly npm downloads simultaneously), the Oct 28 2025 DTCG 2025.10 stabilization, the Dec 2 2025 Bun→Anthropic acquisition, and Guillermo Rauch's May 6 2026 "Opus tokens = 20% of v0 usage but 70% of spend" disclosure at Code with Claude 2026 all converge: the AI-tool ecosystem needs a semantic addressing layer and no incumbent has occupied that vacuum.
- **The next 6-12 months are about consolidation before expansion.** Quoin must (a) close ~14 specific catalog/compiler gaps the 2026 ecosystem now expects (DTCG composite-types coverage, View Transitions L2 surface, Anchor Positioning primitives, motion springs beyond DTCG's `duration`+`cubicBezier`+`transition` minimum, accessibility infrastructure beyond ARIA stubs, data viz, forms completion, app shells), (b) unify ~9 structural duplications already accumulated in 22 patterns (hero variant parallelism, nav variant parallelism, badge/breadcrumb/tag/status-pill near-misses, building-block inlining), and (c) lock three architectural moves (per-pack IR versioning, soft-composition via ARIA references, pattern-local motion tokens) into PHASE_GATES.md before P1 grows the surface further.
- **The defensible moat is the "interchange format" play, not the CSS framework play.** Tailwind's revenue collapse proves CSS-framework economics are now broken under AI consumption. Quoin's durable position is to become what DTCG is for tokens but for *composed semantic primitives* — the layer that Lovable, v0, Bolt, Claude Code, Figma, Tokens Studio, Penpot, Webflow, and Framer all plug into. The Rolldown 1.0 (stable May 2026, API locked at `^1.0.0`) plugin surface, MCP at over 97 million monthly SDK downloads and 10,000 active servers (per blog.modelcontextprotocol.io anniversary post), and the unclaimed DTCG springs/keyframes/scroll-timeline surface are the three concrete entry points.

---

# 1. GAP ANALYSIS — What Quoin Doesn't Yet Have That the 2026 Ecosystem Expects

This section enumerates gaps by category. Each item names specific 2026 prior art defining the expectation Quoin must meet.

## 1.1 Missing Pattern Categories

The 22 shipped patterns and 8 queued (badge, breadcrumb, paper-grain-overlay, numbered-list, tag, status-pill, sidebar-list, command-palette-content) cover roughly the **shell + navigation + content-density tier**. The 2026 baselines from Material Web, Carbon, Polaris (now Polaris Web Components — Shopify deprecated React Oct 1 2025, citing "more technology-agnostic foundation. They work with every framework as well as plain JavaScript and server-rendered sites"), Radix, shadcn, Mantine, Chakra, Ant Design, Park UI, Geist, and Headless UI imply at least these missing pattern categories:

**Data display & visualization (highest gap density — every competing system covers these; Quoin does not):**
- `data-table` (sortable, filterable, virtualized — Carbon's IndexTable, Polaris's IndexTable, Mantine's DataTable). Carbon's "data visualization guidelines are best-in-class" (UXPin design-system roundup, 2026); Carbon ships a dedicated charting library with accessibility-first defaults.
- `chart-card` (line/bar/donut/area wrappers).
- `stat-card` / `kpi-card` (foreshadowed by Boeing Watch, not formalized).
- `progress-indicator` (linear + circular + segmented).
- `skeleton`, `empty-state` (Polaris's most-referenced pattern after navigation), `timeline`, `activity-feed`, `tree-view`, `nested-list`, `kanban-column`, `board-card`.

**Form & input patterns:**
- `form-field` (label + control + help + error as single anatomy contract — Radix's Form.Root/Form.Field/Form.Label/Form.Control/Form.Message model).
- `input-with-icon`, `input-with-affix`, `input-group`.
- `select` (custom popover — Radix Select, Headless UI Listbox; native `<select>` insufficient).
- `combobox` (autocomplete with async loading — Radix slowed updates here, Base UI now leading per greatfrontend.com 2026).
- `multi-select`, `date-picker` / `date-range-picker` (React Aria's Date primitives are the gold standard), `time-picker`, `file-upload`, `slider`, `switch`, `radio-group`/`checkbox-group` (composed), `rich-text-editor` shell, `form-stepper`, `inline-edit`, `tag-input`.

**App shell patterns (Geist's strength, Polaris's strength; Quoin has nav variants but not full shells):**
- `app-shell`, `topbar-with-search-and-actions`, `secondary-nav`/`subnav`, `page-header` (title + actions + breadcrumbs + tabs), `section-header`, `split-view`/`master-detail`, `inspector-panel`/`right-rail`, `tabbed-page`.

**Overlay & feedback:**
- `dialog`/`modal`, `drawer`/`sheet` (shadcn's most-installed component), `popover` (with anchor-positioning), `tooltip` (with collision detection), `toast`/`notification-stack`, `alert`/`banner`, `confirmation`, `command-palette` (full pattern with keyboard nav, fuzzy search, sections, recents), `context-menu`.

**Onboarding & guidance:** `tour`/`coach-mark`/`spotlight`, `onboarding-checklist`, `feature-hint`.

**Marketing patterns (Tailwind Plus catalog + Lovable/v0/Bolt high-frequency generation requests per nocode.mba 2026):**
- `pricing-card`/`pricing-table` (highest-frequency Lovable/v0 request), `testimonial`/`logo-cloud`, `cta-section`, `feature-grid`, `comparison-table`, `faq-accordion`, `team-grid`, `newsletter-signup`, `footer-mega`.

**Authentication:** `auth-card`, `password-strength`, `oauth-buttons`, `mfa-input` (OTP), `magic-link-input`.

**E-commerce (Polaris's bread and butter):** `product-card`, `product-grid`, `product-detail-shell`, `cart-line-item`, `mini-cart`, `cart-summary`, `checkout-step`, `address-form`, `payment-method-picker`, `order-summary`, `order-status-tracker`.

## 1.2 Missing Primitive Types (compiler-IR level)

Beyond pattern packs, Quoin's primitive vocabulary likely lacks these *type-system entries* the DTCG 2025.10 stable spec assumes are first-class (per designtokens.org/tr/2025.10/format):

**DTCG 2025.10 composite types Quoin must implement fully:**
- `transition` (composite: `duration` + `delay` + `timingFunction`), `cubicBezier` (`[P1x, P1y, P2x, P2y]` with x ∈ [0,1], y ∈ [-∞,∞]), `gradient` (with explicit type — but spec verbatim: "Is the current specification for gradients fit for purpose? Does it need to also specify the type of gradient (linear, radial, conical, etc.)?" — explicitly unclaimed), `shadow`, `border`, `typography` (font-family + font-weight + font-size + line-height + letter-spacing), `strokeStyle`, `fontFamily` with fallback array, `fontWeight` (numeric 1-1000 per OpenType `wght` plus pre-defined aliases like "thin"/"extra-bold"), `duration` (with `ms`/`s` units), `dimension` (`px`/`rem`/etc.), `color` (with full Display-P3, OKLCH, CSS Color Module 4 spaces — structured `{colorSpace, components, alpha, hex}` form).

**DTCG-aligned types NOT in 2025.10 — Quoin should pre-claim:**
- `percentage`/`ratio` (DTCG enumerates as TBD), `fontStyle` enum italic/normal (DTCG enumerates as TBD), `spring` (mass/stiffness/damping — Motion library first-class but DTCG has none — **unclaimed**), `keyframes`/multi-stop animation (**unclaimed**), `motion-path`/`view-timeline`/`scroll-driven-animation` (**unclaimed**), `variable-font-axis-position` (`wght`/`wdth`/`slnt` axes), `font-feature-settings`, `color-contrast-pair` (token-A + token-B + WCAG-min validated; Google's DESIGN.md Apr 21 2026 hints at it via required WCAG AA/AAA validation but doesn't formalize), `container-query-bound-token`, `logical-property-token`.

## 1.3 Missing Compiler Features

- **Bytecode-stable IR serialization** — per LLVM/MLIR's `[RFC] IR Versioning` (`discourse.llvm.org/t/rfc-ir-versioning/5893`) and `RFC Builtin dialect bytecode versioning` (`discourse.llvm.org/t/rfc-builtin-dialect-bytecode-versioning/89978`); `.quoin.lock` should embed every pack version with a forward-compatible upgrade routine.
- **Per-pack canonicalization passes** — per `[RFC] MLIR Dialect Canonicalization`; canonicalization is published per-pack, not hard-coded.
- **SSA-form intermediate representation** — modeled directly on React Compiler 1.0 stable (Oct 7 2025 per react.dev/blog) pipeline: BuildHIR → EnterSSA → InferTypes → Reactive Scope Inference → ReactiveFunction → Codegen (per `facebook/react/blob/main/compiler/docs/DESIGN_GOALS.md`; team named: Joe Savona, Sathya Gunasekaran, Mofei Zhang, Lauren Tan).
- **High-Level IR preservation** — React Compiler preserves `if` vs ternary, `for` vs `while` vs `for..of` in HIR (deliberate, debuggable, compact). Quoin's IR should preserve `pattern.hero.kinetic.fold-d65` distinct from `pattern.hero.lockup-d65` — *don't lower to BEM*.
- **Reactive Scope Inference for co-variant tokens** — groups of tokens that always invalidate together when an aesthetic variant changes (e.g., `color.bg.primary` + `color.fg.on-primary` + `color.border.on-primary`). Needed for D.65 lock fan-out across hero/lockup/badge consistently.
- **Cross-backend lowering passes** — emission to Material Web vs Carbon vs Polaris vs Spectrum vs Geist requires per-backend lowering. MLIR's progressive lowering pattern (Triton's Triton → TritonGPU → TritonNvidiaGPU → TritonAMDGPU per `deepwiki.com/triton-lang/triton/3-mlir-dialects-and-ir-system`) is the precedent.
- **Filter-based plugin hooks** — Rolldown's `id`/`code`/`moduleType` filter-first hooks keep JS plugins out of the hot path.
- **Lock-file determinism** — byte-for-byte reproducible given fixed pack versions, matching Cargo.lock/pnpm-lock.
- **Source-map emission for AI debuggability** — when Claude Code generates `pattern.hero.kinetic.fold-d65` emitting 240 lines of CSS, the source-map lets an agent navigate back from generated rule to authoring primitive.
- **Tree-shakeable emit** — Tailwind's Oxide engine (Rust) is the bar.
- **Oxc-grade parsing speed** — Oxc parses TS+JSX at 26.3ms vs Babel 853ms (32x). Quoin compiler invocation per agent edit needs sub-100ms.

## 1.4 Missing Build Pipeline Integrations

Post Bun→Anthropic Dec 2 2025, post Vite 8 + Rolldown stable March 12 2026, post Next.js 16 Turbopack default Oct 2025:

- **Bun bundler plugin** — Bun is the default Claude Code runtime; first-class Bun plugin is now table stakes. **Highest priority alongside Rolldown.**
- **Vite 8 / Rolldown plugin** — Rolldown 1.0 stable May 2026 with API locked at `^1.0.0` (per voidzero.dev/posts/announcing-rolldown-1-0). Rollup-compatible plugin API. **Highest-leverage integration.**
- **Rspack plugin** — ByteDance running TikTok/Douyin/Lark/Coze on Rspack; ~98% Webpack plugin-API compatibility (per github.com/web-infra-dev/rspack, 1.0 release Aug 2024). Quoin gets the entire Webpack ecosystem via this single integration.
- **Turbopack plugin — NOT YET POSSIBLE.** Per nextjs.org official docs (verbatim): "Turbopack does not support the Webpack plugin API." Third-party reporting of Vercel's roadmap: Q1 2026 standalone Turbopack, Q2 2026 plugin API, Q3 2026 Webpack-config migration tool. **Halt-and-report condition**: monitor Turbopack plugin-API ship quarterly.
- **PostCSS plugin** — lowest-common-denominator pipe for Astro, Vue CLI, Nuxt, legacy webpack.
- **LightningCSS integration** — used by Tailwind v4's Oxide, used by Vite 8 internally.
- **esbuild plugin**, **Webpack 5 loader/plugin** (86% of developers still use Webpack per State of JavaScript 2025).
- **Astro integration**, **Nuxt 4 module**, **SvelteKit adapter**, **Next.js 16 integration** (via Turbopack-compatible PostCSS path until plugin API ships).
- **Vitest token-snapshot reporter**.

## 1.5 Missing Standards-Body Integrations

- **DTCG Community Group seat** — DTCG 2025.10 (Candidate Recommendation, published Oct 28 2025) developed by 20+ editors from Adobe, Amazon, Google, Baidu, Sony, Microsoft, Meta, Sketch, Salesforce, Shopify, Figma, Framer, Cisco, Intuit, NYT, GM, Disney, Anima, Pinterest, Tokens Studio, Penpot, Knapsack, Supernova, zeroheight; co-chair Kaelig Deloumeau-Prigent. **Quoin should request CG membership and contribute the unclaimed Motion springs/keyframes/scroll-timeline modules.**
- **W3C CSS Working Group liaison** — Anchor Positioning L2 First Public Working Draft 2025 (drafts.csswg.org/css-anchor-position-2); Firefox enabled by default Dec 2 2025; Chrome 125+, Edge 125+, Safari 26+, Firefox 147+ as baseline early 2026 (per nikshindeblogs.medium.com Apr 2026). View Transitions L2 cross-document: Chrome 126+, Safari 18.2+, Firefox 144 same-doc only (per testmuai.com May 2026).
- **WCAG AG Working Group monitoring** — WCAG 3.0 March 2026 Working Draft (w3.org/WAI/news/2026-03-03), 174 requirements, Bronze/Silver/Gold scoring, APCA contrast. Projected Candidate Recommendation Q4 2027, W3C Recommendation 2028-2030.
- **MCP / Linux Foundation Agentic AI Foundation** — MCP at over 97 million monthly SDK downloads and 10,000 active servers with first-class client support across ChatGPT, Claude, Cursor, Gemini, Microsoft Copilot, VS Code (per blog.modelcontextprotocol.io anniversary post); donated by Anthropic to Linux Foundation.

## 1.6 Missing AI-Tool Distribution Surfaces

- **MCP server (`quoin-mcp`)** — exposing semantic-primitive search, install, lock-file query, pack metadata. Modeled after the official shadcn MCP server (Updated Jan 4 2026 per fastmcp.me).
- **`.mcpb` bundle** — Claude Desktop one-click install (per Rachidhssin/shadcn-registry-mcp).
- **Cursor `.cursor/mcp.json` recipes**, **Claude Code `.mcp.json` recipes**, **VS Code MCP**, **Windsurf MCP**.
- **Lovable / v0 / Bolt registry endpoints** — per v0's March 2026 update (GitHub repo import, Git panel) v0 now consumes registries.
- **`/llms.txt`** — emerging standard (Tailwind PR #2388 famously rejected this Jan 7 2026 due to revenue collapse; Quoin embraces).
- **`llms-full.txt`** — concatenated documentation.
- **OpenAPI / JSON Schema** for pack metadata.
- **Anthropic Tool Use schema bundle** — pre-built tools an agent can call.
- **Figma plugin**, **Tokens Studio integration** (Figma/Penpot/Framer/Blender/PowerPoint/InDesign per tokens.studio/plugin-tools), **Penpot plugin** (Penpot is first open-source design tool with native DTCG support per tokens.studio 2026), **Webflow/Framer integrations**, **Storybook addon**, **Knapsack/Supernova/zeroheight integrations**.

## 1.7 Missing Accessibility Infrastructure

WCAG 3.0 March 2026 + 2026 baselines require:
- **APCA contrast token validation** (Bronze/Silver/Gold scoring).
- **`prefers-reduced-motion`/`prefers-contrast`/`forced-colors` aware variants** baked into every pack.
- **ARIA reference contracts** — `aria-controls`/`aria-labelledby`/`aria-describedby` slot contracts (Radix's design pattern).
- **Focus management primitives** — focus-trap, focus-restoration, focus-visible.
- **Screen-reader-only utility token**.
- **Keyboard interaction contracts per pattern** — Radix's WAI-ARIA Design Pattern compliance is the bar (~131M weekly `@radix-ui/react-slot` downloads per greatfrontend.com mid-2026).
- **Language attribute handling** — `lang`, `dir`, `xml:lang`.
- **Reading-level/plain-language assertions** — WCAG 3.0 references Flesch-Kincaid (per web-accessibility-checker.com 2026).
- **Automated axe-core/Playwright A11y test stubs** per pattern.
- **Cognitive accessibility patterns** — clear-error, undo-action, autocomplete (WCAG 3.0 ADHD/dyslexia/memory coverage).
- **XR/voice user-need stubs** (WCAG 3.0 Exploratory; acknowledge scope, do not commit compliance).

## 1.8 Missing Internationalization Infrastructure

- **Logical properties throughout** — `inset-block-start` not `top`; Tailwind v4 added `pbs-*`, `pbe-*`, `mbs-*`, `mbe-*`, `inline-*`, `block-*`, `inset-s-*`, `inset-e-*`; Tailwind deprecated `start-*`/`end-*` in favor of `inline-s-*`/`inline-e-*` (releasebot.io Apr 2026).
- **RTL/LTR mirror tokens** — patterns declare directional dependency.
- **Locale-aware number/date/time tokens**, **pluralization-aware text slots** (ICU MessageFormat), **bidi-aware typography**, **CJK font fallback**, **translation slot contracts**, **currency/measurement-unit tokens**.
- **React Aria's i18n primitives** are reference (40+ component patterns with RTL, locale-aware date/number).

## 1.9 Missing Performance Optimization Layers

- **Critical-CSS extraction** per route, **above-the-fold inlining**, **CSS layer extraction per pattern**, **container-query depth budget warnings** (3+ deep triggers halt-and-report), **view-transition cost calculator** (per webperfclinic.com, view transitions add ~70ms LCP overhead on mobile; warn when pattern's view-transition group exceeds budget), **animation FPS budget**, **variable-font subsetting per pack**, **compositor-friendly animation enforcement** (restrict animated properties to `transform` and `opacity` unless explicitly overridden), **Speculation Rules integration**.

## 1.10 Missing Testing / Validation Surfaces

- **Token-contract snapshot tests** (CSS output regression), **visual regression baselines per pattern** (Chromatic-style), **A11y test stubs** per pattern, **cross-backend equivalence tests** (does `pattern.hero.kinetic-d65` render the same semantic intent against all 5 backends?), **DTCG validator integration** (Design Token Validator by Anima; Token UI spec-compliance suite).
- **MLIR-style differential fuzzing** — per arXiv 2512.05887 (Vaidya, Böhme, D'Antoni, Dec 2025): Germinator evaluated across 91 dialects, 1,338 operations in 6 MLIR projects (base MLIR, Torch-MLIR, IREE, CIRCT, etc.); found 88 previously-unknown bugs, 40 confirmed, 23 in dialects with no prior test generators. **Quoin will hit this exact problem past 50 packs.**
- **Lock-file determinism CI check**, **pack-version compatibility matrix CI**, **CSS budget enforcement per pattern**, **LCP/INP/CLS budget per pattern**.

## 1.11 Missing DevTools Surfaces

- **Quoin DevTools browser extension** (inspect emitted CSS → authoring primitive).
- **Language Server Protocol implementation** (cf. Design Tokens Language Server per designtokens.org).
- **Source-map-aware CSS inspector**, **pattern visualization tree**, **lock-file diff viewer**, **pack dependency graph viewer**, **`quoin doctor` CLI**.

## 1.12 Missing Motion / Animation Depth

DTCG 2025.10 has only `duration` + `cubicBezier` + `transition` composite. Everything below is **unclaimed** — Quoin's strongest standards-claim opportunity:

- **Spring tokens** (mass/stiffness/damping) — Motion (motion.dev) first-class; DTCG does not.
- **Keyframes/multi-stop animation tokens**, **motion-path tokens**, **scroll-driven animation tokens** (`scroll-timeline`, `view-timeline`), **View Transition tokens** (`view-transition-name`, `view-transition-class`), **`@starting-style` integration** (animatable `display:none → display:block`), **`linear()` easing tokens**, **choreography tokens** (multi-element orchestration), **pattern-local motion tokens convention**, **reduced-motion variant** automatically generated.

## 1.13 Missing Color System Depth

- **OKLCH/Display-P3 full pipeline** with structured `{colorSpace, components, alpha, hex}` form per 2025.10.
- **Relative color syntax** — `color-mix(in oklch, var(--brand) 50%, white)`, `oklch(from var(--brand) calc(l - 0.2) c h)` (CSS Color L5 per explainx.ai 2026).
- **`light-dark()` function**, **color-contrast pair tokens** with WCAG validation, **perceptually uniform palette generation** (Open Props strength), **brand-color → semantic-color derivation**, **tonal-palette systems** (Material HCT, Carbon 100-step grays), **color-space-aware gradient interpolation**, **high-contrast/`forced-colors` palette generation**.

## 1.14 Missing Layout System Depth

- **Subgrid-aware patterns**, **`@container` size + style queries** (78% of production sites use container queries per explainx.ai 2026), **`@container scroll-state()`** (Chrome 133+), **cascade-layer convention** (`@layer quoin.reset, quoin.tokens, quoin.base, quoin.patterns, quoin.utilities`), **`@scope`** (all major browsers via Interop 2025 per oddbird.net), **anchor-positioning primitives** (popover/tooltip/dropdown/submenu/callout — baseline early 2026), **logical-property layout**, **aspect-ratio containers**, **CSS Masonry** (when stable).

## 1.15 Missing Print / Email Surfaces

- **Print emission backend** (`@page`, `@media print`), **email-safe backend** (table-based, inline styles, MSO conditional comments — email is a *constrained backend* fitting Quoin's backend-pack architecture perfectly), **PDF (Paged.js) backend**, **EPUB backend**, **print bleed/crop tokens**.

## 1.16 Missing Data Visualization

- **Chart anatomy contracts** (axis/grid/legend/tooltip/series/point — Carbon's charting library is the bar).
- **Color-blindness-safe categorical palettes**, **sequential/diverging palettes**, **sparkline primitive**, **heatmap primitive**, **bar/line/area/donut wrappers**.

## 1.17–1.18 Missing Forms & App Shell

Itemized in §1.1; together with §1.16 these constitute the "enterprise readiness" gap.

---

# 2. UNIFICATION PROPOSAL — Friction Points and Duplications to Consolidate Before P1

## 2.1 Probable Duplications Already in the Catalog

Based on the brief's explicit observations (badge/breadcrumb/tag/status-pill inlined across 6+ patterns before promotion; paper-grain-overlay and numbered-list emerging from Boeing Watch; hero variants shipping as 5 parallel packs with shared anatomy; nav variants shipping as parallel packs with overlap):

**High-confidence duplications (recommend immediate consolidation):**

1. **Hero anatomy variants** — 5 parallel `pattern.hero.*` packs. Almost certainly share: container chrome, title slot, eyebrow slot, lede slot, CTA slot, media slot, decoration slot. The variant is *aesthetic* (kinetic-fold, lockup, layered), not *anatomical*. Ship single `pattern.hero` with variant tokens.
2. **Nav variants** — multiple parallel `pattern.nav.*` packs. Shared: nav-root, brand-mark, primary-links, secondary-actions, mobile-toggle, mobile-drawer. Variants are layout + aesthetic.
3. **Badge ↔ tag ↔ status-pill ↔ chip** — four near-isomorphic primitives. All are "small bounded text with optional icon and optional close." Recommend single `prim.label` with composition vocab (`label.semantic.status`/`tag`/`badge`, `label.dismissible`).
4. **Breadcrumb ↔ numbered-list ↔ sidebar-list** — three sequential-item primitives. All are "ordered/contextual sequence of items with separator + current state." Recommend single `prim.sequence` with separator + position-semantic vocab.
5. **Paper-grain-overlay ↔ surface-decoration** — likely both shadow/grain/texture overlays. Promote to single `prim.decoration.overlay`.
6. **Command-palette-content ↔ list-with-search** — almost certainly share fuzzy-search anatomy. Consolidate to `prim.searchable-list`.
7. **Boeing Watch primitives** — D.65 lock fan-out risk: `boeing-watch.color.bg.primary`/`color.fg.on-primary`/`shadow.elev-1` may exist redundantly per pattern. Promote to single aesthetic pack with reverse-lineage table.
8. **Spacing tokens across packs** — single `tokens-baseline.spacing` should be the only spacing pack.
9. **Type-scale tokens across packs** — single `tokens-baseline.typography`.

**Naming convention drift risks:**
- `bg-color` vs `background-color` vs `color.bg`
- `primary` vs `brand` vs `accent`
- `subtle` vs `muted` vs `secondary` vs `dim`
- `elev-1` vs `elevation.1` vs `shadow.sm` vs `shadow.small`
- `kinetic-fold` vs `kineticFold` vs `kinetic.fold`
- `d65` vs `D65` vs `D.65`

**Architectural drift risks:**
- Pattern-local motion tokens promoted to catalog-wide unnecessarily.
- Aesthetic packs leaking pattern-specific tokens.
- Vocab packs accidentally importing backend-specific emission rules.
- Backend packs re-deriving aesthetic decisions.

## 2.2 Consolidation Strategies

**Soft-composition via ARIA references (recommended):** Patterns *reference* primitives by ARIA-style attributes. A hero declares `aria-labelledby="brand-mark"` and `aria-describedby="lede"`; the compiler resolves references against the global primitive pool. Makes badge/tag/status-pill composition first-class without re-inlining.

**Building-block primitive pattern via reverse-lineage tables (recommended):** Every promoted primitive maintains:
```
prim.label
  ← hero.badge (3 patterns)
  ← nav.notification-count (2 patterns)
  ← card.tag (4 patterns)
  ← form.field-status (2 patterns)
```
Browsable by Claude Code; prevents re-inlining drift.

**Anatomy-contract pattern (recommended):** Each pattern declares anatomy as typed JSON contract with slots (`type`, `required`) and `variants`. Validated at compile.

**Variant-as-token pattern (recommended for 5 parallel hero packs):** Replace parallel packs with single `pattern.hero` + variant token namespace `pattern.hero.variant.{kinetic-fold,lockup,layered,...}`. Compiler emits only the variant requested.

**Pattern-local motion tokens convention (recommended):** Motion tokens that *only* apply within one pattern live in `pattern.hero.motion.*`, not `tokens-baseline.motion.*`. Promotion is deliberate, not default. **PHASE_GATES.md locked decision.**

**Babel-plugin / SWC-transformer model for pack ordering:** Each pack declares position (`before: ['vocab.boeing-watch']`, `after: ['tokens-baseline']`); compiler computes topological sort; conflicts halt-and-report.

## 2.3 PHASE_GATES.md Additions to Lock Before P1 Grows

1. **Naming convention (locked):** kebab-case for all pack IDs and token names; dot-namespacing for composition.
2. **Promotion rule (locked):** Primitive promoted only after ≥3 patterns with identical anatomy contract; use reverse-lineage table as source of truth.
3. **Aesthetic-pack boundary (locked):** May declare only token *values* and *named variants*; not anatomy.
4. **Vocab-pack boundary (locked):** Declares *semantic vocabulary* without values or anatomy.
5. **Pattern-pack boundary (locked):** Declares *anatomy + composition*; may reference (not redefine) tokens.
6. **Backend-pack boundary (locked):** Declares *emission rules* per target; may not introduce vocabulary.
7. **Lock-file determinism (locked):** Every `quoin.lock.css` MUST embed every pack version consumed.
8. **Motion-token locality (locked):** Pattern-local motion tokens stay local; promotion requires ≥3-pattern reuse.
9. **ARIA-reference resolution (locked):** Soft-composition via ARIA references is default; inlined composition opt-in.
10. **Halt-and-report conditions (locked):** Pack version conflict; primitive promotion threshold violation; naming drift; motion-token promotion request; cross-backend equivalence failure; DTCG validator failure; ≥3-deep container-query nesting; view-transition LCP overage.
11. **DTCG 2025.10 conformance gate (locked):** Every emitted artifact passes Design Token Validator before commit.
12. **Reverse-lineage table maintenance (locked):** Updated on each new use.
13. **Variant-as-token convention (locked):** Variants are tokens within a pattern, not parallel packs.
14. **Cascade-layer convention (locked):** Emit into `@layer quoin.{reset, tokens, base, patterns, utilities}`.
15. **Container-type convention (locked):** All composed patterns declare `container-type` on root.

## 2.4 Handling Pattern Composition Complexity at 50, 100, 150+ Patterns

**Rust's crate ecosystem** — semantic versioning, `Cargo.toml`, `cargo update` lockfile, `pub` API distinction, workspace organization. Quoin adopts: per-pack `quoin.toml`, `[dependencies]` block, workspace concept (`quoin-workspace-boeing-watch`).

**npm's package versioning** — `peerDependencies` for vocab packs depending on token packs.

**Babel's plugin architecture** — `@babel/preset-env` (curated bundle), plugin ordering matters. Quoin ships "preset bundles" (`quoin-preset-marketing-site`, `quoin-preset-saas-dashboard`, `quoin-preset-e-commerce`).

**MLIR's dialect system** — per arXiv 2512.05887 (Dec 2025), 91 dialects/1,338 operations/88 bugs/6 projects: "the same extensibility that accelerates development also complicates maintaining the testing infrastructure." Adopt: per-pack property-based fuzzing, cross-pack lowering verification, bytecode-stable IR.

**SWC vs Oxc decomposition** — SWC's `swc_core` monolithic shared lib was a known anti-pattern; Oxc's strictly modular crates (`oxc_parser`, `oxc_transformer`, `oxc_linter`, `oxc_minifier`, `oxc_resolver`, `oxc_codegen`) demonstrate correct decomposition for per-component agent invocation. **Quoin mirrors Oxc, not SWC.**

**React Compiler pipeline** — HIR preservation, SSA form, reactive-scope inference, four-pass scope refinement. Adopt React Compiler stages as named Quoin compiler stages.

**Linux Foundation governance models** — see §3.11.

---

# 3. NEXT-FRONTIER DOSSIER — What Becomes Possible With Next Round of Architectural Moves

## 3.1 (a) Compiler IR Architecture — Absorption Recommendations

- **From MLIR:** dialect-versioning bytecode (`[RFC] IR Versioning`), per-dialect canonicalization, progressive lowering through abstraction levels (Quoin: semantic primitive → cross-backend IR → backend-specific emission).
- **From React Compiler 1.0 (stable Oct 7 2025):** BuildHIR → EnterSSA → InferTypes → Reactive Scope Inference → ReactiveFunction → Codegen pipeline, named for Quoin as `BuildQHIR → EnterSSA → InferTokenTypes → InferVariantScopes → ReactiveAesthetic → BackendCodegen`. Per the React team's Oct 7 2025 blog, "the compiler's architecture [moved] into a Control Flow Graph (CFG) based High-Level Intermediate Representation (HIR)."
- **From Oxc:** strictly modular crates, filter-first hooks, zero-copy AST, arena allocation, sub-100ms per-component invocation budget for agent loops.
- **From Babel:** deterministic visitor-order plugin model (use semantics, not perf).
- **From Rolldown 1.0** (stable May 2026, API locked at `^1.0.0`, per voidzero.dev/posts/announcing-rolldown-1-0): Rollup-compatible plugin API + filter hooks; **first integration target**.
- **From Turbopack:** do not target until Q2 2026 plugin API ships; halt-and-report.

## 3.2 (b) Bun Ecosystem Post-Anthropic Acquisition

Timeline:
- **Dec 2 2025**: Anthropic announces acquisition. Per Jarred Sumner ("Bun is joining Anthropic", bun.com): "Bun's monthly downloads grew 25% last month (October, 2025), passing 7.2 million monthly downloads." Anthropic blog (Dec 2025): "Bun will be instrumental in helping us build the infrastructure for the next generation of software." Sumner: "Claude Code ships as a Bun executable to millions of users. If Bun breaks, Claude Code breaks." Per Sacra and VentureBeat (Feb 2026 disclosures): "Claude Code became generally available in May 2025, hit $1B in annualized revenue by November 2025"; "$2.5B run-rate revenue by February 2026, with enterprise use now over half of its revenue."
- **May 14 2026**: Sumner merges ~1M lines of Rust to main (The Register). "We haven't been typing code ourselves for many months now."
- **May 6 2026 (Code with Claude 2026, SF)**: Sumner + Boris Cherny demo "Robobun" agent that maintains Bun. Datadog's Sesh Nalla introduces "machine tool concept that has agents emit precise specifications of the intent and problem domain rather than invent disconnected tools for every local need" — direct philosophical match for Quoin.

**Integration targets:** Quoin as first-party Bun plugin (`bun-plugin-quoin`); Bun's `bun build --compile` (single-file binary with Quoin assets); Claude Code native installer channel; Bun-native MCP server (`@quoin/mcp`).

## 3.3 (c) AI-Tool Vendor Adoption Mechanics

**Beyond MCP/Cursor rules, AI tools integrate against:**
- **shadcn registries** — official shadcn MCP Server (Updated Jan 4 2026 per fastmcp.me). shadcn.io claims "6,000+ blocks, 285k icons, every shadcn/ui primitive — live, verified." **Quoin ships a registry-compatible surface so existing shadcn-MCP clients work unchanged.**
- **OpenAPI + JSON Schema** for agent tool-use schemas.
- **`/llms.txt`** — Tailwind rejected this Jan 7 2026 due to revenue collapse; Quoin embraces.

**Token-cost / generation-quality bottlenecks (sourced disclosures):**
- **Vercel CEO Guillermo Rauch at Code with Claude 2026 (May 6 2026, reported by InfoQ — Andrew Hoblitzell, May 18 2026):** "Opus tokens represent roughly twenty-something percent of Vercel AI Gateway usage but more than seventy percent of spend, and credit spend on V0 has doubled since the most recent Anthropic upgrade." Rauch added that "smarter models let Vercel simplify the harness, improved model taste meant V0 could absorb a decade of Vercel's design judgment rather than fight it" — **direct vendor endorsement of the semantic-design-layer thesis**.
- **GitHub CPO Mario Rodriguez** at same event: "It's kind of like high frequency trading. Just 1% efficiency means millions overall." GitHub targets >94% prompt-cache hit rate.
- **Anthropic Engineering, "Advanced Tool Use" 2026:** Tool Search Tool preserves 191,300 tokens of context vs 122,800 with Claude's traditional approach. Tool definitions can consume 134K tokens before optimization.
- **Samarth Gupta (Medium, Apr 2026):** A single config change "dropped starting context from 45k to 20k and the system tool overhead went from 20k to 6k. **14,000 tokens saved on every single turn of every single session, from one line in a config file.** Over 858 sessions = 264M tokens = $132–$1,300 saved per user."
- **Bolt published math (nocode.mba 2026):** Each prompt syncs 50K-1M+ tokens because the entire codebase is synced into context each turn. "The biggest token cost isn't your prompts — it's Bolt syncing your project files." Some users report 1.3M tokens/day burn.

**Anthropic pricing (May 2026, sourced from platform.claude.com/docs/en/about-claude/pricing):**
- Opus 4.7 (Apr 16 2026 release): $5.00 / $25.00 per MTok. New tokenizer uses up to 35% more tokens than Opus 4.6.
- Sonnet 4.6: $3.00 / $15.00. Haiku 4.5: $1.00 / $5.00.
- Prompt-cache hits: 10% of input price (90% discount). Batch API: 50% off.
- On April 4 2026 Anthropic blocked third-party tools (Cline, Cursor, Windsurf) from Pro/Max subscription auth, forcing metered API billing. Boris Cherny: "Subscriptions weren't built for the usage patterns of these third-party tools."
- Dario Amodei at Code with Claude 2026: Q1 2026 revenue/usage grew 80x annualized vs 10x planned.

**Inferred semantic-addressing-layer savings (clearly labeled inference, not vendor disclosure):**
If a React card component generation pulls ~80K tokens of design-system context per turn × 5 turns = 400K redundant tokens. At Sonnet 4.6 input + 90% cache discount: 400K × $0.30/MTok = **~$0.12 per component in design re-derivation alone** (uncached: $1.20). Replace with semantic addressing layer (single `quoin.lock` reference, ~2K tokens): **~$0.0006 per component, ~200x reduction.** *Back-of-envelope math built on published per-token rates; no vendor has confirmed this number.*

**Cleanest path for Quoin to become default:**
1. Ship MCP server with semantic-primitive search + install + lock-file query.
2. Ship Rolldown 1.0 plugin.
3. Ship Bun plugin.
4. Ship `/llms.txt` + `llms-full.txt`.
5. Distribute via `npx quoin` zero-install path (shadcn precedent).
6. Publish reproducible cost-savings benchmark vs Tailwind regeneration.

## 3.4 (d) DTCG Roadmap and W3C Process

- **DTCG 2025.10 stable** — Oct 28 2025, Candidate Recommendation. Editors include Adobe, Amazon, Google, Microsoft, Meta, Shopify, Figma, Framer, NYT, GM, Disney; co-chair Kaelig Deloumeau-Prigent.
- **DTCG 2026.x roadmap:** tooling alignment with 2025.10 (Style Dictionary v5 in progress; #1471 "Add Support for Motion Tokens in DTCG Format with Nested Object Structure" open).
- **Implementor commitments that matter:** Style Dictionary v4 (first-class DTCG), Terrazzo, Tokens Studio, Penpot (native), Knapsack, Supernova, zeroheight, Anima's Design Token Validator.
- **Unclaimed Motion Module opportunity (subagent confirmed):** spring tokens, keyframes/multi-stop, motion-path, scroll-driven animation / `view-timeline`, View Transition tokens — all **unclaimed**.
- **Other unclaimed DTCG modules:** `percentage`/`ratio` (DTCG explicitly TBD), `fontStyle` enum (explicitly TBD), gradient type discrimination (explicitly open), color-contrast pair tokens, container-query-bound tokens, logical-property tokens, variable-font axis tokens, font-feature-settings tokens.

**Recommended Quoin action:** Apply to DTCG CG; contribute Motion springs/keyframes/scroll-timeline as draft module — Quoin's strongest standards-claim opportunity.

## 3.5 (e) Interchange Format Play

Tools that want to plug into a universal semantic addressing layer (2026 state):
- **Figma** (Variables map to DTCG), **Tokens Studio** (Figma/Penpot/Framer/Blender/PowerPoint/InDesign per tokens.studio/plugin-tools), **Penpot** (first open-source design tool with native DTCG support per tokens.studio 2026), **Webflow** (combo-class pain documented), **Framer** (Tokens Studio for Framer launched 2026), **Webstudio** (open-source Webflow alternative, token-first), **Style Dictionary** (v4 first-class DTCG; v5 WIP), **Terrazzo**, **Knapsack/Supernova/zeroheight**, **Anima Design Token Validator**, **Builder.io Visual Copilot**, **TokensBrücke**.

**Quoin's interchange play:** become the *composed-primitive* layer above DTCG tokens. DTCG owns tokens; Quoin owns primitives composed of tokens. The two formats round-trip.

## 3.6 (f) The Post-Tailwind Vacuum

**Jan 6 2026 layoffs** (per ppc.land Jan 8 2026, dev.to/kniraj, robmensching.com Jan 9 2026): Tailwind Labs cut 75% of engineering (3 of 4 engineers). Adam Wathan on GitHub PR #2388: "75% of the people on our engineering team lost their jobs here yesterday because of the brutal impact AI has had on our business. Traffic to our docs is down about 40% from early 2023 despite Tailwind being more popular than ever." Revenue −80%; **75 million monthly npm downloads** (per Wathan's PR #2388 comment, Jan 7 2026, verbatim).

**Jan 8 2026 sponsorships:** Vercel (Guillermo Rauch), Gumroad, Google AI Studio (Logan Kilpatrick), Macroscope (Kayvon Beykpour), Profound (Dylan Babbs), Lovable (Anton Osika). Per Rob Mensching (robmensching.com, Jan 9 2026): "If my math is right, that amounts to almost $200,000/mo from 70 companies." Rauch: "Tailwind is foundational web infrastructure at this point (it fixed CSS 😉)."

**Emerging alternatives:** UnoCSS (5x faster builds per bytepulse.io 2026), Panda CSS (~500K weekly downloads per pkgpulse.com), StyleX (Meta's build-time atomic CSS), Open Props, Pico CSS, Master CSS, Vanilla Extract.

**Positioning gaps unclaimed:**
1. **AI-tool-first CSS framework** — none target the AI tool token-cost problem directly.
2. **Multi-backend emission** — none emit to Material Web / Carbon / Polaris / Spectrum / Geist runtimes.
3. **Semantic addressing over implementation** — all alternatives still ship implementation (utilities, variables, components); none ship *intent*.

**This is Quoin's primary land-grab opportunity.**

## 3.7 (g) Standards Adoption Velocity

- **View Transitions L2** — Chrome 126+, Safari 18.2+, Firefox 144 same-doc only (per testmuai.com May 2026). Cross-document MPA: Chrome + Safari only.
- **Anchor Positioning L1** — Chrome 125+, Edge 125+, Safari 26+, Firefox 147+ (per nikshindeblogs.medium.com Apr 2026). Firefox enabled by default Dec 2 2025.
- **Anchor Positioning L2** — First Public Working Draft 2025; drafts.csswg.org/css-anchor-position-2.
- **ES Decorators Stage 4** — Stage 3 still; Stage 4 awaited.
- **WCAG 3.0** — March 2026 Working Draft, 174 requirements; Candidate Recommendation projected Q4 2027, W3C Recommendation 2028-2030. WCAG 2.2 remains current.
- **CSS Color L5** (relative color, `color-mix`) — broadly available 2026.
- **Container Queries L2** — active spec work (Apr 16 2026 OddBird).
- **@scope** — Firefox shipped end of 2025, all major browsers (Interop 2025 per oddbird.net).
- **`@starting-style`**, **`light-dark()`**, **`@property`** — broadly available 2026.

**External-gate roadmap implications:**
- View Transitions L2 cross-doc is *not* Firefox-supported; Quoin patterns using it declare progressive enhancement.
- Anchor Positioning L1 is now baseline; Quoin's popover/tooltip/dropdown use it.
- WCAG 3.0 too unstable for compliance; WCAG 2.2 AA remains the floor.

## 3.8 (h) The Agent-Native Era

How agents consume design-language artifacts in 2026:
- **MCP** — over 97 million monthly SDK downloads and 10,000 active servers with first-class client support across ChatGPT, Claude, Cursor, Gemini, Microsoft Copilot, VS Code (per blog.modelcontextprotocol.io anniversary post); donated by Anthropic to Linux Foundation Agentic AI Foundation.
- **`.mcpb` bundles** — Claude Desktop one-click install.
- **Tool Search Tool** (Anthropic 2026) — reduces 72K → 2K tokens on 50-tool MCP setups; Code Execution with MCP reduces 150K → 2K (Joe Njenga summary).
- **OpenAPI / JSON Schema** for tool-use, **Anthropic Skills format**, **shadcn registries**.

**Schemas/protocols emerging for agent-to-design-system communication:** DTCG 2025.10 JSON (token level); shadcn registry schema (component level); MCP tool schemas (action level). **No standardized schema at the composed-primitive level — Quoin's opportunity.**

## 3.9 (i) Cost / Usage Economics

What AI-tool vendors actually pay (sourced):
- Bolt Pro: $25/month for 10M tokens; users report 1.3M tokens/day burn (per nxcode.io 2026).
- v0 Premium: $20/month for ~$20 in credits; "individual generation requests $3.00 to $4.53 each on premium model" (Vercel Community thread, Sep 2025).
- Lovable Pro: $25/month for 100 credits (per nocode.mba 2026).
- Cursor "Auto mode" wholesale-passthrough: $0.25 cache read / $1.25 input / $6.00 output per MTok (per Vantage/Finout 2026).
- Anthropic blocked third-party tools from Pro/Max auth Apr 4 2026 (forcing metered billing).
- Anthropic at $30B annualized revenue early April per The Information (cited by InfoQ).
- Ramp CEO Eric Glyman (CNBC Apr 17 2026): "AI spending across Ramp's customer base has grown 13x over the past year and no one knows how to budget for it."
- GPU rental: Nvidia Blackwell up 48% in two months to $4.08/hour early April 2026 (age-of-product.com).

**Realistic revenue surface for Quoin:**
- 1M components/day × $0.12 inferred redundant context = ~$120K/day = **~$44M/year of pure waste** a semantic addressing layer captures.
- Even capturing 1% = $440K/year (small core team funded).
- Vendor sponsorships matching Tailwind's "almost $200,000/mo from 70 companies": at $5K/mo Partner tier × 40 sponsors = $2.4M/year.
- Linux Foundation membership fees from corporate adopters: $5K-$500K/year per tier.

## 3.10 (j) Emerging Adjacent Patterns

- **Multi-channel rendering (web + email + print + e-reader + voice)** — backend-pack architecture is the right substrate. Add `backend.email`, `backend.print`, `backend.epub`, `backend.voice` (ARIA-only).
- **Personalization-as-a-service** — patterns with variant-tokens map to A/B test surfaces.
- **Localization-as-a-rendering-layer** — text-slot contracts + locale-aware tokens.
- **Brand-system-as-a-service** — Quoin's aesthetic packs are this primitive.
- **Headless commerce composition** — Polaris's Oct 1 2025 deprecation of React in favor of Web Components ("more technology-agnostic foundation. They work with every framework as well as plain JavaScript and server-rendered sites") aligns structurally with Quoin's emission-routing.
- **AI-as-design-reviewer** — agents auditing pattern usage against design-system rules.

## 3.11 (k) The Moat — Defensibility

What makes Quoin defensible long-term:

1. **Standards-body presence** — DTCG CG seat, Motion module ownership, MLIR-style dialect-versioning RFC.
2. **Multi-backend lock-in** — once an organization routes to Material Web + Carbon + Polaris + Spectrum + Geist via Quoin, switching cost is the multi-backend infrastructure itself.
3. **Lock-file determinism** — `quoin.lock.css` reproducibility is a feature competitors can't undo.
4. **Reverse-lineage tables** — proprietary metadata agents consume; competitors must rebuild.
5. **Pack ecosystem** — Rust-crate-style ecosystem with versioning, dependency resolution, workspace concept. Network effects.
6. **Foundation governance** — path: Linux Foundation Agentic AI Foundation (where MCP lives), or W3C CG elevated to WG. Rust Foundation, CNCF, Linux Foundation are direct precedent.
7. **The "decade of design judgment" thesis** — Rauch's quote at Code with Claude 2026 ("improved model taste meant V0 could absorb a decade of Vercel's design judgment rather than fight it") is the strongest possible third-party validation of Quoin's premise. Each aesthetic pack is "decades of design judgment" embedded.
8. **The HTML thesis** — HTML won because it was the lowest-common-denominator interchange format. Quoin wins by being the lowest-common-denominator *composed-semantic-primitive* interchange.

**Convertable assets that become durable competitive position:** the pack registry (canonical names); lock-file format (canonical reproducibility); IR bytecode (canonical AOT compilation surface); MCP server (canonical agent interface); DTCG Motion submodule (canonical motion standard); pattern-composition contract (canonical anatomy spec).

---

# 4. SYNTHESIS — Coherent 6-12 Month Roadmap

## Phase 0 (Weeks 1-2): Foundational Locks

**Goal:** Stop the bleeding before adding capacity.

**Actions for Claude Code:**
1. Lock all 15 PHASE_GATES.md additions from §2.3.
2. Add reverse-lineage tables for all 22 shipped patterns (anatomy slots, vocab deps, token deps, aesthetic deps, backend deps).
3. Audit 22 patterns for 9 likely duplications in §2.1 → `UNIFICATION_AUDIT.md`.
4. Pin DTCG 2025.10 schema reference; add `quoin doctor` CLI stub validating against Design Token Validator.
5. Embed Pack ID + Version in every emitted CSS comment header.

**Halt-and-report:** any pack version conflict; any token name collision; any anatomy contract not expressible in JSON schema.

## Phase 1 (Weeks 3-8): Unification + Standards Conformance

**Goal:** Consolidate to anatomy contracts; achieve DTCG conformance.

**Actions:**
1. Execute consolidation per §2.1: collapse 5 hero variants → single `pattern.hero` with variant tokens; same for nav; promote badge/tag/status-pill/chip → `prim.label`; promote breadcrumb/numbered-list/sidebar-list → `prim.sequence`.
2. Implement soft-composition via ARIA references.
3. Implement building-block primitive pattern with reverse-lineage tables.
4. Implement variant-as-token convention.
5. Achieve 100% DTCG 2025.10 composite-type coverage.
6. Apply for DTCG Community Group membership.
7. Implement cascade-layer convention.
8. Implement logical-property defaults throughout.

**Halt-and-report:** consolidation breaks any pattern's visual output; DTCG validator fails on any artifact; reverse-lineage reveals primitive promoted with <3 use-sites.

## Phase 2 (Weeks 9-16): Compiler IR + Build Pipeline Integration

**Goal:** Lock IR before scaling primitives; ship integrations unlocking distribution.

**Actions:**
1. Implement BuildQHIR → EnterSSA → InferTokenTypes → InferVariantScopes → ReactiveAesthetic → BackendCodegen pipeline (modeled on React Compiler 1.0 Oct 7 2025).
2. Implement Oxc-style modular crate architecture (or TS equivalent given operator's no-code constraint).
3. Implement filter-first plugin hooks (Rolldown precedent).
4. Implement bytecode-stable IR with per-pack versioning (MLIR `[RFC] IR Versioning` precedent).
5. Ship Rolldown 1.0 plugin (highest leverage). Rolldown delivered 10–30× faster than Rollup per VoidZero (e.g., Linear's production build times reduced from 46s to 6s, per voidzero.dev Feb 12 2026 beta post; corroborated by vite.dev March 12 2026 stable: "matching esbuild's performance level and 10–30× faster than Rollup").
6. Ship Bun plugin (second priority post-Anthropic acquisition).
7. Ship PostCSS plugin (lowest-common-denominator).
8. Ship Vite 8 integration.
9. Ship Rspack plugin.
10. **Do not target Turbopack;** halt-and-report until Q2 2026 plugin API ships.

**Halt-and-report:** IR cannot be losslessly serialized; Rolldown plugin API regression (locked at `^1.0.0`); Bun plugin invocation exceeds 100ms per component.

## Phase 3 (Weeks 17-24): AI-Tool Distribution Surfaces

**Goal:** Become AI-tool default through registry-compatible distribution.

**Actions:**
1. Ship `@quoin/mcp` MCP server (modeled on official shadcn MCP server Updated Jan 4 2026).
2. Ship `.mcpb` bundle for Claude Desktop.
3. Ship Cursor `.cursor/mcp.json`, Claude Code `.mcp.json` recipes.
4. Ship `/llms.txt` and `/llms-full.txt` endpoints.
5. Ship Anthropic Tool Use schema bundle.
6. Ship shadcn-registry-compatible endpoint so existing clients work unchanged.
7. Ship v0-compatible registry adapter.
8. Publish reproducible cost-savings benchmark (~200x reduction per §3.3 inferred).
9. Ship language-server protocol implementation.

**Halt-and-report:** MCP server fails compatibility with Claude Code/Cursor/Windsurf/VS Code; cost-savings benchmark <10x reduction (would indicate IR doing too little).

## Phase 4 (Months 6-9): Catalog to 50-Pattern Plateau

**Priority order for next batch composition (beyond Tier A-C):**

**Tier D — Forms infrastructure:** `form-field`, `input-with-icon`/`affix`, `select`, `combobox`, `date-picker`/`date-range-picker`, `switch`, `radio-group`/`checkbox-group`, `file-upload`.

**Tier E — Overlay infrastructure:** `dialog`/`modal`, `drawer`/`sheet`, `popover` (anchor-positioned), `tooltip` (anchor-positioned), `toast`/`notification-stack`, `command-palette` (full), `context-menu`.

**Tier F — Data display:** `data-table`, `chart-card`, `stat-card`/`kpi-card`, `skeleton`, `empty-state`.

**Tier G — App shell completion:** `app-shell`, `page-header`, `section-header`, `split-view`/`master-detail`.

**Tier H — Marketing patterns (Lovable/v0/Bolt high-frequency):** `pricing-card`/`pricing-table`, `testimonial`/`logo-cloud`, `cta-section`, `feature-grid`, `faq-accordion`, `footer-mega`.

**Halt-and-report:** new pattern triggers primitive promotion (re-inlining badge/tag/etc.); container-query nesting depth >3; new pattern requires new compiler IR phase.

## Phase 5 (Months 9-12): Frontier Captures

**Actions:**
1. Author DTCG Motion module draft (springs, keyframes, motion-path, scroll-timeline, view-transition tokens). Submit to DTCG.
2. Ship `backend.email` (table-based, inline-styled).
3. Ship `backend.print` (`@page`, `@media print`).
4. Ship `backend.voice` (ARIA-only structural emission).
5. Apply to Linux Foundation Agentic AI Foundation as MCP-adjacent project.
6. Engage W3C CSS WG on Container Queries L2, Anchor Positioning L2 interop.
7. Publish "Quoin as agent-native interchange" RFC for community comment.
8. Sponsor outreach modeled on Tailwind's Jan 8 2026 list (Vercel, Gumroad, Google AI Studio, Macroscope, Profound, Lovable).

**Halt-and-report:** DTCG rejects Motion module draft; Linux Foundation application unsuccessful; sponsor outreach <$25K/month.

---

## Risk Register Additions (fold into PHASE_GATES.md)

1. **Turbopack plugin API delay risk** — Vercel's Q2 2026 ETA unconfirmed; halt-and-report quarterly.
2. **DTCG 2026.x divergence risk** — breaking spec changes would break Quoin's lock-file determinism.
3. **Rolldown 1.0 API regression risk** — locked at `^1.0.0` but plugin ecosystem maturing.
4. **Anthropic third-party-tool block expansion risk** — Apr 4 2026 block of Cline/Cursor/Windsurf could extend; Quoin MCP must be Pro/Max-subscription-independent.
5. **Tailwind acqui-hire risk** — at −80% revenue, acquisition by Vercel/Google/Microsoft is plausible and would close the post-Tailwind vacuum. Halt-and-report on any Tailwind acquisition news.
6. **MLIR-style dialect-proliferation risk** — per arXiv 2512.05887 Dec 2025; enforce per-pack property-based fuzzing.
7. **Operator-decision risk** — beginner directing AI agents via markdown; ambiguous dossiers produce divergent compiler implementations. Halt-and-report on markdown ambiguity >1 interpretation.
8. **WCAG 3.0 instability risk** — too unstable for compliance commitments; continue WCAG 2.2 AA baseline.
9. **Bun-Anthropic strategic-direction risk** — if Bun pivots to Anthropic-only optimization, Bun plugin may need defensive forking.
10. **Pack ecosystem fragmentation risk** — without namespace governance, community packs could fork conflicting `pattern.hero` definitions. Adopt Rust-crate `crates.io` central-registry precedent.

---

## Locked-Decision Additions (for PHASE_GATES.md)

1. No primitive promotion below 3-use-site threshold.
2. No new parallel pattern variant packs; variants are tokens.
3. No motion-token promotion to baseline below 3-pattern reuse.
4. All emission targets `@layer quoin.{reset, tokens, base, patterns, utilities}`.
5. All composed patterns declare `container-type` on root.
6. All artifacts pass Design Token Validator before commit.
7. All pack versions embedded in emitted CSS header.
8. All anatomy contracts JSON-schema-validated.
9. All patterns ship reduced-motion variant by default.
10. All patterns ship A11y test stub on first use.
11. All cross-backend equivalence tested (Material Web, Carbon, Polaris Web Components, Spectrum, Geist).
12. Rolldown 1.0 plugin first; PostCSS second; Bun third; do not target Turbopack until Q2 2026 plugin-API confirmed.
13. DTCG Community Group membership applied for by end of Phase 1.
14. No Anthropic-third-party-tool dependency in MCP server (must work on direct API billing).

---

## Operator-Decision Asks (surfaced during research)

These require explicit operator approval before Claude Code proceeds:

1. **Pricing/positioning model:** Open-source MIT (Tailwind model, now revenue-collapsed), or open-core with Linux Foundation sponsorship, or Polar/OSMF Open Source Maintenance Fee (Rob Mensching's recommendation per robmensching.com Jan 9 2026)? **Recommend Linux Foundation path for moat per §3.11.**
2. **DTCG Community Group time commitment:** CG seat requires 1-2 calls/month + GitHub triage. Operator approves Claude Code authoring drafts for review?
3. **Sponsor outreach timing:** Pre-Phase 5 outreach might dilute message; **recommend after Phase 4 catalog hits 50-pattern plateau**.
4. **Backend prioritization:** Brief lists Material Web, Carbon, Polaris, Spectrum, Geist. Polaris React deprecated Oct 1 2025; **Polaris Web Components is the new target**. Operator approves swap?
5. **Aesthetic-pack governance:** Community-contributable (Rust crates model) or core-team-only? **Recommend core-team-only through 50-pattern plateau, then open**.
6. **Motion module ownership:** DTCG submission requires named authorship; operator approves Bug/Donald Pilger as authoring contact?
7. **shadcn registry compatibility:** Achieving compatibility means accepting React/Tailwind emission as one backend, not just emitting *to* Material Web/Carbon/etc. Operator approves?
8. **Halt-and-report cadence:** All halt-and-report conditions produce markdown for operator review; operator approves cadence (per-turn / daily / weekly)?

---

## Caveats

- **Inferred per-component cost-savings math** (~$0.12 / ~200x reduction) is back-of-envelope from published per-token rates and Bolt's public token-per-prompt numbers; **no vendor has confirmed this figure**. Cite as inference, not disclosure.
- **Rauch's "20% of usage, 70% of spend" quote** is from InfoQ's summary of the live event Code with Claude 2026 (May 6 2026, SF); the raw Anthropic livestream was not directly accessed. Attribute as "Rauch, Code with Claude 2026, via InfoQ (Hoblitzell, May 18 2026)."
- **Turbopack plugin API "Q2 2026"** is from third-party reporting of Vercel's roadmap; Next.js official docs as of mid-2026 still state no Webpack plugin API support. Treat as forecast.
- **Bun-Anthropic design-language roadmap:** no public disclosure on first-class design-language plugin surface. Bun integration assumes general plugin-API support, not design-language-specific commitment.
- **DTCG Motion Module status:** there is no standalone "Motion Module" document; all motion primitives live in the Format Module 2025.10 (`duration` + `cubicBezier` + `transition`). Springs, keyframes, motion-path, scroll-timeline, view-transition tokens are *unclaimed*. Strongest standards-claim opportunity but most contested if multiple parties enter.
- **WCAG 3.0:** too unstable for compliance commitments through 2028+. WCAG 2.2 AA remains the baseline.
- **MLIR dialect-proliferation cautionary tale:** arXiv 2512.05887 (Vaidya, Böhme, D'Antoni, Dec 2025) found 88 bugs across 91 dialects, 1,338 operations in 6 MLIR projects. Quoin will hit this exact problem past 50 packs.
- **Tailwind acqui-hire risk:** at −80% revenue, acquisition by Vercel/Google/Microsoft is plausible and would close the vacuum. Monitor.
- **Standards-body participation:** requires sustained engagement (1-2 calls/month minimum). Operator's no-coding-skills constraint means Claude Code authors all drafts; operator-as-orchestrator must approve every external submission.
- **Claude Code revenue trajectory:** per Sacra and VentureBeat Feb 2026 disclosures: GA May 2025, $1B annualized revenue by November 2025, $2.5B run-rate by February 2026 (enterprise use now over half of revenue). The pace of vendor-side adoption is the single largest tailwind behind Quoin's "default semantic addressing layer" thesis — but also the single largest risk if Anthropic decides to ship its own design-language layer first.