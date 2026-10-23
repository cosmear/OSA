# context.md — León XIV en Argentina · Especial OSA Argentina

## 1. Product definition

We are extending the existing **Orden de San Agustín Argentina (OSA Argentina)** website with a temporary/event-driven special experience for the Apostolic Journey of Pope Leo XIV to Argentina in November 2026.

This is **not a separate website** and **not a redesign of the full OSA site**.

The product has two connected surfaces:

1. **Homepage entry point**
   - A high-impact popup/modal shown on the existing OSA homepage.
   - A persistent launcher remains available while the campaign is active.
   - Its purpose is to announce the visit, show the essential dates/status, and send users to the full special page.

2. **Dedicated special page inside the OSA site**
   - Proposed route/file: `leon-xiv-argentina.html`
   - Uses the same global header, footer, fonts, palette, HTML/CSS/JavaScript stack, and overall institutional identity as the current site.
   - Has a more editorial/event-oriented composition than ordinary OSA pages.
   - Before the visit it prepares users; during the visit it helps them understand what is happening now/next; after the visit it becomes an archive/recap shell.

The full experience should feel like **OSA Argentina hosting a major special coverage**, not like a third-party microsite pasted into the domain.

---

## 2. Why this exists

The current OSA website is an institutional site. The papal visit is a short-lived, high-interest event with different user needs:

- understand when Pope Leo XIV will be in Argentina;
- see the official schedule clearly;
- know the cities and public events;
- quickly find what is happening today / next;
- understand the Augustinian connection without reading a long biography;
- access official information without confusing confirmed facts with local assumptions.

The special should make that information easier to consume than a traditional news article or blog archive.

---

## 3. Primary audiences

### General public
People arriving from search, WhatsApp, social networks or the OSA homepage who mainly want dates, agenda and places.

### OSA / Augustinian community
Parishioners, students, families, pastoral communities and members of Augustinian institutions who want to follow the visit from an Augustinian perspective.

### Young people
Especially relevant for the youth vigil in Buenos Aires on 10 November.

### Existing OSA website visitors
Users who did not specifically come for the papal visit but should be made aware of it without having their normal website experience hijacked.

---

## 4. Core UX principle

**The popup announces. The special page explains and accompanies.**

Do not try to place the whole papal visit inside the modal.

The popup must be concise:
- Pope Leo XIV in Argentina;
- 8–11 November 2026;
- countdown or current state;
- Buenos Aires / Córdoba / Luján;
- one strong primary CTA to the special;
- clear close action.

The dedicated page contains the full experience.

---

## 5. Existing repository / technical reality

Repository: `cosmear/OSA`

The existing website is a static site built with:
- HTML;
- CSS;
- vanilla JavaScript;
- Google Fonts;
- Font Awesome CDN;
- local images/assets.

There is no framework, build pipeline, package manager or database required for the current public site.

Existing shared structure:
- `style.css` contains the global design system and page styles.
- `layout.js` injects the shared header and footer.
- `java.js` contains general interaction logic.
- `index.html` is the homepage.
- `novena.js` implements an existing accessible campaign modal/launcher pattern.
- global fonts are **Cormorant Garamond** and **Montserrat**.
- shared logo is `imagenes/logo_new.png`.

The papal special MUST preserve this architecture unless a concrete repository limitation makes a small additional file necessary.

---

## 6. Existing OSA visual tokens

The current site defines:

```css
:root {
  --azul: #151f43;
  --dorado: #c5a24a;
  --gris: #f4f4f4;
  --gris-oscuro: #797878;
  --rojo: #b22222;
  --dorado-claro: #e0c878;
  --fuente: "Montserrat", sans-serif;
}
```

Primary display typography already in use:
- `"Cormorant Garamond", Georgia, serif`

Body/UI typography:
- `"Montserrat", sans-serif`

These are closed decisions for V1.

Do not replace the palette with Vatican yellow, Argentine flag blue, a new SaaS palette, or arbitrary gradients.

Derived tints/transparencies of existing OSA colors are allowed.

---

## 7. Content scope

### Primary content
- Hero / event identity.
- Dates of the Argentine leg.
- Countdown / event state.
- “Hoy / Ahora / Próximo” behavior during the visit.
- Official itinerary in Argentina.
- City/event navigation.
- Short contextual section about Leo XIV and his Augustinian identity.
- Official-source labeling.
- Practical CTAs only when supported by confirmed information.
- Links to official Vatican sources.

### Secondary content
- 2–3 relevant OSA news items may be surfaced at the bottom.
- They must not dominate the experience.

### Explicitly not a “materials” site
No downloadable campaign-material library, flyer library, catechetical pack, wallpaper pack, social-media kit or similar system in V1.

