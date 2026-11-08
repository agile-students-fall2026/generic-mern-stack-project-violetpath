import {Link} from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="site-header">
      <div className="site-brand">
        <svg
          className="site-logo"
          width="29"
          height="29"
          viewBox="0 0 29 29"
          aria-hidden="true"
        >
          <rect width="29" height="29" rx="8" fill="#57068C" />
          <path
            d="M8 21 L21 8 M10 8 H21 V19"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>

        <Link to="/" className="logo-info">Violet Path</Link>
      </div>
    </header>
  )
}

export default Header