import React from "react"
import { Link } from "gatsby"

import Layout from "../components/Layout"

const About = () => {
  return (
    <Layout>
      <h1>About</h1>
      <p>This is an about page.</p>
      <Link to="/contact">Go to contact</Link>
    </Layout>
  )
}

export default About
