---
doc: checklist
status: approved
---

# Build Checklist

Build mode: fast — inferred from the learner’s instruction to prioritize implementation/testing and report only blockers; preserve early and final hands-on feedback.

Technical blueprint and build order approved by the learner. We build in slices: small end-to-end working steps you can try. Each adds usable behavior, with verification before proceeding. Before the first commit, inspect existing tracked/staged files and ensure `.gitignore` excludes `/devpost/learner-profile.md`, `.env`, and `.env.*` (allowing a secret-free `.env.example`). Preserve unrelated work; inspect each staged diff and commit only intended files. If private data is already tracked, discuss remediation before committing.

## Slices

- [x] **1. Discover, choose, and reconsider after reading both sides**
  Becomes usable: A styled running app where the visitor opens Rust vs. C++, reads both sides, selects a position, sees demonstration results, and changes that position without adding another participant.
  Why now: Proves the unique reconsideration kernel immediately, including real navigation and readable opposing reasoning. Bootstrapping is part of this usable behavior.
  PRD ref: `prd.md > Discover and Open a Comparison`, `prd.md > Choose and Reconsider a Position`, `prd.md > Rust vs. C++ Discussion`, `prd.md > Look and Feel`
  Spec ref: `spec.md > Stack`, `spec.md > App`, `spec.md > DiscoveryFeed`, `spec.md > ComparisonCard`, `spec.md > DiscussionPage`, `spec.md > PositionSelector`, `spec.md > ResultsDisplay`, `spec.md > ArgumentList`, `spec.md > Vote Calculation`, `spec.md > File Structure`
  Build: Confirm Node compatibility; scaffold React/TypeScript/Vite with Tailwind and Lucide; configure scripts, seed content, types, shared hook in memory, hash navigation, discovery card, stacked sample arguments, position selection and derived results. Include the approved visual direction, accessibility labels and demonstration disclosures from the start. Helpful and contribution controls arrive in slice 3.
  Verify (mechanical): Run npm run lint and npm run build. Compile/run small domain assertions using the installed TypeScript toolchain to check initial totals, first vote, repeated choice, position replacement and Undecided. Start the dev server; use available browser tooling to check both routes, Back, results locking/reveal, read-before-vote and mobile overflow. If browser tooling is unavailable, state that limit and have the learner perform those visual checks.
  Learner check: Start the documented dev command, open http://127.0.0.1:5173/#/, explore the discussion, choose Rust then C++, and confirm the total stays 101. Read both sides and comment on the layout and reconsideration flow.
  Commit: `Build discovery and reconsideration journey`

- [ ] **2. Your position survives refresh, with graceful storage recovery**
  Becomes usable: Returning visitors retain their choice and unlocked results; corrupt or unavailable storage does not stop participation.
  Why now: Tests the learner's initialization uncertainty before adding more persistent interactions, using the working vote journey as evidence.
  PRD ref: `prd.md > Choose and Reconsider a Position`, `prd.md > States and Boundaries`
  Spec ref: `spec.md > useVisitorState`, `spec.md > Visitor Data`, `spec.md > Restore and Save Sequence`, `spec.md > Important Failure Modes`
  Build: Implement versioned visitor schema, lazy initialization, field/record validation and effect-based saving. Add exact non-blocking storage warning and repaired-data notice. Keep valid fields, filter invalid records and deduplicate helpful IDs; prepare the full schema for slice 3.
  Verify (mechanical): Run lint/build and storage assertions against missing, valid, partially invalid, malformed and unsupported data plus read/write exceptions. In available browser tooling, preload valid state then mount/refresh under Strict Mode and inspect the stored value to confirm it was not replaced by defaults. Confirm changed choices persist and storage failure leaves controls interactive; explicitly report any browser checks needing the learner.
  Learner check: Choose a position and refresh at the same origin. Confirm selection and results return; navigate back and reopen. Review the concise seed-versus-visitor and restore-before-save explanation against the actual files.
  Commit: `Restore visitor state and handle local storage failures`

