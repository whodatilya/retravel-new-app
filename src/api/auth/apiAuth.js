import request from '@/api/config'

export default {
  async register(formData) {
    return request({
      url: '/api/user/',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      method: 'POST',
      data: formData
    }).then(response => response.data)
  },
  async login(formData) {
    return request({
      method: 'POST',
      url: '/login',
      data: formData
    }).then(response => response.data)
  }
}
