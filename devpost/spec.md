---
doc: spec
status: approved
---

# VersusVerse Compare — Technical Spec

## How This Works, In Plain Language

The browser runs a React application with two screens: a discovery feed and the Rust vs. C++ discussion. App owns one visitor-state hook and passes its data and actions to the components that need them. Components display information or collect input; the hook coordinates persistent interactions.

A separate seed module holds the comparison, fictional sample arguments, and fixed demonstration participation counts. Visitor data contains only the current position, helpful marks, and posted arguments. We combine these sources for display without changing the seed. Changing a position replaces the visitor's one vote. Marking helpful adds or removes one local mark alongside a fixed sample count.

The hook restores visitor data before the first render and saves subsequent state changes to localStorage. If storage fails, interactions continue in memory with “Changes can’t be saved in this browser.” Hash links switch screens without a routing library. This keeps the architecture small and its responsibilities visible.

## The Core Journey Through the System

Implements `prd.md > The Core Journey`.

1. `App` renders `DiscoveryFeed` at `#/`. `ComparisonCard` reads the seed question, featured argument, and demonstration participant total (including the visitor if they have chosen).
2. The card links to `#/comparison/rust-vs-cpp`. `DiscussionPage` displays context, position controls, and both stacked argument groups. Arguments are available before a vote.
3. `PositionSelector` calls `setPosition`. The hook replaces the current position; React renders the checkmark/selected label and `ResultsDisplay` derives updated totals. A null position locks results; Undecided unlocks them.
4. `ArgumentList` calls `toggleHelpful(id)`. A new visitor-state value triggers a render and storage synchronization. The seed's helpful count stays fixed.
5. `ArgumentForm` validates a side and trimmed text, then calls `addArgument`. The new entry appears under its supporting side as “You” / “Your argument”; the form clears and announces “Argument posted.” Voting data is untouched.
6. Selecting the other side moves the same local vote. Refresh restores visitor data before rendering; browser Back returns to the feed without discarding it.

## Stack

Learner-selected: React and TypeScript with Vite, Tailwind CSS, and Lucide React. No additional runtime libraries planned.

