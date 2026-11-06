import { ThumbsUp } from 'lucide-react'
import { labels } from '../data/comparison'
import { deriveArguments } from '../lib/derive'
import type { VisitorData } from '../types'

export function ArgumentList({ visitor, onToggleHelpful }: { visitor: VisitorData; onToggleHelpful: (id: string) => void }) {
  const argumentsForDisplay = deriveArguments(visitor)
  return <div className="argument-groups">
    {(['rust', 'cpp'] as const).map(side => <section key={side} aria-label={`For ${labels[side]}`}>
      <h2 className={`argument-heading ${side}`}>
        <span>For {labels[side]}</span>
        <small>{argumentsForDisplay.filter(argument => argument.side === side).length} perspectives</small>
      </h2>
      {argumentsForDisplay.filter(argument => argument.side === side).map(argument => <article className="argument" key={argument.id}>
        <div className="argument-meta"><strong>{argument.author}</strong><span>{argument.label} · For {labels[argument.side]}</span></div>
        <p>{argument.text}</p>
        <button className={`helpful-button ${argument.marked ? 'marked' : ''}`} type="button" aria-pressed={argument.marked} aria-label={`${argument.marked ? 'Unmark' : 'Mark'} argument by ${argument.author} as helpful: ${argument.text.slice(0, 45)}…`} onClick={() => onToggleHelpful(argument.id)}>
          <ThumbsUp size={14}/><span>{argument.marked ? 'Marked helpful' : 'Helpful'}</span><strong>{argument.helpful}</strong>
        </button>
      </article>)}
    </section>)}
  </div>
}
