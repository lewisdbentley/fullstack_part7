import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { addLike, addComment, deleteAction } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'


const BlogDetail = ({ blogs }) => {
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()
    const id = useParams().id
    const blog = blogs.find(blog => blog.id === id)
    if(!blog) {
        return null
    }

    let showIfOwner = { display: 'none' }

    let loggedBlogUser
    if(window.localStorage.loggedBlogUser) {
        loggedBlogUser = JSON.parse(window.localStorage.loggedBlogUser)
    }

    if(blog.user && loggedBlogUser) {
        showIfOwner = blog.user.username === loggedBlogUser.username
            ? { display: '' }
            : { display: 'none' }
    }


    const handleDelete = () => {
        blogService.deleteBlog(blog).then(response =>
            dispatch(deleteAction(blog.id))
        )
        setTimeout(() => {
            dispatch(setNotification(''))
        }, 5000)
        dispatch(setNotification(`deleted ${blog.title}`))
    }

    const submitLike = () => {
        const updatedBlog = {
            title: blog.title,
            url: blog.url,
            likes: blog.likes + 1,
            author: blog.author,
            id: blog.id,
            newIdField: blog.id
        }
        blogService
            .update(updatedBlog).then(likedBlog => {
                console.log('liked ', likedBlog.data.title)
                dispatch(addLike(likedBlog.data))
            })
    }

    const handleCommentForm = (e) => {
        e.preventDefault()
        const commentForBlog = {
            title: blog.title,
            url: blog.url,
            likes: blog.likes,
            author: blog.author,
            id: blog.id,
            comments: blog.comments.concat(comment)
        }
        blogService
            .createComment(commentForBlog).then(commentedBlog => {
                console.log('commented on: ', commentedBlog.data.title)
                dispatch(addComment(commentedBlog.data))
            })
    }
    const comments = Boolean(blog.comments) === true
        ? blog.comments
        : 'no comments'

    return  (
        <div>
            <h2>{blog.title}</h2>

            <div>
                <p>{blog.url}</p>
                <p>{blog.likes} <button onClick={ submitLike }>like</button></p>
                <p>added by {blog.author}</p>
                <div style={showIfOwner}>
                    <button onClick={ handleDelete }>delete</button>
                </div>
            </div>

            <Link to='/blogs'>go back</Link>

            <h3>Comments</h3>

            <ul>
                {comments.map(comment => {
                    return <li key={Math.random()}>{comment}</li>
                })}
            </ul>

            <br/>

            <form onSubmit={handleCommentForm}>
                <input
                    type='text'
                    value={ comment }
                    onChange={( { target } ) => setComment(target.value)}
                />
                <button type='submit'>add comment</button>
            </form>

        </div>
    )
}

export default BlogDetail