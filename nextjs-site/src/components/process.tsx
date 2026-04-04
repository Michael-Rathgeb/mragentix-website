'use client';

import AnimatedContent from '@/components/ui/animated-content';

const STEPS = [
  {
    number: '01',
    title: 'Discovery',
    desc: 'We audit your current workflow, tools, and goals. Free, no pitch deck.',
  },
  {
    number: '02',
    title: 'Architecture',
    desc: 'We design the system: which agents, what triggers, what outputs.',
  },
  {
    number: '03',
    title: 'Build',
    desc: 'Rapid development with weekly check-ins. No black boxes — you see everything.',
  },
  {
    number: '04',
    title: 'Deploy & Automate',
    desc: 'Ship it, monitor it, hand off documentation. Or we run it for you.',
  },
];

export default function Process() {
  return (
    <section id="how-it-works" className="py-[var(--section-pad)] bg-[var(--bg-surface)]">
      <div className="container">
        <AnimatedContent>
          <span className="section-label">// the process</span>
        </AnimatedContent>
        <AnimatedContent delay={0.1}>
          <h2 className="section-title">Your Automation Goes Live in 4 Steps</h2>
        </AnimatedContent>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-[var(--border)]" aria-hidden="true" />

          {STEPS.map((step, i) => {
            const isLeft = i % 2 === 0;
            return (
              <AnimatedContent
                key={i}
                delay={i * 0.15}
                direction="horizontal"
                reverse={!isLeft}
                distance={30}
              >
                <div className={`relative flex items-start gap-6 mb-12 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  {/* Marker */}
                  <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-accent)] flex items-center justify-center md:absolute md:left-1/2 md:-translate-x-1/2">
                    <span className="font-mono text-sm font-bold text-[var(--accent)]">{step.number}</span>
                  </div>

                  {/* Content */}
                  <div className={`flex-1 ${isLeft ? 'md:pr-24 md:text-right' : 'md:pl-24'}`}>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">{step.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)]">{step.desc}</p>
                  </div>
                </div>
              </AnimatedContent>
            );
          })}
        </div>
      </div>
    </section>
  );
}
