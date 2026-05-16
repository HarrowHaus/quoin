/**
 * Live playground — browser-side compiler driver.
 *
 * Pulls the compiled compiler bundle from @quoin/compiler (Vite alias
 * to 01_compiler/dist) and a curated set of in-memory pack objects
 * from ./packs. On every input change, recompiles and updates both the
 * "Compiled HTML" pane and the live iframe render.
 */

import { compile } from "@quoin/compiler";
import {
  IMPL_PACKS,
  SHIM_CSS,
  TOKEN_PACKS,
  VOCAB_PACKS,
  type ImplPackId,
  type TokenPackId
} from "./packs";

const STARTER_SOURCE = `<canvas-block>
  <stack gap="loose">

    <authority-mark>Playground</authority-mark>

    <lead-graf>
      Edit this source. The compiler runs in your browser and renders
      the result on the right. Pick a different token pack from the
      dropdown — same source, different aesthetic.
    </lead-graf>

    <cluster>
      <primary-action>Save</primary-action>
      <secondary-action>Cancel</secondary-action>
      <destructive-action>Delete</destructive-action>
    </cluster>

    <alert-band intent="info">Tokens swapped at compile time. No runtime overhead.</alert-band>

    <emphasis-card>
      <stack>
        <lead-graf weight="emphasize">A line about the brand</lead-graf>
        <reading-flow>
          <p>
            Body prose inside reading-flow at the pack's chosen measure
            and leading. Try changing the token pack from the dropdown.
          </p>
        </reading-flow>
      </stack>
    </emphasis-card>

    <pull-quote>The grid is a refusal of chance.</pull-quote>

    <colophon>Composed live in the Quoin playground.</colophon>

  </stack>
</canvas-block>`;

const source = document.getElementById("source") as HTMLTextAreaElement;
const compiledEl = document.getElementById("compiled") as HTMLElement;
const renderFrame = document.getElementById("render") as HTMLIFrameElement;
const status = document.getElementById("playground-status") as HTMLElement;
const tokenSelect = document.getElementById("token-pack") as HTMLSelectElement;
const implSelect = document.getElementById("impl-pack") as HTMLSelectElement;
const tabs = document.querySelectorAll<HTMLButtonElement>("[data-tab][role='tab']");
const bodies = document.querySelectorAll<HTMLElement>(".tab-body[data-tab]");

function fillDropdown<T extends string>(
  el: HTMLSelectElement,
  options: T[],
  selected: T
): void {
  el.innerHTML = options
    .map(
      (o) =>
        `<option value="${o}" ${o === selected ? "selected" : ""}>${o}</option>`
    )
    .join("");
}

const tokenPackIds = Object.keys(TOKEN_PACKS) as TokenPackId[];
const implPackIds = Object.keys(IMPL_PACKS) as ImplPackId[];

let activeTokenPackId: TokenPackId = "tokens-baseline";
let activeImplPackId: ImplPackId = "impl-tailwind";

fillDropdown(tokenSelect, tokenPackIds, activeTokenPackId);
fillDropdown(implSelect, implPackIds, activeImplPackId);

source.value = STARTER_SOURCE;

function setStatus(text: string, state: "ok" | "error" | "idle" = "idle"): void {
  status.textContent = text;
  status.dataset.state = state;
}

function renderIntoFrame(html: string, css: string, implPackId: ImplPackId): void {
  // The render iframe gets the token pack's tokens.css plus, for the
  // Tailwind impl, the lab shim that resolves arbitrary-value classes.
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
  ${usesTailwind ? `<style>${SHIM_CSS}</style>` : ""}
</head><body>${html}</body></html>`;
  // Avoid using srcdoc directly for large content reliability — write
  // into the iframe's document.
  const doc = renderFrame.contentDocument;
  if (!doc) return;
  doc.open();
  doc.write(page);
  doc.close();
}

function recompile(): void {
  const tokenEntry = TOKEN_PACKS[activeTokenPackId];
  const impl = IMPL_PACKS[activeImplPackId];
  try {
    const result = compile({
      source: source.value,
      tokenPack: tokenEntry.pack,
      vocabularyPacks: VOCAB_PACKS,
      implementationPack: impl,
      filename: "playground.html"
    });
    compiledEl.textContent = result.html;
    renderIntoFrame(result.html, tokenEntry.css, activeImplPackId);
    const warnings = result.warnings.length;
    setStatus(
      `compiled — ${result.html.length} bytes${warnings > 0 ? ` (${warnings} non-fatal warnings)` : ""}`,
      "ok"
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    compiledEl.textContent = `// ${message}`;
    setStatus(`error: ${message.slice(0, 120)}`, "error");
  }
}

source.addEventListener("input", () => {
  recompile();
});
tokenSelect.addEventListener("change", () => {
  activeTokenPackId = tokenSelect.value as TokenPackId;
  recompile();
});
implSelect.addEventListener("change", () => {
  activeImplPackId = implSelect.value as ImplPackId;
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

// Wait one tick so the iframe finishes initialising before first write.
queueMicrotask(() => recompile());
