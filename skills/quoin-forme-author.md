# Forme Aesthetic Specification

**Applies to:** packs in the Forme line — type-foundry sites, font marketing microsites, design system docs with deep typography sections, type designer portfolios, typography-focused editorial publications.

## What Forme Is

Forme is a deliberately specialized template/pattern line. **Not** a parallel system. **Not** variants of every other Quoin pack. Just one deeply specified specialty line.

The name comes from letterpress: a "forme" is the locked-up assembly of type within the chase that the quoin (a wedge) physically locks in place. The Forme template line is named in continuity with Quoin's own etymology.

## Forme Genre Boundaries

**In scope:**
- Type foundry websites (klim.co.nz, pangrampangram.com)
- Single-font promotional microsites (commitmono.com, geist font page, monaspace.githubnext.com)
- Variable-font playgrounds (fontgauntlet.com)
- Design system docs sites with deep typography focus
- Type designer portfolios

**Out of scope:**
- General editorial / publication sites (use `theme-broadsheet` instead)
- Marketing sites for non-typography products
- Documentation sites for non-typographic systems

## Reference Canon

Primary references (verified during research):
- klim.co.nz — Klim Type Foundry (the production-quality benchmark)
- pangrampangram.com — Pangram Pangram
- productiontype.com — Production Type
- grillitype.com — Grilli Type
- monaspace.githubnext.com — GitHub Monaspace
- commitmono.com — Commit Mono (also the keyboard-HUD reference)
- displaay.net — Displaay
- sharptype.co — Sharp Type
- lineto.com — Lineto
- abcdinamo.com — Dinamo (license-matrix benchmark)
- dinamodarkroom.com — Dinamo Darkroom
- fontgauntlet.com — Dinamo Font Gauntlet (variable-font playground benchmark)
- fontshare.com — Indian Type Foundry

## The 18 Forme Primitives

Full specifications in `research/02_design_trends_templates_typography.md` Section 3C. Summary:

| ID | Primitive | Role |
|---|---|---|
| F.01 | Specimen Block | Huge type rendered AS content, not preview |
| F.02 | Glyph Grid | Exhaustive Unicode-paginated character browser, click-to-magnify |
| F.03 | OpenType Feature Toggle Panel | Interactive UI showing `ssXX`/`cvXX`/`liga`/`dlig` effect in real time |
| F.04 | Variable Axis Slider Rail | Live control of wght/wdth/opsz/slnt/custom axes |
| F.05 | Comparison View | Two faces side-by-side at matched optical sizes |
| F.06 | Sample Text Input | Editable testing field, contenteditable, persistent |
| F.07 | License Matrix Table | Multi-axis pricing (company size × style count × license × territory) |
| F.08 | Specimen Book PDF Download | Print-fidelity specimen artifact CTA |
| F.09 | Designer/Foundry Credit Panel | Authoritative attribution with stats |
| F.10 | Usage Gallery | Editorial-grid of client work using the typeface |
| F.11 | Character-Cycling Hover State | Text cycles through alternative glyphs before settling |
| F.12 | Mono-Only Navigation | Site-wide nav set in monospaced face |
| F.13 | Specimen-Scale Generous Whitespace | Layout primitive — section padding so generous that single specimens dominate viewports |
| F.14 | Keyboard Navigation HUD | Persistent footer revealing keyboard shortcuts |
| F.15 | In-Browser Font Builder / Customizer | Pre/post-purchase customization tool (advanced; v1.1 candidate) |
| F.16 | Variable-Font Animated Playground | Standalone playground animating every variable axis |
| F.17 | Process / Essay Long-Form Editorial | Foundry-as-publisher; long essays on type design |
| F.18 | Foundry / About Surface | Identity page for the foundry |

## Forme Template Pack Candidates

### `@quoin/template-forme-foundry`

Full multi-typeface foundry site (Klim / Pangram archetype).

**IA:** Home → Typefaces (index) → Per-typeface page → Per-typeface specimen → In-Use gallery → About → Journal/Blog → Shop/License.

**Pattern dependencies:** F.01, F.02, F.03, F.04, F.05, F.06, F.07, F.08, F.09, F.10, F.13, F.17, F.18.

**Theme defaults:** `theme-letterpress` or `theme-broadsheet`.

### `@quoin/template-forme-microsite`

Single-typeface promotional microsite (Commit Mono / Geist Font / Monaspace archetype).

**IA:** Single-page or short sequence: hero specimen → axis controls → feature toggles → glyph grid → in-use → buy/download.

**Pattern dependencies:** F.01, F.02, F.03, F.04, F.06, F.08, F.12, F.13, F.14.

