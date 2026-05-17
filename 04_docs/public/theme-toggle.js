/**
 * Docs-site theme toggle. Phase 4.5.
 *
 * Inserts a small "Theme:" picker into the wayfinder on every page.
 * Clicking a label sets `data-theme` on <html> and persists in
 * localStorage. CSS in tokens.css responds to the attribute by
 * overriding semantic-token values.
 *
 * Three themes ship by default:
 *   - "default" — the docs site's own Junicode + Public Sans skin
 *     (tokens-geist base + project overrides).
 *   - "tailwind" — re-skin via tokens-tailwind values (zinc neutral).
 *   - "radix"    — re-skin via tokens-radix slate + blue.
 *
 * The skin is applied as a small inline stylesheet — keeps the
 * runtime cost to one variable swap per click.
 */

const SKINS = {
  default: null, // No override; use the stylesheet defaults.
  tailwind: {
    label: "Tailwind",
    css: `
      :root[data-theme="tailwind"] {
        --surface: oklch(98.5% 0 0);
        --surface-elevated: oklch(100% 0 0);
        --surface-recessed: oklch(96.7% 0.001 286.4);
        --surface-inverse: oklch(21% 0.006 285.9);
        --text: oklch(37% 0.013 285.8);
        --text-emphasis: oklch(21% 0.006 285.9);
        --text-recede: oklch(55.2% 0.016 285.9);
        --border: oklch(92% 0.004 286.3);
        --border-emphasis: oklch(21% 0.006 285.9);
        --border-recede: oklch(96.7% 0.001 286.4);
        --accent: oklch(21% 0.006 285.9);
        --accent-recede: oklch(96.7% 0.001 286.4);
        --critical: oklch(63.7% 0.237 25.3);
        --success: oklch(69.6% 0.17 162.5);
        --warning: oklch(76.9% 0.188 70.1);
        --info: oklch(68.5% 0.169 237.3);
        --font-sans: ui-sans-serif, system-ui, -apple-system, sans-serif;
        --font-display: ui-sans-serif, system-ui, sans-serif;
      }
    `
  },
  radix: {
    label: "Radix",
    css: `
      :root[data-theme="radix"] {
        --surface: oklch(98.3% 0.0026 286.4);
        --surface-elevated: oklch(99.1% 0.0013 286.4);
        --surface-recessed: oklch(95.6% 0.004 286.3);
        --surface-inverse: oklch(24.1% 0.0097 248.2);
        --text: oklch(50.2% 0.0136 264.4);
        --text-emphasis: oklch(24.1% 0.0097 248.2);
        --text-recede: oklch(61.1% 0.0155 272.6);
        --border: oklch(88.7% 0.0095 286.2);
        --border-emphasis: oklch(64.9% 0.193 251.8);
        --border-recede: oklch(93.2% 0.0054 286.3);
        --accent: oklch(64.9% 0.193 251.8);
        --accent-recede: oklch(96% 0.0201 238.7);
        --critical: oklch(62.6% 0.1933 23);
        --success: oklch(64.1% 0.1329 157.7);
        --warning: oklch(85.4% 0.1572 84.1);
        --info: oklch(86.1% 0.1027 217.8);
        --font-sans: 'Inter', system-ui, sans-serif;
        --font-display: 'Inter', system-ui, sans-serif;
      }
    `
  }
};

function applySkin(name) {
  document.documentElement.setAttribute("data-theme", name);
  const existing = document.getElementById("docs-theme-style");
  if (existing) existing.remove();
  const skin = SKINS[name];
  if (skin && skin.css) {
    const style = document.createElement("style");
    style.id = "docs-theme-style";
    style.textContent = skin.css;
    document.head.appendChild(style);
  }
  try {
    localStorage.setItem("quoin-docs-theme", name);
  } catch {
    // private mode or quota — skip persistence
  }
}

function buildToggle() {
  const saved = (() => {
    try {
      return localStorage.getItem("quoin-docs-theme");
    } catch {
      return null;
    }
  })() ?? "default";
  applySkin(saved in SKINS ? saved : "default");

  // Find the wayfinder, append the toggle as the last item.
  const wayfinder = document.querySelector("wayfinder");
  if (!wayfinder) return;
  const wrap = document.createElement("span");
  wrap.className = "theme-toggle";
  wrap.style.cssText =
    "display: inline-flex; align-items: center; gap: 0.3rem; font-family: var(--font-mono); font-size: var(--type-size-xs); color: var(--text-recede); margin-left: auto";
  wrap.innerHTML =
    `<span style="opacity: 0.7">Theme:</span>` +
    Object.entries({ default: { label: "Default" }, ...SKINS })
      .filter(([k]) => k !== "label")
      .map(([k, v]) => {
        const lbl = v && v.label ? v.label : (k === "default" ? "Default" : k);
        return `<button type="button" data-theme-skin="${k}" style="background: transparent; border: 1px solid var(--border); padding: 0.15rem 0.55rem; border-radius: var(--radius-pill); font-family: inherit; font-size: inherit; color: inherit; cursor: pointer">${lbl}</button>`;
      })
      .join("");
  wayfinder.appendChild(wrap);
  const buttons = wrap.querySelectorAll("[data-theme-skin]");
  const sync = () => {
    const active = document.documentElement.getAttribute("data-theme") ?? "default";
    buttons.forEach((b) => {
      const isActive = b.getAttribute("data-theme-skin") === active;
      b.style.background = isActive ? "var(--accent)" : "transparent";
      b.style.color = isActive ? "var(--text-on-accent)" : "var(--text-recede)";
      b.style.borderColor = isActive ? "var(--accent)" : "var(--border)";
    });
  };
  buttons.forEach((b) =>
    b.addEventListener("click", () => {
      applySkin(b.getAttribute("data-theme-skin"));
      sync();
    })
  );
  sync();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", buildToggle);
} else {
  buildToggle();
}
