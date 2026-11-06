import { Check } from 'lucide-react'
import { labels } from '../data/comparison'
import type { Position } from '../types'

export function PositionSelector({ position, onChoose }: { position: Position | null; onChoose: (position: Position) => void }) {
  return <section className="position-section" aria-label="Choose your position">
    <h2>Where do you stand?</h2>
    <div className="position-buttons">
      {(['rust', 'cpp', 'undecided'] as const).map(side =>
        <button key={side} className={`button position ${side} ${position === side ? 'selected' : ''}`} aria-pressed={position === side} onClick={() => onChoose(side)}>
          {position === side && <Check size={18}/>}
          {side === 'undecided' ? 'Undecided' : `Choose ${labels[side]}`}
          {position === side && <small>Selected</small>}
        </button>
      )}
    </div>
  </section>
}
