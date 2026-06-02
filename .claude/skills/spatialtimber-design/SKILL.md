---
name: spatialtimber-design
description: Use for anything involving the SpatialTimber visual identity or design system — exporting the project logo / lockup / glyphs / favicons, the brand colours and type tokens, building a SpatialTimber website or web app (the Aufstockung Assistent / Solver UI), or building a SpatialTimber slide deck / presentation. SpatialTimber is a research project on vertical timber building extension (Aufstockung). Trigger on requests like "export the SpatialTimber logo", "what are the brand colours / font", "build a project web page", "make a slide / deck in the project style", or any SpatialTimber branding, web-UI, or presentation question.
user-invocable: true
---

# SpatialTimber design system

The canonical design system lives in **`design-system/`** at the repo root — start there for any
SpatialTimber style or design task. Read **`design-system/project/README.md`** first (brand
context, content fundamentals, visual foundations, iconography rules), then route below. Don't
reinvent the brand; use these files.

> **Source of truth: `design-system/`.** The `assets/` tree holds only project media
> (`presentation/`, `scheme-styleguide/`, `logos/`) — routed below. (Older `brand/` + `templates/`
> explorations were removed once `design-system/` became canonical.)

## Route by purpose

| Request | Read |
|---|---|
| Logo, wordmark, glyphs, favicons, brand colours/type, export marks | `design-system/project/README.md` + `colors_and_type.css` |
| Build a website / web app in the project style | `design-system/project/ui_kits/aufstockung-assistent/` (the UI kit) |
| Reusable component patterns | `design-system/project/ui_kits/component-library/` |
| Build a slide deck / presentation | `design-system/project/slides/` |
| Presentation media (axo renders, schemes, pictograms, video) | `assets/presentation/` |
| Make / restyle illustrations (axo, pictogram, scheme) | `assets/scheme-styleguide/README.md` |
| Funder logos (Zukunft Bau, BMWSB) | `assets/logos/` (mirrored in `design-system/project/assets/`) |

## Identity — exporting marks

The generator is the single source of truth for the logomark, lockups, glyphs, and favicons —
output always matches the brand:

```bash
cd design-system/project
node assets/spatialtimber-assets.mjs logo    --variant=accent   --out=logo.svg     # accent|mono|reversed
node assets/spatialtimber-assets.mjs logo    --variant=accent   --png --size=512 --out=logo.png
node assets/spatialtimber-assets.mjs lockup  --variant=reversed --out=lockup.svg
node assets/spatialtimber-assets.mjs glyph   --module=structural --out=glyph.svg    # assistant|furnisher|structural
node assets/spatialtimber-assets.mjs favicon --out-dir=public/favicons
node assets/spatialtimber-assets.mjs all     --out-dir=public/brand                 # everything
```

PNG needs `npm i sharp`; without it the CLI writes SVG and notes the fallback. Tokens are in
`design-system/project/colors_and_type.css` — map them onto the target codebase rather than
hard-coding hex. Pre-rendered marks are in `design-system/project/assets/*.svg`.

## Web, slides, components

- **Web app**: start from `design-system/project/ui_kits/aufstockung-assistent/` (index.html + JSX
  components — the three-rail layout: inputs rail → 3D viewer → performance rail). Recreate in the
  target stack; pull tokens from the brand, don't copy baked-in hex.
- **Components**: reusable patterns in `design-system/project/ui_kits/component-library/`.
- **Slides**: start from `design-system/project/slides/` (uses `deck-stage.js`); copy a slide
  `<section>` of the matching type and swap content. Heavy deck media lives in
  `assets/presentation/` — source it from there per that folder's README before rendering.

## Non-negotiable brand rules

- **Ink `#141413` (warm near-black, never pure black) + clay `#D97757` as the only accent** —
  one keyed element, never load-bearing. Two warm background registers: **paper `#FAF9F5`** for
  brand/docs, **oat `#E3DACC`** + **card `#F0EEE6`** for product/deck. Pick by surface.
- **Master mark is axonometric** (stacked storeys, clay top plate); **sub-project glyphs are
  flat 2-D** line drawings — never axonometric.
- **Wordmark `SpatialTimber`** is one word in Inter; **Spatial** 700, **Timber** 500;
  tracking −0.022em.
- **Inter** (sans — the locked production typeface) + **JetBrains Mono** (technical labels).
  Söhne is an optional future swap only if licensed.
- The **wider palette is in use**: ink + paper + clay primary; supporting tones (peach /
  olive / sky) kept for sub-project data colour-coding.
- **No emoji, no gradients-on-white, no purple, no neon.** Warm, geometric, precise. Gentle
  motion only, always behind `prefers-reduced-motion`.

## If invoked with no other guidance

Ask what the user wants to build or export and for which surface (logo/asset, website, or
deck), ask a few focused questions (audience, fidelity, variant), then act as an expert
SpatialTimber designer — outputting SVG/PNG assets, HTML artifacts, or production code.
