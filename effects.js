/* PETECH SOLUTIONS — vertical browsing motion */
(function () {
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let lastY = window.scrollY;
  let direction = 'down';

  window.addEventListener('scroll', function () {
    const y = window.scrollY;
    direction = y >= lastY ? 'down' : 'up';
    lastY = y;
  }, { passive: true });

  function prepare() {
    const revealTargets = document.querySelectorAll(
      '.section, .service-card, .benefit, .step, .service-hub-card, .values-grid > div, .mission-card, .faq-list details, .cta-section, .about-grid, .hero-panel, .trust-row > div, .intro-grid > div'
    );

    revealTargets.forEach(function (el) {
      el.classList.add('scroll-reveal', 'reveal-vertical');
    });

    document.querySelectorAll('.hero-copy > *').forEach(function (el, index) {
      el.classList.add('hero-stagger');
      el.style.setProperty('--hero-delay', (index * 90) + 'ms');
    });

    if (reduceMotion || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.scroll-reveal, .hero-stagger').forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.remove('motion-up', 'motion-down');
          entry.target.classList.add('is-visible');
        } else if (entry.boundingClientRect.top < 0) {
          entry.target.classList.remove('is-visible', 'motion-down');
          entry.target.classList.add('motion-up');
        } else {
          entry.target.classList.remove('is-visible', 'motion-up');
          entry.target.classList.add('motion-down');
        }
      });
    }, {
      threshold: 0.10,
      rootMargin: '0px 0px -8% 0px'
    });

    document.querySelectorAll('.scroll-reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', prepare);
  } else {
    prepare();
  }
})();
