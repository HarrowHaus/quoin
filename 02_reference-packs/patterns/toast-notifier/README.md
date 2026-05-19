# @quoin/pattern-toast-notifier

**P0 toast-notifier pattern.** Transient app-status notifications via aria-live region. Four primitives. Four tones (info / success / warning / critical). Six positions. Auto-dismiss with hover-and-focus pause (WCAG 2.2.1 Timing Adjustable) or persistent for critical errors.

This pattern is the **canonical implementation for "Status Messages" (WCAG 4.1.3)** in the Quoin catalog. Anywhere an app needs to announce a transient state change without interrupting the user — "PDF merged", "Subscription added", "Sync failed — retry?" — this pattern is the contract.

---

## Composition lineage — what this pattern consumes

| Consumed primitive | Source pack | Version pin | Used in | How this pattern uses it |
|---|---|---|---|---|
| `<action-button intent="ghost" size="sm">` | `@quoin/pattern-button-system` | `^1.0.0` | `toast-action` · `toast-close` | Inline action button and close button. Inherits all 8 microstates including `aria-busy` for actions that trigger async work (e.g., Retry on a critical-tone toast). |
| `<action-button intent="critical" size="sm">` | `@quoin/pattern-button-system` | `^1.0.0` | `toast-action` on critical-tone toasts | Destructive or recovery actions on failed-state toasts. |
| canonical tokens | `@quoin/tokens-baseline` | `^0.1.0` | every CSS value | Tone families (`--accent` / `--success` / `--warning` / `--critical` + their `*-recede` variants) drive the four tones. Motion tokens drive enter/exit + timer-bar transitions; collapse under `prefers-reduced-motion`. |

---

## What this pattern adds

Four primitives:

- **`<toast-region>`** — viewport-fixed `<div>` with `role="status"` + `aria-live="polite"` (or `aria-live="assertive"` for critical-only regions). 6 positions. Hosts stacked toasts.
- **`<toast>`** — single notification with tone icon + title + optional body + optional action + optional close. 4 tones × 2 persistence modes (auto-dismiss / persistent) × 4 lifecycle states.
- **`<toast-action>`** — optional in-toast action button (Undo / Retry / View / Open). Composes button-system. At most ONE per toast.
- **`<toast-close>`** — dismiss button on persistent toasts (always shown) or auto-dismiss toasts (optional). Icon-only with explicit `aria-label="Dismiss notification"`.

## Reference lineage

| Aspect | Source |
|---|---|
| `role="status"` + `aria-live` polite for non-interrupting announcements | WAI-ARIA Authoring Practices 1.3, WCAG 4.1.3 |
| `aria-atomic="false"` so only new content is announced | WAI-ARIA 1.3 |
| Hover-and-focus pause for dismiss timer | WCAG 2.2.1 Timing Adjustable, Sonner / react-hot-toast / Linear toast implementations |
| Persistent variant for critical errors | Apple HIG, Material Design Snackbar (Action toasts) |
| Bottom-right default position | macOS Notifications, Linear, Stripe Dashboard |
| Six position presets | Sonner, react-hot-toast, Mantine, Chakra UI |
| Single-action constraint | Material Design Snackbar guidance ("limit to one action per snackbar") |
| Imperative verb-first action labels | UX Movement / Nielsen Norman writing guidelines |

## Tokens consumed

Canonical only:

- **Colour**: `--surface-elevated` (toast bg), `--surface-recessed` (close button hover), `--text`, `--text-emphasis` (title), `--text-recede` (body text, close icon), `--accent` (info tone, action button), `--accent-hover`, `--success` (success tone, timer bar), `--warning` (warning tone), `--critical` (critical tone, destructive action), `--border`, `--focus-ring`
- **Dimension**: `--space-1 / 2 / 3 / 4 / card`, `--radius-sm / card`, `--border-width-md`, `--focus-ring-width / offset`
- **Type**: `--font-sans`, `--type-size-xs / sm`, `--font-weight-medium / semibold`, `--leading-prose`, `--tracking-wide`
- **Motion**: `--motion-normal`, `--ease-standard`, `--transition-default`. Enter/exit slide transitions + timer-bar `scaleX` animation collapse under `prefers-reduced-motion: reduce`.
- **Shadow**: `--shadow-md` (default), `--shadow-lg` (on hover)

## States × lifecycle

