# ASSETS_AND_ART_DIRECTION.md — León XIV en Argentina · OSA Argentina

## 1. Visual concept

The special should feel like:

**OSA Argentina + major editorial event coverage**

It should not feel like:
- a second unrelated website;
- a news portal;
- a SaaS landing page;
- a generic Vatican template;
- an Argentine patriotic campaign page.

The visual system must be recognizably OSA Argentina, elevated through:
- larger editorial typography;
- stronger spacing;
- fewer but more intentional elements;
- structured chronology;
- high-quality image treatment when approved imagery is available.

---

## 2. Existing brand foundation

Use the repository tokens as primary truth:

```css
--azul: #151f43;
--dorado: #c5a24a;
--gris: #f4f4f4;
--gris-oscuro: #797878;
--rojo: #b22222;
--dorado-claro: #e0c878;
--fuente: "Montserrat", sans-serif;
```

### Functional roles

**Azul `#151f43`**
- primary dark field;
- headings;
- footer/header alignment;
- primary buttons.

**Dorado `#c5a24a`**
- event accent;
- dates;
- timeline markers;
- fine rules;
- labels;
- selected states.

**Dorado claro `#e0c878`**
- light accents on dark backgrounds;
- secondary decorative rules.

**Gris `#f4f4f4`**
- section alternation;
- low-emphasis surfaces.

**Gris oscuro `#797878`**
- secondary text, subject to contrast.

**Rojo `#b22222`**
- sparse emphasis;
- do not turn it into the event’s main color;
- use for exceptional emphasis/status only.

White and near-white backgrounds are allowed.

Derived alpha/tints are allowed.
Do not add a new dominant palette.

---

## 3. Typography

### Display
**Cormorant Garamond**
Use for:
- hero title;
- major section title;
- key day/date editorial moments;
- short pull quote.

Desired quality:
- elegant;
- ecclesial/editorial;
- not ornamental for its own sake.

### UI/body
**Montserrat**
Use for:
- navigation;
- body copy;
- schedules;
- buttons;
- status labels;
- metadata;
- place names.

### Type behavior
Avoid excessively small text.
Avoid all-uppercase paragraphs.
Use uppercase only for short metadata/eyebrows.

The schedule must be scannable from several feet away on mobile.

---

## 4. Popup direction

### Desktop
Prefer an asymmetric editorial composition:
- 40–48% visual / graphic field;
- 52–60% information field.

Alternative if no approved image:
- dark-blue typographic field with very large `08—11`;
- gold linework;
- OSA mark/logo used subtly;
- content panel on white.

### Popup content density
Maximum:
- eyebrow;
- title;
- dates;
- 1 short supporting sentence;
- location line;
- status/countdown;
- primary CTA;
- close.

Do not place the full itinerary in the popup.

### Shape
The existing Novena modal uses 24px rounding.
The new special may use:
- 20–24px desktop radius;
- full-screen / 0 radius on narrow mobile.

Do not make every internal item a card.

### Backdrop
Use deep OSA blue with opacity and modest blur.
No random multicolor gradient.

---

## 5. Special page hero

Two acceptable directions:

### Direction A — approved photograph
Large, carefully cropped approved photo of Leo XIV with a restrained dark overlay.
Text should remain strongly legible.

### Direction B — typography-led
If no approved/high-quality image exists:
- full-width dark OSA blue;
- oversized date numerals;
- Cormorant title;
- gold line/detail;
- subtle texture made with CSS only;
- no fake silhouette and no generated papal portrait.

Both are valid finished designs.
Do not ship a broken-looking “image placeholder”.

---

## 6. Layout

### Global
Follow the current OSA container width logic where practical.

### Special page
Use:
- strong full-width hero;
- centered max-width content;
- editorial sections;
- alternating breathing room;
- clear vertical rhythm.

Avoid:
- 3-column grids everywhere;
- dashboard density;
- nested cards;
- dozens of badges.

### Agenda
Preferred:
- vertical timeline/list;
- time column;
- event/content column;
- location metadata;
- thin gold rule/marker.

On mobile:
- time above event title;
- no side-by-side squeeze.

---

## 7. Spacing

Use a consistent 4/8-based rhythm.

Suggested:
- 8px micro;
- 12/16px control spacing;
- 24px component spacing;
- 40/48px section-internal;
- 72/96px large desktop section separation.

Do not copy these mechanically if the existing page scale makes a nearby value more coherent.

---

## 8. Borders and shadows

Borders:
- thin;
- low contrast;
- gold for intentional event markers;
- light gray for separation.

Shadows:
- popup/dialog may have a strong but soft shadow;
- ordinary agenda blocks should mostly use borders/spacing instead of elevated cards.

