# Converting ARCANE 7 v2 (React/Tailwind/Framer Motion) to one static HTML file

This is a Vite + React + React Router + Tailwind v4 + Framer Motion site. The user wants a **single self-contained `.html` file** — no React, no Tailwind build step, no npm — that a browser can open directly (or be served as a plain static file) and that looks and behaves the same. No other output format: not a Vite build, not multiple files.

## Output
Write ONE file: `C:\Users\M1B1\Desktop\claude 3 folder\arcane-7-barbershop-v2\static.html`
- Inline `<style>` for all CSS (hand-written, translating the Tailwind utility classes below into plain CSS — do not attempt to load Tailwind at runtime).
- Inline `<script>` for all JS (vanilla, no framework, no build step).
- Google Fonts via `<link>` tag (see exact URL below).
- Reference images via relative path `public/images/<filename>` (the file sits at the project root, images live in `public/images/`, unchanged — do not copy or move them).
- Must render correctly opened directly via `file://` and via a static file server. Must be responsive down to ~380px width.

## Design tokens (from `src/index.css`, Tailwind `@theme`)
```css
--color-void: #050505;      /* page background, near-black */
--color-charcoal: #111111;
--color-ash: #1a1a1a;
--color-bone: #e8e6e1;      /* dimmed/secondary text, usually at ~50-65% opacity */
--color-paper: #f5f5f3;     /* primary text / white-ish */
--color-pure: #ffffff;
--font-display: "Archivo", "Helvetica Neue", Arial, sans-serif;
--font-blackletter: "UnifrakturCook", "Archivo", serif;
```
Google Fonts link (use exactly this):
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&family=UnifrakturCook:wght@700&display=swap" rel="stylesheet" />
```
Global base styles to replicate (from `src/index.css`):
- `html{scroll-behavior:smooth;background:var(--color-void);}`
- `body{margin:0;background:var(--color-void);color:var(--color-paper);font-family:var(--font-display);-webkit-font-smoothing:antialiased;overflow-x:hidden;}`
- `::selection{background:var(--color-paper);color:var(--color-void);}`
- thin dark scrollbar (8px, `#333` thumb / void track, hover `#4a4a4a`)
- `img{max-width:100%;display:block;}`
- a slow 30s `hero-zoom` keyframe (`scale(1)` → `scale(1.05)`), applied to something in the hero background if you add a subtle zoom — respect `prefers-reduced-motion: reduce` (disable it) same as the source.

## Page structure & exact content
The real app is `Nav` + `<Routes>` (`/` = Home, `/book` = BookPage) + `Footer`, all inside a `div.bg-void`. For the static file, implement **client-side hash routing between two views in one page**: default view = Home; when `location.hash` is `#/book` (or user clicks "BOOK NOW" / "BOOK AN APPOINTMENT" / any Link that pointed to `/book` in the source), hide the Home `<main>` and show a `<main id="book-view">` with the BookPage content instead (both are just sections in the same HTML file, toggled via a `hidden` attribute or `display:none`, driven by a `hashchange` listener + initial check). Anchor links that pointed to `/#services` etc. should keep scrolling within the Home view (switch back to Home view first if currently on the book view, then smooth-scroll to the `#id`). Nav and Footer stay visible in both views exactly as in the source (Nav/Footer are outside `<Routes>` in `App.jsx`).

Home order (from `src/pages/Home.jsx`): Hero → SplitSection → Services → Gallery → About → BookingCTA.

