import type { GatsbyConfig } from "gatsby";

// The top level siteMetadata config is used for Seo garbage. The tutorial 
//   was clear this was needed, for some ungodly reason.
const config: GatsbyConfig = {
  siteMetadata: {
    title: `loathers.net`,
    siteUrl: `https://www.loathers.net`,
    description: `A collective knowledgebase for Kingdom of Loathing players`,
    image:`/images/loathersLogo.png`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-styled-components",
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx','.md'],
      },
    },
    "gatsby-plugin-image", 
    "gatsby-plugin-sitemap", 
    "gatsby-plugin-mdx", 
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`,
      }
    },
    "gatsby-plugin-sharp", 
    "gatsby-transformer-sharp", 
    "gatsby-plugin-typescript", 
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/images/"
      },
      __key: "images"
    }, {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "pages",
        "path": "./src/pages/"
      },
      __key: "pages"
    }, {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "components",
        "path": "./src/components/"
      },
      __key: "components",
    }, {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "analysis",
        "path": `./src/data/analysis`
      },
      __key: "analysis",
    }, {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "scripting",
        "path": `./src/data/scripting`
      },
      __key: "scripting",
    },
  ]
};

export default config;
