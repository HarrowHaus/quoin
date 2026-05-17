# @quoin/tokens-ant

Ant Design (light theme) palette translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** Ant Design
- **Source organisation:** Ant Group
- **Source URL:** https://ant.design/
- **Source license:** MIT
- **Harvested:** 2026-05-17
- **Notes:** Values read byte-faithfully from @ant-design/colors. Each ramp is a 10-entry hex array indexed 1-10 in Ant's own docs (step 6 = the 'solid' tone). To regenerate against a different seed, call generate('#hex') from the same library. Extraction method: B. Algorithm: @ant-design/colors@8.0.1, inputs "package default seeds". Mapping: Ant Design canonical 10-step ramps for blue/red/green/gold/orange/purple/cyan/magenta/grey. Accent = blue.6 (daybreak), critical = red.5, success = green.6, warning = gold.6, info = blue.6 per Ant's own status-colour convention.

## Mapping

Ant Design's neutral palette uses grey-1..grey-13. grey-1 -> surface (white), grey-2 -> surface-recessed, grey-13 -> text-emphasis. blue-6 -> accent. Status: red-6 (critical), green-6 (success), gold-6 (warning), cyan-6 (info).

## License

This pack is published under **MIT**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
