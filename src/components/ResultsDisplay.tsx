import { labels } from '../data/comparison'
import { deriveResults } from '../lib/derive'
import type { Position } from '../types'

export function ResultsDisplay({ position }: { position: Position | null }) {
  if (position === null) {
    return <p className="locked-results">Choose your initial position to reveal community results. You can change your mind later.</p>
  }
  const { counts, total } = deriveResults(position)
  return <section className="results" aria-label="Demonstration results" aria-live="polite">
    <div className="results-heading"><h2>A snapshot of perspectives</h2><span>{total} participants</span></div>
    {(['rust', 'cpp', 'undecided'] as const).map(side =>
      <div className="result-row" key={side}>
        <span>{labels[side]}</span>
        <div className="bar-track"><div className={`bar ${side}`} style={{ width: `${counts[side] / total * 100}%` }}/></div>
        <strong>{(counts[side] / total * 100).toFixed(1)}%</strong>
      </div>
    )}
    <p className="disclosure">Seeded demonstration data + your one local vote. These are not live community results.</p>
  </section>
}
