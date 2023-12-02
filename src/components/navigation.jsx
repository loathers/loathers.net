import * as React from 'react'
import * as layoutStyles from './layout.module.css'
import { Link } from 'gatsby'

const NavBar = () => {
    return (
      <nav>
      <ul className={layoutStyles.navLinks}>
        <li><Link to="/" className={layoutStyles.navLinkText}>home</Link></li>
        <li><Link to="/analysis" className={layoutStyles.navLinkText}>📒 analysis</Link></li>
        <li><Link to="/tools" className={layoutStyles.navLinkText}>🔨 tools</Link></li>
        <li><Link to="/scripting" className={layoutStyles.navLinkText}>💾 scripting</Link></li>
        <li><Link to="/community" className={layoutStyles.navLinkText}>🗣️ community</Link></li>
        <li><Link to="/about" className={layoutStyles.navLinkText}>🤸about</Link></li>
      </ul>
    </nav>
    )
}

export default NavBar