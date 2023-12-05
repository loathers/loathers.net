import React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { graphql, Link } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { StaticImage } from 'gatsby-plugin-image'
import Warning from '../components/warning'

const shortCodes = { Link, StaticImage, Warning }

export default function GeneratePost({data, pageContext, children}) {

    return (
      <>
        <Layout>
            <h1>{pageContext.title}</h1>
            <h6>{pageContext.date} // {pageContext.tags}</h6>
            <MDXProvider components={shortCodes}>
              {children}
            </MDXProvider>
            <h7>Article contributed by {pageContext.author}</h7>
        </Layout>
      </>
    )
}


export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
      }
    }
  }
`

export const Head = ({data,pageContext}) => (
    <Seo 
      pageTitle={pageContext.title}
      pathName = ""
    />
  )