| Dependency | Purpose and documentation |
| --- | --- |
| React / React DOM | Components, props, hooks; [state initializer](https://react.dev/reference/react/useState), [effects](https://react.dev/reference/react/useEffect) |
| TypeScript | Straightforward domain types; [handbook](https://www.typescriptlang.org/docs/handbook/intro.html) |
| Vite / React plugin | Development server and static build; [guide](https://vite.dev/guide/) |
| Tailwind CSS / Vite plugin | Responsive utility styling and theme tokens; [Vite installation](https://tailwindcss.com/docs/installation/using-vite) |
| Lucide React | Named icon imports, with visible text for actions; [React guide](https://lucide.dev/guide/react) |
| Browser APIs | [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [hashchange](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event) |

Official documentation checked during planning. Use the supported Vite React/TypeScript scaffold and Tailwind's Vite-plugin integration; resolve compatible stable versions during setup and commit the lockfile. Exact installed versions are not yet verified. Check Node compatibility against the chosen Vite version before installation. Keep scaffold lint tooling; no test framework or router needed solely for this POC.

## Where It Runs and How Someone Tries It

Runs in a modern browser with a local Node/npm development toolchain. Node is development tooling only; no application server or keys. Use a supported Node LTS satisfying the installed Vite engine requirements.

Planned commands after implementation:

```sh
npm install
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
```

Open `http://127.0.0.1:5173/#/`. Keep this origin consistent: changing host, protocol, or port uses different browser storage. `npm run build` must type-check and create `dist/`; `npm run lint` checks source. For a built preview, run `npm run preview -- --host 127.0.0.1 --port 4173 --strictPort` and open `http://127.0.0.1:4173/#/` (separate local data).

Record discovery → choose → read opposing argument → helpful → contribute → change position → refresh in about one minute. Use a clean browser profile for the initial-results-locked view. Submission requires a short demo video and a public GitHub repository. Deployment is optional; no hosting target selected. These startup commands describe planned build scripts, not an existing implementation.

## Look and Feel

Implements `prd.md > Look and Feel` and `prd.md > Screens and Layout`.

Tailwind theme tokens: warm paper `#FFF9EC`, ink `#181818`, electric yellow `#FFE600`, cobalt `#2455E6`, coral `#FF8A95`. Use ink on yellow/coral and white on cobalt, checking actual contrast during implementation. Thick ink borders, restrained offset shadows, bold system-font headings, readable system sans body, constrained content column, generous line height. No remote fonts or asset service.

Feed is playful; discussion prioritizes readable text and compact controls. Mobile uses stacked cards and stacked Rust/C++ argument groups. Position controls wrap without horizontal overflow. Use semantic headings, native buttons/form controls, visible keyboard focus, explicit labels, selected text/checkmarks and `aria-pressed`. Feedback uses text; status confirmations and storage warning use polite live regions. Icons supplement labels. Both argument sections are visible without tab controls.

## Components

### App

Owns `useVisitorState` once and the current hash route. Renders shared wordmark/tagline, disabled “Create Versus · Coming Soon”, minimal Compare navigation, storage warning, and the active page. Passes data/actions via props. Registers/cleans up `hashchange`; missing or unknown hashes show the feed. Uses native hash anchors for navigation and browser history. On screen changes, move focus to the page heading and reset scroll for a predictable keyboard/mobile experience. Implements `prd.md > Discover and Open a Comparison` and `prd.md > States and Boundaries`.

### DiscoveryFeed

Renders the working comparison card. Optional Android/iOS and Remote/Office previews are static Coming Soon cards without links or participation figures; omit them if they threaten the core loop. Implements `prd.md > Discovery Feed` and `prd.md > Discover and Open a Comparison`.

### ComparisonCard

Shows Compare, Technology, consistent option colors, the exact approved question, featured argument with its side, labeled demonstration participant count, and “Explore Comparison” link. Implements `prd.md > Discover and Open a Comparison`.

### DiscussionPage

Composes back link, neutral context, option panels, position controls, results, both argument groups, form, and “Changed your mind? Update your position above.” Wires child props; owns no second copy of visitor state. Implements `prd.md > Rust vs. C++ Discussion`.

### PositionSelector

Three buttons: “Choose Rust”, “Choose C++”, “Undecided”. Calls the supplied action; current selection shows checkmark, selected text, and pressed state. Clicking the same choice is a no-op. Implements `prd.md > Choose and Reconsider a Position`.

### ResultsDisplay

When position is null, show the PRD's exact locked-results message and no distribution. Otherwise show horizontal bars and labeled percentages for three positions, with seeded-demo/local-vote disclosure and no winner. Derived counts, totals, and percentages are never persisted. Implements `prd.md > Choose and Reconsider a Position`.

### ArgumentList

Renders stacked “For Rust” and “For C++” sections. Each entry includes side, author, sample/visitor label, plain text, helpful count and toggle button with its selected state. Uses stable IDs and combined display objects; works before voting. Implements `prd.md > Read Arguments and Mark Helpful`.

### ArgumentForm

Local component state holds draft side, text, attempted-submission errors and success message. Side starts unselected and is independent of position. Trim before counting/validating; accept 10–1,000 characters. On attempted submission use all exact inline messages in `prd.md > Contribute an Argument`; correct each error as its field becomes valid. Preserve invalid input. Allow typing past 1,000 so over-limit feedback is reachable. Use a native form submit path with a synchronous ref guard; accept once, clear controlled inputs, and release guard after the cleared form is committed. A subsequent empty submission cannot duplicate the prior entry. Drafts are not persisted or promised across page navigation. Implements `prd.md > Contribute an Argument`.

### useVisitorState

Owns the visitor object, initialization outcome, and storage warning. Exposes current data, `setPosition`, `toggleHelpful`, and `addArgument`. Functional state updates create new arrays/objects. Generate an argument ID once in the submission event, outside state-updater callbacks; keep callbacks pure under React Strict Mode. Implements all persistent behavior in `prd.md > Choose and Reconsider a Position`, `Read Arguments and Mark Helpful`, `Contribute an Argument`, and `States and Boundaries`.

## Data Model

### Seed Data

`src/data/comparison.ts` exports readonly typed content: ID `rust-vs-cpp`, option names, exact question, neutral context covering the five PRD topics, featured argument ID, sample arguments and fixed counts. Implementation defaults: Rust 48, C++ 40, Undecided 12 (100 seeded participants); two short arguments per side, fictional names, stable `seed-*` IDs and nonnegative helpful base counts. These numbers and copy are illustrative content decisions, not real activity or learner opinions. Keep seed data out of localStorage and never mutate its arrays or objects.

### Visitor Data

```ts
type Side = 'rust' | 'cpp';
type Position = Side | 'undecided';
type LocalArgument = { id: string; side: Side; text: string };
type VisitorData = {
  version: 1;
  position: Position | null;
  helpfulIds: string[];
  arguments: LocalArgument[];
};
```

One key: `versusverse:rust-vs-cpp:visitor:v1`. Defaults: version 1, null position, empty arrays. Local argument IDs use `local-` plus a browser-generated UUID. Author “You” and label “Your argument” are derived, not stored. The ID is stable across refresh. No identity, timestamps, or derived totals are required.

### Combining Arguments and Helpful Counts

Build fresh display objects: seed entries map to their fixed author/text/base helpful count and “Sample content”; local entries map to author “You”, base helpful count 0 and “Your argument”. Concatenate and group by side, keeping samples in source order and local entries in insertion order. For every entry:

`displayHelpful = baseHelpful + (visitor.helpfulIds.includes(id) ? 1 : 0)`

Toggle membership in the visitor's ID list; do not increment a seed field. Unmarking removes exactly the visitor's one contribution. A local posted argument can also be marked helpful. Derived display objects are calculated during rendering; no extra synchronized state or memoization is necessary at this size. Implements `prd.md > Read Arguments and Mark Helpful`.

### Vote Calculation

For each position: `count = seedCount + (visitor.position === position ? 1 : 0)`.
Total = seed total + 1 if position is non-null, otherwise seed total. Display percentages with one decimal place; independently rounded labels can differ slightly from 100%. Bars use unrounded ratios. Selecting Rust twice remains 49/40/12 (101); switching to C++ yields 48/41/12 (101). Undecided is a real choice, distinct from null. Implements `prd.md > Choose and Reconsider a Position`.

### Restore and Save Sequence

1. `useState(() => loadVisitorData())` reads/parses/validates synchronously. Return both sanitized visitor data and load outcome. The initializer only reads; it never writes or removes storage. It can safely be invoked twice by development Strict Mode.
2. Validate unknown JSON at runtime. For version 1: keep a valid position independently; keep individually valid local argument records (unique `local-*` ID, valid side, trimmed 10–1,000 character text), dropping invalid/duplicate records. Deduplicate helpful IDs and retain only IDs of known seed arguments or retained local arguments. A wrong field type resets only that field. Unknown extra fields are ignored.
3. Missing key uses defaults. Malformed JSON, a non-object root, or unsupported version cannot be safely interpreted: use defaults. When data is repaired/reset, show “Some saved data couldn’t be restored.” without blocking interaction. No migration machinery.
4. First render already has the sanitized restored data. A `useEffect` depending on the visitor object serializes only that object and calls `setItem`. It may save the validated initial state; there is no earlier empty-state effect that could overwrite restored data. Repeated effect execution writes the same value, without changing votes or duplicating arguments.
5. Actions update React state immutably. React re-renders; after commit, the effect writes the new snapshot. Catch read/write exceptions; remain interactive in memory and show exactly “Changes can’t be saved in this browser.” Failed writes must not roll back visible interactions. Later successful writes may clear the saving warning. Warning changes alone do not retrigger saves.

Persistence belongs to the same browser origin. Navigating away and back within the app preserves hook state; refresh restores successful saves. Closing immediately before an effect runs is a small normal browser persistence limit. Cross-tab reconciliation and cross-device synchronization are outside the POC.

## File Structure

Planned authored files; build scaffold may add routine tool configuration without changing architecture.

```text
versusverse/
├── index.html                     # Vite entry and page metadata
├── package.json                   # dev/build/preview/lint scripts
├── package-lock.json              # Reproducible dependency resolution
├── vite.config.ts                 # React and Tailwind Vite plugins
├── tsconfig.json                  # Scaffold TypeScript references
├── tsconfig.app.json              # Browser TypeScript settings
├── tsconfig.node.json             # Tool configuration typing
├── tsconfig.checks.json           # Compile the standalone domain checks
├── eslint.config.js               # Scaffold lint checks
├── .gitignore                     # Generated files, private context, secrets
├── README.md                      # Setup, demo boundary and commands
├── scripts/render-checks.mjs       # Component rendering assertions (no browser simulation)
├── src/
│   ├── main.tsx                   # React root and StrictMode
│   ├── App.tsx                    # Shared state owner, hash route and shell
│   ├── styles.css                 # Tailwind import, theme and base styles
│   ├── types.ts                   # Side, Position, seed and visitor types
│   ├── data/comparison.ts         # Immutable comparison and sample content
│   ├── hooks/useVisitorState.ts   # Actions and persistence effect
│   ├── lib/storage.ts             # Pure validation plus guarded load/save
│   ├── lib/derive.ts              # Display arguments and vote calculations
│   ├── lib/domain-checks.ts       # Small runnable assertions for data invariants
│   └── components/
│       ├── DiscoveryFeed.tsx      # Working card and optional static previews
│       ├── ComparisonCard.tsx     # Discovery summary and hash link
│       ├── DiscussionPage.tsx     # Discussion composition and context
│       ├── PositionSelector.tsx   # Three choices and selected feedback
│       ├── ResultsDisplay.tsx     # Locked message or derived distribution
│       ├── ArgumentList.tsx       # Two visible groups and helpful buttons
│       └── ArgumentForm.tsx       # Draft, validation and one-shot submit
└── devpost/                       # Canonical plans and review companions
    ├── learner-profile.md         # Private learning context; exclude from Git
    ├── scope.md / scope.html
    ├── prd.md / prd.html
    ├── spec.md / spec.html
    └── checklist.md               # Build order and verification progress
```

Generated `node_modules/` and `dist/` are ignored. Existing agent/configuration directories are outside application implementation; preserve unrelated work.

## External Services and Dependencies

No runtime external services, API calls, credentials, paid plans, or rate limits. Package installation uses npm; icons are bundled SVG components, styles compile locally, and all comparison content ships with the app. Documentation links are in Stack. No external assets are required to run the built app.

## Important Failure Modes

- Damaged local data: preserve valid fields/records, reset unusable fields, and report partial restoration as described above.
- Storage blocked or quota exhausted: current session continues with the exact non-blocking saving warning; persistence is not promised until a write succeeds.
- Invalid/repeated submission: inline PRD messages, preserved invalid draft, and submit guard prevent duplicate posting. Render text through React escaping; never inject argument HTML.
- Unknown hash: feed fallback; native links remain usable. No placeholder destination for future features.

## Verification Approach

Run scaffold lint and TypeScript/production build. Use a small TypeScript assertion runner (compiled with the existing TypeScript toolchain, no added test library) to verify vote replacement/idempotence, helpful derivation without seed mutation, field-level recovery, invalid record filtering and known-ID validation. Exercise storage exceptions through a small injectable storage adapter in checks; do not introduce a persistence framework.

Browser checks cover locked first visit, all three positions, Back/hash refresh, both groups before voting, helpful toggles and refresh, independent contribution while unselected/Undecided, exact length boundaries 9/10/1,000/1,001 after trimming, error clearing, repeated submit clicks, successful refresh restoration, malformed saved data, and blocked/failed writes. Inspect narrow mobile and desktop layouts, keyboard focus, readable labels and the one-minute journey. Use browser tooling if available; otherwise report its absence and have the learner perform clearly named browser checks rather than claiming they ran.

## What Was Simplified and Why

One comparison, local visitor data and labeled seed participation prove reconsideration without shared infrastructure. Props and a single hook make ownership easy to trace. Hash navigation provides browser history without a router. Stacked argument groups keep opposing reasoning visible. System fonts, bundled icons and compile-time styling keep runtime dependencies limited. Previews are optional and cut first. No backend, database, authentication, external AI, live multiplayer, or comparison creation.

## Decisions and Open Issues

- Learner chose the stack and requested focused components, typed simple data, concise explanations, and no extra architectural layers.
- Learner approved app-owned visitor hook, props, immutable seeds plus local deltas, hash routes, partial recovery, exact saving warning, and stacked groups.
- Learner uncertainty: how helpful counts and arguments combine without seed mutation. Clarified through fresh display objects and the base-plus-one formula above; verify by assertions that seed snapshots do not change after local interactions.
- Learner uncertainty: avoiding restored-data overwrite. Clarified through synchronous lazy initialization followed by the saving effect; verify a saved choice/contribution survives initial render and Strict Mode refresh.
- Seed counts/copy and palette hex values above are concrete implementation defaults derived from the approved direction; they do not add product behavior.
- No consequential architecture question remains. Optional hosting is deferred. Exact dependency versions and available browser-check tools must be confirmed during build setup.
- Approved by the learner based on the summary and consistency checks; independent document inspection was not claimed.
