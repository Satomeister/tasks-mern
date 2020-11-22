import React, { forwardRef, useState } from 'react'

const Tooltip = forwardRef(({ children, content, position }, ref) => {
    const [visible, setVisible] = useState(false)

    const show = () => {
        setVisible(true)
    }

    const hide = () => {
        setVisible(false)
    }

    const style = `tooltip ${position} ${visible && 'visible'}`

    return (
        <div className='tooltip-wrapper unselectable'>
            <span className={style}>{ content }</span>
            <span
                className='targetElement'
                onMouseEnter={show}
                onMouseLeave={hide}
                ref={ref}
            >{ children }</span>
        </div>
    )
})

export default Tooltip