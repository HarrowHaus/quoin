# @quoin/pattern-form-validation

**P0 form-validation pattern.** Error-summary panel + field-level validation messages + status icons + form-state orchestrator. Implements WCAG 2.4.6 (Headings and Labels), 3.3.1 (Error Identification), 3.3.2 (Labels or Instructions), and 3.3.3 (Error Suggestion). Seven pattern states from `pristine` (untouched) through `validating` (async check in flight) to `submitted` / `submit-failed`. Four validate-on policies.

This pattern is **the validation layer on top of `@quoin/pattern-form-fields`**. It does not ship new field types — those come from form-fields. It ships the orchestration (when to validate), the messaging (how to communicate errors), and the focus management (where to send the user when validation fails).

---

## Composition lineage — what this pattern consumes

| Consumed primitive | Source pack | Version pin | Used in | How this pattern uses it |
|---|---|---|---|---|
| `<form-control>` (all 15 types) | `@quoin/pattern-form-fields` | `^1.0.0` | Every form field | `aria-invalid`, `aria-required`, `aria-describedby` all live on the form-control. This pattern only manages the orchestration + message rendering. The form-control's existing 4 field-level states (default / invalid / loading / disabled) handle the visual register. |
| `<form-section>` + `<form-row>` | `@quoin/pattern-form-fields` | `^1.0.0` | Form scaffold | `form-section` provides the error-summary slot. `form-row` arranges fields. This pattern slots into form-section's existing `error-summary` placement. |
| `<action-button intent="primary">` | `@quoin/pattern-button-system` | `^1.0.0` | Submit button (every form) | Inherits all 8 microstates. `aria-busy="true"` while form is validating or submitting; `aria-disabled="true"` when async validation should block re-submit. |
| `<action-button intent="secondary">` + `intent="ghost"` | `@quoin/pattern-button-system` | `^1.0.0` | Resend / Retry / Cancel actions in success and submit-failed states | De-escalated CTAs alongside the primary action. |
| canonical tokens | `@quoin/tokens-baseline` | `^0.1.0` | every CSS value | `--critical`, `--critical-recede`, `--warning`, `--warning-recede`, `--success`, `--success-recede`, `--accent-recede` drive the four summary tones. Structure is invariant across themes. |

---

## What this pattern adds

Four primitives unique to this pack:

- **`<validation-summary>`** — `<section role="alert" aria-labelledby="..." tabindex="-1">` panel at the top of an invalid form. Lists each field-level error as an anchor link to its field. 4 tones (error / warning / info / success). Receives programmatic focus on submit-failed.
- **`<validation-message>`** — `<p>` below a form-control. 4 variants (error / help / success / warning). Connected to its field via `aria-describedby`. Error variant gets `role="alert"` on post-submit appearance.
- **`<validation-status-icon>`** — Inline SVG status indicator (✕ / ✓ / ⚠ / spinner). Always `aria-hidden="true"` — visual reinforcement only. AT receives status via the field's `aria-invalid` + `aria-describedby`.
- **`<validation-orchestrator>`** — Invisible wrapper (`<form novalidate>`) that coordinates form-level state across child form-controls. Tracks pristine/touched/validating/valid/invalid/submitted/submit-failed. JS implementation is host-provided in v1 (a reference JS implementation arrives in a P1 utility pack).

## Reference lineage

| Aspect | Source |
|---|---|
| Error summary at top of form with anchor links | UK GOV.UK Design System, WAI-ARIA Authoring Practices |
| `role="alert"` + `tabindex="-1"` for programmatic focus | WAI-ARIA Authoring Practices 1.3 |
| Constructive error messages ("Enter your email" not "Email required") | Nielsen Norman writing guidelines, UK GOV.UK error message style |
| Password strength meter with `role="progressbar"` | NIST 800-63B guidelines, common practice from 1Password / Bitwarden / Apple |
| Async validation with spinner + aria-live | Linear signup, Stripe form patterns |
| `submit-then-blur` validate policy | WAI-ARIA APG + Nielsen Norman recommendation |
| `novalidate` on form for consistent cross-browser behaviour | HTML spec; required for owning all validation messaging |

## Tokens consumed

Canonical only:

- **Colour**: `--critical`, `--critical-recede` (error tone), `--warning`, `--warning-recede`, `--success`, `--success-recede`, `--accent`, `--accent-recede` (info tone), `--text`, `--text-emphasis`, `--text-recede`, `--surface`, `--surface-elevated`, `--border`, `--focus-ring`, `--text-on-accent`
- **Dimension**: `--space-1 / 2 / 3 / 4 / card`, `--radius-sm / card / pill`, `--border-width-sm / md`, `--focus-ring-width / offset`
- **Type**: `--font-sans`, `--font-display` (summary heading), `--type-size-xs / sm / md / xl`, `--font-weight-regular / medium / semibold`, `--leading-prose`, `--tracking-tight / wide`
- **Motion**: `--motion-fast / normal`, `--ease-standard`, `--transition-default`. Spinner + strength-bar fill animations collapse under `prefers-reduced-motion: reduce`.

## States × microstates