**Theme defaults:** `theme-terminal` (for mono-faced microsites) or `theme-letterpress` (for serif-faced).

### `@quoin/template-forme-playground`

Variable-font playground tool (Font Gauntlet archetype).

**IA:** Single-page tool with file upload, auto-detected axes, animation timeline, export to GIF/MP4/Lottie.

**Pattern dependencies:** F.04, F.06, F.13, F.16.

**Theme defaults:** `theme-terminal` or `theme-graphite`.

## Forme Token Set

Forme primitives reference these canonical tokens specifically:

| Token | Use |
|---|---|
| `--text-display` | Specimen blocks at hero scale |
| `--space-specimen-lg` | Inter-specimen vertical rhythm (Forme-specific, ships in `@quoin/tokens-forme-spacing`) |
| `--space-specimen` | Smaller specimen breathing room |
| Identity font stack | Junicode 2 + Ranade + Monaspace + Departure Mono |
| Pattern-pack-specific tokens | License matrix tokens, axis-rail tokens, glyph-grid tokens |

## OpenType Feature Activation Defaults

For Forme contexts specifically:

```css
/* Forme specimen display — show distinctive features active */
.forme-specimen[data-face="junicode"] {
  font-feature-settings: "kern", "liga", "calt", "ss02", "ss06", "hlig";
}

.forme-specimen[data-face="ranade"] {
  font-feature-settings: "kern", "liga", "calt";
}

.forme-specimen[data-face="monaspace-neon"] {
  font-feature-settings: "calt", "ss01", "ss02";
}

.forme-specimen[data-face="departure-mono"] {
  font-feature-settings: "kern";  /* face is opinionated, minimal activation */
}
```

## Forme Visual Language

- **Type IS the content.** Never use type as decoration for non-typography content in Forme contexts.
- **Generous whitespace** — single specimens should dominate viewports, not compete for space.
- **Minimal ornament.** Hairline rules permitted; gradients, shadows, illustrations forbidden in Forme contexts except where they directly serve specimen presentation.
- **Mono navigation as identity signal.** Forme templates default to mono-only top nav (F.12).
- **Keyboard navigation as identity signal.** Forme templates default to including F.14 (kbd HUD in footer).
- **Print-fidelity specimens.** Every Forme template includes F.08 (downloadable PDF specimen) as a CTA.
- **Character-cycling hover** (F.11) used sparingly — once or twice per page on identity moments, not on every link.

## Forme-Specific Quality Bar

In addition to the universal quality bar in `quoin-pack-author.md`:

- **Variable font axes exposed.** If the font has wght/wdth/opsz/slnt axes, F.04 (axis rail) MUST be present and functional.
- **OpenType features documented.** If the font has `ssXX`/`cvXX` features, F.03 (feature toggle panel) MUST be present with at least the major features exposed.
- **Glyph grid covers full character set.** F.02 must show every glyph the font contains, not a curated subset. Pagination by Unicode block.
- **Specimen PDF available.** F.08's downloadable PDF must be a real artifact, not a placeholder.
- **License matrix realistic.** F.07's tier structure must reflect realistic foundry pricing (desktop / web / app / OEM / megapack tiers; per-style or family-package options).
- **Designer credit substantive.** F.09 includes designer name, foundry, year of release, language coverage stats (number of supported languages), OpenType feature count.

## Halt-and-Report Triggers

Halt and report to operator if:

- A Forme template would ship without F.04 (axis rail) for a variable-axis font.
- A Forme template would ship without F.02 (glyph grid) for a font with > 200 glyphs.
- A Forme template's license matrix would ship without realistic tier pricing.
- A Forme reference site has shipped a major redesign superseding the research.
- The Forme primitives produce a site that reads as a generic editorial template (the Forme genre signals — type-as-content, mono nav, axis exposure, kbd HUD — must be present).

## Examples / Anti-Examples

**Forme template that reads correctly:**
- Top nav in Monaspace Neon ALL CAPS at 12px.
- Hero is a single Junicode specimen at 12vw.
- Below the hero: axis rail for wght and wdth.
- Below that: OpenType feature toggle panel with ssXX checkboxes.
- Generous vertical rhythm (200px+ between sections).
- Footer has kbd HUD with arrow-key navigation hints.
- "Download specimen PDF" CTA visible.

**Forme template that reads wrong:**
- Top nav in Inter at 14px with mixed case.
- Hero is a feature card with icon + headline + body + CTA.
- No axis exposure, no feature toggles.
- Standard 80–120px section padding.
- No kbd HUD.
- No specimen PDF.

If a Forme pack looks like the second example, it's not Forme — it's a generic marketing template. Halt and report.
