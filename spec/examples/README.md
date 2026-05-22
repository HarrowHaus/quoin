# USML 2026.05 — canonical examples

Each `.json` file in this directory is a canonical example demonstrating one
or more features of the USML data model. Every example validates against
[`../usml-schema.json`](../usml-schema.json).

| File | Demonstrates |
|------|--------------|
| `pattern-hero.json` | Pattern with multiple variants, mandatory + conditional slots, peer-pack composition |
| `pattern-button-system.json` | Foundational pattern with microstates and no peer-pack consumption |
| `pattern-disclosure.json` | Translated pattern with full `metadata.source` attribution |
| `aesthetic-default.json` | Aesthetic pack consuming DTCG 2025.10 token format |
| `composition-graph.json` | Composition graph showing reverse-lineage between multiple patterns |
| `source-adapter-output.json` | **(Phase 23.2)** Canonical attribution-complete output of a USML Source Adapter per §7 Ingest interface. Real disclosure-pattern translation by the Quoin reference adapter from W3C ARIA APG. |

These examples are non-normative. They illustrate the schema in use; the
normative requirements are in `USML-Specification.bs`.
