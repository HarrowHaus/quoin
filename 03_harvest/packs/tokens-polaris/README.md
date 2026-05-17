# @quoin/tokens-polaris

Shopify Polaris (light theme) palette translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** Polaris
- **Source organisation:** Shopify
- **Source URL:** https://polaris.shopify.com/
- **Source license:** MIT
- **Harvested:** 2026-05-16
- **Notes:** Polaris v12 'light' colour tokens. Polaris ships extensive token families (--p-color-bg-*, --p-color-text-*, --p-color-border-*, etc.); this pack distills them onto Quoin's 4-surface model. Polaris's brand indigo (#2C6ECB area) sets accent.

Phase 3.5 fidelity status: Tier C. The shipped OKLCH values are designed approximations informed by the source system's published palette structure and contrast pattern, not byte-faithful extraction. Canonical source extraction is deferred to a Phase 3.5b follow-up. See 03_harvest/fidelity/specs/ for the extraction framework; the upstream URL declared above is the verification target.

## Mapping

Polaris --p-color-bg / bg-surface -> surface, bg-surface-secondary -> surface-recessed, bg-emphasis -> accent. text -> text, text-secondary -> text-recede, text-emphasis -> text-emphasis. critical/success/warning/info map directly from Polaris's status families.

## License

This pack is published under **MIT**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
