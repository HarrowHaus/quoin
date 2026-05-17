/**
 * Showcase driver — compiles one Quoin source against four token
 * packs and renders each into its own iframe alongside license +
 * fidelity-tier metadata.
 *
 * The four packs picked here are intentionally diverse: monochrome
 * (Geist), utility-stack (Tailwind v4), 12-step neutral (Radix), and
 * tonal-palette (Material 3). Each renders the same composition with
 * a recognisable aesthetic.
 */

import { compile } from "@quoin/compiler";
import {
  SHOWCASE_COMPANION_CSS as COMPANION_CSS,
  SHOWCASE_IMPL,
  SHOWCASE_SHIM_CSS as SHIM_CSS,
  SHOWCASE_TOKEN_PACKS as TOKEN_PACKS,
  SHOWCASE_VOCABS,
  type ShowcasePackId
} from "./packs";

type TokenPackId = ShowcasePackId;

interface ShowcasePack {
  id: TokenPackId;
  label: string;
  source: string;
  license: string;
  fidelityTier: "A" | "B" | "C";
}

const PACKS: ShowcasePack[] = [
  { id: "tokens-tailwind", label: "Tailwind v4", source: "Tailwind Labs", license: "MIT", fidelityTier: "A" },
  { id: "tokens-radix", label: "Radix Colors", source: "WorkOS / Radix UI", license: "MIT", fidelityTier: "B" },
  { id: "tokens-geist", label: "Geist", source: "Vercel", license: "MIT", fidelityTier: "C" },
  { id: "tokens-material3", label: "Material 3", source: "Google", license: "Apache-2.0", fidelityTier: "B" }
];

const SHOWCASE_SOURCE = `<hero-banner variant="centered">
  <stack gap="loose">
    <authority-mark>Tools for people who write code.</authority-mark>
    <lead-graf>
      A small studio. We design and build software in the open —
      interfaces, languages, and operating procedures that outlive
      their first user.
    </lead-graf>
    <cluster>
      <primary-action>See the work</primary-action>
      <secondary-action>Read the journal</secondary-action>
    </cluster>
  </stack>
</hero-banner>

<canvas-block>
  <stack gap="loose">

    <columns ratio="1:1:1:1">
      <stat-display>
        <div style="font-size: 3rem; font-family: var(--font-display); line-height: 1">12</div>
        <recede-block>shipped projects</recede-block>
      </stat-display>
      <stat-display>
        <div style="font-size: 3rem; font-family: var(--font-display); line-height: 1">4</div>
        <recede-block>active engagements</recede-block>
      </stat-display>
      <stat-display intent="success">
        <div style="font-size: 3rem; font-family: var(--font-display); line-height: 1">96%</div>
        <recede-block>client retention</recede-block>
      </stat-display>
      <stat-display>
        <div style="font-size: 3rem; font-family: var(--font-display); line-height: 1">7yr</div>
        <recede-block>average engagement</recede-block>
      </stat-display>
    </columns>

    <feature-grid min-cell-width="240px">
      <feature-cell>
        <stack>
          <lead-graf weight="emphasize">Languages</lead-graf>
          <recede-block>Small DSLs, semantic compilers, type-driven tooling.</recede-block>
        </stack>
      </feature-cell>
      <feature-cell>
        <stack>
          <lead-graf weight="emphasize">Interfaces</lead-graf>
          <recede-block>Editorial product surfaces. Long-form reading, dense data, internal tooling.</recede-block>
        </stack>
      </feature-cell>
      <feature-cell>
        <stack>
          <lead-graf weight="emphasize">Operations</lead-graf>
          <recede-block>How small teams ship without the overhead of a large one.</recede-block>
        </stack>
      </feature-cell>
    </feature-grid>

    <cta-band variant="split">
      <stack>
        <authority-mark weight="emphasize">Have something specific in mind?</authority-mark>
        <recede-block>Send a short note.</recede-block>
      </stack>
      <cluster>
        <primary-action>Get in touch</primary-action>
        <secondary-action>See calendar</secondary-action>
      </cluster>
    </cta-band>

  </stack>
</canvas-block>`;

/* ─────────────── DOM ─────────────── */

const sourceDisplay = document.getElementById("showcase-source-display") as HTMLElement;
const grid = document.getElementById("showcase-grid") as HTMLElement;

sourceDisplay.textContent = SHOWCASE_SOURCE;

/* ─────────────── render plumbing ─────────────── */

function renderIntoFrame(frame: HTMLIFrameElement, html: string, css: string): void {
  const page = `<!doctype html>
<html><head>
  <meta charset="utf-8">
  <base target="_parent">
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body { margin: 0; padding: 1rem; font-family: var(--font-sans, system-ui); background: var(--surface, #fff); color: var(--text, #111); line-height: 1.4; }
    a { color: inherit; }
    button { font: inherit; cursor: pointer; }
    pre, code { font-family: var(--font-mono, ui-monospace, monospace); }
  </style>
  <style>${css}</style>
  <style>${SHIM_CSS}</style>
  <style>${COMPANION_CSS}</style>
</head><body>${html}</body></html>`;
  const doc = frame.contentDocument;
  if (!doc) return;
  doc.open();
  doc.write(page);
  doc.close();
}

function compilePack(pack: ShowcasePack): string {
  const tokenEntry = TOKEN_PACKS[pack.id];
  try {
    const result = compile({
      source: SHOWCASE_SOURCE,
      tokenPack: tokenEntry.pack,
      vocabularyPacks: SHOWCASE_VOCABS,
      implementationPack: SHOWCASE_IMPL,
      filename: "showcase.html"
    });
    return result.html;
  } catch (err) {
    return `<pre style="padding: 1rem; color: var(--critical); white-space: pre-wrap">${(err as Error).message}</pre>`;
  }
}

function tierBadge(tier: "A" | "B" | "C"): string {
  const label = { A: "Tier A", B: "Tier B", C: "Tier C" }[tier];
  return `<span class="showcase-tier showcase-tier-${tier.toLowerCase()}">${label}</span>`;
}

function renderGrid(): void {
  grid.innerHTML = "";
  for (const pack of PACKS) {
    const cell = document.createElement("section");
    cell.className = "showcase-cell";
    cell.innerHTML = `
      <header class="showcase-cell-header">
        <span class="showcase-cell-name">${pack.id}</span>
        ${tierBadge(pack.fidelityTier)}
        <span class="showcase-cell-meta">${pack.source} · ${pack.license}</span>
      </header>
      <iframe title="${pack.label} rendering" loading="lazy"></iframe>
    `;
    grid.appendChild(cell);
    const frame = cell.querySelector("iframe") as HTMLIFrameElement;
    const html = compilePack(pack);
    const css = TOKEN_PACKS[pack.id].css;
    queueMicrotask(() => renderIntoFrame(frame, html, css));
  }
}

renderGrid();
