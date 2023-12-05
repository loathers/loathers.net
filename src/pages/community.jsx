// Step 1: Import React
import * as React from 'react'
import Layout from '../components/layout'
import { Link } from 'gatsby'
import Seo from '../components/seo'

// Step 2: Define your component
const CommunityPage = () => {
  return (
    <Layout pageTitle="Community">
      <p>There are a ton of places to engage with the KOL community. Here are a few!</p>
      <ul>
          <li>Join us on the <a href="https://discord.gg/kol">Ascension Speed Society Discord!</a></li>
          <li>Join us on our <a href="https://github.com/loathers">GitHub</a>, where you can help us build cool scripts!</li>
          <li>Join us on the <a href="https://www.reddit.com/r/kol/">KOL Reddit</a>, where you can endlessly argue about things!</li>
          <li>Join us on the <a href="https://forums.kingdomofloathing.com/vb/">official KOL forums</a>, where you can get banned by our good pal Kenny!</li>
          <li>Join us on the <a href="https://kolmafia.us">official KOLMafia forums</a>, where you can interact with our beloved mafia devs!</li>
      </ul>
      <p>In addition to these myriad ways to get in touch with us and interact with the broader community, we wanted to use this page to highlight a few other KOL resources outside of the loathers.net umbrella that you may find useful.</p>
      <ul>
        <li>ASS maintains a <a href="https://docs.google.com/spreadsheets/d/1VOqnh4hWEad_KUPWY4iz6TdpQZfzB_nvJqf-WWvRhEc/edit#gid=0">KOL Reference Repository</a>, with a lot of great content across paths</li>
        <li>Famed beany lad worthawholebean maintains a <a href="https://docs.google.com/spreadsheets/d/10j0B1DTw64a-CaaBwMjiCJTTsGWOx0h4_KWpiAItB8s/edit#gid=166598547">KOL Class Picker</a> that can be used to examine seeded goodies throughout the myriad path/class combinations in the game</li>
        <li>Captain Scotch maintains <a href="https://docs.google.com/spreadsheets/d/1WbCGS8bffDHKzutdqk8Zt4VwrtglZ_POeBEftOvKFsA/edit#gid=0">a yearly Standard Helper Sheet</a>; use this to help plan out 2023 standard runs!</li>
        <li>If you haven't visited the <a href="https://kol.coldfront.net/thekolwiki/index.php/Main_Page">KOL Wiki</a>, <a href="https://github.com/kolmafia/kolmafia">installed KOLMafia</a>, or actually played the <a href="https://www.kingdomofloathing.com/">Kingdom of Loathing</a>... I mean, well, it's pretty impressive you got this far in our website, frankly. But you should probably check out those things, absolutely nothing contained in this website makes a lick of sense without them!</li>
      </ul>
      <hr />
      <h1>Shenanigans & Other Pages</h1>
      <ul>
        <li>Looking for bios of our core contributors? <Link to="/bios">Check out our bios page!</Link></li>
        <li>Looking for the tale the Jedi never dared to tell you, about how Scotch and Bean nerfed the orb? <Link to="/shenanigans/how-we-nerfed-orb/">Check out the Extrorbermectin Stunt!</Link></li>
        <li>Looking for the autumn 2023 ascension contest, where we gave out 7.3 billion meat in prizes and made Captain Scotch completely bankrupt? <Link to="/shenanigans/autumn-2023-contest/">Check out our page for No Small Feat: Whuppin' AI!</Link></li>
      </ul>
    </Layout>
  )
}

// Set the page title via the Seo component, adding sitename afterwards
export const Head = () => (
  <Seo 
    pageTitle="Community" 
    pathName = ""
  />
)

// Step 3: Export your component
export default CommunityPage