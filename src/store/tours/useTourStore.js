import { defineStore } from 'pinia'
import request from '@/store/api/requests'

export const useTourStore = defineStore('tours', () => {
  const queryString = filters => {
    const params = new URLSearchParams()
    for (const key in filters) {
      params.append(key, filters[key])
    }
    return params.toString()
  }

  const getTours = async filters => {
    const response = await request({
      url: `/api/tour?${queryString(filters)}`,
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

  const addTourParticipant = async formData => {
    const response = await request({
      url: '/api/tour-participants/',
      headers: {
        'Content-Type': 'application/merge-patch+json'
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

  const deleteTourParticipant = async formData => {
    return await request({
      url: '/api/tour-participants/delete',
      headers: {
        'Content-Type': 'application/ld+json'
      },
      method: 'DELETE',
      data: formData
    }).catch(error => {
      console.log('Error!!!', error)
    })
  }

  return {
    createTour,
    getTours,
    addTourParticipant,
    updateTour,
    getTourById,
    deleteTourParticipant
  }
})
