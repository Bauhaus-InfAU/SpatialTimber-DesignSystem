# UI Kit — SpatialTimber · Aufstockung Assistent

A high-fidelity recreation of the **Spatial Timber Solver v1.0** — the single-screen
layout-generation app. It loads a pre-computed timber-extension layout and lets an
architect explore it: define the extension on the left, read the 3D massing in the
centre, and judge performance on the right. It does **not** compute anything — the
point is to *look* like a real, shipping, Anthropic-grade application.

Designed at **1600×900**, scaled to fit any viewport (absolute-centred + `scale()`).

## Open

`index.html` — interactive. Toggle step completion (enables/disables **Generate
Layout**), step the storey count, switch the View / Floor / Display segmented
controls (each triggers the stacked-slab "processing" overlay), select any metric
row to update the distribution detail, and collapse either side rail.

## Components

| File | What it is |
|---|---|
| `brand.jsx` | `markSVG()` (axonometric stacked-slab logomark, clay top plate), `glyphSVG()` (Aufstockung plan-swing glyph), `procMarkSVG()` (rising-slab processing animation) — all → `window` |
| `Header.jsx` | Brand lockup (mark + wordmark + divider + module glyph + descriptor), byline, project-info / GitHub link pills, funder logos |
| `InputsRail.jsx` | Generate action + note + Save/Load/Next affordances · site field · 4-step "define the extension" list (toggle dots) · storeys stepper · apartment-mix target with stacked proportion bar |
| `Viewer.jsx` | Axonometric massing SVG (existing volume + 3 timber floors, 625 mm generation grid, clay seed point, active-floor highlight), meta + scale chip + Google attribution, floating segmented control bar, processing overlay |
| `PerformanceRail.jsx` | Achieved apartment-mix mini-bar · selectable Layout-quality + Structural metric rows · detail panel with min/selected/max + clay distribution histogram, or the mix target-vs-achieved table |
| `kit.css` | All styles, ported from the production app (tokens, rails, viewer, controls, metrics, reveal + processing animations) |

## Notes & shortcuts (vs. the real product)

- The 3D viewer is a **CSS/SVG axonometric massing impression**, not real Google
  Photorealistic 3D Tiles. The "© Google" chip is kept because the real app streams
  tiles. View=Top and Display=Performance toggle active state + a processing flash
  but do not re-render the scene geometry (Floor does update the highlight).
- All metric values, the apartment mix, and the histogram distributions are the
  fixed sample dataset from the design brief.
- Icons are inline Lucide-style stroke paths (~1.8 weight) to match the house line
  style; see the system README ICONOGRAPHY section.

## Reuse

Copy `Header.jsx` for any SpatialTimber product surface — it is the canonical
in-app lockup. Keep the three-rail vocabulary (inputs → viewer → readout) and the
card / hairline / single-clay-accent rules from `colors_and_type.css`.
