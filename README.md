# vibeworthy-web

Pitch deploy for **Vibe Worthy** (vibeworthy.co) — Kalpna Tandon's culture
marketing agency, London. The front page is her own site, captured whole and
served from this repo; the pitch adds her creatives at the foot of that page
and the offer one tab away. Packaged as a Cloudflare Workers static-assets
site.

| Route | Page |
| --- | --- |
| `/` | Her original site — the owner-supplied capture of vibeworthy.co, every asset vendored |
| `/#people` | The talent roster, at the foot of the front page (`/creatives/` forwards here) |
| `/creatives/<name>/` | Per-creative pitch page + booking enquiry (Naomi, Nee, Poonam) |
| `/offer/` | The offer — tale of the tape and what the new site already does better |

## Structure

```
public/                everything served — no build step
  index.html           her original page (see "The original copy" below)
  assets/rm/           its vendored assets — all images (client logos, her
                       photo, the wordmark), viewer.css, google-fonts.css
  creatives/           per-creative booking pages and their photos
  offer/index.html     the offer
  assets/css/          site.css · offer.css · creatives.css (pitch pages)
  assets/js/           booking.js — calendar picker + mailto assembly
  fonts/               self-hosted Lora + Poppins (pitch pages)
  404.html  favicon.svg  og.png  robots.txt  _headers
wrangler.jsonc         assets-only config, no Worker script
```

## The original copy

`/` is a static rendition of the live Readymag page, built from the owner's
"Webpage, Complete" save. Every image is served locally from `assets/rm/`.
The Readymag runtime was removed — it cannot run against a saved DOM without
their servers. A small inline layer (the `static-canvas-*` style/script at
the end of `index.html`) does what the runtime did for layout and motion:
gives the canvas its height, scales it to fill narrower desktop viewports,
caps it at its natural 1375px — centred, type constant — on wider ones, and
rebuilds the scroll choreography (the logo's shrink into a pinned masthead,
the fading welcome line, the running marquees, the nav pills) from the
captured animation tracks. Under 768px the canvas gives way to
`#phone-render`, a hand-stacked phone rendition of the same content — her
copy, images and colours verbatim (her live site serves its own phone layout
that a desktop save cannot contain). The live original stays one click away
on the demo bar.

## Local development

```bash
npm install
npm run dev          # wrangler dev
```

## Deployment

Connected to Cloudflare Workers Builds: every push to `main` deploys to
production. Verify before every push (`npm run check`, then render and inspect
screenshots). This is a pitch demo: `robots.txt` disallows everything and every
page carries `noindex,nofollow` — never lift either while it lives on a
temporary link.

## Social previews

Every page carries Open Graph + Twitter-card meta pointing at `/og.png`
(1200×630 — her real wordmark on her cream) by absolute URL on the workers.dev
deploy. On transfer to the client's domain, re-point those `og:image` URLs.

## External resources

- **Fonts on `/`**: FreightTextCmp Pro, Poppins, Sweet Sans Pro and Neue Haas
  Grotesk load from Adobe Fonts (use.typekit.net) via the kit URLs baked into
  her page — licensed to her, not self-hostable. Inter and Pinyon Script load
  from fonts.gstatic.com via the vendored `assets/rm/google-fonts.css`. With
  those hosts unreachable the page falls back to system serif/sans and stays
  legible.
- The pitch pages (`/creatives/`, `/offer/`, 404) self-host Lora + Poppins
  from `/fonts/`.
- The demo bar's last link opens `https://vibeworthy.co/` in a new tab; the
  LinkedIn and social links on the pitch pages are plain anchors. Nothing is
  fetched or framed from vibeworthy.co by any page.
- The booking form runs entirely client-side: `booking.js` assembles the brief
  into a `mailto:` for the visitor's own email app. Nothing is stored or
  POSTed anywhere.
