# Asset-Migration von max-z.de – Übersicht

Erstellt im Rahmen der Migration von WordPress (https://max-z.de/) zu einer statischen Seite.
Quelle: Haupt-HTML wurde am 16.09.2026 unter `/tmp/max-z-home.html` gespeichert und analysiert.

## 1. Heruntergeladene Dateien

### 1.1 Team-Grid / Skills-Daten (JSON)
- **Datei:** `assets/data/skills.json`
- Extrahiert aus dem JS-Objekt `TGR_MEMBERS` im Haupt-HTML (Team-Grid Plugin).
- **18 Einträge**, valides JSON (mit Python `json.load` verifiziert).
- Enthält: id, title, permalink, custom_url, image, filters, role, description, content (HTML), date, thumbnail, has_thumbnail, social, fields, skills.

### 1.2 Allgemeine Bilder (`assets/img/`)
| Datei | Original-URL | Verwendung |
|---|---|---|
| `home-alternative.jpg` | https://max-z.de/wp-content/uploads/home-alternative.jpg | Hero-Hintergrundbild |
| `maxi2q-1-300x300.jpg` | https://max-z.de/wp-content/uploads/maxi2q-1-300x300.jpg | Profilbild (Resume-Section, fetchpriority=high) |
| `maxi-1.jpg` | https://max-z.de/wp-content/uploads/maxi-1.jpg | Weiteres Profil-/Kontaktbild |
| `coffee.png` | https://max-z.de/wp-content/uploads/coffee.png | Icon Resume-Section |
| `docs.png` | https://max-z.de/wp-content/uploads/docs.png | Icon Resume-Section |
| `cup.png` | https://max-z.de/wp-content/uploads/cup.png | Icon Resume-Section |
| `plant2.png` | https://max-z.de/wp-content/uploads/plant2.png | Icon Resume-Section |
| `BMW_logo.png` | https://max-z.de/wp-content/uploads/BMW_logo.png | Arbeitgeber-Logo |
| `GIGATRONIK_logo.png` | https://max-z.de/wp-content/uploads/GIGATRONIK_logo.png | Arbeitgeber-Logo |
| `audilogo.png` | https://max-z.de/wp-content/uploads/audilogo.png | Arbeitgeber-Logo |
| `logo-2.png` | https://max-z.de/wp-content/uploads/logo-2.png | Website-Logo |
| `logo_break-dark.png` | https://max-z.de/wp-content/uploads/logo_break-dark.png | Website-Logo (dunkle Variante) |

Alle 12 Dateien erfolgreich heruntergeladen (HTTP 200, plausible Dateigröße).

### 1.3 Skills/Team-Grid-Kacheln (`assets/img/skills/`)
36 Dateien (jeweils Voll- und Thumbnail-Version `-150x150`) für alle 18 Skills-Einträge aus `TGR_MEMBERS`, u.a.:
- Programming Languages (`computer-1245714_640.jpg`)
- Machine Learning (`artificial-intelligence-2228610_640.jpg`)
- Virtual Reality (`mobile-phone-1875813_640.jpg`)
- Band (`guitarist-1031087_640.jpg`)
- Social Engagement (`two-315913_1280.jpg`)
- 3D Modeling (`aircraft.jpg`)
- Students' Life e.V. (`sl.jpg`)
- 3D Game Engine (`cry-2.jpg`)
- Jobs @ Audi (`audi-1.jpg`)
- 2D Game Engine (`newmax-3.jpg`)
- CMS (`wordpress-923188_640.jpg`)
- Latex & Other (`latex-97866_640.png`)
- Design (`desktop-1985856_640.jpg`)
- Operating System (`background-720223_640.jpg`)
- Other IT Knowledge (`blog-1.jpg`)
- Bavarian Culture Award (`44406952_743597172662086_1664878111191537161_n-500x500.jpg`)
- Volleyball (`volleyball-499983_640.jpg`)
- Online business card (`bc2-500x320.jpg`)

Alle Bild-URLs stehen zusätzlich referenziert in `skills.json` (Felder `image` und `thumbnail`).
Alle 36 Dateien erfolgreich geladen (0 Fehlschläge).

**Hinweis:** In den `content`-HTML-Feldern von `skills.json` sind weitere eingebettete Bilder verlinkt
(z.B. `bachelorthesis-2.jpg`, `band.jpg`, `ma.jpg`, `maxi.jpg`, `sh.jpg`, `sh2.jpg`, `13731584_...jpg`,
`15400390_...jpg`), die NICHT automatisch heruntergeladen wurden, da sie nur im Fließtext (Beschreibungstext)
der Skills vorkommen und nicht Teil der Kachel-Vorschau sind. Falls diese Inhaltsbilder in der statischen
Seite dargestellt werden sollen, müssen sie noch manuell nachgeladen werden (Original-URLs siehe
`skills.json` → `content`-Feld der jeweiligen Skill-ID).

### 1.4 Instagram-Feed-Bilder (`assets/img/instagram/`)
12 Bilder aus dem Instagram-Feed-Grid heruntergeladen und sprechend benannt (`instagram-01.jpg` … `instagram-12.webp`).

⚠️ **Wichtiger Hinweis:** Die Original-URLs sind signierte, zeitlich befristete CDN-Links von
`scontent-*.cdninstagram.com` mit Ablaufzeitpunkt (`oe=`-Parameter, gültig nur für begrenzte Zeit).
Die hier heruntergeladenen Dateien sind daher der einzige verlässliche Weg, diese Bilder dauerhaft zu
sichern – ein späterer erneuter Download über dieselben URLs wird vermutlich fehlschlagen (404/expired).
Die Original-Post-Links (dauerhaft, für Referenz) sind:
- https://www.instagram.com/p/CG5Sy03pACB/
- https://www.instagram.com/p/CW08k9_s1Gi/
- https://www.instagram.com/p/CQoZwaVhjIc/
- https://www.instagram.com/p/Bp97P_xBGXb/
- https://www.instagram.com/p/Cpai8LiNR1R/
- https://www.instagram.com/p/CYJt3WitIpe/
- (weitere Post-Links im HTML unter `.apif-*`-Markup, siehe `/tmp/max-z-home.html` Zeilen ~860-1160 falls noch verfügbar)

### 1.5 Social-Media-Icons
**Nicht als Bilddateien vorhanden** – die Social-Icons (Facebook, GitHub, LinkedIn, Xing) werden ausschließlich
als Font-Icons über Font Awesome eingebunden (`<i class="fa fa-facebook">` usw.), keine separaten Bilddateien
zum Download vorhanden. Muss bei der statischen Seite über Font Awesome (siehe Punkt 2) oder durch SVG-Icons
nachgebildet werden.

Verwendete Social-Media-Profile (aus dem HTML extrahiert):
- Facebook: https://www.facebook.com/maxi.zuleger
- GitHub: https://github.com/maxizu
- LinkedIn: https://www.linkedin.com/in/maximilian-zuleger-722687129
- Xing: https://www.xing.com/profile/Maximilian_Zuleger

## 2. Font Awesome

Die Seite bindet Font Awesome v5.15.4 auf zwei Arten ein:
1. **Self-hosted CSS** (nur CSS-Datei, keine Font-Dateien lokal vorhanden – 404 beim Testen):
   - `https://max-z.de/wp-content/uploads/font-awesome/v5.15.4/css/svg-with-js.css`
   - Diese CSS-Datei wurde heruntergeladen: `assets/fonts/fontawesome/svg-with-js.css`
2. **CDN (use.fontawesome.com)** – die eigentlichen Font-Dateien (`.woff2`, `.woff`, `.ttf`) werden von hier geladen:
   - `https://use.fontawesome.com/releases/v5.15.4/css/all.css`
   - `https://use.fontawesome.com/releases/v5.15.4/css/v4-shims.css`
   - Webfonts: `https://use.fontawesome.com/releases/v5.15.4/webfonts/fa-{brands-400,regular-400,solid-900}.{woff2,woff,ttf,eot,svg}`

Alle 9 Font-Dateien (solid/regular/brands × woff2/woff/ttf) wurden erfolgreich von der CDN geladen
und liegen unter `assets/fonts/fontawesome/webfonts/`.

**Nicht heruntergeladen:** `.eot` und `.svg`-Varianten (nur für sehr alte IE/Safari-Versionen relevant,
für eine moderne statische Seite nicht notwendig). Bei Bedarf nachladen von:
`https://use.fontawesome.com/releases/v5.15.4/webfonts/fa-{name}.{eot,svg}`

## 3. Impressum / Datenschutz

- **Datei:** `assets/data/impressum-raw.html`
- Enthält den `<article>`-Inhalt (entry-content) von https://max-z.de/impressum/
- Beinhaltet sowohl das Impressum (Kontaktdaten, Verantwortlicher) als auch die komplette
  Datenschutzerklärung (Widerspruchsrecht, Widerrufsrecht, Betroffenenrechte).
- Rohes HTML, muss für die statische Seite noch in sauberes Markup (`impressum.html`) überführt werden
  (WordPress erzeugt teils verschachtelte `<p><p>...</p></p>`-Tags, die bereinigt werden sollten).

**Hinweis:** Auf der Originalseite gibt es zusätzlich ein DSGVO-Cookie-Consent-Popup
(`sp-dsgvo-privacy-popup`) mit weiterem Datenschutztext (Cookie-Kategorien, Google Analytics etc.),
das NICHT im extrahierten `entry-content`-Bereich enthalten ist. Falls auf der statischen Seite
ein Cookie-Banner benötigt wird, muss dieser Text ggf. separat aus der Originalseite entnommen werden
(im rohen Voll-HTML unter `/tmp/max-z-impressum-full.html`, Zeilen ~1000-1080, aktuell nicht dauerhaft
gespeichert).

## 4. Nicht automatisch gefunden / manuell nachzupflegen

- **Content-Bilder in Skills-Beschreibungstexten** (siehe Punkt 1.3) – nur URLs bekannt, nicht heruntergeladen:
  `bachelorthesis-2.jpg`, `band.jpg`, `ma.jpg`, `ma-300x159.jpg`, `maxi.jpg`, `maxi-300x89.jpg`,
  `sh.jpg`, `sh-300x152.jpg`, `sh2.jpg`, `sh2-300x151.jpg`,
  `13731584_1137529822974959_155997813043724429_n.jpg`,
  `15400390_1547655935250011_1560736419684991489_n.jpg`
  (alle unter `https://max-z.de/wp-content/uploads/<name>`)
- **DSGVO-Cookie-Popup-Text** (Cookie-Kategorien-Beschreibung) – nicht separat gesichert, siehe Punkt 3.
- **Font Awesome `.eot`/`.svg` Legacy-Formate** – bewusst nicht geladen (siehe Punkt 2).
- **Social-Media-Icons als Bilddateien** – existieren nicht, nur Font-Icons (siehe Punkt 1.5).
- Es wurde nur die Startseite (`/`) und `/impressum/` analysiert. Falls es weitere Unterseiten
  (z.B. einzelne Skill-Detailseiten unter `/skills/<slug>/`) mit zusätzlichen, bisher nicht erfassten
  Bildern gibt, wurden diese nicht durchsucht.

## 5. Zusammenfassung der Original-URLs (wichtigste Assets)

| Kategorie | Original-URL-Muster |
|---|---|
| Hero-Bild | https://max-z.de/wp-content/uploads/home-alternative.jpg |
| Profilbild | https://max-z.de/wp-content/uploads/maxi2q-1-300x300.jpg |
| Resume-Icons | https://max-z.de/wp-content/uploads/{coffee,docs,cup,plant2}.png |
| Skills-Kacheln | https://max-z.de/wp-content/uploads/<basename>[.jpg\|.png] (+ `-150x150` Thumbnails) |
| Instagram | https://scontent-*.cdninstagram.com/... (signiert, zeitlich befristet) |
| Font Awesome CSS | https://max-z.de/wp-content/uploads/font-awesome/v5.15.4/css/svg-with-js.css |
| Font Awesome CDN | https://use.fontawesome.com/releases/v5.15.4/... |
| Impressum/Datenschutz | https://max-z.de/impressum/ |
