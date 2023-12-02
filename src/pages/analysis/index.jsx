import * as React from 'react'
import { Link } from 'gatsby'
import { useIOTMData } from '../../hooks/use-iotm-data'
import Layout from '../../components/layout'
import Seo from '../../components/seo'

// Instantiate the analysis page
const KOLAnalysis = () => {
    return (

        <Layout pageTitle="KOL Analysis">
            {
                // In order to grab data, access the query via the hook
                useIOTMData().allMdx.nodes.map((node) => (
                    
                    <article key={node.id}>
                        <Link to={`/analysis/${node.frontmatter.slug}`}> <h2>{node.frontmatter.title}</h2></Link>
                        <p>Posted: {node.frontmatter.date}</p>
                        <p>{node.excerpt}</p>
                    </article>
                ))
            }
        </Layout>
    )
}

// Set the page title via the Seo component, adding sitename afterwards
export const Head = () => (
    <Seo 
      pageTitle="Analysis" 
      pathName = "/analysis"
    />
  )

export default KOLAnalysis