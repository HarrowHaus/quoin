# @quoin/template-blank-reference

Minimal reference template for Quoin. Scaffolds a single page wired
to baseline tokens, essentials vocabulary, the reference theme, and
the reference icon set.

## What a template pack does

Unlike token / vocabulary / impl packs, template packs are **not**
compiled at build time. They're scaffolded:

```bash
npx @quoin/create blank-reference my-site
```

which copies `pages/`, `public/` (if present), and `quoin.config.json`
into a fresh project directory, installs the pack dependencies listed
in `quoin.pack.json` → `dependencies`, and leaves you with an
authoring-ready Quoin project.

## Quality bar

A template MUST ship:

- Production-quality copy (not lorem ipsum) on at least the index
  page.
- A working preview path so consumers can render the template before
  installing.
- All declared pages wired to the same `quoin.config.json` pack set.

Reference templates target **shadcn Blocks / Astro Themes / Tailwind UI**
quality — distributable to real consumers without further design work.

## Dependencies

| Role | Pack |
|------|------|
| Token pack | `@quoin/tokens-baseline` |
| Implementation pack | `@quoin/impl-tailwind` |
| Vocabulary packs | `@quoin/vocab-essentials` |
| Theme pack | `@quoin/theme-baseline-reference` |
| Icon packs | `@quoin/icons-reference` |

Swap any of these via `quoin.config.json` after scaffolding to retarget
the template against a different aesthetic.

## License

MIT. The template scaffold (page sources + config) is freely
redistributable.
