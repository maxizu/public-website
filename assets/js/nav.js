/* nav.js – Burgermenü Toggle, Smooth-Scroll Active-State, Header-Scroll-Effekt */
(function () {
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.main-nav');

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      burger.classList.toggle('is-active', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
    });

    // Menü schließen wenn ein Link geklickt wird (mobil)
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        burger.classList.remove('is-active');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active-Nav-Link je nach sichtbarem Abschnitt setzen
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    navLinks.forEach(function (link) {
      map[link.getAttribute('href').replace('#', '')] = link;
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
})();
