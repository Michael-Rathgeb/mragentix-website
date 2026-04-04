'use client';

import AnimatedContent from '@/components/ui/animated-content';
import SpotlightCard from '@/components/ui/spotlight-card';

interface Project {
  icon: React.ReactNode;
  tags: string[];
  title: string;
  desc: string;
  features: string[];
  stack: string[];
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
    ),
    tags: ['Python', 'Scrapy', 'Claude API'],
    title: 'Multi-Agent SEO Audit Tool',
    desc: 'A production-grade alternative to Screaming Frog. Crawls entire sites, extracts 80+ SEO fields per page, then runs 13 specialized AI agents in parallel — Technical, Content, Schema, E-E-A-T, Local SEO, Security, and more.',
    features: [
      '3-layer architecture: Directives → Orchestration → Execution',
      'Parallel agent analysis with ThreadPoolExecutor',
      'Automated screenshot capture at mobile, tablet, and desktop viewports',
      'Generates interactive HTML dashboards, CSV exports, and PDF reports',
    ],
    stack: ['Scrapy', 'Playwright', 'Jinja2', 'Google APIs'],
    featured: true,
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
    ),
    tags: ['Python', 'Claude API', 'SerpAPI'],
    title: 'AEO Site Builder',
    desc: "End-to-end Answer Engine Optimization pipeline. Scrapes Google's People Also Ask data, clusters questions into topical groups, generates AI-written answers, and builds fully deployable static sites with structured schema markup.",
    features: [
      'Full pipeline: Scrape → Cluster → Generate → Build → Deploy',
      'JSON-LD schema with FAQPage, LocalBusiness, Speakable, and BreadcrumbList',
      'Entity locking via KGMID for Knowledge Graph targeting',
      'Self-annealing protocol — the system fixes its own directives after errors',
    ],
    stack: ['SerpAPI', 'Playwright', 'JSON-LD', 'Static Sites'],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
    ),
    tags: ['Python', 'Streamlit', 'Google Places'],
    title: 'Poseidon Photo Processor',
    desc: 'Batch photo processing tool for local SEO campaigns. Replaces a 3-tool manual workflow with a single automated pipeline — watermarking, QR code generation, EXIF geotagging, and Drive metadata export.',
    features: [
      'Google Places API integration for auto-filling business data',
      'Automated watermarking with logo, QR code, and business info overlays',
      'EXIF GPS geotagging with keyword and business metadata injection',
      'Streamlit UI with drag-and-drop plus live watermark preview',
    ],
    stack: ['Streamlit', 'Pillow', 'Google Places', 'EXIF'],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-[var(--section-pad)]">
      <div className="container">
        <AnimatedContent>
          <span className="section-label">// what we&apos;ve shipped</span>
        </AnimatedContent>
        <AnimatedContent delay={0.1}>
          <h2 className="section-title">Real Systems Running in Production</h2>
        </AnimatedContent>

        {/* Featured project */}
        <AnimatedContent delay={0.2}>
          <SpotlightCard
            className="rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] p-8 mb-8 border-t-2 border-t-[var(--accent)]"
            spotlightColor="rgba(0, 229, 160, 0.06)"
          >
            <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
              <div className="text-[var(--accent)]">{PROJECTS[0].icon}</div>
              <div className="flex flex-wrap gap-2">
                {PROJECTS[0].tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">{PROJECTS[0].title}</h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4 max-w-3xl">{PROJECTS[0].desc}</p>
            <ul className="space-y-2 mb-4">
              {PROJECTS[0].features.map((f, j) => (
                <li key={j} className="text-sm text-[var(--text-secondary)] flex gap-2">
                  <span className="text-[var(--accent)] mt-0.5 flex-shrink-0">▸</span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {PROJECTS[0].stack.map((s) => (
                <span key={s} className="pill pill--sm">{s}</span>
              ))}
            </div>
          </SpotlightCard>
        </AnimatedContent>

        {/* Supporting projects */}
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.slice(1).map((project, i) => (
            <AnimatedContent key={i} delay={0.3 + i * 0.1}>
              <SpotlightCard
                className="rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] p-6 h-full"
                spotlightColor="rgba(0, 229, 160, 0.06)"
              >
                <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
                  <div className="text-[var(--accent)]">{project.icon}</div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{project.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">{project.desc}</p>
                <ul className="space-y-2 mb-4">
                  {project.features.map((f, j) => (
                    <li key={j} className="text-sm text-[var(--text-secondary)] flex gap-2">
                      <span className="text-[var(--accent)] mt-0.5 flex-shrink-0">▸</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span key={s} className="pill pill--sm">{s}</span>
                  ))}
                </div>
              </SpotlightCard>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
