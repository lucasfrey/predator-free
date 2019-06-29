import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styles from './blog.module.css'
import Layout from "../components/layout"
import { Formik } from 'formik';

class FormIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')

    return (
      <Layout location={this.props.location} >
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <div className={styles.hero}>
            Form
          </div>
          <div className="wrapper">
            <Formik
                initialValues={{ email: '', kill_number: 1, address: '' }}
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
                        console.log(values)
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
                    /* and other goodies */
                }) => (
                    <form onSubmit={handleSubmit}>
                    <h3>General information</h3>
                    <label htmlFor="email">Email address</label>
                    <input type="text" name="email" 
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        />
                        {errors.email && touched.email && <div>{errors.email}</div>}
                    <br/>
                    <label htmlFor="address">Street Address</label>
                    <input type="text" name="address" 
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address} 
                        />
                        {errors.address && touched.address && <div>{errors.address}</div>}
                    <br/>
                    <label htmlFor="date_activity">Date of activity</label>
                    <input placehollder="dd/mm/yyyy" type="text" name="date_activity" 
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.date_activity}  />
                        {errors.date_activity && touched.date_activity && <div>{errors.date_activity}</div>}
                    <br/>
                    <br/>
                    <h3>Catch</h3>
                    <select name="catch_by" onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.catch_by}>
                        <option value="mouse">Trap</option>
                        <option value="rat">Cat</option>
                        <option value="hedgehog">Other</option>
                    </select>
                    <br/>
                    <br/>
                    <input type="text" style={{ width: '20px' }} name="kill_number" onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.kill_number} />
                    <select name="kill" onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.kill}>
                        <option value="mouse">Mouse</option>
                        <option value="rat">Rat</option>
                        <option value="hedgehog">Hedgehog</option>
                    </select>
                    <br/>
                    <br/>
                    <label htmlFor="kill_state">State of the catch</label>
                    <br/>
                    <label htmlFor="kill_state['alive']">Alive</label>
                    <input type="radio" name="kill_state['alive']" onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.kill_state} />
                    <label htmlFor="kill_state['dead']">Dead</label>
                    <input type="radio" name="kill_state['dead']" onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.kill_state} />
                    <br/>
                    <label htmlFor="date_activity">Comments:</label>
                    <br/>
                    <textarea name="comment" id="comment" cols="30" rows="10"></textarea>
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
