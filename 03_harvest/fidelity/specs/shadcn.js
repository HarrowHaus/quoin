/**
 * shadcn/ui default theme — globals.css from shadcn-ui/ui.
 * Default `:root` CSS custom properties (oklch values, post-2024).
 */

export default {
  fetch: {
    urls: [
      "https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/styles/globals.css"
    ],
    format: "css-vars",
    commit: "main"
  },
  harvestNotes:
    "shadcn/ui default theme extracted from apps/v4/styles/globals.css (the v4 reference template). OKLCH values preserved verbatim. The non-canonical CSS variable names (--background, --foreground, --primary, --destructive, etc.) map to Quoin canonical tokens via the existing semantic block.",
  map(values) {
    return {
      base: {
        shadcn: values,
        white: { 0: "oklch(100% 0 0)" }
      },
      notes:
        "shadcn ships a flat semantic layer rather than a multi-step ramp. We capture every --foo: oklch(...) as base.shadcn.{name}; the semantic block then references shadcn.background / shadcn.foreground / shadcn.primary / shadcn.destructive etc."
    };
  }
};
