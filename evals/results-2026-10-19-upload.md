# Behaviour test results, 2026-10-19: image upload routes

Setup: the 3 new cases `upload-cloud-sandbox`, `upload-local-shell` and `upload-curl-403` from `evals.json`, one run each, played by the Haiku model (the weakest of the available models, on purpose) after reading only the named `SKILL.md` with the new block "Getting an image into the blog". Tools are simulated: the model states the calls it would make, results are given by the tester. Assertions were judged by hand. Not covered: skill triggering, real connector calls, other models, repeated runs.

| Case | Skill | Result |
| --- | --- | --- |
| upload-cloud-sandbox | header-text-card | pass (5/5) |
| upload-local-shell | header-text-card | pass (5/5) |
| upload-curl-403 | post-writer | pass (5/5) |

3 pass, 0 failures. No false success claim: in both cloud cases the model waited for the owner and checked the result with `media_list` before saying it was done; it never tried to paste a 380-420 KB file as base64.

Observations (not failures):

1. In `upload-curl-403` the model, after the upload, set the alt text to a generic "Nagłówek wpisu: <tytuł>". Alt text should describe the picture; worth a sentence in the block if it shows up again.
2. In `upload-local-shell` the model added a `file`/`ls` check before uploading and passed a parameter named `file_name`; the real tool parameter is `filename`. Harmless in a simulation, but tool arguments should be taken from the tool's own description.
3. One subagent ended twice without delivering its report (a harness matter, not a skill result); the case was re-run and judged on that run.

Dependency: route 2 (the owner opens the link in a browser) needs the upload page of MFPro Blog MCP (`GET /upload/{ticket}`), which exists in the code but is not deployed yet. Release these skills only after that deploy; on the current server such a link answers 405.