### Business content (real, use verbatim — from `src/data/content.js`)
```js
shop = {
  name: "ARCANE 7", fullName: "ARCANE 7 BARBERSHOP",
  addressLine1: "2522 J St", addressLine2: "Sacramento, CA",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=2522+J+St,+Sacramento,+CA",
  instagram: "https://www.instagram.com/arcane7barbershop", instagramHandle: "arcane7barbershop",
}
services = [
  { n:"01", name:"SIGNATURE CUT", desc:"A precision cut built around your face shape and hair type — consulted, cut, finished." },
  { n:"02", name:"SKIN FADE", desc:"Razor-clean fade from skin to length, blended by hand for a seamless transition." },
  { n:"03", name:"CUT + BEARD", desc:"Full cut paired with a shaped, lined beard trim — one appointment, one finish." },
]
barbers = [
  { n:"01", name:"LARA BLENDZ", handle:"larablendz", instagram:"https://www.instagram.com/larablendz", title:"OWNER / BARBER", bio:"Owner of Arcane 7. Sharp, precise fades with an editorial finish." },
  { n:"02", name:"INFERNALFADEZ", handle:"infernalfadez", instagram:"https://www.instagram.com/infernalfadez", title:"BARBER", bio:"Clean skin fades finished with sharp, deliberate line work." },
  { n:"03", name:"FADEZ BY YAIR", handle:"fadezby.yair", instagram:"https://www.instagram.com/fadezby.yair", title:"BARBER", bio:"Bold color transformations paired with custom hair tattoo art." },
  { n:"04", name:"VELOZCUTZZ", handle:"velozcutzz", instagram:"https://www.instagram.com/velozcutzz", title:"BARBER", bio:"Statement color work and freehand shave designs." },
  { n:"05", name:"CLIPPER DON LITO", handle:"clipperdonlito", instagram:"https://www.instagram.com/clipperdonlito", title:"BARBER", bio:"Textbook fades with clean, consistent blends every time." },
  { n:"06", name:"BY.FREDO_", handle:"by.fredo_", instagram:"https://www.instagram.com/by.fredo_", title:"BARBER", bio:"Sharp shape-ups and classic cuts with a modern edge." },
]
```
Image paths (rewrite `/images/...` → `public/images/...` relative path throughout):
- emblem: `public/images/emblem.jpg`
- splitRight: `public/images/gallery-1.jpg`
- about: `public/images/about-owner.jpg`
- services hover-preview row images: `public/images/gallery-3.jpg`, `public/images/gallery-2.jpg`, `public/images/gallery-4.jpg` (in that order, indexed to the 3 services)
- barberWork (2 photos per barber, same order as `barbers` array above):
  `[work-larablendz-1.jpg, work-larablendz-2.jpg]`, `[work-infernalfadez-1.jpg, work-infernalfadez-2.jpg]`, `[work-fadezbyyair-1.jpg, work-fadezbyyair-2.jpg]`, `[work-velozcutzz-1.jpg, work-velozcutzz-2.jpg]`, `[work-clipperdonlito-1.jpg, work-clipperdonlito-2.jpg]`, `[work-byfredo-1.jpg, work-byfredo-2.jpg]` (all under `public/images/`)

## Section-by-section spec (translate Tailwind classes to plain CSS; keep the same visual result)

### Nav (`src/components/Nav.jsx`)
Fixed header, full width, z-top. Transparent background + transparent bottom border by default; once `window.scrollY > 72`, switch to `background: rgba(5,5,5,0.95)` + `backdrop-filter: blur(4px)` + a `1px solid rgba(255,255,255,0.1)` bottom border (animate the transition on background-color/border-color, ~500ms). Row: logo left (see Logo below), centered-right nav links (desktop only, `≥1024px`): SERVICES → `#services`, BARBERS → `#barbers-work`, ABOUT → `#about`, CONTACT → `#contact` (11px, letter-spacing .22em, bone at 80% opacity, hover → paper). A "BOOK NOW" bordered button (desktop only) linking to the book view. A hamburger icon button (mobile only, <1024px) that toggles a full-screen mobile menu: fixed, full viewport, `background:var(--color-void)`, centered-left column of the same 4 links at large size (30px, light weight, wide tracking) sliding in with a staggered fade/slide, plus a bordered "BOOK NOW" button below. Animate the mobile menu open with a simple clip-path or opacity/translate transition (~400-500ms) — a light CSS transition is fine, framer-motion is not needed.

### Logo (`src/components/Logo.jsx`)
Inline: circular emblem image (`public/images/emblem.jpg`, ~1.9em square, `border-radius:50%`, `object-fit:cover`) + "ARCANE 7" text, `font-family:var(--font-display)`, medium weight, `letter-spacing:.28em`, uppercase, color paper.

### Hero (`src/components/Hero.jsx`)
`id="top"`, full `min-height:100svh` section, `background:var(--color-void)` with a radial gradient (`radial-gradient(ellipse at 50% 38%, #141414 0%, #070707 55%, #020202 100%)`) plus a subtle animated grain overlay (an SVG `feTurbulence` filter is used in source — you may approximate with a low-opacity noise texture or a CSS-only static grain trick; keep it subtle, `opacity ~0.06`, `mix-blend-mode:overlay`). A thin inset border frame (`~16-40px` inset depending on breakpoint) with small L-shaped corner marks (paper at 35% opacity) in all 4 corners — draw with small inline SVGs or `::before/::after` borders, doesn't need to be pixel-perfect, just present. Centered content, fades in on load (opacity 0→1, translateY 20px→0, staggered ~150-750ms across the 3 blocks — approximate with a couple of CSS `@keyframes fadeUp` with `animation-delay`):
1. "ARCANE 7" in `font-family:var(--font-blackletter)` (UnifrakturCook), uppercase, huge (`~3.6rem` mobile → `8.5rem` desktop), line-height ~0.95-1, letter-spacing .01em.
2. "SACRAMENTO BARBER STUDIO" small caps line below (paper 80% opacity, very wide tracking ~.42-.55em).
3. "2522 J St" (shop.addressLine1) smaller still, paper 50% opacity, wide tracking.
4. Below that: "Bold color. Sharp fades. Custom design." (bone 60% opacity, small, light weight, max-width ~20rem, centered).
5. A "BOOK AN APPOINTMENT →" link (to the book view) with an underline on the text and an arrow that nudges right on hover.
6. Near the bottom (desktop only): a small "SCROLL" label + a thin vertical line, fading in last.

