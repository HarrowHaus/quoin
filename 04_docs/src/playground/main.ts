/**
 * Live playground — browser-side compiler driver.
 *
 * Phase 4.5 upgrade:
 *   - Three-pane layout (source / compiled HTML / preview).
 *   - All 30 token packs available with fidelity-tier badges.
 *   - Shareable URL state — `?p=<base64-source>&t=<tokenPackId>&i=<implId>&v=<vocab1,vocab2>`.
 *   - Token efficiency badge — counts Quoin tags vs emitted Tailwind
 *     classes and prints the ratio.
 *   - Example gallery — picking an example loads its source + vocabs.
 */

import { compile } from "@quoin/compiler";
import {
  COMPANION_CSS,
  IMPL_PACKS,
  SHIM_CSS,
  TOKEN_PACK_TIERS,
  TOKEN_PACKS,
  VOCAB_PACKS,
  type ImplPackId,
  type TokenPackId,
  type VocabPackId
} from "./packs";
import { PRESETS, type PresetId } from "./presets";

/* ─────────────── DOM handles ─────────────── */

const source = document.getElementById("source") as HTMLTextAreaElement;
const compiledEl = document.getElementById("compiled") as HTMLElement;
const renderFrame = document.getElementById("render") as HTMLIFrameElement;
const status = document.getElementById("playground-status") as HTMLElement;
const tokenSelect = document.getElementById("token-pack") as HTMLSelectElement;
const implSelect = document.getElementById("impl-pack") as HTMLSelectElement;
const presetSelect = document.getElementById("preset") as HTMLSelectElement;
const vocabChecks = document.getElementById("vocab-checks") as HTMLElement;
const efficiencyEl = document.getElementById("efficiency") as HTMLElement;
const tierBadgeEl = document.getElementById("token-tier") as HTMLElement;
const shareBtn = document.getElementById("share-link") as HTMLButtonElement;
const shareToast = document.getElementById("share-toast") as HTMLElement;

/* ─────────────── pack ID arrays ─────────────── */

const tokenPackIds = Object.keys(TOKEN_PACKS) as TokenPackId[];
const implPackIds = Object.keys(IMPL_PACKS) as ImplPackId[];
const vocabPackIds = Object.keys(VOCAB_PACKS) as VocabPackId[];
const presetIds = Object.keys(PRESETS) as PresetId[];

/* ─────────────── default state ─────────────── */

let activeTokenPackId: TokenPackId = "tokens-tailwind";
let activeImplPackId: ImplPackId = "impl-tailwind";
let activeVocabIds = new Set<VocabPackId>([
  "vocab-editorial",
  "vocab-dashboard",
  "vocab-essentials"
]);
let activePresetId: PresetId = "hero";

/* ─────────────── populate dropdowns ─────────────── */

function tierLabel(id: TokenPackId): string {
  const tier = TOKEN_PACK_TIERS[id];
  if (!tier) return ""; // reference packs
  return ` · ${tier}`;
}

function fillTokenSelect(): void {
  tokenSelect.innerHTML = tokenPackIds
    .map((id) => {
      const label = `${id}${tierLabel(id)}`;
      return `<option value="${id}" ${id === activeTokenPackId ? "selected" : ""}>${label}</option>`;
    })
    .join("");
}

function fillImplSelect(): void {
  implSelect.innerHTML = implPackIds
    .map(
      (id) =>
        `<option value="${id}" ${id === activeImplPackId ? "selected" : ""}>${id}</option>`
    )
    .join("");
}

function fillPresetSelect(): void {
  presetSelect.innerHTML =
    `<option value="">— Examples —</option>` +
    presetIds
      .map((id) => `<option value="${id}">${PRESETS[id].label}</option>`)
      .join("");
}

fillTokenSelect();
fillImplSelect();
fillPresetSelect();

/* ─────────────── tier badge ─────────────── */

function updateTierBadge(): void {
  const tier = TOKEN_PACK_TIERS[activeTokenPackId];
  if (!tier) {
    tierBadgeEl.textContent = "reference";
    tierBadgeEl.dataset.tier = "ref";
    return;
  }
  tierBadgeEl.textContent = `Tier ${tier}`;
  tierBadgeEl.dataset.tier = tier;
}

/* ─────────────── vocab checkboxes ─────────────── */

