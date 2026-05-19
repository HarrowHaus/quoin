# @quoin/pattern-pricing-tiers

**P0 pricing pattern.** Four tier variants × three grid arrangements × annual/monthly billing toggle × comparison matrix. Used on every SaaS pricing page, every plan-comparison surface, every "upgrade your plan" flow.

This is the **first pattern in the Quoin catalog that composes from sibling pattern packs.** It consumes `@quoin/pattern-button-system` for CTAs, `@quoin/pattern-form-fields` for the billing toggle, and (optionally) `@quoin/pattern-feature-grid` for the per-tier feature callouts. The composition lineage is documented below as a precedent for future patterns that compose siblings.

---

## Composition lineage — what this pattern consumes

Pricing pages are inherently composite surfaces: every tier card is built from buttons + form controls + feature lists. Rather than re-implementing those primitives, this pattern depends on the established sibling pattern packs and adds only the structure that's actually new (tier card chrome, grid layout, comparison-mode rendering, billing-cadence orchestration).

| Consumed primitive | Source pack | Version pin | Used in | How this pattern uses it |
|---|---|---|---|---|
| `<action-button>` | `@quoin/pattern-button-system` | `^1.0.0` | Every tier CTA | `intent=primary` on the featured tier, `intent=secondary` on starter/default tiers, `intent=link` on enterprise "Talk to sales". All 4 sizes available; tier cards default to `size=md`. All 8 microstates inherited verbatim — checkout-initiated state delegates to `[aria-busy]` on the button. |
| `<button-group>` | `@quoin/pattern-button-system` | `^1.0.0` | `billing-toggle` segmented variant | Used in the "connected" register with `role=radiogroup` semantics. Two buttons (Monthly / Annual) where `aria-checked` flips on selection. Visual treatment inherits from button-system's connected-group recipe. |
| `<form-control type="switch">` | `@quoin/pattern-form-fields` | `^1.0.0` | `billing-toggle` switch variant | Switch type → `<input type="checkbox" role="switch">` per WAI-ARIA 1.3. Toggles annual ↔ monthly with `aria-live="polite"` announcement of the cadence change. All 8 microstates + 4 field-level states (default/invalid/loading/disabled) inherited. |
| `<form-control type="select">` | `@quoin/pattern-form-fields` | `^1.0.0` | Optional: per-tier seat-count selector | Inline `<select>` inside a tier card for "Choose seats" enterprise-tier interactions. Inherits the form-fields leading/trailing slot system; not used in P0 specimen but the contract is open. |
| `<feature-cell>` (optional) | `@quoin/pattern-feature-grid` | `^1.0.0` | "Compare all features" callout, marketing-row above the grid | When the host page wants a per-feature explainer row above or below the pricing grid, drop in a `<feature-grid layout="three-up">` from feature-grid. The two patterns nest cleanly because both consume the same canonical token namespace. |
| canonical tokens | `@quoin/tokens-baseline` | `^0.1.0` | Every CSS value | No hardcoded values anywhere. Surfaces / borders / radii / typography / motion / shadows all read from `--var(…)`. Aesthetic packs override the values; this pattern's structure is invariant across themes. |

**Rule of thumb for future composite patterns:** if you find yourself reaching for a button, form control, feature card, avatar, or any other already-shipped primitive — declare a `peerPacks` entry in `quoin.pack.json` and `peerDependencies` in `package.json`, then document the consumption in this table format in your README. Do not re-implement primitives that a sibling pack already publishes.

---

## What this pattern adds on top

The new primitives unique to this pack:

- `<pricing-tier>` — single tier card.
  - 4 variants: `starter` (free, low-commitment), `default` (paid baseline), `featured` (highlighted "most popular" with accent border + 1px ring + translateY lift at desktop), `enterprise` (custom CTA, no numeric price).
  - 4 pattern states: `default`, `loading`, `selected`, `checkout-initiated`.
  - All 8 microstates supported on the card-level interaction surface and delegated to the inner button.

- `<pricing-grid>` — composition wrapper.
  - 3 layouts: `3-tier` (canonical starter + pro + enterprise), `4-tier` (starter + pro + team + enterprise), `table` (comparison-mode rendering as semantic `<table>` with `<thead>` tiers + `<tbody>` feature rows).
  - 4 grid-level states: `default`, `empty`, `loading`, `comparison-mode`.
  - Hosts the billing toggle in its `<header>` region.

