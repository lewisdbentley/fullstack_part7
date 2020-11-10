import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from '../reducers/notificationReducer'
import { Alert } from 'react-bootstrap'


const Message = (props) => {
    const [success, setSucess] = useState(false)

    const message = useSelector(state => state.message)

    const successMessage = {
        color: '#00FF00',
        padding: '12px',
        backgroundColor: '#f7f7f7',
        border: '12px solid #00FF77',
        borderRadius: '12px'
    }

    const errorMessage = {
        color: '#FF0000',
        padding: '12px',
        backgroundColor: '#f7f7f7',
        border: '12px solid #F00F00',
        borderRadius: '12px'
    }

    const styledMessage = success === true ?
        successMessage :
        errorMessage

    const dispatch = useDispatch()

    // const displayMessage = (content, outcome) => {
    //     dispatch(setMessage(message))
    //     setSucess(outcome)
    //     setTimeout(() => {
    //         dispatch(setMessage(''))
    //     }, 5000)
    // }

    return (
        <div className='container'>
            {(message) &&
                <Alert variant='success'>
                    {message}
                </Alert>
            }
        </div>
    )
}

export default Message