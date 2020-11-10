import React from 'react'
import reactDOM from 'react-dom'
import App from './App'
import './index.css'


const hello = name => {
    console.log(`hello, ${name}`)
}

reactDOM.render(<App />, document.getElementById('root'))