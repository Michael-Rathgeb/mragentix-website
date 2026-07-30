'use client';

import { useEffect, useState } from 'react';

/**
 * Slides in a slim, persistent CTA once the visitor scrolls past the hero.
 * Hides again once the contact section is reached.
 */
export default function StickyCtaBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.85;
      const contact = document.getElementById('contact');
      const rect = contact?.getBoundingClientRect();
      const inContact = rect ? rect.top < window.innerHeight * 0.7 : false;
      setShow(past && !inContact);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`cta-bar ${show ? 'cta-bar--visible' : ''}`}
      role="region"
      aria-label="Book a discovery call"
      aria-hidden={!show}
    >
      <span className="cta-bar__text">
        <strong>Free discovery call</strong> · responds in &lt;24h
      </span>
      <a href="#contact" className="btn btn--primary btn--sm">
        Book a call →
      </a>
    </div>
  );
}
