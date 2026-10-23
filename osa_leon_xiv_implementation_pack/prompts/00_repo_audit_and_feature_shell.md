# Stage 00 — Audit repository and prepare the feature shell

Before implementing, read:
- `context.md`
- `AGENTS.md`
- `PROMPT_SYSTEM.md`
- `ASSETS_AND_ART_DIRECTION.md`

Then inspect the current repository, especially:
- `index.html`
- `style.css`
- `layout.js`
- `java.js`
- `novena.js`
- `imagenes/`

## Goal

Prepare the minimum file structure for the Leo XIV special without changing existing product behavior yet.

## Scope

1. Confirm the repository is static HTML/CSS/JS.
2. Confirm shared header/footer injection behavior.
3. Confirm OSA root CSS variables and font imports.
4. Inspect existing papal imagery, especially:
   - `imagenes/papa-leon-agustinos-madrid.jpeg`
5. Create, if consistent with the repo:
   - `leon-xiv-argentina.html`
   - `leon-xiv.css`
   - `leon-xiv-data.js`
   - `leon-xiv.js`
6. Link the special CSS/scripts only where needed.
7. Create a minimal semantic shell for the dedicated page using the existing header/footer containers.

## Do not

- build the popup yet;
- populate the full agenda yet;
- redesign the global header/footer;
- modify Novena behavior;
- add dependencies.

## Acceptance criteria

- dedicated page loads through local HTTP server;
- OSA shared header/footer render;
- OSA fonts/colors load;
- no console errors;
- existing homepage still behaves exactly as before;
- new files contain no fake functionality presented as complete.

Run and verify before continuing.