Avoid large shadows on every element.

---

## 9. Iconography

Prefer:
- existing Font Awesome where already used;
- small clean inline SVG for feature-specific icons.

Use icons only when they add meaning:
- calendar;
- location;
- external link;
- clock;
- close.

No decorative icon soup.

---

## 10. Photography

### Priority
1. existing approved repository assets;
2. approved OSA/Church-owned originals;
3. official press imagery with verified usage rights;
4. clearly licensed external photography.

Do not hotlink.
Store assets locally.

### Existing candidate
`imagenes/papa-leon-agustinos-madrid.jpeg`

The agent must inspect it before using it as a major hero:
- resolution;
- crop;
- relevance;
- rights already assumed/known by the project owner.

If quality is insufficient, use typography-led hero.

### Never
- AI-generate a fake documentary photo of the Pope;
- use low-resolution social screenshots;
- stretch portrait photos unnaturally;
- overlay so much gradient that the image becomes muddy.

---

## 11. Augustinian identity

The special should acknowledge that Leo XIV is an Augustinian without turning the page into a generic history of the Order.

Possible visual cues:
- OSA logo;
- existing blue/gold palette;
- restrained heart/flame or Augustinian references only if they already belong to OSA visual language;
- one concise contextual section.

Do not invent papal/OSA co-branding marks.

---

## 12. Motion

Motion is supportive, not theatrical.

Good:
- modal enter/exit;
- subtle timeline reveal;
- number/countdown transition;
- hover underline;
- tiny arrow translation;
- status change fade.

Avoid:
- parallax overload;
- scroll hijacking;
- auto-rotating hero;
- constant pulsing;
- bouncing CTAs;
- confetti;
- cinematic page transitions.

Respect:
`prefers-reduced-motion: reduce`.

---

## 13. Interaction states

Every interactive control needs:
- default;
- hover where applicable;
- focus-visible;
- active/pressed;
- disabled if relevant.

Focus treatment should use an OSA-compatible high-contrast ring.

Do not remove browser focus without replacement.

---

## 14. Status design

### PRE
Gold label / countdown.
Calm.

### DURING
More immediate hierarchy:
- `HOY`
- `AHORA` or `PRÓXIMO`
- still avoid alarm-style flashing.

### POST
Remove urgency.
Use archive/recap language.

Do not use red for “live” unless necessary; gold on blue is sufficient.

---

## 15. Loading / empty / error states

The feature is static, so loading UI should be almost unnecessary.

If an image fails:
- layout remains presentable;
- alt text exists;
- no broken critical text.

If event data is unavailable due to JS failure:
- the dedicated page should retain useful static headings/source links where practical.

Never show skeleton loaders for static schedule content.

---

## 16. Responsive direction

### > 1024
Editorial split layouts allowed.

### 768–1024
Collapse complex grids early.
Keep type generous.

### < 768
Single-column.
Schedule becomes linear.
Popup becomes near/full screen.

### < 430
Prioritize:
- date;
- status;
- CTA;
- today/next;
- agenda.

Decorative elements may reduce/disappear.

---

## 17. Accessibility

- color contrast first;
- body copy comfortable;
- no gold small text on white if contrast fails;
- timeline cannot rely only on a colored dot;
- touch targets ~44px where feasible;
- links visibly identifiable;
- modal close is explicit and labeled.

---

## 18. What this must NOT look like

- not a generic SaaS hero;
- not “AI-generated luxury”;
- not glassmorphism-heavy;
- not purple/blue random gradients;
- not a dashboard;
- not a news-card wall;
- not a card for every paragraph;
- not an Argentine-flag themed promotional site;
- not a Vatican-yellow imitation;
- not a political campaign page;
- not a festival/ticketing landing page;
- not a second OSA brand;
- not a clone of `agustinosconelpapa.es`;
- not the Novena modal recolored and renamed.

The existing Novena code is a behavioral reference, not the visual template.

---

## 19. Asset strategy

Priority:
1. existing OSA repo assets;
2. OSA-provided original assets;
3. clearly licensed/official approved assets;
4. assisted generation only for abstract/decorative non-documentary elements if ever necessary;
5. placeholders only during local prototyping, never in final V1.

For every new external asset:
- confirm rights/license;
- store locally;
- record source;
- avoid hotlinking;
- add attribution where required.

---

## 20. Quality bar

The finished result should be:
- visibly more polished than a normal institutional subpage;
- faster to understand than a news article;
- clearly part of OSA Argentina;
- calm, dignified and practical;
- credible enough that users trust the schedule at a glance.
