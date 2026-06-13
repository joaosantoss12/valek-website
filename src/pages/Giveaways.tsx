import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RotateScreen from '../components/RotateScreen'
import BackToTop from '../components/BackToTop'
import { giveawayItemsLeft, giveawayItemsRight, type GiveawayItem } from '../data/giveawayItems'
import '../styles/global.css'

function GiveawayCard({ item }: { item: GiveawayItem }) {
  return (
    <div className="giveaway-card">
      <img
        className="giveaway-card-img"
        src={item.img}
        alt={item.item}
        onClick={() => window.open(item.link, '_blank')}
      />
      <div className="giveaway-card-name">{item.item}</div>
      <div className="giveaway-card-stats">
        <div className="giveaway-card-stat">
          <div className="giveaway-card-stat-label">Value</div>
          <div className="giveaway-card-stat-value">{item.value}</div>
        </div>
        <div className="giveaway-card-stat">
          <div className="giveaway-card-stat-label">Min. Deposit</div>
          <div className="giveaway-card-stat-value">{item.minDeposit}</div>
        </div>
      </div>
      <button className="giveaway-btn" onClick={() => window.open(item.link, '_blank')}>
        PARTICIPAR
      </button>
    </div>
  )
}

export default function Giveaways() {
  const allItems = giveawayItemsLeft.map((item, i) => ({ item, right: giveawayItemsRight[i] }))

  return (
    <div className="page">
      <RotateScreen />
      <BackToTop />
      <Navbar />

      <div className="giveaways-hero">
        <h1>10 000€ GIVEAWAY</h1>
        <p>Join using the sponsor links below. Each item has its own minimum deposit requirement. Good luck!</p>
      </div>

      <div className="giveaways-grid">
        {allItems.map(({ item, right }, i) => (
          <>
            <GiveawayCard key={`l-${i}`} item={item} />
            {right && <GiveawayCard key={`r-${i}`} item={right} />}
          </>
        ))}
      </div>

      <Footer />
    </div>
  )
}
