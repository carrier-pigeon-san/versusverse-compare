import type { Position, SeedArgument } from '../types.js'
export const labels: Record<Position, string> = { rust: 'Rust', cpp: 'C++', undecided: 'Undecided' }
export const comparison = Object.freeze({ id: 'rust-vs-cpp', question: 'Which is better suited to new systems programming projects?', context: 'Rust emphasizes memory safety without a garbage collector, while C++ offers a mature ecosystem and extensive control. Both support high performance. Development speed and long-term maintainability depend on your team’s experience, tooling, and project constraints.' })
export const seedCounts: Readonly<Record<Position, number>> = Object.freeze({ rust: 48, cpp: 40, undecided: 12 })
export const seedArguments: readonly SeedArgument[] = Object.freeze([
 Object.freeze({ id: 'seed-rust-1', side: 'rust', author: 'Maya K.', text: 'Memory safety at compile time means fewer classes of bugs to chase in production. For a new project, that is a strong foundation.', helpful: 18 }),
 Object.freeze({ id: 'seed-rust-2', side: 'rust', author: 'Theo N.', text: 'Cargo makes dependencies and testing consistent across a team. The learning curve is real, but the maintenance benefits can pay off.', helpful: 11 }),
 Object.freeze({ id: 'seed-cpp-1', side: 'cpp', author: 'Alex R.', text: 'Decades of libraries and tooling matter. If your project relies on an established native ecosystem, C++ lets you build on what already works.', helpful: 16 }),
 Object.freeze({ id: 'seed-cpp-2', side: 'cpp', author: 'Sam L.', text: 'An experienced C++ team can ship quickly with modern practices. Familiarity and existing integrations can outweigh adopting a new language.', helpful: 9 }),
])
