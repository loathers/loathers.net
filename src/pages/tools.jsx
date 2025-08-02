// Step 1: Import React
import * as React from 'react'
import * as layoutStyles from '../components/layout.module.css'
import Layout from '../components/layout'
import Seo from '../components/seo'

// Step 2: Define your component
const ToolsPage = () => {
  return (
    <Layout pageTitle="Tools">
      <ul className={layoutStyles.toolsGrid}>
          <li>
            <h2><a href="https://beret.loathers.net">Beret</a></h2>
            <p>Beret is a web tool for determining what effects you'll get from busking with the <a href="https://loathers.net/analysis/2025-06-beret">Prismatic Beret</a>. Use it to find busks for specific effects & what you'll get at specific power levels!</p></li>
          <li>
            <h2><a href="https://samsara.loathers.net">Saṃsāra</a></h2>
            <p>Saṃsāra is our ascension history database. It includes a historical record of all player ascensions that have been played in the Kingdom of Loathing. This includes measurements for Gold Star runs and Pyrites (i.e., the current best mark in each unrestricted path).</p></li>
          <li>
            <h2><a href="https://greenbox.loathers.net">Greenbox</a></h2>
            <p>Greenbox is a script used to generate a shareable list of all the permanent skills, bound IOTMs, familiars owned, and path progress attained on a specific account. A spiritual successor to CheeseCookie's snapshot tool!</p></li>
          <li>
            <h2><a href="https://museum.loathers.net">Museum</a></h2>
            <p>Museum is the successor to the old display case database. It contains a full account of every display case among KOL players, updated shortly after rollover each day. Track your cool collections!</p></li>
          <li>
            <h2><a href="https://onlyfax.loathers.net">OnlyFax</a></h2>
            <p>OnlyFax is our new public faxbot. We've got an online resource with all active faxes, a leaderboard of the most faxed monsters in the Kingdom, and support for clan fortune telling (with a few other bells and whistles).</p></li>
          <li>
            <h2><a href="https://zooto.loathers.net">Zooto</a></h2>
            <p>Zooto is a tool for analyzing different familiar configurations in the Z for Zootomist challenge path; the tool will show the different grafting effects for all familiars, in a sortable and filter-ready form. Find some dope grafts, dude!</p></li>
          <li>
            <h2><a href="https://bofa.loathers.net">BOFA</a></h2>
            <p>This is a web tool for figuring out which monsters are associated with which postcombat effect from the Book of Facts across the many class/path combinations in the Kingdom.</p></li>
          <li>
            <h2><a href="https://treat.loathers.net">Treat</a></h2>
            <p>Quick reference for the various trick-or-treat outfits in the Kingdom of Loathing and what you get for wearing them, including up-to-date mall price!</p></li>
          <li>
            <h2><a href="https://data.loathers.net/graphiql">Data of Loathing</a></h2>
            <p>This is a GraphQL interface for accessing Mafia data. It's not particularly well documented yet, but it's a nice way to run quick SQL commands to dig into mafia data for those who are SQL wizards. Currently pre-beta, but flows into many of our tools, and will someday feature more documentation and guides for scripters and toolmakers.</p></li>
      </ul>
    </Layout>
  )
}

// Set the page title via the Seo component, adding sitename afterwards
export const Head = () => (
  <Seo 
    pageTitle="Tools" 
    pathName = ""
  />
)

// Step 3: Export your component
export default ToolsPage