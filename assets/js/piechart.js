/* piechart.js – SVG-Kreisdiagramme für Sprachkenntnisse, ersetzt easyPieChart
   Nutzung: <div class="single-chart" data-percent="100" data-value="5/5" data-label="German"></div>
   Wird beim Sichtbarwerden animiert (stroke-dashoffset). */
(function () {
  var charts = document.querySelectorAll('.single-chart[data-percent]');
  if (!charts.length) return;

  var RADIUS = 73;
  var CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  charts.forEach(function (el) {
    var percent = parseFloat(el.getAttribute('data-percent')) || 0;
    var value = el.getAttribute('data-value') || '';
    var label = el.getAttribute('data-label') || '';

    var svgNS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 150 150');

    var bg = document.createElementNS(svgNS, 'circle');
    bg.setAttribute('cx', 75);
    bg.setAttribute('cy', 75);
    bg.setAttribute('r', RADIUS);
    bg.setAttribute('class', 'chart-circle-bg');

    var fg = document.createElementNS(svgNS, 'circle');
    fg.setAttribute('cx', 75);
    fg.setAttribute('cy', 75);
    fg.setAttribute('r', RADIUS);
    fg.setAttribute('class', 'chart-circle-value');
    fg.setAttribute('stroke-dasharray', CIRCUMFERENCE);
    fg.setAttribute('stroke-dashoffset', CIRCUMFERENCE);

    svg.appendChild(bg);
    svg.appendChild(fg);
    el.appendChild(svg);

    // Text als HTML-Overlay (wie im Original: Wert gross + "/5" klein,
    // darunter der Sprachname in Grossbuchstaben), zentriert im Kreis.
    var content = document.createElement('div');
    content.className = 'chart-content';

    var valueParts = value.split('/');
    var valueEl = document.createElement('span');
    valueEl.className = 'value';
    if (valueParts.length === 2) {
      var b = document.createElement('b');
      b.textContent = valueParts[0];
      valueEl.appendChild(b);
      valueEl.appendChild(document.createTextNode('/' + valueParts[1]));
    } else {
      valueEl.textContent = value;
    }
    content.appendChild(valueEl);

    if (label) {
      var titleEl = document.createElement('span');
      titleEl.className = 'title';
      titleEl.textContent = label;
      content.appendChild(titleEl);
    }

    el.appendChild(content);

    el._animate = function () {
      var offset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;
      fg.style.strokeDashoffset = offset;
    };
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target._animate();
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    charts.forEach(function (el) { observer.observe(el); });
  } else {
    charts.forEach(function (el) { el._animate(); });
  }
})();
