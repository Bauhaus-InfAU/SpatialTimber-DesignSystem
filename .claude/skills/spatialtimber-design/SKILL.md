---
name: spatialtimber-design
description: Use for anything involving the SpatialTimber visual identity or design system — exporting the project logo / lockup / glyphs / favicons, the brand colours and type tokens, building a SpatialTimber website or web app (the Aufstockung Assistent / Solver UI), or building a SpatialTimber slide deck / presentation. SpatialTimber is a research project on vertical timber building extension (Aufstockung). Trigger on requests like "export the SpatialTimber logo", "what are the brand colours / font", "build a project web page", "make a slide / deck in the project style", or any SpatialTimber branding, web-UI, or presentation question.
user-invocable: true
---

# SpatialTimber design system

The project's design system is a federation of sub-systems under **`assets/`** in this repo,
each owning a purpose. The map lives in **`assets/README.md`** — read it first, then route to
the right sub-system below. Don't reinvent the brand; use these files.

## Route by purpose

| Request | Sub-system | Read |
|---|---|---|
| Logo, wordmark, glyphs, brand colours/type, export marks | **identity** | `assets/brand/README.md` |
| Build a website / web app in the project style | **web** | `assets/templates/website/README.md` |
| Build a slide deck / presentation | **slides** | `assets/templates/deck/README.md` |
| Presentation media (axo renders, schemes, pictograms, video) | **media** | `assets/presentation/` |
| Make / restyle illustrations (axo, pictogram, scheme) | **illustration** | `assets/styleguide/README.md` |
| Funder logos (Zukunft Bau, BMWSB) | **funders** | `assets/logos/README.md` |

## Identity — the most common tasks

The brand is the root: colours, type, and the logo come from `assets/brand/`. Export assets
with the generator so output always matches the brand:

```bash
cd assets/brand
node assets/spatialtimber-assets.mjs logo    --variant=accent   --out=logo.svg     # accent|mono|reversed
node assets/spatialtimber-assets.mjs logo    --variant=accent   --png --size=512 --out=logo.png
node assets/spatialtimber-assets.mjs lockup  --variant=reversed --out=lockup.svg
node assets/spatialtimber-assets.mjs glyph   --module=structural --out=glyph.svg    # assistant|furnisher|structural
node assets/spatialtimber-assets.mjs favicon --out-dir=public/favicons
node assets/spatialtimber-assets.mjs all     --out-dir=public/brand                 # everything
```

PNG needs `npm i sharp`; without it the CLI writes SVG and notes the fallback. Tokens are in
`assets/brand/colors_and_type.css` — map them onto the target codebase rather than hard-coding hex.

## Web & slides

- **Web**: start from `assets/templates/website/spatial-timber-solver.html` (self-contained).
  Recreate in the target stack; pull tokens from the brand, don't copy baked-in hex.
- **Slides**: start from `assets/templates/deck/spatialtimber-deck.html` (lean template). Its
  media is **not** committed (large binaries) — source it from `assets/presentation/` per that
  folder's README before rendering.

## Non-negotiable brand rules

- **Ink `#141413` + warm paper `#FAF9F5`. Clay `#D97757` is the only accent** — one keyed
  element, never load-bearing.
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
