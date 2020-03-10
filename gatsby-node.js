const path = require("path")

exports.onCreateNode = ({ node, actions }) => {
  const { createNode, createNodeField } = actions
  // Transform the new node here and create a new node or
  // create a new node field.

  if (node.internal.type === "MarkdownRemark") {
    const slug = path.basename(node.fileAbsolutePath, ".md")

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const response = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  response.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      component: path.resolve("./src/templates/Blog.jsx"),
      path: `/blogs/${node.fields.slug}`,
      context: {
        slug: node.fields.slug,
      },
    })
  })

  // 1. Get path to template
  // 2. Get markdown data
  // 3. Create new pages
}
