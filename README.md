# max-z.de

Persönliche One-Page-Website von Maximilian Zuleger (Software Engineer) – Lebenslauf, Skills, Portfolio und Kontaktmöglichkeiten.

Die Seite ist eine reine **statische HTML/CSS/Vanilla-JS-Website** ohne Build-Schritt, ohne Framework und ohne externe Abhängigkeiten zur Laufzeit (bis auf Google Fonts/Font Awesome, die lokal eingebunden sind).

## Struktur

```
index.html              Haupt-Seite (One-Pager: Hero, Resume, Portfolio/Skills, Kontakt)
impressum.html          Impressum & Datenschutzerklärung
robots.txt
sitemap.xml

assets/
  css/
    main.css            Gesamtes Stylesheet (Layout, Komponenten, Responsive)
    animations.css       Keyframes für Scroll-Reveal-Animationen
  js/
    nav.js               Burger-Menü (Fullscreen-Overlay) + aktiver Nav-Link beim Scrollen
    reveal.js            Scroll-Reveal-Animationen (IntersectionObserver) + Skill-Slider
    typing.js            Tipp-Effekt für Überschriften
    piechart.js          SVG-Kreisdiagramme (Sprachkenntnisse)
    skills-popup.js       Rendert das Skills-Grid + Popup-Detailansicht aus skills-site.json
  data/
    skills.json          Rohdaten Skills/Portfolio-Kacheln
    skills-site.json     Aufbereitete Daten für skills-popup.js
  img/                   Alle Bilder (Fotos, Logos, Instagram-Grid, Dekoration)
  fonts/
    jetbrains-mono/       Self-hosted Variable Font (Haupt-Schriftart der Seite)
    fontawesome/          Font Awesome 5.15.4 (Icons)
```

## Lokal starten

Da es sich um eine rein statische Seite handelt, reicht ein einfacher HTTP-Server im Projektverzeichnis, z. B.:

```bash
python3 -m http.server 8811
```

Danach ist die Seite unter `http://localhost:8811/` erreichbar.

## Inhalte pflegen

### Neuen Job / neue Station hinzufügen (Abschnitt "Jobs & Education")

In `index.html` im Bereich `<div class="timeline">` einen neuen Block nach diesem Muster einfügen:

```html
<div class="timeline-event">
  <div class="timeline-event-date">MM.JJJJ - MM.JJJJ</div>
  <div class="timeline-event-point"></div>
  <div class="timeline-event-content">
    <img src="assets/img/dein-logo.png" alt="">
    <h5 class="timeline-event-title">Jobtitel</h5>
    <span class="timeline-event-caption text-muted">Firmenname</span>
  </div>
</div>
```

Die Reihenfolge der Blöcke bestimmt die Position in der Timeline (oben = neuestes). Das abwechselnde Links/Rechts-Layout (Zickzack) ergibt sich automatisch aus der Position im Dokument, es muss nichts manuell nummeriert werden. Ein neues Firmenlogo einfach als Bilddatei unter `assets/img/` ablegen und referenzieren.

### Skills / Portfolio-Kacheln

Werden aus `assets/data/skills-site.json` geladen und von `skills-popup.js` gerendert (inkl. Filter-Tabs und Popup bei Klick). Neue Einträge dort als zusätzliches Objekt in der JSON-Datei ergänzen.

### Sprachkenntnisse (Kreisdiagramme)

In `index.html` im Abschnitt "Languages":

```html
<div class="single-chart" data-percent="100" data-value="5/5" data-label="German"></div>
```

`data-percent` steuert den gefüllten Anteil des Kreises, `data-value` und `data-label` den angezeigten Text.

### Skill-Slider ("A passion for")

```html
<div class="skill-slider" data-percent="85">
  <div class="skill-slider-track"><div class="skill-slider-fill"></div><span class="skill-slider-badge">85%</span></div>
  <h6 class="mb-4">Software Development</h6>
</div>
```

## Technischer Hinweis zu Animationen

Scroll-Reveal-Animationen (`reveal.js` + `animations.css`) nutzen die CSS-Klassen `reveal reveal-fadeInLeft`, `reveal-fadeInRight`, `reveal-fadeInUp` bzw. `reveal-bounceInLeft`. Ein Element wird animiert, sobald es per `IntersectionObserver` erstmals ins Viewport kommt.

## Lizenz / Inhalte

Alle Inhalte (Texte, Fotos) sind Eigentum von Maximilian Zuleger. Keine Weiterverwendung ohne Erlaubnis.
