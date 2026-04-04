'use client';

import CountUp from '@/components/ui/count-up';
import AnimatedContent from '@/components/ui/animated-content';

const STATS = [
  { number: 47, suffix: '+', label: 'Automated Workflows Shipped' },
  { number: 13, suffix: '', label: 'AI Agents in Production' },
  { number: 3, suffix: '', label: 'npm Packages Published' },
  { number: 4, suffix: '', label: 'LLM Providers Supported' },
];

export default function ProofBar() {
  return (
    <section id="proof-bar" className="py-12 border-y border-[var(--border)]">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center text-center">
          {STATS.map((stat, i) => (
            <AnimatedContent key={i} delay={i * 0.1}>
              <div className="space-y-1">
                <span className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
                  <CountUp to={stat.number} duration={2.5} />
                  {stat.suffix}
                </span>
                <span className="block text-xs text-[var(--text-secondary)]">{stat.label}</span>
              </div>
            </AnimatedContent>
          ))}

          {/* Dividers visible on md+ */}
          {/* The last stat is text-based, not a number */}
          <AnimatedContent delay={0.4}>
            <div className="col-span-2 md:col-span-1 space-y-1">
              <span className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
                St. Louis → Nationwide
              </span>
              <span className="block text-xs text-[var(--text-secondary)]">Reach</span>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}
