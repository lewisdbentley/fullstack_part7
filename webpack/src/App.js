import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import promisePolyfill from 'promise-polyfill'


if(!window.Promise) {
    window.Promise = promisePolyfill
}

const useNotes = (url) => {
    const [notes, setNotes] = useState([])
    useEffect(() => {
        axios.get(url).then((response) => {
            setNotes(response.data)
        })
    }, [url])
    return notes
}

const App = () => {
    const [counter, setCounter] = useState(null)
    const [values, setValues] = useState([])

    const notes = useNotes(BACKEND_URL)

    const counterClick = () => {
        setCounter(counter + 1)
        setValues(values.concat(counter))
    }

    return (
        <div className='container'>
            hello webpack {counter} clicks
            <button onClick={counterClick}>click</button>
            <div>{notes.length} on server {BACKEND_URL}</div>
        </div>
    )
}

export default App