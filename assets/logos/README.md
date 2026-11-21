# Funder logos

> **Looking for the SpatialTimber project's own logo?** It lives in
> [`../brand/`](../brand/) (logomark, wordmark, lockups, glyphs + a generator). This folder
> holds only the third-party **funder** marks below.

Brand assets for the project's funders, used in the app header, the deck, and the brand-identity
handoff. This repo is the **canonical store** with all formats; consuming repos (e.g. the
Demonstrator) mirror the SVGs they need. **Source:** the SpatialTimber ZukunftBau 2026 deck
template (`_assets/_shared/`), extracted 2026-06-01.

All PNGs have **transparent backgrounds** (RGBA) and were rendered at high resolution from the vector
SVGs, so they composite cleanly on any color.

| File                    | Format             | Size        | Notes                                                                                 |
| ----------------------- | ------------------ | ----------- | ------------------------------------------------------------------------------------- |
| `zukunftbau_logo.svg` | SVG (vector)       | 336 × 59   | **Preferred** — Zukunft Bau wordmark · tagline "Fördern Forschen Entwickeln" |
| `zukunftbau_logo.png` | PNG · transparent | 1680 × 296 | high-res raster of the SVG above                                                      |
| `bmwsb_logo.svg`      | SVG (vector)       | 213 × 78   | **Preferred** — BMWSB / Bundesministerium (Bundesadler + black-red-gold bar)   |
| `bmwsb_logo.png`      | PNG · transparent | 1065 × 390 | high-res raster of the SVG above                                                      |

Prefer the **SVG** versions wherever possible (crisp at any scale). Both wordmarks are **black**, so
on dark/ink surfaces they need a reversed/white treatment (not provided here).

**Third-party software / tool logos** (Rhino, Grasshopper, Revit, Archicad, Allplan) — used in
tool-chain and interoperability figures — live in [`software/`](software/), see its
[`README.md`](software/README.md).

**Edit notes:**

- `bmwsb_logo.svg` had a baked-in `<rect ... fill="white">` background — removed so the vector (and
  its PNG) are transparent.
- `zukunftbau_logo.svg` shipped with an **empty `<defs>`**: its `.a`/`.b` fills lived in an external
  deck stylesheet that didn't travel with the file, so every shape defaulted to black (the "BAU"
  highlight came out black instead of yellow). Re-added inline `<style>`: `.a` = black text,
  `.b` = brand yellow **`#F9EE13`** (sampled from the Forschungsförderung artwork).

**Usage / attribution.** These are third-party institutional marks (Zukunft Bau /
Bundesministerium für Wohnen, Stadtentwicklung und Bauwesen). Use only in the SpatialTimber project's
funder-attribution context, per the funders' branding rules. Do not recolor or distort.
