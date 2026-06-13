import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RotateScreen from '../components/RotateScreen'
import BackToTop from '../components/BackToTop'
import '../styles/settings.css'

interface Row { label: string; value: string }

/* ---- CS — Mouse & sensitivity ---- */
const mouseSens: Row[] = [
  { label: 'Sens (In-game)', value: '1.4' },
  { label: 'Mouse DPI', value: '400' },
  { label: 'Rate', value: '4000 Hz' },
  { label: 'Acceleration', value: 'No' },
  { label: 'Raw Input', value: '1' },
  { label: 'Windows', value: '6/11' },
  { label: 'Zoom sensitivity', value: '1' },
  { label: 'm_yaw', value: '0.022' },
]

/* ---- CS — Video ---- */
const videoBasic: Row[] = [
  { label: 'Brilho', value: '85%' },
  { label: 'Modo de Escala (Scaling Mode)', value: 'Esticado (Stretched)' },
  { label: 'Proporção de imagem', value: '4:3' },
  { label: 'Resolução', value: '1280x960' },
  { label: 'Modo de apresentação', value: 'Ecrã completo' },
  { label: 'Taxa de atualização', value: '360 Hz' },
]
const videoAdvanced: Row[] = [
  { label: 'Aumentar contraste de jogadores', value: 'Ativo' },
  { label: 'Sinc. vertical', value: 'Desativado' },
  { label: 'Anti-Aliasing - Multisampling', value: '8x MSAA' },
  { label: 'Qualidade global das sombras', value: 'Alto' },
  { label: 'Detalhes dos modelos/texturas', value: 'Muito alto' },
  { label: 'Modo de filtragem de texturas', value: 'Anisotrópico 4X' },
  { label: 'Detalhe dos shaders', value: 'Baixo' },
  { label: 'Detalhe das partículas', value: 'Baixo' },
  { label: 'Oclusão de ambiente', value: 'Desativado' },
  { label: 'High Dynamic Range', value: 'Qualidade' },
  { label: 'FidelityFX Super Resolution (FSR)', value: 'Desativado (maior qualidade)' },
  { label: 'NVIDIA Reflex Low Latency', value: 'Ativado' },
]

/* ---- CS — Viewmodel / HUD / Radar ---- */
const viewmodel: Row[] = [
  { label: 'viewmodel_fov', value: '64' },
  { label: 'viewmodel_offset_x', value: '1' },
  { label: 'viewmodel_offset_y', value: '1' },
  { label: 'viewmodel_offset_z', value: '-1' },
  { label: 'cl_prefer_lefthanded', value: 'true' },
]
const hud: Row[] = [
  { label: 'hud_scaling', value: '1' },
  { label: 'cl_hud_color', value: '3' },
  { label: 'cl_showloadout', value: '1' },
  { label: 'safezonex', value: '1' },
  { label: 'safezoney', value: '1' },
]
const radar: Row[] = [
  { label: 'cl_hud_radar_scale', value: '1.11' },
  { label: 'cl_radar_scale', value: '0.35' },
  { label: 'cl_radar_always_centered', value: '0' },
  { label: 'cl_radar_rotate', value: '0' },
  { label: 'cl_radar_icon_scale_min', value: '0.6' },
]
/* ---- CS — Audio (fill in your values) ---- */
const audio: Row[] = [
  // e.g. { label: 'volume', value: '1' },
]

const launchOptions = '-high -novid -noreflex +rate 1000000 -allow_third_party_software +fps_max 0'

const binds = [
  'bind "c" "toggle gameinstructor_enable"',
  'bind "v" "noclip"',
  'bind "\\" "toggleconsole"',
  'bind "mwheeldown" "+jump"',
  'bind "mwheelup" "+jump"',
  'bind mouse5 "incrementvar cl_crosshairsize 1 4000 3997.500000"',
]

/* ---- Gear ---- */
const equip: Row[] = [
  { label: 'Mouse', value: 'Razer Viper V3 PRO' },
  { label: 'Mousepad', value: 'Sharkoon 1337 RGB V2 900' },
  { label: 'Keyboard', value: 'ROG Claymore II Wireless RX Red' },
  { label: 'Headset', value: 'SteelSeries Arctis Pro Wireless' },
  { label: 'Micro', value: 'Shure SM7B + Cloudlifter CL-1 + TC-Helicon GO XLR' },
]
const monitor: Row[] = [
  { label: 'Monitor', value: 'BenQ XL2586X+ 600Hz DyAc2 24.1"' },
]
const monitorSettings: Row[] = [
  { label: 'Brightness', value: '100' },
  { label: 'Contrast', value: '50' },
  { label: 'Low Blue Light', value: '0' },
  { label: 'Black eQ', value: '15' },
  { label: 'Color Vibrance', value: '15' },
  { label: 'Mode', value: 'Fps1' },
  { label: 'Sharpness', value: '10' },
  { label: 'Gamma', value: '3' },
  { label: 'DyAc2', value: 'Premium' },
  { label: 'AMA', value: 'Premium' },
  { label: 'Color Temperature RGB', value: '100' },
]

