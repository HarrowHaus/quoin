# Phase 4 — Documentation

Status: pending phase 3 completion.

## Scope

Build the Quoin documentation site. The docs site is the primary public surface for the language and the largest in-the-wild demonstration of Quoin itself.

## Stack

- **Static site generator:** Astro (or equivalent — must build to static HTML, no server-side runtime)
- **Built with Quoin.** The docs site itself is authored in Quoin and compiled at build time. The site is its own largest demo.
- **Deploy target:** Single static site, CDN-served, no server dependencies.

## Required sections

### Spec reference

Auto-generated from `00_spec/`. The docs site MUST regenerate from spec source rather than duplicating content; if the spec changes, the docs update on next build.

### Live playground

Browser-side compiler instance:
- Left pane: user types semantic markup.
- Right pane: real-time compiled HTML + CSS + visual render.
- Top: dropdowns to pick a token pack and an implementation pack from any pack published under `@quoin/*`.

The playground is the most important demonstration of the language. It makes the four-layer architecture visible and interactive.

### Pack browser

Searchable catalog of every pack published under `@quoin/*` on npm. Pulls from the npm registry API at build time, caches results.

For each pack: type, version, description, npm install command, link to source.

### Getting started

Step-by-step guide:
1. Install the compiler (`npm install @quoin/compiler`)
2. Install one pack of each type
3. Write a first page
4. Build and view

Should produce a working Quoin page in under 5 minutes for a developer who has used Tailwind.

### Migration guides

Side-by-side comparisons:
- From Tailwind v4 to Quoin
- From DaisyUI to Quoin
- From shadcn/ui to Quoin

## Stylistic requirement

The docs site uses one of the harvested or reference token packs. The active pack should be documented prominently as a working demonstration of pack composition.

## Deliverables

- Astro project in `04_docs/`
- Local dev server (`npm run dev`) runs without error
- Production build (`npm run build`) produces static output
- All required sections present and functional
- Screenshots of key pages for the launch deliverables

## Exit criteria

See `../PHASE_GATES.md` (Phase 4 section).

## Prompt

See `../PHASE_PROMPTS.md` (Phase 4 section).
