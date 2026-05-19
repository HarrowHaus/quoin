# @quoin/pattern-nav-marketing

**P0 marketing-nav pattern.** The top of every marketing page — brand, primary navigation with dropdowns and mega panels, CTA cluster, optional announcement bar, mobile drawer overlay. Nine primitives covering the full surface from minimal compact nav to flagship multi-column mega.

---

## Composition lineage — what this pattern consumes

| Consumed primitive | Source pack | Version pin | Used in | How this pattern uses it |
|---|---|---|---|---|
| `<action-button intent="primary">` | `@quoin/pattern-button-system` | `^1.0.0` | nav-cta-cluster (every primary CTA) | Rightmost CTA in every variant. Inherits all 4 sizes + 8 microstates verbatim. |
| `<action-button intent="ghost">` | `@quoin/pattern-button-system` | `^1.0.0` | nav-cta-cluster Log-in · nav-mobile-toggle | Ghost-intent for the de-escalated 'Log in' link and the icon-only mobile hamburger button. |
| `<action-button intent="secondary">` | `@quoin/pattern-button-system` | `^1.0.0` | nav-cta-cluster (dual-cta / extended registers) | Mid-intent CTA for pricing-link / talk-to-sales when alongside a primary CTA. |
| canonical tokens | `@quoin/tokens-baseline` | `^0.1.0` | every CSS value | Surfaces / typography / borders / motion / shadows / focus-ring. Aesthetic flips with aesthetic-pack swaps; structure invariant. |

In P1, the `nav-dropdown-panel`'s `register="mega"` variant will also be able to host `<feature-cell>` instances from `@quoin/pattern-feature-grid` — surfacing visual feature highlights inside the mega panel. The contract is open today; P1 adds the composition recipe.

---

## What this pattern adds

Nine primitives unique to this pack:

- **`<nav-marketing>`** — top-level `<header role="banner">`. 4 variants (default / sticky / transparent / compact), 4 states (default / scrolled / dropdown-open / mobile-open).
- **`<nav-brand>`** — left-anchored logo/wordmark link.
- **`<nav-primary-list>`** — middle `<ul>` of nav-items.
- **`<nav-item>`** — single nav anchor or dropdown trigger. 3 variants (link / dropdown / current). All 8 microstates supported plus `aria-current="page"` and `aria-expanded="true"`.
- **`<nav-dropdown-panel>`** — submenu panel. 2 registers (simple / mega). Mega supports 1-4 columns.
- **`<nav-cta-cluster>`** — right-anchored action buttons. 4 registers (link-plus-cta / cta-only / dual-cta / extended).
- **`<nav-mobile-toggle>`** — hamburger button visible at narrow widths only.
- **`<nav-mobile-overlay>`** — full-screen drawer. 2 registers (right-slide / top-sheet).
- **`<nav-announcement-bar>`** — optional banner row. 4 tones (info / promo / warning / critical).

## Reference lineage

| Aspect | Source |
|---|---|
| 5-7 item primary nav with right-side CTA cluster | Stripe, Linear, Vercel, Notion |
| Sticky nav with condensed scrolled-state | Stripe, Linear (since 2022) |
| Transparent over hero | Apple product pages, Vercel marketing home |
| Mega dropdown with featured cells | Tailwind UI navbar blocks, Mailchimp, HubSpot |
| Mobile right-slide drawer with focus trap | Material Design mobile nav, iOS-style drawer |
| Announcement bar above main nav | Stripe, Mailchimp, GitHub (top promo banner) |
| WAI-ARIA dropdown pattern (`aria-haspopup` + `aria-expanded` + `aria-controls`) | WAI-ARIA Authoring Practices 1.3 Menu Button pattern |
| Mobile overlay `role="dialog"` + focus trap | WAI-ARIA Authoring Practices 1.3 Modal Dialog pattern |
| Skip link as first focusable element | WCAG 2.4.1 Bypass Blocks |

## Tokens consumed

Canonical only:

- **Colour**: `--surface` (default ground), `--surface-elevated` (scrolled, dropdown, hover), `--surface-recessed`, `--text`, `--text-emphasis` (brand, current page, expanded), `--text-recede` (descriptions), `--text-disabled`, `--accent` (current-page underline, primary CTA), `--accent-hover`, `--accent-recede` (info announcement), `--warning`, `--critical`, `--border`, `--border-emphasis`, `--focus-ring`, `--text-on-accent`
- **Dimension**: `--space-1 / 2 / 3 / 4 / card / panel / section`, `--radius-sm / card`, `--border-width-sm`, `--focus-ring-width / offset`
- **Type**: `--font-display` (brand wordmark), `--font-sans` (everything else), `--type-size-xs / sm / md / lg / xl`, `--font-weight-medium / semibold`, `--tracking-tight / wide`
- **Motion**: `--motion-fast` (chevron rotate), `--motion-normal` (overlay slide), `--ease-standard`, `--transition-default`
- **Shadow**: `--shadow-sm` (default nav border-shadow), `--shadow-md` (scrolled state, dropdown panel, mobile overlay)

