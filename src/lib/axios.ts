import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://clips.0-ui.com',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default apiClient
