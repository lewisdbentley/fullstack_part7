import React from 'react'
import Togglable from './Togglable'
import Blog from './Blog'
import BlogForm from './BlogForm'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { createNew } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Table } from 'react-bootstrap'


const Blogs = ({ blogs }) => {
    const blogFormRef = React.createRef()
    const dispatch = useDispatch()

    const addBlog = async (blogObject) => {
        blogFormRef.current.toggleVisibility()
        try {
            await blogService
                .create(blogObject)
                .then((blog) => dispatch(createNew(blog)))
            setTimeout(() => {
                dispatch(setNotification(''))
            }, 3000)
            dispatch(setNotification('created a new blog'))
        } catch (exception) {
            dispatch(setNotification('something went wrong with posting a blog'))
        }
    }

    return (
        <div>
            <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                <BlogForm createBlog={addBlog} />
            </Togglable>
            <br />

            <h2>Blogs</h2>

            <Table>
                <tbody>
                    {blogs.map((blog) => (
                        <Blog key={blog.id} blog={blog} />
                    ))}
                </tbody>
            </Table>
        </div>


    )
}

export default Blogs