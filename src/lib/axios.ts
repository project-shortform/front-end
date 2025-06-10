import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://nbn63w8bdp74.share.zrok.io',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default apiClient
