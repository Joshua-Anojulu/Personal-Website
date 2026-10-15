# Design contract: Personal-Website

Revised October 2026. This replaces the earlier "proofing table" contract.

## Idea

My research asks one question in many forms: when a model, a benchmark or a pipeline says
something, is it true? The page is built around that question. It opens with a real
calibration chart, promised purity against delivered purity, and everything after it is a
claim with its evidence one click away.

## The one bold element

The hero chart. It is drawn in inline SVG from real numbers (the faint magnitude bin of
`results/metrics_selection_agg.csv` in the SDSS calibration repository), on graph paper,
with a thick yellow line for "promise kept." Everything else on the page stays quiet so the
chart is the thing people remember. Do not add a second showpiece.

Rules for the chart:

- Never move a point by eye or round it differently from the source file. If the study's
  numbers change, recompute the coordinates: x = 64 + (promised - 0.70) x 1200,
  y = 384 - (delivered - 0.70) x 1200, on a 0.70 to 1.00 domain.
- The three well-calibrated models overlap because their numbers overlap. Do not spread
  them apart to make the cluster look busier.
- The chart must be complete without JavaScript. `js/site.js` only adds the load sequence
  and the readouts; with reduced motion the chart is simply drawn.

## Palette

| Token | Value | Use |
|---|---|---|
| `--paper` | `#F5F7F9` | page background |
| `--ink` | `#17223D` | text, rules, the points that keep their promise |
| `--ink-soft` | `#56617A` | secondary text (6.1:1 on paper) |
| `--rule` | `#D6DCE4` | section separators |
| `--grid` | `#E3E8EF` | graph-paper grid, chart only |
| `--sticker` | `#F2C318` | the "promise kept" line and accepted-paper tags, like a calibration sticker |
| `--miss` | `#BF3A30` | the broken promise; data only, never decoration |

Yellow is never used for text on paper. Red is only for a measured miss.

## Type

- Instrument Serif for the name and section titles.
- Instrument Sans for everything else, with tabular figures. Small metadata uses a slightly
  narrower width instead of capitals or a monospace face.

## Layout

- Hero: name, one sentence, a short introduction and two actions on the left; the chart on
  the right. One column on narrow screens.
- Every section after it: the title in the left column, content in the right column, with a
  line length under about 70 characters.
- No cards, no numbered markers, no labels in capitals, no arrows on links.

## Copy

Plain first person. Every number on the page has a source in a repository, an acceptance
email or the application record. Status words are exact: "to appear," "poster," "under
review," "in development," "paused." If a status changes, change the word.

## Quality floor

- No horizontal scroll at 360 px.
- Visible keyboard focus everywhere, including the chart points.
- `prefers-reduced-motion` turns off the load sequence.
- Text contrast at least 4.5:1.