- `<billing-toggle>` — annual/monthly switcher.
  - 2 visual variants: `switch` (WAI-ARIA 1.3 switch role) and `segmented` (button-group radio register).
  - Both variants emit a `change` event and announce the cadence flip via `aria-live="polite"`.
  - Optional `Save 17%` badge appears when `current=annual` (figure is computed, not hardcoded).

## Reference lineage

| Aspect | Source |
|---|---|
| 3-tier canonical layout with elevated middle tier | Stripe pricing, Linear pricing, Notion pricing |
| 4-tier with two paid tiers + enterprise | Vercel pricing, GitHub pricing, Tailwind UI pricing blocks |
| Sticky comparison table with feature categories | Atlassian pricing, Mailchimp pricing, AWS console |
| Monthly/annual toggle UX | Linear, Stripe, Notion (switch); Tailwind UI pricing blocks (segmented) |
| "Most popular" featured-tier elevation pattern | Tailwind UI marketing, Stripe, Linear |
| `text-wrap: balance` on tier names and price unit captions | CSS Text Module Level 4 |
| Tabular numerals (`font-variant-numeric: tabular-nums`) on price block | OpenType TNUM feature for column-aligned figures |
| Comparison-mode → semantic `<table>` (not divs) | WCAG 1.3.1 (Info and Relationships), WAI-ARIA Authoring Practices 1.3 |

## Tokens consumed

Canonical only (no hardcoded values):

- **Surface / colour**: `--surface`, `--surface-elevated`, `--surface-recessed`, `--text`, `--text-emphasis`, `--text-recede`, `--text-disabled`, `--accent`, `--accent-recede`, `--accent-hover`, `--success` (annual-savings badge), `--border`, `--border-emphasis`, `--focus-ring`
- **Dimension**: `--space-1 / 2 / 3 / 4 / 5 / 6 / 8 / card / panel`, `--radius-sm / card`, `--border-width-sm / md`, `--focus-ring-width / offset`
- **Type**: `--font-display` (price), `--font-sans` (tier name, body, features), `--font-mono` (price tabular figures use sans + `tabular-nums` directly), `--type-size-xs / sm / md / lg / 2xl / 3xl`, `--font-weight-medium / semibold`, `--leading-tight / prose`, `--tracking-wide` (tier-name uppercase tracking)
- **Motion**: `--motion-fast / normal`, `--ease-standard`, `--transition-default`
- **Shadow**: `--shadow-sm` (tier card baseline), `--shadow-md` (featured tier elevation + hover lift)

## Variants × layouts compatibility matrix

| Layout | Starter | Default | Featured | Enterprise |
|---|---|---|---|---|
| `3-tier` | ✓ leftmost | — (use featured for middle) | ✓ centred | ✓ rightmost |
| `4-tier` | ✓ leftmost | ✓ second-from-left | ✓ second-from-right (canonical featured slot) | ✓ rightmost |
| `table` | ✓ first column | ✓ middle columns | ✓ highlighted column with accent border-top | ✓ last column |

## States & microstates

### Pattern states (apply to `<pricing-tier>` and `<pricing-grid>`)

| State | DOM signal | When to use |
|---|---|---|
| `default` | (no modifier) | Idle pricing grid; user has not interacted. |
| `loading` | `[aria-busy=true]` + skeleton lines | Pricing data is being fetched (rare on marketing pages; common on in-app upgrade flows). |
| `selected` | `[aria-selected=true]` on a tier | After user chooses a tier in a multi-step checkout. Accent border + 1px ring. |
| `checkout-initiated` | `[aria-busy=true]` on selected tier's button + `[disabled]` on sibling buttons | Tier CTA was clicked; awaiting redirect or modal mount. `aria-live="polite"` announces "Redirecting to checkout…". |
| `comparison-mode` | `<pricing-grid layout="table">` | Full-feature comparison rendered as table. |
| `empty` | grid contains no `<pricing-tier>` children | "Pricing is being finalized — check back soon" message in dashed surface. |

### Microstates (apply to interactive surfaces — CTAs primarily; whole tier card when `interactive=true`)

