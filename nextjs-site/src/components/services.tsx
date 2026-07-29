'use client';

import { useState } from 'react';
import SpotlightCard from '@/components/ui/spotlight-card';
import AnimatedContent from '@/components/ui/animated-content';
import SectionHeader from '@/components/ui/section-header';

interface Service {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tags: string[];
  detail: string;
  detailList: string[];
  featured?: boolean;
}

const SERVICES: Service[] = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/><path d="M16 14H8a4 4 0 0 0-4 4v2h16v-2a4 4 0 0 0-4-4z"/><circle cx="19" cy="5" r="2"/><path d="M19 7v2"/></svg>
    ),
    title: 'AI Agents & Agentic Workflows',
    desc: 'Custom Claude-powered agents for research, content generation, lead processing, and multi-step autonomous tasks.',
    tags: ['Claude API', 'FastAPI', 'LangChain'],
    detail: 'We design and deploy autonomous agents that handle entire workflows — not just single prompts. Your agent reads inputs, makes decisions, calls APIs, and delivers finished outputs while you focus on running your business.',
    detailList: [
      'Multi-step research agents that gather, analyze, and summarize data',
      'Content pipelines that draft, review, and publish at scale',
      'Lead qualification agents that score, route, and follow up automatically',
      'Custom tool-use agents connected to your existing systems',
    ],
    featured: true,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>
    ),
    title: 'SEO & AEO Automation',
    desc: 'Automated Answer Engine Optimization — scrape, cluster, build. Authoritative content sites at scale with structured schema and entity locking.',
    tags: ['Schema Markup', 'Static Sites', 'KGMID'],
    detail: 'We build automated pipelines that scrape real search intent data, cluster it into topic authority maps, and generate fully structured content sites — complete with schema markup, entity locking, and deployment. No manual keyword research. No guesswork.',
    detailList: [
      'People Also Ask scraping and question clustering at scale',
      'Auto-generated FAQ pages with JSON-LD schema markup',
      'Knowledge Graph entity targeting (KGMID locking)',
      'Static site generation and deployment — fully hands-off',
    ],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
    ),
    title: 'SMS & Lead Automation',
    desc: 'End-to-end SMS workflows for restaurants, real estate, insurance, and local services. Speed-to-lead, drips, and AI response agents.',
    tags: ['Twilio', 'n8n', 'GHL'],
    detail: 'Speed wins deals. We build SMS systems that respond to new leads in seconds, nurture them with smart drip sequences, and hand off qualified conversations to your team — or let an AI agent close them entirely.',
    detailList: [
      'Instant speed-to-lead response — under 60 seconds',
      'AI-powered conversational SMS agents',
      'Drip campaigns with branching logic and smart timing',
      'CRM integration with GoHighLevel, HubSpot, or custom systems',
    ],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 18 22 12 16 6"/><path d="M8 6 2 12 8 18"/><path d="m14.5 4-5 16"/></svg>
    ),
    title: 'Web Design & Development',
    desc: 'Clean, fast, conversion-focused websites with automation baked in from day one. Webflow, custom React, or pure static.',
    tags: ['React', 'Webflow', 'Vite'],
    detail: 'Every site we build ships with automation wired in from day one. Forms feed directly into your CRM. Pages are optimized for Core Web Vitals. And the whole thing is designed to convert visitors into leads — not just look pretty.',
    detailList: [
      'Webflow, React, or hand-coded static — whatever ships fastest',
      'Mobile-first, conversion-optimized layouts',
      'Integrated lead capture, chat widgets, and booking flows',
      'Lighthouse 90+ performance out of the box',
    ],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
    ),
    title: 'Local SEO Systems',
    desc: 'Google Business Profile optimization, G-stacking, citation building, and CTR systems designed for local market domination.',
    tags: ['GBP', 'Local SEO', 'Schema'],
    detail: 'We build local SEO systems that put you in the map pack and keep you there. From GBP optimization to entity stacking and automated citation management — this is local dominance, systematized.',
    detailList: [
      'Google Business Profile audit and full optimization',
      'Google entity stacking (Drive, Sites, Sheets, Maps)',
      'Automated citation building and NAP consistency',
      'Local schema markup and geo-targeted landing pages',
    ],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
    ),
    title: 'Custom Software & Tooling',
    desc: 'Internal dashboards, field service apps, API integrations, and purpose-built tools. If you need it built, we build it.',
    tags: ['Python', 'PostgreSQL', 'Docker'],
    detail: "Off-the-shelf software doesn't fit every business. We build the tools your team actually needs — internal dashboards, field apps, API glue between systems, and custom workflows that eliminate the duct tape.",
    detailList: [
      'Internal admin dashboards and reporting tools',
      'Field service and mobile-friendly operations apps',
      "API integrations between platforms that don't talk to each other",
      'Dockerized, deployable, documented — ready for your team',
    ],
  },
];

export default function Services() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const toggleCard = (index: number) => setExpandedIndex(expandedIndex === index ? null : index);

  return (
    <section id="services" className="section">
      <div className="section__bg">
        <div className="glow-orb glow-orb--emerald" style={{ width: 380, height: 380, top: '-5%', left: '-10%', opacity: 0.35 }} />
      </div>
      <div className="container">
        <SectionHeader
          eyebrow="// what we build"
          title={
            <>
              Capabilities that <span className="text-gradient">compound.</span>
            </>
          }
          lede="Six overlapping disciplines, one team. Tap any card to see how it actually works — and what ships."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => (
            <AnimatedContent key={i} delay={(i % 3) * 0.08}>
              <SpotlightCard
                className={`card p-6 h-full ${service.featured ? 'card--accent md:col-span-2 lg:col-span-2' : ''} ${
                  expandedIndex === i ? '!border-[var(--border-accent)]' : ''
                } cursor-pointer`}
                spotlightColor="rgba(0, 229, 160, 0.08)"
              >
                <div
                  onClick={() => toggleCard(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleCard(i);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-expanded={expandedIndex === i}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="icon-chip">{service.icon}</div>
                    <span
                      className="text-[var(--text-muted)] text-2xl leading-none transition-transform duration-300"
                      style={{ transform: expandedIndex === i ? 'rotate(45deg)' : 'none' }}
                      aria-hidden
                    >
                      +
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-[var(--font-mono)] text-[0.65rem] text-[var(--text-muted)]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {service.featured && (
                      <span className="tag">flagship</span>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">{service.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-4">{service.desc}</p>

                  <div className="flex flex-wrap gap-2 mb-1">
                    {service.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>

                  <div
                    className="overflow-hidden transition-all duration-500"
                    style={{
                      maxHeight: expandedIndex === i ? '560px' : '0',
                      opacity: expandedIndex === i ? 1 : 0,
                    }}
                  >
                    <div className="pt-4 mt-2 border-t border-[var(--border)]">
                      <p className="text-sm text-[var(--text-secondary)] mb-3">{service.detail}</p>
                      <ul className="space-y-2 mb-4">
                        {service.detailList.map((item, j) => (
                          <li key={j} className="text-sm text-[var(--text-secondary)] flex gap-2">
                            <span className="text-[var(--accent)] mt-1 flex-shrink-0">▸</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <a
                        href="#contact"
                        className="text-sm font-medium text-[var(--accent)] hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Talk to us about this →
                      </a>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
