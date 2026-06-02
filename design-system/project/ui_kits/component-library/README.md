# SpatialTimber — UI Kit / Component Library

A single, self-contained component reference for **SpatialTimber** — the shared
component layer the product screens (Aufstockung Assistent and its sibling tools)
are assembled from. It complements the brand-identity proposal (logo system +
tokens) and the Aufstockung Assistent app recreation already in this design
system; this kit is the **components between them**.

Character: precise, structural, timber-warm, computational, research-grade — in
the restrained Anthropic register. Warm paper, ink near-black, **one clay accent
spent once per view**, hairline geometry, generous radii, tabular numerals.

---

## The deliverable

| File | What it is |
|---|---|
| `index.html` | The kit — **one self-contained HTML file**. Inline `<style>` + `<script>`, no build step, no external JS framework. Renders opened directly in a browser or inside Claude Artifacts. Fonts (Inter + JetBrains Mono) load from Google Fonts with system fallbacks. |
| `README.md` | This file. |

Open `index.html` and it is a polished, navigable design-system document: warm
paper, a sticky mini-nav (mono labels) that jumps to each section and tracks
scroll, display-italic section headers, and — for every component — a **live
example beside its minimal HTML/class usage** (with a copy button).

---

## What's inside

| § | Section | Components |
|---|---|---|
| 00 | **Foundations** | Colour tokens, type scale specimen, spacing scale, radii samples, the clay-dotted mono-label style |
| 01 | **Buttons** | Primary (clay) · secondary (ink hairline) · ghost; sizes sm/md/lg; default / hover / pressed / focus-visible / disabled / loading; icon-only |
| 02 | **Form fields** | Text input, textarea, select, checkbox, radio, toggle, slider, and a **mono 625 mm number stepper**; states default / focus / filled / error / disabled, with labels + helper text |
| 03 | **Surfaces** | Card, panel, oat inset, modal/dialog, tooltip, popover |
| 04 | **Navigation & chrome** | App header (SpatialTimber lockup slot + module name + divider + funder slots), nav rail with active state, tabs, breadcrumb, footer |
| 05 | **Data & status** | Mono label, badge/pill, tag, progress bar, spinner, stat/metric block, zebra table, distribution plot + stacked bar (supporting palette as data series) |
| 06 | **Feedback** | Inline alert/banner (info / success / warning), empty state, toast |

---

## Design tokens

All components are built on CSS custom properties declared on `:root` (mirrors
`../../colors_and_type.css`). Lift them wholesale.

```
--st-ink #141413   --st-clay #D97757   --st-clay-dark #9E4A30
--st-paper #FAF9F5  --st-card #F0EEE6   --st-oat #E3DACC   --st-gray #6F6C63
supporting (data only): --st-peach #EBC9B7  --st-olive #788C5D  --st-sky #6A9BCC
--st-line rgba(20,20,19,.13)   --st-line-soft rgba(20,20,19,.08)
--st-sans Inter   --st-mono "JetBrains Mono"
radii 8 / 12 / 16 / pill        spacing 4 8 16 24 40 56 84
```

## Class convention

Every component class is prefixed **`st-`** and built only on the tokens above, so
each maps cleanly to a React component:

```
.st-btn .st-btn--primary .st-btn--sm        → <Button variant size>
.st-field .st-input .st-help .is-error      → <Field> / <Input>
.st-stepper [data-step="625"]               → <GridStepper step={625}>
.st-card .st-panel .st-inset                → <Card> / <Panel> / <Inset>
.st-header .st-lockup .st-mod               → <AppHeader module=…>
.st-alert .st-alert--warning                → <Alert tone>
```

Modifier classes use `--` (BEM-ish); stateful classes are bare (`active`,
`is-error`, `on`, `key`).

## Brand rules respected

- **Clay is an accent, never load-bearing.** Pull it from any component and the
  interface still reads — hierarchy is weight, scale, and the hairline grid.
- **Logo slots, not redraws.** The header lockup renders the master mark
  (axonometric stacked storeys); module glyphs stay flat 2-D. **Funder logos are
  left as clearly-labelled placeholder slots** (`.st-funder-slot`) — drop the
  BMWSB / Zukunft Bau assets from `../../assets/` in production.
- **No gradients-on-white, no purple, no neon, no glassmorphism, no emoji.**

## Accessibility

Visible `:focus-visible` rings (clay), AA-contrast text, keyboard-operable
controls (native inputs + buttons), and all decorative motion gated behind
`prefers-reduced-motion`.

---

## Scope note

Built strictly to the component list above. **Nothing outside that list was
added** — per the brief, confirm before any new component (e.g. date picker,
pagination, command palette, file dropzone) is introduced.
