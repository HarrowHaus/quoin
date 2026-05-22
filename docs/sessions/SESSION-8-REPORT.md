# Session 8 closing report — Phase 24.1

**Phase 24.1:** Adoption Infrastructure Foundation
**Status:** ✅ Complete
**Date:** 2026-05-21

## Headline

USML/Quoin becomes reachable from outside the repository. The three primary adoption surfaces ship at scaffold-to-functional level: an npm package configured for publication, a shadcn-compatible registry auto-built from canonical USML pack manifests, and an MCP server scaffold with end-to-end-tested stdio transport.

This is the session where the Phase 23.1 Editor's Draft becomes consumable rather than merely readable. The shadcn registry serves all 38 catalog items with peer-pack composition resolved as `registryDependencies` and aesthetic-pack DTCG overrides flattened to `cssVars`. The MCP server exposes the catalog at `quoin://` URIs and provides a `find_pattern` search tool — verified by sending real `resources/list`, `resources/read`, and `tools/call` requests to a running server instance.

## Commits

- **`<hash>`** — primary commit shipping all Phase 24.1 deliverables. (Hash filled after push; see follow-up commit.)
- **`<follow-up>`** — closure-ref hash backfill in PHASES.md + this report.

## Shipped

| Deliverable | Path | Notes |
|---|---|---|
| npm package config | `/package.json` + `/.npmignore` | `@harrow-haus/quoin@0.1.0`; 298 files, 419 kB packed, 2.1 MB unpacked. |
| Build script | `/scripts/build-registry.js` | Deterministic ESM. Generates registry from 5 canonical pack-manifest directories. |
| shadcn-compatible registry | `/registry/` | `index.json` + `index.md` + `items/<name>.json` × 38. README documenting format + mapping rules. |
| MCP server scaffold | `/mcp/` | `@harrow-haus/quoin-mcp@0.1.0`; stdio transport; resources + `find_pattern` tool. |
| Distribution docs | `/DISTRIBUTION.md` | Canonical doc across all surfaces with concrete commands + operator-requirements list. |
| GitHub Actions | `/.github/workflows/{registry-build,npm-publish}.yml` | Auto-rebuild on pack change; publish on git tag. |
| README.md update | adds Distribution section | Three primary commands + DISTRIBUTION pointer |
| /llms.txt + /llms-full.txt update | adds Distribution surfaces sections | For AI agent direct consumption |
| Legacy /registry.json | `_deprecation` block | Successor URL + supported-through 2026.12 + removal target 2027.x |

## npm package configuration shipped

`npm pack --dry-run` output:

- Tarball: `harrow-haus-quoin-0.1.0.tgz`
- Package size: 419.1 kB
- Unpacked size: 2.1 MB
- Total files: 298
- Includes: `/patterns/` (13 entries), `/aesthetics/` (3), `/templates/` (3), `/registry/` (39 files), `/02_reference-packs/patterns/` (15), `/02_reference-packs/primitives/` (4), USML-Specification.bs, spec/usml-schema.json, spec/conformance-report.md, spec/examples/, THESIS.md, DISTRIBUTION.md, README.md, LICENSE
- Excludes (verified empty): node_modules, spec/tests, docs/, skills/, 03_harvest/, 04_docs/, 05_launch/, demos/, plans/, research/, compass_artifact_*, PHASES.md, PHASE_GATES.md, CHANGELOG.md, HANDOFF.md, mcp/, scripts/, .github/

## shadcn registry shipped

Registry contents:

| Type | Count | Items |
|---|---|---|
| `registry:component` | 32 | 22 production patterns + 4 content primitives + 6 layout primitives |
| `registry:style` | 3 | boeing-watch, default, harrow-haus |
| `registry:block` | 3 | blog-with-prose, docs-site, landing-saas |

Validation results:

- 38/38 items pass structural validation (required fields, valid types, files array, unique names)
- 6/6 declared `registryDependencies` resolve to sibling items (no dangling references)
- 3/3 aesthetic packs emit `cssVars` for both light and dark themes derived from DTCG 2025.10 overrides
- Sample peer-pack round-trip verified: `hero` correctly declares `registryDependencies: [button-system]`

Sample cssVars output from `default` aesthetic pack:

```
--surface: oklch(98% 0 0)
--surface-elevated: oklch(100% 0 0)
--surface-recessed: oklch(95% 0 0)
[...continues]
```

## MCP server scaffold shipped

