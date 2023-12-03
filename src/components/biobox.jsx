import * as React from 'react'
import * as layoutStyles from './layout.module.css'

const BioBox  = (props) => {
    const name = props.name
    const bio = props.children
    const externalLink = props.link

    return (
        <>
        <div className={layoutStyles.hotDogLink} style={{backgroundColor: "SlateGray"}}>
                <h1 style={{backgroundColor: "DarkSlateGray"}}><a href={externalLink}>{name}</a></h1>
                <div className={layoutStyles.flexBreak} />
                <li>{bio}</li>
            </div>
        <p></p>
      </>
    )

}

export default BioBox