# VersusVerse Compare

Explore both sides of Rust vs. C++, take a position, and reconsider after reading opposing arguments. A responsive React/TypeScript proof of concept using Vite, Tailwind CSS and Lucide icons.

## Run locally

Use Node 24 LTS (or a supported Node version satisfying Vite's engine requirement).

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
```

Open http://127.0.0.1:5173/#/. The discussion is at `#/comparison/rust-vs-cpp`. Browser Back returns to the feed.

```sh
npm run lint
npm run check
npm run check:render
npm run build
npm run preview -- --host 127.0.0.1 --port 4173 --strictPort
```

The preview opens at http://127.0.0.1:4173/#/. Different ports/hosts have separate browser storage. `npm run check` compiles and runs small domain/persistence assertions using TypeScript and Node's built-in assertions; no test framework is installed.

## Demo journey

Open the comparison, read both sides, choose Rust, mark an argument helpful, post a short argument supporting C++, reconsider and choose C++, then refresh. Total participants remains 101 after changing positions. Contributions can also be posted before voting or while Undecided. Local votes, helpful marks and posted arguments survive refresh in the same browser.

## Demonstration boundary

Only Rust vs. C++ is interactive. All starting arguments, fictional names and participation counts are labeled demonstration content. Results combine fixed seed counts with one local vote. This is not a live community: there is no backend, account, external AI, database or synchronization. Browser storage can be cleared or blocked; storage failure leaves the session interactive with a warning. Argument drafts are not saved.

## Code organization

- `src/App.tsx`: hash navigation, shared hook ownership and page composition.
- `src/hooks/useVisitorState.ts`: immutable visitor actions and storage synchronization.
- `src/data/comparison.ts`: immutable sample content and fixed participation counts.
- `src/lib/derive.ts`: display arguments, helpful counts and voting totals.
- `src/lib/storage.ts`: validation, partial recovery and guarded storage access.
- `src/components/`: focused discovery, discussion and interaction components.

The technical blueprint and build progress live in `devpost/spec.md` and `devpost/checklist.md`. The private learner profile and local credentials are ignored by Git. Submission requires a short demo video and public repository; deployment is optional.

## Verification limits

Automated checks cover domain calculations, recovery, storage exceptions and server-rendered UI. Actual browser interaction, refresh/Strict Mode behavior, keyboard focus and responsive appearance need hands-on review if no browser automation tool is available. npm audit currently reports a moderate minimatch advisory in development-only TypeScript ESLint tooling; no runtime dependency findings were reported. A forced dependency downgrade was deliberately avoided.
