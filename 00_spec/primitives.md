# V1 Semantic Primitives

**Version:** 0.1
**Status:** Phase 0 — canonical v1 vocabulary.

The initial Quoin vocabulary. **36 primitives across six categories.** The reference vocabulary packs `@quoin/vocab-editorial` and `@quoin/vocab-dashboard` together implement this complete set; either pack alone covers a subset.

Each primitive specifies: **name**, **category**, **role**, **canonical attributes** with defaults, any **primitive-specific attributes**, **default semantic tokens referenced**, **sample compiled output** against `@quoin/impl-tailwind` with `@quoin/tokens-baseline`, and **example HTML usage**.

The vocabulary is intentionally aesthetic-neutral. No color, font, or visual choice is baked into a primitive definition. Aesthetic is supplied by the token pack (`tokens.md`). The naming discipline — `<authority-mark>` over `<h1-large>`, `<colophon>` over `<small-bottom>` — follows Alexander's pattern grammar (`A Pattern Language`, 1977) and the editorial vocabulary of the Swiss / International Typographic Style.

Compiled output is shown for the Tailwind v4 target with the baseline token pack. The same primitive against a different token pack would emit different utility classes; against `@quoin/impl-raw-css` it would emit CSS custom-property references. The semantic tag itself does not change.

Cross-references:
- Attribute system, cascade rules, compilation model: `spec.md` §§2–5.
- Token references resolve against the canonical semantic namespace: `tokens.md` §2.
- Vocabulary-pack format for these definitions: `pack-format.md` §5.

---

## 1. Editorial primitives (8)

Long-form reading, articles, essays, documentation. Naming borrows from editorial design tradition: a colophon, a pull quote, a lead graf, an aside note are all terms native to typesetting.

### 1.1 `<authority-mark>`

**Role:** Dominant editorial mark. The primary headline-class element of a view. Typically one per page.

**Attributes:** `intent`, `weight` (default `dominate`)

**Tokens:** `--type-size-display`, `--font-display`, `--text-emphasis`, `--tracking-tight`

**Compiled output (Tailwind):** `<h1 class="text-7xl font-serif font-medium tracking-tight text-stone-900">`

**Example:**
```html
<authority-mark>The Bot Smell Problem</authority-mark>
```

### 1.2 `<recede-block>`

**Role:** Content that intentionally backs off. Supporting role, lower visual weight.

**Attributes:** `intent` (default `supporting`), `weight` (default `recede`)

**Tokens:** `--type-body`, `--text-recede`

**Compiled output:** `<div class="text-base text-stone-500">`

**Example:**
```html
<recede-block>This piece originally appeared in The Boone County Bulletin.</recede-block>
```

### 1.3 `<emphasis-card>`

**Role:** Single highlighted content unit with structural separation from surrounding flow.

**Attributes:** `intent`, `weight` (default `emphasize`), `density`

**Tokens:** `--surface-elevated`, `--border`, `--space-card`, `--radius-card`

**Compiled output:** `<section class="bg-white border border-stone-200 rounded-lg p-6">`

**Example:**
```html
<emphasis-card>
  <authority-mark weight="normal">Key takeaway</authority-mark>
  <reading-flow>...</reading-flow>
</emphasis-card>
```

### 1.4 `<reading-flow>`

**Role:** Long-form body text container with optimized reading-line measure and rhythm.

**Attributes:** `register`, `density`

**Tokens:** `--type-body`, `--text`, `--leading-prose`, `--measure-prose`

**Compiled output:** `<div class="text-base text-stone-700 leading-relaxed max-w-prose">`

**Example:**
```html
<reading-flow>
  <p>Paragraph one of the essay body.</p>
  <p>Paragraph two of the essay body.</p>
</reading-flow>
```

### 1.5 `<aside-note>`

**Role:** Parenthetical content set apart from main flow.

**Attributes:** `intent` (default `tertiary`), `scope` (default `block`)

