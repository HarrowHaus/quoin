# @quoin/tokens-primer

GitHub Primer (light theme) palette translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** Primer
- **Source organisation:** GitHub
- **Source URL:** https://primer.style/
- **Source license:** MIT
- **Harvested:** 2026-05-16
- **Notes:** Primer Primitives (@primer/primitives) light scheme. Primer's data- vs accent- vs success- vs danger- families translate cleanly onto Quoin's accent + critical/success/warning/info.

Phase 3.5 fidelity status: Tier C. The shipped OKLCH values are designed approximations informed by the source system's published palette structure and contrast pattern, not byte-faithful extraction. Canonical source extraction is deferred to a Phase 3.5b follow-up. See 03_harvest/fidelity/specs/ for the extraction framework; the upstream URL declared above is the verification target.

## Mapping

Primer's --color-canvas-default -> surface, --color-canvas-subtle -> surface-recessed, --color-fg-default -> text, --color-fg-emphasis -> text-emphasis, --color-fg-muted -> text-recede, --color-border-default -> border, --color-accent-emphasis -> accent. Danger/success/attention/done map to critical/success/warning/info.

## License

This pack is published under **MIT**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
