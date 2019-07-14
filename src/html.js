import React from "react"
import PropTypes from "prop-types"

export default class HTML extends React.Component {
  render() {
	const googleSrc = `https://maps.googleapis.com/maps/api/js?key=${process.env.GMAPS_KEY}&libraries=places`;

	return (
	  <html className="js" {...this.props.htmlAttributes}>
		<head>
		  <meta charSet="utf-8" />
		  <meta httpEquiv="x-ua-compatible" content="ie=edge" />
		  <meta
			name="viewport"
			content="width=device-width, initial-scale=1, shrink-to-fit=no"
		  />
		  {this.props.headComponents}
		  <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer></script>
		</head>
		<body {...this.props.bodyAttributes}>
		  {this.props.preBodyComponents}
		  <div
			key={`body`}
			id="___gatsby"
			dangerouslySetInnerHTML={{ __html: this.props.body }}
		  />
		  {this.props.postBodyComponents}
		  <script type="text/javascript" 
			src={googleSrc}>
		  </script> 
		</body>
	  </html>
	)
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
