# @quoin/tokens-bulma

Bulma CSS framework default palette translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** Bulma
- **Source organisation:** Jeremy Thomas / Bulma community
- **Source URL:** https://bulma.io/
- **Source license:** MIT
- **Harvested:** 2026-05-16
- **Notes:** Bulma default theme. Signature accent is $primary = turquoise (#00D1B2 area). Bulma is one of the more aesthetically distinctive defaults — included for breadth.

Phase 3.5 fidelity status: Tier C. The shipped OKLCH values are designed approximations informed by the source system's published palette structure and contrast pattern, not byte-faithful extraction. Canonical source extraction is deferred to a Phase 3.5b follow-up. See 03_harvest/fidelity/specs/ for the extraction framework; the upstream URL declared above is the verification target.

## Mapping

Bulma's $background -> surface, $text -> text, $primary -> accent (turquoise), $danger/$success/$warning/$info -> respective. Bulma's $border -> border, $border-light -> border-recede.

## License

This pack is published under **MIT**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