### Pattern states (apply to `<validation-orchestrator>` / `<form>`)

| State | DOM signal | Meaning |
|---|---|---|
| `default` (pristine) | `[data-state="default"]` | Form never interacted with. No validation messages. Submit enabled. "default" is the canonical state name per catalog convention; "pristine" is the descriptive term used in prose. |
| `touched` | `[data-state="touched"]` | User focused-and-blurred at least one field. Live validation may be running per validate-on policy. |
| `validating` | `[data-state="validating"]` | Async validation in flight. Affected fields show validating status icon. Submit is `aria-busy`. |
| `valid` | `[data-state="valid"]` | All fields pass. Submit enabled. |
| `invalid` | `[data-state="invalid"]` | One or more fields fail. Messages visible on touched-and-failed fields. |
| `submitted` | `[data-state="submitted"]` | Submission succeeded. Form replaced with success summary in tone="success". |
| `submit-failed` | `[data-state="submit-failed"]` | Server rejected the submission. Summary in tone="error" with `role="alert"` + programmatic focus. |

### Validate-on policies

| Policy | Behaviour | Recommended for |
|---|---|---|
| `submit` | Only validate on submit. No live feedback. | Short forms (≤3 fields). |
| `blur` | Validate each field on blur. | Forms where users want per-field feedback. |
| `input` | Validate continuously while typing. | Password strength meters (only for the password field specifically). |
| `submit-then-blur` | Don't validate until first submit attempt; after that, validate on blur per field. | **The 80% recommendation.** Per Nielsen Norman + WAI-ARIA APG — gives users a chance to complete the form before being told what's wrong. |

### Microstates (apply to messages and submit buttons)

| Microstate | DOM signal | ARIA |
|---|---|---|
| `default` | (no modifier) | — |
| `hover` | `:hover` | — |
| `active` | `:active` | — |
| `focus` | `:focus` | — |
| `focus-visible` | `:focus-visible` | — |
| `disabled` | `[aria-disabled=true]` | `aria-disabled="true"` |
| `loading` | `[aria-busy=true]` | `aria-busy="true"` |
| `validating` | status icon spinning | `aria-busy="true"` on field |

## Templates that consume this pattern

- `template-saas-pro` — signup, login, password-reset, account settings, billing forms
- `template-app-tracker`, `template-app-creator-studio` — every in-app form (add subscription, edit profile, share dialog)
- `template-marketing` — newsletter signup (composed via footer-mega; validation pattern handles the submit-failed case)
- `template-blog-magazine` — comment forms, contact forms

## Use

```html
<form data-pattern="validation-orchestrator"
      data-state="submit-failed"
      data-validate-on="submit-then-blur"
      novalidate
      aria-labelledby="form-legend">

  <fieldset>
    <legend id="form-legend">Create your Galley account</legend>

    <!-- summary at top of form; programmatically focused on failed submit -->
    <section data-pattern="validation-summary"
             data-tone="error"
             role="alert"
             aria-labelledby="summary-heading"
             tabindex="-1"
             id="form-error-summary">
      <header>
        <icon name="circle-error" />
        <h3 id="summary-heading">There are 3 errors in this form</h3>
      </header>
      <ol>
        <li><a href="#email">Enter your email address</a></li>
        <li><a href="#password">Password must be at least 8 characters</a></li>
        <li><a href="#terms">Agree to the terms to continue</a></li>
      </ol>
    </section>

    <!-- field with error -->
    <form-control type="email"
                  id="email"
                  name="email"
                  required
                  aria-invalid="true"
                  aria-describedby="email-error">
      <icon slot="trailing" name="validation-error" data-pattern="validation-status-icon" data-status="error" />
    </form-control>
    <p data-pattern="validation-message"
       data-variant="error"
       id="email-error"
       role="alert">
      <icon name="circle-error" />
      Enter your email address.
    </p>

    <!-- … more fields … -->

    <action-button intent="primary" type="submit">Create account</action-button>
  </fieldset>
</form>
```

## Specimen

Open `examples/index.html` in a browser. Specimen walks every pattern state through the **Galley signup form** narrative:

- **pristine** — first paint, no validation messages, help text on every field, submit enabled
- **submit-failed (3 errors)** — full validation-summary at top with 3 anchor links, three fields with `aria-invalid="true"` + linked error messages, one field with `data-valid="true"` (Display name passed)
- **validating** — async username availability check (spinning status icon + aria-live "Checking availability…"), password strength meter showing "Excellent" with role="progressbar"
- **submitted** — success-tone summary (`role="status"` not `alert`) announcing account creation with reference to `elenas-galley.harrow.haus`
- **submit-failed (server error)** — server rejected submission; summary doesn't change field-level state because the data is fine

Plus **4 summary tones** side by side (error / warning / info / success), **4 message variants** (help / error / success / warning), **4 status icons** (error / valid / warning / validating with spin), **microstate matrix** for messages + submit button, **composition lineage** table, and a **13-item accessibility checklist** covering ARIA semantics, focus management, error-message phrasing guidelines, role="alert" vs role="status" policy, async validation patterns, and reduced-motion handling.

## License

MIT.
