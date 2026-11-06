---
doc: prd
status: approved
---

# VersusVerse Compare — Product Requirements

A mobile-friendly comparison experience for curious students, developers, and technology enthusiasts to explore reasoning, take a position, and reconsider without registering.
Source: `scope.md > Who It's For` and `The Unique Kernel`.

## The Core Journey

Source: `scope.md > The Core Loop` and `What "Working" Looks Like`.

1. Arrive at the discovery feed and find the featured Rust vs. C++ comparison.
2. Open its discussion and read the neutral context and arguments for either side. Results are hidden until a position is chosen.
3. Choose Rust, C++, or Undecided. See the selected state and the demonstration results immediately.
4. Explore opposing reasoning, toggle an argument's helpful mark, and submit a short argument supporting either side.
5. Reconsider and change position. The existing vote is replaced and the results update immediately.
6. Refresh or return in the same browser: the position, revealed results, helpful marks, and posted arguments remain.

The complete participation and reconsideration loop must be easy to demonstrate in one minute without excessive scrolling.

## Screens and Layout

Source: `scope.md > The POC Boundary` and `Inspiration & Identity`.

### Discovery Feed

- Compact header with the VersusVerse wordmark, tagline “Explore. Challenge. Decide.”, and disabled “Create Versus · Coming Soon” control. No creation destination.
- Minimal category navigation with Compare active. Omit unavailable future categories.
- Centered, vertically scrolling feed; comfortable spacing, a constrained desktop content column, and vertically stacked mobile cards.
- Rust vs. C++ is the primary working card: Compare badge, Technology topic, cobalt-blue Rust and coral-pink C++ panels, question “Which is better suited to new systems programming projects?”, a short featured argument with its supporting side, and a participant count labeled as demonstration data.
- The card or a clearly labeled “Explore Comparison” action opens the discussion.
- Two secondary preview cards, Android vs. iOS and Remote Work vs. Office Work, may illustrate the wider vision. They are visibly labeled “Coming Soon,” do not act as links, and have no invented participation figures. Cut these before cutting any core behavior.

### Rust vs. C++ Discussion

- Back-to-feed link, Compare badge, title, central question, and short neutral context covering memory safety, performance, ecosystem maturity, development speed, and maintainability.
- Prominent side-by-side option panels, followed by “Choose Rust”, “Choose C++”, and “Undecided” controls.
- Results appear below the position controls after a choice. Arguments follow in clearly distinguished “For Rust” and “For C++” groups; stacked sections or simple tabs are both acceptable.
- Short contribution form with supporting-side selection, argument text, character counter, and submission action.
- Visible invitation: “Changed your mind? Update your position above.”
- Keep reading comfortable and the demonstration sequence compact across mobile and desktop.

## Look and Feel

Source: `scope.md > Inspiration & Identity`.

Retro editorial neo-brutalism: warm off-white backgrounds, near-black text and thick outlines, bold expressive headings, electric-yellow primary actions, and restrained offset shadows. Rust consistently uses cobalt blue and C++ coral pink. Color distinguishes options without implying correctness. Discovery feels playful and energetic; discussion is calmer and optimized for readable text. Prefer clarity and reliable behavior over animation. Selected states and feedback include text or visual indicators beyond color alone.

## Features and Behavior

### Discover and Open a Comparison

Source: `scope.md > The POC Boundary`.

- [ ] The primary card contains the specified topic, question, alternatives, featured reasoning, and labeled demonstration participant count.
- [ ] Opening it shows the Rust vs. C++ discussion; the back link returns to the feed.
- [ ] Preview cards and disabled creation controls are clearly unavailable and lead nowhere.

### Choose and Reconsider a Position

Source: `scope.md > The Unique Kernel` and `What "Working" Looks Like`.

- [ ] All arguments are readable before voting. Before the first choice, hide voting percentages and distribution and show: “Choose your initial position to reveal community results. You can change your mind later.”
- [ ] Choosing Rust, C++, or Undecided immediately highlights that choice using a checkmark and selected label, saves it, and reveals results.
- [ ] Results use horizontal bars and labeled percentages for Rust, C++, and Undecided. Clearly identify the underlying counts as seeded demonstration data with the visitor's local selection included; these are not live community results.
- [ ] The visitor contributes exactly one current vote. A first choice adds one participant; changing it moves that vote between positions without increasing total participation. Choosing the current position again adds nothing.
- [ ] Switching positions immediately updates the selection and results. No objective winner is declared.
- [ ] Refreshing restores the choice and unlocked results.

### Read Arguments and Mark Helpful

Source: `scope.md > The Core Loop` and `What "Working" Looks Like`.

