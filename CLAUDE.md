# CLAUDE.md

Standing policy for this repository. Read it before making any change here.

## What this repo is

A Cloudflare Workers static-assets site — the **pitch deploy for Vibe
Worthy**. Since v1.7 the front page `/` is **her original site**: the
owner-supplied "Webpage, Complete" capture of vibeworthy.co, vendored whole.
The pitch's `/creatives/` and `/offer/` pages sit one tab away on the demo
bar. Everything served lives in `public/` and there is no build step - the
files in that directory are the site. The repo is connected to Cloudflare
Workers Builds, so **every push to `main` deploys to production**.

```
public/            everything served
  index.html       her original page (vendored capture — see rules below)
  assets/rm/       its assets: all images (client logos, her photo, the
                   wordmark), viewer.css, google-fonts.css
  creatives/       talent roster + per-creative booking pages
  offer/           the offer page
  assets/css       site.css · offer.css · creatives.css (pitch pages)
  fonts/           self-hosted Lora + Poppins (pitch pages)
  og.png           social-sharing card, 1200×630, her wordmark on her cream
  _headers         security + caching headers
  robots.txt       DISALLOW ALL — pitch demo, never indexed
wrangler.jsonc     assets-only config, no Worker script
package.json       wrangler devDependency + dev/deploy scripts
```

## Pitch-demo rules

- `robots.txt` disallows everything and every page carries
  `noindex,nofollow`. Keep both until the site transfers to the client's own
  domain; on transfer, the demo bar, the `/offer/` route and the noindex
  machinery all come out.
- `/` is **her page, verbatim** (v1.7, "just take the original" — the owner's
  instruction, 25 Aug 2026): a static rendition of the Readymag DOM she saved,
  with asset paths localised to `assets/rm/`, our og/description meta and the
  demo bar injected, the Readymag runtime and its `__RM_PROPS__` blob removed,
  and a small `static-canvas-*` style/script layer at the end of the file
  doing what the runtime did for layout (canvas height 4372 × width 1375,
  scaled to the viewport; mid-animation widgets revealed). Do not edit her
  DOM, copy or images. The page is frozen in the captured state — no
  animations, the logo resting in its masthead state — and phones see the
  desktop design scaled (her live phone layout is separate and not in the
  capture). Her fonts (FreightTextCmp Pro, Poppins, Sweet Sans Pro via her
  Adobe Fonts kit URLs; Inter + Pinyon Script via gstatic) stay remote — they
  are licensed to her and cannot be vendored.
- The pitch pages (`/creatives/`, `/offer/`, 404) keep the brand-matched look
  of v1.6 (her blues and cream, Lora + Poppins standing in for her faces).
  Do not change that look without being asked. On those pages the one-line
  explanation under each service card is our placeholder copy — not her
  wording.
- The demo bar (tabs: The site · Creatives · The offer · Current site ↗) is
  chrome on every page except the 404; its last link goes out to her live
  site in a new tab. Keep it a plain anchor: nothing is fetched or framed
  from vibeworthy.co by any page.
