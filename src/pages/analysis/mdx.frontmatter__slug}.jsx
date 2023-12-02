// import * as React from 'react'
// import Layout from '../../components/layout'
// import Seo from '../../components/seo'
// import { graphql } from 'gatsby'

// // Generate a post using data grabbed below
// const GeneratedPost = ({data,children}) => {
//     return (
//         <Layout pageTitle={data.mdx.frontmatter.title}>
//             <h6>{data.mdx.frontmatter.date} // {data.mdx.frontmatter.tag}</h6>
//             <div> {children} </div>
//             <h7>Article contributed by {data.mdx.frontmatter.author}</h7>
//         </Layout>
//     )
// }

// // Grab your post's data via a query on the current $id
// export const query = graphql`
//   query GrabPost ($id: String) {
//     mdx(id: {eq: $id}) {
//       frontmatter {
//         title
//         date(formatString: "MMMM D, YYYY")
//         author
//         tag
//       }
//     }
//   }
// `

// // Set the page title via the Seo component, adding sitename afterwards
// export const Head = ({data}) => (
//     <Seo 
//       pageTitle={data.mdx.frontmatter.title} 
//       pathName = ""
//     />
//   )

// // Export your constant post for rendering
// export default GeneratedPost