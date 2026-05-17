/**
 * Live playground — browser-side compiler driver.
 *
 * Pulls the compiled compiler bundle from @quoin/compiler (Vite alias
 * to 01_compiler/dist/browser.js) and a curated set of in-memory pack
 * objects from ./packs. On any input change, recompiles and updates
 * both the compiled-HTML pane and the live iframe render.
 *
 * Phase 5e additions:
 *   - Preset selector loads one of four seed sources (article /
 *     marketing / dashboard / app-shell) AND auto-toggles the vocab
 *     packs each seed needs.
 *   - Vocab-pack multi-select checkboxes let the user load any
 *     combination of the 8 preloaded vocabs alongside the active
 *     token + impl pack.
 */

import { compile } from "@quoin/compiler";
import {
  COMPANION_CSS,
  IMPL_PACKS,
  SHIM_CSS,
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
const tabs = document.querySelectorAll<HTMLButtonElement>("[data-tab][role='tab']");
const bodies = document.querySelectorAll<HTMLElement>(".tab-body[data-tab]");

/* ─────────────── populate dropdowns ─────────────── */

function fillDropdown<T extends string>(
  el: HTMLSelectElement,
  options: T[],
  selected: T,
  labels: Record<string, string> = {}
): void {
  el.innerHTML = options
    .map(
      (o) =>
        `<option value="${o}" ${o === selected ? "selected" : ""}>${labels[o] ?? o}</option>`
    )
    .join("");
}

const tokenPackIds = Object.keys(TOKEN_PACKS) as TokenPackId[];
const implPackIds = Object.keys(IMPL_PACKS) as ImplPackId[];
const vocabPackIds = Object.keys(VOCAB_PACKS) as VocabPackId[];
const presetIds = Object.keys(PRESETS) as PresetId[];

let activeTokenPackId: TokenPackId = "tokens-baseline";
let activeImplPackId: ImplPackId = "impl-tailwind";
let activeVocabIds = new Set<VocabPackId>(["vocab-editorial", "vocab-dashboard"]);
let activePresetId: PresetId = "article";

fillDropdown(tokenSelect, tokenPackIds, activeTokenPackId);
fillDropdown(implSelect, implPackIds, activeImplPackId);
fillDropdown(
  presetSelect,
  presetIds,
  activePresetId,
  Object.fromEntries(presetIds.map((id) => [id, PRESETS[id].label]))
);

/* ─────────────── vocab checkboxes ─────────────── */

function renderVocabChecks(): void {
  vocabChecks.innerHTML = vocabPackIds
    .map(
      (id) => `
      <label style="display: inline-flex; align-items: center; gap: 0.375rem; cursor: pointer">
        <input type="checkbox" data-vocab="${id}" ${activeVocabIds.has(id) ? "checked" : ""} />
        <code style="font-family: var(--font-mono); font-size: var(--type-size-xs)">${id}</code>
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
    });
  });
}
renderVocabChecks();

/* ─────────────── initial seed ─────────────── */

source.value = PRESETS[activePresetId].source;

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

function recompile(): void {
  const tokenEntry = TOKEN_PACKS[activeTokenPackId];
  const impl = IMPL_PACKS[activeImplPackId];
  const vocabs = Array.from(activeVocabIds).map((id) => VOCAB_PACKS[id]);
  if (vocabs.length === 0) {
    setStatus("error: pick at least one vocab pack", "error");
    compiledEl.textContent = "// pick at least one vocab pack from the Vocab packs fieldset";
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
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    compiledEl.textContent = `// ${message}`;
    setStatus(`error: ${message.slice(0, 120)}`, "error");
  }
}

/* ─────────────── wire events ─────────────── */

source.addEventListener("input", recompile);

tokenSelect.addEventListener("change", () => {
  activeTokenPackId = tokenSelect.value as TokenPackId;
  recompile();
});
implSelect.addEventListener("change", () => {
  activeImplPackId = implSelect.value as ImplPackId;
  recompile();
});

presetSelect.addEventListener("change", () => {
  activePresetId = presetSelect.value as PresetId;
  const preset = PRESETS[activePresetId];
  source.value = preset.source;
  // Auto-toggle vocab checkboxes to match the preset's needs
  activeVocabIds = new Set(preset.vocabs);
  renderVocabChecks();
  recompile();
});

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
