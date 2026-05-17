# @quoin/tokens-open-props

Open Props (Adam Argyle / Chrome team) translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** Open Props
- **Source organisation:** Adam Argyle / Open Props community
- **Source URL:** https://raw.githubusercontent.com/argyleink/open-props/main/src/props.colors.css
- **Source license:** MIT
- **Harvested:** 2026-05-17
- **Notes:** Open Props props.colors.css extracted byte-faithfully. The gray-N ramp + named colour scales (red, orange, green, blue) preserved verbatim. Hex inputs converted to OKLCH via culori at extraction time.

Extraction notes: Status hues mapped: critical = red-7, success = green-7, warning = orange-7 (matches Open Props' own usage in props.shadows.css), info = blue-7. Hex source → OKLCH at extraction.

## Mapping

Open Props gray-0..gray-12 maps to Quoin surface/text/border ramp. Open Props has a dedicated surface- and brand- layer in its newer releases; this pack uses the gray ramp directly to keep the mapping simple and faithful to the original 'use the raw scale' usage pattern.

## License

This pack is published under **MIT**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
