# Stage 01 — Homepage popup and launcher

Read the four project source documents, then inspect Stage 00 output and the existing Novena modal implementation.

## Goal

Implement the homepage entry experience for `León XIV en Argentina`.

## Build

- add a new Leo-specific popup/modal to `index.html` or a minimal mount rendered by `leon-xiv.js`;
- add persistent campaign launcher;
- use `leo-*` class/id namespace;
- include:
  - `Viaje Apostólico · Argentina 2026`
  - `León XIV en Argentina`
  - `8 — 11 NOV 2026`
  - `Buenos Aires · Córdoba · Luján`
  - dynamic status/countdown area
  - CTA to `leon-xiv-argentina.html`
  - close button;
- implement:
  - Escape close;
  - backdrop close;
  - focus trap;
  - focus restore;
  - body scroll lock;
  - localStorage seen state;
  - reduced-motion behavior.

Auto-open at most once per storage-version during campaign visibility.

Use Buenos Aires timezone.

## Visual

Do not simply recolor `.novena-*`.
Create the new editorial design described in `ASSETS_AND_ART_DIRECTION.md`.

If the existing Pope image is unsuitable, ship a finished typography-led popup rather than a placeholder.

## Do not

- put the itinerary inside the popup;
- change OSA global nav yet;
- add third-party libraries.

## Acceptance criteria

- first eligible visit opens automatically;
- closing works via button, backdrop and Escape;
- reload does not repeatedly auto-open;
- launcher reopens modal;
- keyboard focus stays inside while open;
- focus returns on close;
- popup works at 320px and desktop;
- CTA reaches dedicated page;
- no regressions to Novena/homepage.