- [ ] Both sides contain readable sample reasoning. Each argument shows its supported option, author, text, helpful count, and helpful button.
- [ ] Seeded arguments use fictional display names and are clearly marked as sample content.
- [ ] Helpful marks toggle on and off, adjusting the visible count once per toggle and showing whether the visitor marked the argument.
- [ ] Helpful marks persist after refresh. Reading and helpful marking do not require choosing a position.

### Contribute an Argument

Source: `scope.md > The Core Loop` and `The POC Boundary`.

- [ ] Submission requires an explicitly chosen supporting side, Rust or C++, and 10–1,000 characters after trimming whitespace.
- [ ] Supporting-side selection is independent of voting position. Submission works before voting and while Undecided, and never changes the vote or position totals.
- [ ] Show a character counter near the text field. Evaluate length after trimming whitespace.
- [ ] On a submission attempt, missing side shows “Choose which option your argument supports.” beneath that control.
- [ ] Text shorter than 10 characters shows “Please provide at least 10 characters explaining your argument.” Text over 1,000 characters shows “Arguments cannot exceed 1,000 characters.”
- [ ] Errors clear as their corresponding issue is corrected. Invalid submission preserves all draft input and posts nothing.
- [ ] Successful submission immediately adds the argument to the appropriate group, labels the author “You” and the entry “Your argument”, resets the form, and shows “Argument posted.”
- [ ] Repeated clicks on the same submission do not create duplicate entries. This does not require a general duplicate-content detection system.
- [ ] Posted arguments survive refresh. Feedback uses text and appropriate indicators beyond color alone. No name or registration is required.

## States and Boundaries

Source: `scope.md > What "Working" Looks Like`, `The POC Boundary`, and `Explicitly Cut`.

- **First visit:** sample content is available; no position or helpful mark is preselected; voting results are locked until a choice. “No choice” is distinct from choosing Undecided.
- **Position selected:** results are visible and remain visible when switching among all three choices.
- **No local contributions:** seeded arguments still provide content on both sides; contribution remains available.
- **Invalid contribution:** inline feedback, preserved input, and no new argument.
- **Successful contribution:** immediate insertion, form reset, confirmation, and no vote change.
- **Returning visitor:** restore saved position, helpful marks, and posted arguments in the same browser. No cross-browser or cross-device synchronization.
- **Demonstration boundary:** seeded counts and sample arguments are labeled. A local interaction does not claim to update a real community.
- **Unavailable future features:** preview cards and creation are explicitly Coming Soon, with no placeholder pages.

## Product Decisions

- Preserve one fully interactive comparison to protect reliability and the one-minute demonstration.
- Use optional, noninteractive previews to suggest an expandable platform; cut them first if time is tight.
- Hide distribution until an initial choice to avoid influencing that choice, while leaving reasoning readable.
- Include Undecided as a real position and permit independent contributions to either side.
- Use local “You” authorship instead of identity collection to keep participation friction low.
- Show preferences rather than declaring a factual winner.
- Preserve established visual direction and prioritize reading on the discussion screen.

## What We're Building

Two responsive surfaces; one seeded Rust vs. C++ discussion; position selection and replacement; labeled demonstration results; sample arguments for both sides; persistent helpful toggles; validated, persistent local contributions; a reconsideration invitation; and same-browser restoration. Optional preview cards never take priority over this loop. The finish line remains 2–4 hours of active work and a reliable one-minute demonstration.

## Deferred From the POC

Source: `scope.md > Later` and `Explicitly Cut`.

- Additional usable comparisons and a broader working feed: each expands content and interaction coverage beyond the single proof.
- Creating and publishing comparisons: visible only as a disabled future action; no creation form.
- Search, personalized recommendations, and sophisticated filtering: unnecessary for discovering the one working comparison.
- Authentication, accounts, databases, shared backend, live multiplayer, and synchronization: same-browser participation suffices for this demonstration.
- Moderation services and rich-text editing: outside the short, local argument experiment.

## Possible Later Enhancements

Create and publish comparisons, expand discovery, and support subjects beyond technology, including everyday choices, science, education, culture, business, and public issues.

## Non-Goals

- Establish objective correctness from vote totals: this product encourages examining preferences and reasoning.
- Represent seeded figures as real activity or local participation as shared activity.
- Build inaccessible destinations merely to suggest a larger platform.

## Open Questions

No unresolved core product decisions block review. Two implementation details can be resolved during `4-spec`: the exact seeded counts and sample copy, and stacked argument groups versus simple tabs (both layouts are accepted here).

**Assumption for review:** the ordinary demonstration runs in a browser where local saving is available. Recovery messaging for unavailable or damaged local storage has not been specified; `4-spec` should flag this limitation and propose a small graceful behavior before building. Draft argument restoration across refreshes is not required by this PRD; only successfully posted arguments are promised persistence.
