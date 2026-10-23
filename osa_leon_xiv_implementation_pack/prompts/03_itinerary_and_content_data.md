# Stage 03 — Central official itinerary data and rendering

Read project docs and inspect current code.

## Goal

Create one canonical itinerary data source and render the official Argentine programme consistently.

## Source

Use only the official baseline documented in `context.md`.

## Implement

In `leon-xiv-data.js` (or the simplest equivalent):
- campaign dates;
- `updatedAt`;
- source URLs;
- day list;
- event time;
- event title;
- venue;
- city;
- optional event category.

Render the dedicated page agenda from this source.

The homepage popup may consume only summary fields from the same source.

## Information states

For public-interest events without confirmed local access details:
show `Información de acceso por confirmar`.

Do not add a registration CTA unless an actual official URL exists in source data.

## Do not

- duplicate event arrays in HTML and JS;
- scrape external pages at runtime;
- invent access/transport/security/ticketing information.

## Acceptance criteria

- all Argentina events/times in `context.md` appear correctly;
- schedule is grouped by day;
- event rendering remains readable if some optional fields are absent;
- source links are visible;
- `updatedAt` is surfaced appropriately;
- no contradictory schedule copies exist.
