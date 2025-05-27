import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://hzit42bv0qlx.share.zrok.io',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default apiClient
