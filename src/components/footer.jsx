import * as React from 'react'

const Footer = (props) => {

    // Includes copyright & callout for gatsby's help in building the site
    return (
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    )
}

export default Footer