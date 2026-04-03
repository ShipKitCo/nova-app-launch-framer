# AI Prompt — Rebrand to Your App

Copy the prompt below and paste it into Claude or ChatGPT. Fill in the bracketed placeholders before sending.

---

## Prompt

You are helping me customize a Framer template called app-store-launch-page-v1. The template ships with placeholder content for a fictional app called "Nova." I need you to rewrite all the placeholder content to match my real app.

Here is my app information:

- App name: [YOUR_APP_NAME]
- Tagline (one short phrase that captures what the app does): [YOUR_TAGLINE]
- App category: [e.g., productivity / fitness / finance / writing / travel]
- Primary benefit (what problem does it solve, in plain terms): [YOUR_PRIMARY_BENEFIT]
- Download count or user count stat: [YOUR_DOWNLOAD_COUNT] (e.g., "80K+", "12,000+")
- App Store rating: [YOUR_RATING] (e.g., "4.9")
- Countries or markets stat: [YOUR_COUNTRIES] (e.g., "90+ countries", "available worldwide")
- Free plan name: [YOUR_FREE_PLAN_NAME] (e.g., "Free", "Starter", "Basic")
- Pro plan name: [YOUR_PRO_PLAN_NAME] (e.g., "Pro", "Premium", "Plus")
- Pro plan price: [YOUR_PRO_PRICE] (e.g., "$6.99/mo", "$4/month", "$49.99/year")
- Top 3 features: [FEATURE_1], [FEATURE_2], [FEATURE_3]

Please output the following, formatted so I can paste directly into the TSX file:

### 1. Hero section strings
- H1 headline (≤10 words, clear benefit, no exclamation marks)
- Subhead (1 sentence, specific, no fluff)
- CTA button label (3–5 words)
- Three stat items: value + label pairs (e.g., "80K+ Downloads", "4.9 Rating", "90+ Countries")

### 2. Updated FEATURES array
Six feature cards. Each card should:
- Have a short, clear title (2–4 words)
- Have a description of 13–15 words that names a specific benefit
- Use a relevant emoji as the icon field
- Be grounded in what my app actually does — no generic "save time" filler

Output format:
```ts
const FEATURES = [
  { title: "...", icon: "...", description: "..." },
  ...
]
```

### 3. Updated HOW_IT_WORKS array
Three steps. Each step should:
- Have a step number ("01", "02", "03")
- Have a short action-oriented title (2–4 words)
- Have a 1–2 sentence description that explains what the user does and what they get

Output format:
```ts
const HOW_IT_WORKS = [
  { step: "01", title: "...", description: "..." },
  ...
]
```

### 4. Updated PLANS array
Two pricing tiers. Match the structure below exactly. Use my plan names and pricing. Make the feature bullet points specific to my app — avoid generic bullets like "Priority support" unless it actually fits.

Output format:
```ts
const PLANS = [
  {
    name: "...",
    price: "Free",
    period: "",
    description: "...",
    features: ["...", "...", "..."],
    cta: "Download Free",
    highlighted: false,
  },
  {
    name: "...",
    price: "...",
    period: "/month",
    description: "...",
    features: ["...", "...", "...", "..."],
    cta: "Start Free Trial",
    highlighted: true,
  },
]
```

### 5. Footer copy
- Footer tagline (the short line under the app name in the footer): one sentence, plain, no hype
- Copyright line: © [CURRENT_YEAR] [YOUR_APP_NAME]. All rights reserved.

### Voice guidelines to follow throughout:
- Clean, minimal, product-led — not hype-driven
- No exclamation marks
- No words like "revolutionary", "game-changing", "next-level", "powerful", or "seamless"
- Describe what the app does, not how amazing it is
- Write as if the reader is already interested — skip the sell, lead with the benefit
