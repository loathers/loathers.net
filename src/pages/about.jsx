// Step 1: Import React
import * as React from 'react'
import Layout from '../components/layout'

// Step 2: Define your component
const AboutPage = () => {
  return (
    <Layout pageTitle="About Us">
      <p>We are a group of Kingdom of Loathing players (and hooked ex-players) writing scripts and other tools to benefit the player community.</p>
      <p>In our collective, we have a bunch of scripters, farmers, and speedrunners; much of our site content will be devoted to one of these three tentpoles!</p>
    </Layout>
  )
}

// Step 3: Export your component
export default AboutPage