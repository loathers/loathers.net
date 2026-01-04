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

        <p>Welcome to <b>Loathers.net</b>, a webpage managed by the <a href="https://github.com/loathers/">Loathers Scripting Collective</a>! We are a group of coders who play and contribute to a long-running browser game, <a href="https://www.kingdomofloathing.com/">the Kingdom of Loathing.</a> We're going to be using this site over the coming years to store analysis of the modern speed game, how our collective scripts tools for the game, and host semi-annual contests. We hope you enjoy our dulcet tones and sick beats.</p>

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
            link={"/shenanigans/winter-2026-contest/"}
            title="PASSING TIME IV: PAST TO THE FUTURE"
            date="January 5, 2025"
            excerpt="To pass the time between the new year and the Spring Challenge Path, we are hosting a speed ascension contest! The top 30 runners will all get one standard IOTM of their choice. That's dope! Check it out and enter now!"
            type="Most Recent Contest"
          />

        <p></p>

        <HotDogLink 
              link={"/tools/"}
              title="Pricegun"
              date="November 20, 2025"
              excerpt="Pricegun is a web tool for finding data on item prices in the Mall of Loathing. It uses a time-weighted average accumulator to summarize recent marketplace data. Check it out!"
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