SDK version: `@modelcontextprotocol/sdk@^1.0.0`.
Transport tested: stdio.
End-to-end smoke-test results:

| Request | Result |
|---|---|
| `initialize` (with protocolVersion 2024-11-05) | ✅ id=1 ok |
| `resources/list` | ✅ Returns 38 items |
| `resources/read uri=quoin://patterns/hero` | ✅ Returns full pack manifest; manifest.name=`@quoin/pattern-hero`; variants=`type-only\|animated\|gradient-mesh\|brand-photo\|video` |
| `tools/list` | ✅ Returns `[find_pattern]` |
| `tools/call find_pattern(query="form")` | ✅ Returns 13 matches |

Integration documented for: Claude Code, Claude Desktop, Cursor, generic MCP clients (stdio).

## Distribution documentation shipped

`DISTRIBUTION.md` section coverage:

- ✅ Overview (5 surfaces × audience × status)
- ✅ For developers (npm, shadcn, direct file inclusion)
- ✅ For AI coding agents (MCP, llms.txt, registry direct)
- ✅ For design-system maintainers (consuming Quoin, authoring aesthetic packs, native publication path)
- ✅ For standards reviewers (validating conformance, reading spec, verifying parity)
- ✅ Operator execution requirements (6-row table)
- ✅ Deprecation timeline (legacy registry.json)
- ✅ Distribution-surface summary

Integration examples included: a developer using Cursor + Quoin's hero pattern; a design-system team authoring an aesthetic pack; a standards reviewer validating the conformance claim.

## Build pipelines shipped

`.github/workflows/registry-build.yml`:

- Triggers: push to main affecting `/patterns/`, `/aesthetics/`, `/templates/`, `/02_reference-packs/{patterns,primitives}/`, or the script itself
- Action: runs `node scripts/build-registry.js`; auto-commits regenerated `/registry/` if changed
- Permissions: `contents: write`
- Documented: yes, in DISTRIBUTION.md

`.github/workflows/npm-publish.yml`:

- Triggers: push tag matching `v*.*.*`
- Actions: rebuild registry → npm pack --dry-run verification → publish `@harrow-haus/quoin` → publish `@harrow-haus/quoin-mcp` (sequential)
- Required operator-provisioned secret: `NPM_TOKEN`
- Documented: yes, in DISTRIBUTION.md operator-execution-requirements

## Discoverability updates summary

| File | Change |
|---|---|
| README.md | New "Distribution" section with three primary commands + DISTRIBUTION.md pointer. "For AI tools" section updated: canonical registry now at `/registry/index.json`; legacy `/registry.json` marked deprecated. |
| /llms.txt | Header tagline updated with USML/Quoin bifurcation language. New "Distribution surfaces (Phase 24.1)" section. |
| /llms-full.txt | New "Distribution surfaces (Phase 24.1)" section with npm install / shadcn add / MCP server / direct file consumption examples for AI agents. |
| /registry.json (legacy) | `_deprecation` block at root with deprecation date 2026-05-21, successor URL, supported-through 2026.12, removal target 2027.x. |

## Architectural truths surfaced

Packaging surfaces decisions that internal organization hides. Six truths surfaced during Phase 24.1 authoring:

1. **Catalog physically split across two paths.** Root `/patterns/`, `/aesthetics/`, `/templates/` (19 items) + `/02_reference-packs/{patterns,primitives}/` (19 items) = 38 catalog items. The brief's literal direction (exclude 02_reference-packs/) would have cut the catalog by half and contradicted the conformance report. Decision: include both as catalog content; exclude only internal-scaffolding subdirs.

2. **Peer-pack semantics map cleanly to shadcn `registryDependencies` for required peers; `meta.optionalDependencies` for optional peers.** This separation reflects v3.G.21 semantics: required peers auto-install, optional peers do not. shadcn resolves `registryDependencies` eagerly, so optional peers must NOT be in that array.

3. **Infrastructure packs are not shadcn items.** `@quoin/tokens-baseline` and `@quoin/vocab-*` are implicit infrastructure consumed at catalog-resolution level, not user-facing components. Including them as items would create circular install issues.

4. **DTCG 2025.10 → shadcn `cssVars` round-trip is lossless.** The mapping is mechanical: unwrap `$value`, prefix with `--`. The aesthetic-pack interface USML §6 specifies DTCG consumption; shadcn `cssVars` is the distribution serialization of that consumption.

5. **Pack name → shadcn item name normalization drops namespace and type prefix.** `@quoin/pattern-hero` → `hero`. Full Quoin name preserved in `meta.quoinPackName` for traceability.

