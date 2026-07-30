'use client';

import { useEffect, useRef } from 'react';
import { useMotionValue, useSpring } from 'motion/react';

type AnimatedNumberProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

/**
 * Smoothly tweens a displayed number toward `value` using a spring.
 * Stable props only (no inline format fn) to avoid re-subscribing each render.
 */
export default function AnimatedNumber({
  value,
  prefix = '',
  suffix = '',
  duration = 1.2,
  className,
}: AnimatedNumberProps) {
  const mv = useMotionValue(value);
  const damping = 20 + 24 / Math.max(duration, 0.4);
  const stiffness = 110 / Math.max(duration, 0.4);
  const spring = useSpring(mv, { stiffness, damping });
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    mv.set(value);
  }, [value, mv]);

  useEffect(() => {
    const format = (v: number) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`;
    if (ref.current) ref.current.textContent = format(value);
    const unsub = spring.on('change', (v) => {
      if (ref.current) ref.current.textContent = format(v);
    });
    return () => unsub();
  }, [spring, value, prefix, suffix]);

  return <span className={className} ref={ref} />;
}
