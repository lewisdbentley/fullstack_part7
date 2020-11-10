import axios from 'axios'
const baseUrl = '/api/notes'


let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    const nonExisting = {
        id: 1000,
        content: "This note doesn't exist",
        date: '2019-05-30T17:30:31.098Z',
        important: true
    }
    return request.then(response => response.data.concat(nonExisting))
}

const create =  async newObject => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = (newObject, id) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, create, update, setToken }
