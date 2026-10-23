# Implementation pack

This package converts the agreed Leo XIV Argentina / OSA Argentina concept into an autonomous implementation system for Codex, Claude Code or Antigravity.

## Files

- `context.md` — product/source of truth
- `AGENTS.md` — permanent agent rules
- `PROMPT_SYSTEM.md` — stack/workflow/skills
- `ASSETS_AND_ART_DIRECTION.md` — visual system
- `MASTER_PROMPT.md` — one prompt to execute the whole implementation
- `prompts/` — sequential stages

## Prompt order

1. `00_repo_audit_and_feature_shell.md`
2. `01_home_popup_entrypoint.md`
3. `02_special_page_core.md`
4. `03_itinerary_and_content_data.md`
5. `04_time_states_now_next.md`
6. `05_participation_and_route.md`
7. `06_responsive_accessibility.md`
8. `07_visual_polish_and_performance.md`
9. `08_content_source_audit.md`
10. `09_ship.md`

The split keeps the existing static OSA website functional while first establishing the shell, then the entry popup, then the complete page/data/state behavior, and finally QA/polish/shipping.
