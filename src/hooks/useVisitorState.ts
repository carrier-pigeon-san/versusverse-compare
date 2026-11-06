import { useEffect, useState } from 'react'
import { loadVisitorData, saveVisitorData } from '../lib/storage'
import type { Position } from '../types'

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

  return { visitor, setPosition, warning, repaired: initial.repaired }
}
