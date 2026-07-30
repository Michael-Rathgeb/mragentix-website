'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

/**
 * A soft emerald glow that trails the cursor. Hidden on touch devices via CSS.
 */
export default function CursorGlow() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 140, damping: 22, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 140, damping: 22, mass: 0.5 });

  useEffect(() => {
    const half = 230; // half of element width to center on pointer
    const move = (e: PointerEvent) => {
      x.set(e.clientX - half);
      y.set(e.clientY - half);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [x, y]);

  return <motion.div className="cursor-glow" style={{ x: sx, y: sy }} aria-hidden />;
}
