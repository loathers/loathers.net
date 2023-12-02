import React from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import Dump from '../components/Dump'

export default function GeneratePost({pageContext}) {

    return (
      <>
        <Layout>
          {/* <Dump data={pageContext}/> */}
            <h1>{pageContext.title}</h1>
            <h6>{pageContext.date} // {pageContext.tags}</h6>
            {/* {children} */}
            {pageContext.body}
            <h7>Article contributed by {pageContext.author}</h7>
        </Layout>
      </>
    )
}

// export const query = graphql`
//   query grabPostByID ($id: String!) {
//     mdx(id: {eq: $id}) {
//       body
//       frontmatter {
//         title
//         date(formatString: "MMMM Do, YYYY")
//         tag
//         author
//       }
//       internal {
//         contentFilePath
//       }
//     }
//   }`

export const Head = ({data}) => (
    <Seo 
      pageTitle="title" 
      pathName = ""
    />
  )