- **No rates anywhere on /creatives/** — the client's explicit instruction.
  Booking is an enquiry scoped to the brief; never add prices, day rates or
  budget menus to those pages.
- Creative profiles (names, handles, work links, artist lists, photos) come
  from the client's own deck (VW_Deck_-_AK_2.pdf, 24 Aug 2026) and stay
  verbatim. The deck's Ama Louise link was broken (pointed at apple.com), so
  that credit is unlinked pending the real URL.
- The offer page's numbers are the flyer's sheet (£500 / £50 / £1,500–£8,000 /
  £0 until transfer). Never restate them differently here and on the flyer.
- `og.png` is the social-sharing card, referenced from every page's `og:image`
  by absolute URL on the workers.dev deploy. On transfer to her domain,
  re-point those URLs; regenerate the card if the site's look changes.

## Local development

```bash
npm install
npm run dev          # wrangler dev
```

## Verification - before every push to main

1. `npx wrangler deploy --dry-run`
2. Serve `public/`, render it with headless Chromium, and inspect the
   screenshots: styles applied, fonts loaded, layout intact.

Never leave pushed work unverified or half-finished. Work in small, complete
batches: implement, verify, commit, push.

## Git and release workflow

- Before committing: `git config user.name "Fid" && git config user.email "fid_kk@proton.me"`
- Develop on the working branch and push there first. Release verified work by
  fast-forwarding `main` onto it and pushing `main`.
- Every push to `main` is a release. Versions are an ascending `vMAJOR.MINOR`
  sequence starting at `v1.0`; every push bumps the minor regardless of size. A
  major bump is reserved for a ground-up overhaul.
- With every push to `main`, provide release-tag text in the reply, in exactly
  this shape. The owner creates the GitHub release manually - **never push tags**:

  ```
  Tag: v<next>  —  Title: <five to nine words, plain and evocative>
  Description: <one to three sentences of editorial prose describing what changed
  from the owner's point of view — outcomes, not implementation. No bullet lists,
  no jargon, no file names.>
  ```

- Append the release line to the ledger below as part of the same push.
- Commit messages: descriptive imperative first line (what the change does, not
  "update X"), then a short prose body; dash bullets are fine there. One commit
  per coherent piece of work; several may share a push, but each push gets
  exactly one version entry.
- Never include model names, AI attribution trailers, session links, or other
  tooling identifiers in commit messages, titles, or code.

## The page itself

Content, design, and behaviour are as supplied by the owner. Do not tidy markup,
rename classes, rewrite copy, or modernise CSS unless asked - changes to the
design are their own release, requested deliberately.

## Release ledger

| Version | Title | Description |
| --- | --- | --- |
| v1.0 | The Vibe Worthy pitch demo, complete | A new one-page site carrying her eight services and the wall of fifteen clients she has worked with, alongside an offer page with the £500/£50 terms — verified at thirteen widths and ready to connect to Cloudflare. |
| v1.1 | The demo dressed in midnight and gold | The whole demo now wears the night-sky look from the astrology page — deep midnight blue with old gold, elegant serif headlines and a quiet scatter of stars — from the front page through each creative's booking form to the offer. |
| v1.2 | Back to raspberry on warm paper | The night-sky experiment is undone at the owner's word: the demo returns to its original look — warm paper, raspberry and bold condensed headlines — exactly as it first shipped, from the front page through the booking forms to the offer. |
| v1.3 | A proper card when the link is shared | Sharing any page of the demo in a chat or a post now shows a real preview — the Vibe Worthy name in its bold house look on warm paper with the raspberry stripe — instead of a bare link. |
| v1.4 | A stray file swept back out | A scrap of tooling debris that slipped into the previous release is removed; nothing about the site itself changes. |
| v1.5 | The demo now wears her own blue | The whole demo now dresses in Vibe Worthy's own branding — the deep royal blue and soft cream of her site, with elegant serif headlines to match — across the front page, the booking pages, the offer and the sharing card. |
| v1.6 | Matched against the real thing | With her live site finally in view, the demo now carries its true character — the soft serif headlines, the italic titles, the airy rounded outlines on pale grey, and a wordmark that ends in her star — across every page and the sharing card. |
| v1.7 | Her own site takes the front page | The front page is now Kalpna's actual site, captured whole and hosted with us — her wordmark, her photo and all fifteen client logos served from our own files — with the creatives and the offer one tab away, and the sharing card carrying her real logo. |
| v1.8 | Another scrap swept out the door | A leftover screenshot from the build tooling is removed from the repository; it never reached the site and nothing about it changes. |
| v1.9 | The front page scrolls again | Her page arrived with scrolling switched off — its old platform handled scrolling itself, and without it the site froze on the first screen. The page now scrolls like any other, top to bottom, on desktop and phone alike. |
