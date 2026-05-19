# @quoin/pattern-form-fields

**P0 foundational form pattern.** Nine widget types × eight microstates per widget + form-row + form-section composition + form-level state machine. The most-consumed pattern in the catalog — every template with a form depends on this.

## What it is

- `<form-control>` — polymorphic field primitive (label + widget + help + error wrapping).
  - 15 widget types via `type` attribute: `text` / `email` / `password` / `search` / `number` / `url` / `tel` (single-line inputs), `textarea` (multi-line), `select` (native dropdown), `combobox` (typeahead per WAI-ARIA 1.3), `checkbox`, `radio`, `switch` (role=switch checkbox), `file` (custom wrapper over native input), `date`.
  - 3 sizes: `sm` (32 min-height, chrome contexts), `md` (40 — default + 44×44 hit target with adjacent label space), `lg` (48).
  - 8 microstates: `default`, `hover`, `active`, `focus`, `focus-visible`, `disabled`, `loading`, `read-only`.
  - 4 field-level states: `default`, `validating`, `error`, `success`.
  - Leading + trailing slot system: `icon` (decorative SVG inside padding zone), `addon` (static text prefix/suffix like `https://` or `.com`), `clear` (X button when input has value), `reveal` (eye-icon for password fields).
- `<form-row>` — horizontal composition primitive.
  - 2 registers: `grid` (fr-based columns for fixed-label + multi-column layouts), `inline` (flex-row for compact prompt + input + button).
  - Columns: `1` / `2` / `3` / `auto` (auto uses `minmax(min(280px, 100%), 1fr)`).
  - Responsive: collapses to single column below 640px.
- `<form-section>` — top-level form wrapper.
  - 6 form-level states: `default`, `validating`, `error`, `success`, `loading`, `submitting`.
  - Renders as semantic `<form>` element (real POST without JS).
  - Manages form-level ARIA contract: `aria-labelledby` on the form, error summary with anchor links per WCAG 2.4.6, `aria-busy` during submission.

## Reference lineage

| Aspect | Source |
|---|---|
| Polymorphic field primitive | Mantine's TextInput / Textarea / Select unified API; shadcn Form |
| Combobox WAI-ARIA 1.3 pattern | W3C WAI-ARIA Authoring Practices 1.3 combobox |
| Switch as `role="switch"` on checkbox | WAI-ARIA 1.3 + Adrian Roselli "Inclusively Hidden" |
| Custom-styled file wrapper over native input | shadcn/ui dropzone, Vercel Web Interface Guidelines |
| Error summary with anchor links at top of form | WCAG 2.4.6 + 3.3.1 + 3.3.3 + GOV.UK Design System error summary |
| Indeterminate checkbox + `aria-checked="mixed"` | W3C ARIA in HTML, A11y Project select-all-list pattern |
| Tabular numerics on all inputs | Type-driven typography — Practical Typography |
| Form-level state transitions via `aria-busy` + `aria-live` | Vercel Web Interface Guidelines |

## Tokens consumed

Canonical only (no hardcoded values):

- **Colour**: `--surface-elevated`, `--surface-recessed`, `--text`, `--text-emphasis`, `--text-recede`, `--text-disabled`, `--text-on-accent`, `--text-on-critical`, `--accent`, `--accent-hover`, `--accent-recede`, `--critical`, `--critical-soft`, `--success`, `--success-soft`, `--border`, `--border-emphasis`, `--border-recede`, `--focus-ring`, `--shadow-tint`
- **Dimension**: `--space-1 / 2 / 3 / 4 / 5 / 6 / 8 / card / panel`, `--radius-sm / md / card / pill`, `--border-width-sm / md`, `--focus-ring-width / offset`
- **Type**: `--font-sans` (labels + values), `--font-mono` (addons + reveal-button labels + spinners), `--type-size-xs / sm / md`, `--font-weight-regular / medium / semibold`, `--leading-tight / prose`, `--tracking-tight / normal / wide`
- **Motion**: `--motion-fast / normal / slow`, `--ease-standard`, `--transition-default`
- **Shadow**: `--shadow-tint`, `--shadow-sm`, `--shadow-focus` (composite focus ring recipe)

## Vocabulary primitives consumed

This pattern depends on `vocab-forms@^0.1.0`:

- `form-field` — the wrapping container; this pattern's `form-control` is the production composition of vocab's `form-field`
- `field-label` — wired-label primitive
- `field-help` — help-text primitive
- `field-error` — error-message primitive with role=alert
- `checkbox-cell` / `radio-cell` / `select-cell` / `textarea-cell` — widget primitives
- `fieldset-group` — radio-group fieldset wrapper
- `submit-row` — form-level submit button row

