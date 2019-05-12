import React from 'react'
import { Link } from 'gatsby'
import styles from './navigation.module.css'

export default () => (
  <nav role="navigation">
    <ul className={styles.navigation}>
      <li className={styles.navigationItem}>
        <Link to="/">Home</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/map/">Map</Link>
      </li>
	  <li className={styles.navigationItem}>
        <Link to="/form/">Form</Link>
      </li>
	  <li className={styles.navigationItem}>
        <a target="_blank" href="https://givealittle.co.nz/cause/predator-free-brooklyn">Donate</a>
      </li>
    </ul>
  </nav>
)