**Tokens:** `--surface-recessed`, `--text-recede`, `--border`

**Compiled output:** `<aside class="bg-stone-50 text-stone-600 border-l-2 border-stone-300 pl-4 py-2">`

**Example:**
```html
<aside-note>Cf. Müller-Brockmann, <em>Grid Systems</em> (1981), p. 41.</aside-note>
```

### 1.6 `<lead-graf>`

**Role:** Opening paragraph with elevated weight. Editorial term for the article's first paragraph, set apart by size or treatment.

**Attributes:** `weight` (default `emphasize`)

**Tokens:** `--type-lead`, `--text-emphasis`, `--leading-prose`

**Compiled output:** `<p class="text-xl text-stone-900 leading-relaxed">`

**Example:**
```html
<lead-graf>For the last fifteen years, the dominant aesthetic of the web has been one of progressive simplification.</lead-graf>
```

### 1.7 `<colophon>`

**Role:** Metadata footer of an article or page. Authorship, typeface notes, set-in, date, dependencies — the publisher's mark.

**Attributes:** `register` (default `formal`), `weight` (default `recede`)

**Tokens:** `--type-caption`, `--text-recede`, `--font-mono`

**Compiled output:** `<footer class="text-sm font-mono text-stone-500 tracking-wide">`

**Example:**
```html
<colophon>Set in iA Writer Quattro. Composed in Quoin v0.1. May 2026.</colophon>
```

### 1.8 `<pull-quote>`

**Role:** Extracted emphasis pulled from surrounding body. A direct editorial-design transplant: the quotation set off in larger type beside the running text.

**Attributes:** `weight` (default `emphasize`)

**Tokens:** `--type-pull`, `--text-emphasis`, `--font-display`

**Compiled output:** `<blockquote class="text-3xl font-serif text-stone-900 italic border-l-4 border-stone-900 pl-6 my-8">`

**Example:**
```html
<pull-quote>The grid is a refusal of chance.</pull-quote>
```

---

## 2. Layout primitives (7)

Structural containers. The grammar of Swiss typography in element form: stack, cluster, frame, grid, panel, rail, canvas.

### 2.1 `<stack>`

**Role:** Vertical arrangement with consistent rhythm between children.

**Attributes:** `density`

**Specific attributes:** `gap` (`compact` | `comfortable` | `loose`)

**Tokens:** `--space-stack-{density}`

**Compiled output:** `<div class="flex flex-col gap-4">`

**Example:**
```html
<stack gap="loose">
  <authority-mark>Section title</authority-mark>
  <reading-flow><p>...</p></reading-flow>
  <primary-action>Read more</primary-action>
</stack>
```

### 2.2 `<cluster>`

**Role:** Horizontal arrangement that wraps. Used for tag groups, action sets, inline collections.

**Attributes:** `density`

**Tokens:** `--space-inline-normal`, `--space-inline-tight`

**Compiled output:** `<div class="flex flex-wrap gap-2">`

**Example:**
```html
<cluster>
  <primary-action>Save</primary-action>
  <secondary-action>Cancel</secondary-action>
</cluster>
```

### 2.3 `<frame>`

**Role:** Bounded container with optional structural lines (border, divider).

**Attributes:** `weight`, `density`

**Tokens:** `--border`, `--space-frame`, `--radius-frame`

**Compiled output:** `<div class="border border-stone-200 rounded p-4">`

**Example:**
```html
<frame>
  <key-value-list>
    <dt>Status</dt><dd>Active</dd>
    <dt>Last run</dt><dd>13 minutes ago</dd>
  </key-value-list>
</frame>
```

### 2.4 `<density-grid>`

**Role:** Content-dense grid for dashboards, indexes, gallery surfaces.

**Attributes:** `density` (default `dense`), `intent`

**Specific attributes:** `min-cell-width` (CSS length)

**Tokens:** `--space-inline-tight`, `--space-stack-compact`

**Compiled output:** `<div class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2">`

