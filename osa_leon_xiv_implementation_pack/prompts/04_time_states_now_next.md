# Stage 04 — Countdown and pre/during/post visit states

Read docs and current implementation.

## Goal

Make the special adapt to the date/time without pretending to have real-time tracking.

## Implement

Use `America/Argentina/Buenos_Aires`.

Create deterministic helpers for:
- campaign phase: PRE / DURING / POST;
- days/hours until Argentina arrival where appropriate;
- today's events;
- next scheduled event;
- most recent scheduled event;
- end of Argentine leg.

During the trip:
- surface `HOY`;
- surface `PRÓXIMO`;
- use `AHORA` only as a schedule-derived window and avoid language that implies live telemetry.

Add localhost-only preview:
`?leoDate=YYYY-MM-DDTHH:mm`

## Test cases

Verify at least:
- 2026-10-01
- 2026-11-08T16:00
- 2026-11-09T11:40
- 2026-11-10T19:00
- 2026-11-11T14:30
- 2026-12-01

## Do not

- use browser timezone alone;
- call this a GPS/live tracker;
- poll any server.

## Acceptance criteria

- phase changes correctly;
- countdown disappears after arrival;
- during state prioritizes today/next;
- post state is stable and archive-oriented;
- invalid preview values fail safely;
- production ignores preview override.
