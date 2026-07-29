'use client';

import AnimatedContent from '@/components/ui/animated-content';
import SectionHeader from '@/components/ui/section-header';

interface Testimonial {
  before: string;
  after: string;
  name: string;
  role: string;
  outcome: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    before: 'Our team spent 12+ hours a week manually qualifying leads from web forms and phone calls.',
    after: 'MR Agentix built us an AI lead qualification agent. Response time dropped from 4 hours to 47 seconds. Our close rate jumped 31% in the first month.',
    name: 'Sarah Mitchell',
    role: 'Operations Director, Midwest Property Group',
    outcome: '+31% close rate',
  },
  {
    before: 'We were paying $2,400/month for an SEO agency that sent us spreadsheets. Rankings barely moved.',
    after: "Their AEO system generated 340+ optimized pages with schema markup in a single week. We're in the map pack for 23 new keywords — and climbing.",
    name: 'Jason Torres',
    role: 'Owner, Torres HVAC Services — Austin, TX',
    outcome: '23 new keywords',
  },
  {
    before: 'Our intake process was a mess — sticky notes, missed follow-ups, and leads going cold overnight.',
    after: 'Now every lead gets an instant SMS response, a smart drip sequence, and auto-routing to the right team member. We booked 19 extra appointments in the first two weeks.',
    name: 'Dr. Lisa Chen',
    role: 'Practice Manager, Lakewood Dental — St. Louis, MO',
    outcome: '+19 appointments',
  },
];

function initials(name: string) {
  return name
    .replace(/^Dr\.\s*/, '')
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

function Stars() {
  return (
    <div className="flex gap-0.5 text-[var(--accent)]" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Results() {
  return (
    <section id="results" className="section section--surface">
      <div className="section__bg">
        <div className="glow-orb glow-orb--emerald" style={{ width: 460, height: 460, top: '0%', right: '-15%', opacity: 0.28 }} />
      </div>
      <div className="container">
        <SectionHeader
          eyebrow="// the proof"
          title={
            <>
              The results <span className="text-gradient">speak.</span>
            </>
          }
          lede="Before → after, in our clients' own words. Same businesses, same markets — minus the manual grind."
        />

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {TESTIMONIALS.map((t, i) => (
            <AnimatedContent key={i} delay={i * 0.12}>
              <div className="card p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <Stars />
                  <span className="tag">{t.outcome}</span>
                </div>

                <div className="flex-1 space-y-3 mb-5">
                  <div>
                    <span className="font-[var(--font-mono)] text-[0.62rem] uppercase tracking-wide text-[var(--text-muted)]">before</span>
                    <p className="text-sm text-[var(--text-secondary)]">{t.before}</p>
                  </div>
                  <div className="flex justify-center">
                    <span className="text-[var(--accent)]" aria-hidden>↓</span>
                  </div>
                  <div>
                    <span className="font-[var(--font-mono)] text-[0.62rem] uppercase tracking-wide text-[var(--accent)]">after</span>
                    <p className="text-sm text-[var(--text-primary)]">{t.after}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--border)] flex items-center gap-3">
                  <span className="avatar-initials">{initials(t.name)}</span>
                  <div>
                    <span className="block text-sm font-semibold text-[var(--text-primary)]">{t.name}</span>
                    <span className="block text-xs text-[var(--text-muted)]">{t.role}</span>
                  </div>
                </div>
              </div>
            </AnimatedContent>
          ))}
        </div>

        <AnimatedContent delay={0.3}>
          <div className="flex flex-wrap justify-center items-center gap-3 text-sm text-[var(--text-secondary)]">
            <span>Built 47+ automated workflows</span>
            <span className="text-[var(--text-muted)]" aria-hidden>·</span>
            <span>13 AI agents in production</span>
            <span className="text-[var(--text-muted)]" aria-hidden>·</span>
            <span>Based in St. Louis, MO</span>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
