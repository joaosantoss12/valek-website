import { useState, useEffect } from 'react'
import {
  loadSchedule, saveSchedule, defaultSchedule, type ScheduleRow,
  loadSponsors, saveSponsors, defaultSponsors, uploadSponsorImage, type Sponsor,
  loadContactMessages, deleteContactMessage, type ContactMessage,
} from '../data/siteContent'
import { isSupabaseConfigured } from '../lib/supabase'
import '../styles/admin.css'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string | undefined

const ICON_PRESETS = [
  'fa-solid fa-calendar-days', 'fa-solid fa-fire', 'fa-solid fa-gamepad',
  'fa-solid fa-khanda', 'fa-solid fa-crosshairs', 'fa-solid fa-crown',
  'fa-solid fa-star', 'fa-solid fa-trophy', 'fa-solid fa-bolt',
  'fa-solid fa-skull', 'fa-solid fa-futbol', 'fa-solid fa-heart',
]

/* ================================================================
   Password gate
   ================================================================ */
function Gate({ onUnlock }: { onUnlock: () => void }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!ADMIN_PASSWORD) {
      setError('No admin password is set. Add VITE_ADMIN_PASSWORD to your .env file.')
      return
    }
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem('valek_admin', '1')
      onUnlock()
    } else {
      setError('Wrong password.')
    }
  }

  return (
    <div className="admin-gate">
      <form className="admin-gate-box" onSubmit={submit}>
        <h1>Admin Access</h1>
        <input
          type="password"
          placeholder="Password"
          value={pw}
          onChange={e => setPw(e.target.value)}
          autoFocus
        />
        {error && <p className="admin-error">{error}</p>}
        <button type="submit" className="admin-btn primary">Enter</button>
      </form>
    </div>
  )
}

/* ================================================================
   Schedule editor
   ================================================================ */
function ScheduleEditor() {
  const [rows, setRows] = useState<ScheduleRow[]>(defaultSchedule)
  const [status, setStatus] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => { loadSchedule().then(setRows) }, [])

  const update = (i: number, field: keyof ScheduleRow, value: string) =>
    setRows(rs => rs.map((r, idx) => idx === i ? { ...r, [field]: value } : r))

  const addRow = () =>
    setRows(rs => [...rs, { day: '', date: '', time: '', icon: 'fa-solid fa-star' }])

  const removeRow = (i: number) => setRows(rs => rs.filter((_, idx) => idx !== i))

  const move = (i: number, dir: -1 | 1) =>
    setRows(rs => {
      const j = i + dir
      if (j < 0 || j >= rs.length) return rs
      const copy = [...rs]
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
      return copy
    })

  const save = async () => {
    setSaving(true)
    setStatus('')
    const { error } = await saveSchedule(rows)
    setSaving(false)
    setStatus(error ? `Error: ${error}` : 'Schedule saved ✓')
  }

  return (
    <section className="admin-section">
      <div className="admin-section-head">
        <h2>Weekly Schedule</h2>
        <button className="admin-btn" onClick={addRow}>+ Add day</button>
      </div>
      <div className="admin-rows">
        {rows.map((r, i) => (
          <div key={i} className="admin-row">
            <span className="admin-icon-preview"><i className={r.icon} /></span>
            <div className="admin-fields">
              <label>Day
                <input value={r.day} onChange={e => update(i, 'day', e.target.value)} placeholder="Segunda-feira" />
              </label>
              <label>Date
                <input value={r.date} onChange={e => update(i, 'date', e.target.value)} placeholder="Dia 15" />
              </label>
              <label>Time
                <input value={r.time} onChange={e => update(i, 'time', e.target.value)} placeholder="10H - 14H" />
              </label>
              <label>Icon
                <input list="icon-presets" value={r.icon} onChange={e => update(i, 'icon', e.target.value)} placeholder="fa-solid fa-star" />
              </label>
            </div>
            <div className="admin-row-actions">
              <button className="admin-btn sm" onClick={() => move(i, -1)} title="Move up">↑</button>
              <button className="admin-btn sm" onClick={() => move(i, 1)} title="Move down">↓</button>
              <button className="admin-btn sm danger" onClick={() => removeRow(i)} title="Remove">✕</button>
            </div>
          </div>
        ))}
      </div>
      <datalist id="icon-presets">
        {ICON_PRESETS.map(ic => <option key={ic} value={ic} />)}
      </datalist>
      <div className="admin-save-bar">
        <button className="admin-btn primary" onClick={save} disabled={saving}>
          {saving ? 'Saving…' : 'Save schedule'}
        </button>
        {status && <span className="admin-status">{status}</span>}
      </div>
    </section>
  )
}

