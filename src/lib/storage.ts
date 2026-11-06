import { seedArguments } from '../data/comparison.js'
import type { LocalArgument, VisitorData } from '../types.js'

export const STORAGE_KEY = 'versusverse:rust-vs-cpp:visitor:v1'
export const SAVING_WARNING = 'Changes can’t be saved in this browser.'
export type StorageAdapter = Pick<Storage, 'getItem' | 'setItem'>
export const emptyVisitor = (): VisitorData => ({ version: 1, position: null, helpfulIds: [], arguments: [] })
const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value)

export function validateVisitor(value: unknown): { visitor: VisitorData; repaired: boolean } {
  const visitor = emptyVisitor()
  if (!isRecord(value) || value.version !== 1) return { visitor, repaired: true }
  let repaired = false
  if (value.position === null || value.position === 'rust' || value.position === 'cpp' || value.position === 'undecided') visitor.position = value.position
  else repaired = true

  const usedIds = new Set<string>()
  if (Array.isArray(value.arguments)) {
    for (const entry of value.arguments) {
      if (isRecord(entry) && typeof entry.id === 'string' && /^local-.+/.test(entry.id) && !usedIds.has(entry.id) && (entry.side === 'rust' || entry.side === 'cpp') && typeof entry.text === 'string' && entry.text.trim().length >= 10 && entry.text.trim().length <= 1000) {
        visitor.arguments.push({ id: entry.id, side: entry.side, text: entry.text.trim() } satisfies LocalArgument)
        usedIds.add(entry.id)
        if (entry.text !== entry.text.trim()) repaired = true
      } else repaired = true
    }
  } else repaired = true

  const known = new Set([...seedArguments.map(a => a.id), ...usedIds])
  if (Array.isArray(value.helpfulIds)) {
    for (const id of value.helpfulIds) {
      if (typeof id === 'string' && known.has(id) && !visitor.helpfulIds.includes(id)) visitor.helpfulIds.push(id)
      else repaired = true
    }
  } else repaired = true
  return { visitor, repaired }
}

// Resolve browser storage inside try/catch: accessing the property itself can throw.
export function loadVisitorData(storage?: StorageAdapter) {
  try {
    const raw = (storage ?? window.localStorage).getItem(STORAGE_KEY)
    if (raw === null) return { visitor: emptyVisitor(), repaired: false, warning: '' }
    try {
      return { ...validateVisitor(JSON.parse(raw)), warning: '' }
    } catch {
      return { visitor: emptyVisitor(), repaired: true, warning: '' }
    }
  } catch {
    return { visitor: emptyVisitor(), repaired: false, warning: SAVING_WARNING }
  }
}

export function saveVisitorData(visitor: VisitorData, storage?: StorageAdapter): string {
  try {
    (storage ?? window.localStorage).setItem(STORAGE_KEY, JSON.stringify(visitor))
    return ''
  } catch {
    return SAVING_WARNING
  }
}
