# AGENTS.md — Permanent repository rules

## Source of truth

Use this precedence:

1. `context.md` — product, content and expected behavior.
2. `AGENTS.md` — implementation rules.
3. Existing repository code — implemented behavior when it does not contradict the above.
4. Current stage prompt — exact task for this stage.
5. `ASSETS_AND_ART_DIRECTION.md` — visual and asset direction.
6. `PROMPT_SYSTEM.md` — workflow, tools and methodology.

If two sources conflict, follow the higher source and document the conflict briefly.

---

## Scope protection

- Do not invent features.
- Do not expand the special into a redesign of OSA Argentina.
- Do not add systems “for later”.
- Do not add a CMS, database, auth, framework or API without a hard requirement.
- Do not add a new package manager just to support this feature.
- Do not convert static content into a SPA.
- Do not create a separate design language for the papal special.

---

## Existing project protection

Before modifying:
- inspect `index.html`, `style.css`, `layout.js`, `java.js`, `novena.js`;
- inspect relevant image assets;
- understand header/footer injection;
- understand existing responsive rules.

Never:
- rebuild the site from scratch;
- delete valid OSA content;
- rename existing global classes casually;
- rewrite `layout.js` wholesale to add one link;
- remove Novena code because its campaign ended;
- replace working vanilla JS with a framework.

Use new feature-specific class names prefixed with `leo-` or similarly collision-safe naming.

---

## Implementation rules

Prefer:
- plain HTML;
- CSS using existing root tokens;
- small vanilla JavaScript modules/files;
- one source of truth for itinerary data;
- progressive enhancement;
- semantic markup;
- explicit names;
- small, readable functions;
- minimal global state.

Avoid:
- overengineering;
- premature abstractions;
- custom component systems;
- unnecessary utility layers;
- inline styles except for data-driven values when unavoidable;
- huge monolithic JS functions;
- duplicate itinerary/content objects;
- `innerHTML` with untrusted external content.

---

## Content integrity

The programme is factual/event information.

Rules:
- official Vatican programme is the baseline;
- never fabricate access, ticket, sector, accreditation, transport or security information;
- if a detail is unconfirmed, say `Información por confirmar` or omit it;
- preserve event times exactly unless an official update changes them;
- centralize `updatedAt` and source links;
- do not silently “improve” official names into unsupported claims.

---

## Technology lock

The current project is:
- HTML;
- CSS;
- vanilla JavaScript.

Do not introduce:
- React;
- Next.js;
- Vue;
- Angular;
- Svelte;
- Tailwind;
- Bootstrap;
- a bundler;
- a build pipeline;
- TypeScript.

No package dependency is justified for V1.

---

## Visual rules

- Use existing OSA colors and typography.
- The special may be more editorial and event-oriented, but must still look native to OSA Argentina.
- Do not use Argentine flag colors as a replacement brand.
- Do not use generic Vatican yellow as the primary visual identity.
- Do not use glassmorphism-heavy UI.
- Do not turn every section into a rounded card.
- Do not make the popup a dashboard.
- Do not create fake official seals or emblems.

---

## Popup behavior

The popup must:
- be dismissible;
- never trap users permanently;
- auto-open at most once per local storage version;
- preserve focus;
- close with Escape;
- close via explicit close control;
- support backdrop close;
- lock body scroll while open;
- respect reduced motion;
- remain fully usable on mobile.

Use a new storage key. Do not reuse Novena storage.

---

## Time logic

Use `America/Argentina/Buenos_Aires`.

Do not infer “now” from browser-local timezone alone.

The during-visit “now/next” status is schedule-aware, not a live-tracking claim.

---

## Testing

Do not call a stage complete until:
- affected pages load through a local HTTP server;
- no new console errors exist;
- desktop and mobile layouts are checked;
- keyboard navigation is checked for interactive UI;
- modified links work;
- unrelated OSA pages are not visibly broken.

If a bug is found, fix it before moving on.

---

## Visual verification

For visual work:
- inspect in a real browser whenever available;
- use screenshots if available;
- test multiple viewport widths;
- do not accept “CSS compiles” as visual QA.

---

## Security

- no secrets;
- no API keys;
- no service keys;
- no remote HTML injection;
- validate/escape any future external data before rendering;
- use `noopener noreferrer` on new-tab links.

---

## Autonomous decisions

Do not ask for approval on minor implementation choices such as:
- exact spacing within the documented visual system;
- internal file organization;
- small responsive breakpoints;
- animation duration;
- naming internal helper functions;
- whether a border is 1px or 2px when visually coherent;
- whether a decorative line is 48px or 56px.

Choose a sensible default and continue.

Only stop for a missing decision that changes architecture, public facts, legal rights or core product scope.

---

## Finish the job

Do not stop at:
- “structure created”;
- “foundation ready”;
- “styles prepared”;
- “the next step is implementation”.

Each stage must satisfy its acceptance criteria completely before moving to the next stage.

No placeholder code.
No truncated files.
No empty handlers.
No `TODO` replacing required behavior.
