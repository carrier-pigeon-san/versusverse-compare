// Component rendering checks supplement domain checks; they do not simulate browser events.
import { createServer } from 'vite'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import assert from 'node:assert/strict'

const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false, watch: null }, appType: 'custom' })
try {
  const { DiscussionPage } = await server.ssrLoadModule('/src/components/DiscussionPage.tsx')
  const { DiscoveryFeed } = await server.ssrLoadModule('/src/components/DiscoveryFeed.tsx')
  const { default: App } = await server.ssrLoadModule('/src/App.tsx')
  const visitor = { version: 1, position: null, helpfulIds: [], arguments: [] }
  const actions = { setPosition() {}, toggleHelpful() {}, addArgument() {} }
  const renderDiscussion = data => renderToStaticMarkup(createElement(DiscussionPage, { visitor: data, ...actions }))
  const locked = renderDiscussion(visitor)
  assert(locked.includes('Choose your initial position'))
  assert(locked.includes('For Rust') && locked.includes('For C++'))
  assert(!locked.includes('Demonstration results'))
  assert(locked.includes('Your reasoning') && locked.includes('Post argument'))
  assert(!locked.includes('field-error'), 'First visit has no premature form errors')
  for (const position of ['rust', 'cpp', 'undecided']) {
    const selected = renderDiscussion({ ...visitor, position })
    assert(selected.includes('101 participants'))
    assert(selected.includes('aria-pressed="true"'))
    assert(!selected.includes('Choose your initial position'))
  }
  const local = { id: 'local-render-test', side: 'cpp', text: '<script>alert("test")</script> Existing tools can reduce risk.' }
  const saved = { ...visitor, position: 'undecided', helpfulIds: ['seed-rust-1', local.id], arguments: [local] }
  let writes = 0
  globalThis.window = {
    location: { hash: '#/comparison/rust-vs-cpp' },
    localStorage: { getItem: () => JSON.stringify(saved), setItem: () => { writes++ } },
  }
  const restored = renderToStaticMarkup(createElement(App))
  assert(restored.includes('Your argument') && restored.includes('Marked helpful'))
  assert(restored.includes('101 participants'))
  assert(restored.includes('&lt;script&gt;') && !restored.includes('<script>alert'), 'Argument text is escaped')
  assert.equal(writes, 0, 'Lazy initialization reads without writing')
  window.localStorage.getItem = () => '{invalid'
  const repaired = renderToStaticMarkup(createElement(App))
  assert(repaired.includes('Some saved data couldn’t be restored.'))
  assert(repaired.includes('Choose your initial position'))
  Object.defineProperty(window, 'localStorage', { get() { throw Error('blocked') } })
  assert(renderToStaticMarkup(createElement(App)).includes('Changes can’t be saved in this browser.'))
  delete globalThis.window
  const feed = renderToStaticMarkup(createElement(DiscoveryFeed, { position: null }))
  assert(feed.includes('#/comparison/rust-vs-cpp'))
  assert(feed.includes('Seeded demonstration data'))
  console.log('Rendered UI checks passed: locked/selected results, both argument sides, initial form, restored content, escaped text, recovery warning and discovery link.')
} finally {
  delete globalThis.window
  await server.close()
}
