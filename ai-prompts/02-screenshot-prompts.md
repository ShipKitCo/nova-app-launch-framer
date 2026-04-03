# AI Prompt — Generate App Screenshot Prompts

Copy the prompt below and paste it into Claude or ChatGPT. Fill in the bracketed placeholders before sending. The output gives you ready-to-paste prompts for Midjourney or DALL-E.

---

## Prompt

I am building a marketing page for a mobile app and need AI-generated images for three phone frame mockups plus two marketing cover images. Help me write specific, detailed image generation prompts.

Here is my app information:

- App name: [YOUR_APP_NAME]
- App category: [e.g., writing / fitness / finance / travel / productivity / meditation]
- Primary color / accent color: [YOUR_HEX_OR_COLOR_NAME] (e.g., "#818CF8 indigo", "deep teal", "warm orange")
- App style: [e.g., minimal and clean / bold and energetic / calm and focused]
- Dark or light UI: [dark / light / both]

Please output the following:

---

### Phone Frame Screenshots (3 prompts)

Each prompt is for a single app screen displayed inside a phone mockup. The three screens should show different parts of the app — a logical progression from overview to detail to action.

For each prompt:
- Describe a specific, realistic UI screen appropriate for a [APP_CATEGORY] app
- Include the app's color palette and style in the description
- Be specific about what UI elements are visible (e.g., charts, cards, input fields, lists, navigation bars)
- Do not describe generic "phone mockup" imagery — describe the screen content itself

**Technical specs for all three prompts:**
- Dimensions: 390×844px (or specify 9:19.5 aspect ratio)
- Color space: sRGB
- Orientation: portrait
- Style: photorealistic UI screenshot, no device chrome unless specified, flat lay acceptable

**Screenshot 1 — Main / Home screen**
Prompt should describe:
- The primary dashboard or home view the user sees when they open the app
- Key data or content visible at a glance
- Navigation elements if visible

**Screenshot 2 — Core feature screen**
Prompt should describe:
- The screen where the app's main value is delivered (e.g., the writing editor, the workout tracker, the budget overview)
- Active state — show the app being used, not an empty state

**Screenshot 3 — Detail or action screen**
Prompt should describe:
- A deeper view: a settings panel, an individual item detail, a completion state, or a results screen
- This should feel like a natural next step from Screenshot 2

---

### Marketing Images (2 prompts)

These are used for Gumroad cover images and Framer Marketplace preview thumbnails — not in the app itself.

**Technical specs:**
- Gumroad cover: 1600×900px, landscape
- Framer Marketplace preview: 1200×900px, landscape
- Both: clean, minimal composition, suitable for a template marketplace listing

**Marketing Image 1 — Gumroad cover**
Prompt should describe:
- A lifestyle or product shot that conveys the app's benefit without UI clutter
- The app's accent color as the dominant background tone
- Optional: a single phone mockup as a prop, not the focal point

**Marketing Image 2 — Framer Marketplace preview**
Prompt should describe:
- A top-down or angled view of the full template page design
- Shows multiple sections of the landing page visible at once
- Minimal, editorial, template-preview style — similar to how Framer displays its own template thumbnails

---

Output each prompt as a clearly labeled code block so I can copy them one at a time into Midjourney or DALL-E.
