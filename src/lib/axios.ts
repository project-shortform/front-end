import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://obear6y9p82u.share.zrok.io',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default apiClient
