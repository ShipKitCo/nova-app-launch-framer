# App Store Launch Page — Framer Template

A full app store launch page for mobile apps, built as a single Framer code component. Animated hero with voice-to-text typewriter effect, auto-play feature tabs, before/after transformation section, reviews carousel, and 2-tier pricing — all in dark and light mode. iOS and Android badge visibility controlled via a single property.

---

## What's Included

| File | Purpose |
|---|---|
| `framer-code-components/AppStoreLaunchPage.tsx` | Main component — paste into Framer Code |
| `framer-code-components/FRAMER-SETUP.md` | Step-by-step Framer project setup |
| `ai-prompts/` | 4 AI prompts for customizing features, reviews, copy, and pricing |
| `listing/` | Marketplace listing copy for all platforms |
| `LICENSE.md` | Usage terms |

---

## Setup in Framer (3 Steps)

### Step 1 — Create a new project

Go to [framer.com](https://framer.com) → New project → Blank canvas. Name it: **App Store Launch Page**.

### Step 2 — Add the code component

1. Assets panel → **Code** → **+** (New code file)
2. Name it `AppStoreLaunchPage`
3. Paste the full contents of `framer-code-components/AppStoreLaunchPage.tsx`
4. Press **Cmd+S**

### Step 3 — Customize via Property Controls

Select the component on canvas. Four controls appear in the right panel:

| Control | Default | What it changes |
|---|---|---|
| **Color Mode** | Dark | Entire template switches dark ↔ light |
| **Accent Color** | `#818CF8` | Buttons, active tab indicators, pill badges, CTA ring |
| **App Name** | Nova | Nav logo text and all app name references throughout |
| **Platform Badges** | Both | Shows iOS badge only, Android badge only, or both together |

---

## Sections

1. **Nav** — sticky, blur backdrop, CTA button
2. **Hero** — headline with animated voice-to-text typewriter effect, subhead, App Store / Google Play download buttons
3. **Works Everywhere** — scrolling logo marquee of supported platforms and integrations
4. **Feature Showcase** — auto-play tabbed interface with synchronized phone screen previews
5. **Before / After** — split transformation panel showing writing workflow with and without Nova
6. **Reviews** — single featured quote with left/right arrows, star rating display, and 4.8 aggregate rating block
7. **Pricing** — 2-tier cards: Free (feature-limited) and Pro (full access), monthly/annual toggle
8. **CTA Banner** — full-width download prompt with accent background
9. **Footer**

---

## Customizing Content

All content lives in data arrays at the top of `AppStoreLaunchPage.tsx`. Key areas:

| What to change | Where to find it |
|---|---|
| Feature tab labels, descriptions, and phone screen content | `FEATURES` array at top of component |
| Review quotes, reviewer names, and avatars | `REVIEWS` array |
| Marquee logos and platform names | `APPS` array |
| Hero typewriter phrases | `TYPEWRITER_PHRASES` constant near top of component |
| Pricing tier names, prices, and feature lists | `PRICING` array |

Use the prompts in `ai-prompts/` to regenerate any of this content with an LLM in minutes.

---

## Browser Support

| Browser | Notes |
|---|---|
| Chrome 90+ | Full support |
| Safari 14+ | Full support (backdrop-filter supported) |
| Firefox 88+ | Full support |
| Mobile Safari iOS 14+ | Full support |

Scroll-reveal animations respect `prefers-reduced-motion`. The typewriter effect pauses when the tab is not visible.

---

## Get the Template

**Remix Link (Framer):** [https://framer.com/remix/zUvL9T5EaC173B6rJ0P8](https://framer.com/remix/zUvL9T5EaC173B6rJ0P8)

Also available on Gumroad and Framer Marketplace. Price: **$69**.

---

## Support

Questions not covered here: open an issue or contact via the marketplace listing. Response within 48 hours.

GitHub: [https://github.com/ShipKitCo/nova-app-launch-framer](https://github.com/ShipKitCo/nova-app-launch-framer)
