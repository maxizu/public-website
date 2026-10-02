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

  /* Skill-Slider: Fill-Breite und Badge-Position erst beim Sichtbarwerden animieren */
  var sliders = document.querySelectorAll('.skill-slider[data-percent]');
  if (sliders.length) {
    var sliderObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var percent = el.getAttribute('data-percent') + '%';
          var fill = el.querySelector('.skill-slider-fill');
          var badge = el.querySelector('.skill-slider-badge');
          if (fill) fill.style.width = percent;
          if (badge) badge.style.left = percent;
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.3 });
    sliders.forEach(function (el) { sliderObserver.observe(el); });
  }
})();
