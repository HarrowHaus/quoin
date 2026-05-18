# Quoin Template Authoring

**Applies to:** any template pack (full-site templates).

## What a Template Pack Is

A Quoin template pack is a pre-composed full site or full page that ships as one installable unit. Users `npx @quoin/create <template-name>` and get a working site they can customize.

A template:
- Is authored entirely in Quoin semantic markup
- Declares its token pack + vocab pack + impl pack dependencies
- Ships with example pages (not just primitives)
- Ships with production-quality content (no placeholders)
- Builds clean on `npm install && npm run build`

## Production-Quality Content Bar

**Every template ships with the writing quality of a real shipped site.**

### Required for all templates

- **Brand name** — credible-sounding, not "Acme Corp" or "Example Inc." Pull from common patterns: object + verb (Cascade, Anchor, Drift), single-word abstract (Folio, Plinth, Margin), founder-style (Holm & Co, Vance Studio), techish (Stratum, Latch, Crest). Avoid trademark conflicts.
- **Product/site descriptions** — written copy, not Lorem ipsum. 2–3 sentences that say what the thing actually is.
- **Pricing** — real numbers if it's a pricing template ($19/mo / $49/mo / Custom). Not "$XX."
- **Testimonials** — real-sounding names, titles, and 1–2 sentence quotes that say something specific (not "great product, would recommend").
- **Dates** — believable dates within the last 12–18 months.
- **Numbers** — believable stats. If a SaaS landing claims "10,000+ customers," it reads as real; "999,999,999+ users" reads as filler.

### Reference catalogs that meet this bar
- Tailwind UI templates
- Astro Themes catalog
- shadcn Blocks
- Mantine examples

### Reference catalogs that fail this bar
- Most Bootstrap starter templates
- Most HTML5 UP themes
- Most ThemeForest themes

## Information Architecture by Template Type

### Personal blog / longform editorial

- IA: Home (essay list) → individual essay → optional notes + about. 2–4 routes.
- ATF: typographic wordmark + lede paragraph, OR direct chronological essay list. No hero image.
- Distinctive moves: marginalia / footnotes-as-sidenotes; reading-progress affordance; full typographic ownership; keyboard navigation through essay list.
- Density: 1,500–10,000+ words per essay. Single column 65–75ch measure.
- Required primitives: long-form article body, footnote pattern, prev/next nav, RSS link, optional sidenote.
- References: rauno.me, paulgraham.com, gwern.net, jasonsantamaria.com.

### Library docs (multi-version, with API reference)

- IA: Sidebar (3-level nested) + main + on-page TOC (right rail) + version switcher + command palette (⌘K). 50+ pages.
- ATF: search-first OR getting-started with sidebar visible.
- Distinctive moves: deep-link everything; anchored headings with `scroll-margin-top`; tabular numerics on numeric data; ellipsis character; scroll position persists on back/forward; locale-aware formatting.
- Required primitives: sidebar nav (3-level), command palette, code block with copy + language switcher, callout, version switcher, on-page TOC, search overlay.
- References: stripe.com/docs, react.dev, tailwindcss.com/docs, vercel.com/docs, linear.app/docs.

### SaaS landing (developer-tooling subgenre)

- IA: 5–8 pages: home, product (1–3), pricing, docs, blog, customers, login.
- ATF: animated hero with product mock OR headline + dual CTA.
- Distinctive moves: trust strip, social proof below hero, feature grid (3 or 6), interactive product demo embed, pricing CTA above footer.
- Density: home page 7–14 sections, scrolls 4–8 viewport heights.
- Required primitives: hero with animated product mock, logo strip, feature grid, testimonial, pricing table, FAQ accordion, footer-mega.
- References: stripe.com, vercel.com, linear.app, cursor.com, posthog.com.

### Pricing-only page

- IA: one page: table + FAQ + sales CTA.
- Distinctive moves: annual/monthly toggle, "most popular" tier highlighting, enterprise tier with "talk to sales" CTA, usage-based calculator for API products.
- Required primitives: pricing card, tier comparison table, toggle, FAQ accordion.
- References: stripe.com/pricing, linear.app/pricing, vercel.com/pricing, openai.com/api/pricing.

### Issue tracker (Linear-style)

