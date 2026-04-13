# Process Section Redesign

## Problem
The `// the process` section uses a basic timeline layout with circles and a vertical line — functional but not as polished or interactive as the rest of the site (which uses SpotlightCards, ScrollVelocity, GlitchText, etc.)

## Design Direction
Replace the plain timeline with **interactive step cards** using SpotlightCard + a connected animated progress line + staggered reveal animations. Think: horizontal card layout on desktop (vertical on mobile) with glowing connectors, accent-colored step numbers, and hover effects.

### Inspiration from react-bits
- **SpotlightCard** — already in the project, use for each step card (hover glow effect)
- **CountUp** — already in the project, animate the step numbers on scroll
- **GlareHover** — add a sweep glare on hover to each step card (new component)

## Implementation Plan

### Step 1: Create `GlareHover` UI component
**File:** `nextjs-site/src/components/ui/glare-hover.tsx`

Port the GlareHover component from react-bits (TS-Tailwind variant) — a simple overlay that sweeps a light glare across a card on hover. Adapt colors to use `var(--accent)` (`#00e5a0`) as the glare color with low opacity.

### Step 2: Redesign `process.tsx`
**File:** `nextjs-site/src/components/process.tsx`

Replace the current timeline layout with a new design:

#### Desktop Layout (md+)
- **4 cards in a horizontal row** (grid `md:grid-cols-4 gap-6`)
- Each card is a `SpotlightCard` wrapped in `GlareHover`
- Cards contain:
  - Large mono step number (e.g. `01`) at top, in `var(--accent)` with slight glow
  - Title (h3, semibold, `var(--text-primary)`)
  - Description (text-sm, `var(--text-secondary)`)
- Between cards: animated SVG dashed connector lines (horizontal arrows) using CSS animation for a "flowing dots" effect
- Each card staggers in via `AnimatedContent` with increasing delays

#### Mobile Layout
- Vertical stack with left-side step numbers and a subtle vertical connector line
- Same card content, just single column

#### Visual Details
- Cards: `bg-[var(--bg-elevated)]` with `border border-[var(--border)]`, rounded-lg
- Step number: `font-mono text-3xl font-bold text-[var(--accent)]` with `text-shadow: 0 0 20px var(--accent-glow)`
- Connector line: dashed border or SVG with `var(--border-accent)` color, animated dash offset
- On hover: card border transitions to `var(--border-accent)]`, SpotlightCard glow activates, GlareHover sweeps

### Step 3: Add connector animation CSS
**File:** `nextjs-site/src/app/styles.css` (or inline via Tailwind)

Add a simple `@keyframes dash-flow` animation for the connector lines between steps:
```css
@keyframes dash-flow {
  to { stroke-dashoffset: -20; }
}
```

## Architecture Notes
- No new dependencies needed — uses `motion/react` (already installed) + existing UI components
- Keep `STEPS` data array as-is (no content changes)
- Section id `how-it-works` stays the same
- Section background stays `bg-[var(--bg-surface)]` (matches current)
- `AnimatedContent` used for scroll-triggered entrance (consistent with all other sections)

## Risks
- 4 columns on tablet might be tight → use `md:grid-cols-2 lg:grid-cols-4` as fallback
- GlareHover is purely decorative — must not interfere with card click/focus

## Verification
- Visual check on desktop (1440px+) and mobile (375px)
- Smooth scroll-reveal animations
- Hover effects work on cards
- Connector lines visible between cards
- No layout shift or overflow issues
