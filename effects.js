/* PETECH SOLUTIONS — scroll motion effects */
(function () {
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function prepare() {
    const revealTargets = document.querySelectorAll(
      '.section, .service-card, .benefit, .step, .service-hub-card, .values-grid > div, .mission-card, .faq-list details, .cta-section, .about-grid, .hero-panel, .trust-row > div, .intro-grid > div'
    );

    revealTargets.forEach((el, index) => {
      el.classList.add('scroll-reveal');

      if (el.matches('.service-card, .benefit, .step, .service-hub-card, .values-grid > div, .trust-row > div, .intro-grid > div')) {
        el.classList.add(index % 2 === 0 ? 'reveal-left' : 'reveal-right');
      } else {
        el.classList.add('reveal-up');
      }
    });

    document.querySelectorAll('.hero-copy > *').forEach((el, index) => {
      el.classList.add('hero-stagger');
      el.style.setProperty('--hero-delay', (index * 90) + 'ms');
    });

    if (reduceMotion) {
      document.querySelectorAll('.scroll-reveal, .hero-stagger').forEach(el => el.classList.add('is-visible'));
      return;
    }

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.scroll-reveal').forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', prepare);
  else prepare();
})();
