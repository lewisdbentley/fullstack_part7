import React, {useState, useEffect} from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import loginService from './services/login'
import './index.css'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'


const App = (props) => {
    const [notes, setNotes] = useState(props.notes)
    const [showAll, setShowAll] = useState(false)
    const [message, setMessage] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [messageStyle, setMessageStyle] = useState(true)

    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
            })
    }, [])

    useEffect(() => {
        const loggedUserJson = window.localStorage.getItem('loggedNoteappUser')
        if(loggedUserJson) {
            const user = JSON.parse(loggedUserJson)
            setUser(user)
            noteService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with', username, password)

        try {
            const user = await loginService.login({
                username, password
            })
            window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
            noteService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')

        } catch (exception) {
            setMessage('Incorrect credentials')
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    const toggleImportance = (id) => {
        // define the url of our note
        let url = `http://localhost:3001/notes/${id}`
        // find our note
        let note = notes.find(n => n.id === id)
        // store our note in a variable, and change important
        let changedNote = {...note, important: !note.important}
        // sent this PUT request to the server
        noteService
            .update(changedNote, id)
            .then(returnedNote => {
                console.log(`${changedNote.content} is now ${changedNote.important}`)
                setNotes(notes.map(note => note.id !== id ? note : changedNote))
            })
            .catch((error) => {
                setMessageStyle(false)
                setMessage(
                    `We tried to update ${note.content} but encountered an error`
                )
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
                setNotes(notes.filter(n => n.id !== id))
            })
    }

    // console.log('You just created', notes.slice(-1)[0].content, 'which is', notes.slice(-1)[0].important === true)

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important)

    const addNote = (noteObject) => {
        noteFormRef.current.toggleVisible()
        noteService
            .create(noteObject)
            .then(returnedNote => {
                console.log(`created ${returnedNote.content}`)
                setMessageStyle(true)
                setMessage(`Successfully created ${noteObject.content}`)
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
                setNotes(notes.concat(returnedNote))

            })
    }

    const successMessage = {
        color: 'green',
        fontSize: 16,
        fontStyle: 'italic',
    }

    const errorMessage = {
        color: 'red',
        fontSize: 16,
        fontStyle: 'italic',
    }

    const whichMessage = messageStyle
        ? successMessage
        : errorMessage

    const noteFormRef = React.createRef()

    return (
        <>
            < Notification message={message} style={whichMessage}/>

            < Togglable>
                < LoginForm
                    username={username}
                    password={password}
                    handleSetUsername = {({ target }) => setUsername(target.value)}
                    handleSetPassword = {({ target }) => setPassword(target.value)}
                    submitLogin={handleLogin}
                />
            </Togglable>

            < Togglable buttonLabel='new note' ref={noteFormRef}>
                < NoteForm
                    createNote={addNote}
                />
            </Togglable>

            <h1>Notes</h1>

            <button onClick={() => setShowAll(!showAll)}>
                    show { showAll ? 'important' : 'all'}
            </button>

            <ul>
                {notesToShow.map(note =>
                    < Note key={note.id} note={note} toggleImportance={toggleImportance}/>
                )}
            </ul>
        </>
    )
}

export default App