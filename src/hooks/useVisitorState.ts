import { useEffect, useState } from 'react'
import { loadVisitorData, saveVisitorData } from '../lib/storage'
import type { LocalArgument, Position } from '../types'

export function useVisitorState() {
  // No empty-state render precedes restoration; the initializer only reads.
  const [initial] = useState(() => loadVisitorData())
  const [visitor, setVisitor] = useState(initial.visitor)
  const [warning, setWarning] = useState(initial.warning)

  useEffect(() => {
    const message = saveVisitorData(visitor)
    // Storage failure is external-system feedback, separate from persisted data.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWarning(message)
  }, [visitor])

  const setPosition = (position: Position) => {
    setVisitor(previous => previous.position === position ? previous : { ...previous, position })
  }

  const toggleHelpful = (id: string) => {
    setVisitor(previous => ({
      ...previous,
      helpfulIds: previous.helpfulIds.includes(id)
        ? previous.helpfulIds.filter(existing => existing !== id)
        : [...previous.helpfulIds, id],
    }))
  }

  const addArgument = (argument: LocalArgument) => {
    setVisitor(previous => previous.arguments.some(existing => existing.id === argument.id)
      ? previous
      : { ...previous, arguments: [...previous.arguments, argument] })
  }

  return { visitor, setPosition, toggleHelpful, addArgument, warning, repaired: initial.repaired }
}
