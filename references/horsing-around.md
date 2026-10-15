# Horsing Around — retro variant (opt-in)

Use this only when the user asks for it: "retro Miðflokkurinn", "retro
Miðflokkur", "horsing around", "the dithered horse", "the Hleri look" or
something similar. Otherwise follow the regular identity in
[identity.md](identity.md).

**Provenance:** this is the skill owner's own design variant, requested on
14 October 2026 and first built for Hleri, an internal transcription tool.
It is not part of the official identity handbook. It keeps the pack's colours,
the horse and the 5px / pill shapes, and changes the typography (see below).

**Exception to "never redraw the horse":** on 15 October 2026 the owner
approved one exception for this variant's tölting horse, whose legs are drawn
(see the listening panel below). It applies only to that animation. Every
other use of the horse still follows the regular rule: original files only.

## What it is

The brand palette plus a little lo-fi computer craft: ordered dithering, ASCII
rendering, a blinking terminal cursor and small looping motion. It was
inspired by dithered-texture animation and classic ASCII line art.

**The rule that makes it work:** put the play in waiting, empty and finished
states, such as headers, loaders, progress and "done" moments. Keep forms,
tables and long reading calm. People who use a tool daily should enjoy the
moments, not wade through them.

## Changes from the regular identity

- **No Roboto in this variant.** **Archivo** (variable weight 100–900, width
  62–125%) sets everything readable. Headings use weight 900 at
  `font-stretch: 72%`, UPPERCASE, tight leading, with the one Sól word in an
  `<em>`. **IBM Plex Mono** sets timestamps, statuses, stage lists, big
  numbers and the ASCII horse. Both are OFL and included in
  `assets/horsing-around/fonts/` (latin subset; every Icelandic letter is
  present, "←" is not).
- Body text `#3d4250` and muted `#6b6f78`, so small text passes AA on white.
- Sól is still never text on a light background (1.9:1). Use it on Nótt, and
  for fills, rules and glints.

## Kit: `assets/horsing-around/`

| File | What |
|---|---|
| `horsing-around.css` | Tokens, @font-face, band, hero, cards, buttons, pills, spinner, listening panel, stage list. |
| `horsing-around.js` | Draws the dithered horse into every `canvas.dither` and the tölting ASCII horse scene into `canvas[data-tolt]`. Exposes `HorsingAround.setProgress(0..1)` and `HorsingAround.finish(done)`. |
| `horse.svg` | Same file as `assets/logos/horse-white.svg`. Used as the dither mask, the spinner mask and the morph target; must sit next to the CSS and JS. |
| `fonts/` | Archivo variable + IBM Plex Mono 400/500/600 (woff2) with their OFL texts. |
| `demo.html` | Every component on one page. `demo.html#finish` plays the morph. |

Copy the whole folder into the project's static directory, link the CSS and
load the JS with `defer`. Serve over http: the canvases read pixels from
`horse.svg`, and `file://` blocks that.

## Components

**Band**: a Nótt header with the rearing horse ordered-dithered tone-on-tone,
cropped off the right edge. It "boils" gently (noise re-rolled about 9 times a
second) and shows a rare Sól glint.

```html
<header class="band">
  <canvas class="dither" aria-hidden="true" data-horse="1.25" data-shift=".78" data-top=".06"></canvas>
  <div class="wrap"><div class="hero hero-xl"><h1>Tækifærið er <em>núna</em></h1></div></div>
</header>
```

`data-horse` sets the horse's height as a multiple of the band height (default
1.3). `data-shift` sets the share of its width left visible (.75). `data-top`
sets the top offset as a share of the band (.08). On narrow screens the horse
shrinks to at most 45% of the width so it stays off the text. For a full-screen
login, make the band `min-height: 100vh` and use about `.95 / .85 / .08`.
A `.card.lift` after a `.hero-xl` band overlaps it.

**Spinner**: a single horse rotating. (Two horses chasing each other looked
strange.) `<span class="pill busy"><span class="spin"></span>…</span>`

**Pills**: `.pill` plus `.busy` (Nótt and Sól), `.live` (Eldur with a blinking
`.rec` dot) or `.failed`.

**Listening panel** (`.listen`): a Nótt card with a wide (16:10) horse scene
on the left, and on the right a terminal stage list (`li.done` shows `[x]`,
`li.now` shows `[>]` plus a blinking block cursor) and a `.big-number`.

- **The horse**: an Icelandic horse at the tölt (four-beat lateral gait, head
  carried high, high knee action). Its head, neck, mane, body and tail are
  the brand horse from `horse.svg`, tipped 24° toward level. The raised legs
  are cut away and replaced by drawn, sturdy legs with feathered fetlocks
  (the owner-approved exception above), animated by keyframes.
- **Rendering**: ASCII line art like classic asciiart.eu horses. The horse is
  drawn into a small offscreen canvas; each outline cell gets `/ \ | _ -`
  from the edge direction and the inside stays open, filled Nótt so it hides
  what's behind. A slight Sól/Himinn colour split sits under the white glyphs.
- **Scene**: stars, perspective ASCII ground scrolling past, dust kicked up
  behind each hoof as it lifts, and a dithered Eldur sun with retro stripes
  on the horizon.
- **Progress** brings the horse closer (bigger, lower, larger characters) and
  raises the sun. `data-mode="live"` keeps it at mid distance with a
  decorative swell that is not tied to real audio.
- **Finish**: `finish(done)` slows the horse, dissolves it cell by cell into
  the original rearing horse with a hop and a burst of gold sparks, and calls
  `done` after about 2.8s, which is the moment to reload or navigate.

```html
<section class="listen">
  <canvas data-tolt data-progress="42" aria-hidden="true"></canvas>
  <div><ol class="stages"><li class="done">…</li><li class="now">…</li><li>…</li></ol>
  <div class="big-number">42<small>%</small></div></div>
</section>
```

Poll for status instead of reloading the page, so the horse keeps moving.

## Guardrails

- Everything respects `prefers-reduced-motion`: one static frame, and
  `finish` calls `done` immediately.
- The morph runs on clock time, so slow or throttled frames still finish on
  schedule. Background tabs pause the animation; nothing functional depends
  on it.
- The kit adds no words. Icelandic copy follows the skill's usual rule: use
  real, approved wording, and keep Þ Ð Æ Ö and the accented vowels intact in
  uppercase headings.
- This is a screen and web variant. For print, social graphics and video, use
  the regular identity unless the user explicitly asks for the retro look.
