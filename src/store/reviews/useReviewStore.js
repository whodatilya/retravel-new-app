import { defineStore } from 'pinia'
import request from '@/store/api/requests'

export const useReviewStore = defineStore('reviews', () => {
  const getReviewsByUserId = async userId => {
    const response = await request({
      url: `/api/review/user/${userId}`,
      method: 'GET'
    }).catch(error => {
      console.log(error)
    })
    return response.data
  }

  const getReviewsByTourId = async tourId => {
    const response = await request({
      url: `/api/review/tour/${tourId}`,
      method: 'GET'
    }).catch(error => {
      console.log(error)
    })
    return response.data
  }

  const createUserReview = async formData => {
    const response = await request({
      url: '/api/review/user',
      headers: {
        'Content-Type': 'application/ld+json'
      },
      method: 'POST',
      data: formData
    }).catch(error => {
      console.log('Error!!!', error)
    })
    return response.data
  }

  const createRouteReview = async formData => {
    const response = await request({
      url: '/api/review/route',
      headers: {
        'Content-Type': 'application/ld+json'
      },
      method: 'POST',
      data: formData
    }).catch(error => {
      console.log('Error!!!', error)
    })
    return response.data
  }

  const createTourReview = async formData => {
    const response = await request({
      url: '/api/review/tour',
      headers: {
        'Content-Type': 'application/ld+json'
      },
      method: 'POST',
      data: formData
    }).catch(error => {
      console.log('Error!!!', error)
    })
    return response.data
  }

  const createTravelPointReview = async formData => {
    const response = await request({
      url: '/api/review/travel-point',
      headers: {
        'Content-Type': 'application/ld+json'
      },
      method: 'POST',
      data: formData
    }).catch(error => {
      console.log('Error!!!', error)
    })
    return response.data
  }

  return {
    getReviewsByUserId,
    getReviewsByTourId,
    createUserReview,
    createRouteReview,
    createTourReview,
    createTravelPointReview
  }
})
