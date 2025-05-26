import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://49.143.34.88:5000',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default apiClient
