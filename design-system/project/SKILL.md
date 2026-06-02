---
name: spatialtimber-design
description: Use this skill to generate well-branded interfaces and assets for SpatialTimber — a research project on vertical timber building extension (Aufstockung) — for production or for throwaway prototypes, mocks, decks, and websites. Contains the brand's design guidelines, color and type tokens, fonts, logo + glyph SVG assets, a runnable asset generator, a UI kit recreating the Aufstockung Assistent app, and sample deck slides.
user-invocable: true
---

# SpatialTimber design system

Read `README.md` first — it holds the project/product context, sources, content
fundamentals, visual foundations, and iconography rules. Then explore:

- `colors_and_type.css` — all design tokens (colors, type, spacing, radii) as CSS
  variables you can import or transcribe into the target codebase.
- `assets/spatialtimber-assets.mjs` — single source of truth for the logomark,
  full lockup, module glyphs, and favicons. Zero-dependency library + CLI.
- `assets/*.svg` — pre-rendered logos, glyphs, favicons, and funder logos.
- `preview/*.html` — visual reference cards for the foundations.
- `ui_kits/aufstockung-assistent/` — high-fidelity recreation of the app (open its
  `index.html`; reuse the JSX components when assembling real product screens).
- `slides/` — sample deck slides (deck-stage.js) for presentation work.

## How to work

**Generating assets on demand** (logos, glyphs, favicons): prefer the generator so
output always matches the brand —

```bash
node assets/spatialtimber-assets.mjs logo    --variant=accent --out=logo.svg
node assets/spatialtimber-assets.mjs lockup  --variant=reversed --out=lockup.svg
node assets/spatialtimber-assets.mjs glyph   --module=structural --out=glyph.svg
node assets/spatialtimber-assets.mjs favicon --out-dir=public/favicons
node assets/spatialtimber-assets.mjs all     --out-dir=public/brand
```

Add `--png --size=512` for raster (needs `npm i sharp`; falls back to SVG).

**Building product screens**: start from `ui_kits/aufstockung-assistent/` — copy
its components and the header lockup; keep the three-rail layout vocabulary.

**Building slides**: start from `slides/` — it uses `deck-stage.js`; copy a slide
`<section>` of the matching type and swap content.

**Building other visual artifacts** (mocks, throwaway prototypes): copy the SVG
assets out and produce static HTML, pulling tokens from `colors_and_type.css`.

**Working in production code**: copy the assets and adopt the rules here. Map the
CSS variables onto the codebase's existing token system rather than hard-coding hex.

## Non-negotiable brand rules

- **Ink `#141413` + warm paper/oat. Clay `#D97757` is the only accent** — used
  sparingly (one keyed element), never load-bearing.
- The **master mark is axonometric** (stacked storeys, clay top plate).
  **Sub-project glyphs are flat 2-D** line drawings — never axonometric.
- **Wordmark `SpatialTimber`** is one word in Inter; weight leads on **Spatial**
  (700), **Timber** is 500; tracking −0.022em.
- Inter (sans) + JetBrains Mono (technical labels & all numerals, tabular). Söhne
  is the original spec — Inter is the fallback (see README CAVEAT).
- Numbers are mono, tabular, with a non-breaking space before units; deltas signed
  and colour-coded (under = clay, over = olive).
- Apartment-mix data colour order is fixed: peach → clay → olive → sky.
- **No emoji, no gradients-on-white, no purple, no neon, no glassmorphism.** Warm,
  geometric, precise. Gentle motion only, always behind `prefers-reduced-motion`.

## If invoked with no other guidance

Ask what the user wants to build or design, ask a few focused questions (surface,
audience, fidelity, variations), then act as an expert SpatialTimber designer —
outputting HTML artifacts or production code depending on the need.
