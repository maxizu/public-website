/* nav.js – Vollbild-Navigationspanel (wie im Original-Theme):
   Ein fixer Hamburger-Button oben rechts öffnet ein Overlay-Menü.
   Zusätzlich: aktiver Nav-Link je nach sichtbarem Abschnitt,
   sowie Burger-Farbe hell/dunkel je nach Hintergrund der Section. */
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

  // Burger dunkel einfärben, sobald eine helle Section im oberen Bereich sichtbar ist
  var lightSections = document.querySelectorAll('.bg-light');
  if (burger && lightSections.length && 'IntersectionObserver' in window) {
    var lightObserver = new IntersectionObserver(function (entries) {
      var anyLightNearTop = false;
      entries.forEach(function (entry) {
        if (entry.isIntersecting) anyLightNearTop = true;
      });
      burger.classList.toggle('on-light', anyLightNearTop);
    }, { rootMargin: '-10px 0px -85% 0px', threshold: 0 });
    lightSections.forEach(function (s) { lightObserver.observe(s); });
  }
})();