6. **MCP resource URI scheme uses semantic role, not physical path.** Layout primitives live under `/patterns/prim-*/` physically but are exposed at `quoin://primitives/<name>` for clarity.

Each truth is documented in DISTRIBUTION.md and the Phase 24.1 PHASES.md entry.

## Adoption-surface readiness assessment

| Surface | Ready for external testing? | Ready for publication? | Ready for AI-coding-agent integration testing? |
|---|---|---|---|
| **npm package** | ✅ Configured + dry-run-verified | ⚠️ Pending operator credentials (npm scope, NPM_TOKEN) | ✅ Once published |
| **shadcn registry** | ✅ Generated + structurally valid + auto-rebuilt | ✅ Once GitHub Pages serves `/registry/` | ✅ Now (URL-addressable when Pages configured) |
| **MCP server** | ✅ End-to-end smoke-tested | ⚠️ Pending operator (npm publish via tag) | ✅ Once published; ✅ Now via local path for testing |

## Operator-execution requirements list

Things the operator must do separately before Phase 24.1's surfaces are fully live to the public:

| Task | Required for | How |
|---|---|---|
| Claim `@harrow-haus` npm scope | First publish | `npm login` + scope availability check. Fallback: `@harrowhaus` or `quoin-design-system`; update package.json + workflow refs accordingly. |
| Add `NPM_TOKEN` repository secret | First auto-publish | GitHub Settings → Secrets → Actions → New secret `NPM_TOKEN` with npm automation token having publish permission. |
| Configure GitHub Pages for `/registry/` path | shadcn registry URL reachable | Verify GitHub Pages source serves both `/docs/usml/` (from Phase 23.1) AND `/registry/`. May require Pages source = root with both subdirs accessible. |
| Tag `v0.1.0` | First npm publish | `git tag v0.1.0 && git push --tags` → npm-publish.yml runs → both packages publish. |
| Run first MCP integration test | Verify real-agent adoption | Add MCP config to Claude Code / Cursor / Claude Desktop; ask "list available Quoin patterns"; verify 38 items returned. |
| Run first `shadcn add` test in real project | End-to-end shadcn validation | `mkdir tmp && cd tmp && npx shadcn@latest init && npx shadcn@latest add --registry=https://harrowhaus.github.io/quoin/registry/index.json hero` |

## Halt items

**None encountered.** All seven hard-halt conditions checked; none triggered.

## Strategic implications for downstream work

- USML/Quoin is reachable through the dominant AI-coding-agent surfaces. The Phase 26 "1+ external design-system adopter" activation criterion becomes plausible: a design system team trying Quoin via `npm install` or `shadcn add` is a real adoption signal.
- The Kaelig outreach and W3C Generative UI CG outreach (operator-scheduled weekend work) now have a concrete artifact to point at: "I've shipped `npm install @harrow-haus/quoin`; here's the spec it implements" lands materially harder than "I've drafted a spec."
- Phase 24.2 (CDN + custom domain) is now a polish phase rather than a foundation phase. The foundation exists.
- Phase 24.4 (first integration tests with real AI coding agents) is immediately runnable. The operator can ask Cursor / Claude Code / Lovable / v0 to use Quoin and observe the behavior against a real distribution surface.
- Phase 25 (multi-source harvest) has a real distribution target. Harvested patterns ship through the same surfaces as native Quoin patterns.

## Next-session recommendation

**Phase 24.4 (first AI-tool integration tests)** — the highest-leverage next move. Exercises Phase 24.1's surfaces with real-world agent behavior. Operator runs `shadcn add` from a fresh project; asks Cursor / Claude Code to "build a landing page using Quoin's hero with Harrow Haus aesthetic" against the MCP server; documents the agent's actual behavior. The output is concrete adoption evidence — exactly what Phase 26 activation criteria call for.

**Alternative: Phase 24.2 (CDN + custom domain).** Polish the URLs (custom domain like `usml.dev` or `quoin.dev`) and add CDN caching. Lower-leverage than Phase 24.4 but easier to schedule around operator credential availability.

**Alternative: Phase 23.2 (ingest interface specification).** Returns to spec polish if Phase 24 distribution surfaces feel sufficient for now. Elaborates USML §Ingest interface from sketch to formal contract. Maintains the spec-authoring track.

Operator chooses based on whether the next priority is "real-agent evidence" (24.4), "polished URLs" (24.2), or "spec deepens" (23.2).

## License

MIT.
