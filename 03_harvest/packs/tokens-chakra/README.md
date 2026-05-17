# @quoin/tokens-chakra

Chakra UI default palette translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** Chakra UI
- **Source organisation:** Chakra UI community
- **Source URL:** https://www.chakra-ui.com/
- **Source license:** MIT
- **Harvested:** 2026-05-16
- **Notes:** Chakra v3 default colour scales. Default primary is 'teal' (500). Gray = standard slate-tinted neutral.

Phase 3.5 fidelity status: Tier C. The shipped OKLCH values are designed approximations informed by the source system's published palette structure and contrast pattern, not byte-faithful extraction. Canonical source extraction is deferred to a Phase 3.5b follow-up. See 03_harvest/fidelity/specs/ for the extraction framework; the upstream URL declared above is the verification target.

## Mapping

Chakra gray-50..900 maps to Quoin surface/text. chakra-teal-500 -> accent. Status colours: red-500 (critical), green-500 (success), orange-500 (warning), blue-500 (info).

## License

This pack is published under **MIT**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
