import React from 'react'
import { Link, useParams } from 'react-router-dom'


const UserDetail = ({ users }) => {
    const id = useParams().id
    const user = users.find(user => user.id === id)
    if(!user) {
        return null
    }
    return  (
        <div>
            <h2>{user.name}</h2>
            <h3>added blogs</h3>
            <ul>
                {user.blogs.map(blog =>
                    <li key={blog.id}>{blog.title}</li>
                )}
            </ul>
            <p>click here to =&gt; <Link to='/users'>go back</Link></p>
        </div>
    )
}

export default UserDetail