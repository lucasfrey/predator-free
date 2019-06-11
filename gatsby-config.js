let contentfulConfig

try {
  // Load the Contentful config from the .contentful.json
  contentfulConfig = require('./.contentful')
} catch (_) {}

// Overwrite the Contentful config with environment variables if they exist
contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID || contentfulConfig.spaceId,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN || contentfulConfig.accessToken,
  environment: process.env.CONTENTFUL_ENVIRONMENT || contentfulConfig.environment,
}

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the delivery token need to be provided.'
  )
}

module.exports = {
  siteMetadata: {
    title: 'Predator Free Brooklyn',
  },
  pathPrefix: '/predator-free',
  plugins: [
    'gatsby-transformer-remark',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        whitelist: [
            "GMAPS_KEY",
            "CONTENTFUL_DELIVERY_TOKEN",
            "CONTENTFUL_ENVIRONMENT",
            "CONTENTFUL_SPACE_ID"
        ]
      },
    },
    {
        resolve: `gatsby-plugin-google-tagmanager`,
        options: {
            id: "GTM-5KFHPG",

            // Include GTM in development.
            // Defaults to false meaning GTM will only be loaded in production.
            includeInDevelopment: true,
        },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Predator Free",
        short_name: "Predator Free",
        start_url: "/",
        background_color: "#6b37bf",
        theme_color: "#6b37bf",
        display: "standalone",
        icon: "src/images/favicon.png",
        crossOrigin: `use-credentials`,
      }
    },
  ],
}
