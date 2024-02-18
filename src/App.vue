<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import styles from '@/styles/app.sass'
export default {
  name: 'App'
}
</script>
<style scoped lang="sass">
#app
  height: 100vh
  font-family: Lato,sans-serif
  line-height: normal
</style>
