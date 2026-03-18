/* ============================================
   MR Agentix — main.js
   Navigation, scroll behavior, terminal animation, form handling
   ============================================ */

(function () {
  'use strict';

  // --- DOM Elements ---
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('section[id]');
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

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
    const isOpen = navMenu.classList.toggle('nav__menu--open');
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

  // --- Scroll-in animations ---
  var animateEls = document.querySelectorAll('[data-animate]');
  var staggerDelay = 80; // ms between siblings

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

  // --- Stat count-up animation ---
  var statNumbers = document.querySelectorAll('[data-count]');
  var statsCounted = false;

  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1200;
    var start = performance.now();

    function tick(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }

  var statsSection = document.getElementById('stats');
  if (statsSection) {
    var statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !statsCounted) {
          statsCounted = true;
          statNumbers.forEach(function (el) {
            animateCount(el);
          });
          statsObserver.unobserve(statsSection);
        }
      });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
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
            formStatus.textContent = 'Message sent. We\'ll be in touch.';
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
