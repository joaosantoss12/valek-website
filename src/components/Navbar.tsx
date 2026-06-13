import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import '../styles/global.css'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLive, setIsLive] = useState<boolean | null>(null)
  const navigate = useNavigate()
  const location = useLocation()

  // Keyless live check via decapi.me — returns "... is offline" when not live.
  useEffect(() => {
    const check = () =>
      fetch('https://decapi.me/twitch/uptime/valek')
        .then(r => r.text())
        .then(t => setIsLive(!/offline/i.test(t)))
        .catch(() => setIsLive(false))
    check()
    const interval = setInterval(check, 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const goTo = (path: string) => {
    setMenuOpen(false)
    navigate(path)
  }

  const active = (path: string) => (location.pathname === path ? 'active' : '')

  const links = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Me' },
    { path: '/sponsors', label: 'Sponsors' },
    { path: '/giveaways', label: 'Giveaways' },
    { path: '/settings', label: 'Settings' },
    { path: '/store', label: 'Store' },
    { path: '/contacts', label: 'Contacts' },
  ]

  const socials = [
    { href: 'https://www.twitch.tv/valek', cls: 's-twitch', icon: <i className="fa-brands fa-twitch" /> },
    { href: 'https://kick.com/ValeK', cls: 's-kick', icon: <span className="iconify" data-icon="simple-icons:kick" /> },
    { href: 'https://www.instagram.com/valek.37', cls: 's-instagram', icon: <i className="fa-brands fa-instagram" /> },
    { href: 'https://www.tiktok.com/@valek.37', cls: 's-tiktok', icon: <i className="fa-brands fa-tiktok" /> },
    { href: 'https://t.me/valektwitch', cls: 's-telegram', icon: <i className="fa-brands fa-telegram" /> },
    { href: 'https://www.youtube.com/@ValeK37/shorts', cls: 's-youtube', icon: <i className="fa-brands fa-youtube" /> },
    { href: 'https://discord.com/invite/tTKbtsX9zx', cls: 's-discord', icon: <i className="fa-brands fa-discord" /> },
  ]

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <div className="navbar-brand" onClick={() => goTo('/')}>
            <img src="/img/valek.jpeg" alt="ValeK" />
            <span className="navbar-brand-name">ValeK</span>
          </div>

          {isLive !== null && (
            <a
              className={`navbar-live${isLive ? ' live' : ''}`}
              href="https://www.twitch.tv/valek"
              target="_blank"
              rel="noreferrer"
              title={isLive ? 'Live on Twitch now' : 'Currently offline'}>
              <span className="navbar-live-dot" />
              <span className="navbar-live-label">{isLive ? 'Online' : 'Offline'}</span>
            </a>
          )}
        </div>

        <div className="navbar-links">
          {links.map(l => (
            <a key={l.path} href={l.path} className={active(l.path)}
              onClick={e => { e.preventDefault(); goTo(l.path) }}>
              {l.label}
            </a>
          ))}
        </div>

        <div className="navbar-right">
          <div className="navbar-socials">
            {socials.map(s => (
              <a key={s.href} className={s.cls} href={s.href} target="_blank" rel="noreferrer">{s.icon}</a>
            ))}
          </div>
          <button className="navbar-burger" onClick={() => setMenuOpen(o => !o)}>
            <i className={`fa-solid fa-${menuOpen ? 'xmark' : 'bars'}`} />
          </button>
        </div>
      </nav>

      <div className={`navbar-mobile-menu${menuOpen ? ' open' : ''}`}>
        {links.map(l => (
          <a key={l.path} href={l.path} className={active(l.path)}
            onClick={e => { e.preventDefault(); goTo(l.path) }}>
            {l.label}
          </a>
        ))}
        <div className="navbar-mobile-divider" />
        <div className="navbar-mobile-socials">
          {socials.map(s => (
            <a key={s.href} className={s.cls} href={s.href} target="_blank" rel="noreferrer">{s.icon}</a>
          ))}
        </div>
      </div>
    </>
  )
}
