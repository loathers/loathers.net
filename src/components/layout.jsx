import * as React from 'react'

import * as layoutStyles from './layout.module.css'
import Header from './header'
import Footer from './footer'

const Layout = (props) => {
  // Declare constants
  // const pageTitle = props.pageTitle
  const children = props.children

  // Generate the layout, it's very simple because you did all the stupid crap in other jsx files
  return (
    <div className={layoutStyles.container}>
      <Header />
          {/* Add the children, the general stuff within the submitted component */}
          <div className={layoutStyles.content}>{children}</div>
      <Footer />
    </div>
  )
}

export default Layout