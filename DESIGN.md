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
**Palette:** process inks. Stock `#eceae4`, key `#14140f`, process cyan `#0b8fd4`, process magenta `#bd005e`, process yellow `#f2b705` (colour bar only), held-reading green `#186b45`

> Magenta and green are darker than the first pull for a **measured** reason, not an aesthetic
> one. At `#d6006e` magenta scored 4.27:1 on stock and at `#1c7a4f` green scored 4.42:1 under
> stock text, so every small use failed WCAG AA. Lighthouse caught it. The `.state-open` pill also
> flipped to dark text, because process cyan is a light ink (stock on it is 2.96:1) and cyan
> cannot be darkened without breaking its other job as the Research chapter accent on near-black.
> **Re-check with a contrast calculator before changing any of these; do not nudge them by eye.**
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
| Chapter boundary | Paired `+` crop marks at the content column corners with a hairline between them. The SAME device at every join, varied only by the chapter accent. See below. |
| Block origin | A single `+` anchoring the section number. The second and final use of the glyph. |
| Section surface | The title restated as a pale oversized ghost headline bleeding past the column |
| Outer gutters | Vertical mono marginalia. The centre column is type, the margins carry everything else. |
| Research metrics | A densitometer readout, tabular figures |
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

## The crop-mark system, and why it repeats

Added 2026-08-03 from `~/.claude/design-library/print-tech-paper/01-performance-lab.md`, which is
Josh's own reference and whose provenance line outranks anything the model selected.

**Two uses of the glyph, and no third.** Paired at the content column corners with a hairline
between them for a boundary; single at a block's top-left as an origin anchor. That restraint is
what keeps it reading as a system rather than sprinkled ornament, and it is the reason the
viewport-corner crop marks were **removed** rather than kept: they were a third use.

This deliberately contradicts Ch1.4's "never reuse a divider twice on one page". House-style Ch0
ranks a supplied reference above the engine, and the entry calls the repetition out as the point.
Variation comes from the chapter accent, not from a different shape.

**The ghost headline is a committed surface with no image and no gradient**, which is why it does
not engage ban 1. It sits behind the `h2` only. Ch2.4 forbids texture behind anything the user
reads, and the first build of it overlapped the section lede by 46px, measured on the rendered
page. The lede now carries a top margin sized to clear it. **If the ghost scale changes,
re-measure that clearance rather than assuming it holds.**

**Margin photography is NOT implemented and that is a known gap.** The entry pins motion-blurred
photographs in the outer gutters. Ch6.3 row 2 still applies: no generation tool, no supplied
photography. The gutters carry mono marginalia instead, which honours the principle (the centre
column is type, the margins carry everything else) without faking the asset. Real photography in
the gutters would complete the technique.

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
- **The content fails open too, and this is the newest of the three.** The seven plates and the
  default row of the data table are **static markup in `index.html`**. They used to be injected
  from a `PLATES` array and a `renderTable()` call in `js/site.js`, which meant a 404 on that one
  file rendered the Work and Research sections empty. A 404 there is not hypothetical: it is
  exactly what a root-absolute path does on this project page. `js/site.js` now only *enhances*
  (filters, reveals, ambient gate, nav states). **Do not move page content back into JS.**
- **`activeBin` in `js/site.js` must match the static `<tbody>`,** which is written out for
  `[20,22)`. If one changes, change both. The `#bin-current` readout is static for the same
  reason and JS keeps it in sync.
- **Ambient budget:** 1 system, 3 members desktop, 2 on mobile. Cap is 3 systems / 30 elements.
  Note the ink is only ever *visible* over the hero: sections are opaque and sit above it, which is
  what keeps Ch2.4 satisfied (no texture behind anything the user reads).
- **No build step.** Vanilla HTML, CSS and JS, three files, no bundler and no CDN script tag.
- **Hiding a control with `opacity: 0` alone leaves it keyboard focusable.** The three-state nav's
  out-of-state CTAs also carry `visibility: hidden`, with `visibility` in their transition so the
  crossfade is unchanged. A focus walk of the built page landed on the invisible `.cta-link` while
  the bar was still in its hero state. Anything hidden by state must leave the tab order.
- **The font stylesheet loads non-blocking** (`media="print"` plus an `onload` flip, with a
  `<noscript>` copy). It was 804ms of an LCP that measured 3.3s on mobile.

## Verifying this page, and the two traps in doing it

Both cost real time. Neither is a defect in the page.

1. **`data-state` cannot be set by hand to test the nav.** The IntersectionObserver reasserts it,
   and in a backgrounded tab Chrome *defers* those callbacks, so a hand-set value sticks and every
   later reading is a lie. Scroll for real, then screenshot. The same deferral is why the reveal
   system had to be made fail-open.
2. **Reading computed style immediately after a state change reads mid-transition,** not the end
   state. Wait past `--dur-transition`, or screenshot.

A real narrow viewport is available without devtools: load the page in an `<iframe>` sized
`390x844`. Media queries and `dvh` resolve against the iframe, so it is a genuine test. That is how
the horizontal-scroll defect was found. It does **not** work for tap targets, because
`@media (pointer:coarse)` still does not match on a desktop machine.

## History

An earlier direction rendered this same content as a matchday team sheet, and before that as an
observatory instrument rack (see `PLAN.md`, superseded). Both are abandoned. The content roster of
seven projects, the exclusion reasoning, and the measured data survived all three directions and
are the stable part.
