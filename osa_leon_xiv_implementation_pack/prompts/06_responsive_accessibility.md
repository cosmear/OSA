# Stage 06 — Responsive and accessibility pass

Read docs and inspect all new UI.

## Goal

Make the popup and special page robust on mobile, keyboard and reduced-motion environments.

## Verify/fix

Viewport widths:
- 320
- 375
- 430
- 768
- 1024
- 1440

Popup:
- reachable close;
- no overflow;
- logical tab order;
- trap focus;
- return focus;
- Escape;
- backdrop;
- scroll lock.

Page:
- heading hierarchy;
- timeline linearization;
- readable time/place hierarchy;
- touch targets;
- contrast;
- link visibility;
- alt text;
- no hover-only information.

Motion:
- honor `prefers-reduced-motion`.

## Do not

- solve mobile by making text tiny;
- hide critical information;
- introduce duplicate mobile markup unless absolutely necessary.

## Acceptance criteria

- no horizontal page scroll;
- all primary controls keyboard-operable;
- focus visible;
- timeline remains understandable without animation;
- popup usable at 320px;
- no accessibility regression in shared header/mobile menu.
