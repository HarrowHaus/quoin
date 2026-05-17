/**
 * Pack browser — client-side filtering of the catalog JSON.
 *
 * Phase 4.5 additions:
 *   - Fidelity-tier badges on every token pack card (A / B / C).
 *   - Filter chips for type, fidelity tier, license.
 *   - "Try in playground" deep link encoding pack into the playground
 *     URL hash.
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
  fidelityTier: "A" | "B" | "C" | null;
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
const typeFilters = document.querySelectorAll<HTMLButtonElement>("[data-filter-type]");
const tierFilters = document.querySelectorAll<HTMLButtonElement>("[data-filter-tier]");
const licenseFilters = document.querySelectorAll<HTMLButtonElement>("[data-filter-license]");

let activeType: string = "all";
let activeTier: string = "all";
let activeLicense: string = "all";
let activeQuery: string = "";

function escape(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function tierBadge(tier: "A" | "B" | "C" | null): string {
  if (!tier) return "";
  const colors: Record<string, { bg: string; fg: string }> = {
    A: { bg: "var(--success)", fg: "var(--text-on-success)" },
    B: { bg: "var(--info)", fg: "var(--text-on-info)" },
    C: { bg: "var(--warning)", fg: "var(--text-on-warning)" }
  };
  const titles: Record<string, string> = {
    A: "Tier A — byte-faithful extraction from canonical source.",
    B: "Tier B — extracted with documented mapping decisions.",
    C: "Tier C — designed approximation; source unresolvable."
  };
  const c = colors[tier];
  return `<span title="${titles[tier]}" style="font-family: var(--font-mono); font-size: var(--type-size-xs); padding: 0.1em 0.55em; border-radius: var(--radius-pill); background: ${c.bg}; color: ${c.fg}; font-weight: 500">Tier ${tier}</span>`;
}

function playgroundDeepLink(pack: Pack): string {
  if (pack.type !== "token") return "";
  return `/playground/#t=${encodeURIComponent(pack.name.replace(/^@quoin\//, ""))}`;
}

function render(): void {
  const matching = data.packs.filter((p) => {
    if (activeType !== "all" && p.type !== activeType) return false;
    if (activeTier !== "all") {
      if (activeTier === "none" && p.fidelityTier !== null) return false;
      if (activeTier !== "none" && p.fidelityTier !== activeTier) return false;
    }
    if (activeLicense !== "all" && p.license !== activeLicense) return false;
    if (activeQuery.length > 0) {
      const hay =
        `${p.name} ${p.description} ${p.tags.join(" ")} ${p.attribution?.sourceSystem ?? ""}`.toLowerCase();
      if (!hay.includes(activeQuery)) return false;
    }
    return true;
  });

  counts.textContent =
    matching.length === data.packs.length
      ? `${data.packs.length} packs — ${data.counts.byType.token} token, ${data.counts.byType.vocabulary} vocabulary, ${data.counts.byType.implementation} implementation. Catalog generated ${data.generatedAt}.`
      : `${matching.length} of ${data.packs.length} packs match the active filters.`;

  grid.innerHTML = matching
    .map((p) => {
      const npmCmd = `npm install ${p.name}`;
      const typeLabel = {
        token: "token",
        vocabulary: "vocabulary",
        implementation: "implementation"
      }[p.type];
      const attrLine = p.attribution
        ? `<div style="font-size: var(--type-size-xs); color: var(--text-recede)">Source: ${escape(
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
      const playLink = playgroundDeepLink(p);
      const playgroundLink = playLink
        ? `<a href="${playLink}" style="font-size: var(--type-size-sm)">try in playground ↗</a>`
        : "";
      return `
        <article style="background: var(--surface-elevated); border: 1px solid var(--border); border-radius: var(--radius-card); padding: var(--space-card); display: flex; flex-direction: column; gap: 0.75rem">
          <header style="display: flex; align-items: baseline; gap: 0.5rem; flex-wrap: wrap">
            <code style="font-size: var(--type-size-sm); color: var(--text-emphasis); font-weight: 500">${escape(p.name)}</code>
            <span style="font-size: var(--type-size-xs); color: var(--text-recede); font-family: var(--font-mono)">v${escape(p.version)}</span>
            <span style="font-size: var(--type-size-xs); padding: 0.125rem 0.5rem; background: var(--surface-recessed); color: var(--text-recede); border-radius: var(--radius-pill); font-family: var(--font-mono)">${escape(typeLabel)}</span>
            <span style="font-size: var(--type-size-xs); color: var(--text-recede); font-family: var(--font-mono)">${escape(p.license)}</span>
            ${tierBadge(p.fidelityTier)}
          </header>
          <p style="margin: 0; font-size: var(--type-size-sm); color: var(--text)">${escape(p.description)}</p>
          ${attrLine}
          <pre style="background: var(--surface-recessed); padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); margin: 0; font-family: var(--font-mono); font-size: var(--type-size-xs); overflow-x: auto"><code>${escape(npmCmd)}</code></pre>
          <div style="display: flex; gap: 1rem; margin-top: auto; flex-wrap: wrap">
            ${repoLink}
            ${sourceLink}
            ${playgroundLink}
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

function bindFilterGroup(
  els: NodeListOf<HTMLButtonElement>,
  attr: string,
  apply: (value: string) => void
): void {
  els.forEach((b) => {
    b.addEventListener("click", () => {
      els.forEach((other) => other.setAttribute("aria-selected", "false"));
      b.setAttribute("aria-selected", "true");
      apply(b.dataset[attr] ?? "all");
      render();
    });
  });
}

bindFilterGroup(typeFilters, "filterType", (v) => (activeType = v));
bindFilterGroup(tierFilters, "filterTier", (v) => (activeTier = v));
bindFilterGroup(licenseFilters, "filterLicense", (v) => (activeLicense = v));

search.addEventListener("input", () => {
  activeQuery = search.value.trim().toLowerCase();
  render();
});

render();
