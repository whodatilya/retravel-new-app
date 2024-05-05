import axios from 'axios'
import { BASE_URL } from './urls.js'

const request = axios.create({
  baseURL: BASE_URL,
  timeout: 2 * 60 * 1000
})
const addAuthTokenHeader = config => {
  const authToken = localStorage.getItem('token')
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`
  }
  return config
}
request.interceptors.request.use(config => {
  return addAuthTokenHeader(config)
})

export default request
