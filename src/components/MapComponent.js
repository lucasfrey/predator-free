import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, KmlLayer } from "react-google-maps"
import PropTypes from 'prop-types'

class MapComponent extends React.Component {
	static propTypes = {
		showZones: PropTypes.bool,
		isMarkerShown: PropTypes.bool,
		traps: PropTypes.array
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

				{this.props.showZones && <KmlLayer
					url="https://raw.githubusercontent.com/lucasfrey/predator-free/master/static/data/Deployed-Traps-21-Aug-18.kml"
					options={{ preserveViewport: true }}
				/>}
				
				{this.props.isMarkerShown && this.renderMarkers()}
			</GoogleMap>
		)
	}

	renderMarkers() {
		const { traps } = this.props;
		
		return traps.map(( trap ) => {
			const { address, location } = trap.node;

			if (location && location.lat && location.lon) {
				return <Marker 
							key={address} 
							position={{ lat: location.lat, lng: location.lon }} />
			}
		})
	}
}

export default withScriptjs(withGoogleMap(MapComponent))