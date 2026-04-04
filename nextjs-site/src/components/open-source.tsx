'use client';

import { useState } from 'react';
import Terminal from '@/components/terminal';
import CountUp from '@/components/ui/count-up';
import SpotlightCard from '@/components/ui/spotlight-card';
import AnimatedContent from '@/components/ui/animated-content';

const OS_STATS = [
  { number: 3, label: 'npm Packages' },
  { number: 4, label: 'LLM Providers' },
  { number: 15, label: 'Built-in Tools' },
  { number: 22, label: 'Bundled Skills' },
  { number: 7, label: 'Sub-Agents' },
];

const BENTO_ITEMS = [
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/><path d="M16 14H8a4 4 0 0 0-4 4v2h16v-2a4 4 0 0 0-4-4z"/></svg>,
    title: 'Multi-Provider LLM Streaming',
    desc: 'Anthropic, OpenAI, GLM, and Moonshot — unified streaming interface. Switch providers with a single flag. No vendor lock-in.',
    tags: ['Anthropic', 'OpenAI', 'GLM', 'Moonshot'],
    large: true,
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>,
    title: 'Full Terminal UI — 27+ Components',
    desc: 'Built with Ink 6 and React. Markdown rendering, permission prompts, spinners, diffs, session trees, and more — all in your terminal.',
    tags: ['Ink 6', 'React', '27+ Components'],
    large: true,
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
    title: '15 Built-in Tools',
    desc: 'read, write, edit, bash, grep, find, ls, web_fetch, web_search, subagent, tasks, and more.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
    title: 'Plan Mode',
    desc: 'Read-only exploration → write plan → approval → execute. Safe, structured, auditable.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v6"/><path d="M12 17v6"/><path d="m5.6 5.6 4.25 4.25"/><path d="m14.15 14.15 4.25 4.25"/><path d="M1 12h6"/><path d="M17 12h6"/><path d="m5.6 18.4 4.25-4.25"/><path d="m14.15 9.85 4.25-4.25"/></svg>,
    title: '7 Sub-Agents',
    desc: 'bee, owl, deployer, devops, db-manager, payments, workspace — each a specialist.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    title: 'MCP Integration',
    desc: 'Model Context Protocol support. Connect external tool servers and extend capabilities on the fly.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3v12"/><path d="M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M15 6a9 9 0 0 0-9 9"/><path d="M18 15v6"/><path d="M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>,
    title: 'DAG Session Branching',
    desc: 'Fork conversations, explore alternatives, merge results. Full directed acyclic graph session history.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    title: 'Telegram Bot Mode',
    desc: 'Run MR Agentix Coder as a Telegram bot. Same engine, same tools, chat interface.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    title: 'OAuth-Only Auth',
    desc: 'PKCE flow for Anthropic & OpenAI. No API keys pasted in plaintext. Secure by default.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>,
    title: '22 Bundled Skills',
    desc: 'Docker, Stripe, Firebase, Vercel, Prisma, Drizzle, Supabase, Turso, Railway, and 13 more — ready to invoke.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
    title: 'Context Compaction',
    desc: 'LLM-based summarization keeps context windows lean. Long sessions stay fast and focused.',
  },
];

const PACKAGES = [
  { name: '@mragentix/ai', desc: 'LLM provider abstraction layer', url: 'https://www.npmjs.com/package/@mragentix/ai' },
  { name: '@mragentix/agent', desc: 'Agent core, tools, sessions', url: 'https://www.npmjs.com/package/@mragentix/agent' },
  { name: '@mragentix/cli', desc: 'Terminal UI, auth, entry point', url: 'https://www.npmjs.com/package/@mragentix/cli' },
];

export default function OpenSource() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText('npm i -g @mragentix/cli');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="open-source" className="py-[var(--section-pad)] bg-[var(--bg-surface)]">
      <div className="container">
        <AnimatedContent>
          <span className="section-label">// open source</span>
        </AnimatedContent>
        <AnimatedContent delay={0.1}>
          <h2 className="section-title">Not a Wrapper. A Framework.</h2>
        </AnimatedContent>
        <AnimatedContent delay={0.15}>
          <p className="text-[var(--text-secondary)] max-w-3xl mb-10 -mt-4">
            MR Agentix Coder is a production-grade CLI coding agent — a complete alternative to Claude Code, built from scratch as an open-source TypeScript monorepo. 3 packages. 4 LLM providers. Ship from your terminal.
          </p>
        </AnimatedContent>

        {/* Terminal */}
        <AnimatedContent delay={0.2}>
          <Terminal
            title="~"
            className="max-w-2xl mb-10"
            lines={[
              { type: 'command', text: 'npm i -g @mragentix/cli' },
              { type: 'success', text: 'Installed @mragentix/cli@1.0.0' },
              { type: 'command', text: 'mragentix' },
              { type: 'accent', text: '⚡ MR Agentix Coder — ready' },
              { type: 'text', text: 'Provider: claude-sonnet-4-20250514' },
              { type: 'text', text: 'Tools: 15 loaded · Skills: 22 · Agents: 7' },
              { type: 'cursor' },
            ]}
          />
        </AnimatedContent>

        {/* Stats */}
        <AnimatedContent delay={0.25}>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 mb-10">
            {OS_STATS.map((stat, i) => (
              <div key={i} className="text-center">
                <span className="text-2xl font-bold text-[var(--text-primary)]">
                  <CountUp to={stat.number} duration={2} />
                </span>
                <span className="block text-xs text-[var(--text-secondary)] mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </AnimatedContent>

        {/* Bento Grid */}
        <AnimatedContent delay={0.3}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {BENTO_ITEMS.map((item, i) => (
              <SpotlightCard
                key={i}
                className={`rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] p-5 ${
                  item.large ? 'lg:col-span-1 sm:col-span-2 lg:col-span-1' : ''
                }`}
                spotlightColor="rgba(0, 229, 160, 0.06)"
              >
                <div className="text-[var(--accent)] mb-3">{item.icon}</div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">{item.title}</h3>
                <p className="text-xs text-[var(--text-secondary)]">{item.desc}</p>
                {item.tags && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {item.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                )}
              </SpotlightCard>
            ))}
          </div>
        </AnimatedContent>

        {/* Install widget */}
        <AnimatedContent delay={0.35}>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
            <div className="flex items-center gap-3 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-lg px-4 py-3 font-mono text-sm">
              <span className="text-[var(--accent)]">$</span>
              <code className="text-[var(--text-primary)]">npm i -g @mragentix/cli</code>
              <button
                onClick={handleCopy}
                className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors ml-2"
                aria-label="Copy install command"
              >
                {copied ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                )}
              </button>
            </div>
            <div className="flex gap-3">
              <a
                href="https://github.com/MichaelRathworworkseb/MRagentix-framework"
                className="btn btn--outline btn--sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                View on GitHub
              </a>
              <a
                href="https://www.npmjs.com/package/@mragentix/cli"
                className="btn btn--ghost btn--sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                npm →
              </a>
            </div>
          </div>
        </AnimatedContent>

        {/* Package badges */}
        <AnimatedContent delay={0.4}>
          <div className="grid sm:grid-cols-3 gap-4">
            {PACKAGES.map((pkg) => (
              <a
                key={pkg.name}
                href={pkg.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-1 p-4 rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] hover:border-[var(--accent)] transition-colors no-underline"
              >
                <span className="font-mono text-sm font-semibold text-[var(--accent)]">{pkg.name}</span>
                <span className="text-xs text-[var(--text-secondary)]">{pkg.desc}</span>
              </a>
            ))}
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
