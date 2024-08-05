import { defineStore } from 'pinia'
import { ref } from 'vue'
import request from '@/store/api/requests'

export const useMapStore = defineStore('map', () => {
  const storeRoutePoints = ref([])

  const setRoutePoints = points => {
    storeRoutePoints.value = points
  }

  const getTravelPoints = async () => {
    const response = await request({
      url: '/api/travel-point/',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET'
    }).catch(error => {
      console.log('Error!!!', error)
    })
    return response.data
  }

  const createTravelPoint = async point => {
    const response = await request({
      url: '/api/travel-point/',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      method: 'POST',
      data: point
    }).catch(error => {
      console.log('Error!!!', error)
    })
    return response.data
  }

  const deleteTravelPoint = async id => {
    return await request({
      url: `/api/travel-point/${id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    }).catch(error => {
      console.log('Error!!!', error)
    })
  }

  const clearPointsStore = () => {
    storeRoutePoints.value = []
  }
  return {
    storeRoutePoints,
    setRoutePoints,
    clearPointsStore,
    getTravelPoints,
    createTravelPoint,
    deleteTravelPoint
  }
})