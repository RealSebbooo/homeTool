import React from "react"
import Layout from "./../components/layout"
import * as styles from "./../styles/home.module.css"
import { Link } from "gatsby"

export default function index() {
  return (
    <Layout>
      <section className={styles.header}>
        <div>
          <h2>Willkommen</h2>
          <h3>Ich bin Sebastian</h3>
          <Link className={styles.btn}>Mein Blog</Link>
        </div>
      </section>
    </Layout>
  )
}
