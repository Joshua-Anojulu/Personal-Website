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
**Primary action:** "Projects" - this exact label in the nav, the hero, the sticky bar, the scroll cue and the section heading
**Palette:** process inks. Stock `#eceae4`, key `#14140f`, process cyan `#0b8fd4`, process magenta `#bd005e`, process yellow `#f2b705` (declared, currently unused), held-reading green `#186b45`

> Magenta and green are darker than the first pull for a **measured** reason, not an aesthetic
> one. At `#d6006e` magenta scored 4.27:1 on stock and at `#1c7a4f` green scored 4.42:1 under
> stock text, so every small use failed WCAG AA. Lighthouse caught it. The `.state-open` pill also
> flipped to dark text, because process cyan is a light ink (stock on it is 2.96:1) and cyan
> cannot be darkened without breaking its other job as the accent on a near-black chapter.
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
| Primary button | Overprint: ink knocked out of stock, with a magenta offset that collapses on press |

## Layout families used (Ch5.7, no family repeated)

1. Hero: full-bleed type composition, name split across the frame
2. Projects: numbered plates in a ledger, in **two groups**. Not a card grid, and there are
   **zero** equal-card rows
3. Contact: a two-column colophon

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

**On ban 3:** every number on the page is measured, and they now all live in the plate copy in
`index.html`. The SDSS source count, the satellite F1 figures and the influenza season count come
from those projects' own reported results; the `ccspike` percentages come from its README. Add a
number only if it is sourced.

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

## The two Projects groups

The first four (01 to 04) carry **no group heading at all**. They sit directly under "Projects"
and need no second label; only the point where the research begins needs marking, so **Research**
(05 to 08) is the only divider. The plate numbers run **straight through both**, because a proof
sheet numbers its plates continuously no matter how the run is divided. Do not restart at the
divider, and do not add a heading over the first four.

Because the first group is unheaded, the Research divider is a **paragraph whose id labels its own
list** (`aria-labelledby`), not a heading. A heading there would sit above the plate names, push
them to `h4`, and leave the unheaded first group skipping a level.

The group marker is **type and rule only, with no `+` glyph**. Both permitted uses of that glyph
are already spent (paired for a chapter boundary, single for a section origin), and the library
entry is explicit that a third use is what turns the system back into ornament.

The earlier "Research" ambiguity is **resolved**: the `#data` section that also carried that word
was removed, so the divider is now the only place it appears.

## Internships are deliberately NOT on the proof sheet

Decided 2026-08-03. Every plate has the same shape: a thing, a measured outcome, and either a link
or an explicit "Source restricted". The internships cannot hold that shape. One had not started
yet, and the other is an architecture document for a proprietary ERP, so there is nothing to link
and nothing to quantify publicly. As plates they would be the only entries with no link, no result
and no number, which weakens the standard the other eight set.

The fact is not missing from the page: the Contact block states the August to December 2026
internship next to the availability line, which is where it is actually decision-relevant.

Revisit only when a role produces something showable or measurable. Do not add it as a plate to
fill space.

## The page currently has NO dark chapter

The `#data` section was the only `.key` chapter, and it was removed on 2026-08-03 along with the
calibration readout. The page now runs one tone from top to bottom, which costs the light-to-dark
chapter flip that this family uses as a structural device.

`.key` is deliberately **kept in the CSS and unused**. Adding `key` beside `block` on any section
switches its accent, rules and soft foreground together, and its contrast values are already
measured (cyan accent 5.19:1, soft text 7.16:1). Contact is the obvious candidate. Josh has not
asked for this, so it has not been done.

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
- Anchor ids: `#top`, `#work`, `#contact`. **`#work` keeps its id** even though the heading now
  reads "Projects", so nothing that already links here breaks.
- Nav labels: Projects, Contact, GitHub. Section headings match them exactly (Ch2.2).

## Implementation rules a future session must not break

- **The reveal system fails open.** `.reveal { opacity: 0 }` is scoped to `.js`, set by an inline
  head script, and a synchronous sweep handles above-the-fold. No JS, a thrown error, or an
  IntersectionObserver that never delivers (Chrome defers IO in background tabs) all leave content
  **visible**. Never move that rule out of the `.js` scope.
- **The ambient gate fails open too.** CSS default is `running`; the JS sets `paused`. A wiring
  failure costs battery rather than silently freezing a MOTION 8 page with no error.
- **The content fails open too, and this is the newest of the three.** All eight plates are
  **static markup in `index.html`**. They used to be injected from a `PLATES` array in
  `js/site.js`, which meant a 404 on that one file rendered the section empty. A 404 there is not hypothetical: it is
  exactly what a root-absolute path does on this project page. `js/site.js` now only *enhances*
  (filters, reveals, ambient gate, nav states). **Do not move page content back into JS.**
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

## Performance: where it stands and what NOT to do about it

Measured on the live URL, mobile preset, three runs: **performance 85-86, accessibility 100,
best practices 100, SEO 100. CLS 0, TBT 0ms, 187 KiB total.** FCP, LCP and Speed Index all sit at
**3.3s**, above the 2.5s LCP target.

That 3.3s is dominated by Lighthouse's simulated mobile network (562ms request latency, 4x CPU)
plus the one render-blocking stylesheet. Server response is 40ms and every real request completes
inside 280ms, so there is no fat to cut.

**Two things were tried and one of them was wrong.** Loading the font stylesheet non-blocking was
correct and kept. Moving the hero off the JS reveal onto a CSS entrance did **not** improve FCP or
LCP, because first paint was never JS-bound; it only added a stagger, and Speed Index went
3.3s to 4.9s until the delays were compressed. The `.rise` class was kept anyway because it is
genuinely more robust, not because it was faster.

**Do not inline critical CSS to chase the remaining LCP.** It would mean a hand-maintained copy of
the above-fold rules living in `index.html` and silently drifting from `styles.css`, and it breaks
the no-build-step rule that the rest of this file depends on. The honest read is that this page is
fast in absolute terms and the score is a throttling artifact.

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
observatory instrument rack (see `PLAN.md`, superseded). Both are abandoned. The content roster,
the exclusion reasoning, and the measured data survived all three directions and are the stable
part.

The roster went from seven plates to **eight** on 2026-08-03 with `ccspike`, a public MIT-licensed
TypeScript CLI. It qualified on the same bar as the rest: public source, a real README, tests and
CI, and numbers that are measured rather than claimed. Its own README refuses to sum token
categories or assert causation, which is the register this page is already written in.
