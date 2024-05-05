import { defineStore } from 'pinia'
import request from '@/store/api/requests'

export const usePublicationsStore = defineStore('publications', () => {
  const createPublication = async formData => {
    return request({
      url: '/api/tour/',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      method: 'POST',
      data: formData
    })
      .then(response => {
        console.log('response.data', response.data)
        return response.data
      })
      .catch(error => {
        console.log('Error!!!', error)
      })
  }

  return {
    createPublication
  }
})
