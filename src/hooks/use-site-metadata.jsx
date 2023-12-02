import { graphql, useStaticQuery } from "gatsby";

// Dip into your site metadata within gatsby-config.js with a query
// Remember to name all queries so you can use the auto-generated type.
export const useSiteMetadata = () => {
    const data = useStaticQuery(graphql`
        query SiteMetadata {
            site {
                siteMetadata {
                    title
                    description
                    image
                    siteUrl
                }
            }
        }
    `)

    return data.site.siteMetadata
}