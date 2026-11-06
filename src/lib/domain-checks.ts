import assert from 'node:assert/strict'
import { deriveResults, deriveArguments } from './derive.js'
import { seedArguments, seedCounts } from '../data/comparison.js'
const snapshot=JSON.stringify({seedArguments,seedCounts})
assert.equal(deriveResults(null).total,100)
assert.deepEqual(deriveResults('rust'),{counts:{rust:49,cpp:40,undecided:12},total:101})
assert.deepEqual(deriveResults('cpp'),{counts:{rust:48,cpp:41,undecided:12},total:101})
assert.equal(deriveResults('rust').total,deriveResults('rust').total)
assert.equal(deriveResults('undecided').counts.undecided,13)
deriveArguments({version:1,position:'rust',helpfulIds:[],arguments:[]})
assert.equal(snapshot,JSON.stringify({seedArguments,seedCounts}))
console.log('Domain checks passed: vote replacement, totals and immutable seeds.')

// Recovery preserves independent valid fields and filters records individually.
const { emptyVisitor, validateVisitor, loadVisitorData, saveVisitorData, STORAGE_KEY, SAVING_WARNING } = await import('./storage.js')
const validArgument = { id: 'local-test', side: 'cpp', text: 'Existing integrations can reduce project risk.' }
const stored = { version: 1, position: 'rust', helpfulIds: ['seed-rust-1', 'local-test'], arguments: [validArgument] }
assert.deepEqual(validateVisitor(stored), { visitor: stored, repaired: false })
const partial = validateVisitor({ ...stored, position: 'invalid', helpfulIds: ['seed-rust-1', 'seed-rust-1', 'unknown', 'local-test'], arguments: [validArgument, validArgument, { id: 'local-bad', side: 'rust', text: 'short' }] })
assert.equal(partial.repaired, true)
assert.equal(partial.visitor.position, null)
assert.deepEqual(partial.visitor.arguments, [validArgument])
assert.deepEqual(partial.visitor.helpfulIds, ['seed-rust-1', 'local-test'])
assert.equal(validateVisitor({ ...stored, arguments: null }).visitor.position, 'rust')
assert.deepEqual(validateVisitor({ ...stored, helpfulIds: 7 }).visitor.arguments, [validArgument])
for (const bad of [null, [], 'bad', { ...stored, version: 9 }]) {
 assert.deepEqual(validateVisitor(bad), { visitor: emptyVisitor(), repaired: true })
}
let raw: string | null = JSON.stringify(stored)
let writes = 0
const storage = { getItem: () => raw, setItem: (key: string, value: string) => { assert.equal(key, STORAGE_KEY); raw = value; writes += 1 } }
const restored = loadVisitorData(storage)
assert.deepEqual(restored.visitor, stored)
assert.equal(writes, 0, 'Initialization only reads')
assert.equal(saveVisitorData(restored.visitor, storage), '')
assert.deepEqual(JSON.parse(raw!), stored, 'Initial save preserves restored data')
assert.equal(saveVisitorData(restored.visitor, storage), '')
assert.deepEqual(JSON.parse(raw!), stored, 'Repeated Strict Mode snapshot writes are idempotent')
raw = '{invalid'
assert.equal(loadVisitorData(storage).repaired, true)
raw = null
assert.deepEqual(loadVisitorData(storage).visitor, emptyVisitor())
const blocked = { getItem: (): string | null => { throw Error('denied') }, setItem: () => { throw Error('quota') } }
assert.equal(loadVisitorData(blocked).warning, SAVING_WARNING)
assert.equal(saveVisitorData(stored as import('../types.js').VisitorData, blocked), SAVING_WARNING)
console.log('Storage checks passed: field recovery, record filtering, restore before save, idempotent writes and storage failures.')
