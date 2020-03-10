import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/Layout"
import blogStyles from "./blog.module.scss"

const Blog = ({ data }) => {
  return (
    <Layout>
      <h1>Blog</h1>
      <ol className={blogStyles.posts}>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <li key={node.id} className={blogStyles.post}>
            <Link to={`/blogs/${node.fields.slug}`}>
              <h2>{node.frontmatter.title}</h2>
              <p>{node.frontmatter.date}</p>
            </Link>
          </li>
        ))}
      </ol>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
      edges {
        node {
          id
          frontmatter {
            title
            date
          }
          html
          excerpt
          fields {
            slug
          }
        }
      }
    }
  }
`

export default Blog
