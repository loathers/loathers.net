import * as React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { graphql } from 'gatsby'
import HotDogLink from '../components/hotdoglink'
import Warning from '../components/warning'

// Define the core component
const IndexPage = ({data}) => {
  return (
    <Layout pageTitle = "Home">
      <>
        <Warning emoji="">Everything on this site is a potential KOL spoiler. Proceed at your own risk!</Warning>

        <p>Welcome to <b>Loathers.net</b>, a new site managed by the <a href="https://github.com/loathers/">Loathers Scripting Collective</a>! We are a group of coders who play and contribute to a long-running browser game, <a href="https://www.kingdomofloathing.com/">the Kingdom of Loathing.</a> We're going to be using this site over the coming years to store analysis of the modern speed game, how our collective scripts tools for the game, and host semi-annual contests. We hope you enjoy our dulcet tones and sick beats.</p>

        {data.allMdx.nodes.map(
          ( {excerpt, frontmatter }) => (
            <>
            <HotDogLink 
              link={frontmatter.section+"/"+frontmatter.slug}
              title={frontmatter.title}
              date={frontmatter.date}
              excerpt={excerpt}
              type="Newest Analysis"
              />
            </>
          )
        )}
        
        <p></p>

        <HotDogLink
            link={"/shenanigans/winter-2025-contest/"}
            title="PASSING TIME III: Time After Time"
            date="January 20, 2025"
            excerpt="To pass the time between the new year and the Spring Challenge Path, we are hosting a speed ascension contest! Every entrant gets 3 million, and the top 12 runs get a piece of a roughly 3 billion meat prize pool. Check it out and enter now!"
            type="Most Recent Contest"
          />

        <p></p>

        <HotDogLink 
              link={"/tools/"}
              title="Saṃsāra"
              date="July 3, 2024"
              excerpt="Saṃsāra is a new ascension database, a spiritual successor to KOLDB. It includes pretty graphs and user charts. It is under active development; please let the team know if you have requests!"
              type="Newest Tool"
              />
      </>
    </Layout>
  )
}

export const query = graphql`
  query getNewestAnalysis {
    allMdx(
      limit:1
      sort:{frontmatter:{date: DESC}}
      filter: { frontmatter: {section: {eq: "analysis"}}}
    ) {
                nodes {
                    frontmatter {
                        date(formatString: "MMMM D, YYYY")
                        title
                        slug
                        section
                    }
                    id
                    excerpt
                }
            }
  }`

// Set the page title via the Seo component, adding sitename afterwards
export const Head = () => (
  <Seo 
    pageTitle="Home" 
    pathName = ""
  />
)

// Export your component to be built
export default IndexPage
