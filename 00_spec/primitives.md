# V1 Semantic Primitives

**Version:** 0.1 (draft)

Initial semantic vocabulary for Quoin. 36 primitives across six categories. The reference vocabulary pack `@quoin/vocab-editorial` and `@quoin/vocab-dashboard` together implement this complete set.

Each primitive specifies: name, category, role, accepted canonical attributes, primitive-specific attributes, default semantic tokens referenced, sample compiled output against `@quoin/impl-tailwind` with `@quoin/tokens-baseline`, and example HTML usage.

---

## 1. Editorial primitives (8)

Primitives optimized for long-form reading, articles, essays, documentation.

### 1.1 `<authority-mark>`

**Role:** Dominant editorial mark. The primary headline-class element of a view. Typically one per page.

**Attributes:** `intent`, `weight` (default `dominate`)

**Tokens:** `--type-display`, `--font-display`, `--text-emphasis`, `--tracking-tight`

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
  <p>Paragraph one...</p>
  <p>Paragraph two...</p>
</reading-flow>
```

### 1.5 `<aside-note>`

**Role:** Parenthetical content set apart from main flow.

**Attributes:** `intent` (default `tertiary`), `scope` (default `block`)

**Tokens:** `--surface-recessed`, `--text-recede`, `--border`

**Compiled output:** `<aside class="bg-stone-50 text-stone-600 border-l-2 border-stone-300 pl-4 py-2">`

### 1.6 `<lead-graf>`

**Role:** Opening paragraph with elevated weight.

**Attributes:** `weight` (default `emphasize`)

**Tokens:** `--type-lead`, `--text-emphasis`, `--leading-prose`

**Compiled output:** `<p class="text-xl text-stone-900 leading-relaxed">`

### 1.7 `<colophon>`

**Role:** Metadata footer of an article or page.

**Attributes:** `register` (default `formal`), `weight` (default `recede`)

**Tokens:** `--type-caption`, `--text-recede`, `--font-mono`

**Compiled output:** `<footer class="text-sm font-mono text-stone-500 tracking-wide">`

### 1.8 `<pull-quote>`

**Role:** Extracted emphasis pulled from surrounding body.

**Attributes:** `weight` (default `emphasize`)

**Tokens:** `--type-pull`, `--text-emphasis`, `--font-display`

**Compiled output:** `<blockquote class="text-3xl font-serif text-stone-900 italic border-l-4 border-stone-900 pl-6 my-8">`

---

## 2. Layout primitives (7)

### 2.1 `<stack>`

**Role:** Vertical arrangement with consistent rhythm between children.

**Attributes:** `density`

**Specific attributes:** `gap` (`compact` | `comfortable` | `loose`)

**Tokens:** `--space-stack-{density}`

**Compiled output:** `<div class="flex flex-col gap-4">`

### 2.2 `<cluster>`

**Role:** Horizontal arrangement that wraps. Used for tags, action groups, inline collections.

**Attributes:** `density`

**Compiled output:** `<div class="flex flex-wrap gap-2">`

### 2.3 `<frame>`

**Role:** Bounded container with optional structural lines (border, divider).

**Attributes:** `weight`, `density`

**Tokens:** `--border`, `--space-frame`, `--radius-frame`

**Compiled output:** `<div class="border border-stone-200 rounded p-4">`

### 2.4 `<density-grid>`

**Role:** Content-dense grid for dashboards, indexes, gallery surfaces.

**Attributes:** `density` (default `dense`), `intent`

**Specific attributes:** `min-cell-width` (CSS length)

**Compiled output:** `<div class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2">`

### 2.5 `<panel>`

**Role:** Sectioned area within a larger layout.

**Attributes:** `weight`, `density`

**Tokens:** `--surface-elevated`, `--space-panel`

**Compiled output:** `<section class="bg-white p-6">`

### 2.6 `<rail>`

**Role:** Fixed-width sidebar.

**Attributes:** `weight`

**Specific attributes:** `width` (`compact` | `comfortable`)

**Compiled output:** `<aside class="w-64 shrink-0 border-r border-stone-200 p-4">`

### 2.7 `<canvas-block>`

**Role:** Flexible work area; the primary content region of a layout.

**Compiled output:** `<main class="flex-1 min-w-0 p-6">`

---

## 3. Navigational primitives (5)

### 3.1 `<wayfinder>`

**Role:** Primary site or app navigation.

**Attributes:** `intent` (default `primary`), `density`

**Tokens:** `--surface`, `--text`, `--border`

**Compiled output:** `<nav class="flex items-center gap-6 px-6 py-4 border-b border-stone-200">`

### 3.2 `<breadcrumb-trail>`

**Role:** Hierarchical position indicator.

**Attributes:** `weight` (default `recede`)

**Compiled output:** `<nav aria-label="breadcrumb" class="flex items-center gap-2 text-sm text-stone-500">`

### 3.3 `<segment-control>`

**Role:** Tabbed or segmented selection of mutually exclusive options.

**Attributes:** `density`

