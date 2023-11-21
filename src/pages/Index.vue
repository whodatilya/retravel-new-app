<template>
  <div>
    <Sidebar class="pb-10 pt-16 ml-14" @selectedComponent="processComponent"/>
<!--    <component-->
<!--      :is="selectedSidebarComponent"-->
<!--    />-->
<!--    <Main />-->
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Sidebar from "@/components/Sidebar.vue";
// import Main from "@/components/Main.vue";
export default defineComponent({
  name: "Index",
  components: {
    Sidebar,
    // Main
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