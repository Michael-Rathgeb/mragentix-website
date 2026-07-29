'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { cn } from '@/lib/cn';

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees */
  max?: number;
  /** Glare highlight on hover */
  glare?: boolean;
};

/**
 * A glass card that tilts in 3D toward the pointer.
 * Lightweight: uses motion values + springs, no RAF loop.
 */
export default function TiltCard({
  children,
  className,
  max = 10,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5); // 0..1 across card
  const py = useMotionValue(0.5);

  const sx = useSpring(px, { stiffness: 150, damping: 18, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 150, damping: 18, mass: 0.4 });

  const rotateX = useTransform(sy, (v) => (0.5 - v) * max * 2);
  const rotateY = useTransform(sx, (v) => (v - 0.5) * max * 2);

  const glareBackground = useTransform(
    [sx, sy],
    ([x, y]: number[]) =>
      `radial-gradient(220px circle at ${x * 100}% ${y * 100}%, rgba(0,229,160,0.35), transparent 60%)`
  );

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={cn('[perspective:1200px]', className)}
    >
      <div style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }}>
        {children}
      </div>
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light"
          style={{ background: glareBackground }}
        />
      )}
    </motion.div>
  );
}