function renderVocabChecks(): void {
  vocabChecks.innerHTML = vocabPackIds
    .map(
      (id) => `
      <label class="vocab-check">
        <input type="checkbox" data-vocab="${id}" ${activeVocabIds.has(id) ? "checked" : ""} />
        <code>${id}</code>
      </label>
    `
    )
    .join("");
  vocabChecks.querySelectorAll<HTMLInputElement>("[data-vocab]").forEach((cb) => {
    cb.addEventListener("change", () => {
      const id = cb.dataset.vocab as VocabPackId;
      if (cb.checked) activeVocabIds.add(id);
      else activeVocabIds.delete(id);
      recompile();
      updateUrl();
    });
  });
}

/* ─────────────── URL state ─────────────── */

interface UrlState {
  source?: string;
  token?: TokenPackId;
  impl?: ImplPackId;
  vocabs?: VocabPackId[];
}

function encodeUrlState(state: UrlState): string {
  const parts: string[] = [];
  if (state.source) {
    try {
      parts.push(`p=${btoa(unescape(encodeURIComponent(state.source)))}`);
    } catch {
      // Skip on encoding error
    }
  }
  if (state.token) parts.push(`t=${state.token}`);
  if (state.impl) parts.push(`i=${state.impl}`);
  if (state.vocabs && state.vocabs.length) parts.push(`v=${state.vocabs.join(",")}`);
  return parts.join("&");
}

