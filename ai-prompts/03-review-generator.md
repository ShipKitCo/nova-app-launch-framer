# AI Prompt — Generate App Store Review Copy

Copy the prompt below and paste it into Claude or ChatGPT. Fill in the bracketed placeholders before sending. The output is a ready-to-paste `REVIEWS` array for `AppStoreLaunchPage.tsx`.

---

## Prompt

I need fictional but realistic App Store review copy for a marketing landing page. These are not real reviews — they are placeholder testimonials displayed on a product page for a mobile app template. They should read like genuine App Store reviews: casual, first-person, specific, and credible.

Here is my app information:

- App name: [YOUR_APP_NAME]
- App category: [e.g., writing / fitness / finance / meditation / travel / productivity]
- Key features or benefits (list 3–5): [FEATURE_1], [FEATURE_2], [FEATURE_3], [FEATURE_4], [FEATURE_5]
- Typical user: [WHO_USES_THIS — e.g., "freelance writers", "people trying to build a fitness habit", "small business owners tracking expenses"]

Please write 4–6 fictional review cards. Follow these guidelines for each:

**Authenticity rules:**
- Use realistic first names and plausible App Store-style usernames (e.g., "sarah_writes", "mikefromaustin", "j_ramos92")
- Mention at least one specific feature or benefit by name in each review — do not write generic praise
- Mix the tone: some enthusiastic, some measured and analytical, some brief and punchy
- 2–3 sentences per review maximum — App Store reviews are short
- Write in casual first-person. No formal language
- No exclamation marks on every sentence. One per review at most
- Avoid clichés: "life-changing", "game-changer", "I can't imagine life without it", "worth every penny"

**Format each review as a TypeScript object and output the full array:**

```ts
const REVIEWS = [
  {
    name: "First Last",
    handle: "@username",
    rating: 5,
    text: "Review text here.",
  },
  {
    name: "First Last",
    handle: "@username",
    rating: 5,
    text: "Review text here.",
  },
  // ... continue for all reviews
]
```

**Additional notes:**
- All ratings should be 5 — these are marketing testimonials, not a balanced sample
- Keep each `text` field to 2–3 sentences. The template truncates long reviews
- The `handle` field is displayed below the name in small text — keep it short (under 20 characters including the @)
- Vary the names: include a mix of genders and name origins to feel like a real diverse user base

Output the complete array, ready to paste into the TSX file to replace the existing `REVIEWS` constant.
