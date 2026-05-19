# @quoin/pattern-footer-mega

**P0 marketing-footer pattern.** Four variants × multi-column link grid × optional newsletter × multi-register legal row. The universal marketing-page footer — every marketing site ends in some variant of this.

This pattern composes from sibling pattern packs: `@quoin/pattern-form-fields` for the newsletter email input, `@quoin/pattern-button-system` for the newsletter submit and optional locale-picker.

---

## Composition lineage — what this pattern consumes

| Consumed primitive | Source pack | Version pin | Used in | How this pattern uses it |
|---|---|---|---|---|
| `<form-control type="email">` | `@quoin/pattern-form-fields` | `^1.0.0` | `footer-newsletter` | Email input with validation. Inherits 33 tokens + 8 microstates + 4 field-level states (default / invalid / loading / disabled). `aria-invalid` and the leading/trailing slot system are handled in form-fields; this pattern just sets a `data-state` on the parent form. |
| `<action-button intent="primary">` | `@quoin/pattern-button-system` | `^1.0.0` | `footer-newsletter` submit | Submit button. The `[aria-busy]` microstate during submission is delegated entirely to action-button; this pattern only sets the state at the form level. |
| `<action-button intent="ghost">` | `@quoin/pattern-button-system` | `^1.0.0` | `footer-brand-block` locale-picker (optional) | Ghost-intent button that opens a locale popover. The popover content is host-provided in v1 (popover primitive arrives in P1 — Forme). |
| canonical tokens | `@quoin/tokens-baseline` | `^0.1.0` | every CSS value | Surfaces / typography / borders / motion / shadows. Footer aesthetic flips with aesthetic-pack swaps; structure is invariant across themes. |

---

## What this pattern adds

Five primitives unique to this pack:

- **`<footer-section>`** — top-level scope. Polymorphic `<footer role="contentinfo">`. 4 variants (minimal / compact / default / mega), 4 pattern states (default / newsletter-submitting / newsletter-success / newsletter-error).
- **`<footer-link-group>`** — single column header + nested `<ul>`. The atomic unit of the link grid; 3-7 links per column is the canonical range.
- **`<footer-brand-block>`** — logo / wordmark + tagline + social row + optional locale picker.
- **`<footer-newsletter>`** — inline newsletter form. Composes form-fields + button-system. Two registers (stacked / inline). Four states (default / submitting / success / error).
- **`<footer-legal-row>`** — copyright + legal links + optional locale + optional back-to-top. Three registers (compact / default / extended).

## Reference lineage

| Aspect | Source |
|---|---|
| 4-column link grid + brand | Stripe, Linear, Vercel, Notion marketing footers |
| Mega footer with newsletter | Tailwind UI mega footer blocks, Stripe homepage, Mailchimp |
| Minimal auth-page footer | Linear auth, Vercel signup, GitHub auth pages |
| Inline newsletter + helper text | Substack, Hey.com, The Verge subscription forms |
| Legal row at the bottom strip | Universal pattern — every major SaaS site |
| Social icon row in brand block | Stripe, Linear, GitHub homepage |
| `aria-label="Footer navigation"` on link grid `<nav>` | WAI-ARIA Authoring Practices for landmark labelling |
| `aria-current="page"` for current-page links | WCAG 4.1.2 (Name, Role, Value) |

## Tokens consumed

Canonical only (no hardcoded values):

- **Colour**: `--surface-recessed` (footer ground), `--surface-elevated` (newsletter card), `--text`, `--text-emphasis` (headings, current-page), `--text-recede` (link default, copyright), `--text-disabled`, `--accent`, `--accent-hover`, `--success` (newsletter success), `--critical` (newsletter error), `--border`, `--focus-ring`
- **Dimension**: `--space-1 / 2 / 3 / 4 / card / panel / section`, `--radius-sm / card`, `--border-width-sm`, `--focus-ring-width / offset`
- **Type**: `--font-sans` (all body, links, headings, helper), `--font-display` (wordmark only), `--type-size-xs / sm / md / lg / xl`, `--font-weight-medium / semibold`, `--leading-prose`, `--tracking-tight / wide`
- **Motion**: `--motion-fast / normal`, `--ease-standard`, `--transition-default`

## Variants × content matrix

| Variant | Brand block | Link grid | Newsletter | Locale picker | Legal row register | Typical use |
|---|---|---|---|---|---|---|
| `minimal` | wordmark only | — | — | — | compact (2 links) | auth, checkout, in-app modals |
| `compact` | full (logo + tagline + social) | 2 columns | — | optional | default (4 links) | blog posts, signup flows, secondary marketing |
| `default` | full | 4 columns | optional | optional | default (4-5 links) | most marketing pages, docs landings, product pages |
| `mega` | full | 4-6 columns | recommended | recommended | extended (5-6 links + back-to-top) | flagship home, /pricing, high-conversion landings |

