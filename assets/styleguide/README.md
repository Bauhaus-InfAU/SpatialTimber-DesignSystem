# SpatialTimber Styleguide — Zukunft Bau Projekttage 2026

> **Provenance.** Copied into SpatialTimber-Utils as the shared, canonical styleguide for the
> project (2026-06-02). It originated in the presentation repo
> (`SpatialTimber - Documents/04_Publications and Presentations/03_ZukunftBau Projektetage 2026/styleguide`).
> Relative links below to `../monet/`, `../_assets/`, `../README.md`, and
> `../Presentation_Design_Brief.md` point at that **source** repo, not at this one — they are
> kept verbatim for reference.

Visual-language reference for the Zukunft Bau 2026 deck. Two registers of editorial illustration are documented here, both used by the monet image-generation pipeline (`../monet/`) when re-rendering hand-drafted assets through nanobanana. Both registers share one accent (terracotta ~#CC785C / #D08B7C) and warm-family backgrounds, so a slide that mixes both still reads as one deck.

## Folder layout

```
styleguide/
├── README.md                                 ← this index
├── palette.html                              ← interactive colour palette (open in browser)
│
├── anthropic_pictogram_style_reference.png   ← reference image for the FLAT CONTOUR register
├── anthropic_pictogram_style_monet.md        ← monet style block describing that register
│
├── pictograms/                               ← existing project pictograms (axonometric register)
│   ├── Hand-BuildingBricks.svg               ← the deck's own hand-drawn pictograms
│   ├── Hand-City-light.svg
│   ├── Hand-City-dark.svg
│   ├── Object-Scale.svg
│   ├── 6903d2…-1000x1000.svg  (×11)          ← Anthropic Webflow pictograms (reference set)
│   └── index.html                            ← thumbnail index
│
├── engineering-headers/                      ← 24 header icons, one per Anthropic engineering post
│   └── <slug>.svg                            ← e.g. managed-agents.svg, claude-code-auto-mode.svg
│
└── scheme/                                   ← scheme / diagram register (NEW)
    ├── README.md                             ← documents the 8 archetypes (A–H)
    ├── anthropic_scheme_style.md             ← monet style block for the scheme register
    ├── managed-agents-fig1.png               ← A · hub-and-spoke
    ├── managed-agents-fig2.png               ← B · interface table
    ├── managed-agents-fig3.png               ← C · two-node exchange
    ├── managed-agents-fig4.png               ← D · stacked-pair multiplicity
    ├── claude-code-auto-mode-fig1.png        ← E · 2-axis scatter
    ├── claude-code-auto-mode-fig2.png        ← F · main + branch
    ├── claude-code-auto-mode-fig3.png        ← G · before / after
    └── claude-code-auto-mode-fig4.png        ← H · two-stage pipeline
```

## Three visual registers, three monet style files

| Register | Reference | Monet style file | Use for |
|---|---|---|---|
| **Axonometric** | `pictograms/Hand-*.svg`, `pictograms/Object-Scale.svg` | `../monet/prompts/status_quo_axo_anthropic.md` and `shared_*_anthropic.md` | Built volumes — buildings, floor slabs, structural frameworks, axonometric stacks. Thick wobbly black outlines, watercolor cream / light-grey / mid-grey fills, terracotta reserved for the timber members. Warm beige background (~#EFEAE2). |
| **Flat contour pictogram** | `anthropic_pictogram_style_reference.png` | `anthropic_pictogram_style_monet.md` | Human-system interaction visuals — a person, hand, or body fragment overlaid with a terracotta knowledge graph. Thick wobbly black CONTOUR only (no fills, no shading), terracotta watercolor graph overlay that weaves through the figure. Warm cream-grey background (~#E8E5DD). |
| **Scheme / diagram** | `scheme/*-fig*.png` (8 references, 8 archetypes A–H) | `scheme/anthropic_scheme_style.md` | System architecture, flow, pipeline, scatter, before/after diagrams — the editorial-blog scheme look. CRISP THIN VECTOR (not hand-drawn), rounded soft-grey nodes with header tabs, dashed group containers, terracotta accent on exactly one system-defining node. Warm cream page (~#F5F0E6) with a paler cream inner container (~#FAF6EE). |

## Choosing the right register for a slide

1. **Is it a built object** (building, slab, frame)? → axonometric register.
2. **Is it a person interacting with a system**? → flat contour pictogram register.
3. **Is it a diagram of how something works** (architecture, flow, scatter, before/after)? → scheme register.
   - Then pick the matching archetype A–H from `scheme/README.md`.
4. **Is it a small generic header icon** (single-concept, ~500–1200 px square)? → see `engineering-headers/` for Anthropic's own one-icon-per-post set; mine for visual cues only.

## Shared rules across all three registers

- **One terracotta accent rule** — terracotta marks exactly one element per artwork: the system-defining one (timber framework in axonometrics, knowledge graph in contour pictograms, the single emphasis node in schemes). Never spread terracotta across multiple elements.
- **Warm-family backgrounds** — never pure white. Pick the register's specific cream / beige / cream-grey.
- **No text inside generated images** — labels live on the slide, not inside the artwork. The only exception is the scheme register (node titles, axis labels, arrow labels), where text IS the content.
- **No drop shadows, no gradients, no 3D, no photo-realism** — anywhere.

## Workflow — re-rendering a hand draft

1. Decide the register (axonometric / contour pictogram / scheme).
2. For the scheme register: pick the archetype (A–H from `scheme/README.md`).
3. Locate the reference PNG/SVG that matches.
4. Open the corresponding monet style `.md` file, copy the `style_to_apply` block into a new prompt.
5. Fill in the prompt's `primary_instruction` with what the hand draft actually shows (node names, connection labels, which element gets the terracotta accent).
6. Pass the hand draft as `--starter` (geometry source) and the matching reference image as `--style-ref` (aesthetic source).
7. Generate via `../monet/_gen.ps1` (per global instruction: never invoke nanobanana directly — always through `_gen.ps1`).

## Related

- Deck source of truth: `../README.md` and `../Presentation_Design_Brief.md`
- Existing per-slide monet prompts: `../monet/prompts/`
- Style reference snapshots used by Claude Design: `../_assets/style_reference/`
