import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://clips.ngrok.app',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default apiClient
