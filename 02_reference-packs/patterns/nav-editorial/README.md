# @quoin/pattern-nav-editorial

**P1 magazine / editorial-style navigation pattern.** Distinct from marketing nav (CTA-driven, dropdown-rich) and docs nav (sidebar tree). The editorial convention foregrounds the masthead, presents categories as a strong horizontal rule, and keeps utility actions (sign in, subscribe, search) in a clearly-separated row. Seven primitives across three registers.

This pattern **completes the P1 marketing-surface recovery batch** specified in the operator's strategic note: hero-animated → hero-gradient-mesh → hero-brand-photo → hero-video → nav-docs → nav-editorial. Marketing surfaces are now equipped with the full set of nav + hero options.

---

## Composition lineage — what this pattern consumes

| Consumed primitive | Source pack | Version pin | Used in | How this pattern uses it |
|---|---|---|---|---|
| `<action-button intent="primary">` | `@quoin/pattern-button-system` | `^1.0.0` | `nav-editorial-subscribe-cta` | The subscribe pill — visually equivalent to a primary action-button with border-radius pill override. |
| `<action-button intent="ghost">` | `@quoin/pattern-button-system` | `^1.0.0` | `nav-editorial-mobile-toggle` · search-inline icon button | Ghost intent for utility icons (hamburger, search expand). |
| canonical tokens | `@quoin/tokens-baseline` | `^0.1.0` | every CSS value | Typography / spacing / borders / focus-ring. Heavy-weight variant uses `--border-width-md`. |

---

## What this pattern adds

Seven primitives (no underline indicators — section's nav-landmark + h1-free anatomy makes this distinct from other nav patterns):

- **`<nav-editorial-section>`** — top-level `<header role="banner">`. 3 registers × 2 weights × 3 states.
- **`<nav-editorial-masthead>`** — wordmark row. `<a>` (not `<h1>` — editorial pages reserve `<h1>` for the article headline). Optional edition date.
- **`<nav-editorial-categories>`** — `<ul>` of section links inside `<nav aria-label="Sections">`. Active category gets 3px underline + bold weight + `aria-current="page"`.
- **`<nav-editorial-utility>`** — top utility row. 2 registers (standard / extended). `role="group"`.
- **`<nav-editorial-search-inline>`** — `<form role="search">`. Initially collapsed to icon-only; expands inline on click. Distinct from Cmd+K palette convention.
- **`<nav-editorial-subscribe-cta>`** — subscribe pill. 2 registers (pill / outline). Composes button-system primary intent.
- **`<nav-editorial-mobile-toggle>`** — hamburger button for mobile drawer. `aria-expanded` + state-paired `aria-label`.

## Reference lineage

| Aspect | Source |
|---|---|
| 3-row stacked masthead layout | NYT, The Guardian, FT, Atlantic, New Yorker |
| Edition date in masthead | Newspaper tradition (Vol. XII · No. 247 / Saturday, December 14) |
| Centered wordmark | Traditional newspaper conventions |
| Categories as strong horizontal rule | NYT section nav, Guardian top section bar |
| Subscribe pill with --accent fill | Substack, Atlantic, NYT digital subscribe |
| Inline expandable search (NOT Cmd+K palette) | Editorial convention; readers expect visible search field, not keyboard shortcut |
| `<a>` masthead instead of `<h1>` | WAI-ARIA Authoring Practices — article pages reserve h1 for headlines |
| `<nav aria-label="Sections">` for categories | WAI-ARIA 1.3 |

## Tokens consumed

Canonical only:

- **Colour**: `--surface`, `--surface-elevated`, `--surface-recessed`, `--text`, `--text-emphasis`, `--text-recede`, `--accent`, `--accent-hover`, `--accent-recede`, `--text-on-accent`, `--border`, `--border-emphasis`, `--focus-ring`
- **Dimension**: `--space-1 / 2 / 3 / 4 / card / panel / section`, `--radius-sm / pill`, `--border-width-sm / md`, `--focus-ring-width / offset`
- **Type**: `--font-sans`, `--font-display`, `--font-mono`, `--type-size-xs / sm / md / lg / xl / 2xl / 3xl`, `--font-weight-medium / semibold / bold`, `--tracking-tight / wide`
- **Motion**: `--motion-fast / normal`, `--ease-standard`, `--transition-default`. Search expand-width transition collapses under reduced-motion.

## Registers × weights

### Registers

| Register | Use |
|---|---|
| `stacked` | The canonical newspaper layout — utility row + masthead + categories. The 80% choice. |
| `single-row` | Compressed — everything in one line. Narrow viewports or condensed publications. |
| `centered-masthead` | Wordmark centered, categories distributed left+right around it. Legacy newspaper conventions. |

### Weights

| Weight | Use |
|---|---|
| `standard` | `--border-width-sm` dividers, `--type-size-2xl` masthead |
| `heavy` | `--border-width-md` dividers, `--type-size-3xl` masthead. Strong editorial gravitas |

## Templates that consume this pattern

- `template-blog-magazine` — primary template for editorial publications
- `template-marketing` /journal subpath — for product journals / company blogs in editorial style
- `template-docs-pro` — NOT this pattern; uses `pattern-nav-docs` instead

## Use

```html
<header data-pattern="nav-editorial-section" register="stacked" weight="standard" role="banner">

  <nav-editorial-utility role="group" aria-label="Utility actions">
    <span class="edition-date">Saturday, December 14, 2026 · Issue 247</span>
    <div class="spacer"></div>
    <a href="/saved">Saved articles (12)</a>
    <nav-editorial-search-inline role="search" aria-label="Search articles">
      <button type="button" aria-label="Expand search" aria-expanded="false" aria-controls="search-input">
        <icon name="search" aria-hidden="true" />
      </button>
      <label for="search-input" class="sr-only">Search articles</label>
      <input id="search-input" type="search" name="q" placeholder="Search articles…">
    </nav-editorial-search-inline>
    <a href="/account">Sign in</a>
    <nav-editorial-subscribe-cta href="/subscribe">Subscribe</nav-editorial-subscribe-cta>
  </nav-editorial-utility>

  <nav-editorial-masthead align="center">
    <a class="wordmark" href="/" aria-label="The Broadsheet home">The Broadsheet</a>
    <p class="edition-date">A weekly review of design, typography, and the application web</p>
  </nav-editorial-masthead>

  <nav aria-label="Sections">
    <nav-editorial-categories spacing="default" uppercase="true">
      <li><a href="/news" aria-current="page">News</a></li>
      <li><a href="/design">Design</a></li>
      <li><a href="/typography">Typography</a></li>
      <li><a href="/opinion">Opinion</a></li>
      <li><a href="/longreads">Long reads</a></li>
    </nav-editorial-categories>
  </nav>

</header>
```

## Specimen

Open `examples/index.html` in a browser. Includes:

- **Stacked canonical** — "The Broadsheet" with 7-category sections, edition date masthead, working search-expand button, full utility row
- **Heavy weight** — "The Quoin Review" with type-size-3xl masthead and thicker dividers
- **Single-row** — "Galley Reader" compressed layout
- **Extended utility** — extended utility row with edition + weather + saved + comments
- **Both subscribe-pill registers** (pill / outline) side-by-side
- **Composition lineage table**
- **13-item accessibility checklist** covering banner landmark, sections nav, utility cluster role=group, aria-current="page" + 3px underline, masthead-is-not-a-heading rationale, edition-date plain-text, search landmark, expand toggle ARIA, mobile toggle, masthead destination labelling, focus styles, reduced-motion, subscribe-pill copy discipline

## License

MIT.
