import * as React from 'react'
import { Link } from 'gatsby'
import * as layoutStyles from './layout.module.css'

// This creates the long "hot dog" shaped cards on the main page.

const HotDogLink  = (props) => {
    const dogTitle = props.title
    const dogDate = props.date 
    const dogExcerpt = props.excerpt
    const dogLink = props.link
    const dogType = props.type 

    return (
        <>
        <Link to={dogLink}>
            <div className={layoutStyles.hotDogLink} style={dogType === "Newest Analysis" ? {backgroundColor: "FireBrick" } : {backgroundColor: "SlateGray"}}>
                <h1 style={dogType === "Newest Analysis" ? {backgroundColor: "Maroon" } : {backgroundColor: "DarkSlateGray"}}>{dogType}</h1>
                <div className={layoutStyles.flexBreak} />
                <li><h2>{dogTitle}</h2> {dogDate !== "" ? dogDate : ""}</li>
                <li>{dogExcerpt}</li>
            </div>
        </Link>
        </>
    )
}

export default HotDogLink