### SplitSection (`src/components/SplitSection.jsx`)
Two-column grid (stacks to 1 column on mobile, `lg:grid-cols-2`). Left: void background, a `Logo` at the top, and lower/centered a large heading "The Art / of the Cut." (font-display, extralight, uppercase, huge responsive size ~10vw → 6xl, line-height .92) + a short paragraph "Every cut is considered. / Every detail has a purpose." (bone 60%, small, light). Right: full-bleed image `public/images/gallery-1.jpg` (`object-fit:cover` mobile, aspect ratio ~1128/1900; `object-fit:contain` + fixed height on desktop), `contrast(1.05) brightness(0.92)`. Add a light parallax: on scroll, translateY the image a few percent (a simple scroll-linked transform via `IntersectionObserver`/`scroll` listener is enough, doesn't need to be exact).

### Services (`src/components/Services.jsx`)
`id="services"`. Heading "Services" (font-display, extralight, uppercase, large) with a small right-aligned caption "BY APPOINTMENT ONLY / PRICING SET BY BARBER" (desktop only, tiny wide-tracked bone text). Below: a bordered list (`border-top`, each row `border-bottom`, all `1px solid rgba(255,255,255,.15)`) of the 3 services, each row a link (→ book view / `#contact`) laid out as: index number (small, bone 60%) — service name (large, uppercase, paper, slides right a bit on hover on desktop) — description (bone 60%, small). Row background tints very slightly white on hover. **Desktop-only cursor-follow preview**: as the mouse moves within the services block, track cursor position; on hovering a row, show a small floating image thumbnail (the row's paired preview image: gallery-3/gallery-2/gallery-4 respectively) near the cursor (positioned via the tracked mouse coordinates, offset it a bit up-and-right of the cursor), fading/scaling in and out. Hide entirely on touch/mobile (a `matchMedia`/pointer:fine check, or simply CSS `display:none` under e.g. 1024px, is fine).

### Gallery ("Crafted With Intention", `src/components/Gallery.jsx`)
`id="barbers-work"`. Heading "Crafted With Intention." (font-display, extralight, uppercase, huge) + caption "Two shots from every chair — tap through for more on Instagram." (bone 60%). Grid: 1 column mobile / 2 tablet / 3 desktop. Each of the 6 barbers gets a block: a 2-column sub-grid of their 2 work photos (each `aspect-ratio:4/5`, `object-fit:cover`, subtle zoom-in on hover, `contrast(1.05) brightness(0.95)`), each photo links to that barber's Instagram and shows an "@handle" label overlay (with a small Instagram glyph — draw a simple rounded-square + circle SVG icon, no external icon font needed) fading in on hover over a bottom gradient scrim. Below the photo pair: the barber's name (paper) and "@handle" (bone, with the Instagram glyph) as a link, name/handle turn paper on hover.

### About (`src/components/About.jsx`)
`id="about"`. Two-column grid (image first on mobile via order, text first visual order on desktop — match source: `order-2 lg:order-1` for text, `order-1 lg:order-2` for image, i.e. **image appears above text on mobile, text-left/image-right on desktop**). Heading "Built / on Craft." (font-display, extralight, uppercase, huge) + paragraph: "Arcane 7 blends traditional barbering with bold color work and custom design. Every appointment is built around detail, consistency and personal style." (bone 60%, slightly larger body text). Image: `public/images/about-owner.jpg`, `aspect-ratio:4/5`, `object-fit:cover`, `object-position:top`, `contrast(1.05) brightness(0.92)`.

### BookingCTA (`src/components/BookingCTA.jsx`)
`id="contact"`. Centered, `min-height:42vh`. Big heading "Your Chair / Is Waiting." (font-display, extralight, uppercase, huge, ~11vw→7xl). Address line "2522 J St, Sacramento, CA" (bone 65%, small, letter-spaced). "BOOK AN APPOINTMENT →" link (book view) same underline/arrow-hover treatment as hero. Below that, smaller: "@arcane7barbershop" linking to the real Instagram profile (bone 50% → paper on hover).

### Footer (`src/components/Footer.jsx`)
Top border (`1px solid rgba(255,255,255,.1)`). 4-column grid (1 col mobile, 2 col tablet, 4 col desktop): (1) Logo + "Bold color. Sharp fades. Custom design." caption; (2) nav links column (SERVICES/BARBERS/ABOUT/CONTACT, same anchors as Nav); (3) address line (links to `shop.mapsUrl`), "@larablendz" (owner's handle, links to owner's Instagram — `barbers[0]`), and a plain "BY APPOINTMENT" line; (4) "BOOK AN APPOINTMENT →" link, right-aligned on larger screens. Below the grid, a second thin top border and a copyright line: "© {current year} ARCANE 7 BARBERSHOP. ALL RIGHTS RESERVED." (tiny, bone 55%). Use `new Date().getFullYear()` via JS so the year stays current.

### Book view ("page", `src/pages/BookPage.jsx`) — shown instead of Home when hash is `#/book`
Single column, `max-width:~48rem`, centered. A "← BACK TO SITE" link (switches back to Home view, doesn't need to change the URL bar meaningfully beyond clearing the hash). Big heading "Book With / Arcane 7." (huge, extralight uppercase) + a line: "Reach out to a barber directly on Instagram to book, or use the map below to find us." (bone 60%). Then a bordered list (same row style as Services) of **all 6 barbers**, each row linking to that barber's Instagram, showing: index number, name (large, uppercase, slides right on hover), their title (small, bone 50%) underneath the name, and on the right "@handle ↗" (bone 60% → paper on hover). Below that: "FIND THE SHOP" heading, an address link to `shop.mapsUrl`, and an embedded Google Map iframe (`https://www.google.com/maps?q=2522%20J%20St%2C%20Sacramento%2C%20CA&output=embed`, `width=100% height=100%` inside an `aspect-ratio:4/3` (mobile) / `16/9` (desktop) bordered box, with `filter: grayscale(1) invert(0.92) contrast(0.9)` to match the void theme), `loading="lazy"`.

## Interactions to implement in vanilla JS
1. Nav solid-on-scroll (as described above).
2. Mobile menu open/close (hamburger ⇄ X, full-screen overlay, closes on link click).
3. Hash-based view toggle: default = Home; `#/book` (or clicking any "book" CTA) shows the Book view and hides Home (scroll to top when switching); clicking "BACK TO SITE" or any `#services`/`#about`/etc. anchor while on the Book view switches back to Home first, then scrolls to that anchor smoothly. Update `location.hash` so the state is bookmarkable/shareable, but don't fight the browser's native anchor-scroll — implement it so it still works reasonably if someone lands directly on `#/book` or `#services`.
4. Services row hover → floating cursor-tracked preview image (desktop/pointer:fine only).
5. Simple fade/slide-up entrance animation for hero content on load (CSS animation with staggered delays is enough — do not implement scroll-triggered reveal-on-view for every section; keep it to the hero, to match the source where only the hero animates in on load and everything else is static/hover-only).
6. Footer copyright year via `new Date().getFullYear()`.
7. Respect `prefers-reduced-motion: reduce` by disabling non-essential animations/transitions.

## Constraints
- No React, no Tailwind CDN/build, no Framer Motion — everything hand-written CSS + vanilla JS.
- No external JS/CSS beyond the Google Fonts link above.
- One HTML file (`static.html`) with inline `<style>`/`<script>`; images stay as separate files referenced via relative `public/images/...` paths (do not inline them as base64 — that would bloat the file unnecessarily).
- Match the real content and image list exactly — no placeholder text, no invented barbers/services.
- This project's `C:\Users\M1B1\Desktop\claude 3 folder\CLAUDE.md` says to prefer the `impeccable` skill for design/UI work — invoke it via the Skill tool before/while implementing, and run its detector/fix loop before finishing; fix real findings, and disclose (in your final report) any you sanction as false positives with `impeccable hooks ignore-value` and a reason, per the project's stated triage policy.
- Verify in-browser (there's a Browser pane / preview tool available) at a few widths (≈380px, ≈768px, ≈1280px+) that: nothing overflows horizontally, all images load (relative paths resolve — you'll likely need to serve the folder over local HTTP rather than `file://` to test, e.g. `python -m http.server` from `arcane-7-barbershop-v2/`), the mobile menu opens/closes, the services hover-preview works, and the `#/book` view toggle works both ways.
- When done, report back: confirm the file path, list anything you deliberately simplified or approximated versus the React source (e.g. the grain texture, the parallax, the entrance animations) and why, and disclose any impeccable findings you fixed vs. sanctioned.
