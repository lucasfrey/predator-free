import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styles from './blog.module.css'
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
            success: true
        }
    }

    render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    let wrapperClass = cx('wrapper', { 'wrapper--loading': this.state.saving })

    return (
      <Layout location={this.props.location} >
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <div className={styles.hero}>
            Register your catch
          </div>
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

                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }

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
                        <label htmlFor="email">Email address</label>
                        <br/>
                        <input type="text" name="email" 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            />
                            {errors.email && touched.email && <div>{errors.email}</div>}
                        <br/><br/>
                        <label htmlFor="address">Street Address</label>
                        <AddressFinder onChange={e => setFieldValue('address', e)} updateSelectedAddress={this.updateSelectedAddress} />
                        {errors.address && touched.address && <div>{errors.address}</div>}
                        <br/>
                        <label htmlFor="date_activity">Date of activity</label>
                        <br/>
                        <DatePicker
                            name="date_activity"
                            onChange={e => setFieldValue('date_activity', e)}
                            value={values.date_activity}
                            locale="en-NZ"
                        />
                        {errors.date_activity && touched.date_activity && <div>{errors.date_activity}</div>}
                        <br/>
                        <br/>
                        <label htmlFor="catch_by">Catch by:</label>
                        <br/>
                        <select name="catch_by" onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.catch_by}>
                            <option value="trap">Trap</option>
                            <option value="cat">Cat</option>
                            <option value="hedgehog">Other</option>
                        </select>
                        <br/>
                        <br/>
                        <p>What did you catch?</p>
                        <input type="number" style={{ width: '20px' }} name="kill_number" onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.kill_number} /> x&nbsp;
                        <select name="kill" 
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.kill}>
                            <option value="Mouse">Mouse</option>
                            <option value="Rat">Rat</option>
                            <option value="Hedgehog">Hedgehog</option>
                        </select>
                        <br/>
                        <br/>
                        <label htmlFor="is_dead">Is the catch dead?</label>
                        <input type="checkbox" name="is_dead" 
                            checked={values.is_dead}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.is_dead} />
                        <br/>
                        <br/>
                        <label htmlFor="date_activity">Comments:</label>
                        <br/>
                        <textarea name="comments" id="comments" cols="30" rows="10"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.comments}
                        ></textarea>
                        <br/>
                        <br/>
                        <button type="submit" disabled={isSubmitting}>
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
