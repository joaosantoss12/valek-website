import { supabase } from '../lib/supabase'

/* ================================================================
   Types
   ================================================================ */
export interface ScheduleRow {
  day: string
  date: string
  time: string
  icon: string
}

export interface SponsorStat {
  label: string
  value: string
}

export interface Sponsor {
  id: string
  side: 'left' | 'right'
  img: string
  /** Logo display size as a percentage of the card's logo box (default 100). */
  imgScale?: number
  name: string
  link: string
  color: string
  stats: SponsorStat[]
  info: string
}

/* ================================================================
   Defaults — used as the seed and as a fallback when Supabase is
   unconfigured or empty, so the site always renders.
   ================================================================ */
export const defaultSchedule: ScheduleRow[] = [
  { day: 'Segunda-feira', date: 'Dia 15', time: '10H - 14H', icon: 'fa-solid fa-calendar-days' },
  { day: 'Terça-feira', date: 'Dia 16', time: '14H - 18H', icon: 'fa-solid fa-fire' },
  { day: 'Quarta-feira', date: 'Dia 17', time: '14H - 18H', icon: 'fa-solid fa-gamepad' },
  { day: 'Quinta-feira', date: 'Dia 18', time: '11H - 15H', icon: 'fa-solid fa-khanda' },
  { day: 'Sexta-feira', date: 'Dia 19', time: '11H - 15H', icon: 'fa-solid fa-crosshairs' },
  { day: 'Sábado', date: 'Dia 20', time: '11H - 15H', icon: 'fa-solid fa-crown' },
  { day: 'Domingo', date: 'Dia 21', time: '11H - 15H', icon: 'fa-solid fa-star' },
]

export const defaultSponsors: Sponsor[] = [
  {
    id: 'btn3', side: 'left', img: '/img/keydrop.png', name: 'KeyDrop',
    link: 'https://key-drop.com/pt/?code=VALEK', color: '#D3A35C',
    stats: [
      { label: 'Code', value: 'VALEK' },
      { label: 'Bonus', value: '20% on deposit' },
      { label: 'Extra', value: 'Free $0.50' },
    ],
    info: '🔥 Open Cases & Win Big on KeyDrop! 🔥 Get the best CS:GO skins with insane case openings, giveaways, and daily rewards! Use my code [VALEK] for 10% extra balance on deposit!<br><br>🎁 Free Daily Bonuses & Promotions<br>💰 Huge Case Openings & Jackpots<br>🔒 Fair & Secure System<br>🎮 Instant Skin Withdrawals<br><br>Don\'t miss out—join KeyDrop now and claim your rewards! 🚀🔑',
  },
  {
    id: 'btng4skins', side: 'left', img: '/img/g4skins.png', name: 'G4Skins',
    link: 'https://g4skins.com/ref/VALEK', color: '#B055FF',
    stats: [
      { label: 'Code', value: 'VALEK' },
      { label: 'Bonus', value: '10% on deposit' },
      { label: 'Extra', value: 'Free case' },
    ],
    info: '🎰 G4Skins Casino — Your Ultimate CS:GO Skin Gaming Destination! 🌟💰<br><br>Join <b>G4Skins</b> — the premier CS:GO skin gaming site where every spin and bet brings you closer to epic wins! Open cases, play exciting games, and enjoy exclusive bonuses tailored for CS:GO enthusiasts.<br><br>💥 <b>Massive Selection of CS:GO Cases & Games</b><br>⚔️ <b>Upgrade Skins, Battle Other Players & More</b><br>💸 <b>Instant Withdrawals & Secure Payments</b><br>🎁 <b>Exclusive Bonuses & Daily Promotions</b><br>⚡ <b>Fast, Fair, and Exciting Gameplay</b><br><br>Don\'t wait — <b>join G4Skins now and elevate your CS:GO gaming experience!</b> 🔥🎖️',
  },
  {
    id: 'btn4', side: 'left', img: '/img/pirateswap.png', name: 'PirateSwap',
    link: 'https://pirateswap.com/?ref=VALEK', color: '#F48E3D',
    stats: [
      { label: 'Code', value: 'VALEK' },
      { label: 'Bonus', value: '35% BONUS' },
      { label: 'Extra', value: 'FREE $10' },
    ],
    info: '🏴‍☠️ Set Sail with PirateSwap! 🚀 Swap, stake, and earn crypto treasures on the high seas! Use my code [VALEK] for 35% extra balance on deposit!<br><br>⚡ Fast & Low-Cost Swaps<br>🔐 Secure & Decentralized Platform<br><br>Join the PirateSwap crew now and start earning like a true pirate! ☠️💎',
  },
  {
    id: 'btnupgrader', side: 'left', img: '/img/upgrader.png', name: 'Upgrader',
    link: 'https://upg.gg/valek', color: '#7C5CFC',
    stats: [
      { label: 'Code', value: 'VALEK' },
      { label: 'Bonus', value: 'FREE $0.50' },
      { label: 'Extra', value: '10% on deposit' },
    ],
    info: '⚡ Level Up Your CS2 Skins with Upgrader! 🔫💎<br><br>Join <b>Upgrader</b> — the ultimate CS2 skin upgrading platform where you turn your skins into better ones instantly! Use my code <b>[VALEK]</b> for a <b>FREE $0.50 + 10% bonus on deposit</b>!<br><br>🔥 <b>Upgrade Any Skin in Seconds</b><br>💥 <b>Huge Multipliers & Jackpot Upgrades</b><br>💸 <b>Instant Withdrawals & Secure Transactions</b><br>🎁 <b>Exclusive Bonuses & Daily Promotions</b><br>⚡ <b>Fast, Fair & Provably Transparent</b><br><br>Don\'t wait — <b>join Upgrader now and turn your skins into pure gold!</b> 🚀🏆',
  },
  {
    id: 'btn22bit', side: 'right', img: '/img/22bit.png', name: '22bit',
    link: 'https://moy.auraodin.com/redirect.aspx?pid=179585&lpid=1741&bid=1717', color: '#0A8F9B',
    stats: [
      { label: 'Code', value: 'NO CODE' },
      { label: 'Bonus', value: 'Sports Up to 3500 USDT' },
      { label: 'Extra', value: 'Casino up to 17000 USDT' },
    ],
    info: '🎰 Discover Fair Wins at 22Bet Casino! 🌟💰<br><br>Join 22Bet and experience a world of top-tier slots, live casino action, and sports betting excitement! New players get a <b>100% Welcome Bonus or 150 Free Spins</b> on their first deposit!<br><br>🔥 <b>Thousands of Casino Games & Sports Events</b><br>💸 <b>Fast Withdrawals & Crypto-Friendly</b><br>🎁 <b>Daily Promotions & VIP Rewards</b><br>⚡ <b>24/7 Support & Secure Transactions</b><br><br>Don\'t miss out—<b>sign up at 22Bet now and start winning big!</b> 🎲🏆',
  },
  {
    id: 'btnwatchmewin', side: 'right', img: '/img/watchmewin.png', name: 'WatchMeWin',
    link: 'https://m.affs.com/redirect.aspx?mid=1266&sid=12899&cid=&pid=&affid=9347', color: '#D0FB0A',
    stats: [
      { label: 'Code', value: 'NO CODE' },
      { label: 'Bonus', value: '100% deposit till 777€' },
      { label: 'Extra', value: '200 Free Spins 1st deposit' },
    ],
    info: '🎰 WatchMeWin Casino — Where Every Spin is a Show! 🌟💰<br><br>Join <b>WatchMeWin</b> — your ultimate destination for online casino excitement! Spin the reels, try your luck at live tables, and enjoy endless entertainment with thousands of top-tier games and sports betting options.<br><br>💥 <b>Massive Selection of Slots & Live Casino Games</b><br>🎲 <b>Sportsbook, Poker, and Virtual Games</b><br>💸 <b>Fast Payouts & Secure Transactions</b><br>🎁 <b>Welcome Bonuses & Ongoing Promotions</b><br>⚡ <b>Top Providers & Fair Gameplay</b><br><br>Don\'t wait — <b>join WatchMeWin today and feel the rush of real wins!</b> 🏆🎉',
  },
]

