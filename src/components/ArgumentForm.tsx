import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { LocalArgument, Side } from '../types'

export function ArgumentForm({ onSubmit }: { onSubmit: (argument: LocalArgument) => void }) {
  const [side, setSide] = useState<Side | ''>('')
  const [text, setText] = useState('')
  const [attempted, setAttempted] = useState(false)
  const [success, setSuccess] = useState('')
  const submitting = useRef(false)
  const length = text.trim().length
  const sideError = attempted && !side ? 'Choose which option your argument supports.' : ''
  const textError = !attempted ? '' : length < 10 ? 'Please provide at least 10 characters explaining your argument.' : length > 1000 ? 'Arguments cannot exceed 1,000 characters.' : ''

  useEffect(() => {
    // The guard is released only after the controlled empty form is rendered.
    if (!text && !side) submitting.current = false
  }, [text, side])

  return <section className="contribute-section" aria-labelledby="contribute-heading">
    <span className="eyebrow">ADD A LITTLE REASONING.</span>
    <h2 id="contribute-heading">What’s your perspective?</h2>
    <p>Your argument can support either side, whatever your vote.</p>
    <form noValidate onSubmit={event => {
      event.preventDefault()
      if (submitting.current) return
      setAttempted(true)
      setSuccess('')
      if (!side || length < 10 || length > 1000) return
      submitting.current = true
      onSubmit({ id: `local-${crypto.randomUUID()}`, side, text: text.trim() })
      setSide('')
      setText('')
      setAttempted(false)
      setSuccess('Argument posted.')
    }}>
      <label htmlFor="argument-side">Which option does your argument support?</label>
      <select id="argument-side" value={side} onChange={event => { setSide(event.target.value as Side | ''); setSuccess('') }} aria-invalid={Boolean(sideError)} aria-describedby={sideError ? 'side-error' : undefined}>
        <option value="">Choose a side</option><option value="rust">Rust</option><option value="cpp">C++</option>
      </select>
      {sideError && <p className="field-error" id="side-error">{sideError}</p>}
      <label htmlFor="argument-text">Your reasoning</label>
      <textarea id="argument-text" value={text} rows={4} placeholder="Make a case. Share a tradeoff. Offer a new angle…" onChange={event => { setText(event.target.value); setSuccess('') }} aria-invalid={Boolean(textError)} aria-describedby={textError ? 'argument-counter text-error' : 'argument-counter'}/>
      <div className="form-caption"><span id="argument-counter">{length.toLocaleString()} / 1,000 characters · minimum 10</span><span>Saved in this browser only</span></div>
      {textError && <p className="field-error" id="text-error">{textError}</p>}
      <div className="form-actions"><button className="button primary" type="submit">Post argument <ArrowUpRight size={17}/></button><p className="success-message" role="status">{success}</p></div>
    </form>
  </section>
}
