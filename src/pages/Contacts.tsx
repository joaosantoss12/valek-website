import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RotateScreen from '../components/RotateScreen'
import BackToTop from '../components/BackToTop'
import { sendContactMessage } from '../data/siteContent'
import '../styles/global.css'

const empty = { name: '', email: '', subject: '', message: '' }

export default function Contacts() {
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const update = (field: keyof typeof empty, value: string) =>
    setForm(f => ({ ...f, [field]: value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')
    const { error } = await sendContactMessage(form)
    if (error) {
      setStatus('error')
      setErrorMsg(error)
    } else {
      setStatus('sent')
      setForm(empty)
    }
  }

  return (
    <div className="page contacts-page">
      <RotateScreen />
      <BackToTop />
      <Navbar />

      <div className="contacts-section">
        <div className="contacts-header">
          <span className="section-label">Contact</span>
          <h1>Get in <span className="gradient-text">touch</span></h1>
          <p>Business, sponsorships or just to say hi — drop me a message below.</p>
        </div>

        <form className="contacts-form" onSubmit={submit}>
          <div className="contacts-row">
            <label>Name
              <input required value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your name" />
            </label>
            <label>Email
              <input required type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@email.com" />
            </label>
          </div>
          <label>Subject
            <input required value={form.subject} onChange={e => update('subject', e.target.value)} placeholder="What's this about?" />
          </label>
          <label>Message
            <textarea required rows={6} value={form.message} onChange={e => update('message', e.target.value)} placeholder="Write your message…" />
          </label>

          <div className="contacts-submit">
            <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
            {status === 'sent' && <span className="contacts-ok">✓ Message sent — thanks!</span>}
            {status === 'error' && <span className="contacts-err">Error: {errorMsg}</span>}
          </div>
        </form>
      </div>

      <Footer />
    </div>
  )
}
