import * as React from 'react'
import { useSiteMetadata } from "../hooks/use-site-metadata"

const Seo = (props) => {
  const pageTitle = props.pageTitle
  const pathName = props.pathName

  const { title: defaultTitle, description: defaultDescription, image, siteUrl } = useSiteMetadata()

  const seoData = {
    title: defaultTitle,
    description: defaultDescription,
    image: `${image}`,
    url: `${siteUrl}${pathName ||``}`,
  }

  return (
    <>
        <title>{pageTitle} | {seoData.title}</title>
        <meta name="description" content = {seoData.description}/>
        <meta name="image" content = {seoData.image}/>
        <meta name="twitter:title" content = {seoData.title}/>
        <meta name="twitter:url" content = {seoData.url}/>
        <meta name="twitter:description" content = {seoData.description}/>
        <meta name="twitter:image" content = {seoData.image}/>
        <link rel="icon" href={seoData.image}/>
    </>
  )
}

export default Seo