---

## 8. Official trip data — baseline for V1

As of **21 September 2026**, the Holy See has published the official programme for the Apostolic Journey to Uruguay, Argentina and Peru.

Official sources:
- Vatican programme:
  `https://www.vatican.va/content/leo-xiv/es/travels/2026/documents/uruguay-argentina-peru-6-17novembre2026.html`
- Holy See Press Office programme, published 21 September 2026:
  `https://press.vatican.va/content/salastampa/es/bollettino/pubblico/2026/09/21/210926d.html`

### Argentina: Sunday 8 November 2026
**Montevideo → Buenos Aires**
- 15:30 — Departure from Montevideo to Buenos Aires.
- 16:30 — Arrival at Aeroparque Jorge Newbery; official welcome.
- 17:00 — Visit to the Monument to General San Martín and the Armies of Independence, Plaza San Martín.
- 17:20 — Welcome ceremony at Casa Rosada.
- 17:50 — Visit to the President of the Republic.
- 18:30 — Meeting with authorities, civil society and diplomatic corps at Palacio Libertad.

### Monday 9 November 2026
**Buenos Aires → Claypole → Buenos Aires**
- 09:15 — Visit to staff and residents of Pequeño Cottolengo Don Orione de Claypole.
- 11:30 — Holy Mass at Monumento de los Españoles.
- 16:10 — Meeting with the world of work at Universidad Católica Argentina.
- 17:30 — Meeting with leaders of Christian communities and religious traditions at Palacio San Martín.
- 18:45 — Vespers with the Argentine episcopate and synodal teams at the Metropolitan Cathedral.
- 19:45 — Dinner with bishops at the Archbishop’s residence.

### Tuesday 10 November 2026
**Buenos Aires → Córdoba → Buenos Aires**
- 07:30 — Flight from Buenos Aires to Córdoba.
- 09:00 — Arrival in Córdoba.
- 10:00 — Holy Mass at the grounds of the Military Aviation School.
- 15:15 — Meeting with bishops, priests, deacons, consecrated men and women, seminarians and pastoral workers at Córdoba Cathedral.
- 16:55 — Flight from Córdoba to Buenos Aires.
- 18:10 — Arrival at Aeroparque Jorge Newbery.
- 20:15 — Youth Vigil at Monumento de los Españoles.

### Wednesday 11 November 2026
**Buenos Aires → Luján → Lima**
- 08:00 — Visit to the Federal Prison Complex in Buenos Aires.
- 10:00 — Holy Mass in the square in front of the Basilica of Our Lady of Luján.
- 13:30 — Farewell ceremony at Ministro Pistarini International Airport.
- 14:00 — Departure to Lima.

### Content integrity rule
Anything beyond this programme — admission rules, sectors, entrances, accreditation for the public, transport operations, security restrictions, livestream URLs, local registration, capacity, ticketing, volunteer roles, etc. — is **not to be invented**.

If not confirmed by a trusted official source, show:
- `Información por confirmar`
or omit the detail.

---

## 9. Information hierarchy

The user should understand the following in this order:

1. **What**: Leo XIV is visiting Argentina.
2. **When**: 8–11 November 2026.
3. **Where**: Buenos Aires / Claypole, Córdoba, Luján.
4. **What can I attend / follow?**
5. **What is happening today / next?**
6. **Why this matters to OSA Argentina.**
7. **Official sources / updates.**

News is secondary.

---

## 10. Homepage popup

### Purpose
Create awareness and route users into the special.

### Desktop composition
Recommended:
- visual/photo or strong typographic area on one side;
- event copy on the other;
- generous negative space;
- no dense agenda inside the popup.

Required content:
- eyebrow: `Viaje Apostólico · Argentina 2026`
- title: `León XIV en Argentina`
- date: `8 — 11 NOV 2026`
- locations: `Buenos Aires · Córdoba · Luján`
- dynamic status:
  - before visit: `Faltan N días`
  - during: `El Papa está en Argentina` / next scheduled item
  - after: `Reviví la visita`
- primary CTA: `Ver la visita`
- secondary close action
- OSA identity must be visible but not compete with the event title.

### Mobile
The popup becomes an almost full-screen sheet/page:
- concise;
- no horizontal overflow;
- CTA visible without excessive scrolling;
- close button always reachable;
- text remains readable at 320 px width.

### Opening behavior
V1 rule:
- automatic opening is allowed only while the campaign is active;
- automatic open at most once per browser version using `localStorage`;
- persistent launcher remains available during the campaign;
- query-string preview override is allowed on localhost only;
- `Escape`, backdrop and close button close it;
- focus trap and focus restoration are required;
- body scrolling is locked while open;
- `prefers-reduced-motion` must be respected.

