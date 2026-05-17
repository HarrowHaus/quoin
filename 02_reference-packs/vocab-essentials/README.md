# @quoin/vocab-essentials

Added in **Phase 5d**. Ten universal layout + content primitives that the
v1 vocabulary skipped. Modern UI work — docs sites, marketing pages, app
dashboards — needs all of them; they belong in the reference set, not
buried in a per-domain harvested pack.

## Primitives

| Primitive | Role |
|-----------|------|
| `<tab-panels>` | Full tab system: tab row + active panel content. Paired with `companion.js` Phase 5c for keyboard navigation. |
| `<pin-entry>` | Multi-cell numeric / OTP input (4–6 connected cells). |
| `<stat-display>` | Big number + label, optional delta indicator. `intent="success" \| "warning" \| "critical"` tints the number. |
| `<split-shell>` | Fixed sidebar + flexible main content area. |
| `<columns>` | Explicit responsive columns — `ratio="1:1 \| 1:2 \| 2:1 \| 1:1:1 \| 1:1:1:1 \| 1:3 \| 3:1"` — that collapse on small screens. The 4-column ratio uses a three-step responsive shape (1 / 2 / 4 columns at mobile / tablet / desktop) so KPI strips read sensibly at every breakpoint. |
| `<comparison-table>` | Feature × tier grid with check / cross cells. |
| `<browser-frame>` | Chrome wrapper around content that reads as a browser window. |
| `<terminal-frame>` | Chrome wrapper around code that reads as a terminal. |
| `<step-flow>` | Numbered horizontal steps with connecting line. |
| `<logo-strip>` | "Trusted by" row of greyscale logo placeholders. |

## Why these

The v1 vocabulary covered editorial, layout, navigation, state, content,
and interactive in the abstract. But ten patterns show up in **every**
modern docs / marketing / app surface and we left them out:

- **Tab panels.** v1's `<segment-control>` is just the tab row. Real UI
  needs the panel content the row controls.
- **Stat display.** "40 harvested packs" or "5-minute install" — every
  landing page has one.
- **Browser / terminal frames.** Screenshots and code samples in 2026 UI
  are framed with chrome that makes them read as artefacts, not raw
  content.
- **Step flow.** Numbered onboarding / install flows are universal.
- **Comparison table.** Pricing pages, feature comparisons.
- **Split shell.** App layouts with a persistent sidebar.
- **Columns.** v1's `<density-grid>` is auto-fill; explicit ratios were
  missing.

## Pair with

This pack is part of the v1 reference floor alongside
`@quoin/vocab-editorial`, `@quoin/vocab-dashboard`, and (for app
surfaces) `@quoin/vocab-app-shell`. Load editorial + dashboard +
essentials for the full universal vocabulary, or add app-shell on top
when authoring authenticated app surfaces.

## Cross-references

- Pack format: [`00_spec/pack-format.md`](../../00_spec/pack-format.md) §5.
- Companion: [`@quoin/vocab-editorial`](../vocab-editorial) — editorial + layout + content.
- Companion: [`@quoin/vocab-dashboard`](../vocab-dashboard) — navigation + state + interactive.
- Companion: [`@quoin/vocab-app-shell`](../vocab-app-shell) — app-surface composition (Phase 5d).
