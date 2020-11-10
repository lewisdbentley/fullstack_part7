import axios from 'axios'
import { useState, useEffect } from 'react'


export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    console.log('inside useResource')

    
    useEffect(() => {
      const getAll = async () => {
        const response = await axios.get(baseUrl)
        setResources(response.data)
      }      
      getAll()
    }, [baseUrl])

    console.log(resources)
  
    const create = async (resource) => {
      const response = await axios.post(baseUrl, resource)
      return response.data
    }
  
    const service = {
      create
    }
  
    return [
      resources, service
    ]
}