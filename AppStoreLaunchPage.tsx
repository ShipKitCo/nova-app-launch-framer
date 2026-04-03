import { addPropertyControls, ControlType } from "framer"
import React, { useState, useEffect, useRef } from "react"

/**
 * Nova \u2014 App Store Launch Page
 * app-store-launch-page-v1
 *
 * Design system: shared-design-system/DESIGN-TOKENS.md
 * Reference: saas-comparison-page-v1/ComparisonPage.tsx
 *            saas-changelog-page-v1/ChangelogPage.tsx
 *
 * Improvements v2:
 *   1. Hero: split layout 55/45, 3D phone tilt, floating chips, radial glow
 *   2. Sticky scroll: scroll listener (window + document) replaces IntersectionObserver
 *   3. PhoneScreen: real mini-app UI per feature (no gradients)
 *   4. Pricing: matches saas-pricing-page-v1 card grid exactly
 *   5. Badges: glass/gradient border via CSS padding-box / border-box trick
 *
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight auto
 */

// -- Props interface -------------------------------------------------------
interface Props {
    colorMode?: "dark" | "light"
    accentColor?: string
    appName?: string
    platformBadges?: "both" | "ios" | "android"
}

// -- Static data -----------------------------------------------------------
const APPS = [
    { name: "Notion", slug: "notion" },
    { name: "Slack", slug: "slack" },
    { name: "Figma", slug: "figma" },
    { name: "Linear", slug: "linear" },
    { name: "Gmail", slug: "gmail" },
    { name: "VS Code", slug: "visualstudiocode" },
    { name: "GitHub", slug: "github" },
    { name: "Discord", slug: "discord" },
    { name: "Word", slug: "microsoftword" },
    { name: "Google Docs", slug: "googledocs" },
    { name: "Obsidian", slug: "obsidian" },
    { name: "Chrome", slug: "googlechrome" },
    { name: "Outlook", slug: "microsoftoutlook" },
    { name: "Dropbox", slug: "dropbox" },
    { name: "X / Twitter", slug: "x" },
    { name: "WhatsApp", slug: "whatsapp" },
]

const FEATURES = [
    {
        title: "AI-powered drafts",
        description:
            "Generate a first draft from a single sentence. Nova\u2019s writing model is trained on millions of high-quality documents.",
    },
    {
        title: "Voice to text",
        description:
            "Dictate naturally and Nova transcribes with punctuation, structure, and formatting applied automatically.",
    },
    {
        title: "Smart rewrite",
        description:
            "Highlight any passage and choose a rewrite mode: clearer, shorter, more formal, or match your personal style.",
    },
    {
        title: "Distraction-free mode",
        description:
            "One tap hides every UI element except your words. No notifications. No menus. Just writing.",
    },
    {
        title: "Cross-device sync",
        description:
            "Start on iPhone, continue on iPad, finish on Mac. Changes sync instantly across every device.",
    },
    {
        title: "Export anywhere",
        description:
            "Export to PDF, Word, Markdown, or Notion with a single tap. Formatting is preserved every time.",
    },
]

const REVIEWS = [
    {
        name: "Sarah K.",
        handle: "@sarahk_writes",
        rating: 5,
        text: "I\u2019ve tried every writing app. Nova is the first one that actually helps me write faster without breaking my train of thought.",
    },
    {
        name: "Marcus T.",
        handle: "@marcus_t",
        rating: 5,
        text: "The AI drafts are scary good. I use Nova for all my client proposals now \u2014 cut my writing time in half.",
    },
    {
        name: "Ji-yeon L.",
        handle: "@jiyeon",
        rating: 5,
        text: "Distraction-free mode is the real feature. My word count doubled the first week I switched.",
    },
    {
        name: "Daniel R.",
        handle: "@dr_writes",
        rating: 5,
        text: "Seamless between iPhone and Mac. The sync is instant. I can start a thought anywhere and it\u2019s just there.",
    },
]

// -------------------------------------------------------------------------

/**
 * Apple logo path (simplified)
 */
const AppleLogoPath = () => (
    <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
        <path
            d="M13.2 9.5c0-2.6 2.1-3.8 2.2-3.9-1.2-1.7-3-1.9-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.3-.8C2.7 3.8 1 4.8.2 6.4c-1.7 2.9-.4 7.2 1.2 9.6.8 1.2 1.8 2.5 3 2.4 1.2-.1 1.7-.8 3.1-.8 1.5 0 1.9.8 3.2.7 1.3 0 2.1-1.2 2.9-2.3.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.7-1-2.7-3.8z"
            fill="white"
        />
        <path
            d="M10.7 1.8C11.3 1 11.8 0 11.6 0c-.9.1-2 .6-2.6 1.4-.6.7-1.1 1.8-.9 2.8 1 .1 2-.5 2.6-1.4z"
            fill="white"
        />
    </svg>
)

// IMPROVEMENT 5: glass border badges \u2014 inline styles stripped, className drives border
const AppStoreBadge = () => (
    <div className="asl-badge" style={{ width: "156px", height: "48px", boxSizing: "border-box" }}>
        <AppleLogoPath />
        <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
            <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.75)", fontFamily: "inherit", letterSpacing: "0.02em" }}>
                Download on the
            </span>
            <span style={{ fontSize: "16px", fontWeight: 500, color: "#fff", fontFamily: "inherit", lineHeight: 1.1 }}>
                App Store
            </span>
        </div>
    </div>
)

const GooglePlayBadge = () => (
    <div className="asl-badge" style={{ width: "156px", height: "48px", boxSizing: "border-box" }}>
        {/* Google Play icon \u2014 4 colored triangles */}
        <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
            <path d="M0.5 1.3L10.2 10 0.5 18.7V1.3z" fill="#EA4335" />
            <path d="M0.5 1.3L10.2 10l3.3-3.3L2.3 0.3C1.7 0 1.1 0.5 0.5 1.3z" fill="#FBBC05" />
            <path d="M0.5 18.7L10.2 10l3.3 3.3-7.2 4.4c-.6.4-1.2.6-1.8.3L0.5 18.7z" fill="#34A853" />
            <path d="M10.2 10l3.3-3.3 3.6 2.1c1 .6 1 1.9 0 2.5l-3.6 2.1L10.2 10z" fill="#4285F4" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
            <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.75)", fontFamily: "inherit", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                GET IT ON
            </span>
            <span style={{ fontSize: "16px", fontWeight: 500, color: "#fff", fontFamily: "inherit", lineHeight: 1.1 }}>
                Google Play
            </span>
        </div>
    </div>
)

// =========================================================================
// IMPROVEMENT 3: Real phone screen content per feature
// =========================================================================
interface PhoneScreenProps {
    screenContent: number
    accent: string
    accentDim: string
    surface: string
    elevated: string
    border: string
    muted: string
    text: string
}