Use a new storage key namespace, e.g.:
`osa-leon-xiv-argentina-2026-v1-seen`

Do not couple this state to the old Novena storage key.

---

## 11. Dedicated special page

Proposed file:
`leon-xiv-argentina.html`

The page remains inside the current site shell:
- shared OSA header;
- shared OSA footer;
- same fonts;
- same global color system.

Recommended page structure:

### A. Event hero
- `León XIV en Argentina`
- `8 — 11 noviembre 2026`
- dynamic countdown/state
- short one-line description
- one CTA to agenda
- optional contextual OSA line: `Un Papa agustino, una visita histórica.`

Avoid exaggerated claims unless sourced. “Histórica” may be used in editorial copy only if the team approves; otherwise use neutral wording.

### B. “La visita en cuatro días”
A visual timeline with four day blocks:
- Sun 8 — Buenos Aires
- Mon 9 — Buenos Aires / Claypole
- Tue 10 — Córdoba / Buenos Aires
- Wed 11 — Buenos Aires / Luján

### C. Full official agenda
Events grouped by date.

Each event card/row:
- time;
- event name;
- place;
- city;
- audience/category where obvious from the official programme;
- official/source state.

Do not overload with card UI. A strong vertical timeline/list is preferred.

### D. “Quiero participar”
Show only events for which public-facing participation is meaningful and information is confirmed.

Until access rules are known:
- show the event;
- show `Información de acceso por confirmar`;
- do not fabricate registration buttons.

Potential public-interest items:
- Mass at Monumento de los Españoles.
- Mass in Córdoba.
- Youth Vigil at Monumento de los Españoles.
- Mass at Luján.

### E. “Recorrido”
V1 can be a lightweight visual route / location list:
- Buenos Aires
- Claypole
- Córdoba
- Luján

Do not add a mapping SDK, paid API or API key for V1.
If map links are useful, use simple external Google Maps links.

### F. “León XIV y la familia agustiniana”
A short editorial block, not a Wikipedia biography:
- Robert Francis Prevost / Leo XIV;
- Augustinian identity;
- concise explanation of why OSA Argentina is following the visit.

Keep it short and source-backed.

### G. Official updates / sources
- source labels;
- last-updated text;
- Vatican programme links;
- no fake “live” feed.

### H. Related OSA news
Maximum 3 items.

---

## 12. Dynamic states

The special has three product states.

### PRE_VISIT
Until the Argentine leg begins on 8 Nov 2026.

Primary job:
- prepare;
- explain;
- count down;
- surface schedule.

### DURING_VISIT
From Argentine arrival through departure to Lima.

Primary job:
- “today”;
- “now / next” based on the fixed official schedule;
- today’s timeline first;
- reduce decorative content above practical information.

This is not a real-time tracking system.
It is a schedule-aware interface.

Never claim a programme item is actually underway based on telemetry; the UI is simply comparing the current Buenos Aires time with scheduled times.

### POST_VISIT
After departure from Argentina on 11 Nov 2026.

Primary job:
- archive the visit;
- remove countdown;
- headline becomes recap-oriented;
- preserve agenda and official links;
- future enhancement may add homilies/photos/video if supplied.

---

## 13. Time handling

Use:
`America/Argentina/Buenos_Aires`

Do not trust the user’s local machine timezone for event-state logic.

The current Novena implementation already contains a useful pattern using:
`Intl.DateTimeFormat(..., { timeZone: "America/Argentina/Buenos_Aires" })`

The new implementation may reuse that approach but should live in its own module/namespace.

---

## 14. Data architecture

The itinerary and campaign dates should exist in **one JavaScript data structure**, not duplicated across the popup and full page.

Recommended file:
`leon-xiv-data.js`

Recommended conceptual structure:

```js
window.LEON_XIV_ARGENTINA_2026 = {
  version: 1,
  updatedAt: "...",
  campaign: {...},
  sources: [...],
  days: [...]
};
```

Then:
- `leon-xiv.js` handles behavior and rendering;
- `leon-xiv.css` contains special-specific styles;
- `index.html` contains only the popup mount/markup or a minimal mount;
- `leon-xiv-argentina.html` contains the page structure.

If the agent finds a simpler pattern that fits the existing repo better, it may adapt, but data duplication is not acceptable.

---

## 15. Existing site integration

### Must reuse
- `layout.js` global header/footer.
- `logo_new.png`.
- existing root CSS variables.
- current font imports.
- vanilla JS conventions.

### Must not disturb
- existing parish/school content;
- news;
- current navigation behavior;
- mobile hamburger;
- existing Novena implementation;
- unrelated pages.

