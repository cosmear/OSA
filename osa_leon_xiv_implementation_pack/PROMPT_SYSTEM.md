# PROMPT_SYSTEM.md — Agent execution methodology

## Workflow

For every implementation stage:

READ
→ INSPECT
→ PLAN
→ IMPLEMENT
→ RUN
→ TEST
→ FIX
→ VERIFY
→ CONTINUE

Planning should be proportional to the task.
Do not create a large planning document before every small edit.

---

## Required skills

At the start of work, attempt to install these skills if they are not already available:

```bash
npx skills add https://github.com/Leonxlnx/taste-skill --skill gpt-taste
npx skills add https://github.com/Leonxlnx/taste-skill --skill redesign-existing-projects
npx skills add https://github.com/Leonxlnx/taste-skill --skill full-output-enforcement
npx skills add https://github.com/Leonxlnx/taste-skill --skill high-end-visual-design
npx skills add https://github.com/Leonxlnx/taste-skill --skill image-to-code
```

If a skill already exists, do not repeatedly reinstall it.
If installation says it already exists, continue.
If an optional external installation problem occurs, document it and continue with the repository work rather than blocking the entire project.

### gpt-taste
Use as a general visual-quality guardrail.
Avoid generic layouts, visual sludge, weak hierarchy and arbitrary decoration.

### redesign-existing-projects
Mandatory mindset for this repository:
- audit first;
- preserve what works;
- improve surgically;
- do not rebuild OSA from scratch.

### full-output-enforcement
Use to prevent:
- partial implementations;
- omitted handlers;
- placeholder sections;
- truncated CSS/JS;
- comments standing in for finished code.

### high-end-visual-design
Use for the popup and special page:
- typography;
- hierarchy;
- rhythm;
- composition;
- motion;
- details;
- perceived quality.

Do not turn the result into generic premium SaaS.
`ASSETS_AND_ART_DIRECTION.md` remains authoritative.

### image-to-code
Use only when actual visual references/screenshots/assets are available.
Inspect the reference before reproducing it.

---

## Technology

### Runtime
Browser-native static website.

### Languages
- HTML5
- CSS3
- JavaScript (ES6+ supported by modern browsers)

### Framework
None.

### Package manager
None required for the product.

`npx` is used only for agent skills, not as an application runtime dependency.

### Fonts
Existing Google Fonts import:
- Cormorant Garamond
- Montserrat

### Icons
Existing Font Awesome CDN and/or small inline SVG where the repo already follows that pattern.

Prefer small inline SVG for feature-specific UI icons when it avoids adding a dependency.

### Database
None.

### Backend
None.

### Hosting
Keep compatible with the current static hosting/cPanel-style deployment used by the OSA site.

### Integrations
V1:
- official external Vatican links;
- optional external Google Maps links;
- no API integration.

### State/persistence
Browser `localStorage` only for dismiss/seen state.

---

## Recommended feature files

The agent must inspect the repo before finalizing file placement, but this is the preferred shape:

```text
index.html
style.css
layout.js
java.js
novena.js

leon-xiv-argentina.html
leon-xiv.css
leon-xiv-data.js
leon-xiv.js
```

Why separate `leon-xiv.css`:
- the current `style.css` is already large;
- the special has a clear lifecycle;
- separation reduces regression risk;
- the file still consumes the same global tokens.

Why separate data:
- popup and full page share the itinerary;
- content/status must not drift.

Why separate behavior:
- avoids coupling new event-state logic to general `java.js`.

Do not create more files unless useful.

---

## Script loading

Order should be deliberate.

When a page needs special behavior:
1. shared/global scripts;
2. `leon-xiv-data.js`;
3. `leon-xiv.js`.

Use `defer` if compatible with existing code and DOM assumptions, or preserve the repo's existing bottom-of-body pattern.

Do not create race conditions with `layout.js`.

---

## Implementation strategy

### Phase 1 — functional MVP
Build the main flow end-to-end:
- popup;
- dedicated page;
- central itinerary data;
- countdown/state;
- agenda;
- source links.

### Phase 2 — robustness
- edge dates;
- during-visit now/next logic;
- localStorage behavior;
- focus management;
- no-JS readable baseline where practical.

### Phase 3 — responsive/accessibility
- mobile sheet/modal;
- keyboard;
- focus;
- reduced motion;
- contrast;
- touch targets.

### Phase 4 — visual polish
- type scale;
- spacing;
- motion;
- subtle decorative details;
- crop/asset treatment.

### Phase 5 — performance/ship
- asset size;
- lazy loading;
- console;
- link verification;
- deploy instructions.

---

## Local verification

Because there is no build tool, use a local HTTP server from repository root.

Preferred simple command:

```bash
python -m http.server 8000
```

Then open:
- `http://localhost:8000/`
- `http://localhost:8000/leon-xiv-argentina.html`

Do not rely only on `file://` because browser behavior may differ.

---

## Date-state testing

Support a **localhost-only preview override** for testing state, similar to the existing Novena pattern.

Recommended:
`?leoDate=2026-11-09T11:40`

Only honor this override when hostname is:
- `localhost`
- `127.0.0.1`

Production must always use the actual clock.

Test at least:
- 2026-10-01 — pre-visit;
- 2026-11-08 16:00 — before arrival;
- 2026-11-09 11:40 — during an event window;
- 2026-11-10 19:00 — before youth vigil;
- 2026-11-11 14:30 — post-departure;
- a date well after the visit.

---

## Testing without adding a framework

Do not add Jest/Vitest/Playwright only for this static feature unless the repository already has them.

Use:
- browser QA;
- DevTools console;
- keyboard QA;
- viewport QA;
- lightweight deterministic helper-function checks in dev console if needed.

If browser automation is already available in the agent environment, use it without making it a new application dependency.

---

## Completion discipline

After every stage:
1. reload affected pages;
2. inspect console;
3. test primary interaction;
4. test narrow viewport;
5. fix regressions;
6. only then continue.

The final stage must verify the entire product, not only the last file modified.
