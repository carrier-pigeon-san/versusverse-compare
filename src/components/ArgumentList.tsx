import { labels } from '../data/comparison'
import { deriveArguments } from '../lib/derive'
import type { VisitorData } from '../types'
export function ArgumentList({visitor}:{visitor:VisitorData}) {
 const args=deriveArguments(visitor)
 return <div className="argument-groups">{(['rust','cpp'] as const).map(side=><section key={side} aria-label={`For ${labels[side]}`}><h2 className={`argument-heading ${side}`}><span>For {labels[side]}</span><small>{args.filter(a=>a.side===side).length} perspectives</small></h2>{args.filter(a=>a.side===side).map(a=><article className="argument" key={a.id}><div className="argument-meta"><strong>{a.author}</strong><span>{a.label} · For {labels[a.side]}</span></div><p>{a.text}</p><span className="helpful-readonly">{a.helpful} found this helpful</span></article>)}</section>)}</div>
}
