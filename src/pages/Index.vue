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
import Settings from '@/components/Settings.vue'
import Main from '@/components/Main.vue'
import Favourites from '@/components/Favourites.vue'
import Publications from '@/components/Publications.vue'

export default defineComponent({
  name: 'Index',
  components: {
    Sidebar,
    Settings,
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
      return this.$store.getters['components/getSelectedComponent']
    }
  },
  methods: {
    processComponent(componentName) {
      this.$store.commit('components/selectComponent', componentName)
    }
  },
  watch: {
    getSelectedComponentName(val) {
      if (val === 'Map') {
        this.$router.push('map')
      }
    }
  }
})
</script>