## States × microstates

### Pattern states (apply to `<footer-section>`)

| State | DOM signal | When to use |
|---|---|---|
| `default` | (no modifier) | Idle footer; newsletter form ready to submit. |
| `newsletter-submitting` | `[data-state="newsletter-submitting"]` + `[aria-busy=true]` on the form | Form just submitted; awaiting server response. |
| `newsletter-success` | `[data-state="newsletter-success"]` | Subscription accepted. Form contents replaced with success message; `aria-live="polite"` announces. |
| `newsletter-error` | `[data-state="newsletter-error"]` | Submission failed. Form's email input enters `[aria-invalid=true]`; `aria-live="assertive"` announces. |

### Microstates (apply to links and buttons)

| Microstate | DOM signal | ARIA | Notes |
|---|---|---|---|
| `default` | (no modifier) | — | — |
| `hover` | `:hover` | — | `--accent-hover` colour shift on links. |
| `active` | `:active` | — | Pressed state on buttons. |
| `focus` | `:focus` | — | JS-managed focus only. |
| `focus-visible` | `:focus-visible` | — | Outline via `--focus-ring` tokens; keyboard nav only. |
| `disabled` | `[aria-disabled=true]` | `aria-disabled="true"` | 40% opacity; pointer-events: none. |
| `loading` | `[aria-busy=true]` | `aria-busy="true"` | Inherited from action-button on the submit button. |
| `visited` | `:visited` | — | Footer-specific: links that user has visited get a muted treatment. |

Footer-specific microstate beyond the canonical 8: `aria-current="page"` — visible underline + `--text-emphasis` colour on links pointing to the current page.

## Templates that consume this pattern

- `template-marketing` — uses `variant=default` or `variant=mega` depending on host
- `template-saas-pro` — uses `variant=mega` with newsletter on the marketing home, `variant=default` on interior pages
- `template-docs-pro` — uses `variant=default` on docs landings, `variant=compact` inside docs articles
- `template-app-tracker`, `template-app-creator-studio` — use `variant=minimal` inside the app shell
- `template-portfolio-developer`, `template-portfolio-designer` — use `variant=compact`
- `template-blog-magazine` — uses `variant=mega` with newsletter

## Use

```html
<footer-section variant="default" role="contentinfo" aria-label="Site footer">
  <div class="footer-top">
    <footer-brand-block>
      <a class="wordmark" href="/" aria-label="Galley home">GALLEY</a>
      <p class="tagline">Five tools that compose. One subscription. One sign-in.</p>
      <ul class="social" aria-label="Social media">
        <li><a href="https://github.com/galley" aria-label="GALLEY on GitHub">
          <icon name="social-github" />
        </a></li>
        <!-- … -->
      </ul>
    </footer-brand-block>

    <nav aria-label="Footer navigation">
      <footer-link-group>
        <h3>Tools</h3>
        <ul>
          <li><a href="/pdf">PDF Studio</a></li>
          <!-- … -->
        </ul>
      </footer-link-group>
      <!-- 3 more link groups -->
    </nav>
  </div>

  <footer-legal-row register="default">
    <p class="copyright">© 2026 Galley. All rights reserved.</p>
    <ul class="legal-links" aria-label="Legal">
      <li><a href="/privacy">Privacy</a></li>
      <li><a href="/terms">Terms</a></li>
      <li><a href="/cookies">Cookies</a></li>
      <li><a href="/accessibility">Accessibility</a></li>
    </ul>
  </footer-legal-row>
</footer-section>
```

With newsletter (mega variant):

```html
<footer-section variant="mega" newsletter="true">
  <!-- brand + 4 link-groups + newsletter -->
  <footer-newsletter register="stacked" method="POST" action="/subscribe">
    <label for="newsletter-email">The Galley Dispatch</label>
    <form-control type="email" id="newsletter-email" name="email" required />
    <action-button intent="primary" size="md" type="submit">Subscribe</action-button>
    <p class="helper">One email a week. Unsubscribe anytime.</p>
  </footer-newsletter>
  <!-- legal row -->
</footer-section>
```

## Specimen

Open `examples/index.html` in a browser to render every variant + state. The specimen includes:

- **All 4 variants** (minimal / compact / default / mega) with full GALLEY-themed content (5 tools, 4 link columns, full social row, locale-able)
- **4 newsletter states** side-by-side (default / submitting / success / error) showing exactly how the form delegates to form-fields and button-system
- **Link microstate matrix** including the footer-specific states (`visited`, `aria-current="page"`, external-link with arrow)
- **Composition lineage table** documenting which DOM elements come from which sibling pack
- **Full accessibility checklist** covering landmarks, nav labelling, live regions, focus management

## License

MIT.
