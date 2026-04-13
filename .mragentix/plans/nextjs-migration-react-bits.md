# MR Agentix Website — Next.js + React Bits Migration Plan

## Overview
Migrate the current static HTML/CSS/JS site (`index.html`, `styles.css`, `main.js`) to a **Next.js 15 + TypeScript + Tailwind CSS v4** app, then layer in **React Bits** animated components for a cutting-edge feel.

## Current Site Structure (1 page, 9 sections)
1. **Nav** — fixed header, mobile hamburger, scroll-aware
2. **Hero** — title, subtitle, CTAs, trust bar, terminal animation
3. **Proof Bar** — 5 stats (47+, 13, 3, 4, St. Louis → Nationwide)
4. **Services** — 6 expandable cards (3-col grid, featured card spans 2)
5. **How It Works** — 4-step zigzag timeline
6. **Tech Stack** — grouped pills (AI, Backend, Frontend, Infra, Open Source)
7. **Projects** — 1 featured + 2 supporting project cards
8. **Open Source** — terminal, stats, bento grid (11 features), install widget, packages
9. **Results** — 3 testimonial cards + credentials bar
10. **Contact** — form + info card
11. **Footer** — tagline, nav, domain

## Design System (preserve from current site)
- **Colors**: `--bg-base: #0d1117`, `--accent: #00e5a0` (GitHub Dark + green terminal)
- **Fonts**: DM Sans (sans), JetBrains Mono (mono)
- **Radius**: 8px
- **Dark theme only** (no light mode needed)

---

## React Bits Components to Use

### 🎯 High-Impact Picks (these will make the biggest visual difference)

| Component | Where | Why |
|-----------|-------|-----|
| **Aurora** (Background) | Hero section behind content | Animated aurora glow replaces static radial gradients — fits the dark theme perfectly |
| **DecryptedText** (Text) | Hero title "We Build the Agents That Do the Work" | Hacker/terminal decrypt effect matches the brand identity |
| **BlurText** (Text) | Hero subtitle | Smooth blur-in word reveal for supporting copy |
| **CountUp** (Text) | Proof bar numbers (47+, 13, 3, 4) | Numbers counting up on scroll — classic social proof pattern |
| **SplitText** (Text) | Section titles ("What We Build", "Your Automation Goes Live", etc.) | Scroll-triggered letter/word split reveal |
| **AnimatedContent** (Animation) | Every section wrapper | Scroll-triggered fade/slide-in replaces current `data-animate` JS |
| **SpotlightCard** (Component) | Service cards | Mouse-following spotlight effect on hover — replaces basic hover |
| **TiltedCard** (Component) | Project cards | 3D tilt on hover for project showcases |
| **StarBorder** (Animation) | Primary CTA buttons | Animated star-trail border around "Book a Free Discovery Call" |
| **ClickSpark** (Animation) | Wrap entire page | Spark particles on every click — delightful micro-interaction |
| **GlitchText** (Text) | Logo "MR Agentix_" in nav | Occasional glitch effect on the brand name |
| **ScrollVelocity** (Text) | Tech stack section | Infinite scrolling marquee of tech logos/names |

### 🎨 Optional Extras (if it doesn't bloat)
- **Magnet** — nav links that magnetize to cursor
- **Noise** — subtle film grain overlay on hero
- **Ribbons** — flowing ribbon animation in testimonials section background
- **GradientText** — accent gradient on key words

---

## Tech Stack for New Site

```
Next.js 15 (App Router)
TypeScript
Tailwind CSS v4
motion (framer-motion successor — required by React Bits)
React Bits (copy-paste TS-TW components)
```

### Dependencies
```json
{
  "next": "^15",
  "react": "^19",
  "react-dom": "^19",
  "motion": "^12",
  "tailwindcss": "^4",
  "@tailwindcss/vite": "^4",
  "clsx": "^2",
  "tailwind-merge": "^3"
}
```

> **Note**: React Bits components are copy-pasted, not installed as a package. We only need their runtime deps (`motion` mainly, `gsap` only if we use GSAP-based components).

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (fonts, metadata, global styles)
│   ├── page.tsx            # Home page — assembles all sections
│   └── globals.css         # Tailwind imports + CSS custom properties
├── components/
│   ├── ui/                 # React Bits components (copied in)
│   │   ├── aurora.tsx
│   │   ├── decrypted-text.tsx
│   │   ├── blur-text.tsx
│   │   ├── count-up.tsx
│   │   ├── split-text.tsx
│   │   ├── animated-content.tsx
│   │   ├── spotlight-card.tsx
│   │   ├── tilted-card.tsx
│   │   ├── star-border.tsx
│   │   ├── click-spark.tsx
│   │   ├── glitch-text.tsx
│   │   └── scroll-velocity.tsx
│   ├── nav.tsx             # Navigation (client component)
│   ├── hero.tsx            # Hero section
│   ├── proof-bar.tsx       # Social proof stats
│   ├── services.tsx        # Service cards grid
│   ├── process.tsx         # How it works timeline
│   ├── stack.tsx           # Tech stack pills
│   ├── projects.tsx        # Project showcases
│   ├── open-source.tsx     # Open source section
│   ├── results.tsx         # Testimonials
│   ├── contact.tsx         # Contact form + info
│   ├── footer.tsx          # Footer
│   ├── terminal.tsx        # Reusable terminal component
│   └── back-to-top.tsx     # Scroll-to-top button
├── lib/
│   └── cn.ts              # clsx + tailwind-merge utility
├── public/
│   └── (favicons, OG images if any)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Implementation Plan (Task Order)

