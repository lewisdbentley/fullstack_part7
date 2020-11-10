import axios from 'axios'
const baseUrl = '/api/users'


const getAll = () => {
    const response = axios.get(baseUrl)
    return response.then(response => {
        return response.data
    })
}

const usersService = {
    getAll
}

export default usersService