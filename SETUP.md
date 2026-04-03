# Framer Setup Guide — app-store-launch-page-v1

## 1. Quick Setup (3 steps)

1. Open `AppStoreLaunchPage.tsx` → select all → Copy
2. In Framer: **Assets → Code → + New file** → paste the code → **Save**
3. Drag the component to the canvas → set **Width: Fill** → configure property controls in the right panel

---

## 2. Property Controls

### Color Mode
- **Options:** `dark` / `light`
- **Default:** `dark`
- Controls the global background, surface, border, and text colors across all sections.

### Accent Color
- **Type:** Color (hex)
- **Default:** `#818CF8` (indigo)
- Propagates to: feature card icons, star ratings in reviews, pricing accent details, CTA buttons, badge hover states.
- To match your brand: enter any hex value in the property panel. The component handles contrast automatically.

### App Name
- **Type:** String
- **Default:** `"Nova"`
- Updates: nav logo text, hero headline, footer copyright, and pricing plan description strings everywhere the app name appears. You only need to set it once.

### Platform Badges
- **Options:** `both` / `iOS only` / `Android only`
- **Default:** `both`
- Controls which App Store download buttons appear in the hero section and the download CTA section at the bottom.
- Choose **"iOS only"** if your app is iPhone/iPad exclusive.
- Choose **"Android only"** if your app is Google Play exclusive.
- Choose **"both"** for cross-platform apps.

---

## 3. Replacing CSS Phone Frames with Real Screenshots

The phone frames are built entirely with CSS — no image assets are required for the template to display correctly. This means zero broken images when buyers first install the template.

To add real app screenshots, you have two options:

**Option A — Framer Image Layer (no code)**
- In Framer, add an **Image** component on top of each phone frame component
- Resize it to fill the screen area of the frame
- Clip it with a mask if needed

**Option B — Edit the TSX directly**
- Locate the `<div className="asl-phone-screen">` element inside the phone frame component
- Replace the gradient fill `<div>` inside it with:
  ```jsx
  <img
    src="YOUR_IMAGE_URL"
    style={{ width: "100%", height: "100%", objectFit: "cover" }}
  />
  ```

**Recommended screenshot dimensions:** 390×844px (iPhone 15 Pro native resolution works well). Export at 2x (780×1688px) for retina displays.

---

## 4. Customizing App Content

All editable content is stored in constant arrays at the top of `AppStoreLaunchPage.tsx`. You do not need to search through JSX — find the array, edit the values, save.

### `FEATURES`
Six feature cards displayed in the features grid section.
```ts
{ title: string; icon: string; description: string }
```
- `icon` accepts any emoji or a single Unicode character. SVG icon support requires replacing the span with an img or SVG element.

### `REVIEWS`
Four review cards displayed in the social proof section.
```ts
{ name: string; handle: string; rating: number; text: string }
```
- `rating` should be 1–5. Stars render automatically.
- `handle` is the App Store-style username displayed below the reviewer's name.

### `HOW_IT_WORKS`
Three steps displayed in the how-it-works section.
```ts
{ step: string; title: string; description: string }
```
- `step` is the step number label (e.g., `"01"`, `"02"`, `"03"`).

### `PLANS`
Two pricing tiers displayed in the pricing section.
```ts
{ name: string; price: string; period: string; description: string; features: string[]; cta: string; highlighted: boolean }
```
- Set `highlighted: true` on the plan you want to visually emphasize (typically the paid tier).
- `features` is an array of bullet point strings.

---

## 5. Customizing the App Store Badges

The download badges in the hero and CTA sections are styled with CSS. They are placeholder buttons — functional as links, styled to resemble App Store and Google Play badges.

**To use official badge artwork:**
- Apple's official App Store badge assets and usage guidelines are available at: [developer.apple.com/app-store/marketing/guidelines](https://developer.apple.com/app-store/marketing/guidelines/)
- Google Play's official badge assets and usage guidelines are available at: [play.google.com/intl/en_us/badges](https://play.google.com/intl/en_us/badges/)

Both Apple and Google make badge SVGs and PNGs available for download under their respective brand usage guidelines. Review the guidelines before using official artwork in published materials.

**To swap in official badge images in the TSX:**
Replace the CSS badge `<a>` element with an `<a>` wrapping an `<img src="..." />` pointing to your downloaded badge file.

---

## 6. Framer Variable Names

Use these variable names when connecting template colors to Framer's Variables panel. These match the naming convention used across all ShipKitCo templates, which is required for bundle consistency when buyers purchase multiple templates.

| Variable Name | Role |
|---|---|
| `Color/Accent` | Primary accent — indigo by default |
| `Color/Background` | Page background |
| `Color/Surface` | Card and panel backgrounds |
| `Color/Border` | Dividers and outlines |
| `Color/Text` | Primary body text |
| `Color/Muted` | Secondary text, placeholders, captions |

---

## 7. Publishing

1. **Name the project before the first publish.** The project name becomes part of the published URL and cannot be changed cleanly after publishing.
2. Publish the project to get a live URL.
3. Get the **Remix Link**: File → Share → Copy Remix Link.
4. Use the Remix Link as the **Checkout URL** in your Framer Marketplace submission. Buyers who purchase through the Marketplace will receive the Remix Link, which copies the full project into their own Framer account.

---

## 8. Known Limitations

- **Phone frame is CSS-only.** The frames look correct in Framer Preview and on the published site. On the Framer canvas editor itself, CSS-heavy components can appear slightly different — this is expected behavior and does not affect the published output.
- **App Store badge styling is custom CSS.** The badges are not official Apple or Google badge artwork. They are placeholder link buttons. See Section 5 above for instructions on swapping in official badge images.