- [ ] **3. Mark useful reasoning and contribute your own argument**
  Becomes usable: The complete persistent journey: helpful toggles, validated independent contributions and reconsideration, across mobile and desktop.
  Why now: Builds on proven voting and persistence. Completes participation without adding infrastructure or obscuring the core kernel.
  PRD ref: `prd.md > Read Arguments and Mark Helpful`, `prd.md > Contribute an Argument`, `prd.md > The Core Journey`, `prd.md > States and Boundaries`
  Spec ref: `spec.md > ArgumentList`, `spec.md > ArgumentForm`, `spec.md > Combining Arguments and Helpful Counts`, `spec.md > useVisitorState`, `spec.md > Verification Approach`, `spec.md > Where It Runs and How Someone Tries It`
  Build: Add immutable helpful toggles, combined argument display, independent supporting-side choice, trimmed length validation, exact errors, live character count, pure hook actions, one-shot submit guard, form reset and success feedback. Persist local contributions and marks. Add README commands and demo boundary. Include optional previews only if core behavior is complete. Polish focus, responsive layout and compact demo flow.
  Verify (mechanical): Run lint/build and domain assertions proving helpful count toggles, unchanged seeds, local argument display, and retained valid local arguments/marks after validation. With available browser tooling exercise no-vote and Undecided submissions, missing side, trimmed lengths 9/10/1,000/1,001, field error clearing, invalid-input preservation, double click submission, unchanged vote totals, refresh restoration, keyboard navigation and narrow/desktop layouts. Run the full one-minute journey and built preview. Report unavailable browser checks explicitly for learner verification.
  Learner check: Mark/unmark a sample argument, submit to either side while Undecided, try invalid text, double-click a valid submission, then refresh. Confirm one new argument, correct helpful counts, saved data and unchanged vote. Explore freely and report anything broken or confusing.
  Commit: `Complete helpful marks and persistent argument contributions`

## Hands-on Checkpoints

- [ ] Early usable behavior explored — after slice 1, layout/core-flow feedback resolved before later slices
- [ ] Final kick-the-tires exploration and feedback completed — after slice 3

Per the learner’s time-constrained instruction to proceed and report only blockers, the early hands-on check is deferred to the completed app. It remains unchecked: no learner inspection is claimed. Automated verification still runs before every slice commit; final hands-on review remains pending.

## Final Review

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

After the learner explores, record agreed revisions here as unchecked tasks; verify, commit and have them retry each affected behavior. No findings have been reported yet.

## Code Tour and App Map

- [ ] Learning activity complete — focused investigation of immutable seed/local display data and restore-before-save behavior using finished code and verification evidence
- [ ] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: Pending implementation; use actual assertions and code rather than claiming learning from this plan.
Route and stops: Planned hook → storage validator/effect → derivation utility; replace with actual paths/symbols after implementation.
Edit outcome: Not yet offered.
Reflection: Not yet offered; personal answers belong in the ignored learner profile.
Activity mode: Planned focused investigation tied to the learner's stated questions.

## Revisions

- Deferred early hands-on pause to the completed application at the learner’s request to prioritize implementation/testing and avoid further non-blocking decisions; do not mark unperformed feedback complete.

- Slice 1 verification: lint, TypeScript/production build, domain assertions and server-rendered UI assertions passed; Vite started on 127.0.0.1:5173. No browser automation tool or installed browser was found, so visual, history and keyboard checks remain for hands-on review.
- npm audit reports seven moderate findings from one minimatch advisory in the development-only TypeScript ESLint dependency chain; no runtime dependency findings. Do not apply the suggested forced downgrade during this time-constrained POC.

- Slice 2 verification: lint, production build and storage assertions passed for missing/corrupt data, valid-field retention, record filtering, read-only initialization, repeated snapshot writes and read/write exceptions. Actual browser Strict Mode refresh remains a hands-on check.
