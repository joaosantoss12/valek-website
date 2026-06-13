import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AboutMe from './pages/AboutMe'
import Store from './pages/Store'
import Sponsors from './pages/Sponsors'
import Giveaways from './pages/Giveaways'
import Admin from './pages/Admin'
import Contacts from './pages/Contacts'
import Settings from './pages/Settings'

function SecurityGuard() {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault()
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.keyCode === 123) return false
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) return false
      if (e.ctrlKey && e.shiftKey && e.keyCode === 74) return false
      if (e.ctrlKey && e.keyCode === 85) return false
    }
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <SecurityGuard />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/store" element={<Store />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/giveaways" element={<Giveaways />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
