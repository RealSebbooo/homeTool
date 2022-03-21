import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

export default function Header() {
  const data = useStaticQuery(graphql`
    query SiteInfo {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const { title } = data?.site?.siteMetadata
  return (
    <header>
      <nav>
        <h1>{title}</h1>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </nav>
    </header>
  )
}
