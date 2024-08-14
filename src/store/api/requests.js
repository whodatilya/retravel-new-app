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

request.interceptors.response.use(
  response => {
    if (response.data && response.data.message === 'Expired JWT Token') {
      localStorage.clear()
      location.reload()
    }
    return response
  },
  error => {
    if (error.data && error.data.message === 'Expired JWT Token') {
      localStorage.clear()
      location.reload()
    }
    return error
    // Обработка ошибок, если необходимо
    // return Promise.reject(error)
  }
)

export default request