| State | DOM signal | Meaning |
|---|---|---|
| `default` | (no modifier) | Toast not visible. |
| `entering` | `[data-state="entering"]` | Slide-in transition. `translateY` or `translateX` from offscreen, opacity 0 → 1. |
| `visible` | `[data-state="visible"]` | Steady state. Dismiss timer running (for auto-dismiss). |
| `paused` | `[data-state="paused"]` | Dismiss timer paused. Triggered by hover OR focus on any focusable inside the toast. Per WCAG 2.2.1. |
| `exiting` | `[data-state="exiting"]` | Slide-out transition. After transition completes, DOM removal. |

## Tones × persistence × duration

| Tone | Default persistence | Default duration | When to use |
|---|---|---|---|
| `info` | auto-dismiss | 5000ms | Non-actionable updates (sync complete, new feature unlocked) |
| `success` | auto-dismiss | 5000ms (7000ms with action) | Positive confirmations (saved, added, completed) |
| `warning` | auto-dismiss | 8000ms | Soft warnings (storage 85%, sync slow) |
| `critical` | **persistent** | — (no timer) | Errors and failures (sync failed, connection lost). Should have an action button (Retry) to be useful. |

## Templates that consume this pattern

- `template-app-tracker`, `template-app-creator-studio` — every Galley tool's success/error toasts
- `template-saas-pro` — billing confirmations, sync status, settings-saved toasts
- `template-marketing` — newsletter signup success (composed with footer-mega's newsletter form)
- `template-blog-magazine` — comment-posted, subscribe-confirmed toasts

## Use

```html
<!-- One region per app, mounted at root -->
<div data-pattern="toast-region"
     position="bottom-right"
     role="status"
     aria-live="polite"
     aria-atomic="false"
     aria-label="Notifications"
     id="toast-region-default">
  <!-- Toasts injected dynamically by JS -->
</div>

<!-- A second region for critical-only, assertive announcements -->
<div data-pattern="toast-region"
     position="top-center"
     role="alert"
     aria-live="assertive"
     aria-atomic="false"
     aria-label="Critical alerts"
     id="toast-region-critical">
</div>

<!-- A single toast -->
<div data-pattern="toast"
     tone="success"
     persistence="auto-dismiss"
     data-state="visible"
     style="--toast-duration: 5000ms;">
  <icon name="check-circle" class="tone-icon" aria-hidden="true" />
  <div class="content">
    <span class="title">Subscription added</span>
    <span class="body">Linear · $16/mo · Added to your Galley Dues ledger.</span>
  </div>
  <action-button intent="ghost" size="sm" data-pattern="toast-action">Undo</action-button>
</div>

<!-- A critical persistent toast with retry -->
<div data-pattern="toast"
     tone="critical"
     persistence="persistent"
     data-state="visible">
  <icon name="circle-x" class="tone-icon" aria-hidden="true" />
  <div class="content">
    <span class="title">Sync failed</span>
    <span class="body">Couldn't reach galley.harrow.haus.</span>
  </div>
  <action-button intent="critical" size="sm" data-pattern="toast-action">Retry</action-button>
  <action-button intent="ghost" size="sm" data-pattern="toast-close" aria-label="Dismiss notification">
    <icon name="close" />
  </action-button>
</div>
```

## Specimen

Open `examples/index.html` in a browser. Specimen statically renders:

- **Four tones stacked** in a single region — info (Galley Notes synced), success (Subscription added with Undo), warning (Easel storage at 85% with Upgrade), critical persistent (Keys vault failed with Retry + close button)
- **Six positions** rendered as a 2×3 grid for direct comparison
- **Four lifecycle states** side-by-side — entering / visible / paused / exiting with appropriate visual treatments
- **Auto-dismiss vs persistent comparison** with visible timer bar at the bottom of auto-dismiss toasts (orange progress bar scales X from 1 → 0 over the duration)
- **Action variations** showing 5 realistic Galley action toasts (Undo for bulk-remove, View for Easel export, Status for sync slowdown, Retry for failed removal)
- **Composition lineage table** (3 consumed primitives)
- **13-item accessibility checklist** covering region semantics, live levels, WCAG 2.2.1 hover/focus pause, persistent-for-critical policy, toast-itself-has-no-role rule, action-label guidelines, single-action constraint, focus restoration, stack limit, reduced-motion handling

## License

MIT.
