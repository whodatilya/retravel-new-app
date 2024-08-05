import { defineStore } from 'pinia'
import { ref } from 'vue'
import request from '@/store/api/requests'

export const useFavouriteStore = defineStore('favourites', () => {
  const getFavourites = async () => {
    const response = await request({
      url: '/api/favourite_routes/',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET'
    }).catch(error => {
      console.log('Error!!!', error)
    })
    return response.data
  }

  const addToFavourites = async point => {
    const response = await request({
      url: '/api/favourite_routes/',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      data: point
    }).catch(error => {
      console.log('Error!!!', error)
    })
    return response.data
  }

  const deleteFavourites = async id => {
    return await request({
      url: `/api/favourite_routes/${id}`,
      headers: {
        'Content-Type': 'application/ld+json'
      },
      method: 'DELETE'
    }).catch(error => {
      console.log('Error!!!', error)
    })
  }
  return {
    getFavourites,
    addToFavourites,
    deleteFavourites
  }
})