function decodeUrlState(hash: string): UrlState {
  const params = new URLSearchParams(hash.replace(/^#/, ""));
  const out: UrlState = {};
  const p = params.get("p");
  if (p) {
    try {
      out.source = decodeURIComponent(escape(atob(p)));
    } catch {
      // ignore
    }
  }
  const t = params.get("t");
  if (t && (t as TokenPackId) in TOKEN_PACKS) out.token = t as TokenPackId;
  const i = params.get("i");
  if (i && (i as ImplPackId) in IMPL_PACKS) out.impl = i as ImplPackId;
  const v = params.get("v");
  if (v) {
    out.vocabs = v
      .split(",")
      .filter((id) => (id as VocabPackId) in VOCAB_PACKS) as VocabPackId[];
  }
  return out;
}

function updateUrl(): void {
  const enc = encodeUrlState({
    source: source.value,
    token: activeTokenPackId,
    impl: activeImplPackId,
    vocabs: [...activeVocabIds]
  });
  // Use replaceState to avoid spamming history on every keystroke.
  history.replaceState(null, "", `#${enc}`);
}

function copyShareUrl(): void {
  const enc = encodeUrlState({
    source: source.value,
    token: activeTokenPackId,
    impl: activeImplPackId,
    vocabs: [...activeVocabIds]
  });
  const url = `${location.origin}${location.pathname}#${enc}`;
  navigator.clipboard
    .writeText(url)
    .then(() => {
      shareToast.textContent = "Link copied";
      shareToast.dataset.state = "ok";
      setTimeout(() => {
        shareToast.textContent = "";
        delete shareToast.dataset.state;
      }, 2200);
    })
    .catch(() => {
      shareToast.textContent = `Copy failed — ${url}`;
      shareToast.dataset.state = "error";
    });
}

/* ─────────────── render plumbing ─────────────── */

function setStatus(text: string, state: "ok" | "error" | "idle" = "idle"): void {
  status.textContent = text;
  status.dataset.state = state;
}

function renderIntoFrame(html: string, css: string, implPackId: ImplPackId): void {
  const usesTailwind = implPackId === "impl-tailwind";
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
  ${usesTailwind ? `<style>${SHIM_CSS}</style><style>${COMPANION_CSS}</style>` : ""}
</head><body>${html}</body></html>`;
  const doc = renderFrame.contentDocument;
  if (!doc) return;
  doc.open();
  doc.write(page);
  doc.close();
}

/* ─────────────── efficiency metric ─────────────── */

function countQuoinTags(src: string): number {
  // Count opening tags whose name contains a hyphen (custom element).
  let count = 0;
  const re = /<([a-z][a-z0-9]*(?:-[a-z0-9]+)+)\b/gi;
  let m;
  while ((m = re.exec(src)) !== null) count++;
  return count;
}

function countTailwindClasses(html: string): number {
  // Sum the length of every `class="..."` attribute, counting tokens.
  let count = 0;
  const re = /class="([^"]+)"/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    count += m[1].split(/\s+/).filter(Boolean).length;
  }
  return count;
}

function updateEfficiencyBadge(quoinTags: number, classCount: number): void {
  if (quoinTags === 0) {
    efficiencyEl.textContent = "";
    return;
  }
  const ratio = classCount > 0 ? Math.round(classCount / quoinTags) : 0;
  efficiencyEl.textContent =
    ratio > 0
      ? `${quoinTags} tags → ${classCount} classes · ${ratio}× compression`
      : `${quoinTags} tags → ${classCount} classes`;
}

/* ─────────────── compile loop ─────────────── */

function recompile(): void {
  const tokenEntry = TOKEN_PACKS[activeTokenPackId];
  const impl = IMPL_PACKS[activeImplPackId];
  const vocabs = Array.from(activeVocabIds).map((id) => VOCAB_PACKS[id]);
  if (vocabs.length === 0) {
    setStatus("error: pick at least one vocab pack", "error");
    compiledEl.textContent = "// pick at least one vocab pack from the Vocab packs fieldset";
    markFrameError();
    updateEfficiencyBadge(0, 0);
    return;
  }
  try {
    const result = compile({
      source: source.value,
      tokenPack: tokenEntry.pack,
      vocabularyPacks: vocabs,
      implementationPack: impl,
      filename: "playground.html"
    });
    compiledEl.textContent = result.html;
    renderIntoFrame(result.html, tokenEntry.css, activeImplPackId);
    setStatus(`compiled — ${result.html.length} bytes`, "ok");
    clearFrameError();
    const tagCount = countQuoinTags(source.value);
    const classCount =
      activeImplPackId === "impl-tailwind"
        ? countTailwindClasses(result.html)
        : 0;
    updateEfficiencyBadge(tagCount, classCount);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    compiledEl.textContent = `// ${message}`;
    setStatus(`error: ${message.slice(0, 120)}`, "error");
    markFrameError();
    updateEfficiencyBadge(0, 0);
  }
}

function markFrameError(): void {
  renderFrame.style.opacity = "0.35";
  renderFrame.style.outline = "2px solid var(--critical, #c33)";
  renderFrame.style.outlineOffset = "-2px";
}

function clearFrameError(): void {
  renderFrame.style.opacity = "";
  renderFrame.style.outline = "";
  renderFrame.style.outlineOffset = "";
}

/* ─────────────── load initial state ─────────────── */

function loadFromUrlOrDefault(): void {
  const fromUrl = decodeUrlState(location.hash);
  if (fromUrl.source) source.value = fromUrl.source;
  else source.value = PRESETS[activePresetId].source;
  if (fromUrl.token) activeTokenPackId = fromUrl.token;
  if (fromUrl.impl) activeImplPackId = fromUrl.impl;
  if (fromUrl.vocabs) activeVocabIds = new Set(fromUrl.vocabs);
  if (activeVocabIds.size === 0) {
    activeVocabIds = new Set([
      "vocab-editorial",
      "vocab-dashboard",
      "vocab-essentials"
    ]);
  }
  fillTokenSelect();
  fillImplSelect();
  renderVocabChecks();
  updateTierBadge();
}

renderVocabChecks();
loadFromUrlOrDefault();

/* ─────────────── wire events ─────────────── */

source.addEventListener("input", () => {
  recompile();
  updateUrl();
});

tokenSelect.addEventListener("change", () => {
  activeTokenPackId = tokenSelect.value as TokenPackId;
  updateTierBadge();
  recompile();
  updateUrl();
});

implSelect.addEventListener("change", () => {
  activeImplPackId = implSelect.value as ImplPackId;
  recompile();
  updateUrl();
});

presetSelect.addEventListener("change", () => {
  if (!presetSelect.value) return;
  activePresetId = presetSelect.value as PresetId;
  const preset = PRESETS[activePresetId];
  source.value = preset.source;
  activeVocabIds = new Set(preset.vocabs);
  renderVocabChecks();
  recompile();
  updateUrl();
  // Reset selection so the same preset can be reloaded.
  presetSelect.value = "";
});

shareBtn.addEventListener("click", copyShareUrl);

// Tabs on the secondary pane (compiled HTML vs preview).
const tabs = document.querySelectorAll<HTMLButtonElement>("[data-tab][role='tab']");
const bodies = document.querySelectorAll<HTMLElement>(".tab-body[data-tab]");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab!;
    tabs.forEach((t) => t.setAttribute("aria-selected", t === tab ? "true" : "false"));
    bodies.forEach((b) => {
      b.dataset.active = b.dataset.tab === target ? "true" : "false";
    });
  });
});

queueMicrotask(() => recompile());
