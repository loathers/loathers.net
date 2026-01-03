import React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { graphql, Link } from 'gatsby'
// import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { StaticImage, getImage, GatsbyImage } from 'gatsby-plugin-image'
import * as layoutStyles from '../components/layout.module.css'
import Warning from '../components/warning'

const shortCodes = { Link, StaticImage, Warning, getImage, GatsbyImage }

export default function GeneratePost({data, pageContext, children}) {

    const previous = pageContext.previous
    const next = pageContext.next
    const needsPagination = Boolean(previous) || Boolean(next)

    return (
      <>
        <Layout>
            <h1>{pageContext.title}</h1>
            <h6>{pageContext.date} // {pageContext.tags}</h6>
            {needsPagination && (
            <nav>
              <ul className={layoutStyles.navLinks}>
                {previous && (
                    <li><Link to={`/${previous.frontmatter.section}/${previous.frontmatter.slug}`} className={layoutStyles.navLinkText}>   ← {previous.frontmatter.title}</Link></li>
                  )}
                <li className={layoutStyles.navSpacer}> </li>
                  {next && (
                      <li><Link to={`/${next.frontmatter.section}/${next.frontmatter.slug}`} className={layoutStyles.navLinkText}>{next.frontmatter.title} →   </Link></li>
                    )}
              </ul>
            </nav>
          )}
            <MDXProvider components={shortCodes}>
              {children}
              {/* {pageContext.embeddedImagesLocal && (<MDXRenderer localImages={embeddedImagesLocal}>{children}</MDXRenderer>)} */}
              {/* {!pageContext.embeddedImagesLocal && (<MDXRenderer>{children}</MDXRenderer>)} */}
            </MDXProvider>
            <h7>Article contributed by {pageContext.author}</h7>
          {needsPagination && (
            <nav>
              <ul className={layoutStyles.navLinks}>
                {previous && (
                    <li><Link to={`/${previous.frontmatter.section}/${previous.frontmatter.slug}`} className={layoutStyles.navLinkText}>   ← {previous.frontmatter.title}</Link></li>
                  )}
                <li className={layoutStyles.navSpacer}> </li>
                  {next && (
                      <li><Link to={`/${next.frontmatter.section}/${next.frontmatter.slug}`} className={layoutStyles.navLinkText}>{next.frontmatter.title} →   </Link></li>
                    )}
              </ul>
            </nav>
          )}
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