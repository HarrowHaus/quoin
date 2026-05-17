#!/usr/bin/env node
/**
 * Auto-generates the spec reference pages from 00_spec/*.md.
 * Run before `vite dev` / `vite build`. Output goes to spec/{name}/index.html.
 *
 * The generated pages use Quoin tags so the Quoin Vite plugin compiles
 * them during the build alongside the hand-written pages.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const here = path.dirname(fileURLToPath(import.meta.url));
const labRoot = path.resolve(here, "..", "..");
const specDir = path.join(labRoot, "00_spec");
const outRoot = path.resolve(here, "..", "spec");

const SPECS = [
  { slug: "spec", file: "spec.md", title: "Quoin specification" },
  { slug: "pack-format", file: "pack-format.md", title: "Pack format" },
  { slug: "primitives", file: "primitives.md", title: "V1 primitives" },
  { slug: "tokens", file: "tokens.md", title: "Token architecture" }
];

function layout({ title, slug, body }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)} — Quoin docs</title>
    <link rel="stylesheet" href="/tokens.css" />
    <link rel="stylesheet" href="/impl.css" />
    <link rel="stylesheet" href="/site.css" />
    <script type="module" src="/impl.js"></script>
  </head>
  <body class="min-h-screen" style="background: var(--surface); color: var(--text); font-family: var(--font-sans)">
    <wayfinder>
      <a href="/">Quoin</a>
      <a href="/spec/">Spec</a>
      <a href="/playground/">Playground</a>
      <a href="/packs/">Packs</a>
      <a href="/start/">Get started</a>
      <a href="https://github.com/harrowhaus/quoin">GitHub</a>
    </wayfinder>

    <canvas-block>
      <stack gap="loose">
        <breadcrumb-trail>
          <a href="/">Home</a>
          <span>/</span>
          <a href="/spec/">Spec</a>
          <span>/</span>
          <span>${escapeHtml(title)}</span>
        </breadcrumb-trail>

        <reading-flow>
          ${body}
        </reading-flow>

        <colophon>
          This page is generated from <code>00_spec/${slug === "spec" ? "spec.md" : slug + ".md"}</code> at build time.
          Edit the source markdown and re-run <code>npm run build</code> to update.
        </colophon>
      </stack>
    </canvas-block>
  </body>
</html>`;
}

function escapeHtml(s) {
  return String(s).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

async function main() {
  await fs.mkdir(outRoot, { recursive: true });
  // Generate the spec landing page first.
  const landing = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Specification — Quoin docs</title>
    <link rel="stylesheet" href="/tokens.css" />
    <link rel="stylesheet" href="/impl.css" />
    <link rel="stylesheet" href="/site.css" />
    <script type="module" src="/impl.js"></script>
  </head>
  <body class="min-h-screen" style="background: var(--surface); color: var(--text); font-family: var(--font-sans)">
    <wayfinder>
      <a href="/">Quoin</a>
      <a href="/spec/">Spec</a>
      <a href="/playground/">Playground</a>
      <a href="/packs/">Packs</a>
      <a href="/start/">Get started</a>
      <a href="https://github.com/harrowhaus/quoin">GitHub</a>
    </wayfinder>

    <canvas-block>
      <stack gap="loose">
        <breadcrumb-trail>
          <a href="/">Home</a>
          <span>/</span>
          <span>Spec</span>
        </breadcrumb-trail>

        <authority-mark>Specification</authority-mark>

        <lead-graf>
          Four short documents define the entire Quoin language. They are the
          canonical source — everything else, including this site, is built
          from them.
        </lead-graf>

        <feature-grid min-cell-width="280px">
          <feature-cell>
            <stack>
              <lead-graf weight="emphasize"><a href="/spec/spec/">Language reference</a></lead-graf>
              <recede-block>Authoring syntax, the five canonical attributes, cascade rules, compilation model, error model.</recede-block>
            </stack>
          </feature-cell>
          <feature-cell>
            <stack>
              <lead-graf weight="emphasize"><a href="/spec/pack-format/">Pack format</a></lead-graf>
              <recede-block>Manifest schema (full JSON Schema), directory layout, versioning rules, npm naming.</recede-block>
            </stack>
          </feature-cell>
          <feature-cell>
            <stack>
              <lead-graf weight="emphasize"><a href="/spec/primitives/">V1 primitives</a></lead-graf>
              <recede-block>36 semantic primitives across editorial, layout, navigation, state, content, and interactive categories.</recede-block>
            </stack>
          </feature-cell>
          <feature-cell>
            <stack>
              <lead-graf weight="emphasize"><a href="/spec/tokens/">Token architecture</a></lead-graf>
              <recede-block>Three-layer model, canonical semantic-token namespace, DTCG file format, project overrides.</recede-block>
            </stack>
          </feature-cell>
        </feature-grid>

        <colophon>Generated from 00_spec/ at build time.</colophon>
      </stack>
    </canvas-block>
  </body>
</html>`;
  await fs.writeFile(path.join(outRoot, "index.html"), landing);

  for (const spec of SPECS) {
    const src = await fs.readFile(path.join(specDir, spec.file), "utf8");
    const html = marked.parse(src, { gfm: true });
    const page = layout({ title: spec.title, slug: spec.slug, body: html });
    const dir = path.join(outRoot, spec.slug);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, "index.html"), page);
    console.log(`generated /spec/${spec.slug}/`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
