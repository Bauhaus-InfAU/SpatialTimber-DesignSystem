# SpatialTimber — Design System

A single, consolidated design system for **SpatialTimber** — a research project
(Bauhaus-Universität Weimar + TU Dresden, funded by Zukunft Bau / BMWSB via BBSR)
on **vertical timber building extension** — densifying cities by adding new timber
storeys on top of existing buildings (*Aufstockung*). Its signature engineering
idea is a **wall-beam** timber system that carries load directly, plus a
computational tool that generates and evaluates rooftop apartment layouts on a
**625 mm structural grid**.

Character to convey: **precise, structural, timber-warm, computational,
research-grade** — confident but not corporate. The identity lives in an
Anthropic-style register: warm paper, ink near-black, a single clay accent.

This folder is a **design reference**, a runnable **asset generator**, a set of
**UI-kit recreations** of the real product, and **sample slides** from the project
deck. It is wired as the repo's **`spatialtimber-design` Claude Code skill**
(`.claude/skills/spatialtimber-design/`), so any clone can ask Claude to use it as the
design system when building SpatialTimber sites, apps, decks, or assets.

---

## See it — open in a browser

The fastest way in is to *look at the system*. Serve this folder, then open the pages:

```bash
python -m http.server 8000
```

- `ui_kits/brand-identity/index.html` — **★ the whole brand on one page** (logo, wordmark, sub-project lockups, glyphs, colour, type). **Start here.**
- `ui_kits/aufstockung-assistent/index.html` — the **product UI** (inputs rail → 3D viewer → performance rail).
- `ui_kits/component-library/index.html` — reusable **component patterns**.
- `slides/index.html` — a **sample deck** in the project style.
- `preview/*.html` — small **reference cards**, one aspect each (colours, type, spacing, logos, glyphs).

`brand-identity/index.html` is self-contained (also opens via `file://`); the React kits
(`aufstockung-assistent`, `component-library`) need the `http://` server **and** internet (CDN).

---

## Sources

This system consolidates the design language of three sibling projects. None of
these links is assumed to be reader-accessible — they are recorded here in case
you do have access.

| Source | What it is | Link |
|---|---|---|
| **Brand identity proposal** | Logo system, tokens, glyphs, generator | `claude.ai/design/p/ad8dcf2c-5670-4cd0-b2fd-0c9b45125a54` (now the brand-identity reference page → `ui_kits/brand-identity/index.html`) |
| **Website / app template** | "Spatial Timber Solver v1.0 · Aufstockung Assistent" single-screen app | `claude.ai/design/p/e17b68eb-472a-4ad8-bcd3-0baa868e7074` (`Spatial Timber Solver.html`) |
| **Slide deck** | 29-slide Zukunft Bau Projekttage 2026 presentation | `claude.ai/design/p/e699544b-8985-4a6c-96fb-d2d86a7bbd9c` (`SpatialTimber Deck v6.html`) |

Funders: **BMWSB** (Bundesministerium für Wohnen, Stadtentwicklung und Bauwesen)
and **Zukunft Bau** (BBSR research initiative). Their logos live in `assets/`.

---

## The products this system serves

1. **SpatialTimber · Aufstockung Assistent** — the layout-generation & exploration
   app (a single-screen tool: inputs rail → 3D viewer → performance rail). The
   primary product surface. Recreated in `ui_kits/aufstockung-assistent/`.
2. **SpatialTimber · Furnisher** — room furnishing / fit-out (module of the family).
3. **SpatialTimber · Structural Analysis** — structural / FEM evaluation (module).
4. **The project deck** — research presentation. Sample slide types in `slides/`.

The brand is built so modules 2–5 read as the same family with no redesign.

---

## The system at a glance

- **Master mark** — three snug, overlapping timber slabs in 2:1 axonometric. The
  topmost slab (the *added* storey) is carried in clay. Reads as *storeys →
  spatial → Aufstockung*. Survives at 16 px and in one ink colour.
- **Wordmark** — `SpatialTimber`, one word, set in Inter. Weight leads on
  **Spatial** (700); **Timber** steps back (500). Capital T is the only case
  signal. Tracking −0.022em.
- **Sub-projects** — shared mark + divider + module name + a small module glyph.
  The rule extends to a 4th, 5th, … module with no redesign:
  `shared mark  +  SpatialTimber wordmark  +  divider  +  Module Name [+ glyph]`.
- **Module glyphs** — flat **2-D line drawings** (plan or side elevation), ink
  stroke + one clay accent. Deliberately *not* axonometric — that reading is
  reserved for the master mark so glyphs never compete with it.
- **Clay is an accent, never load-bearing.** Pull it and the logo still works.

---

## CONTENT FUNDAMENTALS

**Voice.** Precise, structural, understated. Reads like an engineering studio
that respects its reader — declarative sentences, no hype, no exclamation.
Confident but never corporate or salesy.

**Casing.** Sentence case for headings and body. `SpatialTimber` is always one
word with an internal capital T. Technical labels are UPPERCASE in mono with
wide tracking (e.g. `625 MM GRID`, `FEM EVALUATION`, `01 / 29`, `AUFSTOCKUNG
ASSISTENT`).

