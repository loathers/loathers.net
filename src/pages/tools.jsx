// Step 1: Import React
import * as React from 'react'
import Layout from '../components/layout'

// Step 2: Define your component
const ToolsPage = () => {
  return (
    <Layout pageTitle="Tools">
      <p>We have a lot of tools you can use. Check them out!</p>
      <ul>
          <li>BOFA</li>
          <li>Museum</li>
          <li>Greenbox</li>
          <li>Treat</li>
      </ul>
    </Layout>
  )
}

// Step 3: Export your component
export default ToolsPage