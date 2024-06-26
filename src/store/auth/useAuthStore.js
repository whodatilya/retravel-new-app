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
    }).catch(error => alert('Error!' + error))

    if (response.token) {
      localStorage.setItem('token', response.token)
      localStorage.setItem('roles', response.roles)
      localStorage.setItem('userId', response.id)
    }

    return response.data
  }

  const changeUserData = async (userId, userData) => {
    const response = await request({
      method: 'PATCH',
      url: `/api/user/${userId}`,
      headers: {
        'Content-Type': 'application/merge-patch+json'
      },
      data: userData
    }).catch(error => alert('Error!' + error))
    return response.data
  }

  const getUser = async userId => {
    const response = await request({
      method: 'GET',
      url: `/api/user/${userId}`
    })
    return response.data
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('roles')
    localStorage.removeItem('userId')
    location.reload()
  }

  const getRoles = () => {
    return localStorage.getItem('roles')
  }

  return {
    register,
    login,
    logout,
    changeUserData,
    getRoles,
    getUser
  }
})
