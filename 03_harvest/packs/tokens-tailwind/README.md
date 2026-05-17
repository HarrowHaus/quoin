# @quoin/tokens-tailwind

Tailwind v4 default palette and scales (zinc neutral), translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** Tailwind CSS
- **Source organisation:** Tailwind Labs
- **Source URL:** https://raw.githubusercontent.com/tailwindlabs/tailwindcss/main/packages/tailwindcss/theme.css
- **Source license:** MIT
- **Harvested:** 2026-05-17
- **Notes:** Default v4 palette extracted byte-faithfully from packages/tailwindcss/theme.css. Tailwind v4 ships native OKLCH; values preserved verbatim. Neutral ramp = zinc.

## Mapping

Tailwind's neutral scale (zinc 50-950) maps directly onto Quoin's surface/text/border ramp. Tailwind has no native semantic-token layer; status colours selected from Tailwind's default red/amber/emerald/sky scales at their 500 step (or 700 for text-emphasis contrast).

## License

This pack is published under **MIT**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
