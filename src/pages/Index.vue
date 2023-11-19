<template>
  <div>
    <Sidebar />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Sidebar from "@/components/Sidebar.vue";
export default defineComponent({
  name: "Index",
  components: {
    Sidebar
  }
});
</script>