import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useComponentsStore = defineStore('components', () => {
  const selectedComponent = ref('')

  const selectComponent = component => {
    selectedComponent.value = component
  }

  const getSelectedComponent = () => {
    return selectedComponent.value
  }

  return {
    selectComponent,
    getSelectedComponent
  }
})
