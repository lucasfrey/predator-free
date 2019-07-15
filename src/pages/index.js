import React from 'react'
import { graphql, Link } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'

class RootIndex extends React.Component {
  render() {
	const siteTitle = get(this, 'props.data.site.siteMetadata.title')
	const posts = get(this, 'props.data.allContentfulBlogPost.edges')

	return (
	  <Layout location={this.props.location}>
		  <Helmet title={siteTitle} />
			<section className="hero hero--diagonal padding-y-xxl">
				<div className="container max-width-adaptive-sm">
				<div className="hero__content text-center">
					<div className="hero__label margin-bottom-xxs">Welcome to</div>

					<div className="text-component margin-bottom-sm">
						<h3>Predator Free Brooklyn</h3>
						<p>a map to show which people are taking the lead for backyard trapping in which parts of Brooklyn.</p>
					</div>

					<div className="flex flex-wrap flex-center flex-gap-sm">
						<Link className="btn btn--primary" to="/map/">Go to the map</Link>
						<a href="#0" className="color-inherit">Donate</a>
					</div>
				</div>
				</div>
			</section>
			<div className="wrapper">
			<h2 className="section-headline">Latest News</h2>
			<ul className="article-list">
			  {posts.map(({ node }) => {
				return (
				  <li key={node.slug}>
					<ArticlePreview article={node} />
				  </li>
				)
			  })}
			</ul>
		  </div>
	  </Layout>
	)
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
	site {
	  siteMetadata {
		title
	  }
	}
	allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
	  edges {
		node {
		  title
		  slug
		  publishDate(formatString: "MMMM Do, YYYY")
		  tags
		  heroImage {
			fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
			 ...GatsbyContentfulFluid_tracedSVG
			}
		  }
		  description {
			childMarkdownRemark {
			  html
			}
		  }
		}
	  }
	}
  }
`
