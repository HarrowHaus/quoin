# Distribution — how to reach Quoin / USML

This document is the canonical reference for every surface through which
Quoin (the reference implementation of USML 2026.05) is reachable from
outside this repository.

**TL;DR:**

| Surface | Command |
|---|---|
| npm | `npm install @harrow-haus/quoin` |
| shadcn registry | `npx shadcn@latest add --registry=https://harrowhaus.github.io/quoin/registry/index.json hero` |
| MCP server (AI coding agents) | `npx @harrow-haus/quoin-mcp` or per-agent config |
| Direct file read (AI agents) | `curl https://harrowhaus.github.io/quoin/llms.txt` |
| Full repository | `git clone https://github.com/HarrowHaus/quoin` |

Each surface is documented in detail below.

---

## Overview — what is published where

Quoin ships content (pack manifests, anatomy contracts, CSS, examples, the
USML specification draft) through three primary distribution surfaces plus
several secondary AI-consumption-friendly paths.

| Surface | Format | Primary audience | Status as of Phase 24.1 |
|---|---|---|---|
| **`@harrow-haus/quoin` npm package** | scoped npm tarball | developers consuming via build tools | configured; first publication pending operator |
| **shadcn registry** | shadcn-compliant JSON at `https://harrowhaus.github.io/quoin/registry/index.json` | AI coding agents using shadcn CLI | functional; auto-rebuilt on every pack change |
| **`@harrow-haus/quoin-mcp` MCP server** | stdio MCP server (Node) | AI coding agents using MCP | scaffold; tested for stdio start; client integration documented |
| `llms.txt` / `llms-full.txt` | plain-text + Markdown | LLMs directly ingesting documentation | shipped; updated through Phase 23.1 |
| `registry.json` (legacy at repo root) | the original Quoin-shaped registry | early adopters; pre-shadcn-format consumers | **deprecated**; supported through 2026.12; removed in 2027.x |

The canonical USML pack manifests (the source of truth for every distribution
surface) live at `/patterns/`, `/aesthetics/`, `/templates/`,
`/02_reference-packs/patterns/`, and `/02_reference-packs/primitives/`.
Every other distribution surface is **derivative** — generated from these by
`scripts/build-registry.js` (for the shadcn registry) or read at runtime
(for the MCP server).

---

## For developers

### `npm install @harrow-haus/quoin`

The npm package ships the entire catalog as pack manifests plus the USML
specification draft plus the formal JSON Schema plus the conformance report.

```bash
npm install @harrow-haus/quoin
```

After install, the package's exports are accessible as:

```js
// All pattern manifests are addressable by name:
import heroManifest from '@harrow-haus/quoin/patterns/hero-section';
// (Actually for the in-repo root patterns; legacy reference patterns at /02_reference-packs/patterns are accessible at
// '@harrow-haus/quoin/reference-patterns/<name>'.)

// The JSON Schema for validation:
import schema from '@harrow-haus/quoin/schema';

// The catalog registry root:
import registry from '@harrow-haus/quoin/registry';
```

Or by file-path inclusion:

```js
import fs from 'node:fs';
import path from 'node:path';
const ROOT = require.resolve('@harrow-haus/quoin/package.json').replace(/\/package\.json$/, '');
const heroManifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'patterns/hero/quoin.pack.json'), 'utf8'));
```

**The package does NOT ship JavaScript code in v0.1.0.** It is a content
package: pack manifests, anatomy contracts, CSS files, example HTML,
specification source, schema. AI agents consume these directly. Future
versions may add a small JavaScript layer for runtime validation.

### `npx shadcn add` (shadcn-compatible registry)

Quoin publishes a shadcn-compliant registry at
`https://harrowhaus.github.io/quoin/registry/index.json`. Consumers of the
shadcn CLI can add Quoin patterns directly:

```bash
# Add a single pattern. Dependencies (e.g., button-system for hero) are auto-installed.
npx shadcn@latest add \
  --registry=https://harrowhaus.github.io/quoin/registry/index.json \
  hero

# Add an aesthetic pack. cssVars (token overrides) are registered into the project's CSS.
npx shadcn@latest add \
  --registry=https://harrowhaus.github.io/quoin/registry/index.json \
  boeing-watch

# Add a template (composes multiple patterns + an aesthetic + tokens).
npx shadcn@latest add \
  --registry=https://harrowhaus.github.io/quoin/registry/index.json \
  landing-saas
```

