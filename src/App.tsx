import { useEffect, useState } from 'react'
import { ArrowUpRight, Swords } from 'lucide-react'
import { useVisitorState } from './hooks/useVisitorState'
import { DiscoveryFeed } from './components/DiscoveryFeed'
import { DiscussionPage } from './components/DiscussionPage'

export default function App() {
  const state = useVisitorState()
  const [route, setRoute] = useState(window.location.hash)

  useEffect(() => {
    const change = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', change)
    return () => window.removeEventListener('hashchange', change)
  }, [])

  useEffect(() => {
    document.querySelector<HTMLElement>('h1')?.focus()
    window.scrollTo(0, 0)
  }, [route])

  return <>
    <header className="site-header">
      <a className="wordmark" href="#/" aria-label="VersusVerse home">
        <Swords size={27}/>
        <span>VERSUS<span className="wordmark-accent">VERSE</span><span className="wordmark-dot">®</span></span>
      </a>
      <span className="tagline">Explore. Challenge. Decide.</span>
      <button className="coming-soon" disabled>Create Versus <ArrowUpRight size={16}/><small>Coming Soon</small></button>
    </header>
    <div className="nav-strip">
      <span className="active-nav">↗ Compare</span>
      <span>GOOD QUESTIONS. BETTER PERSPECTIVES.</span>
    </div>
    <main>
      {state.warning && <p className="storage-warning" role="status">{state.warning}</p>}
      {state.repaired && <p className="storage-warning" role="status">Some saved data couldn’t be restored.</p>}
      {route === '#/comparison/rust-vs-cpp'
        ? <DiscussionPage {...state}/>
        : <DiscoveryFeed position={state.visitor.position}/>}
    </main>
    <footer><strong>VERSUSVERSE</strong><span>A little curiosity goes a long way.</span><span>POC · Local demo</span></footer>
  </>
}
