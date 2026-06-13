import '../styles/global.css'

export default function Footer() {
  return (
    <footer className="footer">
      <span className="footer-copy">Copyright &copy; 2025 ValeK &mdash; All rights reserved</span>
      <span className="footer-dev">
        Designed &amp; Developed by{' '}
        <span onClick={() => window.open('https://github.com/joaosantoss12', '_blank')}>
          João Santos
        </span>
      </span>
    </footer>
  )
}
