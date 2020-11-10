import React, { useState, useEffect } from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import Users from './components/Users'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import loginService from './services/login'
import usersService from './services/users'
import blogService from './services/blogs'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setUser } from './reducers/userReducer'
import { setNotification } from './reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import UserDetail from './components/UserDetail'
import BlogDetail from './components/BlogDetail'
import { Navbar, Nav } from 'react-bootstrap'


const App = () => {
    // const [blogs, setBlogs] = useState([])
    // const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // const [message, dispatch(setNotification] = useState('')

    const dispatch = useDispatch()

    const blogs = useSelector((state) => state.blogs)
    const user = useSelector((state) => state.user)
    const users = useSelector((state) => state.users)

    useEffect(() => {
        blogService.getAll().then((blogs) => dispatch(initializeBlogs(blogs)))
    }, [dispatch])

    useEffect(() => {
        usersService.getAll().then((users) => dispatch(initializeUsers(users)))
    }, [dispatch])

    const blogsSortedByLikes = blogs.sort((a, b) => b.likes - a.likes)

    useEffect(() => {
        const loggedBlogUser = window.localStorage.getItem('loggedBlogUser')
        if (loggedBlogUser) {
            const user = JSON.parse(loggedBlogUser)
            dispatch(setUser(user))
            blogService.setToken(user.token)
        }
    }, [dispatch])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const response = await loginService.login({
                username,
                password,
            })
            blogService.setToken(response.token)
            window.localStorage.setItem('loggedBlogUser', JSON.stringify(response))
            dispatch(setUser(response))
            setUsername('')
            setPassword('')
            // const setTimeoutforNotifcation() => {
            setTimeout(() => {
                dispatch(setNotification(''))
            }, 5000)
            dispatch(setNotification(`logged in as ${response.username}`))
        } catch (exception) {
            dispatch(setNotification('invalid user credentials'))
        }
    }

    const handleLogout = () => {
        window.localStorage.clear()
        dispatch(setUser(null))
        setTimeout(() => {
            dispatch(setNotification(''))
        }, 5000)
        dispatch(setNotification('logged out'))
    }

    const padding = {
        padding: '10px'
    }

    return (
        <div className='container'>
            <Navbar collapseOnSelect expand="lg" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#" as="span">
                            <Link style={padding} to="/">home</Link>
                        </Nav.Link>
                        <Nav.Link href="#" as="span">
                            <Link style={padding} to="/users">users</Link>
                        </Nav.Link>
                        <Nav.Link href="#" as="span">
                            <Link style={padding} to="/blogs">blogs</Link>
                        </Nav.Link>
                        <Nav.Link href="#" as="span">
                        </Nav.Link>
                        {user !== null ? (
                            <div>
                                {user.username} logged in <br />
                                <Nav.Link href="#" as="span">
                                    <button onClick={handleLogout}>logout</button>
                                </Nav.Link>
                            </div>
                        ) : (
                            null
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            {user === null ? (
                <Togglable buttonLabel="login">
                    <LoginForm
                        username={username}
                        password={password}
                        handleUsernameChange={({ target }) => setUsername(target.value)}
                        handlePasswordChange={({ target }) => setPassword(target.value)}
                        handleSubmit={handleLogin}
                    />
                </Togglable>
            ) : (
                null
            )}

            <Notification />

            <Switch>
                <Route path="/users/:id">
                    <UserDetail users={users} />
                </Route>
                <Route path="/blogs/:id">
                    <BlogDetail blogs={blogs} />
                </Route>
                <Route path="/users">
                    <Users users={users}/>
                </Route>
                <Route path="/blogs">
                    <Blogs blogs={blogsSortedByLikes}/>
                </Route>
            </Switch>
        </div>
    )
}

export default App
