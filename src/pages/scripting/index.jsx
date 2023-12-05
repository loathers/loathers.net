import * as React from 'react'
import { Link } from 'gatsby'
import { useScriptingData } from '../../hooks/use-scripting-data'
import Layout from '../../components/layout'
import Seo from '../../components/seo'

// Instantiate the analysis page
const KOLScripting = () => {
    return (

        <Layout pageTitle="KOL Scripting">
            <p>Unlike our speedgame analysis, our scripting assistance articles are semi-rarely updated. Still, these should (hopefully!) give curious readers a good starting point from which to start scripting up your very own KOLMafia scripts.</p>
            <p>For our suite of scripts, <a href="https://github.com/loathers">check out our GitHub!</a></p>
            <hr />
            <h1 style={{textAlign:"center"}}>Scripting Articles</h1>
            <article>
            <dl>
            {
                // In order to grab data, access the query via the hook
                useScriptingData().allMdx.nodes.map((node) => (
                    <>
                        <Link to={`/scripting/${node.frontmatter.slug}`}> 
                            <dt>
                                <h2>{node.frontmatter.title}</h2>
                                <p>{node.frontmatter.date}</p>
                            </dt>
                        </Link>
                        <dd>{node.excerpt}</dd>
                    </>
                ))
            }
            </dl>
            </article>
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