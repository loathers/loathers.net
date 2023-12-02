import * as React from 'react'
import Layout from '../components/layout'
import Dump from '../components/Dump'
import Seo from '../components/seo'
import { graphql, Link } from 'gatsby'

// Define the core component
const IndexPage = ({data}) => {
  return (
    <Layout pageTitle = "Home">
      {/* <Dump data={data} /> */}
      <>
        <h1>Newest Analysis!</h1>
        {data.allMdx.nodes.map(
          ( {excerpt, frontmatter }) => (
            <Link to={frontmatter.section+"/"+frontmatter.slug}>
              <h2>{frontmatter.title}</h2>
              <p>{frontmatter.date}</p>
              <p>{excerpt}</p>
            </Link>
          )
        )}
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
