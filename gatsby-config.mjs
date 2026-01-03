import * as dotenv from 'dotenv'

dotenv.config({path: '.env'});

// The top level siteMetadata config is used for Seo garbage, among other stuff
const config = {
  siteMetadata: {
    title: `loathers.net`,
    version: '1.0.2',
    siteUrl: `https://www.loathers.net`,
    github:`https://github.com/loathers/`,
    description: `Modern analysis and scripting advice for Kingdom of Loathing players`,
    image:`/images/loathersLogo.png`,
  },
  plugins: [
    "gatsby-plugin-image", 
    "gatsby-plugin-sitemap", 
    "gatsby-transformer-sharp",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `./src/data`,
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images',
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800,
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          quality: 70,
          formats: ['auto', 'webp', 'avif'],
          placeholder: 'blurred',
        },
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          { 
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth:800,
            }
          }
        ]
      }
    },
  ]
};

export default config;
