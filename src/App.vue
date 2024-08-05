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
  @media (max-width: 768px)
    background: linear-gradient(to bottom, #dbf1d9, #ffffff)
</style>
