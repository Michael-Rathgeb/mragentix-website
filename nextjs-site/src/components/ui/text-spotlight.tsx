'use client';

import { useEffect } from 'react';

/**
 * Drives the green "spotlight reveal" on `.text-gradient` elements.
 * On pointer move, each `.text-gradient` element gets element-local
 * `--mx` / `--my` CSS vars (px from its top-left), so the emerald disc
 * in its background tracks the cursor. Defaults to -999px (off, all white).
 *
 * Mounted once globally via SiteChrome.
 */
export default function TextSpotlight() {
  useEffect(() => {
    const els = () => Array.from(document.querySelectorAll<HTMLElement>('.text-gradient'));

    const move = (e: PointerEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      for (const el of els()) {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${x - r.left}px`);
        el.style.setProperty('--my', `${y - r.top}px`);
      }
    };

    const reset = () => {
      for (const el of els()) {
        el.style.setProperty('--mx', '-999px');
        el.style.setProperty('--my', '-999px');
      }
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerleave', reset);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerleave', reset);
    };
  }, []);

  return null;
}
