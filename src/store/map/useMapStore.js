import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMapStore = defineStore('map', () => {
  const storeRoutePoints = ref([])

  const setRoutePoints = points => {
    storeRoutePoints.value = points
  }

  const clearPointsStore = () => {
    storeRoutePoints.value = []
  }
  return { storeRoutePoints, setRoutePoints, clearPointsStore }
})
