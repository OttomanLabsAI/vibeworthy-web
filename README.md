# vibeworthy-web

Three-tab pitch demo for **Vibe Worthy** (vibeworthy.co) — Kalpna Tandon's
culture marketing agency, London. Built by the site-pitch workflow, packaged as
a Cloudflare Workers static-assets site.

| Route | Page |
| --- | --- |
| `/` | The new site — one page, built strictly from the sourced brief |
| `/creatives/` | The talent roster — the creatives Vibe Worthy works with |
| `/creatives/<name>/` | Per-creative pitch page + booking enquiry (Naomi, Nee, Poonam) |
| `/offer/` | The offer — tale of the tape, £500 / £50, terms |

There is no `/original/` route. In its place the demo bar carries an outbound
link that opens the prospect's live site, `https://vibeworthy.co/`, in a new
tab — so the comparison is still one click away without hosting a copy.

## Structure

```
public/                everything served — no build step
  index.html           the new site
  creatives/           roster + per-creative pages and their photos
  offer/index.html     the offer
  assets/css/          site.css · offer.css · creatives.css
  assets/js/           booking.js — calendar picker + mailto assembly
  fonts/               self-hosted Oswald + Inter (@fontsource)
  404.html  favicon.svg  robots.txt  _headers
wrangler.jsonc         assets-only config, no Worker script
```

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

## External resources

- The LinkedIn links on `/` point at Kalpna Tandon's public profile, and the
  demo bar's last link opens `https://vibeworthy.co/` in a new tab. Both are
  plain anchors — nothing is fetched from either host.
- Creative pages link out to Instagram, TikTok, YouTube and portfolio hosts —
  all plain anchors from the deck the client supplied.
- The booking form runs entirely client-side: `booking.js` assembles the brief
  into a `mailto:` for the visitor's own email app. Nothing is stored or
  POSTed anywhere. Production upgrade path: a real form endpoint.
- Nothing else leaves the origin: no iframes, no CDNs, no trackers.
