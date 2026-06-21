# Personal Website

Source for my personal site, a one-page portfolio. It is a single static page with no framework and no build step.

Live: add the URL here once GitHub Pages is enabled.

## Stack

- Plain HTML and CSS
- A small amount of vanilla JavaScript (a generated star scatter in the hero and scroll-reveal on sections)
- Google Fonts: Bricolage Grotesque, Inter, IBM Plex Mono
- No dependencies, no bundler

## Run locally

Open `index.html` directly in a browser, or serve it:

```bash
python3 -m http.server 8000
# visit http://localhost:8000
```

## Deploy

GitHub Pages: in Settings > Pages, serve from the `main` branch root. The site is `index.html`, so it works as is. If you name the repo `Joshua-Anojulu.github.io`, it deploys to `https://joshua-anojulu.github.io/`.

Netlify or Cloudflare Pages: drag the folder in, no configuration needed.

## Structure

`index.html` holds the entire site: markup, styles, and scripts in one file.
