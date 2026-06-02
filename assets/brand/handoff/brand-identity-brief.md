# Handover — SpatialTimber brand identity (logo system)

> **How to use.** Open a fresh Claude conversation (claude.ai — "Claude design" / Artifacts) and
> paste **everything from the `─── BRIEF ───` line down**. Claude returns one self-contained `.html`
> artifact presenting the logo system as crisp **SVGs** you can extract. Save the result to
> `docs/handover/brand-identity-proposal.html`.

---

─── BRIEF ───

Design a **brand identity and logo system for "SpatialTimber"** — a research project — and deliver it
as **one self-contained HTML file** (inline SVG + CSS, no build step) that presents the system and
its variants. Each logo must be **vector SVG** so we can lift it out and use it directly.

## What SpatialTimber is

SpatialTimber is a research project (Bauhaus-Universität Weimar + TU Dresden, funded by Zukunft Bau /
BMWSB) on **vertical timber building extension** — densifying cities by adding new **timber storeys
on top of existing buildings** ("Aufstockung"). Its signature engineering idea is a **wall-beam**
timber system that carries load directly, and a computational design tool that generates and
evaluates rooftop apartment layouts on a **625 mm structural grid**. The character to convey:
**precise, structural, timber-warm, computational, research-grade** — confident but not corporate.

## What's needed: one master brand + an extensible sub-project system

A **simple, systematic identity** where every sub-tool reads as the same family at a glance:

- **Master:** `SpatialTimber` — a wordmark + a compact logomark (icon) that can stand alone (favicon,
  app corner).
- **Sub-projects** (same scheme, swappable module): each pairs the shared mark with a module
  descriptor and ideally a small module-specific glyph:
  1. **SpatialTimber · Aufstockung Assistent** — the layout-generation & exploration app
  2. **SpatialTimber · Furnisher** — room furnishing / fit-out
  3. **SpatialTimber · Structural Analysis** — structural / FEM evaluation
- The system must obviously **extend to a 4th, 5th, … sub-project** later without redesign. Show the
  construction rule so adding one is trivial (e.g. "shared mark + divider + module name [+ glyph]").

## Our visual strategy (align to it — this is an Anthropic-style identity)

The project's deck and app use Anthropic's restrained, warm, editorial register. The identity should
live comfortably beside them:

- **Palette.** Ink `#141413` (primary; warm near-black, not pure black) · Clay `#D97757` (the single
  accent) · warm paper Oat `#E3DACC` / card `#F0EEE6`. Supporting only if useful: peach `#EBC9B7`,
  olive `#788C5D`, sky `#6A9BCC`, warm gray `#6f6c63`. **Restraint wins** — ideally the mark works in
  one ink color, with clay as an optional single accent.
- **Type.** Sans stack `"Söhne","Inter",…` (Anthropic's Söhne, Inter fallback); mono
  `"JetBrains Mono",…` for any technical/label text. Load Inter + JetBrains Mono from Google Fonts so
  the file is self-sufficient; design the wordmark to read well in Inter.
- **Feel.** Warm, geometric, precise. Generous radii where rounded; hairline rules; soft, not loud.
  No gradients-on-white, no purple, no neon, no generic "tech" clichés.

## Creative cues (inspiration, not constraints)

Timber + stacking + structure + grid. Possible directions for the mark: **stacked storeys / modules**
(the Aufstockung idea), the **wall-beam** profile, an abstract **625 mm grid module**, end-grain /
timber section, or a spatial extrusion. Pick **one** strong, simple idea and execute it precisely —
it must survive at 16 px (favicon) and in pure black-on-paper. Avoid literal little-house icons.

## Deliverable (one HTML artifact)

Lay out, on warm paper:
1. **Master logo** — mark + wordmark, large.
2. The **3 sub-project lockups**, shown as a family so the shared scheme is obvious.
3. **The system rule** — a short "how to build a new sub-project lockup" note + a blank/template
   example proving extensibility.
4. **Variants** — logomark alone (favicon scale ~16–32 px) · monochrome ink version · reversed
   (on ink/dark) · the clay-accent version.
5. Keep every logo as **inline SVG** (clean paths, labeled), so each can be copied out individually.

Make it simple, systematic, and genuinely Anthropic in feel. One confident idea, executed with care.

─── END BRIEF ───
