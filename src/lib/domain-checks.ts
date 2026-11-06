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