**Person.** Neutral / product-led ("the layout-generation app", "the mark holds
from a 16 px favicon to a reversed cover"). Avoid "we"/"you" marketing cadence.
The deck does use first-person plural sparingly for the research team ("why we
can't just keep stacking") — that voice is for narrative slides, not UI or copy.

**Numbers & units.** Real and specific — `625 mm`, `−0.022em`, `2:1
axonometric`, `143 m²`, `+31 %`, `0.71`. Numbers are part of the aesthetic; they
signal rigour. Always in mono with `tabular-nums`. Use a non-breaking space
between value and unit. Deltas are signed (`−3`, `+13`) and colour-coded (under =
clay, over = olive).

**Bilingual.** German technical terms appear in their original form, often
bracketed after the English: *vertical densification [Aufstockung]*. Institution
and funder names stay German (Bundesinstitut für Bau-, Stadt- und Raumforschung).

**Emoji.** None. Ever.

**Vibe examples.** "Stacked timber storeys, in axonometric." · "Warm,
restrained." · "Every context, one mark." · "One idea, executed precisely." ·
"Let the walls do the work." · "Stack a structure, stack a slab, stack the same
flat."

---

## VISUAL FOUNDATIONS

**Colour.** Ink `#141413` (warm near-black, *never* pure black) on warm paper.
Two background registers coexist: the brand reference uses **paper `#FAF9F5`**;
the app and deck use a warmer **oat `#E3DACC`** ground with **card `#F0EEE6`**
surfaces and occasional white (`#FFFFFF`) for raised inputs. Clay `#D97757` is
the single accent — the added storey, the active state, a dot before a label,
the primary action, a KPI number, one keyed element in a glyph. Supporting tones
(peach `#EBC9B7`, olive `#788C5D`, sky `#6A9BCC`) appear **only** to colour-code
data (the apartment-mix order is fixed: peach → clay → olive → sky for
1/2/3/4-room). Restraint wins.

**Type.** Inter for everything visible (wordmark + UI); JetBrains Mono for
technical labels, footnotes, measurements, all numerals. Original spec is
**Söhne** (Anthropic's sans) with Inter as the documented, metric-close fallback
— see CAVEAT. The deck additionally lists Tiempos Text as an optional serif for
editorial display; it is rarely used and Inter italic 500–700 carries display
text in practice. Display text is often italic.

**Spacing.** Built on the 625 mm structural-module idea — equal rhythm, no
decoration. Scale in `colors_and_type.css` (4 / 8 / 16 / 24 / 40 / 56 / 84 px).
Clear space around the logo = **one slab height** on all sides.

**Backgrounds.** Flat warm paper/oat. No gradients-on-white, no photographic
backgrounds, no textures. Surfaces are distinguished by subtle fill steps (paper
→ card → oat) and hairline rules. The app's 3D viewer is the one exception: a
soft warm radial wash behind axonometric massing, with a faint 625 mm generation
grid drawn on the terrain and roof.

**Borders & elevation.** Hairlines do most of the work: `rgba(20,20,19,0.13)` for
rules, `0.08–0.10` for soft. The app layers three soft diffuse shadows
(`shadow-sm` / `shadow-card` / `shadow-float` for floating control bars) — never
hard borders or drop-shadow drama. The deck and brand reference lean on hairlines
and flat fills with little or no shadow.

**Radii.** Generous. Cards 22px in app/deck (12–16px in brand reference), small
elements 12px, pills fully rounded (999px). Glyph tiles ~9px.

**Animation.** Sparing and gentle. The hero mark's clay top plate performs a slow
vertical float (`translateY` 0 → −3/−5px, ~2.6–2.9s ease-in-out, infinite
alternate) — reinforcing the "added storey" idea. The app does one orchestrated
staggered page-load reveal (header → left → viewer → right) and a stacked-slab
"processing" loop. Easing is `ease-in-out` / `cubic-bezier(.2,0,0,1)`; no bounces,
no neon, no spinners. Always gate decorative motion behind `prefers-reduced-motion`.

**Hover / press.** Hover shifts a hairline to clay or lifts opacity; the primary
ink button flips to clay on hover; pressed/active states use `--st-clay-dark` or
an ink fill with oat text (active segmented-control segment). No scale-pop on press.

**Transparency & blur.** Reserved for floating overlays — the viewer's control bar
(`rgba(255,255,255,.86)` + `blur(8px)`) and the "© Google" attribution chip. Not
used decoratively elsewhere.

**Imagery.** Vector-first; the brand ships as inline SVG. Where raster is needed
(deck), imagery is **warm-toned axonometric architectural renders and schematic
load-path diagrams** on paper grounds — never stock photography. Module/load-path
schematics pair an axonometric render with a flat load-path diagram side by side.

---

## ICONOGRAPHY

The brand is **vector SVG, hand-built and minimal**. There is no icon font.

- **Master logomark** and **module glyphs** are generated by
  `assets/spatialtimber-assets.mjs` — the single source of truth. Pre-rendered
  copies live in `assets/*.svg`.
- **Module glyphs** follow one rule: flat 2-D line drawing (plan or side
  elevation), 24×24 viewBox, ink stroke 1.7, one clay-keyed element, **no
  axonometry**. Joins are round except sharp-edged furniture (miter / square).
- For general UI icons not covered here (used in the app: map-pin, external-link,
  GitHub, chevrons, sparkle/generate, plus/minus stepper), use **Lucide** — its
  even ~1.7 stroke weight and rounded caps match the house line style. Colour
  `--st-ink`; reserve clay for the one element that carries meaning. The app
  inlines these Lucide-style paths directly rather than loading the font.
- **No emoji. No unicode glyphs as icons** (the lone exception: `●` as a clay
  bullet/dot before eyebrow labels in the deck).

---

## Using the asset generator

`assets/spatialtimber-assets.mjs` is zero-dependency and works as a library or CLI.

```bash
node assets/spatialtimber-assets.mjs logo   --variant=accent --out=logo.svg
node assets/spatialtimber-assets.mjs logo   --variant=reversed --animate --out=logo.svg
node assets/spatialtimber-assets.mjs lockup --variant=mono --out=lockup.svg
node assets/spatialtimber-assets.mjs glyph  --module=structural --out=glyph.svg
node assets/spatialtimber-assets.mjs favicon --out-dir=./favicons
node assets/spatialtimber-assets.mjs all     --out-dir=./brand
```

```js
import { logoSVG, lockupSVG, glyphSVG, faviconSet, TOKENS } from './assets/spatialtimber-assets.mjs';
const mark = logoSVG({ variant: 'accent' });
```

PNG output needs `sharp` (`npm i sharp`); without it the CLI writes SVG and notes
the fallback. SVG never needs a dependency.

---

## Index — what's in this folder

| Path | What it is |
|---|---|
| `README.md` | This file — context, sources, content + visual foundations, iconography |
| `colors_and_type.css` | All design tokens as CSS variables + semantic helpers |
| `assets/spatialtimber-assets.mjs` | Logo / lockup / glyph / favicon generator (library + CLI) |
| `assets/logo-*.svg`, `lockup-*.svg`, `glyph-*.svg`, `favicon-*.svg` | Pre-rendered brand assets |
| `assets/{bmwsb,zukunftbau}_logo.{svg,png}` | Funder logos |
| `preview/*.html` | Design System tab cards (colours, type, spacing, logos, glyphs) |
| `ui_kits/brand-identity/` | Brand-identity reference page — logo, wordmark, lockups, glyphs, colour, type on one page (`index.html`) |
| `ui_kits/aufstockung-assistent/` | UI kit — the Aufstockung Assistent app (index.html + JSX components) |
| `ui_kits/component-library/` | Reusable component patterns (`index.html`) |
| `slides/` | Sample deck slides (deck-stage.js + index.html) and per-type slide files |
| `docs/handover/glyph-plan-options.html` | Glyph exploration (reference) |

### UI kits
- `ui_kits/brand-identity/` — the **brand-identity reference page** (`index.html`): the logomark
  and its variants, the `SpatialTimber` wordmark, the sub-project lockups, the module glyphs, the
  colour system, and the type stacks, all on one page. Open it to *see* the brand.
- `ui_kits/aufstockung-assistent/` — high-fidelity recreation of the
  single-screen layout-generation app: header lockup, inputs rail (site, steps,
  storeys stepper, apartment-mix target), axonometric viewer with floating
  control bar, and performance rail with selectable metrics + distribution
  histogram. See its own `README.md`.
- `ui_kits/component-library/` — reusable component patterns (`index.html`).

### Slides
- `slides/index.html` — a sample deck (deck-stage.js) demonstrating the title,
  section-divider, KPI, comparison, agenda/team, and closing slide types lifted
  from the project deck.

---

## CAVEAT

- **Font substitution.** The brand spec specifies **Söhne** (Anthropic's
  typeface) and optionally **Tiempos Text** (serif). This system uses **Inter**
  (and Inter italic for serif-display moments) as the documented fallback because
  both are licensed fonts not bundled here. Mono is **JetBrains Mono** (Google
  Fonts). If you have Söhne/Tiempos licences, swap `--st-sans` / add the serif and
  metrics will be very close.
- **Two background registers.** The brand reference (paper `#FAF9F5`) and the
  app/deck (oat `#E3DACC`) differ slightly. Both are correct; pick by surface —
  documentation/brand on paper, product/presentation on oat. Flagged for your call.

---

## ASK

I consolidated three projects into one system. **Please sanity-check four things
and I'll lock it in:** (1) Is **Inter** an acceptable production stand-in for
**Söhne**, or do you want me to wire in licensed Söhne (and Tiempos) files?
(2) Keep **two background registers** (paper for brand, oat for product/deck), or
standardise on one? (3) Should the supporting palette (peach / olive / sky) stay,
or do you want a stricter ink-clay-only system? (4) Want me to build **Furnisher**
and **Structural Analysis** UI kits too, or is the Aufstockung Assistent kit
enough for now?
