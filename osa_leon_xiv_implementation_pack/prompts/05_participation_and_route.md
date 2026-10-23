# Stage 05 — Participation UX and route overview

Read docs and inspect official itinerary rendering.

## Goal

Answer the practical user question: “¿Dónde puedo seguir/participar?”

## Implement

Create a concise participation section centered on the most public-facing programme items:
- 9 Nov — Mass at Monumento de los Españoles;
- 10 Nov — Mass in Córdoba;
- 10 Nov — Youth Vigil at Monumento de los Españoles;
- 11 Nov — Mass at Luján.

Until access information is officially provided:
- label access as pending;
- do not imply free entry;
- do not imply registration;
- do not invent gates, sectors or times.

Create a lightweight `Recorrido` view:
- Buenos Aires
- Claypole
- Córdoba
- Luján

Use external map links only if useful.
No map SDK/API.

## Acceptance criteria

- section is useful even with pending access information;
- no false CTA exists;
- route is understandable on mobile;
- external map links use safe new-tab attributes when applicable.