This pattern adds the polymorphic `type` dispatch + sizing variants + leading/trailing slot system + state machine on top of those vocab primitives.

## States & microstates

| Microstate | DOM signal | ARIA |
|---|---|---|
| `default` | (no modifier) | — |
| `hover` | `:hover` — border-color shifts to `--border-emphasis` | — |
| `active` | `:active` | — |
| `focus` | `:focus` — border-color: `--focus-ring` | — |
| `focus-visible` | `:focus-visible` — `--shadow-focus` ring | — |
| `disabled` | `[disabled]` — opacity 0.5, pointer-events: none, native `disabled` | — |
| `loading` | `[aria-busy=true]` — spinner overlay | `aria-busy="true"`, `aria-live="polite"` |
| `read-only` | `[readonly]` — value visible, not editable, `--surface-recessed` bg | — |

| Field state | Description |
|---|---|
| `default` | No visible validation; resting interactive. |
| `validating` | Async validation in progress; spinner trailing icon; `aria-busy="true"`. |
| `error` | `border-color: --critical`; error message visible; `aria-invalid="true"`; `aria-describedby` points to error. |
| `success` | `border-color: --success`; optional checkmark; success message linked via `aria-describedby`. |

| Form state | Description |
|---|---|
| `default` | Normal interactive. |
| `validating` | At least one field validating async; submit disabled. |
| `error` | At least one field has error; error summary at top with anchor links; submit enabled for retry. |
| `success` | Post-submission confirmation; controls become read-only; CTA changes to "Continue" or "Submit another". |
| `loading` | Form data fetching (edit-mode populating from server); skeleton placeholders. |
| `submitting` | POST in flight; all controls disabled; submit shows loading; `aria-busy="true"` on form. |

## Templates that consume this pattern

Every template with a form. Specifically:

- `template-saas-pro` — newsletter signup, contact form, pricing-page CTA form
- `template-marketing` — newsletter signup, contact form
- `template-pricing` — seat-count + plan + payment form
- `template-app-tracker` — issue-create modal, settings form, auth forms
- `template-dashboard-app` — settings panels, integration forms, profile editing
- `template-docs-pro` — search input, feedback form
- `template-portfolio-designer` — contact form
- `template-longform` — RSS-subscribe input, comment form

## Use

```html
<form-section state="default" aria-labelledby="reserve-heading">
  <header>
    <h3 id="reserve-heading">Reserve your subdomain</h3>
  </header>

  <form-row register="grid" columns="auto">
    <form-control type="email" size="md" state="default" required>
      <label>Work email</label>
      <small class="help">We'll send setup instructions here.</small>
    </form-control>
    <form-control type="text" size="md" state="success">
      <label>Subdomain</label>
      <span class="addon-trailing">.harrow.haus</span>
    </form-control>
  </form-row>

  <fieldset class="form-radio-group">
    <legend>Primary use case</legend>
    <form-control type="radio" name="usecase" value="marketing" checked>
      <label>Marketing site</label>
    </form-control>
    <!-- … -->
  </fieldset>

  <form-control type="switch" checked>
    <label>Auto-respect prefers-color-scheme</label>
  </form-control>

  <footer class="submit-row">
    <button class="cancel-button">Cancel</button>
    <button class="submit-button" type="submit">Reserve subdomain</button>
  </footer>
</form-section>
```

## Specimen

Open `examples/index.html` to render every widget × every microstate × every state at full quality bar. The specimen includes:

- 7 text-input subtypes (text, email, password, search, number, url with addon, plus tel)
- Textarea, select, combobox (with live listbox + aria-activedescendant), file (custom wrapper), date
- Checkbox (default, checked, indeterminate, disabled)
- Radio group inside fieldset/legend
- Switch (default + on + disabled)
- 8-cell microstate matrix on text input
- Field-level states: validating, error (with role=alert), success
- form-row register variants: grid (2-col, 3-col), inline (newsletter signup)
- Worked example: full form-section in default state
- form-section state: error — with error summary + anchor links to failed fields
- form-section state: submitting — controls disabled, spinner indicator, aria-busy
- form-section state: success — read-only controls + success banner + Continue CTA
- Accessibility checklist (15 line items covering label wiring / ARIA / hit targets / focus rings / reduced-motion)
- Typography precision section

## License

MIT.
