import remarkGFM from 'remark-gfm'
import * as dotenv from 'dotenv'

dotenv.config({path: '.env'});

// The top level siteMetadata config is used for Seo garbage, among other stuff
const config = {
  siteMetadata: {
    title: `loathers.net`,
    version: '1.0.0',
    siteUrl: `https://www.loathers.net`,
    github:`https://github.com/loathers/`,
    description: `Modern analysis and scripting advice for Kingdom of Loathing players`,
    image:`/images/loathersLogo.png`,
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `./src/data`,
      }
    },
    "gatsby-plugin-image", 
    "gatsby-plugin-sitemap", 
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGFM]
        }
      }
    },
    "gatsby-plugin-sharp", 
    "gatsby-transformer-sharp",
  ]
};

export default config;
