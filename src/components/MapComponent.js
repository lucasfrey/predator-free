import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, KmlLayer } from "react-google-maps"
import PropTypes from 'prop-types'

class MapComponent extends React.Component {
	static propTypes = {
		showZones: PropTypes.bool,
		showlCatch: PropTypes.bool,
		showTraps: PropTypes.bool,
		traps: PropTypes.array,
		catches: PropTypes.array
	};

	render() {
		return (
			<GoogleMap
				defaultZoom={14}
				defaultCenter={{ lat: -41.31149330989544, lng: 174.77141979509724 }}>
				{this.props.showZones && <KmlLayer
					url="https://raw.githubusercontent.com/lucasfrey/predator-free/master/static/data/Team-Leader-Zones.kml"
					options={{ preserveViewport: true }}
				/>}
				{this.props.showCatches && this.renderMarkers('catches')}
				{this.props.showTraps && this.renderMarkers('traps')}
			</GoogleMap>
		)
	}

	renderMarkers(type) {
		if (this.props[type]) {
			return this.props[type].map(( trap ) => {
				const { address, location } = trap.node;
				var iconBase = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/';
	
				if (location && location.lat && location.lon) {
					return <Marker 
								key={address}
								icon={iconBase + 'info-i_maps.png'}
								position={{ lat: location.lat, lng: location.lon }} />
				}
			})
		}
	
	}
}

export default withScriptjs(withGoogleMap(MapComponent))