const PhoneScreen = ({ screenContent, accent, accentDim, surface, elevated, border, muted, text }: PhoneScreenProps) => {
    const s = screenContent

    // Shared inner styles
    const statusBar = (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px 0", marginBottom: "0" }}>
            <span style={{ fontSize: "10px", fontWeight: 600, color: "rgba(255,255,255,0.85)", fontFamily: "inherit" }}>9:41</span>
            <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <rect x="0" y="3" width="2" height="5" rx="0.5" fill="rgba(255,255,255,0.6)" />
                    <rect x="3" y="2" width="2" height="6" rx="0.5" fill="rgba(255,255,255,0.6)" />
                    <rect x="6" y="0" width="2" height="8" rx="0.5" fill="rgba(255,255,255,0.6)" />
                    <rect x="9" y="0" width="2" height="8" rx="0.5" fill="rgba(255,255,255,0.85)" />
                </svg>
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                    <rect x="0.5" y="0.5" width="11" height="7" rx="1.5" stroke="rgba(255,255,255,0.4)" />
                    <rect x="12" y="2.5" width="1.5" height="3" rx="0.5" fill="rgba(255,255,255,0.4)" />
                    <rect x="2" y="2" width="7" height="4" rx="0.75" fill="rgba(255,255,255,0.85)" />
                </svg>
            </div>
        </div>
    )

    const homeBar = (
        <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", width: 80, height: 3, borderRadius: 99, background: "rgba(255,255,255,0.25)" }} />
    )

    // -- Screen 0: AI Drafts -----------------------------------------------
    if (s === 0) {
        return (
            <div style={{ width: "100%", height: "100%", background: "#0D1117", borderRadius: "inherit", overflow: "hidden", position: "relative", display: "flex", flexDirection: "column" }}>
                {statusBar}
                {/* App toolbar */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                    <span style={{ fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.85)", fontFamily: "inherit" }}>Documents</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" />
                    </svg>
                </div>
                {/* Document list */}
                <div style={{ flex: 1, overflow: "hidden", padding: "0" }}>
                    {[
                        { title: "Q3 Product Strategy", date: "Today, 2:14 PM", excerpt: "The core focus this quarter should be..." },
                        { title: "Investor Update Draft", date: "Yesterday", excerpt: "Revenue grew 34% quarter over..." },
                        { title: "Team Offsite Notes", date: "Mon", excerpt: "Key decisions from last week\u2019s..." },
                    ].map((doc, i) => (
                        <div key={i} style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: i === 0 ? "rgba(255,255,255,0.03)" : "transparent" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "3px" }}>
                                <span style={{ fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.9)", fontFamily: "inherit" }}>{doc.title}</span>
                                <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", fontFamily: "inherit", flexShrink: 0 }}>{doc.date}</span>
                            </div>
                            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)", fontFamily: "inherit", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{doc.excerpt}</span>
                        </div>
                    ))}
                </div>
                {/* Generate pill + FAB */}
                <div style={{ padding: "12px 0 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", paddingBottom: "28px" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: accentDim, borderRadius: "99px", padding: "4px 10px" }}>
                        <span style={{ fontSize: "9px", color: accent, fontFamily: "inherit" }}>\u2736 Generate with AI</span>
                    </div>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                    </div>
                </div>
                {homeBar}
            </div>
        )
    }

    // -- Screen 1: Voice to Text -------------------------------------------
    if (s === 1) {
        const waveHeights = [8, 14, 20, 12, 28, 16, 32, 18, 24, 10, 36, 22, 14, 30, 16, 20, 12, 26, 18, 10]
        return (
            <div style={{ width: "100%", height: "100%", background: "#0D0D0D", borderRadius: "inherit", overflow: "hidden", position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                {statusBar}
                <div style={{ marginTop: "16px", marginBottom: "4px" }}>
                    <span style={{ fontSize: "10px", color: accent, fontFamily: "inherit", letterSpacing: "0.06em", textTransform: "uppercase" }}>Recording...</span>
                </div>
                {/* Mic circle + pulse ring */}
                <div style={{ position: "relative", width: 80, height: 80, marginTop: "20px", marginBottom: "20px" }}>
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 112, height: 112, borderRadius: "50%", background: `rgba(129,140,248,0.15)`, animation: "asl-pulse 1.8s ease-in-out infinite" }} />
                    <div style={{ width: 80, height: 80, borderRadius: "50%", background: accent, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1 }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                            <path d="M19 10v2a7 7 0 01-14 0v-2" />
                            <line x1="12" y1="19" x2="12" y2="23" />
                            <line x1="8" y1="23" x2="16" y2="23" />
                        </svg>
                    </div>
                </div>
                {/* Waveform */}
                <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "16px" }}>
                    {waveHeights.map((h, i) => (
                        <div key={i} style={{ width: 2, height: h, borderRadius: 2, background: "rgba(255,255,255,0.5)" }} />
                    ))}
                </div>
                {/* Transcription text */}
                <div style={{ padding: "0 20px", marginBottom: "20px" }}>
                    <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.65)", fontFamily: "inherit", lineHeight: 1.55, display: "block", textAlign: "center" }}>
                        \u201cThe quarterly results show strong growth in...\u201d
                    </span>
                </div>
                {/* Buttons */}
                <div style={{ display: "flex", gap: "10px", paddingBottom: "28px" }}>
                    <button style={{ padding: "8px 20px", borderRadius: "8px", background: "transparent", border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.7)", fontSize: "11px", fontFamily: "inherit", cursor: "pointer" }}>
                        Cancel
                    </button>
                    <button style={{ padding: "8px 20px", borderRadius: "8px", background: accent, border: "none", color: "#000", fontSize: "11px", fontWeight: 500, fontFamily: "inherit", cursor: "pointer" }}>
                        Done
                    </button>
                </div>
                {homeBar}
            </div>
        )
    }

    // -- Screen 2: Smart Rewrite -------------------------------------------
    if (s === 2) {
        return (
            <div style={{ width: "100%", height: "100%", background: "#0D1117", borderRadius: "inherit", overflow: "hidden", position: "relative", display: "flex", flexDirection: "column" }}>
                {statusBar}
                {/* Edit toolbar */}
                <div style={{ display: "flex", gap: "8px", padding: "8px 14px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                    {["B", "I", "U", "\u2026"].map((icon, i) => (
                        <div key={i} style={{ width: 22, height: 22, borderRadius: "4px", background: "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontSize: "10px", fontWeight: i === 0 ? 700 : i === 1 ? 400 : 400, fontStyle: i === 1 ? "italic" : "normal", color: "rgba(255,255,255,0.6)", fontFamily: "inherit" }}>{icon}</span>
                        </div>
                    ))}
                </div>
                {/* Text content with highlight and popup */}
                <div style={{ flex: 1, padding: "14px", position: "relative", overflow: "hidden" }}>
                    {/* Para 1 */}
                    <div style={{ marginBottom: "10px" }}>
                        {[85, 72, 91].map((w, i) => <div key={i} style={{ height: 3, width: `${w}%`, borderRadius: 2, background: "rgba(255,255,255,0.25)", marginBottom: "5px" }} />)}
                    </div>
                    {/* Para 2 highlighted */}
                    <div style={{ background: accentDim, borderRadius: "4px", padding: "6px 8px", marginBottom: "10px", position: "relative" }}>
                        {[88, 70, 60].map((w, i) => <div key={i} style={{ height: 3, width: `${w}%`, borderRadius: 2, background: accent, opacity: 0.5, marginBottom: "5px" }} />)}
                        {/* Floating popup */}
                        <div style={{ position: "absolute", top: "-90px", left: "0", background: elevated, border: `1px solid ${border}`, borderRadius: "8px", boxShadow: "0 8px 24px rgba(0,0,0,0.5)", minWidth: "130px", overflow: "hidden", zIndex: 10 }}>
                            {["Make clearer", "Make shorter", "More formal", "Casual tone"].map((opt, i) => (
                                <div key={i} style={{ padding: "7px 12px", fontSize: "10px", color: i === 0 ? accent : "rgba(255,255,255,0.75)", fontFamily: "inherit", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none", display: "flex", alignItems: "center", gap: "6px" }}>
                                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: i === 0 ? accent : "rgba(255,255,255,0.2)", flexShrink: 0 }} />
                                    {opt}
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Para 3 */}
                    <div>
                        {[78, 55].map((w, i) => <div key={i} style={{ height: 3, width: `${w}%`, borderRadius: 2, background: "rgba(255,255,255,0.25)", marginBottom: "5px" }} />)}
                    </div>
                </div>
                {homeBar}
            </div>
        )
    }

    // -- Screen 3: Distraction-free ----------------------------------------
    if (s === 3) {
        return (
            <div style={{ width: "100%", height: "100%", background: "#080808", borderRadius: "inherit", overflow: "hidden", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ position: "absolute", top: "10px", left: 0, right: 0, textAlign: "center" }}>
                    <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.18)", fontFamily: "inherit", fontWeight: 600 }}>9:41</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", paddingBottom: "16px" }}>
                    <span style={{ fontSize: "18px", fontWeight: 400, color: "rgba(255,255,255,0.9)", fontFamily: "inherit", letterSpacing: "-0.02em" }}>
                        The best stories start with
                    </span>
                    <div style={{ width: 2, height: 22, background: accent, marginLeft: "2px", animation: "asl-blink 1s step-end infinite" }} />
                </div>
                <div style={{ position: "absolute", bottom: "28px", left: 0, right: 0, textAlign: "center" }}>
                    <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", fontFamily: "inherit" }}>142 words</span>
                </div>
                {homeBar}
            </div>
        )
    }

    // -- Screen 4: Cross-device sync ----------------------------------------
    if (s === 4) {
        return (
            <div style={{ width: "100%", height: "100%", background: "#0D1117", borderRadius: "inherit", overflow: "hidden", position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                {statusBar}
                <div style={{ marginTop: "20px", marginBottom: "20px", textAlign: "center" }}>
                    <span style={{ fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.85)", fontFamily: "inherit" }}>All devices synced</span>
                </div>
                {/* Sync icon */}
                <div style={{ marginBottom: "16px" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="1 4 1 10 7 10" />
                        <polyline points="23 20 23 14 17 14" />
                        <path d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15" />
                    </svg>
                </div>
                {/* Devices row */}
                <div style={{ display: "flex", gap: "12px", alignItems: "flex-end", marginBottom: "20px" }}>
                    {/* iPhone */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
                        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: "8px", padding: "10px 7px", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                            <svg width="16" height="26" viewBox="0 0 16 26" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
                                <rect x="1" y="1" width="14" height="24" rx="3" />
                                <line x1="6" y1="3" x2="10" y2="3" stroke="rgba(255,255,255,0.25)" />
                                <circle cx="8" cy="22" r="1" />
                            </svg>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.4)", fontFamily: "inherit" }}>iPhone</span>
                    </div>
                    {/* iPad */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
                        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: "8px", padding: "10px 10px", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                            <svg width="26" height="22" viewBox="0 0 26 22" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
                                <rect x="1" y="1" width="24" height="20" rx="3" />
                                <circle cx="23" cy="11" r="0.8" fill="rgba(255,255,255,0.4)" stroke="none" />
                            </svg>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.4)", fontFamily: "inherit" }}>iPad</span>
                    </div>
                    {/* Mac */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
                        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: "8px", padding: "10px 8px", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                            <svg width="28" height="20" viewBox="0 0 28 20" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
                                <rect x="1" y="1" width="26" height="16" rx="2" />
                                <line x1="0" y1="19" x2="28" y2="19" />
                                <line x1="10" y1="17" x2="18" y2="17" />
                            </svg>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.4)", fontFamily: "inherit" }}>Mac</span>
                    </div>
                </div>
                <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", fontFamily: "inherit" }}>Last synced just now</span>
                {homeBar}
            </div>
        )
    }

    // -- Screen 5: Export --------------------------------------------------
    return (
        <div style={{ width: "100%", height: "100%", background: "#0D1117", borderRadius: "inherit", overflow: "hidden", position: "relative", display: "flex", flexDirection: "column" }}>
            {statusBar}
            {/* Faded doc preview */}
            <div style={{ flex: 1, padding: "12px 16px", opacity: 0.3 }}>
                {[85, 72, 91, 60, 78].map((w, i) => <div key={i} style={{ height: 3, width: `${w}%`, borderRadius: 2, background: "rgba(255,255,255,0.5)", marginBottom: "6px" }} />)}
            </div>
            {/* Bottom sheet */}
            <div style={{ background: elevated, borderRadius: "20px 20px 0 0", boxShadow: "0 -8px 40px rgba(0,0,0,0.6)", padding: "16px 0 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 16px", marginBottom: "12px" }}>
                    <span style={{ fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.9)", fontFamily: "inherit" }}>Export as</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </div>
                {[
                    { name: "PDF", ext: "Most compatible", selected: true },
                    { name: "Word", ext: ".docx", selected: false },
                    { name: "Markdown", ext: ".md", selected: false },
                    { name: "Notion", ext: "Integration", selected: false },
                    { name: "Plain Text", ext: ".txt", selected: false },
                ].map((fmt, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 16px", borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                        <div style={{ width: 14, height: 14, borderRadius: "50%", border: `2px solid ${fmt.selected ? accent : "rgba(255,255,255,0.25)"}`, background: fmt.selected ? accent : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {fmt.selected && <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#000" }} />}
                        </div>
                        <span style={{ fontSize: "11px", color: fmt.selected ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.6)", fontFamily: "inherit", flex: 1 }}>{fmt.name}</span>
                        <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)", fontFamily: "inherit" }}>{fmt.ext}</span>
                    </div>
                ))}
                <div style={{ padding: "12px 16px 0" }}>
                    <button style={{ width: "100%", height: 40, borderRadius: "10px", background: accent, border: "none", color: "#000", fontSize: "12px", fontWeight: 500, fontFamily: "inherit", cursor: "pointer" }}>
                        Export Document
                    </button>
                </div>
            </div>
        </div>
    )
}

// -- Phone mockup shell ----------------------------------------------------
interface PhoneProps {
    screenContent: number
    size?: "large" | "small"
    accent: string
    accentDim: string
    surface: string
    elevated: string
    border: string
    muted: string
    text: string
}

const PhoneMockup = ({ screenContent, size = "large", accent, accentDim, surface, elevated, border, muted, text }: PhoneProps) => {
    const isLarge = size === "large"
    const W = isLarge ? 260 : 220
    const H = isLarge ? 530 : 448
    const BR = isLarge ? 44 : 38
    const SCREEN_BR = isLarge ? 36 : 30
    const DI_W = isLarge ? 90 : 76
    const DI_H = isLarge ? 28 : 24

    return (
        <div
            style={{
                width: W,
                height: H,
                background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)",
                borderRadius: BR,
                padding: 10,
                boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 40px 80px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4)",
                position: "relative",
                flexShrink: 0,
            }}
        >
            {/* Dynamic Island */}
            <div
                style={{
                    width: DI_W,
                    height: DI_H,
                    background: "#000",
                    borderRadius: 20,
                    position: "absolute",
                    top: 22,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 2,
                }}
            />
            {/* Screen */}
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: SCREEN_BR,
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <PhoneScreen
                    screenContent={screenContent}
                    accent={accent}
                    accentDim={accentDim}
                    surface={surface}
                    elevated={elevated}
                    border={border}
                    muted={muted}
                    text={text}
                />
            </div>
        </div>
    )
}

