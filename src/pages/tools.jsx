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
            <h2><a href="https://samsara.loathers.net">Saṃsāra</a></h2>
            <p>Saṃsāra is our new ascension history database. It includes a historical record of all player ascensions that have been played in the Kingdom of Loathing. This includes measurements for Gold Star runs and Pyrites (i.e., the current best mark in each unrestricted path).</p></li>
          <li>
            <h2><a href="https://onlyfax.loathers.net">OnlyFax</a></h2>
            <p>OnlyFax is our new beta-version faxbot. We've got an online resource with all active faxes, a leaderboard of the most faxed monsters in the Kingdom, and support for clan fortune telling (with a few other bells and whistles). Check it out!</p></li>
          <li>
            <h2><a href="https://bofa.loathers.net">BOFA</a></h2>
            <p>This is a web tool for figuring out which monsters are associated with which postcombat effect from the Book of Facts across the many class/path combinations in the Kingdom. Currently in beta, it may be enhanced soon!</p></li>
          <li>
            <h2><a href="https://museum.loathers.net">Museum</a></h2>
            <p>Museum is the successor to the old display case database. It contains a full account of every display case among KOL players, updated shortly after rollover each day. Track your cool collections!</p></li>
          <li>
            <h2><a href="https://greenbox.loathers.net">Greenbox</a></h2>
            <p>Script for generating a shareable list of all the permanent skills, bound IOTMs, familiars owned, and path progress attained on a specific account. A spiritual successor to CheeseCookie's snapshot tool!</p></li>
          <li>
            <h2><a href="https://treat.loathers.net">Treat</a></h2>
            <p>Quick reference for the various trick-or-treat outfits in the Kingdom of Loathing and what you get for wearing them, including up-to-date mall price!</p></li>
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