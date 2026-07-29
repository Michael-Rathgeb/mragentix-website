'use client';

import { useState, useEffect, useCallback } from 'react';
import GlitchText from '@/components/ui/glitch-text';

const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#automation', label: 'Automation' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#stack', label: 'Stack' },
  { href: '#projects', label: 'Projects' },
  { href: '#open-source', label: 'Open Source' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#nav-menu') && !target.closest('#nav-toggle')) {
        closeMenu();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen, closeMenu]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--bg-base)]/90 backdrop-blur-md border-b border-[var(--border)]'
          : 'bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-0 text-lg font-bold text-[var(--text-primary)] no-underline">
          <GlitchText speed={0.7} enableOnHover className="!text-lg !font-bold !mx-0">
            MR Agentix
          </GlitchText>
          <span className="text-[var(--accent)] animate-pulse">_</span>
        </a>

        <button
          id="nav-toggle"
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-6 h-0.5 bg-[var(--text-primary)] transition-transform duration-300 ${
              menuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[var(--text-primary)] transition-opacity duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[var(--text-primary)] transition-transform duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>

        <nav
          id="nav-menu"
          className={`${
            menuOpen
              ? 'flex flex-col absolute top-16 left-0 right-0 bg-[var(--bg-base)]/95 backdrop-blur-md border-b border-[var(--border)] p-6 gap-4'
              : 'hidden'
          } md:flex md:static md:flex-row md:items-center md:gap-6 md:p-0 md:bg-transparent md:border-0`}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={`text-sm transition-colors duration-200 no-underline ${
                activeSection === link.href.slice(1)
                  ? 'text-[var(--accent)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={closeMenu}
            className="btn btn--outline"
          >
            Get a Free Audit →
          </a>
        </nav>
      </div>
    </header>
  );
}
