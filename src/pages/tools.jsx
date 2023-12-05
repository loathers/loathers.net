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