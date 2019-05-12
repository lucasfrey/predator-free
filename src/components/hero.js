import React from 'react'
import Img from 'gatsby-image'

import styles from './hero.module.css'

export default ({ data }) => (
  <div className={styles.hero}>
    <Img className={styles.heroImage} alt={data.name} fluid={data.heroImage.fluid} />
    <div className={styles.heroDetails}>
      <h3 className={styles.heroHeadline}>Predator Free Brooklyn</h3>
      <p>Map to show which people are taking the lead for backyard trapping in which parts of Brooklyn.</p>
    </div>
  </div>
)
