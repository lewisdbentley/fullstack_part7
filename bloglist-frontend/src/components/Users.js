import React from 'react'
import User from './User'
import { Table } from 'react-bootstrap'

const Users = ({ users }) => {
    return  (
        <div className='usersComponent'>

            <Table striped>
                <thead>
                    <tr>
                        <th>Users</th>
                        <th>Blogs created</th>
                    </tr>
                </thead>
                {users.map((user) => (
                    <User key={Math.random()} user={user} />
                ))}
            </Table>
        </div>
    )
}

export default Users