'use client';

import AnimatedContent from '@/components/ui/animated-content';
import SpotlightCard from '@/components/ui/spotlight-card';
import SectionHeader from '@/components/ui/section-header';

const GH = 'https://github.com/Michael-Rathgeb';

interface Project {
  icon: React.ReactNode;
  tags: string[];
  title: string;
  desc: string;
  features: string[];
  stack: string[];
  metric?: { value: string; label: string };
  repo?: string;
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>
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
    metric: { value: '13', label: 'parallel agents' },
    repo: `${GH}/MR-Agentix-Tools`,
    featured: true,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/></svg>
    ),
    tags: ['TypeScript', 'Telegram', 'Playwright'],
    title: 'Pocket Agent — personal AI',
    desc: 'A menu-bar AI assistant that actually knows you. Persistent semantic memory, scheduled routines that run as full agent executions, browser automation with authenticated sessions, and multi-session isolation.',
    features: [
      'Persistent memory — extracts projects, people & preferences; recalls months later',
      'Scheduled routines/automations that execute with full tool + browser access',
      'Browser automation in your real Chrome session (no re-login)',
      'Multi-session isolation (up to 5 threads) + Telegram integration',
    ],
    stack: ['TypeScript', 'Telegram', 'Playwright', 'Vector memory'],
    metric: { value: '60+', label: 'tools' },
    repo: `${GH}/MR-Agentix-Agent`,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
    ),
    tags: ['React', 'Vite', 'Express', 'Pi SDK'],
    title: 'Locafy Platform — modular SEO toolkit',
    desc: 'A plugin-based SEO dashboard with sub-agent orchestration via the Pi SDK. Every tool is a hot-swappable plugin; add capabilities without touching core. Ships with a 13-agent SEO audit and a live job dashboard.',
    features: [
      'Plugin architecture — every tool implements a ToolPlugin interface',
      '13-agent SEO audit plugin: crawl → analyze → report',
      'React + Vite dashboard streaming live job status over Socket.IO',
      'Sub-agent orchestration; schema-gen, content-gap & rank-tracker plugins',
    ],
    stack: ['React', 'Vite', 'Express', 'Socket.IO', 'Pi SDK'],
    metric: { value: '13', label: 'audit agents' },
    repo: `${GH}/MR-Agentix-Tools`,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
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
    metric: { value: '340+', label: 'pages / week' },
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
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
    metric: { value: '3 → 1', label: 'tools consolidated' },
  },
];

interface Client {
  emoji: string;
  name: string;
  industry: string;
  type: string;
  badge: string;
  repo: string;
}

const CLIENTS: Client[] = [
  {
    emoji: '🛡️',
    name: 'AEO Q&A Site',
    industry: 'Insurance · Arvada, CO',
    type: 'AEO-optimized insurance Q&A site',
    badge: 'AEO',
    repo: `${GH}/greg-kostuk-state-farm-arvada`,
  },
  {
    emoji: '🏠',
    name: 'Trill Roofing',
    industry: 'Roofing · Godfrey, IL',
    type: 'AEO-optimized roofing Q&A site',
    badge: 'AEO',
    repo: `${GH}/trill-roofing-godfrey`,
  },
  {
    emoji: '📅',
    name: 'C-rad Field Service Calendar',
    industry: 'Custom operations software',
    type: 'React/Vite scheduling app for field teams',
    badge: 'Custom',
    repo: `${GH}/crad-field-service-calendar`,
  },
];

function RepoLink({ repo }: { repo: string }) {
  return (
    <a
      href={repo}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--accent)] hover:underline"
    >
      View source
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
    </a>
  );
}

