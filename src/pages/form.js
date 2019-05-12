import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styles from './blog.module.css'
import Layout from "../components/layout"

class FormIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')

    return (
      <Layout location={this.props.location} >
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <div className={styles.hero}>
            Form
          </div>
          <div className="wrapper">
			form here
          </div>
        </div>
      </Layout>
    )
  }
}

export default FormIndex

export const pageQuery = graphql`
  query FormIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
