# @quoin/pattern-modal-dialog

**P0 modal-dialog pattern.** Four variants — alert (destructive / important confirmation), form (input collection), panel (rich content / detail view), command (Cmd+K palette). Four sizes (sm / md / lg / full). Manages focus trap, body scroll lock, inert background content, Escape + backdrop dismiss, focus restoration to trigger on close.

This pattern unblocks two compositions referenced elsewhere in the P0 catalog:
- The **Cmd+K palette** referenced by `pattern-nav-app-chrome`'s `app-global-search` trigger.
- The **destructive confirmation flow** referenced by `pattern-data-table`'s `data-table-bulk-actions` and `pattern-form-validation`'s submit-failed server-error case.

---

## Composition lineage — what this pattern consumes

| Consumed primitive | Source pack | Version pin | Used in | How this pattern uses it |
|---|---|---|---|---|
| `<action-button intent="primary">` | `@quoin/pattern-button-system` | `^1.0.0` | `modal-footer` primary action | Submit / Confirm / Save button. Inherits all 8 microstates including `aria-busy` during async submission. |
| `<action-button intent="critical">` | `@quoin/pattern-button-system` | `^1.0.0` | `modal-footer` destructive register | The destructive primary action in delete-confirmation dialogs. Button text names the consequence explicitly ("Remove subscriptions", not "Confirm"). |
| `<action-button intent="ghost">` | `@quoin/pattern-button-system` | `^1.0.0` | `modal-header` close · `modal-footer` Cancel | De-escalated CTAs. Close button is ghost + icon-only. |
| `<form-control>` (all 15 types) | `@quoin/pattern-form-fields` | `^1.0.0` | `modal-body` form-variant content | Every form-variant dialog's body hosts form-controls. The form-control's existing 4 field-level states (default / invalid / loading / disabled) handle the visual register. |
| `<validation-summary>` + `<validation-message>` | `@quoin/pattern-form-validation` | `^1.0.0` | `modal-body` form-variant on submit-failed | When a form-variant dialog's submit fails, validation-summary mounts at the top of the modal-body. Focus moves to it on submit-failed (same focus management contract as standalone forms). |
| canonical tokens | `@quoin/tokens-baseline` | `^0.1.0` | every CSS value | Surfaces / typography / borders / motion / shadows / focus-ring. Backdrop opacity scale, dialog shadow scale, motion timing all read from tokens. |

This pattern's `peerPacks` declaration in `quoin.pack.json` lists button-system + form-fields (the hard deps). The form-validation dependency is **soft** — it's referenced for the submit-failed flow but not required for the alert / panel / command variants. Host pages that use the form variant should peer-pin form-validation as well.

---

## What this pattern adds

Six primitives:

- **`<modal-dialog>`** — `<div role="dialog" aria-modal="true">` (or `role="alertdialog"` for alert variant). 4 variants × 4 sizes × 4 lifecycle states.
- **`<modal-backdrop>`** — semi-opaque overlay. 4 dim levels (none / subtle / default / strong).
- **`<modal-header>`** — top region with title heading + optional close button.
- **`<modal-body>`** — scrollable content region. 3 padding densities.
- **`<modal-footer>`** — action button cluster. 4 alignment modes × 4 registers (primary-only / cancel-plus-primary / destructive / extended).
- **`<dialog-trigger>`** — contract for any button/link that opens a dialog. Carries `aria-haspopup="dialog"` + `aria-controls`.

## Reference lineage

| Aspect | Source |
|---|---|
| `role="dialog"` + `aria-modal="true"` focus trap | WAI-ARIA Authoring Practices 1.3 Modal Dialog pattern |
| `role="alertdialog"` for destructive confirmations | WAI-ARIA 1.3 |
| Inert background via HTML `inert` attribute | HTML Living Standard (2022) |
| Focus restoration to trigger on close | WAI-ARIA APG Modal Dialog example |
| Cancel button tab order leading, visual order trailing | Apple HIG, Material Design, GOV.UK |
| Cmd+K command palette pattern | Linear, Raycast, Vercel, Notion |
| Command palette `aria-activedescendant` pattern | WAI-ARIA Authoring Practices 1.3 Combobox + Listbox |
| `aria-haspopup="dialog"` on trigger | WAI-ARIA 1.3 |

## Tokens consumed

Canonical only:

- **Colour**: `--surface-elevated` (dialog ground), `--surface-recessed` (header/footer alt + skeleton bg), `--text`, `--text-emphasis` (heading, primary content), `--text-recede`, `--text-disabled`, `--accent`, `--accent-recede` (command palette selected option), `--accent-hover`, `--critical` (alert icon, destructive button), `--critical-recede` (alert icon bg), `--border`, `--border-emphasis`, `--focus-ring`, `--text-on-accent`
- **Dimension**: `--space-1 / 2 / 3 / 4 / card / panel / section`, `--radius-sm / card / pill`, `--border-width-sm`, `--focus-ring-width / offset`
- **Type**: `--font-sans`, `--font-display` (heading), `--font-mono` (kbd pills, hint glyphs), `--type-size-xs / sm / md / lg`, `--font-weight-medium / semibold / bold`, `--tracking-tight / wide`
- **Motion**: `--motion-fast / normal`, `--ease-standard`, `--transition-default`. Fade-in/out collapses under `prefers-reduced-motion`.
- **Shadow**: `--shadow-lg` (dialog elevation), `--shadow-md` (focus ring inside dialog)

