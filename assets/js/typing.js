/* typing.js – Vanilla-Typing-Effekt, ersetzt typed.js
   Nutzung: <span class="typing" data-typing-text="Hi! I'm ..."></span>
   Enthaltenes HTML in data-typing-text wird zeichenweise eingeblendet. */
(function () {
  var els = document.querySelectorAll('.typing[data-typing-text]');
  if (!els.length) return;

  function typeInto(el) {
    var html = el.getAttribute('data-typing-text');
    // Zerlege HTML in Tags und Text-Zeichen, damit <strong> etc. erhalten bleibt
    var tokens = html.match(/<[^>]+>|[^<]/g) || [];
    var i = 0;
    el.innerHTML = '';
    el.classList.add('is-typing');

    function step() {
      if (i >= tokens.length) {
        el.classList.remove('is-typing');
        el.classList.add('is-done');
        var evt = new CustomEvent('typing-done', { bubbles: true });
        el.dispatchEvent(evt);
        return;
      }
      var token = tokens[i];
      if (token.charAt(0) === '<') {
        el.innerHTML += token;
      } else {
        el.innerHTML += token;
      }
      i++;
      setTimeout(step, 28);
    }
    step();
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          typeInto(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    els.forEach(function (el) { observer.observe(el); });
  } else {
    els.forEach(typeInto);
  }

  // Elemente mit .show-after-typing erst nach Abschluss des ersten Typings zeigen
  document.addEventListener('typing-done', function (e) {
    var container = e.target.closest('h1, .section-header, .contact-header') || document;
    container.querySelectorAll('.show-after-typing').forEach(function (el) {
      el.style.opacity = '1';
    });
  });
})();
