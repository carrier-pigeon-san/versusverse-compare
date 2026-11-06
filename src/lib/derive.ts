import { seedArguments, seedCounts } from '../data/comparison.js'
import type { DisplayArgument, Position, VisitorData } from '../types.js'
export function deriveResults(position: Position | null) {
 const counts = { ...seedCounts }
 if (position) counts[position] += 1
 const total = counts.rust + counts.cpp + counts.undecided
 return { counts, total }
}
export function deriveArguments(visitor: VisitorData): DisplayArgument[] {
 return [...seedArguments.map(a => ({ ...a, label: 'Sample content' })), ...visitor.arguments.map(a => ({ ...a, author: 'You', label: 'Your argument', helpful: 0 }))].map(a => ({ ...a, marked: visitor.helpfulIds.includes(a.id), helpful: a.helpful + Number(visitor.helpfulIds.includes(a.id)) }))
}
