// Step 1: Import React
import * as React from 'react'
import Layout from '../components/layout'
import { Link } from 'gatsby'

// Step 2: Define your component
const CommunityPage = () => {
  return (
    <Layout pageTitle="Community">
      <p>There are a ton of places to engage with the KOL community. Here are a few!</p>
      <ul>
          <li>Join us on the Ascension Speed Society Discord!</li>
          <li>Join us on our GitHub, where you can help us build cool code!</li>
          <li>Join us on the KOL Reddit, where you can endlessly argue about things!</li>
          <li>Join us on the official KOL forums, where you can get banned by our good pal Kenny!</li>
          <li>Join us on the official KOLMafia forums, where you can interact with our beloved mafia devs!</li>
      </ul>
      <p>In addition to these myriad ways to get in touch with us and interact with the broader community, we wanted to use this page to highlight a few other KOL resources outside of the loathers.net umbrella that you may find useful.</p>
      <ul>
        <li>ASS maintains a KOL Reference Repository, with a lot of great content across paths</li>
        <li>Captain Scotch maintains <a href="https://docs.google.com/spreadsheets/d/1WbCGS8bffDHKzutdqk8Zt4VwrtglZ_POeBEftOvKFsA/edit#gid=0">a yearly Standard Helper Sheet</a>; use this to help plan out 2023 standard runs!</li>
        <li>If you haven't visited the KOL Wiki, installed KOLMafia, or actually played the Kingdom of Loathing... I mean, well, it's pretty impressive you got this far, frankly. But you should probably check out those things, absolutely nothing contained in this website makes a lick of sense without that!</li>
      </ul>
      <p>Looking for bios of our core contributors? <Link to="/bios">Check out our bios page!</Link></p>
    </Layout>
  )
}

// Step 3: Export your component
export default CommunityPage