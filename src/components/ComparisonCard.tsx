import { ArrowUpRight, MessageSquare, Users } from 'lucide-react'
import { comparison, seedArguments } from '../data/comparison'
import { deriveResults } from '../lib/derive'
import type { Position } from '../types'
export function ComparisonCard({position}: {position: Position | null}) {
 return <article className="comparison-card"><div className="card-meta"><span className="badge">↗ Compare</span><span>TECHNOLOGY</span><span className="edition">NO. 001</span></div><div className="versus-panels"><div className="option rust"><span>OPTION A</span><strong>Rust</strong><small>Safety by design.</small></div><span className="vs">VS</span><div className="option cpp"><span>OPTION B</span><strong>C++</strong><small>Power with history.</small></div></div><div className="card-body"><h2>{comparison.question}</h2><div className="featured"><span className="eyebrow"><MessageSquare size={14}/> SAMPLE PERSPECTIVE · FOR RUST</span><p>“{seedArguments[0].text}”</p></div><div className="card-bottom"><span className="participant"><Users size={17}/><strong>{deriveResults(position).total}</strong> participants<small>Seeded demonstration data{position ? ' + your local vote' : ''}</small></span><a className="button primary" href="#/comparison/rust-vs-cpp">Explore Comparison <ArrowUpRight size={19}/></a></div></div></article>
}
