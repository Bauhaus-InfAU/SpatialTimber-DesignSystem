# Handover — alternative frontend proposal (single-file HTML)

> **How to use this file.** Open a fresh Claude conversation (claude.ai — "Claude design" /
> Artifacts). Paste **everything from the `─── BRIEF ───` line to the end** as your first message.
> Claude will return one self-contained `.html` artifact you can preview, screen-record, and compare
> against the React build in this repo. Nothing here depends on the repo — the brief is standalone.
>
> *Context for you (not for the paste):* we already built a React shell for this app
> (`src/app/`, IBM Plex type). This handover deliberately asks for a **fresh take** with the **deck's
> real typography (Söhne)** so we can compare directions before committing. Save the returned HTML to
> `docs/handover/proposal-claude-design.html`.

---

─── BRIEF ───

You are a senior product designer + frontend engineer. Design and build a **frontend proposal** for a
web-app mockup, delivered as **one self-contained HTML file** (inline `<style>` and `<script>`, no
build step, no external JS frameworks). It must render correctly when opened directly in a browser
and inside Claude Artifacts.

## The one non-negotiable: Anthropic aesthetics

This must look like it was designed by Anthropic — the same restrained, warm, editorial register as
claude.com and the Anthropic deck this app accompanies. That means:

- **Warm paper, not cold white.** Oat/cream background, off-white cards. Generous negative space.
- **One accent, used sparingly.** Clay `#D97757` is the *only* emphasis color in text/UI chrome —
  highlights, the primary action, the active state. Everything else stays neutral. Resist the urge
  to color things in.
- **Soft, generous geometry.** Large corner radii (cards ~20–22px, fully-rounded pills), hairline
  rules in ink, soft diffuse shadows — never hard borders or drop-shadow drama.
- **Quiet confidence.** Calm hierarchy, real type scale, tabular numerals. Editorial, not "dashboard
  SaaS." No gradients-on-white, no purple, no neon, no glassmorphism clichés.
- **Söhne typography** (details below) — this is central to the Anthropic feel.

If a choice would look generic or "AI-generated," it's wrong. Channel Anthropic's own product design.

## Typography (match the deck exactly)

The presentation deck defines these stacks — **use them verbatim**:

```css
--sans: "Söhne", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
--mono: "JetBrains Mono", "IBM Plex Mono", ui-monospace, Menlo, monospace;
```

- **Söhne** (Klim Type Foundry) is Anthropic's brand sans. It is *licensed and cannot be embedded* —
  list it first so it renders for anyone who has it installed, but **design so it looks right under
  the Inter fallback**, which is what most viewers (and Artifacts) will see. Load **Inter** and
  **JetBrains Mono** from Google Fonts so the file is self-sufficient:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  ```
- **Sans** for everything UI. **Mono** for *all numerals, units, codes, eyebrow labels* — this
  technical-instrument contrast is part of the look. Use `font-variant-numeric: tabular-nums`.
- Söhne is a neo-grotesque (Akzidenz/Helvetica lineage): keep weights to 400/500/600/700, tight-ish
  letter-spacing on large text, slightly loosened uppercase tracking on small eyebrow labels.

## Color tokens (locked — from the deck)

| Token | Hex | Role |
|---|---|---|
| Clay (accent) | `#D97757` | sole emphasis: highlight, primary action, active state, KPI numbers |
| Ink | `#141413` | primary text, edges, hairline rules (warm near-black, not pure black) |
| Ink-2 | `#2b2a28` | secondary headings |
| Mute | `#6f6c63` | secondary/label text (warm gray) |
| Mute-2 | `#C2C0B6` | gridlines, tertiary, dashed annotations |
| Oat | `#E3DACC` | app background (warm kraft paper) |
| Card | `#F0EEE6` | card / panel surface |
| Paper | `#FFFFFF` | raised surface (use sparingly) |
| Peach | `#EBC9B7` | chart category — 1-room |
| Sage/olive | `#788C5D` | chart category — 3-room · "good/done/over-target" |
| Sky | `#6A9BCC` | chart category — 4-room |

**Apartment-mix chart order is fixed: peach → clay → olive → sky** (1/2/3/4-room). Clay does double
duty as both the UI accent and the 2-room category — that's intentional. Radii reference: card 22px,
small 12px, pill 999px.

## What the app is (so the UI makes sense)

A mockup of the **"Spatial Timber Solver v1.0 — Aufstockung Assistent"**: a tool that helps an
architect design a **vertical timber extension** (roof-top addition) on an existing Berlin building.
The app **loads pre-computed layout data and lets the user explore it in 2D/3D** — it does *not*
generate or compute anything. The whole point is to be **screen-recorded into a ≤30 s video** for a
conference slide, so it must *look* like a real, polished, shipping application. It is a single
screen; the user works through 4 manual phases on it.

## Layout — one screen, three columns + header

