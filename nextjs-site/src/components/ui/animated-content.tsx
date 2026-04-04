'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface AnimatedContentProps {
  children: React.ReactNode;
  distance?: number;
  direction?: 'vertical' | 'horizontal';
  reverse?: boolean;
  duration?: number;
  delay?: number;
  className?: string;
  threshold?: number;
}

export default function AnimatedContent({
  children,
  distance = 50,
  direction = 'vertical',
  reverse = false,
  duration = 0.6,
  delay = 0,
  className = '',
  threshold = 0.1,
}: AnimatedContentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  const axis = direction === 'horizontal' ? 'x' : 'y';
  const offset = reverse ? -distance : distance;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, [axis]: offset }}
      animate={isInView ? { opacity: 1, [axis]: 0 } : { opacity: 0, [axis]: offset }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
