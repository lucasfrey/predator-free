import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, KmlLayer } from "react-google-maps"

export default withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: -41.31149330989544, lng: 174.77141979509724 }}
  >
	<KmlLayer
      url="http://www.google.com/maps/d/u/0/kml?mid=1R8Rw7tZTGw3YHKBTNBOh-LKU5sw"
      options={{ preserveViewport: true }}
    />
    {props.isMarkerShown && <Marker position={{ lat: -41.3090813, lng: 174.76115800000002 }} />}
  </GoogleMap>
))