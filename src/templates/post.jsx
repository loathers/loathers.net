import React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { Link } from 'gatsby'

const shortCodes = { Link } // Common MDX components

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

export const Head = ({data}) => (
    <Seo 
      pageTitle="title" 
      pathName = ""
    />
  )