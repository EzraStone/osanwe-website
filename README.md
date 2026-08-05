# osanwe-website

Promotional site for **Osanwë** — an anonymity network for AI inference.

Design repository: [EzraStone/Osanw-](https://github.com/EzraStone/osanwe-)

## What this is

A single-page, eight-slide scroll deck. No build step, no dependencies, no external requests —
three files and a `.nojekyll`. Open `index.html` in a browser and it runs.

```
index.html          markup + inline SVG for every graphic
assets/styles.css   design system, layout, motion
assets/app.js       slide chrome, dot nav, keyboard, reveal
```

## Running it

```bash
python3 -m http.server 8000     # then open http://localhost:8000
```

Or just open `index.html` directly — there is nothing to compile.

## Publishing

GitHub Pages, served from the repository root: **Settings → Pages → Deploy from a branch →
`main` / `(root)`**. The `.nojekyll` file stops Jekyll from touching the assets.

## The deck

| # | Slide | Theme |
|---|---|---|
| 01 | Keep your prompts to yourself. | light |
| 02 | Your prompt is thought in transit. | light |
| 03 | Onion routing hides your IP. Your API key still has your name on it. | dark |
| 04 | Three parties. None of them sees both halves. | light |
| 05 | Frontier models don't run on donated hardware. | dark |
| 06 | It's your thought. | dark |
| 07 | Everything waits on one number. | dark |
| 08 | What it won't do. | light |

Slides 03, 05 and 08 exist because the design document's most useful claims are the ones that
concede something. The deck is built to lead with the reframe rather than the promise.

## Copy constraints

The wording here is governed by
[ADR 0001](https://github.com/EzraStone/osanwe-/blob/main/docs/decisions/0001-byok-first.md) in the
design repository, which commits the project to bring-your-own-key first. Two rules follow, and
**both must hold in any future edit**:

1. **Never imply the provider cannot identify the account.** v1 hides IP and location. It does not
   hide who is paying. Claiming otherwise would be the single most damaging thing this site could
   do to the project's credibility.
2. **Never imply a shippable product exists.** Nothing is built. The CTAs point at the design, not
   at a download, and slide 08 says so in plain language.

Slide 08 (`What it won't do`) is load-bearing and should not be cut for being off-message. Stating
the limits up front is the message.

## Design notes

- **Palette.** `#eff1f1` light, `#050607` dark, `#1668c4` blue. One accent, used sparingly.
- **Type.** System grotesque at weight 700 with `-0.035em` tracking for headlines; system monospace
  at `0.1em` for all chrome and captions. No webfonts, so nothing to load and nothing to leak.
- **Motion.** Reveals are staggered per slide and driven by `IntersectionObserver`. Everything is
  disabled under `prefers-reduced-motion`.
- **Chrome.** The header, counter and dot rail recolor per slide via a `data-theme` attribute read
  in `app.js`, which also drives `theme-color` so mobile browser UI follows.
- **Navigation.** Scroll, swipe, arrow keys, space, Home/End, or the dot rail. The rail is hidden
  below 760px, where it would otherwise sit on top of the copy.

## Accessibility

Keyboard navigable throughout, visible focus rings, labelled dot controls, and full
`prefers-reduced-motion` support. Without JavaScript the slides still scroll and read — only the
counter and dot rail go inert.