/* ================================================================
   Sponsors editor
   ================================================================ */
function SponsorsEditor() {
  const [sponsors, setSponsors] = useState<Sponsor[]>(defaultSponsors)
  const [status, setStatus] = useState('')
  const [saving, setSaving] = useState(false)
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null)

  useEffect(() => { loadSponsors().then(setSponsors) }, [])

  const handleUpload = async (i: number, file: File) => {
    setUploadingIdx(i)
    setStatus('')
    const { url, error } = await uploadSponsorImage(file)
    setUploadingIdx(null)
    if (error) { setStatus(`Upload error: ${error}`); return }
    update(i, { img: url })
  }

  const update = (i: number, patch: Partial<Sponsor>) =>
    setSponsors(sl => sl.map((s, idx) => idx === i ? { ...s, ...patch } : s))

  const updateStat = (i: number, si: number, field: 'label' | 'value', value: string) =>
    setSponsors(sl => sl.map((s, idx) => {
      if (idx !== i) return s
      const stats = s.stats.map((st, j) => j === si ? { ...st, [field]: value } : st)
      return { ...s, stats }
    }))

  const addSponsor = () =>
    setSponsors(sl => [...sl, {
      id: `sp_${Date.now()}`, side: 'left', img: '', name: 'New Sponsor', link: '',
      color: '#7c3aed',
      stats: [{ label: 'Code', value: '' }, { label: 'Bonus', value: '' }, { label: 'Extra', value: '' }],
      info: '',
    }])

  const removeSponsor = (i: number) => setSponsors(sl => sl.filter((_, idx) => idx !== i))

  const save = async () => {
    setSaving(true)
    setStatus('')
    const { error } = await saveSponsors(sponsors)
    setSaving(false)
    setStatus(error ? `Error: ${error}` : 'Sponsors saved ✓')
  }

  return (
    <section className="admin-section">
      <div className="admin-section-head">
        <h2>Sponsors</h2>
        <button className="admin-btn" onClick={addSponsor}>+ Add sponsor</button>
      </div>
      <div className="admin-cards">
        {sponsors.map((s, i) => (
          <div key={s.id} className="admin-card">
            <div className="admin-card-head">
              <div className="admin-logo-preview">
                {s.img
                  ? <img src={s.img} alt={s.name} style={{ width: `${s.imgScale ?? 100}%`, height: `${s.imgScale ?? 100}%` }} />
                  : <span>No image</span>}
              </div>
              <strong>{s.name || 'Untitled'}</strong>
              <button className="admin-btn sm danger" onClick={() => removeSponsor(i)} title="Remove sponsor">✕ Remove</button>
            </div>
            <div className="admin-fields">
              <label>Name
                <input value={s.name} onChange={e => update(i, { name: e.target.value })} />
              </label>
              <label>Column
                <select value={s.side} onChange={e => update(i, { side: e.target.value as 'left' | 'right' })}>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </label>
              <label>Logo image
                <span className="admin-upload">
                  <label className="admin-btn sm admin-upload-btn">
                    {uploadingIdx === i ? 'Uploading…' : 'Choose file'}
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      disabled={uploadingIdx !== null}
                      onChange={e => { const f = e.target.files?.[0]; if (f) handleUpload(i, f); e.target.value = '' }}
                    />
                  </label>
                </span>
              </label>
              <label>…or image URL / path
                <input value={s.img} onChange={e => update(i, { img: e.target.value })} placeholder="/img/sponsor.png" />
              </label>
              <label>Logo size — {s.imgScale ?? 100}%
                <input
                  type="range" min={40} max={130} step={5}
                  value={s.imgScale ?? 100}
                  onChange={e => update(i, { imgScale: Number(e.target.value) })}
                />
              </label>
              <label>Link
                <input value={s.link} onChange={e => update(i, { link: e.target.value })} placeholder="https://…" />
              </label>
              <label>Accent color
                <input type="color" value={s.color} onChange={e => update(i, { color: e.target.value })} />
              </label>
            </div>
            <div className="admin-stats">
              {s.stats.map((st, si) => (
                <div key={si} className="admin-stat">
                  <input value={st.label} onChange={e => updateStat(i, si, 'label', e.target.value)} placeholder="Label" />
                  <input value={st.value} onChange={e => updateStat(i, si, 'value', e.target.value)} placeholder="Value" />
                </div>
              ))}
            </div>
            <label className="admin-info-label">Info (modal text — HTML allowed)
              <textarea value={s.info} onChange={e => update(i, { info: e.target.value })} rows={4} />
            </label>
          </div>
        ))}
      </div>
      <div className="admin-save-bar">
        <button className="admin-btn primary" onClick={save} disabled={saving}>
          {saving ? 'Saving…' : 'Save sponsors'}
        </button>
        {status && <span className="admin-status">{status}</span>}
      </div>
    </section>
  )
}

