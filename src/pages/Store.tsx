import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RotateScreen from '../components/RotateScreen'
import BackToTop from '../components/BackToTop'
import { storeItems } from '../data/storeItems'
import '../styles/global.css'

const coinRules = [
  { cls: 'v', icon: 'fa-user',        title: 'Viewers',     text: <>Receive <b>2 ValeK Coins</b> every <b>10 minutes</b>.</> },
  { cls: 's', icon: 'fa-user-plus',   title: 'Subscribers', text: <>Receive <b>10 ValeK Coins</b> every <b>10 minutes</b>.</> },
  { cls: 'c', icon: 'fa-gem',         title: 'Cheering',    text: <><b>50 ValeK Coins</b> for every <b>100 bits</b>.</> },
  { cls: 'b', icon: 'fa-star',        title: 'Subscribe',   text: <>Receive <b>250 ValeK Coins</b> upon <b>subscribing</b>.</> },
  { cls: 'f', icon: 'fa-heart',       title: 'Followers',   text: <>Receive <b>5 ValeK Coins</b> upon <b>following</b>.</> },
  { cls: 'd', icon: 'fa-dollar-sign', title: 'Donate',      text: <><b>50 ValeK Coins</b> for every <b>$1</b> donated.</> },
]

export default function Store() {
  return (
    <div className="page store-page">
      <RotateScreen />
      <BackToTop />
      <Navbar />

      {/* Coins Info Bar */}
      <div className="store-coins-bar">
        <div className="store-coins-inner">
          <div className="store-coins-player">
            <img src="/img/loja.jpeg" alt="ValeK Store" />
          </div>
          <div className="store-coins-list">
            {coinRules.map(r => (
              <div key={r.title} className="coin-rule">
                <div className={`coin-rule-icon ${r.cls}`}>
                  <i className={`fa-solid ${r.icon}`} />
                </div>
                <div className="coin-rule-text">
                  <h4>{r.title}</h4>
                  <p>{r.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Store Grid */}
      <div className="store-grid-section">
        <span className="section-label">ValeK Store</span>
        <h2>Redeem your <span className="gradient-text">ValeK Coins</span></h2>
        <div className="store-grid">
          {storeItems.map((item, i) => (
            <div key={i} className="store-card">
              <div className="store-card-img">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="store-card-body">
                <div className="store-card-name">{item.name}</div>
                <div className="store-card-price">{item.price}</div>
                <button className="store-card-btn"
                  onClick={() => window.open('https://streamelements.com/valek/store', '_blank')}>
                  Check it out!
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
