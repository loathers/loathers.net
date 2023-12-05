import * as React from 'react'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import * as layoutStyles from './layout.module.css'
import NavBar from "./navigation"

// Our header; this is where the logo lives
const Header = (props) => {

    // Includes logo + our navbar, styled appropriately
    return (
    <header>   
        <Link to="/"><div className = {layoutStyles.loathersHead}>
        <StaticImage 
          alt="A martini glass in black and white"
          src="../images/loathersLogo75px.png"
        />
        Loathers<span class={layoutStyles.dotNet}>.net</span>
      </div></Link>
      <NavBar />
    </header>
    )

}

export default Header