import request from '@/store/api/requests'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authnetication', () => {
  const register = async formData => {
    return request({
      url: '/api/user/',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      method: 'POST',
      data: formData
    }).then(response => response.data)
  }

  const login = async formData => {
    const response = await request({
      method: 'POST',
      url: '/login',
      data: formData
    }).then(response => response.data)

    if (response.token) {
      localStorage.setItem('token', response.token)
      localStorage.setItem('roles', response.roles)
    }
  }

  const changeUserData = async (userId, userData) => {
    return await request({
      method: 'POST',
      url: `/api/user/${userId}`,
      headers: {
        'Content-Type': 'application/merge-patch+json'
      },
      data: userData
    }).then(response => response.data)
  }

  // const getUser = async () => {
  //   const response = await request({
  //     method: 'POST',
  //     url: '/login',
  //     data: formData
  //   }).then(response => response.data)
  // }

  const logout = () => {
    localStorage.removeItem('token')
    location.reload()
  }

  return {
    register,
    login,
    logout,
    changeUserData
  }
})
