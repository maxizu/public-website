/* skills-popup.js – Rendert das Skills/Portfolio-Masonry-Grid aus skills-site.json,
   filterbar nach Kategorie (All/IT/Social/Sport) und öffnet beim Klick ein Popup
   mit den Detailinhalten (Zoom-Animation). */
(function () {
  var grid = document.getElementById('skills-grid');
  if (!grid) return;

  var overlay = document.getElementById('skills-popup-overlay');
  var popupBox = overlay ? overlay.querySelector('.popup-box') : null;
  var filterTabs = document.querySelectorAll('.filter-tab');

  fetch('assets/data/skills-site.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var entries = Object.keys(data)
        .map(function (k) { return data[k]; })
        .sort(function (a, b) { return b.id - a.id; });

      entries.forEach(function (item, idx) {
        var imgSrc = item.image || item.thumbnail;
        if (!imgSrc) return;
        var tile = document.createElement('div');
        tile.className = 'masonry-item skill-item reveal reveal-fadeInUp';
        tile.setAttribute('data-filter', item.filters || '');
        tile.style.animationDelay = (idx % 6) * 0.06 + 's';
        tile.innerHTML =
          '<img src="' + imgSrc + '" alt="' + escapeHtml(item.title) + '">' +
          '<span class="tile-caption">' + escapeHtml(item.title) + '</span>';
        tile.addEventListener('click', function () { openPopup(item); });
        grid.appendChild(tile);
      });

      // erneut beobachten, da Elemente nach reveal.js-Initialisierung eingefügt wurden
      if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries2, obs) {
          entries2.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 });
        grid.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });
      } else {
        grid.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in-view'); });
      }
    })
    .catch(function (err) { console.error('Skills konnten nicht geladen werden', err); });

  // Filter-Tabs
  filterTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      filterTabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      var filter = tab.getAttribute('data-filter');
      grid.querySelectorAll('.skill-item').forEach(function (item) {
        var show = filter === 'all' || item.getAttribute('data-filter') === filter;
        item.style.display = show ? '' : 'none';
      });
    });
  });

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function openPopup(item) {
    if (!overlay || !popupBox) return;
    var imgHtml = item.image ? '<img src="' + item.image + '" alt="' + escapeHtml(item.title) + '">' : '';
    var linkHtml = item.custom_url
      ? '<p><a href="' + item.custom_url + '" target="_blank" rel="noopener">' + item.custom_url + '</a></p>'
      : '';
    popupBox.innerHTML =
      '<button type="button" class="popup-close" aria-label="Schließen">&times;</button>' +
      '<h3>' + escapeHtml(item.title) + '</h3>' +
      imgHtml +
      '<div class="popup-content">' + item.content + '</div>' +
      linkHtml;

    popupBox.querySelector('.popup-close').addEventListener('click', closePopup);
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closePopup() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closePopup();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closePopup();
    });
  }
})();
