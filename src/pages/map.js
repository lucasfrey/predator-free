import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styles from './blog.module.css'
import Layout from "../components/layout"
import MapComponent from "../components/MapComponent"

class MapIndex extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			showZones: true,
			showMarkers: true,
			showTraps: true
		}
	}

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
						{this.renderFilters()}
						<MapComponent 
							isMarkerShown={this.state.showMarkers}
							showZones={this.state.showZones}
							googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.GMAPS_KEY}&libraries=geometry,drawing,places`}
							loadingElement={<div style={{ height: `100%` }} />}
							containerElement={<div style={{ height: `600px` }} />}
							mapElement={<div style={{ height: `100%` }} />}
						/>
					</div>
				</div>
			</Layout>
		)
	}

	renderFilters() {
		return (
			<div>
				<h4>Filters</h4>
				<input type="checkbox" checked={this.state.showZones} id="showZones" name="showZones" onChange={this.handleChange} />
				<label htmlFor="showZones">Show zones</label><br />
				<input type="checkbox" checked={this.state.showMarkers} id="showMarkers" name="showMarkers" onChange={this.handleChange} />
				<label htmlFor="showMarkers">Show markers</label><br/>
				<input type="checkbox" checked={this.state.showTraps} id="showTraps" name="showTraps" onChange={this.handleChange} />
				<label htmlFor="showTraps">Show traps</label><br/>
			</div>
		)
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: !this.state[e.target.name]
		})
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
