---
doc: scope
status: approved
---

# VersusVerse Compare

A mobile-friendly web application that turns an A-vs-B question into a structured discussion where visitors take a position, explore arguments, and reconsider.

## The Unique Kernel

The defining moment is changing your position after encountering a compelling opposing argument. Participation is about exploring perspectives and thinking beyond an initial preference.

## Who It's For

A curious, opinionated student, developer, or technology enthusiast drawn in by an interesting comparison. They currently encounter scattered debates in social media threads, forums, and comments, and want an accessible, entertaining way to examine both sides and contribute reasoning without registering.

## The Core Loop

Discover a comparison, open it, read either side, and choose Option A, Option B, or Undecided. See the community distribution, explore supporting and opposing arguments, mark useful reasoning as helpful, contribute a short argument, and reconsider the position. Discovering perspectives they had not considered gives visitors a reason to return.

## Inspiration & Identity

Fun, retro-inspired, high-contrast editorial neo-brutalism: warm off-white backgrounds, near-black outlines, bold typography, electric-yellow primary actions, and cobalt blue and coral pink for the competing options. Discovery should feel energetic; discussion should remain readable. The experience should be responsive and welcoming to casual visitors.

## Why This Matters to the Learner

Encourage thoughtful discussion and exposure to opposing perspectives. Practice writing technical specifications and breaking application architecture into “small, manageable, easy-to-understand, and easy-to-implement functionalities.”

## What "Working" Looks Like

In a one-minute demonstration, a visitor discovers the seeded Rust vs. C++ card asking “Which is better suited to new systems programming projects?”, with a featured argument and participant count. They open it, read arguments, take a position, see results, mark an argument helpful, contribute reasoning, and change their position after reading an opposing argument. Their choice and results update immediately.

Refreshing or returning in the same browser restores the selected position, helpful marks, and contributed arguments. Changing position updates the existing selection rather than adding another vote; helpful marks can be toggled. Seeded participation figures are clearly labeled as demonstration data.

The finish line is a reliable, responsive proof of concept, demonstrable in one minute, sized for the hackathon's 2–4 hours of active work, with a short demo video and public GitHub repository. Deployment is optional.

## The POC Boundary

One seeded Rust vs. C++ comparison, a discovery card, sample arguments, and the complete working participation and reconsideration journey. Persist interaction state simply with localStorage in the same browser. Display seeded community figures together with the visitor's local selection; these are demonstration results, not live community activity.

## Later

Creating and publishing comparisons, a broader discovery feed, and subjects beyond the initial technology comparison, including everyday choices, science, education, culture, business, and public issues.

## Explicitly Cut

- Authentication and real user accounts: visitors can participate without registering; identity is unnecessary to prove the core loop.
- Databases, shared backend infrastructure, and live multiplayer: local state is sufficient for this demonstration.
- Synchronization between browsers or devices: persistence is limited to the same browser to keep implementation reliable and simple.
