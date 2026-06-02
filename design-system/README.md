# SpatialTimber — Design System

The **canonical design system** for SpatialTimber, consolidated from Claude Design — the go-to
reference for the project's visual identity, design tokens, product UI, and slides. New here?
**Open the pages below to *see* the system**, then read [`project/README.md`](project/README.md)
for the rules behind them.

## 👀 See it — open these in a browser

These `index.html` pages render the design system visually. The quickest way to view all of them
is to serve this folder, then open the URLs:

```bash
cd design-system/project
python -m http.server 8000
```

| Open | What you see |
|---|---|
| [`ui_kits/brand-identity/index.html`](project/ui_kits/brand-identity/index.html) | **★ Start here — the whole brand on one page:** the stacked-storeys logomark and its variants, the `SpatialTimber` wordmark, the sub-project lockups, the module glyphs, the colour system, and the type stacks. |
| [`ui_kits/aufstockung-assistent/index.html`](project/ui_kits/aufstockung-assistent/index.html) | The **product UI** — the Aufstockung Assistent app (inputs rail → 3D viewer → performance rail). |
| [`ui_kits/component-library/index.html`](project/ui_kits/component-library/index.html) | The reusable **component patterns** (buttons, fields, cards, …). |
| [`slides/index.html`](project/slides/index.html) | A **sample slide deck** in the project style. |
| [`preview/*.html`](project/preview/) | Small **reference cards**, one aspect each — colours, type, spacing, logos, glyphs. |

`brand-identity/index.html` is self-contained and also opens directly via `file://`. The React-based
kits (`aufstockung-assistent`, `component-library`) need the local `http://` server **and**
internet (they load React/Babel from a CDN); `slides/` is most reliable over `http://` too.

## For coding agents — implementing the designs

**Read [`project/README.md`](project/README.md) top to bottom first.** It is the primary reference:
project/product context, content fundamentals, visual foundations, iconography rules, the token set,
the asset generator, the UI kits, and sample slides. Then **follow its imports** — open every file
it pulls in (`colors_and_type.css`, the components under `project/ui_kits/`, the generator in
`project/assets/`) so you understand how the pieces fit before you start implementing.

The design medium is **HTML/CSS/JS + JSX** — these are prototypes, not production code. Recreate them
faithfully in whatever technology fits the target codebase (React, Vue, native). Match the visual
output; pull values from `project/colors_and_type.css` rather than hard-coding hex. **If anything is
ambiguous, ask the user before implementing.**

## Contents

- `README.md` — this file
- [`project/`](project/) — the SpatialTimber Design System: `README.md`, `colors_and_type.css`,
  `assets/` (logos, glyphs, favicons + the `spatialtimber-assets.mjs` generator), `preview/` cards,
  `ui_kits/` (the **brand-identity** reference page, the **Aufstockung Assistent** UI kit, and a
  **component library**), `slides/`, and `docs/handover/`. Wired as the repo's
  `spatialtimber-design` Claude Code skill (`.claude/skills/spatialtimber-design/`).
