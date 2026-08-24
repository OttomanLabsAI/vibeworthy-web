# CLAUDE.md

Standing policy for this repository. Read it before making any change here.

## What this repo is

A Cloudflare Workers static-assets site — the **site-pitch demo for Vibe
Worthy** (new site `/`, offer `/offer/`).
Everything served lives in `public/` and there is no build step - the files in
that directory are the site. The repo is connected to Cloudflare Workers
Builds, so **every push to `main` deploys to production**.

```
public/            everything served
  index.html       the new site
  creatives/       talent roster + per-creative booking pages
  offer/           the offer page
  assets/css       site.css · offer.css
  fonts/           self-hosted Cormorant Garamond + Jost
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
- Facts on `/` trace to the run's sourced brief. Do not add claims, prices, or
  copy that Kalpna hasn't supplied or published — the eight services and the
  fifteen client names come from her own site and stay verbatim.
- The palette is deliberately **not** hers: her site is royal blue with a serif.
  Since 24 Aug 2026 the demo wears the night-sky look mirrored from the
  kalpna-astrology demo (deep indigo, old gold, Cormorant Garamond over Jost)
  at the owner's request; before that it wore the house look (raspberry on warm
  paper, Oswald). Do not "correct" it to her blue, or back to the house look,
  without being asked.
- The one-line explanation under each service is our placeholder copy, awaiting
  her approval — it is not her wording.
- The demo bar's last link goes out to her live site in a new tab. Keep it a
  plain anchor: nothing may be fetched or framed from vibeworthy.co.
- **No rates anywhere on /creatives/** — the client's explicit instruction.
  Booking is an enquiry scoped to the brief; never add prices, day rates or
  budget menus to those pages.
- Creative profiles (names, handles, work links, artist lists, photos) come
  from the client's own deck (VW_Deck_-_AK_2.pdf, 24 Aug 2026) and stay
  verbatim. The deck's Ama Louise link was broken (pointed at apple.com), so
  that credit is unlinked pending the real URL.
- The offer page's numbers are the flyer's sheet (£500 / £50 / £1,500–£8,000 /
  £0 until transfer). Never restate them differently here and on the flyer.

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
