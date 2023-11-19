<template>
  <div>
    <Sidebar  @selectedComponent="processComponent"/>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Sidebar from "@/components/Sidebar.vue";
export default defineComponent({
  name: "Index",
  components: {
    Sidebar
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
  }
});
</script>