```
┌───────────────────────────────────────────────────────────────────────────┐
│ HEADER:  ◧ Spatial Timber Solver v1.0 · Aufstockung Assistent   [logos →]   │
├───────────────┬───────────────────────────────────────┬─────────────────────┤
│  INPUTS       │            VIEWER (3D)                 │   PERFORMANCE        │
│  (left rail)  │   Google Photorealistic 3D Tiles of    │   (right rail)       │
│               │   Berlin with the timber extension      │                      │
│  · location   │   reconstructed on the rooftop.         │   · apartment mix    │
│  · draw steps │                                         │     achieved vs tgt  │
│  · storeys    │   ── floating control bar ──            │   · layout metrics   │
│  · apt mix    │   [Top|3D] [1·2·3] [Layout|Performance] │   · structural mtx   │
│  · GENERATE   │                          © Google attr  │   · selected-metric  │
│  · save/load  │                                         │     min/max + plot   │
└───────────────┴───────────────────────────────────────┴─────────────────────┘
```

For a static proposal, render the **viewer as a convincing placeholder** — an aerial/3D-massing
impression of a long rectangular building (~34 m × 8 m footprint, 3 stacked timber floors on an
existing volume) on warm terrain, with a faint **625 mm generation grid** motif. A tasteful
illustration/CSS treatment is fine; it does not need real maps. Keep the "© Google" attribution
chip visible (the real app streams Google tiles).

### Header
Left: a small geometric mark + `Spatial Timber Solver` with `v1.0` in clay, and a mono eyebrow
`AUFSTOCKUNG ASSISTENT`. Right: two funder logos (use simple text lockups `ZUKUNFT BAU` and `BMWSB`
if you have no image — keep them quiet/neutral).

### Left — INPUTS (the "set up" rail)
- **Site location**: text field showing `Berlin · 52.5732, 13.4181` + a `Go` button.
- **Define the extension** — 4 numbered steps, each a row with title + small hint + a status dot:
  1. Set generation grid — *1 point · 1 direction · 625 mm*
  2. Set roof outline — *draw the extension footprint*
  3. Set circulation cores — *stairs / lift shafts*
  4. Set support points — *grid-snapped load points*
- **Nr. of storeys**: a stepper showing `3`.
- **Apartment mix · target**: 4 rows (dot + type + area range + %) and a thin stacked proportion bar:
  1-room `30–45 m²` 20% · 2-room `45–65 m²` 35% · 3-room `65–85 m²` 25% · 4-room `85–100 m²` 20%.
- **Generate Layout** — the primary clay button (show it *disabled* with a tiny note "complete grid,
  outline, cores & supports to enable").
- A faint row of non-functional affordances: `Save` · `Load` · `Next variant`.

### Right — PERFORMANCE (the "read the result" rail)
- **Apartment mix · achieved** — same 4 types with achieved % and a signed delta vs target
  (over = olive, under = clay). Example: 1-room 17% (−3) · 2-room 33% (−2) · 3-room 17% (−8) ·
  4-room 33% (+13).
- **Layout qualities** — selectable metric rows (label · tiny scope tag · value):
  Daylight `0.70` (Rooms) · Accessibility `0.86` (Rooms) · Furnishability `0.81` (Rooms) ·
  Efficiency `0.78` (Apartments).
- **Structural efficiency** — Utilization `0.71` (Structural) · Material `600 t` (Building) ·
  CO₂ `184 t` (Building).
- **Selected-metric detail** — show `Utilization` selected (clay-tinted active row). Reveal
  `min 0.27 · max 0.91` and a **small custom SVG distribution/histogram** in clay. Sample values to
  bucket: `0.91, 0.88, 0.64, 0.52, 0.83, 0.80, 0.31, 0.48, 0.69, 0.66, 0.27, 0.41`.

### Viewer control overlay (floating, bottom-center)
Three small segmented toggles: **View** `Top | 3D` (3D active) · **Floor** `1 | 2 | 3` (1 active) ·
**Display** `Layout | Performance` (Layout active). Active segment = ink fill, oat text.

## Interactivity (keep it light)
This is a visual proposal, not the product. A little life is welcome — hover states, the segmented
toggles actually switching active state, the metric rows selecting and updating the detail panel —
but **no real 3D, no data loading, no routing**. Plain vanilla JS only. One well-orchestrated
staggered page-load reveal (header → left → viewer → right) is the kind of touch that sells it.

## Deliverable & acceptance
- **One `.html` file**, self-contained, opens in any browser and in Artifacts.
- Designed for **16:9** capture (target ~1600×900); the three-column screen fills the frame with no
  scrolling needed at that size.
- Reads as a **real, polished, Anthropic-designed application** — warm, calm, editorial, Söhne/Inter
  type, single clay accent, generous rounded cards.
- All four regions present and populated with the example values above so it looks live.

Make it beautiful and intentional. Show what a distinctive, restrained, genuinely Anthropic
interface looks like.

─── END BRIEF ───
