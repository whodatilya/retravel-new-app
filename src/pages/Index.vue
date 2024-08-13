<template>
  <div class="flex flex-col h-screen">
    <header
      v-if="currentWindowSize < 768"
      class="header"
      style="z-index: 100000"
    >
      <button class="burger-menu" @click="toggleMenu">
        <span class="burger-menu-line"></span>
        <span class="burger-menu-line"></span>
        <span class="burger-menu-line"></span>
      </button>
      <div>
        <search />
      </div>
    </header>
    <div class="flex flex-grow">
      <Sidebar
        class="sidebar pb-10 pt-16"
        @selectedComponent="processComponent"
        :class="{
          'sidebar-open': isMenuOpen,
          'ml-28': !isMenuOpen,
          'p-4': isMenuOpen
        }"
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
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import Main from '@/components/Main.vue'
import Favourites from '@/components/Favourites.vue'
import Publications from '@/components/Publications.vue'
import Tours from '@/components/Tours.vue'
import { useComponentsStore } from '@/store/components/useComponentsStore'
import Search from '@/components/Elements/Search.vue'

const { getSelectedComponent, selectComponent } = useComponentsStore()

export default defineComponent({
  name: 'Index',
  components: {
    Search,
    Sidebar,
    Favourites,
    Main,
    Publications,
    Tours
  },
  data() {
    return {
      mainSidebarComponentName: 'Main',
      isMenuOpen: false
    }
  },
  computed: {
    getSelectedComponentName() {
      return getSelectedComponent()
    },
    currentWindowSize() {
      return window.innerWidth
    },
    currentUserId() {
      return JSON.parse(localStorage.getItem('userId'))
    }
  },
  methods: {
    processComponent(componentName) {
      selectComponent(componentName)
      if (this.currentWindowSize < 768) {
        this.toggleMenu()
      }
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    }
  },
  mounted() {
    // Тут должен быть запрос пользователя
  },
  watch: {
    getSelectedComponentName(val) {
      if (val === 'Map') {
        this.$router.push({
          name: 'map',
          query: {
            isMap: true
          }
        })
      } else if (val === 'Settings') {
        this.$router.push({
          name: 'user',
          params: {
            id: this.currentUserId
          }
        })
      }
    }
  }
})
</script>

<style scoped lang="sass">
.header
  display: flex
  flex-direction: row
  justify-content: space-between
  padding: 1rem 2rem
  background: linear-gradient(to bottom left, #e3f2e1, #ffffff)

.burger-menu
  display: none
  flex-direction: column
  cursor: pointer
  @media (max-width: 768px)
    display: flex

.burger-menu-line
  width: 25px
  height: 3px
  background-color: #7D7D7D
  margin: 4px 0

.sidebar
  @media (max-width: 768px)
    display: none
    &.sidebar-open
      display: block
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      background-color: #fff
      z-index: 1000
</style>
