# Stage 09 — Final QA and ship

Read all source documents. Do not add features.

## Full verification

### Functional
- homepage popup first-view behavior;
- launcher reopen;
- all close methods;
- dedicated page;
- anchor links;
- itinerary;
- time phases;
- official links;
- map links if present;
- related news links.

### Date testing
Retest all preview dates from `PROMPT_SYSTEM.md`.

### Existing-site regression
Check:
- homepage;
- header;
- mobile hamburger;
- footer;
- at least two unrelated existing pages;
- Novena code remains present and non-conflicting.

### Browser/console
- no new console errors;
- no missing new asset 404s;
- no invalid selectors causing failures.

### Responsive
Check all target widths.

### Accessibility
- keyboard;
- focus;
- dialog semantics;
- reduced motion;
- contrast;
- alt text.

### Security
- no secrets;
- no API keys;
- safe external links;
- no unsafe external HTML injection.

### Code hygiene
Search for:
- `TODO`
- `FIXME`
- placeholder copy
- dead debug logs
- duplicate itinerary data

Remove relevant leftovers.

### Production
There is no application build step.
Serve through a local HTTP server and verify final files exactly as they will be deployed.

## Deliver

Update minimal documentation with:
- list of changed/added files;
- how to preview locally;
- how the date preview override works;
- how to update itinerary data;
- how to bump the localStorage version if the popup must auto-open again;
- exact static files that must be uploaded to hosting.

## Final acceptance

The V1 is shippable without another implementation stage.
Do not finish with “ready for next step”.
