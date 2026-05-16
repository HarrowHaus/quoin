# @quoin/vocab-dashboard-extended

Extended data-dense primitives — KPI cards, sparklines, status pills, change indicators, filter chips, search cells, view switchers.

## Primitives

| Primitive | Role |
|-----------|------|
| `<kpi-card>` | Single metric card — label, big value, optional delta. |
| `<spark-line>` | Tiny in-line trend chart container. Inner SVG/canvas supplied by author. |
| `<status-pill>` | Short status indicator — running, success, error, queued. |
| `<change-indicator>` | Delta against a previous value — arrow + percentage. |
| `<filter-chip>` | Active filter chip with optional close affordance. |
| `<search-cell>` | Search input with implicit search icon, usually in a header. |
| `<view-switcher>` | Tab-like view selector between list / grid / kanban etc. |

## Attribution

- **Source:** Quoin original — distilled from common dashboard patterns across Grafana, Datadog, Linear, Vercel, Stripe, and Mixpanel.
- **License:** MIT
- **Harvested:** 2026-05-16
- **Notes:** Extends the v1 dashboard vocabulary with primitives that show up repeatedly in real operational consoles. Designed to compose inside <density-grid> + <canvas-block>.

## Cross-references

- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) §5.
- Canonical primitives: [`00_spec/primitives.md`](../../../00_spec/primitives.md).
