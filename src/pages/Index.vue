<template>
  <div class="flex">
    <Sidebar class="pb-10 pt-16 ml-28" @selectedComponent="processComponent"/>
    <component
      :is="selectedSidebarComponent"
      class="flex-grow"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Sidebar from "@/components/Sidebar.vue";
import Settings from "@/components/Settings.vue";
import Main from "@/components/Main.vue";
import Favourites from "@/components/Favourites.vue";
export default defineComponent({
  name: "Index",
  components: {
    Sidebar,
    Settings,
    Favourites,
    Main
  },
  data () {
    return {
      selectedSidebarComponent: 'Main'
    }
  },
  methods: {
    processComponent (componentName) {
      this.selectedSidebarComponent = componentName
    }
  },
  watch: {
    selectedSidebarComponent (val) {
      if (val === 'Map') {
        this.$router.push('map')
      }
    }
  }
});
</script>