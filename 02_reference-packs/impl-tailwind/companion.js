/**
 * @quoin/impl-tailwind — companion JS module (Phase 5c).
 *
 * Single ES module that adds behavior to interactive primitives the
 * impl pack emits. Pure DOM API — no dependencies.
 *
 * Four behaviors:
 *   1. Tab panels   — arrow-key navigation between tabs in a
 *                     [role="tablist"]; clicking or arrow-keying a
 *                     tab swaps the visible [role="tabpanel"] that
 *                     shares its aria-controls / id linkage.
 *   2. Disclosure   — smoothly animate <details> open / close height.
 *   3. Modal pattern — [data-quoin-dialog-trigger] buttons open the
 *                     <dialog> whose id matches their data-target.
 *                     Native <dialog> handles focus trap + ESC, we
 *                     add backdrop-click and an open/close transition.
 *   4. Command menu — Cmd-K / Ctrl-K opens the first
 *                     [data-quoin-command-menu] <dialog>. Inside, an
 *                     <input> with [data-quoin-command-filter] filters
 *                     the <li role="option"> items in real time.
 *
 * Usage:
 *   <script type="module" src="/node_modules/@quoin/impl-tailwind/companion.js"></script>
 *
 * The module auto-attaches on DOMContentLoaded. To re-scan after
 * dynamic insertion, call `window.QuoinCompanion.init()`.
 */

const COMPANION_VERSION = "0.1.0";

/* ─────────────────── 1. Tab panels ─────────────────── */

function attachTabPanels(root = document) {
  const tablists = root.querySelectorAll('[role="tablist"]');
  for (const list of tablists) {
    if (list.dataset.quoinTabsAttached === "true") continue;
    list.dataset.quoinTabsAttached = "true";
    const tabs = Array.from(list.querySelectorAll('[role="tab"]'));
    if (tabs.length === 0) continue;

    // Find tabpanels: each tab's aria-controls points to a panel id.
    const panels = tabs.map((t) => {
      const id = t.getAttribute("aria-controls");
      return id ? document.getElementById(id) : null;
    });

    const select = (i) => {
      tabs.forEach((t, j) => {
        const selected = j === i;
        t.setAttribute("aria-selected", String(selected));
        t.setAttribute("tabindex", selected ? "0" : "-1");
      });
      panels.forEach((p, j) => {
        if (!p) return;
        p.hidden = j !== i;
      });
      tabs[i].focus();
    };

    // Initial state — find the currently-selected tab or fall back to 0.
    const initial = tabs.findIndex((t) => t.getAttribute("aria-selected") === "true");
    if (initial >= 0) {
      panels.forEach((p, j) => { if (p) p.hidden = j !== initial; });
    } else if (panels.some((p) => p)) {
      select(0);
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(i));
      tab.addEventListener("keydown", (event) => {
        let next = i;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (i + 1) % tabs.length;
        else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (i - 1 + tabs.length) % tabs.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = tabs.length - 1;
        else return;
        event.preventDefault();
        select(next);
      });
    });
  }
}

/* ─────────────────── 2. Disclosure smooth animation ─────────────────── */

function attachDisclosure(root = document) {
  const items = root.querySelectorAll("details");
  for (const detail of items) {
    if (detail.dataset.quoinDisclosureAttached === "true") continue;
    detail.dataset.quoinDisclosureAttached = "true";

    // Honour prefers-reduced-motion — skip animation entirely.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) continue;

    const summary = detail.querySelector("summary");
    if (!summary) continue;
    const content = Array.from(detail.children).filter((c) => c !== summary);
    if (content.length === 0) continue;

    // Wrap content in a div we can animate.
    let wrapper = detail.querySelector(":scope > [data-quoin-disclosure-content]");
    if (!wrapper) {
      wrapper = document.createElement("div");
      wrapper.dataset.quoinDisclosureContent = "true";
      wrapper.style.overflow = "hidden";
      wrapper.style.transitionProperty = "height";
      wrapper.style.transitionDuration = "var(--motion-normal, 200ms)";
      wrapper.style.transitionTimingFunction =
        "var(--ease-standard, cubic-bezier(0.4, 0, 0.2, 1))";
      content.forEach((c) => wrapper.appendChild(c));
      detail.appendChild(wrapper);
    }

    summary.addEventListener("click", (event) => {
      event.preventDefault();
      if (detail.open) {
        // Closing: set explicit height -> 0
        wrapper.style.height = wrapper.scrollHeight + "px";
        requestAnimationFrame(() => {
          wrapper.style.height = "0";
          wrapper.addEventListener(
            "transitionend",
            () => { detail.open = false; wrapper.style.height = ""; },
            { once: true }
          );
        });
      } else {
        // Opening: open first, then set height from 0 -> scrollHeight
        detail.open = true;
        wrapper.style.height = "0";
        requestAnimationFrame(() => {
          wrapper.style.height = wrapper.scrollHeight + "px";
          wrapper.addEventListener(
            "transitionend",
            () => { wrapper.style.height = ""; },
            { once: true }
          );
        });
      }
    });
  }
}