**Example:**
```html
<density-grid min-cell-width="240px">
  <emphasis-card>...</emphasis-card>
  <emphasis-card>...</emphasis-card>
  <emphasis-card>...</emphasis-card>
</density-grid>
```

### 2.5 `<panel>`

**Role:** Sectioned area within a larger layout.

**Attributes:** `weight`, `density`

**Tokens:** `--surface-elevated`, `--space-panel`

**Compiled output:** `<section class="bg-white p-6">`

**Example:**
```html
<panel>
  <authority-mark weight="emphasize">Settings</authority-mark>
  <stack>...</stack>
</panel>
```

### 2.6 `<rail>`

**Role:** Fixed-width sidebar.

**Attributes:** `weight`

**Specific attributes:** `width` (`compact` | `comfortable`)

**Tokens:** `--border`, `--space-panel`

**Compiled output:** `<aside class="w-64 shrink-0 border-r border-stone-200 p-4">`

**Example:**
```html
<rail width="compact">
  <wayfinder>...</wayfinder>
</rail>
```

### 2.7 `<canvas-block>`

**Role:** Flexible work area; the primary content region of a layout.

**Attributes:** `density`

**Tokens:** `--space-panel`

**Compiled output:** `<main class="flex-1 min-w-0 p-6">`

**Example:**
```html
<canvas-block>
  <authority-mark>Today</authority-mark>
  <density-grid>...</density-grid>
</canvas-block>
```

---

## 3. Navigational primitives (5)

### 3.1 `<wayfinder>`

**Role:** Primary site or app navigation.

**Attributes:** `intent` (default `primary`), `density`

**Tokens:** `--surface`, `--text`, `--border`

**Compiled output:** `<nav class="flex items-center gap-6 px-6 py-4 border-b border-stone-200">`

**Example:**
```html
<wayfinder>
  <a href="/">Home</a>
  <a href="/work">Work</a>
  <a href="/journal">Journal</a>
</wayfinder>
```

### 3.2 `<breadcrumb-trail>`

**Role:** Hierarchical position indicator.

**Attributes:** `weight` (default `recede`)

**Tokens:** `--text-recede`

**Compiled output:** `<nav aria-label="breadcrumb" class="flex items-center gap-2 text-sm text-stone-500">`

**Example:**
```html
<breadcrumb-trail>
  <a href="/">Home</a>
  <span>/</span>
  <a href="/journal">Journal</a>
  <span>/</span>
  <span>The Bot Smell Problem</span>
</breadcrumb-trail>
```

### 3.3 `<segment-control>`

**Role:** Tabbed or segmented selection of mutually exclusive options.

**Attributes:** `density`

**Tokens:** `--surface-recessed`, `--radius-md`

**Compiled output:** `<div role="tablist" class="inline-flex p-1 bg-stone-100 rounded-md">`

**Example:**
```html
<segment-control>
  <button role="tab" aria-selected="true">Day</button>
  <button role="tab">Week</button>
  <button role="tab">Month</button>
</segment-control>
```

### 3.4 `<jump-list>`

**Role:** Anchor-style internal page navigation (table of contents, on-page nav).

**Attributes:** `density`

**Tokens:** `--text-recede`, `--space-stack-compact`

**Compiled output:** `<nav class="sticky top-4 flex flex-col gap-2 text-sm">`

**Example:**
```html
<jump-list>
  <a href="#intro">Introduction</a>
  <a href="#method">Method</a>
  <a href="#results">Results</a>
</jump-list>
```

### 3.5 `<paginator>`

**Role:** Sequential navigation between paged content.

**Attributes:** `density`

**Tokens:** `--text`, `--border`

**Compiled output:** `<nav class="flex items-center justify-between gap-4 mt-8">`

**Example:**
```html
<paginator>
  <a href="?page=3" rel="prev">← Previous</a>
  <span>Page 4 of 12</span>
  <a href="?page=5" rel="next">Next →</a>
</paginator>
```

---

## 4. State primitives (5)

