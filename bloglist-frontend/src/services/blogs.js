import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const response = axios.get(baseUrl)
    return response.then(response => response.data)
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.post(baseUrl, newObject, config)
    console.log('created a new blog: ', response)
    return response.data
}

const update = async newObject => {
    try {
        const config = {
            headers: { Authorization: token }
        }
        const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject, config)
        return response
    } catch(exception) {
        console.log('exception in update: ', exception)
    }
}

const createComment = async newObject => {
    try {
        const response = await axios.post(`${baseUrl}/${newObject.id}/comment`, newObject)
        return response
    } catch(exception) {
        console.log('exception in createComment: ', exception)
    }
}

const deleteBlog = async blog => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
    console.log('deleted ', blog.title)
    return response.data
}

const blogService = { getAll, create, setToken, update, deleteBlog, createComment }

export default blogService