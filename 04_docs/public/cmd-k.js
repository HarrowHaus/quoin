/**
 * Quoin docs site — global Cmd-K command menu.
 *
 * Injects a <dialog data-quoin-command-menu> into the document on
 * load, then calls window.QuoinCompanion.init() so the companion.js
 * Cmd-K handler from @quoin/impl-tailwind picks it up. Pure DOM, no
 * dependencies.
 *
 * The menu lists every docs page as a jump target plus a few external
 * links. Filter input narrows by label as the user types.
 */

const TARGETS = [
  { label: "Home", path: "/", group: "Pages" },
  { label: "Get started", path: "/start/", group: "Pages" },
  { label: "Playground", path: "/playground/", group: "Pages" },
  { label: "Pack browser", path: "/packs/", group: "Pages" },
  { label: "Components", path: "/components/", group: "Pages" },
  { label: "Specification — Language reference", path: "/spec/spec/", group: "Spec" },
  { label: "Specification — Pack format", path: "/spec/pack-format/", group: "Spec" },
  { label: "Specification — Primitives", path: "/spec/primitives/", group: "Spec" },
  { label: "Specification — Tokens", path: "/spec/tokens/", group: "Spec" },
  { label: "Migrate from Tailwind", path: "/migrate/tailwind/", group: "Migrate" },
  { label: "Migrate from DaisyUI", path: "/migrate/daisyui/", group: "Migrate" },
  { label: "Migrate from shadcn/ui", path: "/migrate/shadcn/", group: "Migrate" },
  { label: "GitHub repository", path: "https://github.com/harrowhaus/quoin", group: "External" }
];

function escape(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function injectCommandMenu() {
  if (document.querySelector("[data-quoin-command-menu]")) return;

  const dialog = document.createElement("dialog");
  dialog.setAttribute("data-quoin-command-menu", "");
  dialog.style.cssText = `
    width: min(90vw, 540px);
    padding: 0;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg, 0.5rem);
    background: var(--surface-elevated);
    color: var(--text);
    box-shadow: 0 16px 48px -8px rgb(0 0 0 / 0.18), 0 4px 12px -2px rgb(0 0 0 / 0.08);
  `;

  const groups = {};
  for (const t of TARGETS) {
    (groups[t.group] = groups[t.group] || []).push(t);
  }

  let itemsHtml = "";
  for (const [group, items] of Object.entries(groups)) {
    itemsHtml += `
      <div style="padding: 0.5rem 1rem 0.25rem; font-size: var(--type-size-xs); font-family: var(--font-mono); text-transform: uppercase; letter-spacing: var(--tracking-wide, 0.05em); color: var(--text-recede)">${escape(group)}</div>
      <ul role="listbox" style="list-style: none; margin: 0; padding: 0">
        ${items
          .map(
            (t) => `
          <li role="option" data-target="${escape(t.path)}" style="padding: 0.625rem 1rem; cursor: pointer; font-size: var(--type-size-sm); display: flex; align-items: center; gap: 0.5rem; transition: background var(--motion-fast, 120ms) var(--ease-standard, ease)">
            <span>${escape(t.label)}</span>
            <code style="margin-left: auto; font-size: var(--type-size-xs); color: var(--text-recede); font-family: var(--font-mono)">${escape(t.path)}</code>
          </li>
        `
          )
          .join("")}
      </ul>
    `;
  }

  dialog.innerHTML = `
    <div style="padding: 0.75rem 1rem; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 0.75rem">
      <span style="font-size: var(--type-size-xs); font-family: var(--font-mono); text-transform: uppercase; letter-spacing: var(--tracking-wide, 0.05em); color: var(--text-recede)">Cmd-K</span>
      <input
        type="text"
        data-quoin-command-filter
        placeholder="Jump to…"
        style="flex: 1; border: 0; background: transparent; color: var(--text); font-size: var(--type-size-base); outline: none; font-family: inherit"
        autofocus
      />
      <kbd style="font-family: var(--font-mono); font-size: var(--type-size-xs); padding: 0.125rem 0.375rem; background: var(--surface-recessed); border: 1px solid var(--border); border-radius: var(--radius-sm); color: var(--text-recede)">ESC</kbd>
    </div>
    <div style="max-height: 60vh; overflow-y: auto; padding: 0.5rem 0">
      ${itemsHtml}
    </div>
    <div style="padding: 0.5rem 1rem; border-top: 1px solid var(--border); font-size: var(--type-size-xs); color: var(--text-recede); display: flex; gap: 1rem">
      <span>↑↓ navigate</span>
      <span>↵ select</span>
      <span style="margin-left: auto">Powered by @quoin/impl-tailwind</span>
    </div>
  `;

  document.body.appendChild(dialog);

  // Item hover + click. The companion's command-menu handler sets
  // aria-selected on the first match; on click we navigate.
  dialog.addEventListener("click", (event) => {
    const item = event.target.closest("[role='option']");
    if (item) {
      const target = item.getAttribute("data-target");
      if (target) {
        if (/^https?:/.test(target)) window.open(target, "_blank", "noopener");
        else window.location.href = target;
      }
    }
  });
  dialog.addEventListener("mouseover", (event) => {
    const item = event.target.closest("[role='option']");
    if (item) {
      dialog.querySelectorAll("[role='option']").forEach((el) =>
        el.removeAttribute("aria-selected")
      );
      item.setAttribute("aria-selected", "true");
    }
  });

  // Highlighted item background via aria-selected attribute
  const style = document.createElement("style");
  style.textContent = `
    [data-quoin-command-menu] [role="option"][aria-selected="true"],
    [data-quoin-command-menu] [role="option"]:hover {
      background: var(--accent-recede, var(--surface-recessed));
      color: var(--text-emphasis);
    }
    [data-quoin-command-menu]::backdrop {
      background: rgb(0 0 0 / 0.25);
      backdrop-filter: blur(2px);
    }
  `;
  document.head.appendChild(style);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    injectCommandMenu();
    window.QuoinCompanion?.init();
  });
} else {
  injectCommandMenu();
  window.QuoinCompanion?.init();
}
