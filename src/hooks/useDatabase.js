import { useEffect, useState } from 'react'
import { email, password } from '../config.json'

// const API_URL = 'https://cuhacking.com/api'
// const API_URL = 'https://cuhacking.com/api-dev'
const API_URL = 'http://localhost:3001/api-dev'

export default () => {
  const [token, setToken] = useState('')
  const [database, update] = useState([])

  const fetchData = async () => {
    const response = await fetch(`${API_URL}/users`, {
      method: 'GET',
      headers: {
        'Access-Control-Request-Headers': 'GET',
        Authorization: `Bearer ${token}`
      }
    })
    const body = await response.json()
    console.log('Fetch successful!')
    update(body.data)
  }

  useEffect(() => {
    const authenticate = async () => {
      const response = await fetch(`${API_URL}/users/signin`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Access-Control-Request-Headers': 'POST',
          'Content-Type': 'application/json'
        }
      })

      const body = await response.json()
      setToken(body.token)
    }
    authenticate()
  }, [])

  return [database, fetchData]
}
