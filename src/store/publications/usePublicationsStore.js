import { defineStore } from 'pinia'
import request from '@/store/api/requests'
import { ref } from 'vue'

export const usePublicationsStore = defineStore('publications', () => {
  let mode = ref('view')

  const changeMode = modeToChange => {
    mode.value = modeToChange
  }

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

  const updatePublication = async (id, formData) => {
    const response = await request({
      url: `/api/route/${id}`,
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

  const deletePublication = async (id, formData) => {
    return await request({
      url: `/api/routes/${id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    }).catch(error => {
      console.log('Error!!!', error)
    })
  }

  return {
    createPublication,
    getPublications,
    getPublicationById,
    changeMode,
    updatePublication,
    deletePublication,
    mode
  }
})
