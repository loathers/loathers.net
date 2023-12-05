import * as React from 'react'
import * as layoutStyles from './layout.module.css'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'

const NavBar = () => {
    return (
      <nav>
      <ul className={layoutStyles.navLinks}>
        <li><Link to="/" className={layoutStyles.navLinkText}>home</Link></li>
        <li><Link to="/analysis" className={layoutStyles.navLinkText}>📒 analysis</Link></li>
        <li><Link to="/tools" className={layoutStyles.navLinkText}>🔨 tools</Link></li>
        <li><Link to="/scripting" className={layoutStyles.navLinkText}>💾 scripting</Link></li>
        <li><Link to="/community" className={layoutStyles.navLinkText}>🤸 community</Link></li>
        <li className={layoutStyles.navSpacer}> </li>
        <li><a href="https://github.com/loathers">
          <StaticImage 
              src="../images/github-logo-small.png" 
              alt="github" /></a></li>
        <li><a href="https://opencollective.com/loathers">
          <StaticImage 
              src="../images/opencollective-logo.png" 
              alt="opencollective" /></a></li>
      </ul>
    </nav>
    )
}

export default NavBar