export default function Projects() {
  const featured = PROJECTS[0];
  const rest = PROJECTS.slice(1);

  return (
    <section id="projects" className="section section--surface">
      <div className="section__bg">
        <div className="glow-orb glow-orb--emerald" style={{ width: 380, height: 380, top: '5%', left: '-10%', opacity: 0.3 }} />
      </div>
      <div className="container">
        <SectionHeader
          eyebrow="// what we've shipped"
          title={
            <>
              Real systems, <span className="text-gradient">running in production.</span>
            </>
          }
          lede="Not mockups. Tools we built, deployed, and maintain — plus real client work live in the wild."
        />

        {/* Featured */}
        <AnimatedContent delay={0.15}>
          <SpotlightCard className="card card--accent p-8 mb-6" spotlightColor="rgba(0, 229, 160, 0.06)">
            <div className="flex items-start justify-between mb-5 flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="icon-chip">{featured.icon}</div>
                <div>
                  <div className="font-[var(--font-mono)] text-[0.65rem] text-[var(--text-muted)] uppercase tracking-wide">case 01 · flagship</div>
                  <h3 className="text-xl font-semibold text-[var(--text-primary)] leading-tight">{featured.title}</h3>
                </div>
              </div>
              {featured.metric && (
                <div className="text-right">
                  <div className="text-2xl font-bold text-[var(--accent)]">{featured.metric.value}</div>
                  <div className="text-[0.65rem] text-[var(--text-muted)] font-[var(--font-mono)] uppercase">{featured.metric.label}</div>
                </div>
              )}
            </div>
            <p className="text-sm text-[var(--text-secondary)] mb-5 max-w-3xl">{featured.desc}</p>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-5">
              {featured.features.map((f, j) => (
                <li key={j} className="text-sm text-[var(--text-secondary)] flex gap-2">
                  <span className="text-[var(--accent)] mt-0.5 flex-shrink-0">▸</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {featured.stack.map((s) => (
                <span key={s} className="pill pill--sm">{s}</span>
              ))}
            </div>
            {featured.repo && <RepoLink repo={featured.repo} />}
          </SpotlightCard>
        </AnimatedContent>

        {/* Supporting */}
        <div className="grid md:grid-cols-2 gap-6">
          {rest.map((project, i) => (
            <AnimatedContent key={i} delay={0.2 + i * 0.08}>
              <SpotlightCard className="card p-6 h-full flex flex-col" spotlightColor="rgba(0, 229, 160, 0.06)">
                <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="icon-chip">{project.icon}</div>
                    <div>
                      <div className="font-[var(--font-mono)] text-[0.65rem] text-[var(--text-muted)] uppercase tracking-wide">
                        case 0{i + 2}
                      </div>
                      <h3 className="text-lg font-semibold text-[var(--text-primary)] leading-tight">{project.title}</h3>
                    </div>
                  </div>
                  {project.metric && (
                    <div className="text-right">
                      <div className="text-lg font-bold text-[var(--accent)]">{project.metric.value}</div>
                      <div className="text-[0.6rem] text-[var(--text-muted)] font-[var(--font-mono)] uppercase">{project.metric.label}</div>
                    </div>
                  )}
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-4">{project.desc}</p>
                <ul className="space-y-2 mb-4">
                  {project.features.map((f, j) => (
                    <li key={j} className="text-sm text-[var(--text-secondary)] flex gap-2">
                      <span className="text-[var(--accent)] mt-0.5 flex-shrink-0">▸</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.stack.map((s) => (
                      <span key={s} className="pill pill--sm">{s}</span>
                    ))}
                  </div>
                  {project.repo && <RepoLink repo={project.repo} />}
                </div>
              </SpotlightCard>
            </AnimatedContent>
          ))}
        </div>

        {/* Client work */}
        <AnimatedContent delay={0.2}>
          <div className="mt-14">
            <div className="flex items-baseline gap-3 mb-5">
              <span className="eyebrow !mb-0">{'// shipped client work'}</span>
              <span className="text-xs text-[var(--text-muted)] font-[var(--font-mono)]">live in the wild</span>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {CLIENTS.map((c) => (
                <a
                  key={c.name}
                  href={c.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card p-5 no-underline group flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{c.emoji}</span>
                    <span className="tag">{c.badge}</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                      {c.name}
                    </div>
                    <div className="text-xs text-[var(--text-muted)] font-[var(--font-mono)]">{c.industry}</div>
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] mt-auto pt-2">{c.type}</div>
                </a>
              ))}
            </div>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
