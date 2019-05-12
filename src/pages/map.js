import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styles from './blog.module.css'
import Layout from "../components/layout"
import MapComponent from "../components/MapComponent"

class MapIndex extends React.Component {
	render() {
		const siteTitle = get(this, 'props.data.site.siteMetadata.title')
		
		return (
		<Layout location={this.props.location} >
			<div style={{ background: '#fff' }}>
				<Helmet title={siteTitle} />
				<div className={styles.hero}>
					<h4>Map</h4>
				</div>
				<div className="wrapper">
					<MapComponent 
						isMarkerShown 
						googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAV9GarEbjNh5ryLf-AMsk0WAMIbwFmrYE&libraries=geometry,drawing,places"
						loadingElement={<div style={{ height: `100%` }} />}
						containerElement={<div style={{ height: `400px` }} />}
						mapElement={<div style={{ height: `100%` }} />}
					  />
				</div>
			</div>
		</Layout>
		)
	}
}

export default MapIndex

export const pageQuery = graphql`
  query MapIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