### 4.1 `<active-zone>`

**Role:** Currently selected or in-focus region.

**Attributes:** `intent`

**Tokens:** `--surface-elevated`, `--border-emphasis`, `--accent`

**Compiled output:** `<div class="bg-white ring-2 ring-stone-900 ring-offset-2">`

**Example:**
```html
<active-zone>
  <emphasis-card>The currently selected list item.</emphasis-card>
</active-zone>
```

### 4.2 `<pending-block>`

**Role:** Loading or processing state placeholder.

**Attributes:** `weight` (default `recede`)

**Tokens:** `--surface-recessed`, `--text-recede`

**Compiled output:** `<div role="status" class="bg-stone-100 animate-pulse">`

**Example:**
```html
<pending-block>Loading invoices…</pending-block>
```

### 4.3 `<resolved-mark>`

**Role:** Completion or success indicator.

**Attributes:** `intent` (default `success`)

**Tokens:** `--success`, `--text-on-success`

**Compiled output:** `<div class="text-emerald-700 font-medium">`

**Example:**
```html
<resolved-mark>Saved.</resolved-mark>
```

### 4.4 `<alert-band>`

**Role:** System messaging strip.

**Attributes:** `intent` (default `info`)

**Tokens:** `--info`, `--warning`, `--critical`, `--success`

**Compiled output:** `<div role="alert" class="px-4 py-3 bg-stone-100 border-l-4 border-stone-900">`

**Example:**
```html
<alert-band intent="warning">Build will run with reduced cache.</alert-band>
```

### 4.5 `<empty-state>`

**Role:** No-content placeholder with optional call to action.

**Attributes:** `weight` (default `recede`)

**Tokens:** `--text-recede`, `--space-panel`

**Compiled output:** `<div class="flex flex-col items-center justify-center py-16 text-stone-500">`

**Example:**
```html
<empty-state>
  <p>No invoices yet.</p>
  <primary-action>Create your first invoice</primary-action>
</empty-state>
```

---

## 5. Content primitives (6)

### 5.1 `<media-frame>`

**Role:** Image or video container with optional caption.

**Attributes:** `weight`, `density`

**Tokens:** `--radius-media`, `--border`

**Compiled output:** `<figure class="overflow-hidden rounded">`

**Example:**
```html
<media-frame>
  <img src="/img/grid.png" alt="The Müller-Brockmann grid">
</media-frame>
```

### 5.2 `<figure-cite>`

**Role:** Illustrated reference with attribution.

**Attributes:** `register`, `weight`

**Tokens:** `--text-recede`, `--space-stack-compact`

**Compiled output:** `<figure class="flex flex-col gap-2"><img>...<figcaption class="text-sm text-stone-500">`

**Example:**
```html
<figure-cite>
  <img src="/img/vignelli-grid.png" alt="Unimark NYC subway diagram">
  <figcaption>Massimo Vignelli, NYC Subway Diagram, 1972.</figcaption>
</figure-cite>
```

### 5.3 `<data-table>`

**Role:** Tabular data presentation.

**Attributes:** `density`

**Tokens:** `--text`, `--border`, `--space-inline-tight`

**Compiled output:** `<div class="overflow-x-auto"><table class="w-full text-sm">`

**Example:**
```html
<data-table density="dense">
  <thead><tr><th>Invoice</th><th>Date</th><th>Amount</th></tr></thead>
  <tbody>
    <tr><td>#0042</td><td>2026-05-12</td><td>$1,250</td></tr>
  </tbody>
</data-table>
```

### 5.4 `<key-value-list>`

**Role:** Definition-list-style key/value pairs.

**Attributes:** `density`, `register`

**Tokens:** `--text`, `--text-recede`, `--space-stack-compact`

**Compiled output:** `<dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">`

**Example:**
```html
<key-value-list>
  <dt>Status</dt><dd>Paid</dd>
  <dt>Due</dt><dd>2026-04-30</dd>
  <dt>Issued</dt><dd>2026-04-01</dd>
</key-value-list>
```

