import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RotateScreen from '../components/RotateScreen'
import BackToTop from '../components/BackToTop'
import { loadSponsors, defaultSponsors, type Sponsor } from '../data/siteContent'
import '../styles/global.css'

interface ModalState { visible: boolean; imgSrc: string; text: string }

function SponsorCard({ sp, onInfo }: { sp: Sponsor; onInfo: (sp: Sponsor) => void }) {
  return (
    <div className="sponsor-card">
      <div className={`sponsor-card-logo${sp.id === 'btn22bit' && sp.imgScale == null ? ' logo-sm' : ''}`} onClick={() => window.open(sp.link, '_blank')}>
        <img
          src={sp.img}
          alt={sp.name}
          style={sp.imgScale != null ? { width: `${sp.imgScale}%`, height: `${sp.imgScale}%` } : undefined}
        />
      </div>
      {sp.stats.map(s => (
        <div key={s.label} className="sponsor-card-stat">
          <div className="sponsor-card-stat-label" style={{ color: sp.color }}>{s.label}</div>
          <div className="sponsor-card-stat-value">{s.value}</div>
        </div>
      ))}
      <div className="sponsor-card-actions">
        <button className="sponsor-btn" onClick={() => onInfo(sp)}>Info</button>
        <button className="sponsor-btn" onClick={() => window.open(sp.link, '_blank')}>Link</button>
        <button className="sponsor-btn primary"
          onClick={() => window.open('https://discord.gg/tTKbtsX9zx', '_blank')}>
          Promos
        </button>
      </div>
    </div>
  )
}

export default function Sponsors() {
  const [sponsors, setSponsors] = useState<Sponsor[]>(defaultSponsors)
  const [modal, setModal] = useState<ModalState>({ visible: false, imgSrc: '', text: '' })

  useEffect(() => {
    loadSponsors().then(setSponsors)
  }, [])

  const openModal = (sp: Sponsor) =>
    setModal({ visible: true, imgSrc: sp.img, text: sp.info ?? '' })

  const closeModal = () => setModal(m => ({ ...m, visible: false }))

  const sponsorsLeft = sponsors.filter(s => s.side === 'left')
  const sponsorsRight = sponsors.filter(s => s.side === 'right')

  return (
    <div className="page sponsors-page">
      <RotateScreen />
      <BackToTop />
      <Navbar />

      <div className="sponsors-header">
        <span className="section-label">Partners</span>
        <h1>Our <span className="gradient-text">Sponsors</span></h1>
        <p>Support the stream and unlock exclusive bonuses using ValeK's codes.</p>
      </div>

      <div className="sponsors-columns">
        <div className="sponsors-col">
          {sponsorsLeft.map(sp => <SponsorCard key={sp.id} sp={sp} onInfo={openModal} />)}
        </div>
        <div className="sponsors-col">
          {sponsorsRight.map(sp => <SponsorCard key={sp.id} sp={sp} onInfo={openModal} />)}
        </div>
      </div>

      {/* Modal */}
      <div className={`modal-overlay${modal.visible ? ' open' : ''}`}
        onClick={e => { if (e.target === e.currentTarget) closeModal() }}>
        <div className="modal-box">
          <button className="modal-close" onClick={closeModal}>
            <i className="fa-solid fa-xmark" />
          </button>
          <img className="modal-logo" src={modal.imgSrc} alt="Sponsor" />
          <div className="modal-text" dangerouslySetInnerHTML={{ __html: modal.text }} />
        </div>
      </div>

      <Footer />
    </div>
  )
}
