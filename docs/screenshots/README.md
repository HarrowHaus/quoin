# Screenshot checklist — operator task

This is the operator's morning task. The repo's [public-facing `README.md`](../../README.md) references 19 screenshots that don't yet exist. Once you drop them in this folder per the spec below, the README renders complete.

**Time budget:** ~30 minutes for 19 screenshots if you follow the steps in order. Each screenshot is mechanical — set viewport, navigate to URL, capture, save with the exact filename.

---

## Step 1 — Start the local server

The patterns render from inline tokens, but the catalog URLs use the pattern's example HTML at canonical paths. Serve `02_reference-packs/` over a local HTTP server so the relative paths resolve:

```bash
cd 02_reference-packs
py -m http.server 8765
```

(If `py` isn't on PATH on your machine, use `python -m http.server 8765` or `python3 -m http.server 8765`.)

Leave that terminal open. The server lives at `http://localhost:8765/` for the duration of the task.

## Step 2 — Set browser viewport

In Chrome / Edge / Firefox, open DevTools (F12 or Cmd-Opt-I), enable the responsive / device-emulation toolbar, and set:

- **Width:** 1440
- **Height:** 900
- **Device pixel ratio:** 2 (Retina) if available; otherwise 1
- **Zoom:** 100%

This matches the canonical desktop hero-page render and produces sharp, full-fidelity captures.

## Step 3 — Take 19 screenshots

For each pattern below, navigate to the URL, wait for the pattern to render fully (animations settled; fonts loaded; no spinning loaders), then capture and save with the exact filename listed.

### Cropping discipline

Capture just the pattern itself — the rendered surface — not the surrounding specimen page chrome (the document title, the meta block, the section labels). Two ways to do this cleanly:

1. **Browser DevTools "Capture node screenshot"** (recommended). In DevTools, right-click the pattern's `<section>` or `<div data-pattern="..."` element in the Elements panel, then choose **Capture node screenshot**. The browser writes a tightly-cropped PNG of just that element.
2. **OS screenshot tool with manual crop.** Use macOS Cmd-Shift-4 / Windows Snipping Tool. Drag the selection rectangle to enclose just the pattern. Save manually.

DevTools is faster and produces cleaner crops.

### Filename convention

Save each file to **`docs/screenshots/<pattern-name>.png`** at the repo root. Filenames are case-sensitive; use the exact names below.

### Pattern URLs and filenames

| # | URL | Save as | Crop target |
|---|---|---|---|
| 1 | http://localhost:8765/patterns/button-system/examples/index.html | `button-system.png` | The "Intent × Size matrix" section — first matrix on the page |
| 2 | http://localhost:8765/patterns/data-table/examples/index.html | `data-table.png` | The default-state table with header + ~5 rows visible |
| 3 | http://localhost:8765/patterns/empty-state/examples/index.html | `empty-state.png` | The default "No subscriptions yet" `md`-size variant |
| 4 | http://localhost:8765/patterns/feature-grid/examples/index.html | `feature-grid.png` | The canonical three-up layout — first grid on the page |
| 5 | http://localhost:8765/patterns/footer-mega/examples/index.html | `footer-mega.png` | The mega variant — flagship footer with newsletter, full link grid, legal row |
| 6 | http://localhost:8765/patterns/form-fields/examples/index.html | `form-fields.png` | The default text-input + select + checkbox row — first form group |
| 7 | http://localhost:8765/patterns/form-validation/examples/index.html | `form-validation.png` | A form with one invalid field showing the inline error display |
| 8 | http://localhost:8765/patterns/hero/examples/type-only.html | `hero.png` | The canonical centered hero — first hero on the page |
| 9 | http://localhost:8765/patterns/modal-dialog/examples/index.html | `modal-dialog.png` | The default modal — title + body + footer with primary CTA |
| 10 | http://localhost:8765/patterns/nav-app-chrome/examples/index.html | `nav-app-chrome.png` | The default top-nav — workspace switcher visible on the left, avatar on the right |
| 11 | http://localhost:8765/patterns/nav-docs/examples/index.html | `nav-docs.png` | The sidebar + content layout — show both at the same time |
| 12 | http://localhost:8765/patterns/nav-editorial/examples/index.html | `nav-editorial.png` | The masthead + utility row + sections row stack |
| 13 | http://localhost:8765/patterns/nav-marketing/examples/index.html | `nav-marketing.png` | The default desktop top-nav with mega-menu trigger visible |
| 14 | http://localhost:8765/patterns/page-header/examples/index.html | `page-header.png` | The default page-header with breadcrumb + title + actions cluster |
| 15 | http://localhost:8765/patterns/pricing-tiers/examples/index.html | `pricing-tiers.png` | The 3-tier comparison — show all three cards side by side with the "Popular" badge visible |
| 16 | http://localhost:8765/patterns/stat-card/examples/index.html | `stat-card.png` | A row of 3-4 stat cards — show variety (positive trend / negative trend / neutral) |
| 17 | http://localhost:8765/patterns/testimonial/examples/index.html | `testimonial.png` | The canonical 3-up testimonial grid — first variant section |
| 18 | http://localhost:8765/patterns/toast-notifier/examples/index.html | `toast-notifier.png` | A stacked-toast view showing success + warning + error toasts together |

### Hero overview screenshot (#19)

The README's lead image. A composition page lives at `docs/screenshots/hero-overview.html` — it stitches `nav-marketing` + `hero` (gradient-mesh variant) + `feature-grid` + `footer-mega` into a single sample page.

| # | URL | Save as | Crop target |
|---|---|---|---|
| 19 | http://localhost:8765/../docs/screenshots/hero-overview.html | `hero-overview.png` | The full visible viewport at 1440×900 — capture the whole page, not just one section. This is the hero shot for the README. |

(Alternative URL — start a second server at the repo root if the `../` traversal doesn't resolve: `cd ..` from `02_reference-packs/`, then `py -m http.server 8766`, and visit `http://localhost:8766/docs/screenshots/hero-overview.html`.)

## Step 4 — Verify and commit

Once all 19 files exist in `docs/screenshots/`:

1. **Verify count:** `ls docs/screenshots/*.png | wc -l` should print `19`.
2. **Visual sanity-check:** open the repo's top-level `README.md` in a markdown renderer (or push to GitHub and view the rendered page). Every screenshot in the pattern-catalog grid should load. The hero image at the top should display.
3. **Commit:**

```bash
git add docs/screenshots/
git commit -m "docs: add 19 pattern + hero-overview screenshots"
git push
```

The README is complete after the push.

## Notes

- **Light mode only.** All screenshots should be in light mode (the default for the specimens). Dark-mode screenshots can ship in a later task — the README already implicitly handles dark via `prefers-color-scheme` once the live docs site exists.
- **Don't redact / mark up the captures.** The fictional "Galley" SaaS narrative in the specimens is intentional context — leave it visible.
- **If a pattern's primary specimen contains multiple variants** (e.g., feature-grid has 5 layout demos; testimonial has 3 variants), pick the first / canonical one as listed in the crop-target column. The README catalog grid shows one representative image per pattern, not the full variant matrix.
- **If you spot a pattern rendering oddly** (broken font fallback, missing styles, layout cut off): pause, capture a screenshot anyway with a clear `_BROKEN.png` suffix so it's visible in `git status`, and ping a maintainer. The pattern's specimen file may need a bootstrap-integrity fix before the README screenshot lands cleanly.

That's the task. The README renders fully once the 19 PNGs land.
