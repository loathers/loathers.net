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
    "gatsby-plugin-image", 
    "gatsby-plugin-sitemap", 
    "gatsby-plugin-mdx", 
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/src/data`,
      }
    },
    "gatsby-plugin-sharp", 
    "gatsby-transformer-sharp",
  ]
};

export default config;
