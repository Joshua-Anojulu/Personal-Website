# Personal Website

A matchday portfolio for Joshua Anojulu, built as a team sheet on a floodlit
pitch. Static HTML, CSS and JavaScript with no build step and no dependencies.

The squad is seven entries ordered by shirt number: three shipped and public
projects, then four research entries whose repositories are private. The match
statistics table carries the real per-magnitude calibration matrix from the SDSS
study, filterable by magnitude bin, and every figure on the page is a measured
value rather than an estimate. The penalty is a signposted easter egg, not a
gate, so nothing on the page is hidden behind it.

## Design

`DESIGN.md` is the design contract. It records the world, the four dials, the
palette, the layout families, the references the build was steered by, and the
things that must not change silently. Read it before touching the visual layer,
including from Codex or Cursor, so a later session does not start from the model
average.

Two implementation rules in there are load-bearing and easy to break by tidying:

- The reveal system **fails open**. `.reveal { opacity: 0 }` is scoped to `.js`,
  which an inline head script sets. Without JavaScript, or with an
  IntersectionObserver that never delivers, content stays visible instead of
  rendering blank.
- The ambient gate **fails open** as well. The CSS default is `running` and the
  JavaScript sets `paused`, so a wiring failure costs battery rather than
  silently freezing the page with no error.

## Built With

- **HTML5**
- **CSS3**, custom properties throughout so every aesthetic value is a knob
- **Vanilla JavaScript**
- **Google Fonts**, [Archivo](https://fonts.google.com/specimen/Archivo), [Inter](https://fonts.google.com/specimen/Inter), [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono)

## Project Structure

```text
.
|-- index.html
|-- DESIGN.md
|-- css/
|   `-- styles.css
`-- js/
    `-- site.js
```

## Getting Started

No build tools or dependencies. Serve the folder over HTTP rather than opening
the file directly, so relative paths resolve the way they do in production.

```bash
git clone https://github.com/Joshua-Anojulu/Personal-Website.git
cd Personal-Website
python -m http.server 8137
```

Then open `http://localhost:8137`.

This is a **project** Pages site served from `/Personal-Website/`, so asset
paths must stay relative. A root-absolute `/css/styles.css` works locally and
returns 404 in production.