/* ---- PC ---- */
const pc: Row[] = [
  { label: 'CPU', value: 'AMD Ryzen 9 9950X3D 16-Core 144MB' },
  { label: 'GPU', value: 'GeForce® RTX 4090 TUF Gaming OC 24GB GDDR6X' },
  { label: 'BOARD', value: 'ATX Asus ROG Strix X670E-A Gaming WiFi' },
  { label: 'COOLER', value: 'Water NZXT Kraken 360 LCD RGB Branco' },
  { label: 'RAM', value: 'Fury Beast 64GB RGB (2x32GB) DDR5-6000MHz CL30' },
  { label: 'SSD', value: 'Samsung 980 Pro SSD 2TB PCIe 4.0 NVMe M.2' },
  { label: 'POWER', value: 'Asus ROG Thor 1600W 80Plus Titanium Full Modular' },
  { label: 'CASE', value: 'E-ATX Lian Li O11 Dynamic EVO XL' },
]

type TopTab = 'cs' | 'gear' | 'pc'
type CsTab = 'mouse' | 'video' | 'viewmodel' | 'hud' | 'radar' | 'audio' | 'binds' | 'launch'

function RowList({ rows }: { rows: Row[] }) {
  return (
    <div className="settings-rows">
      {rows.map(r => (
        <div key={r.label} className="settings-row">
          <span className="settings-row-label">{r.label}</span>
          <span className="settings-row-value">{r.value}</span>
        </div>
      ))}
    </div>
  )
}

function CodeBlock({ text, multiline }: { text: string; multiline?: boolean }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }).catch(() => {})
  }
  return (
    <div className="settings-code-wrap">
      <code className={`settings-code${multiline ? ' settings-code-block' : ''}`}>{text}</code>
      <button className="settings-copy" onClick={copy} title="Copy to clipboard">
        <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`} /> {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}

function Card({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <div className="settings-card">
      <h3 className="settings-card-title">{title}</h3>
      <RowList rows={rows} />
    </div>
  )
}

const topTabs: { id: TopTab; label: string; icon: string }[] = [
  { id: 'cs', label: 'CS', icon: 'fa-solid fa-crosshairs' },
  { id: 'gear', label: 'Gear', icon: 'fa-solid fa-headset' },
  { id: 'pc', label: 'PC', icon: 'fa-solid fa-desktop' },
]
const csTabs: { id: CsTab; label: string }[] = [
  { id: 'mouse', label: 'Mouse' },
  { id: 'video', label: 'Video' },
  { id: 'viewmodel', label: 'Viewmodel' },
  { id: 'hud', label: 'HUD' },
  { id: 'radar', label: 'Radar' },
  { id: 'audio', label: 'Audio' },
  { id: 'binds', label: 'Binds' },
  { id: 'launch', label: 'Launch Options' },
]

export default function Settings() {
  const [top, setTop] = useState<TopTab>('cs')
  const [cs, setCs] = useState<CsTab>('mouse')

  return (
    <div className="page settings-page">
      <RotateScreen />
      <BackToTop />
      <Navbar />

      <div className="settings-section">
        <div className="settings-header">
          <span className="section-label">Setup</span>
          <h1>My <span className="gradient-text">Settings</span></h1>
          <p>My exact CS config, gear and PC specs.</p>
        </div>

        <div className="settings-tabs">
          {topTabs.map(t => (
            <button
              key={t.id}
              className={`settings-tab${top === t.id ? ' active' : ''}`}
              onClick={() => setTop(t.id)}>
              <i className={t.icon} /> {t.label}
            </button>
          ))}
          <a className="settings-download" href="/downloads/valek-config.cfg" download>
            <i className="fa-solid fa-download" /> Download config
          </a>
        </div>

        {top === 'cs' && (
          <>
            <div className="settings-subtabs">
              {csTabs.map(t => (
                <button
                  key={t.id}
                  className={`settings-subtab${cs === t.id ? ' active' : ''}`}
                  onClick={() => setCs(t.id)}>
                  {t.label}
                </button>
              ))}
            </div>

            <div className="settings-content">
              {cs === 'mouse' && <Card title="Mouse & Sensitivity" rows={mouseSens} />}
              {cs === 'video' && (
                <>
                  <Card title="Definições de vídeo" rows={videoBasic} />
                  <Card title="Vídeo (Avançado)" rows={videoAdvanced} />
                </>
              )}
              {cs === 'viewmodel' && <Card title="Viewmodel Settings" rows={viewmodel} />}
              {cs === 'hud' && <Card title="HUD Settings" rows={hud} />}
              {cs === 'radar' && <Card title="Radar Settings" rows={radar} />}
              {cs === 'audio' && (
                audio.length > 0
                  ? <Card title="Audio Settings" rows={audio} />
                  : (
                    <div className="settings-card settings-coming-soon">
                      <i className="fa-solid fa-headphones" />
                      <h3>Coming soon</h3>
                      <p>Audio settings will be added here soon.</p>
                    </div>
                  )
              )}
              {cs === 'binds' && (
                <div className="settings-card">
                  <h3 className="settings-card-title">Binds</h3>
                  <CodeBlock text={binds.join('\n')} multiline />
                </div>
              )}
              {cs === 'launch' && (
                <div className="settings-card">
                  <h3 className="settings-card-title">Launch Options</h3>
                  <CodeBlock text={launchOptions} />
                </div>
              )}
            </div>
          </>
        )}

        {top === 'gear' && (
          <div className="settings-content">
            <Card title="Equipment" rows={equip} />
            <Card title="Monitor" rows={monitor} />
            <Card title="Monitor Settings" rows={monitorSettings} />
          </div>
        )}

        {top === 'pc' && (
          <div className="settings-content">
            <Card title="PC Specs" rows={pc} />
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