/* ─────────────────── 3. Modal / dialog pattern ─────────────────── */

function attachModalTriggers(root = document) {
  // Triggers: any element with [data-quoin-dialog-trigger="targetId"]
  // Targets: <dialog> with matching id
  const triggers = root.querySelectorAll("[data-quoin-dialog-trigger]");
  for (const trigger of triggers) {
    if (trigger.dataset.quoinDialogAttached === "true") continue;
    trigger.dataset.quoinDialogAttached = "true";

    trigger.addEventListener("click", () => {
      const targetId = trigger.getAttribute("data-quoin-dialog-trigger");
      const dialog = document.getElementById(targetId);
      if (!dialog) return;
      if (typeof dialog.showModal === "function") dialog.showModal();
      else if (typeof dialog.show === "function") dialog.show();
    });
  }

  // Backdrop click closes the dialog.
  const dialogs = root.querySelectorAll("dialog");
  for (const dialog of dialogs) {
    if (dialog.dataset.quoinDialogAttached === "true") continue;
    dialog.dataset.quoinDialogAttached = "true";

    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        // Click was on the backdrop itself, not inside the content.
        dialog.close();
      }
    });
  }
}

/* ─────────────────── 4. Command menu ─────────────────── */

function attachCommandMenu(root = document) {
  // Find the first [data-quoin-command-menu]. Cmd-K / Ctrl-K opens it.
  const menu = root.querySelector("[data-quoin-command-menu]");
  if (!menu) return;
  if (menu.dataset.quoinCommandAttached === "true") return;
  menu.dataset.quoinCommandAttached = "true";

  const filter = menu.querySelector("[data-quoin-command-filter]");
  const items = Array.from(menu.querySelectorAll('[role="option"]'));

  // Cmd-K / Ctrl-K toggles open.
  const onKey = (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      if (typeof menu.showModal === "function") {
        if (menu.open) menu.close();
        else menu.showModal();
        setTimeout(() => filter?.focus(), 50);
      } else {
        menu.toggleAttribute("open");
        setTimeout(() => filter?.focus(), 50);
      }
    } else if (event.key === "Escape" && menu.open) {
      menu.close?.();
    }
  };
  document.addEventListener("keydown", onKey);

  // Real-time filtering.
  if (filter) {
    filter.addEventListener("input", () => {
      const query = filter.value.trim().toLowerCase();
      let firstVisible = null;
      for (const item of items) {
        const text = item.textContent?.toLowerCase() ?? "";
        const match = query === "" || text.includes(query);
        item.hidden = !match;
        if (match && !firstVisible) firstVisible = item;
      }
      // Highlight the first match
      items.forEach((it) => it.removeAttribute("aria-selected"));
      if (firstVisible) firstVisible.setAttribute("aria-selected", "true");
    });

    // Enter on filter activates the highlighted item.
    filter.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const selected = items.find((it) => it.getAttribute("aria-selected") === "true");
        if (selected) {
          event.preventDefault();
          selected.click();
        }
      }
    });
  }
}

/* ─────────────────── public init + auto-attach ─────────────────── */

export function init(root = document) {
  attachTabPanels(root);
  attachDisclosure(root);
  attachModalTriggers(root);
  attachCommandMenu(root);
}

// Auto-run on import. Defer until DOM ready.
if (typeof window !== "undefined" && typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => init());
  } else {
    init();
  }
  // Expose for re-scanning after dynamic content insertion.
  window.QuoinCompanion = { init, version: COMPANION_VERSION };
}

export default { init, version: COMPANION_VERSION };