// =========================================================================

export default function AppStoreLaunchPage(props: Props) {
    const {
        colorMode = "dark",
        accentColor = "#818CF8",
        appName = "Nova",
        platformBadges = "both",
    } = props

    const wrapRef = useRef<HTMLDivElement>(null)

    const [viewportWidth, setViewportWidth] = useState(
        typeof window !== "undefined" ? window.innerWidth : 1200
    )
    const [activeFeature, setActiveFeature] = useState(0)
    const [progressKey, setProgressKey] = useState(0)
    const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")
    const [heroPhase, setHeroPhase] = useState<"wave" | "typing" | "pausing" | "deleting">("wave")
    const [typedText, setTypedText] = useState("")
    const [reviewIndex, setReviewIndex] = useState(0)

    // ResizeObserver on wrapRef \u2014 reliable in Framer preview iframe
    useEffect(() => {
        const el = wrapRef.current
        if (!el) return
        const ro = new ResizeObserver(entries => {
            setViewportWidth(entries[0].contentRect.width)
        })
        ro.observe(el)
        setViewportWidth(el.getBoundingClientRect().width)
        return () => ro.disconnect()
    }, [])

    const isDark = colorMode === "dark"
    const isMobile = viewportWidth <= 640
    const isTablet = viewportWidth <= 900

    // Parse accent color \u2014 handles both "#818CF8" and "rgba(129,140,248,1)"
    const [ar, ag, ab] = (() => {
        const rgb = accentColor.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/)
        if (rgb) return [parseInt(rgb[1]), parseInt(rgb[2]), parseInt(rgb[3])]
        const hex = accentColor.replace("#", "").match(/^[0-9a-fA-F]{6}$/)
        if (hex) return (accentColor.replace("#", "").match(/../g) || []).map((h: string) => parseInt(h, 16))
        return [129, 140, 248]
    })()

    // -- Design tokens \u2014 mirrors DESIGN-TOKENS.md exactly -----------------
    const T = isDark
        ? {
              bg: "#0D0D0D",
              surface: "#141414",
              elevated: "#1C1C1E",
              border: "rgba(255,255,255,0.08)",
              borderStr: "rgba(255,255,255,0.16)",
              text: "#F5F5F5",
              muted: "#A3A3A3",
              disabled: "rgba(255,255,255,0.25)",
              accent: accentColor,
              accentDim: `rgba(${ar},${ag},${ab},0.12)`,
              accentTint: `rgba(${ar},${ag},${ab},0.04)`,
              accentBorder: `rgba(${ar},${ag},${ab},0.50)`,
              navBg: "rgba(13,13,13,0.88)",
              logoStroke: "rgba(255,255,255,0.22)",
              logoFill: "rgba(237,237,237,0.04)",
              // IMPROVEMENT 4: pricing tokens
              card: "#141414",
              cardHi: "#1C1C1E",
              borderHi: "rgba(255,255,255,0.18)",
              ghostBg: "rgba(255,255,255,0.05)",
              heading: "#EDEDED",
          }
        : {
              bg: "#F8F8FC",
              surface: "#FFFFFF",
              elevated: "#F0F0F8",
              border: "rgba(0,0,0,0.08)",
              borderStr: "rgba(0,0,0,0.16)",
              text: "#0D0D0D",
              muted: "#6B6B6B",
              disabled: "rgba(0,0,0,0.28)",
              accent: accentColor,
              accentDim: `rgba(${ar},${ag},${ab},0.12)`,
              accentTint: `rgba(${ar},${ag},${ab},0.05)`,
              accentBorder: `rgba(${ar},${ag},${ab},0.32)`,
              navBg: "rgba(248,248,252,0.90)",
              logoStroke: "rgba(0,0,0,0.20)",
              logoFill: "rgba(0,0,0,0.02)",
              // IMPROVEMENT 4: pricing tokens
              card: "#FFFFFF",
              cardHi: "#F0F0F8",
              borderHi: "rgba(0,0,0,0.16)",
              ghostBg: "rgba(0,0,0,0.04)",
              heading: "#0D0D0D",
          }

    // -- Font load ----------------------------------------------------------
    useEffect(() => {
        const id = "asl-geist"
        if (!document.getElementById(id)) {
            const link = document.createElement("link")
            link.id = id
            link.rel = "stylesheet"
            link.href = "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap"
            document.head.appendChild(link)
        }
    }, [])

    // -- CSS injection (re-runs when mode/accent changes) -------------------
    useEffect(() => {
        const id = "asl-styles"
        const existing = document.getElementById(id)
        if (existing) existing.remove()
        const ghostHover = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"
        const s = document.createElement("style")
        s.id = id
        s.textContent = `
            .asl-reveal { opacity: 0; transform: translateY(16px); transition: opacity 0.4s ease, transform 0.4s ease; }
            .asl-revealed { opacity: 1; transform: translateY(0); }
            @media (prefers-reduced-motion: reduce) { .asl-reveal, .asl-revealed { transition: none; opacity: 1; transform: none; } }
            .asl-nav-link { transition: color 0.12s; }
            .asl-nav-link:hover { color: ${T.text} !important; }
            .asl-btn-primary { transition: opacity 0.15s, transform 0.15s; }
            .asl-btn-primary:hover { opacity: 0.82; transform: translateY(-1px); }
            .asl-btn-ghost { transition: background 0.15s, border-color 0.15s; }
            .asl-btn-ghost:hover { background: ${ghostHover} !important; }
            .asl-feature-row { transition: opacity 0.3s ease; }
            .asl-carousel { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; gap: 16px; -ms-overflow-style: none; scrollbar-width: none; padding-bottom: 4px; }
            .asl-carousel::-webkit-scrollbar { display: none; }
            .asl-review-card { scroll-snap-align: start; flex-shrink: 0; }
            .asl-footer-link { transition: color 0.12s; }
            .asl-footer-link:hover { color: ${T.text} !important; }
            .asl-toggle-btn { transition: background 0.15s, color 0.15s; }

            /* IMPROVEMENT 5: glass badge border */
            .asl-badge {
                background: linear-gradient(#000, #000) padding-box,
                            linear-gradient(135deg, rgba(255,255,255,0.28), rgba(255,255,255,0.04), rgba(255,255,255,0.16)) border-box;
                border: 1px solid transparent;
                border-radius: 10px;
                display: inline-flex;
                align-items: center;
                gap: 10px;
                padding: 9px 16px;
                cursor: pointer;
                transition: transform 0.15s, box-shadow 0.15s;
            }
            .asl-badge:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 24px rgba(0,0,0,0.4);
            }

            /* IMPROVEMENT 4: pricing grid */
            .asl-mp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: ${T.border}; border: 1px solid ${T.border}; border-radius: 10px; overflow: hidden; }
            .asl-mp-card { background: ${T.card}; padding: 48px 40px 52px; display: flex; flex-direction: column; position: relative; }
            .asl-mp-card.featured { background: ${T.cardHi}; box-shadow: inset 0 2px 0 0 ${T.accent}; }
            .asl-mp-plan-name { font-size: 12px; font-weight: 500; letter-spacing: .06em; text-transform: uppercase; color: ${T.muted}; margin-bottom: 24px; }
            .asl-mp-card.featured .asl-mp-plan-name { color: ${T.accent}; }
            .asl-mp-price-row { display: flex; align-items: flex-end; gap: 4px; margin-bottom: 6px; }
            .asl-mp-price-num { font-size: 44px; font-weight: 500; letter-spacing: -.04em; line-height: 1; color: ${T.heading}; }
            .asl-mp-price-unit { font-size: 14px; font-weight: 400; color: ${T.muted}; margin-bottom: 9px; }
            .asl-mp-price-sub { font-size: 12px; color: ${T.muted}; margin-bottom: 32px; }
            .asl-mp-divider { height: 1px; background: ${T.border}; margin-bottom: 28px; }
            .asl-mp-feats { list-style: none; display: flex; flex-direction: column; gap: 12px; flex: 1; margin-bottom: 36px; padding: 0; }
            .asl-mp-feats li { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; font-weight: 400; color: ${T.text}; line-height: 1.4; }
            .asl-mp-feats li.dim { color: ${T.muted}; }
            .asl-mp-btn { display: block; width: 100%; padding: 10px 20px; border-radius: 4px; font-size: 13px; font-weight: 500; font-family: inherit; letter-spacing: -.01em; text-align: center; cursor: pointer; border: none; transition: opacity .12s, background .12s, border-color .12s; }
            .asl-mp-btn-outline { background: transparent; border: 1px solid ${T.borderHi}; color: ${T.text}; }
            .asl-mp-btn-outline:hover { border-color: ${T.text}; }
            .asl-mp-btn-primary { background: ${T.accent}; color: #000; }
            .asl-mp-btn-primary:hover { opacity: .88; }
            .asl-mp-toggle { display: flex; align-items: center; gap: 12px; justify-content: center; margin-bottom: 48px; }
            .asl-mp-toggle-label { font-size: 13px; font-weight: 400; color: ${T.muted}; cursor: pointer; transition: color .15s; }
            .asl-mp-toggle-label.active { color: ${T.text}; }
            .asl-mp-save { font-size: 11px; font-weight: 500; color: ${T.accent}; background: ${T.accentDim}; padding: 3px 8px; border-radius: 100px; }
            @media (max-width: 640px) { .asl-mp-grid { grid-template-columns: 1fr; } .asl-mp-card { padding: 32px 24px 36px; } }

            /* Screen animations */
            @keyframes asl-pulse { 0%, 100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 1; transform: scale(1.08); } }
            @keyframes asl-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

            /* Feature showcase tabs */
            @keyframes asl-feat-progress { from { width: 0%; } to { width: 100%; } }
            .asl-feat-tab { cursor: pointer; transition: opacity 0.2s; }
            .asl-feat-tab:hover { opacity: 1 !important; }
            .asl-feat-tab-num { font-family: 'Geist Mono', monospace; font-size: 11px; font-weight: 400; letter-spacing: 0.06em; }
            .asl-feat-progress-bar { height: 2px; background: ${T.accent}; border-radius: 2px; animation: asl-feat-progress 4s linear forwards; }
            .asl-feat-phone-wrap { transition: opacity 0.3s ease; }

            /* Voice waveform bars */
            @keyframes asl-wave { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(0.3); } }
            .asl-wave-bar { animation: asl-wave 1.3s ease-in-out infinite; transform-origin: center; }
            .asl-wave-bar-red { animation: asl-wave 1.3s ease-in-out infinite; transform-origin: center; }

            /* App compatibility marquee */
            @keyframes asl-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
            .asl-marquee-track { display: flex; align-items: center; gap: 40px; width: max-content; animation: asl-marquee 38s linear infinite; }

            /* Floating hero chips */
            @keyframes asl-float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-9px); } }
            .asl-float-chip { animation: asl-float 5.5s ease-in-out infinite; }

            /* Hero typing cursor */
            @keyframes asl-cursor-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
            .asl-hero-cursor { animation: asl-cursor-blink 0.7s step-end infinite; }
        `
        document.head.appendChild(s)
    }, [isDark, accentColor])

    // -- Scroll reveal IntersectionObserver ---------------------------------
    useEffect(() => {
        const container = wrapRef.current
        if (!container) return
        const observer = new IntersectionObserver(
            es => es.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add("asl-revealed")
                    observer.unobserve(e.target)
                }
            }),
            { threshold: 0.08, rootMargin: "0px 0px -32px 0px" }
        )
        const timer = setTimeout(() => {
            container.querySelectorAll(".asl-reveal").forEach(el => observer.observe(el))
        }, 60)
        return () => { clearTimeout(timer); observer.disconnect() }
    }, [])

    // Hero animation: waveform → cycling typewriter (type → pause → delete → next phrase)
    useEffect(() => {
        const PHRASES = [
            "Speak your thoughts.",
            "Refine in seconds.",
            "Send your message.",
        ]
        let stopped = false
        const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms))

        const run = async () => {
            await delay(1800)
            while (!stopped) {
                // Run all phrases in one cycle
                for (let p = 0; p < PHRASES.length; p++) {
                    if (stopped) return
                    const phrase = PHRASES[p]
                    setHeroPhase("typing")
                    for (let i = 1; i <= phrase.length; i++) {
                        if (stopped) return
                        setTypedText(phrase.slice(0, i))
                        await delay(52)
                    }
                    setHeroPhase("pausing")
                    await delay(1700)
                    if (stopped) return
                    setHeroPhase("deleting")
                    for (let i = phrase.length - 1; i >= 0; i--) {
                        if (stopped) return
                        setTypedText(phrase.slice(0, i))
                        await delay(26)
                    }
                    await delay(180)
                }
                // Full cycle complete — return to waveform for a beat before looping
                if (!stopped) {
                    setTypedText("")
                    setHeroPhase("wave")
                    await delay(2200)
                }
            }
        }

        run()
        return () => { stopped = true }
    }, [])

    // Auto-play feature showcase: advances every 4 s, resets on manual selection
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveFeature(prev => (prev + 1) % FEATURES.length)
            setProgressKey(prev => prev + 1)
        }, 4000)
        return () => clearInterval(timer)
    }, [activeFeature])

    const selectFeature = (idx: number) => {
        setActiveFeature(idx)
        setProgressKey(prev => prev + 1)
    }

    // -- Layout constants --------------------------------------------------
    const MAX_W = "1440px"
    const PAD_X = "40px"
    const SEC_V = "96px"
    const wrap: React.CSSProperties = { maxWidth: MAX_W, margin: "0 auto", padding: isMobile ? "0 20px" : `0 ${PAD_X}` }
    const section: React.CSSProperties = { padding: `${SEC_V} 0` }

    // -- Shared style objects ----------------------------------------------
    const btnPrimary: React.CSSProperties = {
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        padding: "10px 22px", borderRadius: "6px",
        fontSize: "13px", fontWeight: 500, fontFamily: "inherit",
        background: T.accent, color: "#000",
        border: "none", cursor: "pointer", textDecoration: "none",
        whiteSpace: "nowrap",
    }
    const btnGhost: React.CSSProperties = {
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        padding: "10px 22px", borderRadius: "6px",
        fontSize: "13px", fontWeight: 500, fontFamily: "inherit",
        background: "transparent", color: T.text,
        border: `1px solid ${T.borderStr}`, cursor: "pointer",
        textDecoration: "none", whiteSpace: "nowrap",
    }
    const h2Style: React.CSSProperties = {
        fontSize: "clamp(24px, 2.8vw, 34px)", fontWeight: 400,
        letterSpacing: "-0.03em", color: T.text, lineHeight: 1.15, margin: 0,
    }

    // -- SVG components ---------------------------------------------------
    const LogoMark = ({ size = 20 }: { size?: number }) => (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
            <path
                d="M10 2 L11.5 8.5 L18 10 L11.5 11.5 L10 18 L8.5 11.5 L2 10 L8.5 8.5 Z"
                stroke={T.accent}
                strokeWidth="1.25"
                fill={T.accentTint}
                strokeLinejoin="round"
            />
            <circle cx="10" cy="10" r="2" fill={T.accent} fillOpacity="0.4" />
        </svg>
    )

    const StarIcon = ({ filled = true, size = 12 }: { filled?: boolean; size?: number }) => (
        <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
            <path
                d="M6 1L7.3 4.6H11.1L8.1 6.8L9.2 10.4L6 8.2L2.8 10.4L3.9 6.8L0.9 4.6H4.7Z"
                fill={filled ? T.accent : T.disabled}
            />
        </svg>
    )

    // IMPROVEMENT 4: Check component matching saas-pricing-page-v1
    const Check = () => (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
            stroke={T.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ flexShrink: 0, marginTop: 1 }}>
            <polyline points="20 6 9 17 4 12" />
        </svg>
    )

    // -- Store badges (filtered by prop) -----------------------------------
    const Badges = () => (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
            {(platformBadges === "both" || platformBadges === "ios") && <AppStoreBadge />}
            {(platformBadges === "both" || platformBadges === "android") && <GooglePlayBadge />}
        </div>
    )

    // Shared phone token props
    const phoneTokens = {
        accent: T.accent,
        accentDim: T.accentDim,
        surface: T.surface,
        elevated: T.elevated,
        border: T.border,
        muted: T.muted,
        text: T.text,
    }

    // ======================================================================
    return (
        <div
            ref={wrapRef}
            style={{
                fontFamily: "'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                background: T.bg,
                color: T.text,
                minWidth: "320px",
                overflowX: "hidden",
            }}
        >

            {/* ====== NAV ================================================ */}
            <nav style={{
                position: "sticky",
                top: 0,
                zIndex: 100,
                height: "56px",
                background: T.navBg,
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderBottom: `1px solid ${T.border}`,
                display: "flex",
                alignItems: "center",
            }}>
                <div style={{
                    ...wrap,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    gap: "24px",
                }}>
                    {/* Logo */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <LogoMark size={18} />
                        <span style={{ fontSize: "14px", fontWeight: 500, color: T.text, letterSpacing: "-0.01em" }}>
                            {appName}
                        </span>
                    </div>
                    {/* Nav links (desktop) */}
                    {!isMobile && (
                        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
                            {["Features", "Reviews", "Pricing"].map(link => (
                                <a
                                    key={link}
                                    href={`#asl-${link.toLowerCase()}`}
                                    className="asl-nav-link"
                                    style={{ fontSize: "13px", color: T.muted, textDecoration: "none", cursor: "pointer" }}
                                >
                                    {link}
                                </a>
                            ))}
                        </div>
                    )}
                    {/* CTA */}
                    <button className="asl-btn-primary" style={{ ...btnPrimary, height: "32px", padding: "0 16px" }}>
                        Download free
                    </button>
                </div>
            </nav>

            {/* ====== HERO — centered, voice-to-text animation ============ */}
            {/*
             * Centered layout — no phone in hero.
             * Phase 1 (0–1.8s): large animated waveform bars fill the headline space.
             * Phase 2 (1.8s+): waveform fades, headline types out character by character.
             * Floating "thought fragment" chips orbit the periphery on desktop.
             * Background radial glow behind everything.
             */}
            <section id="asl-hero" style={{
                position: "relative",
                padding: isMobile ? "80px 0 72px" : "120px 0 104px",
                overflow: "hidden",
                textAlign: "center",
            }}>
                {/* Background radial glow */}
                <div style={{
                    position: "absolute",
                    top: "35%", left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "700px", height: "700px",
                    borderRadius: "50%",
                    background: `radial-gradient(circle at center, ${T.accentTint} 0%, transparent 65%)`,
                    pointerEvents: "none",
                    zIndex: 0,
                }} />

                {/* Floating chips — elliptical ring centered in the hero */}
                {/*
                 * Positioned using calc(50% ± Xpx) so they orbit the centered
                 * content rather than hugging the page edges. Forms a loose oval
                 * that draws the eye toward the headline.
                 */}
                {!isMobile && ([
                    // Top arc
                    { text: "meeting notes\u2026",    top: "8%",  left: "calc(50% - 340px)" },
                    { text: "project brief\u2026",    top: "8%",  left: "calc(50% + 170px)" },
                    // Upper-middle
                    { text: "follow-up email\u2026",  top: "32%", left: "calc(50% - 420px)" },
                    { text: "investor memo\u2026",    top: "32%", left: "calc(50% + 260px)" },
                    // Lower-middle
                    { text: "Q3 summary\u2026",       top: "60%", left: "calc(50% - 400px)" },
                    { text: "weekly report\u2026",    top: "60%", left: "calc(50% + 240px)" },
                    // Bottom arc
                    { text: "team standup\u2026",     top: "84%", left: "calc(50% - 310px)" },
                    { text: "product update\u2026",   top: "84%", left: "calc(50% + 130px)" },
                ] as Array<{ text: string; top: string; left: string }>).map((chip, i) => (
                    <div
                        key={i}
                        className="asl-float-chip"
                        style={{
                            position: "absolute",
                            top: chip.top,
                            left: chip.left,
                            background: T.surface,
                            border: `1px solid ${T.border}`,
                            borderRadius: "99px",
                            padding: "5px 12px",
                            fontSize: "11px",
                            color: T.disabled,
                            fontFamily: "inherit",
                            whiteSpace: "nowrap",
                            animationDelay: `${i * 0.55}s`,
                            zIndex: 0,
                            pointerEvents: "none",
                        }}
                    >
                        {chip.text}
                    </div>
                ))}

                <div style={{ ...wrap, position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>

                    {/* Animation area: fixed height, waveform layer ↔ headline layer */}
                    <div style={{
                        position: "relative",
                        width: "100%",
                        height: isMobile ? "160px" : "220px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "18px",
                    }}>
                        {/* Layer 1: Large waveform — full opacity during wave phase, dims but stays visible behind text */}
                        <div style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: isMobile ? "4px" : "6px",
                            opacity: heroPhase === "wave" ? 1 : 0.18,
                            transition: "opacity 0.6s ease",
                            pointerEvents: "none",
                        }}>
                            {[26, 44, 60, 36, 76, 50, 88, 62, 72, 40, 56, 80, 46, 30, 60, 44, 68, 36, 50].map((h, i) => (
                                <div
                                    key={i}
                                    className="asl-wave-bar"
                                    style={{
                                        width: isMobile ? "4px" : "5px",
                                        height: isMobile ? `${Math.round(h * 0.6)}px` : `${h}px`,
                                        borderRadius: "99px",
                                        background: T.accent,
                                        opacity: 0.7,
                                        animationDelay: `${i * 0.07}s`,
                                    }}
                                />
                            ))}
                        </div>

                        {/* Layer 2: Typed headline — visible after wave phase */}
                        <div style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: heroPhase !== "wave" ? 1 : 0,
                            transition: "opacity 0.4s ease",
                        }}>
                            <h1 style={{
                                fontSize: isMobile ? "clamp(36px, 9vw, 52px)" : "clamp(48px, 6.5vw, 80px)",
                                fontWeight: 400,
                                letterSpacing: "-0.04em",
                                lineHeight: 1.06,
                                color: T.text,
                                margin: 0,
                                whiteSpace: "pre-line",
                                textAlign: "center",
                            }}>
                                {typedText}
                                {(heroPhase === "typing" || heroPhase === "pausing" || heroPhase === "deleting") && (
                                    <span className="asl-hero-cursor" style={{
                                        display: "inline-block",
                                        width: isMobile ? "2px" : "3px",
                                        height: "0.82em",
                                        background: T.accent,
                                        marginLeft: "3px",
                                        verticalAlign: "middle",
                                        borderRadius: "1px",
                                    }} />
                                )}
                            </h1>
                        </div>
                    </div>

                    {/* Subhead */}
                    <p style={{
                        fontSize: "16px",
                        color: T.muted,
                        lineHeight: 1.65,
                        maxWidth: "480px",
                        margin: "0 0 28px",
                        textAlign: "center",
                    }}>
                        Speak your thoughts. {appName} transcribes, polishes, and formats in real time. Used by 50,000+ writers, founders, and teams.
                    </p>

                    {/* Store badges — centered */}
                    <div style={{ marginBottom: "20px" }}>
                        <Badges />
                    </div>

                    {/* Social proof */}
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <div style={{ display: "flex", gap: "2px" }}>
                            {[0, 1, 2, 3, 4].map(i => <StarIcon key={i} filled size={12} />)}
                        </div>
                        <span style={{ fontSize: "12px", color: T.muted }}>
                            4.8{"\u00B7"}12,000+ ratings
                        </span>
                    </div>
                </div>
            </section>

            {/* ====== WORKS EVERYWHERE MARQUEE ============================ */}
            <section style={{
                padding: "36px 0",
                borderTop: `1px solid ${T.border}`,
                borderBottom: `1px solid ${T.border}`,
                overflow: "hidden",
            }}>
                <p style={{
                    textAlign: "center",
                    fontSize: "11px",
                    fontWeight: 500,
                    color: T.disabled,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    margin: "0 0 20px",
                }}>
                    Works in every app you already use
                </p>
                <div style={{
                    overflow: "hidden",
                    WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                    maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                }}>
                    <div className="asl-marquee-track">
                        {[...APPS, ...APPS].map((app, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                                <img
                                    src={`https://cdn.simpleicons.org/${app.slug}/${isDark ? "888888" : "777777"}`}
                                    alt={app.name}
                                    width={15}
                                    height={15}
                                    style={{ opacity: isDark ? 0.5 : 0.45, flexShrink: 0 }}
                                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
                                />
                                <span style={{ fontSize: "13px", color: T.muted, whiteSpace: "nowrap", fontFamily: "inherit" }}>
                                    {app.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====== FEATURE SHOWCASE ===================================== */}
            {/*
             * Auto-play tabbed layout (Linear / Vercel / Superhuman pattern).
             * Phone left, numbered tab list right. Advances every 4 s.
             * Clicking a tab manually selects + resets timer.
             */}
            <section id="asl-features" style={{ padding: `${SEC_V} 0`, background: T.bg }}>
                <div style={{ ...wrap }}>
                    {/* Section heading */}
                    <h2 className="asl-reveal" style={{
                        fontSize: "clamp(24px, 3vw, 36px)",
                        fontWeight: 400,
                        letterSpacing: "-0.03em",
                        color: T.text,
                        marginBottom: "64px",
                        lineHeight: 1.2,
                    }}>
                        Built for how you actually write.
                    </h2>

                    {/* Two-column: phone left, tabs right */}
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                        gap: isMobile ? "40px" : "80px",
                        alignItems: "center",
                    }}>
                        {/* Left: Phone */}
                        <div className="asl-feat-phone-wrap" style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <PhoneMockup screenContent={activeFeature} size="large" {...phoneTokens} />
                        </div>

                        {/* Right: Numbered tab list */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
                            {FEATURES.map((feat, idx) => {
                                const isActive = activeFeature === idx
                                return (
                                    <div
                                        key={idx}
                                        className="asl-feat-tab"
                                        onClick={() => selectFeature(idx)}
                                        style={{
                                            padding: "20px 0",
                                            borderBottom: `1px solid ${T.border}`,
                                            opacity: isActive ? 1 : 0.45,
                                        }}
                                    >
                                        {/* Number + Title row */}
                                        <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: isActive ? "10px" : "0" }}>
                                            <span className="asl-feat-tab-num" style={{ color: T.muted }}>
                                                {String(idx + 1).padStart(2, "0")}
                                            </span>
                                            <span style={{
                                                fontSize: "17px",
                                                fontWeight: isActive ? 500 : 400,
                                                color: isActive ? T.text : T.muted,
                                                letterSpacing: "-0.01em",
                                                lineHeight: 1.3,
                                                transition: "color 0.2s, font-weight 0.2s",
                                            }}>
                                                {feat.title}
                                            </span>
                                        </div>

                                        {/* Description — only visible when active */}
                                        {isActive && (
                                            <div style={{
                                                fontSize: "14px",
                                                color: T.muted,
                                                lineHeight: 1.6,
                                                marginLeft: "32px",
                                                marginBottom: "14px",
                                                maxWidth: "360px",
                                            }}>
                                                {feat.description}
                                            </div>
                                        )}

                                        {/* Progress bar — only on active, remounts via key */}
                                        {isActive && (
                                            <div style={{ marginLeft: "32px", height: "2px", background: T.border, borderRadius: "2px", overflow: "hidden" }}>
                                                <div key={progressKey} className="asl-feat-progress-bar" />
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ====== BEFORE / AFTER TRANSFORMATION ====================== */}
            {/*
             * Wispr Flow-inspired: show the transformation, not the UI.
             * Raw voice dictation left → polished Nova output right.
             * Far more compelling than static phone screenshots.
             */}
            <section style={{ padding: `${SEC_V} 0`, background: T.surface }}>
                <div style={wrap}>
                    <div className="asl-reveal" style={{ maxWidth: "600px", marginBottom: "52px" }}>
                        <h2 style={{ ...h2Style, marginBottom: "14px" }}>
                            Raw idea to polished writing in seconds.
                        </h2>
                        <p style={{ fontSize: "15px", color: T.muted, lineHeight: 1.65, margin: 0 }}>
                            Dictate naturally. {appName} transcribes, removes filler words, and structures your writing automatically.
                        </p>
                    </div>

                    {/* Before / After card */}
                    <div className="asl-reveal" style={{
                        display: "grid",
                        gridTemplateColumns: isMobile ? "1fr" : "1fr auto 1fr",
                        alignItems: "stretch",
                        border: `1px solid ${T.border}`,
                        borderRadius: "16px",
                        overflow: "hidden",
                        background: T.bg,
                    }}>
                        {/* Left: raw voice input */}
                        <div style={{ padding: isMobile ? "28px 24px" : "36px 40px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "20px" }}>
                                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#F97316" }} />
                                <span style={{ fontSize: "10px", fontWeight: 500, color: T.muted, letterSpacing: "0.10em", textTransform: "uppercase" }}>
                                    Voice Input
                                </span>
                            </div>
                            <p style={{ fontSize: "14px", color: T.muted, lineHeight: 1.85, margin: "0 0 20px", fontStyle: "italic" }}>
                                {"\u201C"}um so I wanted to talk about the Q3 results, they were actually like really good, uh revenue was up like 30-something percent and like the team did amazing work, I think we should probably mention it to everyone, or at least celebrate it somehow{"\u2026"}{"\u201D"}
                            </p>
                            {/* Animated red waveform */}
                            <div style={{ display: "flex", alignItems: "center", gap: "3px", height: "20px" }}>
                                {[5, 9, 14, 7, 18, 11, 22, 13, 9, 16, 7, 12].map((h, i) => (
                                    <div
                                        key={i}
                                        className="asl-wave-bar"
                                        style={{
                                            width: "2px",
                                            height: `${h}px`,
                                            borderRadius: "99px",
                                            background: "#F97316",
                                            opacity: 0.45,
                                            animationDelay: `${i * 0.09}s`,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Center divider arrow */}
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: isMobile ? "0 24px 24px" : "0 28px",
                            gap: "6px",
                        }}>
                            <div style={{
                                width: 36,
                                height: 36,
                                borderRadius: "50%",
                                background: T.accentDim,
                                border: `1px solid ${T.accentBorder}`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                            }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    {isMobile
                                        ? <><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></>
                                        : <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>
                                    }
                                </svg>
                            </div>
                            <span style={{ fontSize: "9px", color: T.accent, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>AI</span>
                        </div>

                        {/* Right: Nova polished output */}
                        <div style={{
                            padding: isMobile ? "0 24px 28px" : "36px 40px",
                            background: T.accentTint,
                            borderLeft: isMobile ? "none" : `1px solid ${T.border}`,
                            borderTop: isMobile ? `1px solid ${T.border}` : "none",
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "20px" }}>
                                <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.accent }} />
                                <span style={{ fontSize: "10px", fontWeight: 500, color: T.accent, letterSpacing: "0.10em", textTransform: "uppercase" }}>
                                    {appName} Output
                                </span>
                            </div>
                            <p style={{ fontSize: "14px", color: T.text, lineHeight: 1.85, margin: "0 0 20px" }}>
                                {"\u201C"}Q3 exceeded expectations. Revenue grew 34% quarter-over-quarter, driven by strong execution across the team. This is worth celebrating {"\u2014"} both publicly and internally. I{"\u2019"}ll share the full breakdown in today{"\u2019"}s all-hands.{"\u201D"}
                            </p>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span style={{ fontSize: "11px", color: T.muted }}>Punctuation, tone, and structure applied</span>
                            </div>
                        </div>
                    </div>

                    {/* Speed stat strip */}
                    <div className="asl-reveal" style={{
                        display: "flex",
                        gap: isMobile ? "32px" : "96px",
                        justifyContent: "center",
                        marginTop: "56px",
                        flexWrap: "wrap",
                    }}>
                        {[
                            { stat: "4\u00D7 faster", label: "than typing" },
                            { stat: "220 wpm", label: "avg. dictation speed" },
                            { stat: "45 wpm", label: "avg. typing speed" },
                        ].map((item, i) => (
                            <div key={i} style={{ textAlign: "center" }}>
                                <div style={{ fontSize: "clamp(20px, 2.4vw, 28px)", fontWeight: 500, color: T.text, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                                    {item.stat}
                                </div>
                                <div style={{ fontSize: "12px", color: T.muted, marginTop: "5px" }}>{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====== REVIEWS — single quote left, 4.8 rating block right === */}
            {/*
             * Desktop: two-column grid.
             *   Left (60%): section title + single quote carousel + arrows + dots
             *   Right (40%): large 4.8 rating card — balances the left visually
             * Mobile: stacked.
             */}
            <section id="asl-reviews" style={section}>
                <div style={wrap}>
                    <div className="asl-reveal" style={{
                        display: "grid",
                        gridTemplateColumns: isTablet ? "1fr" : "1fr 340px",
                        gap: isTablet ? "56px" : "72px",
                        alignItems: "start",
                    }}>
                        {/* Left: title + quote carousel */}
                        <div>
                            <h2 style={{ ...h2Style, marginBottom: "48px" }}>Loved by writers.</h2>

                            {/* Quote + arrow row */}
                            <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
                                {/* Left arrow */}
                                <button
                                    onClick={() => setReviewIndex((reviewIndex + REVIEWS.length - 1) % REVIEWS.length)}
                                    style={{
                                        flexShrink: 0,
                                        marginTop: "4px",
                                        width: 36, height: 36,
                                        borderRadius: "50%",
                                        border: `1px solid ${T.border}`,
                                        background: "transparent",
                                        color: T.muted,
                                        cursor: "pointer",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        transition: "border-color 0.15s, color 0.15s",
                                    }}
                                    className="asl-btn-ghost"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="15 18 9 12 15 6" />
                                    </svg>
                                </button>

                                {/* Review content — no card, editorial quote */}
                                <div style={{ flex: 1 }}>
                                    <p style={{
                                        fontSize: isMobile ? "17px" : "20px",
                                        fontWeight: 400,
                                        color: T.text,
                                        lineHeight: 1.65,
                                        margin: "0 0 28px",
                                        letterSpacing: "-0.01em",
                                    }}>
                                        {"\u201C"}{REVIEWS[reviewIndex].text}{"\u201D"}
                                    </p>
                                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                        <div style={{
                                            width: 40, height: 40,
                                            borderRadius: "50%",
                                            background: T.accentDim,
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            flexShrink: 0,
                                        }}>
                                            <span style={{ fontSize: "14px", fontWeight: 500, color: T.accent }}>
                                                {REVIEWS[reviewIndex].name.charAt(0)}
                                            </span>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontSize: "13px", fontWeight: 500, color: T.text, margin: 0 }}>
                                                {REVIEWS[reviewIndex].name}
                                            </p>
                                            <p style={{ fontSize: "12px", color: T.muted, margin: "2px 0 0" }}>
                                                {REVIEWS[reviewIndex].handle}
                                            </p>
                                        </div>
                                        <div style={{ display: "flex", gap: "3px" }}>
                                            {[0, 1, 2, 3, 4].map(s => <StarIcon key={s} filled size={13} />)}
                                        </div>
                                    </div>
                                </div>

                                {/* Right arrow */}
                                <button
                                    onClick={() => setReviewIndex((reviewIndex + 1) % REVIEWS.length)}
                                    style={{
                                        flexShrink: 0,
                                        marginTop: "4px",
                                        width: 36, height: 36,
                                        borderRadius: "50%",
                                        border: `1px solid ${T.border}`,
                                        background: "transparent",
                                        color: T.muted,
                                        cursor: "pointer",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        transition: "border-color 0.15s, color 0.15s",
                                    }}
                                    className="asl-btn-ghost"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </button>
                            </div>

                            {/* Dot indicators */}
                            <div style={{ display: "flex", gap: "7px", marginTop: "36px", marginLeft: "56px" }}>
                                {REVIEWS.map((_, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setReviewIndex(i)}
                                        style={{
                                            width: i === reviewIndex ? "22px" : "6px",
                                            height: "6px",
                                            borderRadius: "99px",
                                            background: i === reviewIndex ? T.accent : T.border,
                                            cursor: "pointer",
                                            transition: "width 0.25s ease, background 0.25s ease",
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Right / below: large 4.8 rating block — same on all screen sizes, stacks on mobile */}
                        <div style={{
                            borderLeft: isTablet ? "none" : `2px solid ${T.accentBorder}`,
                            borderTop: isTablet ? `2px solid ${T.accentBorder}` : "none",
                            paddingLeft: isTablet ? "0" : "32px",
                            paddingTop: isTablet ? "32px" : "0",
                            display: "flex",
                            flexDirection: "column",
                        }}>
                            {/* Large rating number */}
                            <div style={{
                                fontSize: "72px",
                                fontWeight: 500,
                                letterSpacing: "-0.05em",
                                lineHeight: 1,
                                color: T.text,
                                marginBottom: "14px",
                            }}>
                                4.8
                            </div>
                            {/* Stars */}
                            <div style={{ display: "flex", gap: "4px", marginBottom: "10px" }}>
                                {[0, 1, 2, 3, 4].map(s => <StarIcon key={s} filled size={16} />)}
                            </div>
                            <span style={{ fontSize: "12px", color: T.muted, marginBottom: "32px", letterSpacing: "0.02em" }}>
                                App Store Rating
                            </span>
                            {/* Divider */}
                            <div style={{ height: "1px", background: T.border, marginBottom: "28px" }} />
                            {/* Secondary stats grid */}
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                                {[
                                    { num: "12K+", label: "ratings" },
                                    { num: "4.7", label: "on Google Play" },
                                    { num: "140+", label: "countries" },
                                    { num: "#1", label: "in Productivity" },
                                ].map((stat, i) => (
                                    <div key={i}>
                                        <div style={{ fontSize: "22px", fontWeight: 500, color: T.text, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                                            {stat.num}
                                        </div>
                                        <div style={{ fontSize: "11px", color: T.muted, marginTop: "4px" }}>
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ====== PRICING (IMPROVEMENT 4) ============================ */}
            {/*
             * Matches saas-pricing-page-v1 exactly:
             * 1px-gap grid, inset accent top bar on featured, billing toggle
             */}
            <section id="asl-pricing" style={{ padding: `${SEC_V} 0`, background: T.surface }}>
                <div style={wrap}>
                    <div className="asl-reveal" style={{ textAlign: "center", marginBottom: "16px" }}>
                        <h2 style={h2Style}>Simple pricing.</h2>
                        <p style={{ fontSize: "16px", color: T.muted, marginTop: "12px", marginBottom: "40px" }}>
                            Free to start. Upgrade when you{"\u2019"}re ready.
                        </p>
                    </div>

                    {/* Billing toggle */}
                    <div className="asl-mp-toggle asl-reveal">
                        <span
                            className={`asl-mp-toggle-label${billingCycle === "monthly" ? " active" : ""}`}
                            onClick={() => setBillingCycle("monthly")}
                        >
                            Monthly
                        </span>
                        <div
                            style={{
                                position: "relative",
                                width: "36px",
                                height: "20px",
                                borderRadius: "100px",
                                background: T.borderHi,
                                cursor: "pointer",
                                flexShrink: 0,
                            }}
                            onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
                        >
                            <div style={{
                                position: "absolute",
                                top: "4px",
                                left: billingCycle === "annual" ? "16px" : "4px",
                                width: "12px",
                                height: "12px",
                                borderRadius: "50%",
                                background: billingCycle === "annual" ? T.accent : T.muted,
                                transition: "left .2s, background .2s",
                            }} />
                        </div>
                        <span
                            className={`asl-mp-toggle-label${billingCycle === "annual" ? " active" : ""}`}
                            onClick={() => setBillingCycle("annual")}
                        >
                            Annual
                        </span>
                        {billingCycle === "annual" && <span className="asl-mp-save">Save 33%</span>}
                    </div>

                    {/* Cards grid */}
                    <div className="asl-mp-grid asl-reveal">
                        {/* Free */}
                        <div className="asl-mp-card">
                            <div className="asl-mp-plan-name">Free</div>
                            <div className="asl-mp-price-row">
                                <span className="asl-mp-price-num">$0</span>
                            </div>
                            <div className="asl-mp-price-sub">Always free. No credit card required.</div>
                            <div className="asl-mp-divider" />
                            <ul className="asl-mp-feats">
                                {[
                                    "10 AI-assisted drafts per month",
                                    "Voice to text (5 min/day)",
                                    "PDF, Word, Plain text export",
                                    "2 devices",
                                    "Community support",
                                    "500MB storage",
                                ].map(f => (
                                    <li key={f}><Check />{f}</li>
                                ))}
                            </ul>
                            <button className="asl-mp-btn asl-mp-btn-outline">Download free</button>
                        </div>

                        {/* Pro */}
                        <div className="asl-mp-card featured">
                            <div className="asl-mp-plan-name">Pro</div>
                            <div className="asl-mp-price-row">
                                <span className="asl-mp-price-num">
                                    {billingCycle === "monthly" ? "$4.99" : "$3.33"}
                                </span>
                                <span className="asl-mp-price-unit">/mo</span>
                            </div>
                            <div className="asl-mp-price-sub">
                                {billingCycle === "annual" ? "Billed $39.99/yr \u00B7 " : ""}7-day free trial. Cancel anytime.
                            </div>
                            <div className="asl-mp-divider" />
                            <ul className="asl-mp-feats">
                                {[
                                    "Unlimited AI-assisted drafts",
                                    "Unlimited voice to text",
                                    "All export formats + Notion, Markdown",
                                    "Unlimited devices",
                                    "Priority support",
                                    "10GB storage",
                                    "Custom writing styles",
                                    "Offline mode",
                                ].map(f => (
                                    <li key={f}><Check />{f}</li>
                                ))}
                            </ul>
                            <button className="asl-mp-btn asl-mp-btn-primary">Start free trial</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ====== FINAL CTA BANNER =================================== */}
            <section style={{ padding: "104px 0" }}>
                <div style={{ ...wrap, textAlign: "center" }}>
                    <h2
                        className="asl-reveal"
                        style={{
                            fontSize: "clamp(28px, 4vw, 52px)",
                            fontWeight: 400,
                            letterSpacing: "-0.04em",
                            lineHeight: 1.1,
                            color: T.text,
                            marginBottom: "20px",
                        }}
                    >
                        Your best writing starts here.
                    </h2>
                    <p className="asl-reveal" style={{
                        fontSize: "16px",
                        color: T.muted,
                        maxWidth: "480px",
                        margin: "0 auto 36px",
                        lineHeight: 1.65,
                    }}>
                        Join 50,000+ writers using {appName} to write faster, clearer, and more confidently.
                    </p>
                    <div className="asl-reveal" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
                        <Badges />
                    </div>
                    <p className="asl-reveal" style={{ fontSize: "12px", color: T.disabled }}>
                        No credit card required {"\u00B7"} Free to start {"\u00B7"} Cancel anytime
                    </p>
                </div>
            </section>

            {/* ====== FOOTER ============================================= */}
            <footer style={{ borderTop: `1px solid ${T.border}`, padding: "28px 0" }}>
                <div style={{
                    maxWidth: MAX_W,
                    margin: "0 auto",
                    padding: isMobile ? "0 20px" : `0 ${PAD_X}`,
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "auto 1fr auto",
                    alignItems: "center",
                    gap: isMobile ? "12px" : "24px",
                    textAlign: isMobile ? "center" : undefined,
                }}>
                    {/* Logo */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: isMobile ? "center" : undefined }}>
                        <LogoMark size={16} />
                        <span style={{ fontSize: "13px", fontWeight: 500, color: T.muted }}>{appName}</span>
                    </div>
                    {/* Copyright */}
                    <span style={{ fontSize: "12px", color: T.disabled, textAlign: "center" }}>
                        {"\u00A9"} 2026 {appName}. All rights reserved.
                    </span>
                    {/* Footer links */}
                    <div style={{ display: "flex", gap: "20px", justifyContent: isMobile ? "center" : undefined }}>
                        {["Privacy", "Terms", "Support", "Press"].map(link => (
                            <a
                                key={link}
                                href="#"
                                className="asl-footer-link"
                                style={{ fontSize: "12px", color: T.disabled, textDecoration: "none" }}
                            >
                                {link}
                            </a>
                        ))}
                    </div>
                </div>
            </footer>

        </div>
    )
}

// -- Framer Property Controls -----------------------------------------------
addPropertyControls(AppStoreLaunchPage, {
    colorMode: {
        type: ControlType.Enum,
        title: "Color Mode",
        options: ["dark", "light"],
        optionTitles: ["Dark", "Light"],
        defaultValue: "dark",
    },
    accentColor: {
        type: ControlType.Color,
        title: "Accent Color",
        defaultValue: "#818CF8",
    },
    appName: {
        type: ControlType.String,
        title: "App Name",
        defaultValue: "Nova",
        placeholder: "Your app name",
    },
    platformBadges: {
        type: ControlType.Enum,
        title: "Platform Badges",
        options: ["both", "ios", "android"],
        optionTitles: ["Both", "iOS only", "Android only"],
        defaultValue: "both",
    },
})
