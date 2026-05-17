# @quoin/tokens-carbon

IBM Carbon (white theme) palette translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** Carbon Design System
- **Source organisation:** IBM
- **Source URL:** https://carbondesignsystem.com/
- **Source license:** Apache-2.0
- **Harvested:** 2026-05-17
- **Notes:** Values read byte-faithfully from @carbon/colors. Each Carbon colour family ships as a `{10..100}` step object. The white-theme accent is Carbon's Blue 60 per IBM's documentation. Extraction method: B. Algorithm: @carbon/colors@11.51.0, inputs "package default exports (Carbon canonical palette)". Mapping: Carbon white theme mapping: surface = white, surface-recessed = gray.10, surface-inverse = gray.100, text = gray.100, accent = blue.60, critical = red.60, success = green.50, warning = yellow.30, info = blue.60. Carbon's interactive state tokens (hover/active/visited) are not modelled — Quoin's impl pack handles interaction states.

## Mapping

Carbon background/layer/text tokens map onto Quoin's surface/text ramp. Carbon $interactive (Blue 60) -> accent. Carbon's support- tokens map to status: support-error -> critical, support-success -> success, support-warning -> warning, support-info -> info.

## License

This pack is published under **Apache-2.0**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