The shadcn registry contains all 38 catalog items (32 components + 3
aesthetics + 3 blocks). Peer-pack composition is preserved via
`registryDependencies`. Optional peer packs are documented in each
registry item's `meta.optionalDependencies` for explicit installation when
needed (they are NOT auto-installed to avoid forcing unrelated dependencies
on consumers).

### Direct file inclusion

For projects that prefer not to use npm or shadcn, every catalog item is
readable via raw GitHub URLs:

```bash
# Read a pattern manifest:
curl https://raw.githubusercontent.com/HarrowHaus/quoin/main/patterns/disclosure/quoin.pack.json

# Read a pattern's example specimen:
curl https://raw.githubusercontent.com/HarrowHaus/quoin/main/patterns/disclosure/examples/index.html
```

Or via `raw.githack.com` for live-rendered HTML:

```
https://raw.githack.com/HarrowHaus/quoin/main/patterns/disclosure/examples/index.html
```

---

## For AI coding agents

### MCP server (`@harrow-haus/quoin-mcp`)

The MCP server exposes the catalog as resources and provides a `find_pattern`
search tool. It runs on the stdio transport (the dominant MCP transport
for local agent integration).

**Configuration (Claude Code, Claude Desktop, Cursor):** see [`mcp/README.md`](mcp/README.md)
for per-client integration snippets.

**Quick verification:**

```bash
# Start the server manually (it will wait for stdio input):
npx @harrow-haus/quoin-mcp
# (Press Ctrl+C to exit; this is for verification only — actual usage runs through an MCP client.)

# Or, in your agent's MCP configuration:
{
  "mcpServers": {
    "quoin": {
      "command": "npx",
      "args": ["-y", "@harrow-haus/quoin-mcp"]
    }
  }
}
```

With the server running, the agent can:

- List the full catalog (`resources/list`).
- Read a specific pattern manifest (`resources/read` on `quoin://patterns/hero`).
- Search the catalog (`tools/call` with `find_pattern` query).

### Direct `llms.txt` / `llms-full.txt` consumption

LLMs and AI coding agents that ingest documentation directly can read:

```
https://harrowhaus.github.io/quoin/llms.txt          # short catalog summary
https://harrowhaus.github.io/quoin/llms-full.txt     # full anatomy reference
```

