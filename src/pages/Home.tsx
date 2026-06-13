import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadSchedule, defaultSchedule, type ScheduleRow } from '../data/siteContent'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RotateScreen from '../components/RotateScreen'
import BackToTop from '../components/BackToTop'
import '../styles/global.css'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [isSticky, setIsSticky] = useState(false)
  const [twitchCount, setTwitchCount] = useState('50.545')
  const [kickCount, setKickCount] = useState('30')
  const [discordCount, setDiscordCount] = useState('1.920')
  const [visitorCount, setVisitorCount] = useState('21.385')
  const [tiktokStart, setTiktokStart] = useState(0)
  const [playingVideos, setPlayingVideos] = useState<string[]>([])
  const [schedule, setSchedule] = useState<ScheduleRow[]>(defaultSchedule)
  const twitchEmbedRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    loadSchedule().then(setSchedule)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (!statsRef.current) return
      const rect = statsRef.current.getBoundingClientRect()
      setIsSticky(rect.bottom < 0)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const fetchDiscord = () =>
      fetch('https://discord.com/api/v9/invites/NFeTaHBgaq?with_counts=true&with_expiration=true')
        .then(r => r.json())
        .then(data => {
          if (data.approximate_member_count)
            setDiscordCount(data.approximate_member_count.toLocaleString('pt-PT'))
        })
        .catch(() => { })

    // Requires VITE_TWITCH_CLIENT_ID and VITE_TWITCH_ACCESS_TOKEN (User Access Token
    // with moderator:read:followers scope) set in .env to fetch live follower count.
    const fetchTwitch = async () => {
      const clientId = import.meta.env.VITE_TWITCH_CLIENT_ID
      const accessToken = import.meta.env.VITE_TWITCH_ACCESS_TOKEN
      if (!clientId || !accessToken) return
      try {
        const userRes = await fetch('https://api.twitch.tv/helix/users?login=valek', {
          headers: { 'Client-Id': clientId, 'Authorization': `Bearer ${accessToken}` },
        })
        const userData = await userRes.json()
        const userId = userData.data?.[0]?.id
        if (!userId) return
        const followRes = await fetch(
          `https://api.twitch.tv/helix/channels/followers?broadcaster_id=${userId}`,
          { headers: { 'Client-Id': clientId, 'Authorization': `Bearer ${accessToken}` } }
        )
        const followData = await followRes.json()
        if (followData.total != null)
          setTwitchCount(followData.total.toLocaleString('pt-PT'))
      } catch { }
    }

    // Kick has no official public API — tries unofficial endpoint, falls back silently on CORS errors.
    const fetchKick = () =>
      fetch('https://kick.com/api/v1/channels/valek')
        .then(r => r.json())
        .then(data => {
          const count = data.followersCount ?? data.followers_count
          if (count != null) setKickCount(Number(count).toLocaleString('pt-PT'))
        })
        .catch(() => { })

    fetchDiscord()
    fetchTwitch()
    fetchKick()

    const interval = setInterval(() => {
      fetchDiscord()
      fetchTwitch()
      fetchKick()
    }, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    fetch('https://api.countapi.xyz/hit/valekofficial.com/visits')
      .then(r => r.json())
      .then(data => {
        if (data.value) setVisitorCount(data.value.toLocaleString('pt-PT'))
      })
      .catch(() => { })
  }, [])

  useEffect(() => {
    const existing = document.querySelector('script[src="https://embed.twitch.tv/embed/v1.js"]')
    if (existing) existing.remove()
    const s = document.createElement('script')
    s.src = 'https://embed.twitch.tv/embed/v1.js'
    s.onload = () => {
      const w = window as unknown as { Twitch: { Embed: new (id: string, opts: object) => void } }
      if (twitchEmbedRef.current) {
        twitchEmbedRef.current.innerHTML = ''
        new w.Twitch.Embed('twitch-embed', { autoplay: false, width: '100%', height: 540, channel: 'valek', theme: 'dark' })
      }
    }
    document.body.appendChild(s)
    return () => { document.querySelector('script[src="https://embed.twitch.tv/embed/v1.js"]')?.remove() }
  }, [])

  const tiktokVideos = [
    { id: '7097674255600504070', thumb: '/img/thumbnail1.png' },
    { id: '7084242255896153350', thumb: '/img/thumbnail2.png' },
    { id: '7058323628101733637', thumb: '/img/thumbnail3.png' },
    { id: '7050865202706910470', thumb: '/img/thumbnail4.png' },
    { id: '7115456499316460805', thumb: '/img/thumbnail5.jpg' },
  ]

  const stats = [
    { icon: <i className="fa-brands fa-twitch stat-icon si-twitch" />, label: 'Twitch', count: twitchCount, href: 'https://www.twitch.tv/valek' },
    { icon: <span className="iconify stat-icon si-kick" data-icon="simple-icons:kick" />, label: 'Kick', count: kickCount, href: 'https://kick.com/ValeK' },
    { icon: <i className="fa-brands fa-instagram stat-icon si-instagram" />, label: 'Instagram', count: '4.580', href: 'https://www.instagram.com/valek.37' },
    { icon: <i className="fa-brands fa-discord stat-icon si-discord" />, label: 'Discord', count: discordCount, href: 'https://discord.com/invite/tTKbtsX9zx' },
    { icon: <i className="fa-solid fa-user stat-icon si-visitors" />, label: 'Visitors', count: visitorCount, href: undefined },
  ]

  return (
    <>
      <RotateScreen />
      {loading && (
        <div className="loader">
          <video autoPlay loop muted className="loader-video">
            <source src="/img/V1.webm" />
          </video>
        </div>
      )}
      <BackToTop />

      <video autoPlay muted loop className="home-bg">
        <source src="/img/video-2mb.mp4" type="video/mp4" />
      </video>

      <div className="page" style={{ background: 'transparent' }}>
        <Navbar />

        {/* HERO */}
        <section className="hero">
          <div className="hero-tag">
            <i className="fa-solid fa-circle" style={{ fontSize: '0.5rem', color: '#22c55e' }} /> Live Streaming &amp; Content
          </div>
          <h1 className="hero-title" data-text="VALEK">VALEK</h1>
          <p className="hero-sub">Counter Strike &amp; Casino Streamer · Content Creator · Soccer Player</p>
          <div className="hero-actions">
            <a href="https://www.twitch.tv/valek" target="_blank" rel="noreferrer" className="btn btn-primary">
              <i className="fa-brands fa-twitch" /> Watch Live
            </a>
            <button className="btn btn-outline" onClick={() => navigate('/about')}>
              About Me
            </button>
          </div>
          <div className="hero-scroll">
            <i className="fa-solid fa-chevron-down" />
          </div>
        </section>

        {/* STATS BAR */}
        <div ref={statsRef} className="stats-bar">
          <div className="stats-bar-inner">
            {stats.map(s => (
              <div key={s.label} className="stat-item"
                onClick={() => s.href && window.open(s.href, '_blank')}
                style={{ cursor: s.href ? 'pointer' : 'default' }}>
                {s.icon}
                <div className="stat-info">
                  <span className="stat-count">{s.count}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* STICKY STATS */}
        {isSticky && (
          <div className="stats-sticky">
            <div className="stats-bar-inner">
              {stats.map(s => (
                <div key={s.label} className="stat-item"
                  onClick={() => s.href && window.open(s.href, '_blank')}
                  style={{ cursor: s.href ? 'pointer' : 'default' }}>
                  {s.icon}
                  <div className="stat-info">
                    <span className="stat-count">{s.count}</span>
                    <span className="stat-label">{s.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PLATFORM CARDS */}
        <section className="platforms-section">
          <div className="platforms-header">
            <span className="section-label">Platforms</span>
            <h2>Find me <span className="gradient-text">everywhere</span></h2>
          </div>
          <div className="platforms-grid">
            <div className="platform-card pc-about" onClick={() => navigate('/about')}>
              <div className="platform-card-img-icon">
                <img src="/img/valek1-fixed.png" alt="ValeK" style={{ borderRadius: 12 }} />
              </div>
              <div className="platform-card-body">
                <div className="platform-card-platform">
                  <i className="fa-solid fa-user" /> Streamer
                </div>
                <div className="platform-card-title">Ruben Vale</div>
                <div className="platform-card-desc">Counter Strike player, content creator and soccer player. 26 years old, Portuguese.</div>
              </div>
            </div>
            <div className="platform-card pc-twitch" onClick={() => window.open('https://www.twitch.tv/valek', '_blank')}>
              <div className="platform-card-img-icon">
                <img src="/img/twitch.png" alt="Twitch" />
              </div>
              <div className="platform-card-body">
                <div className="platform-card-platform">
                  <i className="fa-brands fa-twitch" /> Twitch
                </div>
                <div className="platform-card-title">Livestreams</div>
                <div className="platform-card-desc">Watch live and earn rewards as a viewer or subscriber.</div>
              </div>
            </div>
            <div className="platform-card pc-instagram" onClick={() => window.open('https://www.instagram.com/valek.37', '_blank')}>
              <div className="platform-card-img-icon">
                <img src="/img/instagram.png" alt="Instagram" />
              </div>
              <div className="platform-card-body">
                <div className="platform-card-platform">
                  <i className="fa-brands fa-instagram" /> Instagram
                </div>
                <div className="platform-card-title">@valek.37</div>
                <div className="platform-card-desc">Daily life, clips, and behind the scenes content.</div>
              </div>
            </div>
            <div className="platform-card pc-discord" onClick={() => window.open('https://discord.com/invite/tTKbtsX9zx', '_blank')}>
              <div className="platform-card-img-icon">
                <img src="/img/discord.png" alt="Discord" />
              </div>
              <div className="platform-card-body">
                <div className="platform-card-platform">
                  <i className="fa-brands fa-discord" /> Discord
                </div>
                <div className="platform-card-title">Community</div>
                <div className="platform-card-desc">Join the community for giveaways, promos and updates.</div>
              </div>
            </div>
          </div>

          <div className="content-schedule">
            <span className="content-schedule-title">
              <i className="fa-solid fa-bolt" /> New content every day
            </span>
            <div className="content-schedule-items">
              <div className="content-schedule-item cs-youtube">
                <i className="fa-brands fa-youtube" />
                <span className="cs-platform">YouTube Shorts</span>
                <span className="cs-time">18:00</span>
              </div>
              <div className="content-schedule-item cs-tiktok">
                <i className="fa-brands fa-tiktok" />
                <span className="cs-platform">TikTok Shorts</span>
                <span className="cs-time">18:30</span>
              </div>
              <div className="content-schedule-item cs-instagram">
                <i className="fa-brands fa-instagram" />
                <span className="cs-platform">Instagram</span>
                <span className="cs-time">19:00</span>
              </div>
            </div>
          </div>
        </section>

        {/* SCHEDULE */}
        <section className="schedule-section">
          <div className="schedule-header">
            <span className="section-label">Horário</span>
            <div className="schedule-title-row">
              <i className="fa-regular fa-clock schedule-clock" />
              <h2>Horário <span className="gradient-text">Semanal</span></h2>
              <i className="fa-brands fa-twitch schedule-twitch" />
            </div>
          </div>
          <div className="schedule-table">
            {schedule.map(row => (
              <div key={row.day} className="schedule-row">
                <div className="schedule-day">
                  <span className="schedule-icon"><i className={row.icon} /></span>
                  <span className="schedule-dayname">{row.day}</span>
                  <span className="schedule-date">({row.date})</span>
                </div>
                <div className="schedule-time">{row.time}</div>
              </div>
            ))}
          </div>
        </section>

        {/* TIKTOK */}
        <section className="tiktok-section">
          <div className="tiktok-section-header">
            <span className="section-label">TikTok</span>
            <h2>Best <span className="gradient-text">Highlights</span></h2>
          </div>
          <div className="tiktok-carousel">
            <button
              className="tiktok-arrow tiktok-arrow-left"
              onClick={() => setTiktokStart(i => Math.max(0, i - 3))}
              disabled={tiktokStart === 0}
              aria-label="Previous highlights">
              <i className="fa-solid fa-chevron-left" />
            </button>
            <div className="tiktok-embeds-row">
              {tiktokVideos.slice(tiktokStart, tiktokStart + 3).map(v => (
                <div key={v.id} className="tiktok-embed">
                  {playingVideos.includes(v.id) ? (
                    <iframe
                      className="tiktok-player"
                      src={`https://www.tiktok.com/player/v1/${v.id}?autoplay=1&controls=1&description=0&music_info=0`}
                      allow="autoplay; fullscreen"
                      allowFullScreen
                      title={`TikTok ${v.id}`} />
                  ) : (
                    <button
                      className="tiktok-thumb"
                      onClick={() => setPlayingVideos(p => [...p, v.id])}
                      aria-label="Play highlight">
                      <img src={v.thumb} alt="" />
                      <span className="tiktok-play"><i className="fa-solid fa-play" /></span>
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              className="tiktok-arrow tiktok-arrow-right"
              onClick={() => setTiktokStart(i => Math.min(tiktokVideos.length - 3, i + 3))}
              disabled={tiktokStart >= tiktokVideos.length - 3}
              aria-label="Next highlights">
              <i className="fa-solid fa-chevron-right" />
            </button>
          </div>
          <div className="tiktok-responsive-grid">
            {tiktokVideos.map(v => (
              <a key={v.id} href={`https://www.tiktok.com/@eslcounterstrike/video/${v.id}`} target="_blank" rel="noreferrer">
                <img src={v.thumb} alt="" />
              </a>
            ))}
          </div>
        </section>

        {/* TWITCH EMBED */}
        <section className="twitch-section">
          <div className="twitch-section-inner">
            <div className="twitch-section-header">
              <span className="section-label">Twitch</span>
              <h2>Live <span className="gradient-text">Stream</span></h2>
            </div>
            <div className="twitch-embed-wrap">
              <div id="twitch-embed" ref={twitchEmbedRef} style={{ width: '100%' }} />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
