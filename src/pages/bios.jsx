// Step 1: Import React
import * as React from 'react'
import Layout from '../components/layout'
import BioBox from '../components/biobox'

// Step 2: Define your component
const BiosPage = () => {
  return (
    <Layout pageTitle="Bios">
      <p>While there are too many folks in our broader collective to discuss all of them, we have a number of core contributors who submitted bios for this page, generally written by random other people. Here they are!</p>
      <BioBox name="Captain Scotch (#437479)" link="https://github.com/docrostov">
        <p>Captain Scotch is a man of many names: Captain Scotch, Doc Rostov, Jalen, the Corncob Heartthrob, the Goth Ginobili, Air Prepare, [insert legal name here], and "the guy whose profile pic is a bird but kind of looks like a monkey." He is a diminutive data scientist who resides in Richmond, Virginia. Scotch is a loathers administrator, a maintainer of TourGuide, a happily married vegetarian, a speed ascender with a handful of golds, a former NBA blogger for ESPN, a lover of corncobs, and a maker of many lists.</p>
      </BioBox>
      <BioBox name="Gausie (#1197090)" link="https://github.com/gausie">
        <p>Unlike Scotch, Gausie just has one name: Percy Gausie, the nemesis of Icebox Slim and Pinwheel Slick. Wait, no, that's just in Scotch's head. Gausie is a highly adept coder, longtime KoLMafia dev, and similarly longtime member of the KOL /dev team. Gausie is known for remarkable productivity and pushing out unfathomably quick solutions to complex problems, his beautiful daughter, his hatred for the British monarchy, his radical leftist insights, and for being the primary point of contact for virtually every public-facing tool the Loathers collective has made. What a ridiculous dude. Couldn't be me. (Could be Gausie, tho.)</p>
      </BioBox>

      <p>To see more members of our collective, <a href="https://github.com/orgs/loathers/people">check out our contributors list on GitHub!</a></p>
    </Layout>
  )
}

// Step 3: Export your component
export default BiosPage