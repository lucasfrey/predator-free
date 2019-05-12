import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, KmlLayer } from "react-google-maps"

class MapComponent extends React.Component {
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
				
				{this.props.isMarkerShown && <Marker position={{ lat: -41.3090813, lng: 174.76115800000002 }} />}
			</GoogleMap>
		)
	}
}

export default withScriptjs(withGoogleMap(MapComponent))