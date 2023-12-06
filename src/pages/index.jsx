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

        <p>Welcome to <b>Loathers.net</b>, a new site managed by the <a href="https://github.com/loathers/">Loathers Scripting Collective</a>! We are a group of coders who play and build tools for the now-20-year-old browser game <a href="https://www.kingdomofloathing.com/">the Kingdom of Loathing.</a> We're going to be using this site over the coming years to store analysis of the modern speed game, how our collective scripts the game, and host semi-annual contests. We hope you enjoy our dulcet tones and sick beats.</p>

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
            link={"/shenanigans/winter-2023-contest/"}
            title="ASTRAY, DARNED OAF II: OAF Catches Strays"
            date="December 6, 2023"
            excerpt="We're bringing the band back together and doing yet another 12-months-of-IOTMs anagram contest. And this time, the prize is a Crimbo Elfling. (Wait, WHAT???)"
            type="🎉 Active Contest 🎉"
          />

        <p></p>

        <HotDogLink 
              link={"/tools/"}
              title="Museum"
              date="October 23, 2023"
              excerpt="Museum is our brand-new display case database! Check out who's collected the most of every item in the game, and see where your collections rank among the masses!"
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
