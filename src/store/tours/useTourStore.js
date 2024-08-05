import { defineStore } from 'pinia'
import request from '@/store/api/requests'

export const useTourStore = defineStore('tours', () => {
  const getTours = async () => {
    const response = await request({
      url: '/api/tour/',
      method: 'GET'
    }).catch(error => {
      console.log(error)
    })
    return response.data
  }

  const getTourById = async id => {
    const response = await request({
      url: `/api/tour/${id}`,
      method: 'GET'
    }).catch(error => {
      console.log(error)
    })
    return response.data
  }

  const createTour = async formData => {
    const response = await request({
      url: '/api/tour/',
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

  const updateTour = async (id, formData) => {
    const response = await request({
      url: `/api/tour/${id}`,
      headers: {
        'Content-Type': 'application/merge-patch+json'
      },
      method: 'PATCH',
      data: formData
    }).catch(error => {
      console.log('Error!!!', error)
    })
    return response.data
  }

  return {
    createTour,
    getTours,
    updateTour,
    getTourById
  }
})
