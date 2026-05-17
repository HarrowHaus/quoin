# @quoin/tokens-gestalt

Pinterest Gestalt design tokens translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** Gestalt
- **Source organisation:** Pinterest
- **Source URL:** https://gestalt.pinterest.systems/
- **Source license:** Apache-2.0
- **Harvested:** 2026-05-16
- **Notes:** Pinterest Gestalt 'light' tokens. Pinterest red (#E60023 family) drives accent. Gestalt has explicit semantic background-default / background-tertiary / text-default / text-subtle tokens that map cleanly. Pinterest Sans is proprietary; referenced by family name only.

Phase 3.5 fidelity status: Tier C. The shipped OKLCH values are designed approximations informed by the source system's published palette structure and contrast pattern, not byte-faithful extraction. Canonical source extraction is deferred to a Phase 3.5b follow-up. See 03_harvest/fidelity/specs/ for the extraction framework; the upstream URL declared above is the verification target.

## Mapping

Gestalt background-default -> surface, background-elevation-floating -> surface-elevated, background-secondary -> surface-recessed. text-default -> text, text-subtle -> text-recede. border-default -> border. Pinterest red 450 (their docs) -> accent.

## License

This pack is published under **Apache-2.0**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
