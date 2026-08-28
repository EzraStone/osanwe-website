# osanwe-website

The promotional site for **Osanwë** — an accountless local client and experimental privacy
infrastructure for AI.

Code repository: [EzraStone/Osanwe](https://github.com/EzraStone/Osanwe)

## What this is

A static site with no build step, no dependencies, and no third-party requests. The two pages
carry their own styles inline; the only files they load are the two text faces, the plate, and
the favicon, all served from this origin.

```
index.html                  the landing page
design.html                 the design document and threat model
cormorant-garamond.woff2    display face, latin subset
lora.woff2                  body face, latin subset
plate.png                   the classical landing-page plate
hero-og.png                 the plate at 1.91:1 for link previews
favicon.svg
img/                        architecture diagrams, light and dark
```

## Running it

Any static server. There is nothing to compile.

```bash
python3 -m http.server 8000
```

Then open <http://127.0.0.1:8000/>.

## No outside origins

The site loads nothing from a CDN, an analytics service, or a font host. That is deliberate
rather than incidental: a page explaining that a person should be able to ask a question without
being catalogued has no business reporting its own visitors to somebody else.

The fonts are checked in for the same reason. Linking Google Fonts would tell Google who read
this page.

## The plate

`plate.png` is the supplied classical image used for the full-page opening proposition. The site
applies its sepia treatment and contrast in CSS. `hero-og.png` is the separate social-preview image.

## Links into the code repository

`design.html` refers to the threat model, the abuse policy, the Phase 0 results, and the
architecture decision records. Those live in the code repository and are linked there by absolute
URL, so this repository stays a website and nothing else.
