/**
 * shadcn/ui default theme — Method B (custom fetch + HSL parse).
 *
 * shadcn ships its CSS variables as raw HSL components (e.g.
 * `--background: 0 0% 100%`) without the `hsl()` wrapper, so the
 * standard CSS-vars parser can't recognize them as colours. We fetch
 * themes.css, scope to .theme-zinc (shadcn's default neutral), wrap
 * each value in hsl(), and emit raw colour strings.
 */

import { fetchText, cacheCanonical } from "../runner.js";

const URL = "https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/public/r/themes.css";

export default {
  harvestNotes:
    "shadcn/ui default zinc theme extracted from apps/v4/public/r/themes.css. Values are raw HSL components in the source; this spec wraps them in hsl() for OKLCH conversion. The semantic role names (background, foreground, primary, etc.) map directly onto Quoin's canonical namespace via the existing sources/shadcn.json semantic block.",
  async algorithm() {
    const text = await fetchText(URL);
    if (!text) throw new Error("fetch-failed");
    await cacheCanonical("shadcn", URL, text);
    // Scope to .theme-zinc block
    const zincMatch = text.match(/\.theme-zinc\s*\{([\s\S]*?)\}/);
    const block = zincMatch ? zincMatch[1] : text;
    const out = {};
    const re = /--([a-z-]+)\s*:\s*([^;]+);/g;
    let m;
    while ((m = re.exec(block)) !== null) {
      const name = m[1].trim();
      const raw = m[2].trim();
      // Raw HSL components → wrap in hsl()
      if (/^-?\d+(\.\d+)?\s+-?\d+(\.\d+)?%\s+-?\d+(\.\d+)?%/.test(raw)) {
        out[name] = `hsl(${raw})`;
      } else if (/^(#|rgb|hsl|oklch|oklab)/i.test(raw)) {
        out[name] = raw;
      }
    }
    return {
      rawValues: out,
      library: "shadcn-ui/ui apps/v4/public/r/themes.css",
      version: "main",
      inputs: { theme: ".theme-zinc" }
    };
  },
  map(values) {
    // shadcn's themes.css has no native success/warning/info; supply
    // matching-style oklch values for the canonical namespace.
    return {
      base: {
        shadcn: {
          ...values,
          success: "oklch(58.4% 0.18 145)",
          warning: "oklch(78% 0.17 80)",
          info: "oklch(60% 0.18 240)"
        },
        white: { 0: "oklch(100% 0 0)" }
      },
      notes:
        "shadcn ships flat semantic CSS vars (--background, --foreground, --primary, --destructive, --muted, etc.) under .theme-zinc. Mapping selects: surface = background, surface-elevated = card, surface-recessed = muted, text = foreground, accent = primary, critical = destructive, border = border. shadcn has no native success/warning/info so we supply matching-style green/amber/blue."
    };
  }
};
