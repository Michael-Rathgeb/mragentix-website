'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import AnimatedContent from '@/components/ui/animated-content';
import SpotlightCard from '@/components/ui/spotlight-card';
import SectionHeader from '@/components/ui/section-header';

const STEPS = [
  { number: '01', title: 'Discovery', meta: '~48 hours', desc: 'We audit your current workflow, tools, and goals. Free, no pitch deck.' },
  { number: '02', title: 'Architecture', meta: '~1 week', desc: 'We design the system: which agents, what triggers, what outputs.' },
  { number: '03', title: 'Build', meta: '2–4 weeks', desc: 'Rapid development with weekly check-ins. No black boxes — you see everything.' },
  { number: '04', title: 'Deploy & Automate', meta: 'ongoing', desc: 'Ship it, monitor it, hand off documentation. Or we run it for you.' },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 75%', 'end 55%'],
  });
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const activeCount = useRef(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const n = Math.min(STEPS.length, Math.floor(v * STEPS.length) + 1);
    if (n === activeCount.current) return;
    activeCount.current = n;
    ref.current?.querySelectorAll<HTMLElement>('[data-step-dot]').forEach((dot, i) => {
      dot.classList.toggle('timeline__node--active', i < n);
    });
  });

  return (
    <section id="how-it-works" className="section section--surface">
      <div className="section__bg">
        <div className="glow-orb glow-orb--emerald" style={{ width: 420, height: 420, top: '20%', right: '-12%', opacity: 0.3 }} />
      </div>
      <div className="container">
        <SectionHeader
          eyebrow="// the process"
          title={
            <>
              Live in weeks, <span className="text-gradient">not quarters.</span>
            </>
          }
          lede="A tight four-step loop from first call to a system running in production. Watch the rail fill as you scroll."
        />

        <div ref={ref} className="relative pl-12">
          {/* rail + scroll-linked fill */}
          <div className="absolute left-5 top-3 bottom-3 w-px bg-[var(--border)]" aria-hidden>
            <motion.div
              className="absolute top-0 left-0 w-full origin-top"
              style={{
                height,
                background: 'linear-gradient(180deg, var(--accent), rgba(0,229,160,0.12))',
                boxShadow: '0 0 14px rgba(0,229,160,0.5)',
              }}
            />
          </div>

          <div className="flex flex-col gap-5">
            {STEPS.map((step, i) => (
              <AnimatedContent key={i} delay={i * 0.08} distance={24}>
                <div className="relative">
                  <div
                    data-step-dot
                    className="timeline__node"
                    style={{ left: 20, top: 24 }}
                    aria-hidden
                  />
                  <SpotlightCard className="card p-5" spotlightColor="rgba(0, 229, 160, 0.07)">
                    <div className="flex items-center justify-between gap-3 mb-1.5 flex-wrap">
                      <h3 className="flex items-center gap-3 text-base md:text-lg font-semibold text-[var(--text-primary)]">
                        <span className="font-[var(--font-mono)] text-[var(--accent)]">{step.number}</span>
                        {step.title}
                      </h3>
                      <span className="tag">{step.meta}</span>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{step.desc}</p>
                  </SpotlightCard>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
