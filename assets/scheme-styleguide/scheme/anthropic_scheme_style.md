# Monet style block — Anthropic editorial scheme

> **Context & provenance.** Part of the **SVG-scheme authoring styleguide** (not a general project
> styleguide). Copied into SpatialTimber-DesignSystem on 2026-06-02 from the presentation repo
> (`…/03_ZukunftBau Projektetage 2026/styleguide/scheme/`). Paths to `monet/prompts/…`,
> `status_quo_axo_anthropic.md`, `references/styles/…`, and the `*_anthropic.md` prompt files refer
> to that **source** repo and are **not present here** — they're kept verbatim as reference. For
> authoring SVGs in this repo, the parts that apply are the palette, geometry, and typography tokens
> below and in [`svg-from-png-workflow.md`](svg-from-png-workflow.md); the Gemini/Nano-Banana
> generation pipeline does not exist in this repo.

> **For SVG schemes (not Monet/Gemini renders)** — the canonical palette is in [`svg-from-png-workflow.md` § 4](svg-from-png-workflow.md#4--style-tokens-v7-lora-calibrated-may-2026). This monet style block targets the Gemini Nano-Banana image-generation pipeline; the palette below is observed from Anthropic reference renders and is what Gemini should reproduce. For hand-authored SVGs, use the refreshed palette: page `#FAF9F5`, card fill `#F0EEE6`, chrome (outlines + arrows) `#9C9A92` at stroke-width 6, text `#5E5D59`.

Paste the JSON below into any monet prompt that re-renders a hand-drafted SpatialTimber scheme in the **Anthropic engineering-blog** scheme aesthetic. It is the **scheme** counterpart to the existing `*_anthropic.md` axonometric / pictogram prompts in `monet/prompts/`. Designed to slot into the same template structure as the `style_to_apply` block in `status_quo_axo_anthropic.md`.

When using this style block:

- **Starter image** = the hand-drafted scheme (line-art, pencil, or whiteboard photo). Pass via `--starter`. The starter is the GEOMETRY SOURCE — preserve node positions, connection topology, group boundaries, arrow directions, and labels.
- **Style reference** = the matching archetype PNG from `styleguide/scheme/` (see `README.md` for archetype A–H mapping). Stage at `references/styles/anthropic_scheme/<archetype>.png`.
- **Pick the archetype FIRST**, then fill in the prompt's `primary_instruction` with the specific node names, connection labels, and which node carries the terracotta accent.

---

## Reusable JSON blocks

### `style_to_apply` (drop into the main prompt)

> **2026-05-22 palette revision.** All hex values below are sampled directly by the user from `managed-agents-fig1.png`. The page is now **pure white** (not warm cream), outlines are **soft and light** (#D8D6D0 — not the previous dark warm-grey), and **no inner container** by default — cards sit on the white page. The emphasis-fill convention and single-terracotta-accent rule are unchanged.

```json
"style_to_apply": {
  "approach": "ANTHROPIC ENGINEERING-BLOG editorial scheme aesthetic on a PURE WHITE PAGE. Soft warm off-white cards with light beige tabs, hairline soft-grey outlines, light warm-grey arrows, near-black text. ONE terracotta accent reserved for the system's defining element. Crisp vector — NOT hand-drawn, NOT wobbly, NOT watercolor. This is the editorial-CHART counterpart to the editorial-AXONOMETRIC style used elsewhere in the deck.",

  "page_and_container": "PAGE BACKGROUND is PURE WHITE (#FFFFFF). By default there is NO inner container — cards sit directly on the white page with generous whitespace. If a particular scheme benefits from a subtle inner container (large multi-node layouts), it can be a rounded rectangle (corner radius ~32 px, no stroke) filled with a hair-darker off-white (#FBFAF5), but most schemes should skip the container entirely. NO border, NO frame, NO shadow, NO drop-shadow.",

  "node_boxes": "Each node is a ROUNDED RECTANGLE (corner radius ~14 px) with a thin ~1.2 px outline in soft light grey (#D8D6D0). DEFAULT-fill nodes are warm off-white (#F7F5EE). EMPHASIS-fill nodes (used for the focus / output / the node the slide is about) are slightly darker light beige (#E5E1D5). Each node has a thin HEADER TAB strip along its top (~28 px tall) in light beige (#EAE7DE for default cards, #DAD5C8 for emphasis cards) — this tab carries the bold node label. A MANDATORY ~1.2 px horizontal hairline in the SAME #D8D6D0 outline colour runs between the tab and the body of every card, edge-to-edge between the card's left and right outlines — clearly visible, never omitted. No drop shadow, no gradient, no inner glow.",

  "stacked_multiplicity": "Where the hand draft shows 'many of X', render the node as 2–3 OFFSET DUPLICATE CARDS behind the front card (offset ~6–8 px right and down per layer, same fill, same outline, same corner radius). Suggests a stack without exploding the node count.",

  "line_character": "All lines are CRISP THIN VECTOR — ~1.2 px outline weight on node boxes in soft light grey (#D8D6D0), ~1.5 px on connecting arrows in light warm-grey (#B3B1A8). NO wobble, NO hand-drawn warmth, NO varied weight along strokes. Outlines are INTENTIONALLY LIGHT — cards should feel like they gently rest on the white page, not be heavily framed. The line quality is editorial-vector, NOT marker-pen.",

  "arrows_and_connectors": "Solid arrows = ~1.5 px light warm-grey (#B3B1A8) line with a SIMPLE STROKED V arrowhead (two short strokes meeting at the tip, NOT a filled triangle, NOT a chevron block). Dashed arrows = same colour and weight, dash pattern ~6 px on / 4 px off, same V arrowhead. Arrow LABELS sit DIRECTLY on or just above the arrow line in near-black sans (#2A2A29), small (~14–16 px), NO chip background, NO outline around the label.",

  "group_containers": "When the hand draft shows a sub-region (a sub-pipeline, an alternative path, a named stage), render the region as a DASHED ROUNDED RECTANGLE in light warm-grey (#B3B1A8), corner radius ~16 px, dash pattern ~8 px on / 5 px off. The region's NAME is a plain bold sans caption ABOVE the container (NOT inside a tab) in near-black, ~16–18 px.",

  "typography": {
    "node_title": "Bold geometric sans (Styrene-like / Inter Bold), near-black (#2A2A29), ~16–18 px, centred on the node's header tab",
    "node_sub_caption": "Light italic sans, warm grey (#8C8579), ~12–14 px, sits BELOW the node (NOT inside it)",
    "arrow_label": "Regular sans, near-black (#2A2A29), ~14–16 px, no chip / no outline",
    "group_label": "Bold sans, near-black (#2A2A29), ~16–18 px, above the dashed group rectangle",
    "axis_label": "Regular sans, near-black (#2A2A29), ~18–22 px, vertical text on Y axis, horizontal on X axis (for archetype E only)",
    "code_or_signature": "Monospace (Berkeley Mono / JetBrains Mono / Menlo), near-black (#2A2A29), ~13–14 px (for archetype B only)"
  },

  "icons_inside_nodes": "Single-weight LINE ICONS in near-black (#2A2A29), schematic and simple — toolkit, terminal prompt '>_', stacked-checklist, node-graph, document. Stroke weight ~2 px, rounded line caps. NO filled icons, NO multi-colour icons. One icon per node, centred in the node body below the header tab.",

  "accent_terracotta": "ONE terracotta accent (~#CC785C — warm coral, matches the Claude 'spark' / asterisk colour) is reserved EXCLUSIVELY for the SYSTEM-DEFINING ELEMENT. In SpatialTimber schemes this is the node that represents the TIMBER RAUMTRAGWERK, the SURROGATE MODEL, or whichever element the slide is making its claim about — exactly ONE node per scheme. Apply as: (a) the icon inside the central / emphasis node rendered in terracotta instead of black, OR (b) for archetype E scatter charts, the data-ramp accent on the highest-emphasis data point, OR (c) if the scheme embeds a watercolor pictogram that already contains a terracotta region, that region IS the single accent — no additional terracotta in the scheme elements. NEVER use terracotta for outlines, fills, arrows, or labels. NEVER more than one accent location per diagram.",

  "axes_for_scatter": "Archetype E only. X and Y axes are drawn as thin (~1.5 px) near-black lines with a simple V arrowhead at the far end. Axis labels are bold sans, rotated 90° on Y. Data points are FILLED CIRCLES (~24–32 px diameter) in the legend's discrete colour ramp: grey (~#C8C2B6) / warm-yellow (~#E8C46A) / coral (~#CC785C) / dark red (~#7C2E22). Legend is a small rounded-rectangle box top-left with the ramp swatches and labels stacked.",

  "background": "PURE WHITE (#FFFFFF), flat and consistent, NO texture, NO gradient, NO border, NO frame, NO ground line, NO shadow. Pure flat white. The inner container is skipped by default — only used for complex multi-node layouts that benefit from a soft enclosing rectangle, in which case it is the hair-darker off-white #FBFAF5."
},

"constraints_scheme": [
  "ABSOLUTELY NO hand-drawn wobble, NO marker-pen weight variation, NO watercolor texture, NO sketch lines. This is CRISP VECTOR editorial, not the axonometric pictogram style.",
  "EXACTLY ONE terracotta accent per scheme — applied to the single system-defining node (or single emphasis data point in archetype E, or the embedded watercolor pictogram's terracotta region for annotated-pictogram schemes). NEVER multiple terracotta nodes, NEVER terracotta arrows, NEVER terracotta labels.",
  "PRESERVE the starter's TOPOLOGY EXACTLY — same node count, same node identities, same connection directions, same dashed-vs-solid distinction, same group boundaries, same arrow labels (spelled identically).",
  "Arrowheads are SIMPLE STROKED V shapes, never filled triangles, never chevrons, never circles.",
  "Group regions use DASHED rounded rectangles, NOT solid borders, NOT shaded panels.",
  "All node fills come from the LIGHT off-white family only: warm off-white (#F7F5EE) default, slightly darker light beige (#E5E1D5) emphasis, light beige tab (#EAE7DE default / #DAD5C8 emphasis). No other fill colour anywhere except the single terracotta accent and (for archetype E) the four-stop scatter ramp.",
  "Outlines are LIGHT and SOFT (#D8D6D0) — not dark warm-grey. Cards rest gently on white; they are not heavily framed.",
  "Typography is the SAME family throughout the scheme — bold geometric sans for titles, light italic for sub-captions, regular for arrow labels. No serif fonts, no decorative fonts, no all-caps display fonts.",
  "Page background is PURE WHITE (#FFFFFF). By default NO inner container. NO warm-cream tint anywhere on the page.",
  "NO drop shadows, NO ambient occlusion, NO gradients, NO 3D, NO photo-realism, NO perspective, NO ground plane.",
  "Composition is generously padded and axis-aligned — read direction is hub-and-spoke (A), left-to-right (B, C, F, G), top-to-bottom (H), or quadrant (E). Pick ONE reading direction and stick to it.",
  "Aspect ratio matches the hand draft's natural composition — typically square (A, F, H) or wide landscape (B, C, D, G) or tall portrait (rare). For archetype E (scatter) use 4:3 or 1:1."
],

"palette_scheme": {
  "page_background": "#FFFFFF",
  "container_background_optional": "#FBFAF5",
  "node_fill_default": "#F7F5EE",
  "node_fill_emphasis": "#E5E1D5",
  "node_tab_default": "#EAE7DE",
  "node_tab_emphasis": "#DAD5C8",
  "outline_soft_grey": "#D8D6D0",
  "arrow_light_warm_grey": "#B3B1A8",
  "text_primary": "#2A2A29",
  "text_sub_caption": "#8C8579",
  "terracotta_accent": "#CC785C",
  "scatter_ramp": ["#C8C2B6", "#E8C46A", "#CC785C", "#7C2E22"]
}
```

---

## Per-archetype quick-fill table

When writing a new prompt, pick the row that matches your hand-drafted scheme and copy the **starter style ref** + **emphasis node rule**:

| Archetype | Style ref to stage | Emphasis-node fill goes on… | Terracotta accent on… |
|---|---|---|---|
| A · Hub-and-spoke | `managed-agents-fig1.png` | the CENTRE node | the centre node's icon |
| B · Interface table | `managed-agents-fig2.png` | the header row | one row's "satisfied by" cell (the project-defining one) |
| C · Two-node exchange | `managed-agents-fig3.png` | the right-hand node | the right-hand node's icon |
| D · Stacked-pair multiplicity | `managed-agents-fig4.png` | the left stack | the left stack's icon |
| E · 2-axis scatter | `claude-code-auto-mode-fig1.png` | n/a — uses the data ramp | the highest-emphasis data point (coral or dark-red ramp stop) |
| F · Main + branch | `claude-code-auto-mode-fig2.png` | the tall main-process node on the left | inside the dashed sub-pipeline group — the recursive node |
| G · Before / after | `claude-code-auto-mode-fig3.png` | the right column (filtered output) | the last surviving row in the right column |
| H · Two-stage pipeline | `claude-code-auto-mode-fig4.png` | the final "result" node | the node that represents the system-defining element (surrogate / Raumtragwerk) |

---

## Intent

Pairs with the existing `*_anthropic.md` axonometric / pictogram prompts so the deck holds ONE coherent visual language across two illustration registers:

- **Axonometric register** (status-quo, apt, floor, building pictograms): warm-beige page, THICK wobbly hand-drawn black outlines, watercolor fills, terracotta on the timber members.
- **Scheme register** (this file, as of 2026-05-22): **white page**, soft light-grey hairlines, flat off-white card fills, terracotta on the system-defining node (or inherited from an embedded watercolor pictogram for annotated-pictogram schemes).

Both registers share the same terracotta accent (~#CC785C). When a slide mixes an axonometric on warm-beige with a scheme on pure white, the contrast is intentional — the white scheme page reads as the modern "editorial diagram" plane while the beige axonometric reads as the hand-drawn "field sketch" plane. Both still belong to one deck because of the shared terracotta and the shared typographic/illustration discipline.
