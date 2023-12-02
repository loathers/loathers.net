import * as React from 'react'
import { Link } from 'gatsby'
import { useScriptingData } from '../../hooks/use-scripting-data'
import Layout from '../../components/layout'
import Seo from '../../components/seo'

// Instantiate the analysis page
const KOLScripting = () => {
    return (

        <Layout pageTitle="KOL Scripting">
            {
                // In order to grab data, access the query via the hook
                useScriptingData().allMdx.nodes.map((node) => (
                    
                    <article key={node.id}>
                        <Link to={`/scripting/${node.frontmatter.slug}`}> <h2>{node.frontmatter.title}</h2></Link>
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
      pageTitle="Scripting" 
      pathName = "/scripting"
    />
  )

export default KOLScripting