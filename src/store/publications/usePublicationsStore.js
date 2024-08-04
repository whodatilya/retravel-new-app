import { defineStore } from 'pinia'
import request from '@/store/api/requests'

export const usePublicationsStore = defineStore('publications', () => {
  const getPublications = async () => {
    const response = await request({
      url: '/api/route/',
      method: 'GET'
    }).catch(error => {
      console.log(error)
    })
    return response.data
  }

  const getPublicationById = async id => {
    const response = await request({
      url: `/api/route/${id}`,
      method: 'GET'
    }).catch(error => {
      console.log(error)
    })
    return response.data
  }

  const createPublication = async formData => {
    const response = await request({
      url: '/api/route/',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      method: 'POST',
      data: formData
    }).catch(error => {
      console.log('Error!!!', error)
    })
    return response.data
  }

  return {
    createPublication,
    getPublications,
    getPublicationById
  }
})
