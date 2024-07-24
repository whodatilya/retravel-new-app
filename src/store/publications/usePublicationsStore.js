import { defineStore } from 'pinia'
import request from '@/store/api/requests'

export const usePublicationsStore = defineStore('publications', () => {
  const getPublications = async () => {
    const response = await request({
      url: '/api/tour/',
      method: 'GET'
    }).catch(error => {
      console.log(error)
    })
    return response.data
  }

  const getPublicationById = async id => {
    const response = await request({
      url: `/api/tour/${id}`,
      method: 'GET'
    }).catch(error => {
      console.log(error)
    })
    return response.data
  }

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
    createPublication,
    getPublications,
    getPublicationById
  }
})
