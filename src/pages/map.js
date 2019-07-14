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
			showTraps: true,
			showCatches: true
		}
	}

	render() {
		const siteTitle = get(this, 'props.data.site.siteMetadata.title')
		const traps = get(this, 'props.data.allContentfulTrap.edges')
		const catches = get(this, 'props.data.allContentfulCatch.edges')

		const { showTraps, showCatches } = this.state

		return (
			<Layout location={this.props.location} >
				<div>
					<Helmet title={siteTitle} />
					<section className="hero hero--diagonal padding-y-xxl">
						<div className="container max-width-adaptive-sm">
							<div className="hero__content text-center">
								<div className="hero__label margin-bottom-xxs"></div>

								<div className="text-component margin-bottom-sm">
									<h3>Map</h3>
								</div>
							</div>
						</div>
					</section>
					<div className="wrapper">
						{this.renderFilters()}
						<MapComponent 
							showTraps={showTraps}
							showCatches={showCatches}
							traps={traps}
							catches={catches}
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
				<input type="checkbox" checked={this.state.showTraps} id="showTraps" name="showTraps" onChange={this.handleChange} />
				<label htmlFor="showTraps">Show traps</label><br/>
				<input type="checkbox" checked={this.state.showCatches} id="showCatches" name="showCatches" onChange={this.handleChange} />
				<label htmlFor="showCatches">Show catches</label><br/>
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
	allContentfulTrap {
	  edges {
		node {
		  address
		  location {
			lat
			lon
		  }
		}
	  }
	}
	allContentfulCatch {
	  edges {
		node {
		  location {
			lat
			lon
		  }
		  killer
		  victim
		}
	  }
	}
  }
`
