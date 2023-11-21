<template>
  <div class="search_input br-20 fs-12 p-1.5">
    <img :src="iconSearch" alt="Поиск">
    <input class="br-20 pl-2" type="text" :placeholder="placeholderValue">
  </div>
</template>
<script>
import { defineComponent } from "vue";
import iconSearch from '@/assets/images/iconSearch.svg'

export default defineComponent({
  name: "Search",
  data () {
    return {
      iconSearch
    }
  },
  props: {
    placeholderValue: {
      type: String,
      default: 'Поиск...'
    }
  }
});
</script>

<style scoped lang="sass">
.search_input
  display: flex
  background: white
  width: fit-content
  border: 1px solid #D0D0D0
  input
    outline: none
</style>