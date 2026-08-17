export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--bg-surface)]/40 overflow-hidden">
      <div className="container py-14">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-10">
          {/* Brand */}
          <div>
            <a href="#hero" className="flex items-center gap-1 text-lg font-bold text-[var(--text-primary)] no-underline mb-3">
              MR Agentix<span className="text-[var(--accent)] animate-pulse">_</span>
            </a>
            <p className="text-sm text-[var(--text-secondary)] max-w-xs mb-5">
              AI automation that works while you sleep. Agents, workflows, and intelligent web systems — shipped in weeks.
            </p>
            <div className="flex items-center gap-2">
              <span className="divider-status__led" />
              <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)]">
                all systems operational
              </span>
            </div>
          </div>

          {/* Explore */}
          <div>
            <span className="block font-[var(--font-mono)] text-xs uppercase tracking-wide text-[var(--text-muted)] mb-3">explore</span>
            <nav className="flex flex-col gap-2 text-sm" aria-label="Footer navigation">
              <a className="footer-link" href="#services">Services</a>
              <a className="footer-link" href="#automation">Automation</a>
              <a className="footer-link" href="#how-it-works">Process</a>
              <a className="footer-link" href="#projects">Projects</a>
              <a className="footer-link" href="#open-source">Open Source</a>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <span className="block font-[var(--font-mono)] text-xs uppercase tracking-wide text-[var(--text-muted)] mb-3">contact</span>
            <a className="footer-link block mb-2" href="mailto:hello@mragentix.ai">hello@mragentix.ai</a>
            <p className="text-sm text-[var(--text-secondary)] mb-1">St. Louis, MO</p>
            <p className="text-sm text-[var(--text-secondary)]">Working nationwide</p>
            <a href="#contact" className="btn btn--outline btn--sm mt-4">Book a discovery call →</a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs text-[var(--text-muted)]">© 2026 MR Agentix LLC</span>
          <span className="text-xs font-[var(--font-mono)] text-[var(--text-muted)]">mragentix.ai</span>
        </div>
      </div>
    </footer>
  );
}
