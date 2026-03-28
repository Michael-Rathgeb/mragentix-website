/* ============================================
   MR Agentix — main.js
   Navigation, scroll behavior, terminal animation,
   form handling, enhanced scroll animations
   ============================================ */

(function () {
  'use strict';

  // --- DOM Elements ---
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('nav-toggle');
  var navMenu = document.getElementById('nav-menu');
  var navLinks = document.querySelectorAll('.nav__link');
  var sections = document.querySelectorAll('section[id]');
  var contactForm = document.getElementById('contact-form');
  var formStatus = document.getElementById('form-status');

  // --- Nav: scroll border ---
  function handleNavScroll() {
    if (window.scrollY > 10) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // --- Nav: mobile toggle ---
  navToggle.addEventListener('click', function () {
    var isOpen = navMenu.classList.toggle('nav__menu--open');
    navToggle.classList.toggle('nav__toggle--open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile menu on link click
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('nav__menu--open');
      navToggle.classList.remove('nav__toggle--open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close mobile menu on click outside
  document.addEventListener('click', function (e) {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      navMenu.classList.remove('nav__menu--open');
      navToggle.classList.remove('nav__toggle--open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // --- Active section highlighting ---
  var currentActive = null;

  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        if (id !== currentActive) {
          currentActive = id;
          navLinks.forEach(function (link) {
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('nav__link--active');
            } else {
              link.classList.remove('nav__link--active');
            }
          });
        }
      }
    });
  }, {
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0
  });

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });

  // --- Card expand/collapse ---
  var cards = document.querySelectorAll('.card[role="button"]');

  cards.forEach(function (card) {
    card.addEventListener('click', function (e) {
      // Don't toggle if clicking the CTA link inside
      if (e.target.closest('.card__detail-cta')) return;

      var isOpen = card.classList.toggle('card--open');
      card.setAttribute('aria-expanded', isOpen);
    });

    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        var isOpen = card.classList.toggle('card--open');
        card.setAttribute('aria-expanded', isOpen);
      }
    });
  });

  // --- Terminal typewriter replay ---
  var terminalLines = document.querySelectorAll('.terminal__line');

  function replayTerminal() {
    terminalLines.forEach(function (line) {
      line.style.animation = 'none';
      line.offsetHeight; // force reflow
      line.style.animation = '';
    });
  }

  // Replay terminal when it scrolls into view
  var terminal = document.querySelector('.terminal');
  if (terminal) {
    var terminalObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          replayTerminal();
        }
      });
    }, { threshold: 0.3 });

    terminalObserver.observe(terminal);
  }

  // --- Enhanced Scroll-in animations with stagger ---
  var animateEls = document.querySelectorAll('[data-animate]');
  var staggerDelay = 120; // ms between siblings — more pronounced

  var animateObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el = entry.target;

        // Stagger siblings that share the same parent grid/container
        var parent = el.parentElement;
        var siblings = parent.querySelectorAll(':scope > [data-animate]:not(.is-visible)');
        var index = Array.prototype.indexOf.call(siblings, el);
        var delay = Math.max(0, index) * staggerDelay;

        setTimeout(function () {
          el.classList.add('is-visible');
        }, delay);

        animateObserver.unobserve(el);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  animateEls.forEach(function (el) {
    animateObserver.observe(el);
  });

  // --- Back to top button ---
  var backToTop = document.getElementById('back-to-top');

  function handleBackToTop() {
    if (window.scrollY > window.innerHeight) {
      backToTop.classList.add('back-to-top--visible');
    } else {
      backToTop.classList.remove('back-to-top--visible');
    }
  }

  window.addEventListener('scroll', handleBackToTop, { passive: true });
  handleBackToTop();

  // --- Copy install command to clipboard ---
  var copyBtn = document.getElementById('copy-install');
  var installCmd = document.getElementById('install-cmd');

  if (copyBtn && installCmd) {
    copyBtn.addEventListener('click', function () {
      var text = installCmd.textContent;
      navigator.clipboard.writeText(text).then(function () {
        copyBtn.classList.add('opensource__install-copy--copied');
        copyBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
        setTimeout(function () {
          copyBtn.classList.remove('opensource__install-copy--copied');
          copyBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
        }, 2000);
      });
    });
  }

  // --- Contact form: submit to webhook via fetch ---
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var submitBtn = contactForm.querySelector('button[type="submit"]');
      var originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      formStatus.textContent = '';
      formStatus.className = 'form__status';

      var formData = new FormData(contactForm);
      var data = {};
      formData.forEach(function (value, key) {
        data[key] = value;
      });

      fetch(contactForm.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (response) {
          if (response.ok) {
            formStatus.textContent = 'Message sent. We\'ll be in touch within 24 hours.';
            formStatus.classList.add('form__status--success');
            contactForm.reset();
          } else {
            throw new Error('Server error');
          }
        })
        .catch(function () {
          formStatus.textContent = 'Something went wrong. Email us directly at hello@mragentix.ai';
          formStatus.classList.add('form__status--error');
        })
        .finally(function () {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        });
    });
  }

})();
