# Quoin Pack Authoring — Universal Quality Bar

**Applies to:** every pack of every type (token, vocab, theme, template, pattern, icon, motion, layout).

## The Standard

Every Quoin pack ships at the polish level of these peer ecosystems:

- **Tailwind UI** (tailwindui.com) — production component templates.
- **DaisyUI** (daisyui.com) — semantic component library at scale (19M+ installs).
- **Astro Themes** (astro.build/themes) — full-site templates.
- **shadcn/ui Blocks** (ui.shadcn.com/blocks) — production-quality block compositions.
- **Mantine** (mantine.dev) — component library with deep coverage.

If a pack would not be selectable from those catalogs because of polish, scope, or completeness, **halt and report. Do not ship.**

## Universal Requirements

### 1. All states designed

Per Vercel's Web Interface Guidelines:

- Empty state
- Sparse state (1–3 items)
- Dense state (many items, realistic load)
- Error state (network, permission, validation)
- Loading state (skeleton or progress indicator)
- Success state (post-action confirmation)

A pack that ships only hover state on interactive primitives is not done.

### 2. All microstates

- Default
- Hover
- Active / pressed
- Focus (visible focus ring per `--focus-ring-*` tokens)
- Focus-visible (keyboard-only focus)
- Disabled
- Loading
- Read-only (for inputs)
- Selected (for selectable items)
- Indeterminate (for checkboxes/progress)

### 3. Accessibility (always-on)

- Semantic HTML preserved (button is `<button>`, link is `<a>`).
- ARIA labels on icon-only buttons.
- Status conveyed by text + color, never color alone.
- Focus management: visible rings, trap inside modals, restore on close.
- Skip links on full-page templates.
- `prefers-reduced-motion` honored.
- 44×44 CSS px minimum hit target (Apple HIG / WCAG 2.5.5).
- APCA Lc ≥ 60 for body, Lc ≥ 75 for fine print (primary).
- WCAG 2.2 AA 4.5:1 ratio (compliance fallback).

### 4. Typographic precision

- Curly quotes (`'` `'` `"` `"`) over straight (`'` `"`).
- Ellipsis character (`…`) over three periods (`...`).
- Em dashes (`—`) and en dashes (`–`) used correctly.
- Tidy rag — no widows on display headlines.
- Tabular numerics (`font-variant-numeric: tabular-nums`) for monetary cells, comparison tables, any data.
- Hanging punctuation for prose paragraphs (`hanging-punctuation: first last;`) where supported.

### 5. Localization-aware

- Date, time, number, currency via `Intl.*` APIs.
- Layouts handle short, average, and very-long content gracefully.
- RTL support where source content is bidirectional.
- Long German compound words don't break layouts.
- CJK character widths handled.

### 6. Performance

- LCP < 2.5s on mid-tier mobile.
- CLS < 0.1.
- INP < 200ms.
- Fonts preloaded with `font-display: swap` AND `ascent-override`/`descent-override`/`size-adjust` to prevent CLS.
- Images via responsive `srcset` + `sizes`.
- Critical CSS inline; non-critical deferred.
- No render-blocking scripts.

### 7. Deep-linkability

- Filters in URL.
- Tab state in URL.
- Pagination in URL.
- Expanded/collapsed panel state in URL.
- Back/forward restores scroll position.

### 8. Forgiving interactions

- Prediction cones on hover-out from dropdowns (don't dismiss immediately).
- `overscroll-behavior: contain` on modals/drawers.
- Click targets generous; padding extends hit area beyond visible.
- Forms preserve in-progress state across navigation.
- Confirm destructive actions; allow undo where possible.

### 9. Token-grounded

- Every value references a canonical token. No hardcoded `#fff`, `1rem`, `0.5s`.
- Composite tokens used where they exist (`shadow-md`, `text-headline-lg`, `transition-default`).
- Per-pack component tokens permitted for vocab-pack-specific concerns only.

### 10. Documented

- README explains what the pack is, who it's for, what other packs it composes with.
- Live example in `examples/` directory.
- Migration notes from peer ecosystems (Tailwind → this pack, shadcn → this pack) where relevant.

## Anti-Patterns (immediate halt-and-report)

- Lorem ipsum or placeholder copy in templates.
- Card-grid layout chosen by default for /projects, /portfolio, /work pages without exploring alternatives.
- Identical-looking outputs across multiple packs of the same type ("we shipped 10 themes but they all look like variations of slate-with-an-accent").
- Generic-sounding marketing copy.
- Pack ships with only color tokens, no composite tokens, no states, no microstates.
- Pack ships with documentation that says "TODO" or "coming soon."
- Pack ships without responsive behavior.
- Pack ships without dark mode (when light mode is provided).

## Halt-and-Report Triggers

Halt and report to operator if:

- The work is converging toward boilerplate.
- The visual differentiation across multiple packs in the same category is poor.
- A peer ecosystem (Tailwind UI / DaisyUI / Astro Themes / shadcn Blocks / Mantine) would not accept this pack into their catalog.
- You cannot produce production-quality copy for a template and are tempted to use placeholders.
- You cannot find source data for a pack's composite values and are tempted to ship programmatic defaults.
- A pack's reference site has shipped a major redesign that supersedes what you researched.

## Production-Quality Copy Bar (templates)

If a template requires written content, the bar is:

- Real or credibly mock brand names (not "Acme Corp," not "Lorem Industries").
- Real or credibly mock product descriptions (not "Lorem ipsum dolor").
- Real or credibly mock pricing (not "$XX/mo," real numbers).
- Real or credibly mock testimonials with real-sounding names and titles (not "John Doe, CEO").
- Real or credibly mock dates, version numbers, technical specs.

Reference catalogs that meet this bar: Tailwind UI templates, Astro Themes, shadcn Blocks. Reference catalogs that fail it: most Bootstrap starter templates, most HTML5 UP themes.

## The Three Hardest Tests

1. **Cross-pack diversity test:** show all 10 themes side-by-side. Do they look like 10 distinct aesthetics or 10 minor variations? If the latter, halt.

2. **Reviewer skepticism test:** imagine a senior designer reviewing the pack. Would they say "this is production-quality" or "this is generated"? If the latter, halt.

3. **Peer ecosystem test:** could this pack ship as a Tailwind UI premium template, an Astro theme catalog entry, or a shadcn Block without modification? If not, halt.
