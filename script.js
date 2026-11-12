(() => {
  // Mobile menu
  const toggle = document.querySelector('[data-nav-toggle]');
  const list = document.getElementById('nav-list');
  if (toggle && list) {
    const close = () => { toggle.setAttribute('aria-expanded', 'false'); list.classList.remove('is-open'); };
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      list.classList.toggle('is-open', open);
    });
    list.addEventListener('click', (e) => { if (e.target.closest('a')) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && list.classList.contains('is-open')) { close(); toggle.focus(); } });
  }

  // The bar retracts on scroll down and returns on scroll up
  const bar = document.querySelector('[data-bar]');
  if (bar) {
    let last = window.scrollY, ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const menuOpen = list && list.classList.contains('is-open');
        bar.classList.toggle('is-hidden', y > last && y > 240 && !menuOpen && !bar.contains(document.activeElement));
        last = y;
        ticking = false;
      });
    }, { passive: true });
    bar.addEventListener('focusin', () => bar.classList.remove('is-hidden'));
  }

  // One reveal: the realm sheets settle in once
  const items = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -10% 0px' });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add('is-in'));
  }
})();
