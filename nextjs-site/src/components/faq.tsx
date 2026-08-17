'use client';

import { useState } from 'react';
import AnimatedContent from '@/components/ui/animated-content';
import SectionHeader from '@/components/ui/section-header';

const FAQS = [
  {
    q: 'What does an engagement actually look like?',
    a: 'A free discovery call, then a four-step loop: Discovery → Architecture → Build → Deploy. You see everything the whole way — no black boxes. Most builds go live in 2–4 weeks.',
  },
  {
    q: 'How fast can we go live?',
    a: 'Simple automations and single agents can ship in days. Larger multi-agent systems and full websites typically take 2–4 weeks. We’ll give you a real timeline on the discovery call.',
  },
  {
    q: 'Do you work with our existing tools?',
    a: 'Yes. We commonly wire into GoHighLevel, HubSpot, Twilio, Calendly, Slack, Salesforce, Stripe, and custom/internal APIs. If your tools have an API (or even just email/SMS), we can probably connect them.',
  },
  {
    q: 'Who owns the code and IP?',
    a: 'You do — 100%. Everything we build is handed off with documentation, and our CLI framework is open source. No lock-in, no “platform fees.”',
  },
  {
    q: 'What does it cost?',
    a: 'Projects are scoped after a free discovery call based on complexity and scope — not bloated retainers. Simple automations start small; full agent systems and websites are quoted as fixed-price builds.',
  },
  {
    q: 'Do you offer ongoing support?',
    a: 'Two ways: we can run it for you (monitoring, updates, improvements), or hand it off fully with docs so your team owns it. Your call.',
  },
];

function FaqJsonLd() {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section">
      <FaqJsonLd />
      <div className="section__bg">
        <div className="glow-orb glow-orb--emerald" style={{ width: 360, height: 360, bottom: '0%', right: '-10%', opacity: 0.25 }} />
      </div>
      <div className="container max-w-3xl">
        <SectionHeader
          eyebrow="// questions"
          title={
            <>
              The things <span className="text-gradient">people ask.</span>
            </>
          }
        />

        <div className="flex flex-col gap-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <AnimatedContent key={i} delay={i * 0.05} distance={16}>
                <div className={`card overflow-hidden ${isOpen ? '!border-[var(--border-accent)]' : ''}`}>
                  <button
                    className="w-full flex items-center justify-between gap-4 text-left p-5"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-[var(--text-primary)] font-medium text-sm md:text-base">{item.q}</span>
                    <span
                      className="text-[var(--text-muted)] text-xl leading-none transition-transform duration-300 flex-shrink-0"
                      style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-400 ease-out"
                    style={{ maxHeight: isOpen ? 240 : 0, opacity: isOpen ? 1 : 0 }}
                  >
                    <p className="px-5 pb-5 text-sm text-[var(--text-secondary)] leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </AnimatedContent>
            );
          })}
        </div>

        <AnimatedContent delay={0.2}>
          <p className="mt-8 text-center text-sm text-[var(--text-muted)]">
            Still wondering about something?{' '}
            <a href="#contact" className="text-[var(--accent)] link-underline">
              Just ask us directly →
            </a>
          </p>
        </AnimatedContent>
      </div>
    </section>
  );
}
