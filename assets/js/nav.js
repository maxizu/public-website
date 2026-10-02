/* nav.js – Vollbild-Navigationspanel (wie im Original-Theme):
   Ein fixer Hamburger-Button oben rechts öffnet ein Overlay-Menü.
   Zusätzlich: aktiver Nav-Link je nach sichtbarem Abschnitt. */
(function () {
  var burger = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');
  var body = document.body;

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var isOpen = !body.classList.contains('nav-open');
      body.classList.toggle('nav-open', isOpen);
      burger.classList.toggle('is-active', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        body.classList.remove('nav-open');
        burger.classList.remove('is-active');
        burger.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        body.classList.remove('nav-open');
        burger.classList.remove('is-active');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Active-Nav-Link je nach sichtbarem Abschnitt setzen
  var sections = document.querySelectorAll('section[id]');
  var navLinks = nav ? nav.querySelectorAll('a[href^="#"]') : [];

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href').replace('#', '');
      map[href] = link;
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = map[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove('active'); });
          link.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

    sections.forEach(function (s) { observer.observe(s); });
  }

  // Burger-Kontrast je nach Hintergrund des Abschnitts, der sich gerade
  // hinter dem Button befindet (dunkle Linien auf hellem Grund, helle
  // Linien auf dunklem Grund) - ohne Backdrop-Kreis, wie im Original.
  function updateBurgerContrast() {
    if (body.classList.contains('nav-open')) return;
    var x = Math.round(window.innerWidth / 2);
    var y = 55;
    var el = document.elementFromPoint(x, y);
    var isDark = false;
    while (el && el !== document.body) {
      if (el.classList && (el.classList.contains('bg-dark') || el.classList.contains('hero'))) {
        isDark = true;
        break;
      }
      if (el.tagName === 'FOOTER') {
        isDark = true;
        break;
      }
      el = el.parentElement;
    }
    body.classList.toggle('on-light', !isDark);
  }

  updateBurgerContrast();
  window.addEventListener('scroll', updateBurgerContrast, { passive: true });
  window.addEventListener('resize', updateBurgerContrast);
})();