## Variants × content matrix

| Variant | ARIA role | Backdrop dim | Typical size | Close on Esc / backdrop | Used for |
|---|---|---|---|---|---|
| `alert` | `alertdialog` | strong | sm | usually yes (but may suppress) | Destructive confirmations, critical errors |
| `form` | `dialog` | default | md | yes | Input collection, edit flows, share dialogs |
| `panel` | `dialog` | default | lg | yes | Detail views, image previews, multi-step flows |
| `command` | `dialog` | subtle / none | md | yes | Cmd+K palette |

## Lifecycle states

| State | DOM signal | Meaning |
|---|---|---|
| `default` | `[data-state="default"]` + `[data-open="false"]` | Dialog not visible. Either not in DOM, or in DOM with `[hidden]` + `aria-hidden="true"`. |
| `opening` | `[data-state="opening"]` | Fade-in transition over `--motion-normal`. Body scroll locked. Background `inert`. Focus moving to first focusable. |
| `open` | `[data-state="open"]` | Steady state. Focus trap active. |
| `closing` | `[data-state="closing"]` | Fade-out transition. After transition completes: dialog removed/hidden, body scroll restored, `inert` removed, focus returned to trigger. |

## Templates that consume this pattern

- `template-app-tracker`, `template-app-creator-studio` — every Cmd+K palette + every confirmation modal + every form modal
- `template-saas-pro` — Cmd+K palette + billing confirmations + share dialogs
- `template-portfolio-developer`, `template-portfolio-designer` — image previews (panel variant on case studies)
- `template-marketing` — onboarding modals on signup landing

## Use

### Alert (destructive confirmation)

```html
<div data-pattern="modal-dialog"
     variant="alert"
     size="sm"
     role="alertdialog"
     aria-modal="true"
     aria-labelledby="confirm-title"
     aria-describedby="confirm-body"
     tabindex="-1">
  <modal-header>
    <h2 id="confirm-title">Delete 12 subscriptions?</h2>
    <action-button intent="ghost" aria-label="Close dialog">
      <icon name="close" />
    </action-button>
  </modal-header>
  <modal-body id="confirm-body">
    <p>This will remove the entries from your Galley Dues ledger. The actual provider subscriptions are not cancelled.</p>
  </modal-body>
  <modal-footer register="destructive">
    <action-button intent="ghost">Keep tracking</action-button>
    <action-button intent="critical">Remove subscriptions</action-button>
  </modal-footer>
</div>
```

### Command palette (Cmd+K)

```html
<div data-pattern="modal-dialog"
     variant="command"
     size="md"
     role="dialog"
     aria-modal="true"
     aria-labelledby="cmd-title"
     tabindex="-1">
  <h2 id="cmd-title" class="sr-only">Command palette</h2>
  <input type="text"
         placeholder="Search Galley…"
         autofocus
         aria-controls="cmd-results"
         aria-activedescendant="cmd-option-1">
  <ul id="cmd-results" role="listbox" aria-label="Search results">
    <li role="option" id="cmd-option-1" aria-selected="true" tabindex="-1">…</li>
    <li role="option" tabindex="-1">…</li>
  </ul>
</div>
```

## Specimen

Open `examples/index.html` in a browser. Specimen statically renders every variant + size for visual inspection. Includes:

- **Alert (sm + destructive)** — "Cancel 2 subscriptions?" delete confirmation with `role="alertdialog"`, strong backdrop dim, alert icon, critical-intent Remove button
- **Form (md)** — "Add subscription" Galley Dues add-record dialog with 4 form fields, cancel + primary Submit
- **Panel (lg)** — Linear subscription detail view with metrics block + last-12-charges sub-table, no footer
- **Command (md)** — Cmd+K palette with search input + grouped results list (Recent / Tools / Actions) + keyboard hint footer showing ↑↓ ⏎ esc legend
- **All 4 sizes** (sm / md / lg) stacked
- **All 4 footer registers** (primary-only / cancel-plus-primary / destructive / extended)
- **Composition lineage table** with 6 consumed primitives
- **14-item accessibility checklist** covering role/aria-modal/aria-labelledby, inert background, body scroll lock, focus trap + restoration, Escape + backdrop dismiss policy, Cancel button tab-order discipline, destructive button text guidelines, async submit state handling, command palette ARIA, reduced-motion handling

## Consumed by (reverse lineage)

Per Phase 22 Consolidation 3 (Q5 — composition reality) + D.82 reverse-lineage tables. This pack tracks its declared consumers:

| Consumer pack | Used as | Phase |
|---|---|---|
| `@quoin/pattern-nav` (variants: app-chrome, docs) | Cmd+K command-palette dialog opened by `nav-search` trigger. Modal-dialog's `data-variant="command"` register hosts the searchable list of routes / actions; activation handled by the host JS (palette opens, focus traps inside, ESC dismisses, focus restores to the trigger). | Phase 22 Cons. 4 / 2026-05-20 |

This list grows as more patterns formally declare modal-dialog as a peer pack and consume `<dialog data-pattern="modal-dialog">` directly.

## License

MIT.