/* ================================================================
   Contact messages viewer
   ================================================================ */
function MessagesViewer() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)

  const refresh = () => {
    setLoading(true)
    loadContactMessages().then(m => { setMessages(m); setLoading(false) })
  }
  useEffect(refresh, [])

  const remove = async (id?: string) => {
    if (!id) return
    await deleteContactMessage(id)
    setMessages(ms => ms.filter(m => m.id !== id))
  }

  const fmt = (d?: string) => d ? new Date(d).toLocaleString('pt-PT') : ''

  return (
    <section className="admin-section">
      <div className="admin-section-head">
        <h2>Contact Messages {messages.length > 0 && <span className="admin-badge">{messages.length}</span>}</h2>
        <button className="admin-btn" onClick={refresh}>↻ Refresh</button>
      </div>
      {loading ? (
        <p className="admin-muted">Loading…</p>
      ) : messages.length === 0 ? (
        <p className="admin-muted">No messages yet.</p>
      ) : (
        <div className="admin-messages">
          {messages.map(m => (
            <div key={m.id} className="admin-message">
              <div className="admin-message-head">
                <strong>{m.subject || '(no subject)'}</strong>
                <span className="admin-message-date">{fmt(m.created_at)}</span>
                <button className="admin-btn sm danger" onClick={() => remove(m.id)} title="Delete">✕</button>
              </div>
              <div className="admin-message-from">
                {m.name} · <a href={`mailto:${m.email}`}>{m.email}</a>
              </div>
              <p className="admin-message-body">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

/* ================================================================
   Page
   ================================================================ */
export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('valek_admin') === '1')

  if (!authed) return <Gate onUnlock={() => setAuthed(true)} />

  const logout = () => {
    sessionStorage.removeItem('valek_admin')
    setAuthed(false)
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>ValeK — Admin</h1>
        <button className="admin-btn" onClick={logout}>Log out</button>
      </header>

      {!isSupabaseConfigured && (
        <div className="admin-warning">
          ⚠️ Supabase is not configured. Add <code>VITE_SUPABASE_URL</code> and{' '}
          <code>VITE_SUPABASE_ANON_KEY</code> to your <code>.env</code> file — until then,
          changes can't be saved.
        </div>
      )}

      <ScheduleEditor />
      <SponsorsEditor />
      <MessagesViewer />
    </div>
  )
}
