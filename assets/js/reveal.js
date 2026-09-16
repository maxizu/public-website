/* reveal.js – Scroll-Reveal-Animationen via IntersectionObserver
   Ersetzt WOW.js / Animate.css-Trigger.
   Nutzung: <div class="reveal reveal-fadeInLeft"> ... </div>
   Sobald das Element ins Viewport kommt, wird "in-view" hinzugefügt,
   was die passende Keyframe-Animation aus animations.css startet. */
(function () {
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in-view'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(function (el) { observer.observe(el); });

  /* Progress-Bars: Breite erst beim Sichtbarwerden animieren */
  var bars = document.querySelectorAll('.progress-bar[data-percent]');
  if (bars.length) {
    var barObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          el.style.width = el.getAttribute('data-percent') + '%';
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(function (el) { barObserver.observe(el); });
  }
})();
