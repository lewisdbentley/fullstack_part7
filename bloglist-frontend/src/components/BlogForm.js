import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'


const BlogForm = ({ createBlog }) => {
    const [ title, setTitle ] = useState('')
    const [ author, setAuthor ] = useState('')
    const [ url, setUrl ] = useState('')

    const postBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url,
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>Create new blog</h2>
            <Form onSubmit={ postBlog } className="blogForm">
                <Form.Group>
                    <Form.Label>title</Form.Label>
                    <Form.Control
                        id="title"
                        type="text"
                        name="title"
                        value= { title }
                        onChange={( { target } ) => setTitle(target.value)}
                    />
                    <Form.Label>author</Form.Label>
                    <Form.Control
                        id="author"
                        type="text"
                        name="author"
                        value= { author }
                        onChange={( { target } ) => setAuthor(target.value)}
                    />
                    <Form.Label>url</Form.Label>
                    <Form.Control
                        id="url"
                        type="text"
                        name="url"
                        value= { url }
                        onChange={( { target } ) => setUrl(target.value)}
                    />
                    <Button variant='primary' type="submit">create</Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default BlogForm