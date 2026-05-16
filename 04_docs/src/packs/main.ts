/**
 * Pack browser — client-side filtering of the catalog JSON.
 *
 * Catalog is generated at build time by scripts/build-pack-catalog.js
 * from the local 02_reference-packs/ and 03_harvest/packs/ directories.
 * Phase 5 will swap the source to the npm registry without changing the
 * consumed JSON shape.
 */

import catalog from "../../generated/packs.json";

interface Pack {
  name: string;
  version: string;
  type: "token" | "vocabulary" | "implementation";
  description: string;
  license: string;
  tags: string[];
  source: "reference" | "harvest";
  attribution: null | {
    sourceSystem: string;
    sourceOrganization?: string;
    sourceUrl?: string;
    sourceLicense: string;
    harvestedAt: string;
  };
  dir: string;
}

interface Catalog {
  generatedAt: string;
  source: string;
  counts: {
    total: number;
    reference: number;
    harvest: number;
    byType: { token: number; vocabulary: number; implementation: number };
  };
  packs: Pack[];
}

const data = catalog as Catalog;

const grid = document.getElementById("pack-grid") as HTMLElement;
const counts = document.getElementById("pack-counts") as HTMLElement;
const search = document.querySelector('input[name="q"]') as HTMLInputElement;
const filters = document.querySelectorAll<HTMLButtonElement>(
  "[data-filter]"
);

let activeFilter: string = "all";
let activeQuery: string = "";

function escape(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function render(): void {
  const matching = data.packs.filter((p) => {
    if (activeFilter !== "all" && p.type !== activeFilter) return false;
    if (activeQuery.length > 0) {
      const hay =
        `${p.name} ${p.description} ${p.tags.join(" ")} ${p.attribution?.sourceSystem ?? ""}`.toLowerCase();
      return hay.includes(activeQuery);
    }
    return true;
  });

  counts.textContent =
    matching.length === data.packs.length
      ? `${data.packs.length} packs — ${data.counts.byType.token} token, ${data.counts.byType.vocabulary} vocabulary, ${data.counts.byType.implementation} implementation. Catalog generated ${data.generatedAt}.`
      : `${matching.length} of ${data.packs.length} packs match.`;

  grid.innerHTML = matching
    .map((p) => {
      const npmCmd = `npm install ${p.name}`;
      const typeLabel = {
        token: "token",
        vocabulary: "vocabulary",
        implementation: "implementation"
      }[p.type];
      const attrLine = p.attribution
        ? `<div style="font-size: var(--type-size-xs); color: var(--text-recede); margin-top: 0.5rem">Source: ${escape(
            p.attribution.sourceSystem
          )}${
            p.attribution.sourceOrganization
              ? ` (${escape(p.attribution.sourceOrganization)})`
              : ""
          } · ${escape(p.attribution.sourceLicense)}</div>`
        : "";
      const sourceLink = p.attribution?.sourceUrl
        ? `<a href="${escape(p.attribution.sourceUrl)}" target="_blank" rel="noopener" style="font-size: var(--type-size-sm)">source ↗</a>`
        : "";
      const repoLink = `<a href="https://github.com/harrowhaus/quoin/tree/main/${escape(p.dir)}" target="_blank" rel="noopener" style="font-size: var(--type-size-sm)">repo ↗</a>`;
      return `
        <article style="background: var(--surface-elevated); border: 1px solid var(--border); border-radius: var(--radius-card); padding: var(--space-card); display: flex; flex-direction: column; gap: 0.75rem">
          <header style="display: flex; align-items: baseline; gap: 0.5rem; flex-wrap: wrap">
            <code style="font-size: var(--type-size-sm); color: var(--text-emphasis); font-weight: 500">${escape(p.name)}</code>
            <span style="font-size: var(--type-size-xs); color: var(--text-recede); font-family: var(--font-mono)">v${escape(p.version)}</span>
            <span style="font-size: var(--type-size-xs); padding: 0.125rem 0.5rem; background: var(--surface-recessed); color: var(--text-recede); border-radius: var(--radius-pill); font-family: var(--font-mono)">${escape(typeLabel)}</span>
            <span style="font-size: var(--type-size-xs); color: var(--text-recede); font-family: var(--font-mono)">${escape(p.license)}</span>
          </header>
          <p style="margin: 0; font-size: var(--type-size-sm); color: var(--text)">${escape(p.description)}</p>
          ${attrLine}
          <pre style="background: var(--surface-recessed); padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); margin: 0; font-family: var(--font-mono); font-size: var(--type-size-xs); overflow-x: auto"><code>${escape(npmCmd)}</code></pre>
          <div style="display: flex; gap: 1rem; margin-top: auto">
            ${repoLink}
            ${sourceLink}
          </div>
        </article>
      `;
    })
    .join("");

  if (matching.length === 0) {
    grid.innerHTML =
      '<div style="color: var(--text-recede); padding: var(--space-8); text-align: center">No packs match the current filter.</div>';
  }
}

filters.forEach((b) => {
  b.addEventListener("click", () => {
    filters.forEach((other) => other.setAttribute("aria-selected", "false"));
    b.setAttribute("aria-selected", "true");
    activeFilter = b.dataset.filter ?? "all";
    render();
  });
});

search.addEventListener("input", () => {
  activeQuery = search.value.trim().toLowerCase();
  render();
});

render();
