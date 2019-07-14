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
		const { props } = this;
		const { mapStyles } = props;

		return (
			<GoogleMap
				defaultZoom={14}
				defaultCenter={{ lat: -41.31149330989544, lng: 174.77141979509724 }}
				defaultOptions={{ styles: mapStyles }}>
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
				const { address, location, victim } = trap.node;
				var iconBase = '../images/';

				if (location && location.lat && location.lon) {
					return <Marker 
								key={address}
								icon={`${iconBase}icon-${victim}.png`}
								position={{ lat: location.lat, lng: location.lon }} />
				}
			})
		}
	
	}
}

MapComponent.defaultProps = {
	// The style is copy from https://snazzymaps.com/style/2/midnight-commander
	mapStyles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
}

export default withScriptjs(withGoogleMap(MapComponent))