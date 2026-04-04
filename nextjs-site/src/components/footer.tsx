export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-10">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <span className="block text-sm text-[var(--text-secondary)] mb-1">
            AI automation that works while you sleep.
          </span>
          <span className="block text-xs text-[var(--text-muted)]">
            © 2026 MR Agentix LLC
          </span>
        </div>
        <nav className="flex flex-wrap justify-center gap-4 text-sm" aria-label="Footer navigation">
          <a href="#services" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline">Services</a>
          <a href="#how-it-works" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline">Process</a>
          <a href="#stack" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline">Stack</a>
          <a href="#projects" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline">Projects</a>
          <a href="#open-source" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline">Open Source</a>
          <a href="#contact" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline">Contact</a>
        </nav>
        <span className="text-sm font-mono text-[var(--text-muted)]">mragentix.ai</span>
      </div>
    </footer>
  );
}
