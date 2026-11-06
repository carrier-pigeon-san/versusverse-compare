import { useState } from 'react'
import type { Position, VisitorData } from '../types'
export function useVisitorState() {
 const [visitor, setVisitor] = useState<VisitorData>({ version: 1, position: null, helpfulIds: [], arguments: [] })
 const setPosition = (position: Position) => setVisitor(prev => prev.position === position ? prev : { ...prev, position })
 return { visitor, setPosition }
}
