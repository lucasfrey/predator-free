import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styles from './form.module.css'
import Layout from "../components/layout"
import AddressFinder from "../components/AddressFinder"
import { Formik } from 'formik';
import cx from 'classnames';

import DatePicker from 'react-date-picker';

import { createClient } from 'contentful-management'
const client = createClient({
	accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
	environment: process.env.CONTENTFUL_ENVIRONMENT
})

class FormIndex extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			address: null,
			saving: false,
			success: false
		}
	}

	render() {
	const siteTitle = get(this, 'props.data.site.siteMetadata.title')
	let wrapperClass = cx('wrapper container max-width-sm', { 'wrapper--loading': this.state.saving })

	return (
	  <Layout location={this.props.location} >
		<div>
		  <Helmet title={siteTitle} />
		  <section className="hero hero--diagonal padding-y-xl">
			<div className="container max-width-adaptive-sm">
				<div className="hero__content text-center">
					<div className="hero__label margin-bottom-xxs">Help rid Brooklyn of rats!</div>

					<div className="text-component margin-bottom-sm">
						<h3>Register your catch</h3>
					</div>
				</div>
			</div>
		</section>
		
		  <div className={wrapperClass}>
			  {this.state.success && this.renderSuccessMessage()}
			<Formik
				initialValues={{ 
					email: '',
					kill_number: 1,
					address: '',
					kill: 'Rat',
					killer: 'Trap',
					date_activity: new Date(),
					is_dead: true 
				}}
				validate={values => {
					let errors = {};

					if (!values.address) {
						errors.address = 'Address is required';
					}

					return errors;
				}}
				onSubmit={(values, { setSubmitting }) => {
					setTimeout(() => {
						this.setState({
							saving: true,
							success: false
						})
						this.saveToContentful(values)
						setSubmitting(false);
					}, 400);
				}}
				>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
					setFieldValue
				}) => (
					<form onSubmit={handleSubmit}>
						<div className="g-recaptcha" data-sitekey="6LcQXawUAAAAAHZdXpoSiARFoXMakDtDN18ocj_Y"></div>
						<legend className="form-legend">General information</legend>
						<div className="margin-bottom-sm">
							<div className="grid grid-gap-sm">
								<div className="col-6@md">
									<label className="form-label margin-bottom-xxs" htmlFor="inputEmail">Email:</label>
									<input type="text" name="email" 
										className="form-control width-100%"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.email}
										/>
										{errors.email && touched.email && <div className={styles.error}>{errors.email}</div>}
								</div>
								<div className="col-6@md">
									<label className="form-label margin-bottom-xxs" htmlFor="inputName">Street Address:</label>
									<AddressFinder invalid={errors.address && touched.address} onChange={e => setFieldValue('address', e)} updateSelectedAddress={this.updateSelectedAddress} />
										{errors.address && touched.address && <div role="alert" className="form__msg-error form__msg-error--is-visible">{errors.address}</div>}
								</div>
							</div>
						</div>
						<div className="margin-bottom-sm">
							<div className="grid grid-gap-sm">
								<div className="col-6@md">
									<label className="form-label margin-bottom-xxs" htmlFor="inputEmail">Date of activity:</label>
									<DatePicker
										className="form-control width-100%"
										name="date_activity"
										onChange={e => setFieldValue('date_activity', e)}
										value={values.date_activity}
										locale="en-NZ"
									/>
									{errors.date_activity && touched.date_activity && <div className="error">{errors.date_activity}</div>}
								</div>
								<div className="col-6@md">
									<label className="form-label margin-bottom-xxxs" htmlFor="selectThis">Catch by:</label>
									<div className="select">
										<select className="form-control width-100%" name="catch_by" onChange={handleChange}
											onBlur={handleBlur}
											value={values.catch_by}>
											<option value="trap">Trap</option>
											<option value="cat">Cat</option>
											<option value="hedgehog">Other</option>
										</select>
										<svg className="icon" aria-hidden="true" viewBox="0 0 16 16"><g stroke-width="1" stroke="currentColor"><polyline fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="15.5,4.5 8,12 0.5,4.5 "></polyline></g></svg>
									</div>
								</div>
							</div>
						</div>
						<br/>
						<div className="margin-bottom-md">
						<legend className="form-legend">What did you catch?</legend>
						<div className="grid grid-gap-sm">
							<div className="col-2@md">
								<div className="number-input number-input--v1 js-number-input">
									<input className="form-control js-number-input__value" type="number" name="kill_number" id="kill_number" min="0" max="10" step="1" value="1" 
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.kill_number} />
									<div className="number-input__btns" aria-hidden="true">
										<a className="reset number-input__btn number-input__btn--plus js-number-input__btn">
										<svg className="icon" viewBox="0 0 16 16"><g><polygon points="13,11 8,5 3,11 "></polygon></g></svg>
										</a>
										
										<a className="reset number-input__btn number-input__btn--minus js-number-input__btn">
										<svg className="icon" viewBox="0 0 16 16"><g><polygon points="3,5 8,11 13,5 "></polygon></g></svg>
										</a>
									</div>
								</div>
							</div>
							<div className="col-6@md">
								<div className="select">
									<select className="form-control width-100%" name="kill" onChange={handleChange}
										onBlur={handleBlur}
										value={values.kill}>
										<option value="Mouse">Mouse</option>
										<option value="Rat">Rat</option>
										<option value="Hedgehog">Hedgehog</option>
									</select>
									<svg className="icon" aria-hidden="true" viewBox="0 0 16 16"><g stroke-width="1" stroke="currentColor"><polyline fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="15.5,4.5 8,12 0.5,4.5 "></polyline></g></svg>
								</div>
							</div>
						</div>
						</div>
						<div className="margin-bottom-md">
							<ul className="radio-list radio-list--custom">
								<li>
									<input type="checkbox" name="is_dead" id="is_dead"
										checked={values.is_dead}
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.is_dead} />
									<label htmlFor="is_dead">Catch is dead</label>
								</li>
							</ul>
						</div>
						<div className="margin-bottom-md">
							<label className="form-label margin-bottom-xxs" htmlFor="textarea">Comments:</label>
							<textarea className="form-control width-100%" name="comments" id="comments" cols="30" rows="10"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.comments}></textarea>
						</div>
					
						<button className="btn btn--primary" type="submit" disabled={isSubmitting}>
							Submit
						</button>
					</form>
				)}
				</Formik>
		  </div>
		</div>
	  </Layout>
	)
  }

  onloadCallback = () => {
	grecaptcha.render('html_element', {
	  'sitekey' : '6LcQXawUAAAAAHZdXpoSiARFoXMakDtDN18ocj_Y'
	});
  };

  renderSuccessMessage() {
	  return <h2>Thanks for submitting your catch</h2>
  }

  updateSelectedAddress = (selectedAddress) => {
	this.setState({
		address: selectedAddress
	})
  }

  async saveToContentful(values) {
	const { lat, lon } = this.state.address;
	const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
	const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT);

	let newEntry = await environment.createEntry('catch', {
		fields: {
			date: {
				'en-US': new Date(values.date_activity + 'Z')
			},
			location: {
				'en-US': {
					lon: parseFloat(lon),
					lat: parseFloat(lat)
				}
			},
			email: {
				'en-US': values.email
			},
			killer: {
				'en-US': values.killer
			},
			victim: {
				'en-US': values.kill
			},
			isDead: {
				'en-US': values.is_dead
			},
			comments: {
				'en-US': values.comments
			}
		}
	});

	this.setState({
		saving: false,
		success: true
	})

	newEntry.publish();
  }
}

export default FormIndex

export const pageQuery = graphql`
  query FormIndexQuery {
	site {
	  siteMetadata {
		title
	  }
	}
  }
`
