const path = require('path');
const postTemplate = path.resolve('./src/templates/post.jsx');

// // Due to my constant attempts to fix Gatsby's complete inability to render local 
// //   images, I ended up having to build a stupid fucking schema to add an optional
// //   GraphQL field for images. I hate this stupid fucking backend.

// exports.createSchemaCustomization = ({ actions, schema }) => {
//   const { createTypes, printTypeDefinitions } = actions;

//   createTypes(`
//     type Mdx implements Node {
//       frontmatter: Frontmatter
//       embeddedImagesRemote: [File] @link(from: "fields.embeddedImagesRemote")
//     }
    
//     type Frontmatter @dontInfer {
//       title: String!
//       embeddedImagesLocal: [File] @fileByRelativePath
//       embeddedImagesRemote: [String]
//     }
//     `);

//   printTypeDefinitions({ path: './typeDefs.txt' });
// };

// The Gatsby learn-to-build docs started out with a file system route API form of
//   collecting posts. After further research, that doesn't -quite- do it for me;
//   I want to also be able to pass certain data through the API for previous/next
//   post buttons, among other things, so I am switching to a gatsby-node structure

exports.createPages = async ({ actions, graphql }) => {
    const { createPage, createRedirect } = actions;

    // Redirect to our OC for the contribute link
    createRedirect({
      fromPath: "/contribute",
      toPath: "https://opencollective.com/loathers",
      statusCode: 200,
    });

    // Grab all MDX files with non-null titles
    const { data } = await graphql(`
      query {
        allMdx(
          filter: { frontmatter: { title: {ne: null }}},
          sort: { frontmatter: { date: ASC } }
        ) {
          edges {
            node {
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
      }
    `);

    // Throw errors into the console if they are arrived at during build
    if (data.allMdx.errors) {
        console.error(data.allMdx.errors);
        throw Error(data.allMdx.errors);
    }

    // Set the data as "posts"
    const posts = data.allMdx.edges;

    // Loop through all MDX files and generate each component programmatically
    posts.forEach((post, index, postsArray) => {
      
      // Attempting to use a prev/next format from those old gatsby weirdos
      //  = https://github.com/NickyMeuleman/gatsby-paginated-blog/blob/master/gatsby-node.js
      
      const previous = index === 0 ? null : postsArray[index-1].node
      const next = index === postsArray.length - 1 ? null : postsArray[index+1].node

      const fronts = post.node.frontmatter;

      const slug = fronts.slug;
      const placement = fronts.section;
      
      // Create the query string for passing the mdx as a child
      const contentFilePath = post.node.internal.contentFilePath;
      const specialQueryString = `${postTemplate}?__contentFilePath=${contentFilePath}`
      // const specialQueryString = postTemplate;
      
      // Create the page w/ the right template
      createPage({
        path: placement + "/" + slug,
        component: specialQueryString,

        // Variables within "context" are accessible within the template's pageContext
        context: { 
            id: post.node.id,
            slug: slug,
            date: post.node.frontmatter.date,
            title: post.node.frontmatter.title,
            // body: post.body,
            tags: post.node.frontmatter.tag,
            author: post.node.frontmatter.author,
            string:specialQueryString,
            internal:post.node.internal,
            previous: previous ? previous : null,
            next: next ? next : null,
            // embeddedImagesLocal:post.node.embeddedImagesLocal,
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
