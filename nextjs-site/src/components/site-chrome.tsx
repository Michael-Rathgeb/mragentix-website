import CursorGlow from '@/components/ui/cursor-glow';
import StickyCtaBar from '@/components/ui/sticky-cta-bar';
import CommandPalette from '@/components/ui/command-palette';

/**
 * Global, app-wide UI layer: film grain, trailing cursor glow, ⌘K command
 * palette, and the sticky conversion bar. Mounted once in the root layout.
 */
export default function SiteChrome() {
  return (
    <>
      <div className="grain" aria-hidden />
      <CursorGlow />
      <StickyCtaBar />
      <CommandPalette />
    </>
  );
}