## Variants × content matrix

| Variant | Background | Scroll behaviour | Typical use |
|---|---|---|---|
| `default` | `--surface` solid | None | Docs landings, blog, secondary marketing |
| `sticky` | `--surface` → `--surface-elevated` on scroll | Condenses + elevates at scrollY > 80 | Most marketing pages |
| `transparent` | `transparent` → `--surface-elevated` on scroll | Promotes to sticky+scrolled at threshold | Hero-led flagship marketing |
| `compact` | `--surface` solid; tighter padding | None | Sub-pages, in-app marketing surfaces |

## States × microstates

### Pattern states

| State | DOM signal | Meaning |
|---|---|---|
| `default` | (no modifier) | Resting state. |
| `scrolled` | `[data-state="scrolled"]` | Sticky/transparent variant after scrollY > 80. Host JS toggles. |
| `dropdown-open` | `[data-state="dropdown-open"]` | Any nav-dropdown-panel is expanded. |
| `mobile-open` | `[data-state="mobile-open"]` | nav-mobile-overlay is open + body scroll locked. |

### Microstates (apply to nav-item)

| Microstate | DOM signal | ARIA |
|---|---|---|
| `default` | (no modifier) | — |
| `hover` | `:hover` | — |
| `active` | `:active` | — |
| `focus` | `:focus` | — |
| `focus-visible` | `:focus-visible` | — |
| `disabled` | `[aria-disabled=true]` | `aria-disabled="true"` |
| `loading` | `[aria-busy=true]` | `aria-busy="true"` |
| `current` | `[aria-current="page"]` | `aria-current="page"` |

Plus nav-specific: `aria-expanded="true"` on dropdown triggers (rotates chevron 180°).

## Templates that consume this pattern

- `template-marketing` — uses `variant=sticky` with `link-plus-cta` cluster
- `template-saas-pro` — uses `variant=transparent` on home, `variant=sticky` on interior; mega dropdown for Product
- `template-docs-pro` — uses `variant=default` with `cta-only` cluster
- `template-app-tracker`, `template-app-creator-studio` — DO NOT use this pattern; they use `pattern-nav-app-chrome` instead
- `template-portfolio-developer`, `template-portfolio-designer` — use `variant=compact` with `cta-only` cluster
- `template-blog-magazine` — uses `variant=sticky` with optional announcement bar

## Use

```html
<header data-pattern="nav-marketing" variant="sticky" role="banner">
  <!-- optional announcement -->
  <nav-announcement-bar tone="promo" role="region" aria-label="Announcement">
    Launch week — 20% off Pro. <a href="/pricing?promo=launch">View pricing →</a>
  </nav-announcement-bar>

  <nav aria-label="Primary">
    <nav-brand href="/" aria-label="Galley home">GALLEY</nav-brand>

    <nav-primary-list>
      <li>
        <nav-item variant="dropdown" aria-expanded="false" aria-controls="dropdown-product" aria-haspopup="true">
          Product
          <icon name="chevron-down" class="chevron" />
        </nav-item>
        <nav-dropdown-panel id="dropdown-product" register="mega" columns="3">
          <!-- columns of links -->
        </nav-dropdown-panel>
      </li>
      <li><nav-item variant="link" href="/pricing">Pricing</nav-item></li>
      <li><nav-item variant="link" href="/docs">Docs</nav-item></li>
      <li><nav-item variant="link" href="/blog" aria-current="page">Blog</nav-item></li>
    </nav-primary-list>

    <nav-cta-cluster register="link-plus-cta" role="group" aria-label="Account actions">
      <action-button intent="ghost" as="a" href="/login">Log in</action-button>
      <action-button intent="primary" as="a" href="/signup">Sign up free</action-button>
    </nav-cta-cluster>

    <nav-mobile-toggle aria-expanded="false" aria-controls="nav-overlay" aria-label="Open menu">
      <icon name="menu" />
    </nav-mobile-toggle>
  </nav>

  <nav-mobile-overlay id="nav-overlay" role="dialog" aria-modal="true" aria-label="Site navigation">
    <!-- mirrors primary list + CTA cluster vertically -->
  </nav-mobile-overlay>
</header>
```

## Specimen

Open `examples/index.html` in a browser to render every variant + every state. The specimen includes:

- **All 4 variants** (default / sticky-scrolled / transparent-over-hero / compact)
- **Announcement bar — 4 tones** (info / promo / warning / critical) with dismissible state
- **Dropdown panels** in both simple (vertical link list) and mega (3-column with category headings) registers
- **CTA cluster — all 4 registers** (link-plus-cta / cta-only / dual-cta / extended)
- **Mobile overlay** in both closed and open states (right-slide register)
- **nav-item microstate matrix** including the nav-specific `aria-current` and `aria-expanded` states
- **Composition lineage table** showing exactly which sibling primitives are consumed where
- **Accessibility checklist** covering landmarks, ARIA patterns, focus management, skip links

## License

MIT.
