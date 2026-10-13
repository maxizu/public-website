# max-z.de

Personal one-page website of Maximilian Zuleger (Software Engineer) – resume, skills, portfolio and contact options.

The site is a pure **static HTML/CSS/vanilla JS website** with no build step, no framework, and no runtime dependencies (aside from Google Fonts/Font Awesome, which are hosted locally).

## Structure

```
index.html              Main page (one-pager: hero, resume, portfolio/skills, contact)
impressum.html          Imprint & privacy policy
robots.txt
sitemap.xml

assets/
  css/
    main.css            Full stylesheet (layout, components, responsive)
    animations.css       Keyframes for scroll-reveal animations
  js/
    nav.js               Burger menu (fullscreen overlay) + active nav link while scrolling
    reveal.js            Scroll-reveal animations (IntersectionObserver) + skill sliders
    typing.js            Typing effect for headings
    piechart.js          SVG circle charts (language skills)
    skills-popup.js       Renders the skills grid + popup detail view from skills-site.json
  data/
    skills.json          Raw skills/portfolio tile data
    skills-site.json     Processed data for skills-popup.js
  img/                   All images (photos, logos, Instagram grid, decoration)
  fonts/
    jetbrains-mono/       Self-hosted variable font (site's main typeface)
    fontawesome/          Font Awesome 5.15.4 (icons)
```

## Running locally

Since this is a purely static site, any simple HTTP server in the project directory will do, e.g.:

```bash
python3 -m http.server 8811
```

The site is then available at `http://localhost:8811/`.

## Maintaining content

### Adding a new job / entry ("Jobs & Education" section)

In `index.html`, inside the `<div class="timeline">` block, insert a new entry following this pattern:

```html
<div class="timeline-event">
  <div class="timeline-event-date">MM.YYYY - MM.YYYY</div>
  <div class="timeline-event-point"></div>
  <div class="timeline-event-content">
    <img src="assets/img/your-logo.png" alt="">
    <h5 class="timeline-event-title">Job Title</h5>
    <span class="timeline-event-caption text-muted">Company Name</span>
  </div>
</div>
```

The order of the blocks determines the position in the timeline (top = most recent). The alternating left/right zigzag layout happens automatically based on the position in the document — no manual numbering needed. Just drop a new company logo image under `assets/img/` and reference it.

### Skills / portfolio tiles

Loaded from `assets/data/skills-site.json` and rendered by `skills-popup.js` (including filter tabs and the click-to-open popup). Add new entries as additional objects in that JSON file.

### Language skills (circle charts)

In `index.html`, in the "Languages" section:

```html
<div class="single-chart" data-percent="100" data-value="5/5" data-label="German"></div>
```

`data-percent` controls how much of the circle is filled, `data-value` and `data-label` control the displayed text.

### Skill sliders ("A passion for")

```html
<div class="skill-slider" data-percent="85">
  <div class="skill-slider-track"><div class="skill-slider-fill"></div><span class="skill-slider-badge">85%</span></div>
  <h6 class="mb-4">Software Development</h6>
</div>
```

## Technical note on animations

Scroll-reveal animations (`reveal.js` + `animations.css`) use the CSS classes `reveal reveal-fadeInLeft`, `reveal-fadeInRight`, `reveal-fadeInUp`, and `reveal-bounceInLeft`. An element animates in as soon as it first enters the viewport, detected via `IntersectionObserver`.

## License / content

All content (texts, photos) is the property of Maximilian Zuleger. No reuse without permission.
