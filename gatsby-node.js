const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem')
const postTemplate = path.resolve('./src/templates/post.jsx');

// The Gatsby learn-to-build docs started out with a file system route API form of
//   collecting posts. After further research, that doesn't -quite- do it for me;
//   I want to also be able to pass certain data through the API for previous/next
//   post buttons, among other things, so I am switching to a gatsby-node structure

exports.createPages = async ({ actions, graphql }) => {
    const { createPage, createRedirect } = actions;

    createRedirect({
      fromPath: "/contribute",
      toPath: "https://opencollective.com/loathers",
      statusCode: 200,
    });

    // Grab all MDX files with non-null titles
    const { data } = await graphql(`
      query {
        allMdx(filter: { frontmatter: { title: {ne: null }}}) {
          nodes {
            body
            frontmatter {
              slug
              title
              section
              date
              tag
              author
            }
            id
            excerpt
            internal {
                contentFilePath
            }
          }
        }
      }
    `);

    // Throw errors into the console if they are arrived at during build
    if (data.allMdx.errors) {
        console.error(data.allMdx.errors);
        throw Error(data.allMdx.errors);
    }

    // Set the data as "posts"
    const posts = data.allMdx.nodes;

    // Loop through all MDX files and generate each component programmatically
    posts.forEach(post => {
      const fronts = post.frontmatter;

      const slug = fronts.slug;
      const placement = fronts.section;
      
      // Create the query string for passing the mdx as a child
      const contentFilePath = post.internal.contentFilePath;
      const specialQueryString = `${postTemplate}?__contentFilePath=${contentFilePath}`
      // const specialQueryString = postTemplate;
      
      // Create the page w/ the right template
      createPage({
        path: placement + "/" + slug,
        component: specialQueryString,

        // Variables within "context" are accessible within the template's pageContext
        context: { 
            id: post.id,
            slug: slug,
            date: post.frontmatter.date,
            title: post.frontmatter.title,
            // body: post.body,
            tags: post.frontmatter.tag,
            author: post.frontmatter.author,
            string:specialQueryString,
            internal:post.internal,
        },
      })
    })
  }

  
// // Create file locations and associated values

// exports.onCreateNode = ({node, actions, getNode }) => {
//     const { createNodeField } = actions;
    
//     if (node.internal.type == `Mdx`) {
//         const value = createFilePath({node, getNode});
//         createNodeField({
//             name: `slug`,
//             node,
//             value,
//         });
//     }
// };
