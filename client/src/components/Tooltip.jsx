import React, { useState } from 'react'

const Tooltip = ({ children, content, position }) => {
    const [visible, setVisible] = useState(false)

    const show = () => {
        setVisible(true)
    }

    const hide = () => {
        setVisible(false)
    }

    const style = `tooltip ${position} ${visible && 'visible'}`

    return (
        <div className='tooltip-wrapper'>
            <span className={style}>{ content }</span>
            <span
                className='targetElement'
                onMouseEnter={show}
                onMouseLeave={hide}
            >{ children }</span>
        </div>
    )
}

export default Tooltip