**Compiled output:** `<div role="tablist" class="inline-flex p-1 bg-stone-100 rounded-md">`

### 3.4 `<jump-list>`

**Role:** Anchor-style internal page navigation (table of contents, on-page nav).

**Compiled output:** `<nav class="sticky top-4 flex flex-col gap-2 text-sm">`

### 3.5 `<paginator>`

**Role:** Sequential navigation between paged content.

**Compiled output:** `<nav class="flex items-center justify-between gap-4 mt-8">`

---

## 4. State primitives (5)

### 4.1 `<active-zone>`

**Role:** Currently selected or in-focus region.

**Attributes:** `intent`

**Tokens:** `--surface-elevated`, `--border-emphasis`, `--accent`

**Compiled output:** `<div class="bg-white ring-2 ring-stone-900 ring-offset-2">`

### 4.2 `<pending-block>`

**Role:** Loading or processing state placeholder.

**Tokens:** `--surface-recessed`, `--text-recede`

**Compiled output:** `<div role="status" class="bg-stone-100 animate-pulse">`

### 4.3 `<resolved-mark>`

**Role:** Completion or success indicator.

**Attributes:** `intent` (default `success`)

**Tokens:** `--success`

**Compiled output:** `<div class="text-emerald-700 font-medium">`

### 4.4 `<alert-band>`

**Role:** System messaging strip.

**Attributes:** `intent` (default `info`)

**Tokens:** `--info`, `--warning`, `--critical`

**Compiled output:** `<div role="alert" class="px-4 py-3 bg-stone-100 border-l-4 border-stone-900">`

### 4.5 `<empty-state>`

**Role:** No-content placeholder with optional call to action.

**Attributes:** `weight` (default `recede`)

**Compiled output:** `<div class="flex flex-col items-center justify-center py-16 text-stone-500">`

---

## 5. Content primitives (6)

### 5.1 `<media-frame>`

**Role:** Image or video container with optional caption.

**Attributes:** `weight`, `density`

**Tokens:** `--radius-media`, `--border`

**Compiled output:** `<figure class="overflow-hidden rounded">`

### 5.2 `<figure-cite>`

**Role:** Illustrated reference with attribution.

**Compiled output:** `<figure class="flex flex-col gap-2"><img>...<figcaption class="text-sm text-stone-500">`

### 5.3 `<data-table>`

**Role:** Tabular data presentation.

**Attributes:** `density`

**Compiled output:** `<div class="overflow-x-auto"><table class="w-full text-sm">`

### 5.4 `<key-value-list>`

**Role:** Definition-list-style key/value pairs.

**Attributes:** `density`, `register`

**Compiled output:** `<dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">`

### 5.5 `<timeline-stack>`

**Role:** Sequential events arranged temporally.

**Compiled output:** `<ol class="flex flex-col gap-4 border-l-2 border-stone-200 pl-6">`

### 5.6 `<code-block>`

**Role:** Block-level code presentation.

**Attributes:** `density`

**Tokens:** `--font-mono`, `--surface-recessed`

**Compiled output:** `<pre class="bg-stone-100 p-4 rounded font-mono text-sm overflow-x-auto">`

---

## 6. Interactive primitives (5)

### 6.1 `<primary-action>`

**Role:** Main call-to-action button.

**Attributes:** `intent` (default `primary`), `weight` (default `emphasize`)

**Tokens:** `--accent`, `--text-on-accent`

**Compiled output:** `<button class="px-4 py-2 bg-stone-900 text-white rounded-md font-medium">`

### 6.2 `<secondary-action>`

**Role:** Supporting button or link-action.

**Attributes:** `intent` (default `secondary`)

**Tokens:** `--border`, `--text`

**Compiled output:** `<button class="px-4 py-2 border border-stone-300 text-stone-900 rounded-md">`

### 6.3 `<destructive-action>`

**Role:** Action requiring confirmation due to irreversibility.

**Attributes:** `intent` (default `critical`)

**Tokens:** `--critical`, `--text-on-critical`

**Compiled output:** `<button class="px-4 py-2 bg-red-700 text-white rounded-md font-medium">`

### 6.4 `<input-cell>`

**Role:** Text input field.

**Attributes:** `density`, `intent`

**Specific attributes:** `type`, `name`, `placeholder`

**Compiled output:** `<input class="px-3 py-2 border border-stone-300 rounded-md w-full">`

### 6.5 `<disclosure>`

**Role:** Collapsible content region.

**Specific attributes:** `summary` (text or slot)

**Compiled output:** `<details class="border border-stone-200 rounded"><summary class="px-4 py-2 cursor-pointer">`

---

## Coverage check

| Category | Count |
|----------|-------|
| Editorial | 8 |
| Layout | 7 |
| Navigational | 5 |
| State | 5 |
| Content | 6 |
| Interactive | 5 |
| **Total** | **36** |

This is the v1 floor. Vocabulary packs MAY define additional primitives within their own namespace. The core vocabulary above is reserved and stable; additions to the core after v1.0 follow the spec versioning rules in `spec.md`.