/* ================================================================
   Load / save — one jsonb row per key in the `site_content` table.
   Reads fall back to defaults so the site never breaks.
   ================================================================ */
async function loadContent<T>(key: string, fallback: T): Promise<T> {
  if (!supabase) return fallback
  const { data, error } = await supabase
    .from('site_content')
    .select('value')
    .eq('key', key)
    .maybeSingle()
  if (error || !data) return fallback
  return (data.value as T) ?? fallback
}

async function saveContent<T>(key: string, value: T): Promise<{ error: string | null }> {
  if (!supabase) return { error: 'Supabase is not configured (.env missing).' }
  const { error } = await supabase
    .from('site_content')
    .upsert({ key, value }, { onConflict: 'key' })
  return { error: error ? error.message : null }
}

/* ================================================================
   Image upload — stores the file in the public "sponsor-logos"
   Storage bucket and returns its public URL. Falls back to an inline
   base64 data URL when Supabase isn't configured (local dev).
   ================================================================ */
const SPONSOR_BUCKET = 'sponsor-logos'

export async function uploadSponsorImage(file: File): Promise<{ url: string; error: string | null }> {
  if (!supabase) {
    // No backend: embed the image directly so it still previews locally.
    const url = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = () => reject(reader.error)
      reader.readAsDataURL(file)
    }).catch(() => '')
    return { url, error: url ? null : 'Could not read file.' }
  }

  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, '-')
  const path = `${Date.now()}-${safeName}`
  const { error } = await supabase.storage
    .from(SPONSOR_BUCKET)
    .upload(path, file, { cacheControl: '3600', upsert: true })
  if (error) return { url: '', error: error.message }

  const { data } = supabase.storage.from(SPONSOR_BUCKET).getPublicUrl(path)
  return { url: data.publicUrl, error: null }
}

export const loadSchedule = () => loadContent<ScheduleRow[]>('schedule', defaultSchedule)
export const saveSchedule = (rows: ScheduleRow[]) => saveContent('schedule', rows)
export const loadSponsors = () => loadContent<Sponsor[]>('sponsors', defaultSponsors)
export const saveSponsors = (sponsors: Sponsor[]) => saveContent('sponsors', sponsors)

/* ================================================================
   Contact messages — submitted from the Contacts page, read in /admin.
   ================================================================ */
export interface ContactMessage {
  id?: string
  name: string
  email: string
  subject: string
  message: string
  created_at?: string
}

export async function sendContactMessage(
  msg: Omit<ContactMessage, 'id' | 'created_at'>,
): Promise<{ error: string | null }> {
  if (!supabase) return { error: 'Supabase is not configured (.env missing).' }
  const { error } = await supabase.from('contact_messages').insert(msg)
  return { error: error ? error.message : null }
}

export async function loadContactMessages(): Promise<ContactMessage[]> {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })
  if (error || !data) return []
  return data as ContactMessage[]
}

export async function deleteContactMessage(id: string): Promise<{ error: string | null }> {
  if (!supabase) return { error: 'Supabase is not configured.' }
  const { error } = await supabase.from('contact_messages').delete().eq('id', id)
  return { error: error ? error.message : null }
}
