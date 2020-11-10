import React from 'react'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
    return (
        <tbody>
            <tr>
                <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
                <td>{user.blogs.length}</td>
            </tr>
        </tbody>
    )
}


export default User