| Microstate | DOM signal | ARIA | Notes |
|---|---|---|---|
| `default` | (no modifier) | — | — |
| `hover` | `:hover` | — | Subtle shadow lift + accent on CTA. Featured tier's existing elevation does not stack. |
| `active` | `:active` | — | Pressed-button colour shift on CTA. |
| `focus` | `:focus` | — | Used by JS-driven focus management. |
| `focus-visible` | `:focus-visible` | — | Outline via `--focus-ring` tokens. Visible only on keyboard navigation. |
| `disabled` | `[aria-disabled=true]` | `aria-disabled="true"` | 40% opacity. CTA becomes non-interactive. Used during checkout-initiated state on sibling tiers. |
| `loading` | `[aria-busy=true]` | `aria-busy="true"` | Skeleton shimmer on tier card OR loading spinner on CTA (inherits from action-button). |
| `selected` | `[aria-selected=true]` | `aria-selected="true"` | Accent border + 1px ring + featured-style elevation. |

## Templates that consume this pattern

- `template-saas-pro` — pricing page with 3-tier grid + comparison table
- `template-marketing` — pricing block embedded mid-page
- `template-app-tracker` — in-app "Upgrade your plan" surface
- `template-app-creator-studio` — billing settings page tier display
- `template-portfolio-freelance` — "Hire me" rate-card variant (uses 3-tier with hourly / project / retainer)

## Use

```html
<pricing-grid layout="3-tier" billing="monthly" aria-label="Pricing plans">
  <header>
    <h2>Choose your plan</h2>
    <billing-toggle variant="switch" current="monthly" save-label="Save 17%" />
  </header>

  <pricing-tier variant="starter">
    <h3>Starter</h3>
    <div class="price">
      <span class="amount">$0</span>
      <span class="unit">/ mo</span>
    </div>
    <p class="tagline">Solo work. No card required.</p>
    <ul class="features">
      <li>1 project</li>
      <li>Community support</li>
    </ul>
    <footer>
      <action-button intent="secondary" size="md" as="a" href="/signup">Get started</action-button>
    </footer>
  </pricing-tier>

  <pricing-tier variant="featured">
    <header>
      <h3>Pro</h3>
      <span class="badge" aria-label="Most popular plan">MOST POPULAR</span>
    </header>
    <div class="price">
      <span class="amount">$24</span>
      <span class="unit">/ mo</span>
    </div>
    <p class="tagline">For teams that ship every week.</p>
    <ul class="features">
      <li>Unlimited projects</li>
      <li>Priority support</li>
      <li>Audit logs</li>
    </ul>
    <footer>
      <action-button intent="primary" size="md" as="a" href="/signup?plan=pro">Start free trial</action-button>
    </footer>
  </pricing-tier>

  <pricing-tier variant="enterprise">
    <h3>Enterprise</h3>
    <div class="price">
      <span class="amount">Custom</span>
    </div>
    <p class="tagline">SOC 2, SSO, dedicated CSM.</p>
    <ul class="features">
      <li>Everything in Pro</li>
      <li>SAML SSO + SCIM</li>
      <li>Dedicated CSM</li>
    </ul>
    <footer>
      <action-button intent="link" size="md" as="a" href="/contact-sales">Talk to sales →</action-button>
    </footer>
  </pricing-tier>
</pricing-grid>
```

## Specimen

Open `examples/index.html` in a browser to render every variant × every layout × every state. The specimen includes:

- **3-tier monthly grid** with switch-style billing toggle (illustrated with GALLEY 5-tool umbrella product copy: Starter / Pro / Team tiers)
- **4-tier annual grid** with segmented billing toggle (Starter / Pro / Team / Enterprise; featured slot at second-from-right)
- **Full comparison table** rendering — 5 feature categories × 20 features × 4 tiers, with sticky header row and category caption rows
- **Microstate matrix** — every state × every microstate cell for the tier card and CTA
- **Checkout-initiated state** with `aria-live` announcement, demonstrating sibling-CTA disabling during pending checkout
- **Empty + loading states** at the grid level
- **Composition lineage demo** — a labelled diagram showing which DOM elements come from which sibling pack
- **Accessibility checklist** — `aria-labelledby` tier wiring, `role=switch` on billing toggle, semantic `<table>` for comparison mode, focus order, `aria-live` regions

## License

MIT.