These follow the [`llmstxt.org`](https://llmstxt.org) convention.

### Registry direct consumption (no CLI)

The shadcn-compatible registry root and per-item manifests are also
directly readable:

```bash
# Catalog manifest:
curl https://harrowhaus.github.io/quoin/registry/index.json

# Specific item:
curl https://harrowhaus.github.io/quoin/registry/items/hero.json

# Markdown projection (LLM-friendly):
curl https://harrowhaus.github.io/quoin/registry/index.md
```

---

## For design-system maintainers

### Consuming Quoin patterns in your own design system

The Quoin catalog is published under MIT. A design system implementing
USML can:

1. **Install via npm** and consume pack manifests directly.
2. **Translate to your own anatomy format** using the canonical USML pack
   manifests as the source — every Quoin pack validates against
   `spec/usml-schema.json`.
3. **Implement a USML Backend Emitter** that consumes Quoin's IR and emits
   for your framework target (React, Vue, web components, native frameworks).
   See `spec/conformance-report.md` for the reference implementation's
   plain-CSS backend conformance claim, which serves as the bar for
   additional backends.

### Authoring an aesthetic pack

Aesthetic packs are token-value bundles conforming to
[DTCG 2025.10](https://designtokens.org/tr/drafts/format/). The Quoin
aesthetic-pack interface (see [`USML §6`](USML-Specification.bs)) defines
the contract.

To author a new aesthetic pack:

1. Create `aesthetics/<your-aesthetic-name>/`.
2. Author `quoin.pack.json` with `type: "aesthetic"`.
3. Author `overrides/light.json` and `overrides/dark.json` in DTCG 2025.10
   format.
4. Optionally author `tokens.css` with the CSS custom-property emissions.
5. Optionally author a `specimen/` directory with example markup.

Run `npm run build:registry` to regenerate the shadcn registry with the
new aesthetic included.

### Publishing your design system as USML-conformant

If your design system natively publishes anatomy in USML format, the Quoin
translation skill (Phase 22.7) becomes unnecessary for your patterns — you
can be consumed directly. See
[`docs/translation/anatomy-extraction-rules.md`](docs/translation/anatomy-extraction-rules.md)
§D.7 for the future native USML ingest procedure.

---

## For standards reviewers

### Validating the conformance claim

```bash
git clone https://github.com/HarrowHaus/quoin
cd quoin
npm install
node spec/tests/run-all.mjs
```

Expected output:

```
USML 2026.05 conformance scaffold: ALL PASS
```

Plus all 38 pack manifests validate against `spec/usml-schema.json`:

```bash
# Re-run the schema verification across the full catalog:
node -e "/* uses ajv */" # see scripts/verify-schemas.js
```

### Reading the specification

- Bikeshed source: [`USML-Specification.bs`](USML-Specification.bs)
- HTML render (post-build): https://harrowhaus.github.io/quoin/usml/

### Verifying implementation parity

Per `spec/conformance-report.md`, the reference implementation claims:

- USML Anatomy Validator: Partial
- USML Aesthetic-Pack Provider: Full
- USML Backend Emitter: Level 3 (plain-CSS backend)

Each claim cites specific files and validation evidence. Reviewers can
walk the claim mechanically.

---

## Operator execution requirements

Phase 24.1 ships the configuration; certain operations require explicit
operator action and credentials:

| Task | When | How |
|---|---|---|
| Claim `@harrow-haus` npm scope | Before first publish | `npm login` + `npm org create` if needed (or use a personal scope `@<your-username>` and update package.json) |
| Add `NPM_TOKEN` GitHub secret | Before first auto-publish | Repository Settings → Secrets and variables → Actions → New secret named `NPM_TOKEN` with an npm automation token |
| Publish `@harrow-haus/quoin` | First publication | Tag `v0.1.0` and push; the npm-publish.yml action runs |
| Publish `@harrow-haus/quoin-mcp` | First publication | Same; both packages publish on the same tag (operator-confirmed flow) |
| Run first MCP integration test | After publish | Add MCP config to Claude Code / Claude Desktop / Cursor; verify `list available Quoin patterns` returns 38 items |
| Enable GitHub Pages for `docs/usml/` and `registry/` paths | Before public consumption | Repository Settings → Pages → Source: deploy from `main` branch, `/docs` folder (already configured in Phase 23.1 for the spec; verify registry/ is also reachable) |

If `@harrow-haus` is unavailable on npm, fall back to `quoin-design-system`
(unscoped) or `@harrowhaus/quoin` (single-word scope), and update package.json
plus the GitHub Action references.

---

## Deprecation timeline

The legacy `/registry.json` at the repository root (pre-shadcn-format,
Phase 22.5 vintage) is **deprecated as of Phase 24.1**. The supported
replacement is the shadcn-compatible registry at `/registry/index.json`.

| Date | Status |
|---|---|
| **Phase 24.1 (2026-05-21)** | Deprecated. Legacy `/registry.json` still functional; carries deprecation notice. |
| **2026-12 (target)** | End-of-life soft cutoff. New patterns added to `/patterns/` after this date may not appear in `/registry.json`. |
| **2027.x (target)** | `/registry.json` removed. Consumers must migrate to `/registry/index.json`. |

The legacy registry's deprecation notice points at the new registry's URL.
See `/registry.json` itself for the in-file note.

---

## Distribution-surface summary

After Phase 24.1, USML/Quoin is reachable through:

1. **npm install** (`@harrow-haus/quoin` for the catalog, `@harrow-haus/quoin-mcp`
   for the MCP server). Configuration ready; first publication pending operator
   credentials.
2. **shadcn registry** at the canonical URL. All 38 items, peer-pack
   relationships preserved as `registryDependencies`, aesthetic packs emit
   `cssVars` from DTCG overrides, regenerated automatically on every pack
   change.
3. **MCP server** scaffold with stdio transport. Resources + tools exposed.
   Per-client integration documented for Claude Code, Claude Desktop, Cursor,
   and generic MCP clients.
4. **GitHub Pages** serving the registry root + per-item items + the USML
   specification HTML + llms.txt + llms-full.txt.
5. **GitHub Actions** auto-rebuilding the registry (`registry-build.yml`)
   and auto-publishing on tags (`npm-publish.yml`).

The next phase (Phase 24.2) polishes the CDN and adds a custom domain;
Phase 24.4 runs the first integration tests with real AI coding agents.

## License

MIT.
