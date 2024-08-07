import { defineStore } from 'pinia'
import { ref } from 'vue'
import request from '@/store/api/requests'

export const useFavouriteStore = defineStore('favourites', () => {
  const queryString = filters => {
    const params = new URLSearchParams()
    for (const key in filters) {
      params.append(key, filters[key])
    }
    return params.toString()
  }

  const getFavourites = async filters => {
    const response = await request({
      url: `/api/favourite_routes?${queryString(filters)}`,
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
      url: '/api/favourite_routes',
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
