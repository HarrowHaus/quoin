# @quoin/tokens-mantine

Mantine UI default palette translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** Mantine
- **Source organisation:** Mantine community
- **Source URL:** https://raw.githubusercontent.com/mantinedev/mantine/master/packages/%40mantine/core/src/core/MantineProvider/default-colors.ts
- **Source license:** MIT
- **Harvested:** 2026-05-17
- **Notes:** Mantine v7 default palette (blue accent at step 6). Each colour ramp is a 10-entry hex array. Extraction method: A. Mapping: Mantine 10-step ramps (indices 0-9) extracted verbatim from default-colors.ts. The 'primaryShade' default is 6 (light theme); accent = blue.6 per Mantine's own convention.

## Mapping

Mantine's gray shades 0-9 map to Quoin's surface/text ramp. mantine-blue-6 -> accent. Mantine has explicit red/green/yellow/cyan colour scales for status; mapped to their shade-6 step.

## License

This pack is published under **MIT**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