- IA: inverted-L chrome — left sidebar (workspace tree) + top action bar + main view (list/board/properties drawer). Routes: /inbox /issues /projects /views /settings.
- Distinctive moves: ResponsiveSlot-pattern header (hide content based on space), instant transitions without spinners, ⌘K command palette as primary navigation.
- Required primitives: sidebar tree, top action bar, issue list row, issue detail drawer, command palette, multi-select with bulk action, status pill, assignee avatar.
- References: linear.app, height.app, plane.so, github.com/issues.

### Type foundry / font specimen (Forme line — see `quoin-forme-author.md`)

## Required States Per Template

Every template ships with the following states designed and tested:

- Empty state (no data, no items)
- Sparse state (1–3 items)
- Dense state (many items, realistic load)
- Error state (network, permission, validation)
- Loading state (skeleton or progress)
- Success state (post-action confirmation)

## Required Microstates Per Interactive Element

- Default
- Hover
- Active / pressed
- Focus (visible ring)
- Focus-visible
- Disabled
- Loading
- Read-only (for inputs)

## Required Accessibility Tests

- Lighthouse Accessibility ≥ 95.
- Keyboard navigation works for all interactive elements.
- Focus visible on all interactive elements.
- Skip link at top of page.
- Forms have associated labels.
- Icons have ARIA labels (`aria-label` on icon-only buttons).
- Color contrast: APCA Lc ≥ 60 for body, Lc ≥ 75 for fine print.
- `prefers-reduced-motion` honored.
- Touch targets ≥ 44×44 CSS px.

## Required Performance Budget

- Lighthouse Performance ≥ 90 on mid-tier mobile (Moto G Power simulation).
- LCP < 2.5s.
- CLS < 0.1.
- INP < 200ms.
- Total page weight < 500KB (excluding images) for landing pages.
- Total page weight < 200KB for docs pages.
- Fonts preloaded with metric overrides to prevent CLS.

## Required Deep-Linkability

- Filters in URL.
- Tab state in URL.
- Pagination in URL.
- Expanded/collapsed panel state in URL.
- Back/forward restores scroll position.

## Required Internationalization

- Layouts handle short, average, and very-long content.
- Long German compounds don't break.
- Arabic RTL renders correctly (test with `dir="rtl"`).
- CJK character widths handled.
- Numbers, dates, currency via `Intl.*` APIs.

## Forbidden Patterns

- Lorem ipsum copy.
- Placeholder names (John Doe, Jane Smith, Acme Corp).
- Default-grid-of-cards layout for any /portfolio, /projects, /work page (explore alternative layouts).
- Generic stock photos (use abstract gradients, custom illustrations, real product mockups, or no images).
- Hardcoded color/dimension/size values (everything references canonical tokens).
- Single-state design (only hover state, no other microstates).
- Modal that traps focus but doesn't return it on close.
- Form without inline validation.
- "Coming soon" placeholder pages.
- Generic "Sign up for our newsletter" CTA without value proposition.

## Required Files in a Template Pack

```
@quoin/template-<name>/
├── package.json          # npm metadata, dependencies on token + vocab + impl packs
├── quoin.pack.json       # Quoin pack manifest, declares template type, pages, primitives used
├── README.md             # what this template is, who it's for, what it composes from
├── pages/                # one .html file per page, authored in Quoin semantic markup
│   ├── index.html
│   ├── about.html
│   └── ...
├── public/               # static assets (images, fonts if pack-specific)
├── quoin.config.json     # active token pack, vocab pack, impl pack defaults
└── examples/             # screenshots, live URLs, README excerpts for catalog display
```

## Halt-and-Report Triggers

Halt and report to operator if:

- You cannot produce production-quality copy without falling back to placeholder language.
- The chosen reference sites have shipped a major redesign that supersedes what's in `research/02_design_trends_templates_typography.md` Section 2A.
- The template requires primitives not yet shipped in vocab packs.
- The template's complexity exceeds reasonable scope (a "marketing landing" template that needs 30 unique primitives is over-scoped).

## Reference Site Stress Test

For every template, verify against 2–3 currently-shipping reference sites:

1. Open the reference site.
2. Identify the structural moves (not visual moves) that make it good.
3. Confirm the Quoin template captures those moves.
4. If not, iterate.

If the Quoin template visibly differs in *function* from the references (missing command palette where Linear-style needs one; missing version switcher where Stripe-style needs one), it's not done.
