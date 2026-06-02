# Monet style block — Anthropic pictogram (human + AI-graph)

Reference image: `anthropic_pictogram_style_reference.png` — a hand-drawn editorial pictogram in the Anthropic Claude language. Thick wobbly black marker contour of a human profile and hand reaching into a small terracotta-watercolor knowledge graph, on a flat warm cream-grey background. Two visual layers only: **black contour figure** + **terracotta graph overlay**. No fills, no shading, no third colour.

Use this style block when re-rendering any SpatialTimber pictogram that needs the same "human interacts with system" register — a single contour subject overlaid with the terracotta network. Pairs with (does not replace) the axonometric register documented in `monet/prompts/status_quo_axo_anthropic.md`.

---

## `style_to_apply` (paste into monet prompt)

```json
"style_to_apply": {
  "approach": "ANTHROPIC CLAUDE EDITORIAL PICTOGRAM on a flat WARM CREAM-GREY background, with exactly TWO visual layers: (1) the SUBJECT drawn as a thick wobbly black marker CONTOUR only — outline, no fills, no shading, no interior detail beyond the silhouette line; (2) a TERRACOTTA WATERCOLOR GRAPH overlay — filled terracotta circles connected by terracotta lines, sitting partly behind and partly in front of the subject so the two layers interlock. NO third colour, NO cream watercolor masses, NO grey rectangles, NO axonometric depth — this is a 2D contour pictogram, not a built-volume axonometric.",

  "line_character_black": "THICK marker-like weight (~12–18 px equivalent at 1000 px output), confident gestural hand-drawn quality with clear wobble and slight tremor along the path. Rounded line caps. Weight VARIES along strokes — slightly thicker at corners and direction changes, slightly thinner on long sweeps. The line reads as a single continuous brush gesture, not a vector outline. No CAD-stiffness, no perfect smoothness.",

  "subject_treatment": "The subject (human head profile, hand, body fragment, or whichever figure the pictogram represents) is rendered as an OPEN CONTOUR — outer silhouette plus the minimum interior lines needed to read the form (e.g. a hand has finger separations; a face has a nose / chin / ear notch). NO eyes, NO mouth, NO hair texture, NO clothing folds, NO shading inside the outline. The interior is the background colour showing through. Treat it like a confident two-second sketch, not an illustration.",

  "graph_overlay_nodes": "Graph nodes are small WATERCOLOR-FILLED TERRACOTTA CIRCLES (~#D08B7C with visible watercolor grain — darker pooled edges, slightly lighter centres, soft uneven density). Diameter varies subtly (~40–80 px equivalent). NO black outline on the nodes themselves — the watercolor edge IS the edge. The nodes sit on a single plane (no shadow, no 3D).",

  "graph_overlay_edges": "Graph edges are thinner TERRACOTTA LINES (~4–7 px equivalent), same warm terracotta hue (~#D08B7C) as the nodes, with the same hand-drawn quality as the black contour but in terracotta. Slight wobble, rounded caps, no arrowheads (this is an undirected knowledge graph, not a flow). Edges pass freely BEHIND the black contour where they cross it — do not break around the figure.",

  "layer_order": "Some terracotta graph elements sit BEHIND the black contour (occluded by the figure) and some sit IN FRONT (the figure 'reaches into' the network, e.g. a hand touches a node from in front). The intentional weave between the two layers is what gives the pictogram its meaning — the human and the system are interlocked, not stacked.",

  "watercolor_quality": "Watercolor on the terracotta only — visible grain, soft uneven density, darker pooled edges where the pigment dried, painterly brush-applied feel. NOT flat vector colour, NOT a smooth gradient, NOT digital airbrush. The terracotta circles look like they were painted with a wet brush on absorbent paper.",

  "background": "FLAT WARM CREAM-GREY (~#E8E5DD — a soft warm neutral, slightly cooler and greyer than the axonometric register's #EFEAE2 but in the same warm family). UNIFORM fill, NO texture, NO gradient, NO border, NO frame, NO ground line, NO shadow under the figure or graph. The background reads through any 'open' part of the contour figure."
}
```

---

## What this style does NOT include (compared to the axonometric register)

The axonometric pictogram register (`status_quo_axo_anthropic.md`, `shared_*_anthropic.md`) uses cream watercolor fills, light-grey floor-plan plates, mid-grey accent rectangles, and gentle tonal variation between top/front faces for axonometric depth. **None of that applies here.** This style is the **flat contour** counterpart:

| Aspect | Axonometric register | This pictogram register |
|---|---|---|
| Subject treatment | Filled volumes with watercolor masses | Outline-only contour, no fills |
| Background | Warm beige #EFEAE2 | Warm cream-grey #E8E5DD |
| Fills used | Cream + light-grey + mid-grey + terracotta | Terracotta only (graph overlay) |
| Depth cues | Top-face / front-face tonal split | None — 2D flat |
| Black line role | Outlines every edge of every volume | Single confident contour of one subject |
| Terracotta role | Fills the timber framework members | Fills the AI knowledge-graph nodes + edges |

Both share: thick wobbly hand-drawn black marker line, watercolor texture on terracotta, no text, no shadows, warm-family background.

---

## Use this style when

- The slide needs a "human ↔ AI" or "designer interacts with system" visual.
- The subject is a person, hand, body fragment, or single object (NOT a building or a stack of slabs).
- The terracotta graph is the active element — the figure is the contour that gives the graph context.
- You want a register that visually CONTRASTS with the axonometric pictograms on the same deck (e.g. a methodology slide between two architecture slides).

Do NOT use this style for axonometrics, floor plans, structural framework drawings, or any subject that needs filled volumes — those go through the axonometric register instead.
