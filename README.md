# osanwe-website

Promotional site for **Osanwë** — a privacy layer for AI.

Design repository: [EzraStone/Osanw-](https://github.com/EzraStone/osanwe-)

## What this is

A single scrolling page that explains the product. No build step, no dependencies, no external
requests — three files and a `.nojekyll`. Open `index.html` in a browser and it runs.

```
index.html          markup + inline SVG for every graphic
assets/styles.css   design system, layout, motion
assets/app.js       reveal-on-scroll, header theming
```

## Running it

```bash
python3 -m http.server 8000     # then open http://localhost:8000
```

Or just open `index.html` directly — there is nothing to compile.

## Publishing

GitHub Pages, served from the repository root: **Settings → Pages → Deploy from a branch →
`main` / `(root)`**. The `.nojekyll` file stops Jekyll from touching the assets.

## Page structure

| Section | Job |
|---|---|
| Hero | Say what the product is in one sentence, before anything else |
| The problem | The five identity-leak channels, and which ones v1 actually closes |
| Statement | The reframe: routing is the easy half |
| How it works | Three concrete steps, in plain language |
| Architecture | The three parties, each explained rather than just named |
| Limits | Two columns — what it does, what it won't do |
| Status | Nothing is built; the phase list, with Phase 0 as the gate |
| Closing | Read the design |

## Scrolling

The page uses **ordinary document scrolling**, deliberately. An earlier version was a
`scroll-snap-type: y mandatory` deck with `scroll-snap-stop: always` and `scroll-behavior: smooth`
on the snap container — a combination that fights the wheel, stutters on trackpads, and makes fast
scrolling impossible. All of it is gone.

What remains: `scroll-behavior: smooth` on `html` for anchor links only, and `scroll-padding-top`
so anchored sections clear the fixed header. **No scroll listeners, no wheel hijacking, no snap.**
If you change this file, keep it that way.

## Copy constraints

The wording here is governed by
[ADR 0001](https://github.com/EzraStone/osanwe-/blob/main/docs/decisions/0001-byok-first.md) in the
design repository, which commits the project to bring-your-own-key first. Three rules follow, and
**all must hold in any future edit**:

1. **Never imply the provider cannot identify the account.** v1 hides IP and location. It does not
   hide who is paying — the table in "the problem" section marks that as Phase 3, and the limits
   column says it outright. Claiming otherwise would be the single most damaging thing this site
   could do to the project's credibility.
2. **Never imply a shippable product exists.** Nothing is built. The status section says so in its
   heading, and the CTAs point at the design rather than a download.
3. **Never soften the limits section.** Stating what the network cannot do — especially that no
   network can hide your writing style — is the message, not a disclaimer attached to it.

## Design notes

- **Palette.** `#eff1f1` light, `#050607` dark, `#1668c4` blue. One accent, used sparingly.
- **Type.** System grotesque at weight 700 with `-0.03em` tracking for headlines; system monospace
  at `0.1em` for eyebrows, captions and chrome. No webfonts, so nothing to load and nothing to leak.
- **Motion.** Sections reveal once via `IntersectionObserver`, then unobserve. Fully disabled under
  `prefers-reduced-motion`.
- **Header.** Fixed, with a blurred backdrop, recoloring as it passes over dark sections — driven by
  a `data-theme` attribute read in `app.js`, which also updates `theme-color` so mobile browser
  chrome follows.

## Accessibility

Keyboard navigable, visible focus rings, semantic sections and anchor navigation, and full
`prefers-reduced-motion` support. Without JavaScript the page reads normally — only the reveal
animation and the header recolor go inert.
