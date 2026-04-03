# AI Prompt — Write Hero and Marketing Copy

Copy the prompt below and paste it into Claude or ChatGPT. Fill in the bracketed placeholders before sending. The output covers every text section of the landing page.

---

## Prompt

I am customizing a mobile app landing page template and need help writing all the marketing copy. I want clean, direct, user-benefit-focused writing — not hype.

Here is my app information:

- App name: [YOUR_APP_NAME]
- App category: [e.g., writing / fitness / finance / meditation / travel / productivity]
- Target user — who uses this app: [YOUR_TARGET_USER — e.g., "freelance writers who work across multiple devices", "people who want to build a daily fitness habit without a gym"]
- Primary benefit — the main problem it solves: [YOUR_PRIMARY_BENEFIT — e.g., "keeping all your writing in one place regardless of what device you're on"]
- Top 3 features:
  1. [FEATURE_1]
  2. [FEATURE_2]
  3. [FEATURE_3]
- Free plan limits: [FREE_PLAN_LIMITS — e.g., "up to 10 documents, basic formatting"]
- Pro plan name and price: [PRO_PLAN_NAME], [PRO_PRICE — e.g., "$6.99/month"]
- Pro plan key unlock: [WHAT_PRO_UNLOCKS — e.g., "unlimited documents, AI writing assistant, offline mode"]

Please write all of the following sections. Use the voice guidelines at the bottom.

---

### Section 1: Hero

**H1 headline**
- Maximum 10 words
- Lead with a clear, specific user benefit
- No questions. No commands. Describe the outcome the user gets.

**Subhead**
- 1 sentence, 20–30 words
- Specific — name the app and what it does
- No fluff phrases: "designed for", "built for modern", "take your X to the next level"

**Primary CTA button label**
- 3–5 words
- Action-oriented without being pushy

**Hero badge / trust line**
- One short line shown near the CTA (e.g., "Free to download. No credit card required.")
- Keep it factual and reassuring

---

### Section 2: Feature Cards (6 total)

For each of the 6 features:
- **Title:** 2–4 words, noun phrase (not a sentence)
- **Description:** exactly 13–15 words, states a specific user benefit, present tense

The first 3 features should cover the top 3 features I listed above. The remaining 3 should be supporting features you infer are likely true for a [APP_CATEGORY] app at this level of quality (sync, offline access, export, sharing, notifications, etc.).

Output as a TypeScript array:
```ts
const FEATURES = [
  { title: "...", icon: "...", description: "..." },
  ...
]
```
Use a relevant emoji for each icon field.

---

### Section 3: How It Works (3 steps)

Three steps that walk a new user from download to getting value.

For each step:
- **Step number:** "01", "02", "03"
- **Title:** 2–4 words, action verb + object (e.g., "Set Up Your Space", "Add Your First Entry")
- **Description:** 1–2 sentences. Tell the user exactly what they do and what they immediately get as a result.

Output as a TypeScript array:
```ts
const HOW_IT_WORKS = [
  { step: "01", title: "...", description: "..." },
  ...
]
```

---

### Section 4: Pricing

**Free plan**
- Plan name (can just be "Free")
- Tagline: 1 sentence describing who the free plan is for
- 3 feature bullets: specific to my free plan limits

**Pro plan**
- Plan name: [PRO_PLAN_NAME]
- Tagline: 1 sentence describing who the pro plan is for
- 4 feature bullets: the specific things Pro unlocks — be concrete

Output as a TypeScript array using this exact structure:
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

---

### Section 5: Download CTA Section

This is the final call-to-action section at the bottom of the page.

- **CTA headline:** ≤8 words. This is the last thing readers see — make it feel like a natural next step, not a hard sell.
- **CTA subhead:** 1 sentence. Remind the reader of the primary benefit or the ease of getting started.
- **App Store button label:** "Download on the App Store" (keep standard)
- **Google Play button label:** "Get it on Google Play" (keep standard)

---

### Voice Guidelines (follow for every section)

- Clean and direct — say what the app does, not how great it is
- No exclamation marks
- No words or phrases: "revolutionary", "game-changing", "next-level", "powerful", "seamless", "intuitive", "delight", "cutting-edge", "state-of-the-art", "elevate your", "unlock your potential"
- Write as if the reader is already interested — do not over-explain or oversell
- Prefer concrete, specific language over vague benefit language
- Present tense throughout
- Second person ("you", "your") is fine; avoid "we" except in footer copy
