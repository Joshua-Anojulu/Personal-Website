---
schema_version: 1
generated: 2026-08-02
source_authority: house-style
source_version: 2026-08-02
precedence: below current user and project instructions
regenerate_when: the design read changes, or the source authority is edited
---

# Design contract - Personal-Website

**Family:** print-tech paper
**World:** a printer's proofing table at press check
**Dials:** WORLD 8 / MOTION 8 / VARIANCE 7 / DENSITY 4 stage, 7 content
**Primary action:** "Work" - this exact label in the nav, the hero, the sticky bar and the section heading
**Palette:** process inks. Stock `#eceae4`, key `#14140f`, process cyan `#0b8fd4`, process magenta `#d6006e`, process yellow `#f2b705` (colour bar only), held-reading green `#1c7a4f`
**Type:** display Archivo (variable, wght 400-900, wdth 62-125), body Inter, mono IBM Plex Mono

## Why this family, and why WORLD is 8

Ch6.3 row 2: no image generation is available and no photography is being supplied, so
figurative art is out. That caps *illustrated* families at 5, but print-tech paper is
non-illustrative and reaches **8** on type, rules, marks and ink alone. The previous build
translated an illustrated-place world (a matchday) and was honestly capped at 7. Dropping that
world raised the ceiling rather than lowering it.

**The palette is deliberately not derived the obvious way.** Appendix A names "a printer's
proofing table" as a world that hands you the beige-and-brass warm-craft tell, and says explicitly
that deriving from the world does not launder it. So the colour comes from process inks instead of
from paper-and-leather. No beige, no brass, no oxblood.

## References this was steered by

Supplied by Josh, matched for feel and never for layout or content:

- `theperformancelab.ca` - colossal tight-tracked grotesk as the hero's entire visual, hard
  light-to-dark chapter flip, mono micro-labels against huge display, one saturated accent, and a
  red `+` on a grid intersection which is a **registration mark**. That mark is what identified
  print-tech as the family that already explains this reference.
- `eladiodieste.com` - the name split across the frame (top-left / bottom-right), a hairline rule
  with navigation sitting on it, type colour drawn from the ground.
- `klimtwine.com` - diegetic progress, taken as a principle only. Its intro overlay failed to
  dismiss during review, which is the exact Ch3.9 failure mode, so no blocking intro was built.

`~/.claude/design-library/` was empty at build time, so these three are the whole reference set.

## Diegetic chrome (Ch1.5)

| UI role | Rendered as |
|---|---|
| Wordmark and nav | A registration mark beside the name, nav on a hairline rule |
| Project entry | A numbered plate on a proof sheet |
| Chapter boundary | A different press artifact each time: colour bar, scored trim line, registration mark |
| Research metrics | A densitometer readout, tabular figures |
| Page trim | Crop marks fixed at the viewport corners |
| Primary button | Overprint: ink knocked out of stock, with a magenta offset that collapses on press |

## Layout families used (Ch5.7, no family repeated)

1. Hero: full-bleed type composition, name split across the frame
2. Work: numbered plates in a ledger. Not a card grid, and there are **zero** equal-card rows
3. Research: a real data table with filter controls
4. Contact: a two-column colophon

## Hard bans - these always fail, no override

1. A gradient as the hero's primary visual
2. Div-based fake screenshots, dashboards, terminals, task lists
3. Invented precise statistics
4. Spray-on glassmorphism
5. Placeholder-slop content and filler verbs
6. Em dashes and en dashes in user-visible copy

**On ban 1 specifically:** the ambient ink layer is three blurred colour fields, and it is kept at
`opacity: .09` on purpose. The type is the hero's visual; the ink must stay under it. If a future
change makes those fields prominent enough to read as the subject, that is a ban-1 violation even
though nothing else changed.

**On ban 3:** every number on the page is measured. The calibration matrix in `js/site.js` is real
output from the study's `results/metrics_by_magnitude_agg.csv`; the satellite and influenza figures
come from those projects' reported results. Add a number only if it is sourced.

## Overrides taken, with reasons

- **Scroll cue in the hero**, because the hero is a full-bleed type composition with no content
  edge visible below the fold.
- **Numbered plates and numbered sections**, because a proof sheet numbers its plates and the
  number is information rather than `001 / INDEX` decoration.
- **Ch0.5 stages 1 and 2 skipped**, because the direction was locked by the three references plus
  the asset constraint, which is the stated skip condition.

## Must not change silently (Ch8.3)

- The Pages path. This is a **project** page served at `/Personal-Website/`, so **every asset path
  must stay relative**. A root-absolute `/css/...` works locally and 404s in production.
- Anchor ids: `#top`, `#work`, `#data`, `#contact`.
- Nav labels: Work, Research, Contact, GitHub. Section headings match them exactly (Ch2.2).

## Implementation rules a future session must not break

- **The reveal system fails open.** `.reveal { opacity: 0 }` is scoped to `.js`, set by an inline
  head script, and a synchronous sweep handles above-the-fold. No JS, a thrown error, or an
  IntersectionObserver that never delivers (Chrome defers IO in background tabs) all leave content
  **visible**. Never move that rule out of the `.js` scope.
- **The ambient gate fails open too.** CSS default is `running`; the JS sets `paused`. A wiring
  failure costs battery rather than silently freezing a MOTION 8 page with no error.
- **The data table compares the three recalibration methods against each other, per row.**
  Comparing them to raw ECE instead marks LogReg temperature as good at 0.07583 despite being 2.4x
  worse than its own raw value, which contradicts the caption. That was a real bug, found by
  reading the rendered table.
- **Ambient budget:** 1 system, 3 members desktop, 2 on mobile. Cap is 3 systems / 30 elements.
- **No build step.** Vanilla HTML, CSS and JS, three files, no bundler and no CDN script tag.

## History

An earlier direction rendered this same content as a matchday team sheet, and before that as an
observatory instrument rack (see `PLAN.md`, superseded). Both are abandoned. The content roster of
seven projects, the exclusion reasoning, and the measured data survived all three directions and
are the stable part.