### 5.5 `<timeline-stack>`

**Role:** Sequential events arranged temporally.

**Attributes:** `density`

**Tokens:** `--border`, `--text`, `--space-stack-normal`

**Compiled output:** `<ol class="flex flex-col gap-4 border-l-2 border-stone-200 pl-6">`

**Example:**
```html
<timeline-stack>
  <li>2026-05-16 — Invoice issued</li>
  <li>2026-05-18 — Reminder sent</li>
  <li>2026-05-21 — Paid</li>
</timeline-stack>
```

### 5.6 `<code-block>`

**Role:** Block-level code presentation.

**Attributes:** `density`

**Tokens:** `--font-mono`, `--surface-recessed`, `--radius-md`

**Compiled output:** `<pre class="bg-stone-100 p-4 rounded font-mono text-sm overflow-x-auto">`

**Example:**
```html
<code-block>
  <code>const greeting = "hello, world";</code>
</code-block>
```

---

## 6. Interactive primitives (5)

### 6.1 `<primary-action>`

**Role:** Main call-to-action button.

**Attributes:** `intent` (default `primary`), `weight` (default `emphasize`)

**Tokens:** `--accent`, `--text-on-accent`, `--radius-md`

**Compiled output:** `<button class="px-4 py-2 bg-stone-900 text-white rounded-md font-medium">`

**Example:**
```html
<primary-action>Submit</primary-action>
```

### 6.2 `<secondary-action>`

**Role:** Supporting button or link-action.

**Attributes:** `intent` (default `secondary`)

**Tokens:** `--border`, `--text`, `--radius-md`

**Compiled output:** `<button class="px-4 py-2 border border-stone-300 text-stone-900 rounded-md">`

**Example:**
```html
<secondary-action>Cancel</secondary-action>
```

### 6.3 `<destructive-action>`

**Role:** Action requiring confirmation due to irreversibility.

**Attributes:** `intent` (default `critical`)

**Tokens:** `--critical`, `--text-on-critical`, `--radius-md`

**Compiled output:** `<button class="px-4 py-2 bg-red-700 text-white rounded-md font-medium">`

**Example:**
```html
<destructive-action>Delete account</destructive-action>
```

### 6.4 `<input-cell>`

**Role:** Text input field.

**Attributes:** `density`, `intent`

**Specific attributes:** `type`, `name`, `placeholder`

**Tokens:** `--border`, `--text`, `--radius-md`, `--surface`

**Compiled output:** `<input class="px-3 py-2 border border-stone-300 rounded-md w-full">`

**Example:**
```html
<input-cell type="email" name="email" placeholder="you@example.com"></input-cell>
```

### 6.5 `<disclosure>`

**Role:** Collapsible content region.

**Specific attributes:** `summary` (text or slot)

**Tokens:** `--border`, `--text`, `--radius-md`

**Compiled output:** `<details class="border border-stone-200 rounded"><summary class="px-4 py-2 cursor-pointer">`

**Example:**
```html
<disclosure summary="Show full transaction details">
  <key-value-list>
    <dt>Reference</dt><dd>TXN-90212</dd>
    <dt>Method</dt><dd>ACH</dd>
  </key-value-list>
</disclosure>
```

---

## Coverage

| Category | Count |
|----------|-------|
| Editorial | 8 |
| Layout | 7 |
| Navigational | 5 |
| State | 5 |
| Content | 6 |
| Interactive | 5 |
| **Total** | **36** |

This is the v1 floor. Vocabulary packs MAY define additional primitives within their own namespace. Core-vocabulary changes after v1.0 follow the spec versioning rules (`spec.md` §7, `pack-format.md` §8).

## Cross-references

- Authoring syntax, attribute system, cascade, error model: `spec.md`.
- Pack manifest schema and primitive definition format: `pack-format.md` §5.
- Token references resolve against the canonical semantic namespace: `tokens.md` §2.
