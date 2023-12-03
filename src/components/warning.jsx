import * as React from 'react'
import * as layoutStyles from './layout.module.css'

const Warning  = (props) => {
    const warning = props.children
    const emoji = props.emoji === "" ? "⚠️" : props.emoji

    return (
        <>
            <div className={layoutStyles.warnBox}>
                {emoji} {warning} {emoji}
            </div>
        </>
    )

}

export default Warning