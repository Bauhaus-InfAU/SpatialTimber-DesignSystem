# SpatialTimber — Brand Identity & Design System

This folder is the **canonical brand identity** for the SpatialTimber project: the
logomark, wordmark, sub-project lockups, module glyphs, colour + type tokens, and a
runnable asset generator. It was designed in [Claude Design](https://claude.ai/design)
and exported here on **2026-06-02** so every sibling repo (Demonstrator, Layout
Generators, FEM Surrogate, Furnisher) draws its brand from one place.

> **New to the brand? Open [`brand-guide.html`](brand-guide.html) in a browser.**
> It is the full visual proposal — marks, palette, type, glyphs, usage — on one page,
> self-contained (only pulls Inter + JetBrains Mono from Google Fonts).

This is also wired as a **Claude Code skill** (see [`.claude/skills/spatialtimber-design/`](../../.claude/skills/spatialtimber-design/SKILL.md)).
If you have this repo open in Claude Code, just ask — *"export the SpatialTimber logo
as a 512px PNG"*, *"give me the Furnisher lockup in reversed/white"*, *"build a slide
using the brand"* — and Claude will use this system to do it.

---

## The system at a glance

- **Master mark** — three snug, overlapping timber slabs in 2:1 axonometric. The top
  slab (the *added* storey) is clay. Reads as *storeys → spatial → Aufstockung*.
  Survives at 16 px and in one ink colour.
- **Wordmark** — `SpatialTimber`, one word, Inter. Weight leads on **Spatial** (700);
  **Timber** steps back (500). Capital T is the only case signal. Tracking −0.022em.
- **Sub-projects** — `shared mark + SpatialTimber wordmark + divider + Module Name [+ glyph]`.
  Extends to a 4th/5th module with no redesign:
  - **Aufstockung Assistent** — layout generation & exploration
  - **Furnisher** — room furnishing / fit-out
  - **Structural Analysis** — structural / FEM evaluation
- **Module glyphs** — flat **2-D line drawings** (plan/side elevation), ink stroke +
  one clay accent. Deliberately *not* axonometric — that reading is reserved for the
  master mark so glyphs never compete with it.
- **Clay is an accent, never load-bearing.** Pull it and the logo still works.

---

## How to export a logo (the common task)

The generator [`assets/spatialtimber-assets.mjs`](assets/spatialtimber-assets.mjs) is the
**single source of truth** and is zero-dependency. Pre-rendered copies already live in
[`assets/`](assets/) if you just want to grab a file.

```bash
cd assets/brand

# logomark — variant = accent | mono | reversed
node assets/spatialtimber-assets.mjs logo   --variant=accent  --out=logo.svg
node assets/spatialtimber-assets.mjs logo   --variant=reversed --animate --out=logo.svg
node assets/spatialtimber-assets.mjs logo   --variant=accent  --png --size=512 --out=logo.png

# full lockup (mark + wordmark)
node assets/spatialtimber-assets.mjs lockup --variant=mono    --out=lockup.svg

# module glyph — module = assistant | furnisher | structural
node assets/spatialtimber-assets.mjs glyph  --module=structural --out=glyph.svg

# favicon set (16/24/32/48) and "everything"
node assets/spatialtimber-assets.mjs favicon --out-dir=./favicons
node assets/spatialtimber-assets.mjs all     --out-dir=./out
```

```js
// or as a library
import { logoSVG, lockupSVG, glyphSVG, faviconSet, TOKENS } from './assets/spatialtimber-assets.mjs';
const mark = logoSVG({ variant: 'accent' });
```

PNG output needs `sharp` (`npm i sharp`); without it the CLI writes SVG and notes the
fallback. SVG never needs a dependency. (Verified working on Node 20.)

---

## Design tokens

[`colors_and_type.css`](colors_and_type.css) holds every token as CSS variables plus
opt-in semantic helper classes (`.st-wordmark`, `.st-display`, `.st-label`, `.st-card`,
…). Import it directly, or map the variables onto a target codebase's token system
rather than hard-coding hex values.

| Token | Value | Role |
|---|---|---|
| `--st-ink` | `#141413` | primary — warm near-black, **never** pure `#000` |
| `--st-clay` | `#D97757` | **the** accent — used sparingly, never load-bearing |
| `--st-clay-dark` | `#9E4A30` | clay pressed / deep accent |
| `--st-paper` | `#FAF9F5` | page background |
| `--st-card` | `#F0EEE6` | raised surface / card |
| `--st-oat` | `#E3DACC` | warm fill / quiet block |
| `--st-gray` | `#6F6C63` | secondary text |
| `--st-peach` / `--st-olive` / `--st-sky` | `#EBC9B7` / `#788C5D` / `#6A9BCC` | supporting — **only** for sub-project data colour-coding |

Type: **Inter** (sans — wordmark + UI) + **JetBrains Mono** (technical labels,
measurements). Display text is often italic 700. These align with the brand tokens in
the repo root [`CLAUDE.md`](../../CLAUDE.md) and the Demonstrator.

---

## Non-negotiable brand rules

- **Ink `#141413` + warm paper `#FAF9F5`. Clay `#D97757` is the only accent** — one
  keyed element at a time, never load-bearing.
- **Master mark is axonometric; sub-project glyphs are flat 2-D** — so glyphs never
  compete with the master mark.
- **Wordmark `SpatialTimber`** is one word in Inter; **Spatial** 700, **Timber** 500;
  tracking −0.022em.
- **No emoji, no gradients-on-white, no purple, no neon.** Warm, geometric, precise.
  Gentle motion only, always behind `prefers-reduced-motion`.

---

## What's in this folder

| Path | What it is |
|---|---|
| [`brand-guide.html`](brand-guide.html) | **Start here** — the full visual brand guide, self-contained |
| [`colors_and_type.css`](colors_and_type.css) | All design tokens + semantic helper classes |
| [`assets/spatialtimber-assets.mjs`](assets/spatialtimber-assets.mjs) | Logo / lockup / glyph / favicon generator (library + CLI) |
| `assets/logo-{accent,mono,reversed}.svg` | Pre-rendered logomarks (`-animated` = floating clay top plate) |
| `assets/lockup-{accent,mono,reversed}.svg` | Pre-rendered full lockups |
| `assets/glyph-{assistant,furnisher,structural}.svg` | Module glyphs |
| `assets/favicon-{16,24,32,48}.svg` | Favicon set |
| [`preview/`](preview/) | Small reference cards (swatches, type, logo, glyphs, spacing) |
| [`docs/handover/`](docs/handover/) | Original design explorations — logo / glyph option studies + the source proposal |
| [`handoff/`](handoff/) | The original brief and the Claude Design chat transcripts (the *why* behind every decision) |

---

## Decisions (locked 2026-06-02)

1. **Font → Inter.** Inter is the project's production typeface (not just a Söhne
   fallback). `--st-sans` stays Inter; no Söhne licence needed. Söhne remains an optional
   future swap if a licence is ever acquired — layout metrics are very close.
2. **Palette → keep the wider palette.** The supporting tones (peach / olive / sky) stay,
   for sub-project data colour-coding. Ink + paper + clay still do the primary work; the
   supporting tones remain secondary, used only where data needs colour-coding.
3. **UI kit → deferred (next step).** Buttons / fields / app-shell components are *not*
   built yet. They come after the **website template** and **slide-deck template** are
   added to the repo. The end goal is an **overarching SpatialTimber design system** that
   routes agents and users to the right sub-system for the job:
   - `assets/brand/` — identity (this folder): marks, tokens, glyphs, generator
   - *(planned)* website template — for sites / web apps / the Assistent UI
   - *(planned)* slide-deck template — for presentations
   When those land, an index will sit above them describing **which system to use for which
   purpose**, so "build me a slide" vs "build me a web page" vs "export a logo" each point
   at the correct source.

---

**Relationship to the rest of the repo.** This is the project's *own* identity.
[`assets/logos/`](../logos/) holds the third-party **funder** marks (Zukunft Bau, BMWSB).
[`assets/styleguide/`](../styleguide/) is the Zukunft Bau 2026 presentation's
illustration-register reference. The three are complementary — see each folder's README.
