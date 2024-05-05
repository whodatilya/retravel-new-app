<template>
  <div class="flex">
    <Sidebar
      class="sidebar pb-10 pt-16 ml-28"
      @selectedComponent="processComponent"
    />
    <component
      :is="
        getSelectedComponentName
          ? getSelectedComponentName
          : mainSidebarComponentName
      "
      class="flex-grow"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import Main from '@/components/Main.vue'
import Favourites from '@/components/Favourites.vue'
import Publications from '@/components/Publications.vue'
import { useComponentsStore } from '@/store/components/useComponentsStore'

const { getSelectedComponent, selectComponent } = useComponentsStore()

export default defineComponent({
  name: 'Index',
  components: {
    Sidebar,
    // Settings,
    Favourites,
    Main,
    Publications
  },
  data() {
    return {
      mainSidebarComponentName: 'Main'
    }
  },
  computed: {
    getSelectedComponentName() {
      return getSelectedComponent()
    }
  },
  methods: {
    processComponent(componentName) {
      selectComponent(componentName)
    }
  },
  mounted() {
    // Тут должен быть запрос пользователя
  },
  watch: {
    getSelectedComponentName(val) {
      if (val === 'Map') {
        this.$router.push({ name: 'map' })
      } else if (val === 'Settings') {
        this.$router.push({
          name: 'user',
          // Временно
          params: {
            id: 1
          }
        })
      }
    }
  }
})
</script>
