# Template Pack

**Version:** 1.0
**Status:** v1.0 normative.

A template pack is a pre-composed full site or full page. Users run `npx @quoin/create <template-name>` to scaffold a working project. Templates are **not compiled at build time** as part of an existing project's pack stack — they produce a starter project that then composes against its own active pack stack.

## 1. Manifest

`quoin.pack.json` for a template pack:

```json
{
  "$schema": "https://harrow.haus/quoin/schema/pack.json",
  "name": "@quoin/template-saas-pro",
  "version": "1.0.0",
  "type": "template",
  "quoinVersion": "^0.1.0",
  "description": "Developer-tooling SaaS marketing site. 7 pages, complete copy, deep-linkable filters.",
  "category": "saas-landing",
  "targetUseCase": "Developer-tooling SaaS marketing site",
  "pages": [
    { "route": "/",         "file": "pages/index.html",    "title": "Home" },
    { "route": "/pricing",  "file": "pages/pricing.html",  "title": "Pricing" },
    { "route": "/docs",     "file": "pages/docs/[...slug].html", "title": "Docs" }
  ],
  "exports": {
    "pages": "./pages",
    "public": "./public",
    "quoinConfig": "./quoin.config.json"
  },
  "dependencies": {
    "tokenPack": "@quoin/tokens-baseline",
    "themePack": "@quoin/theme-graphite",
    "vocabularyPacks": ["@quoin/vocab-marketing", "@quoin/vocab-docs"],
    "implementationPack": "@quoin/impl-tailwind",
    "patternPacks": ["@quoin/pattern-hero-animated", "@quoin/pattern-footer-mega", "@quoin/pattern-pricing-tiers"],
    "iconPacks": ["@quoin/icons-mynaui"]
  },
  "metadata": {
    "author": "Quoin",
    "license": "MIT",
    "tags": ["saas", "developer-tooling", "marketing", "dark-default"]
  },
  "performance": {
    "lighthouseTargets": {
      "performance": 90,
      "accessibility": 95,
      "bestPractices": 95,
      "seo": 90
    }
  }
}
```

### 1.1 Required fields

| Field | Type | Purpose |
|-------|------|---------|
| `type` | `"template"` | Discriminator. |
| `category` | string | Template category (e.g. `"saas-landing"`, `"library-docs"`, `"personal-blog"`, `"issue-tracker"`, `"forme-foundry"`). |
| `pages` | object[] | Per-page route → file map. Each entry has `route`, `file`, `title`. Routes use file-based conventions; `[param]` and `[...slug]` segments are template-tool-specific. |
| `exports.pages` | string | Directory containing per-page Quoin source files. |
| `dependencies.tokenPack` | string | The token pack the template expects. |
| `dependencies.implementationPack` | string | The impl pack the template expects. |
| `dependencies.vocabularyPacks` | string[] | Vocabulary packs required to compile the template's pages. |

### 1.2 Optional fields

| Field | Type | Purpose |
|-------|------|---------|
| `dependencies.themePack` | string | Theme pack pre-selected by the template. |
| `dependencies.patternPacks` | string[] | Pattern packs the template references. |
| `dependencies.iconPacks` | string[] | Icon packs the template references. |
| `exports.public` | string | Static assets directory copied verbatim. |
| `exports.quoinConfig` | string | Path to a `quoin.config.json` the scaffold tool installs. |
| `performance.lighthouseTargets` | object | Per-metric minimum scores the template MUST achieve. |

## 2. Quality bar

Every template MUST satisfy the universal pack quality bar from the [`quoin-pack-author` skill](#) (Tailwind UI / DaisyUI / Astro Themes / shadcn Blocks / Mantine production parity). In addition:

- **Production-quality copy.** No Lorem ipsum, no placeholder names like "Acme Corp" or "John Doe". Real or credibly-mock brand names, descriptions, pricing, testimonials.
- **All states designed.** Empty, sparse, dense, error, loading, success.
- **All microstates.** Default, hover, active, focus, focus-visible, disabled, loading, read-only (inputs).
- **Accessibility.** Lighthouse ≥ 95; keyboard navigation; visible focus; skip links; APCA contrast.
- **Performance.** Lighthouse ≥ 90; LCP < 2.5s; CLS < 0.1; INP < 200ms; pages < 500KB excluding images.
- **Deep-linkability.** Filter / tab / pagination / panel state in URL; back-forward restores scroll.
- **Internationalization aware.** Layouts handle short / long content; RTL where applicable.

## 3. Compilation model

Templates are NOT compiled when imported as a dependency of another project. They are:

1. **Scaffolded** — `npx @quoin/create <template-name>` copies `exports.pages` + `exports.public` + `exports.quoinConfig` into a new project directory.
2. **Composed** — the new project's `quoin.config.json` lists the template's dependencies as the active pack stack.
3. **Compiled** — the new project's build (Vite + `@quoin/compiler/vite`) compiles the scaffolded source against the active pack stack, exactly as any non-template project would.

Templates therefore do not participate in the compile-time pack resolution chain ([`pack-types.md`](pack-types.md) §2).

## 4. Validation rules

A template pack is valid if and only if:

1. The manifest passes the discriminated schema (`type: "template"` + required fields).
2. Every page in `pages[]` references a file that exists relative to the pack root.
3. Every dependency in `dependencies` resolves to a pack that exists (by `name`) in the consumer's registry — the validator can't always check this offline, but it verifies the schema shape.
4. Page source files contain Quoin semantic markup that compiles cleanly against the declared `dependencies` (the validator may run a sample compile).
5. License is in the recognised SPDX set ([`pack-format.md`](pack-format.md) §9).

The deeper quality-bar verification (Lighthouse, accessibility, copy quality) is a manual + tooling-assisted operator review per template.

## 5. File layout

```
@quoin/template-<name>/
├── package.json
├── quoin.pack.json            # the manifest above
├── README.md
├── LICENSE
├── pages/                     # Quoin semantic source, one per route
│   ├── index.html
│   ├── pricing.html
│   └── docs/
│       └── [...slug].html
├── public/                    # static assets
├── quoin.config.json          # active pack stack the scaffold installs
└── examples/                  # screenshots, live URLs for catalog display
```

## 6. Cross-references

- [`pack-types.md`](pack-types.md) — composition order, distribution.
- [`pack-format.md`](pack-format.md) — manifest universals.
- Phase 5e (CLI + launch) — defines the `npx @quoin/create <template-name>` scaffold tool.