### Phase 1: Scaffold & Foundation
1. **Init Next.js project** — `npx create-next-app@latest` with TypeScript + Tailwind + App Router + src/ directory. Set up `globals.css` with the existing CSS custom properties (colors, fonts, spacing). Configure Google Fonts via `next/font`.

2. **Install core deps** — `motion`, `clsx`, `tailwind-merge`. Create `lib/cn.ts` utility.

3. **Copy React Bits components** — Pull in the TS-TW variants of: Aurora, DecryptedText, BlurText, CountUp, SplitText, AnimatedContent, SpotlightCard, TiltedCard, StarBorder, ClickSpark, GlitchText, ScrollVelocity. Place in `src/components/ui/`. Adapt imports as needed.

### Phase 2: Port Sections (content-identical, component-by-component)
4. **Layout + Nav** — Port the navigation as a client component. Sticky header with scroll detection, mobile hamburger, active section highlighting. Use GlitchText for logo.

5. **Hero** — Aurora background + DecryptedText title + BlurText subtitle + StarBorder on primary CTA + terminal animation component. Keep the trust bar.

6. **Proof Bar** — CountUp for each stat number, triggered on scroll into view.

7. **Services** — 6 SpotlightCard components in a responsive grid. Port the expand/collapse functionality. Featured card spans 2 columns.

8. **Process (How It Works)** — Timeline with AnimatedContent wrapping each step. Preserve zigzag layout.

9. **Tech Stack** — ScrollVelocity marquee for tech names, or keep grouped pills with AnimatedContent reveals.

10. **Projects** — TiltedCard for each project. Featured project full-width with accent top border.

11. **Open Source** — Terminal component (static), stats with CountUp, bento grid with SpotlightCard items, install widget with copy-to-clipboard, package badges.

12. **Results/Testimonials** — 3 testimonial cards with AnimatedContent reveals. Credentials bar.

13. **Contact** — Form with floating labels (client component for state), info card. Wire up the webhook POST.

14. **Footer + Back-to-top** — Simple footer. Scroll-to-top button with visibility toggle.

### Phase 3: Polish & Integration
15. **ClickSpark wrapper** — Wrap the entire app in ClickSpark for site-wide click particles.

16. **Page assembly** — Wire all sections together in `page.tsx`. Ensure smooth scroll behavior and section IDs for nav links.

17. **Responsive QA** — Test all breakpoints (640, 768, 1024, 1200). Ensure mobile menu works. Check reduced-motion preferences.

18. **SEO & Metadata** — Port all meta tags, OG tags, Twitter cards to Next.js `metadata` export. Add structured data (JSON-LD for Organization).

19. **Performance audit** — Check bundle size, lazy-load heavy components (Aurora, Three.js if used). Ensure Lighthouse 90+.

---

## Key Decisions

1. **No Three.js backgrounds** — Aurora (CSS/canvas-based) over Hyperspeed (Three.js) to keep bundle lean
2. **Copy-paste React Bits** — Don't use jsrepo/shadcn CLI; just copy the TS-TW source files so we can customize freely
3. **Client vs Server components** — Only mark interactive sections as `'use client'` (Nav, Hero animations, Contact form, etc.). Keep structural layout as server components.
4. **No CMS** — Keep content hardcoded for now. Easy to add later if needed.
5. **Deployment** — Site should work on Vercel, Cloudflare Pages, or static export

---

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| React Bits component deps conflict | Cherry-pick only `motion`-based components (avoid GSAP/Three.js ones) |
| Bundle size bloat from animations | Lazy-load heavy components, use `dynamic()` imports |
| Mobile performance with many animations | Respect `prefers-reduced-motion`, disable heavy effects on mobile |
| Form submission breaking | Test webhook integration early, keep same fetch logic |
| SEO regression from SPA | Next.js SSR handles this — verify with Lighthouse |

---

## Estimated Effort
- **Phase 1** (Scaffold): ~30 min
- **Phase 2** (Port sections): ~3-4 hours  
- **Phase 3** (Polish): ~1-2 hours
- **Total**: ~5-6 hours

This preserves every pixel of content while making the site feel dramatically more premium and interactive.