### Navigation
V1 may add a temporary `León XIV` item to the shared navigation **only if it remains visually coherent and does not break mobile navigation**.

If added:
- it links to `leon-xiv-argentina.html`;
- it may receive a subtle gold accent;
- it must not be styled like a sales CTA.

If the existing nav becomes crowded on desktop/mobile, prefer no new nav item and rely on popup + launcher + homepage entry.

---

## 16. Accessibility

Minimum requirements:
- semantic headings;
- `role="dialog"` and `aria-modal="true"` for popup;
- clear accessible name/description;
- keyboard close;
- focus trap;
- focus return;
- minimum usable touch targets;
- visible focus styles;
- sufficient contrast;
- no essential information encoded only by color;
- `prefers-reduced-motion`;
- image alt text;
- timeline remains understandable without CSS/animation.

Target: WCAG 2.1 AA-level behavior for the new surfaces where practical.

---

## 17. Performance

The existing site is static and should remain lightweight.

Requirements:
- no framework migration;
- no new runtime;
- no large JS dependency;
- no map SDK;
- no carousel library;
- no animation library;
- use CSS transitions and small vanilla JS only;
- avoid autoplay video;
- use responsive/local images when available;
- lazy-load non-critical images;
- do not block page rendering on third-party widgets.

The page should remain usable on mobile connections.

---

## 18. Security / privacy

No login.
No database.
No personal data collection.
No public form in V1.
No secrets/API keys.
No analytics change unless explicitly requested later.

External links opened in a new tab must use:
`rel="noopener noreferrer"`.

Do not inject untrusted HTML from external sources.

---

## 19. Responsive behavior

### Desktop
Editorial split layouts, strong typography, wide timeline.

### Tablet
Reduce columns before shrinking type excessively.

### Mobile
Single-column.
Practical information before decorative content.
No tiny labels.
No hover-only interactions.
Popup becomes full-screen or near-full-screen.
Timeline uses a straightforward vertical reading order.

Key widths to verify manually:
- 320
- 375
- 430
- 768
- 1024
- 1440 px

---

## 20. Content tone

Spanish (Argentina), institutional but human.

Avoid:
- marketing hype;
- political framing;
- “campaign” language visible to users;
- clichés about “a once-in-a-lifetime experience”;
- unverified superlatives;
- overly devotional copy where practical information is needed;
- giant paragraphs.

Preferred:
- concise;
- warm;
- authoritative;
- practical;
- Augustinian context used with intention.

---

## 21. Non-goals / Out of Scope

V1 must NOT include:
- rebuilding the OSA website;
- React / Vue / Next.js / Angular;
- Tailwind or a new CSS framework;
- a CMS;
- a database;
- authentication;
- admin backoffice;
- public registration system;
- ticketing;
- volunteer management;
- donations;
- push notifications;
- email capture;
- WhatsApp automation;
- a live GPS tracker;
- a fake “live” data feed;
- a paid map API;
- downloadable “materials” library;
- social-media asset generator;
- auto-scraping Vatican pages;
- AI-generated portraits of the Pope;
- automatic translation;
- a new OSA brand identity.

---

## 22. Open decisions

Only the following remain genuinely open:

1. **Final hero/popup photograph**
   - Inspect existing repository assets first.
   - `imagenes/papa-leon-agustinos-madrid.jpeg` is a candidate already present in the repo, but it must be visually inspected for resolution/crop/appropriateness.
   - If unsuitable, the special can launch with a typography-led hero until an approved image is supplied.

2. **Whether to add a temporary header navigation item**
   - Implement only if it does not crowd/break the existing nav.
   - This is a small implementation decision; it should not block the project.

3. **Public access instructions**
   - Must remain `por confirmar` until an official local source is provided.

No other product decision should block implementation.

---

## 23. Definition of done

V1 is complete when:

- homepage popup works without interfering with existing content;
- popup auto-open behavior is non-annoying and stored locally;
- persistent launcher works;
- dedicated page exists inside the OSA shell;
- official Argentina itinerary is correctly represented;
- event state uses Buenos Aires timezone;
- pre/during/post states work;
- no unverified access instructions are invented;
- design uses current OSA palette and typography;
- responsive behavior is verified at the defined widths;
- keyboard/focus behavior works;
- reduced-motion works;
- no console errors are introduced;
- all links work;
- existing header/mobile nav/footer still work;
- existing Novena code remains intact;
- production build is not applicable because the site is static, but all HTML/CSS/JS must load correctly through a local HTTP server;
- no placeholder code/TODO is left in the feature;
- final instructions explain exactly which files changed and how to deploy them to the current hosting.
