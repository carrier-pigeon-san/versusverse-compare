import { ArrowLeft } from 'lucide-react'
import { comparison } from '../data/comparison'
import type { Position, VisitorData } from '../types'
import { PositionSelector } from './PositionSelector'
import { ResultsDisplay } from './ResultsDisplay'
import { ArgumentList } from './ArgumentList'
export function DiscussionPage({visitor,setPosition}:{visitor:VisitorData;setPosition:(p:Position)=>void}) {
 return <div className="discussion"><a className="back-link" href="#/"><ArrowLeft size={16}/> Back to feed</a><div className="discussion-title"><span className="badge">↗ Compare</span><span className="eyebrow">TECHNOLOGY · NO. 001</span><h1 tabIndex={-1}>Rust <span className="title-vs">vs.</span> C++</h1><h2>{comparison.question}</h2><p>{comparison.context}</p></div><div className="mini-options"><span className="rust">A / Rust</span><span className="cpp">B / C++</span></div><PositionSelector position={visitor.position} onChoose={setPosition}/><ResultsDisplay position={visitor.position}/><div className="reasoning-intro"><span className="eyebrow">BEFORE YOU SETTLE, SEE BOTH SIDES.</span><p>Different priorities. Different answers. What matters to you?</p></div><ArgumentList visitor={visitor}/><p className="reconsider">↔ Changed your mind? Update your position above.</p></div>
}
