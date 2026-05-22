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
| `backend-emission-output.json` | **(Phase 23.3)** Canonical description of a Level 3 backend emission per §6 Backend emission contract. Documents the attribution metadata, fidelity evidence, and outputs for the button-system pattern emitted by the reference plain-CSS + HTML backend. Non-schema-validated (no schema covers emission-output objects). |

These examples are non-normative. The schema-validated examples (the first
six rows) illustrate the schema in use. The Phase 23.3 backend emission
example documents a non-schema-covered concept (emission output) and is
referenced from §6.5 of the spec rather than schema-validated. The
normative requirements are in `USML-Specification.bs`.
