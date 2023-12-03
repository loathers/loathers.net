import * as React from 'react'
import { Link } from 'gatsby'
import { useIOTMData } from '../../hooks/use-iotm-data'
import Layout from '../../components/layout'
import Seo from '../../components/seo'
import Warning from '../../components/warning'

// Instantiate the analysis page
const KOLAnalysis = () => {
    return (

        <Layout pageTitle="KOL Analysis">
            <Warning emoji="">Everything on this site is a potential KOL spoiler. Proceed at your own risk!</Warning>
            <p>Our analysis will largely fall under a few distinct types of posts:</p> 
            <ul>
                <li>First, we'll be posting up monthly IOTM overviews, giving you the scoop on what kind of speed ascension benefits you'll be able to derive from TPTB's newest releases. From time to time, we'll also post <i>retro</i> IOTM overviews, discussing old IOTMs both in the context of their own era as well as modern unrestricted play.</li> 
                <li>Second, we'll be posting quarterly path reviews, discussing how the path played and whether we liked it or not! As with IOTMs, we will periodically post reviews of old-timey paths, analyzing the path mechanics and digging in on our favorite (and least favorite) parts of the old meta. </li>
                <li>Finally, we will occasionally post articles that are simply "speed ascension helpers", analyzing various quests, benefits, and strategies in ways that seek to bring knowledge of high level speed play to the masses.</li> 
            </ul>
            <p>We hope you enjoy the content! </p>
            <h1 style={{textAlign:"center"}}>Speedgame Analysis</h1>
            <article>
            <dl>
            {
                // In order to grab data, access the query via the hook
                useIOTMData().allMdx.nodes.map((node) => (
                    <>
                        <Link to={`/analysis/${node.frontmatter.slug}`}> 
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
      pageTitle="Analysis" 
      pathName = "/analysis"
    />
  )

export default KOLAnalysis