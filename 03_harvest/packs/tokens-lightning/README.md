# @quoin/tokens-lightning

Salesforce Lightning Design System palette translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** Lightning Design System (SLDS)
- **Source organisation:** Salesforce
- **Source URL:** https://www.lightningdesignsystem.com/
- **Source license:** BSD-3-Clause
- **Harvested:** 2026-05-16
- **Notes:** SLDS '2' tokens (light scheme). Salesforce ships @salesforce-ux/design-system-tokens with utility, component, and theme layers; this pack uses the global + alias layers. Salesforce Sans is proprietary; referenced by family name only.

Phase 3.5 fidelity status: Tier C. The shipped OKLCH values are designed approximations informed by the source system's published palette structure and contrast pattern, not byte-faithful extraction. Canonical source extraction is deferred to a Phase 3.5b follow-up. See 03_harvest/fidelity/specs/ for the extraction framework; the upstream URL declared above is the verification target.

## Mapping

SLDS color-background-base -> surface, color-background -> surface-recessed, color-text-default -> text, color-brand -> accent (Salesforce blue #0070D2 area). color-success/error/warning/info map directly.

## License

This pack is published under **BSD-3-Clause**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
