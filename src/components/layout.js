import React from "react"

import Header from "./header"
import Footer from "./footer"

import "./../styles/index.css"

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Header></Header>
      <div className="content">{children}</div>
      <Footer></Footer>
    </div>
  )
}
