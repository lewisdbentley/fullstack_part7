import React, { useState, useImperativeHandle } from 'react'
import propTypes from 'prop-types'


const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const showWhenVisible = { display: visible ? '' : 'none'}
    const hideWhenVisible = { display: visible ? 'none' : ''}

    const toggleVisible = () => {
        setVisible(!visible)
        console.log(visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisible
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisible}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible} className='togglableContent'>
                {props.children}
                <button onClick={toggleVisible}>cancel</button>
            </div>
        </div>
    )
})

Togglable.propTypes = {
    buttonLabel: propTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable