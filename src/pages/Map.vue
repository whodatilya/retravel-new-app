<template>
  <div class="flex flex-col h-[100vh]">
    <header class="map__header">
      <img @click="goBack" class="icon" :src="backButton" alt="" />
      <img class="icon" :src="logoUnfilled" alt="" />
    </header>
    <main class="map__content map-fix flex-1">
      <YandexMap style="padding: 1rem" :settings="mapSettings" width="100%">
        <yandex-map-default-scheme-layer />
      </YandexMap>
      <div class="map__search ml-8 p-5 br-20 max-w-[350px]">
        <Search placeholder-value="Поиск по направлениям..." />
      </div>
    </main>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import backButton from '@/assets/images/back_button.svg'
import logoUnfilled from '@/assets/images/logo_unfilled.svg'
import iconSearch from '@/assets/images/iconSearch.svg'
import { YandexMap, YandexMapDefaultSchemeLayer } from 'vue-yandex-maps'
import Search from '@/components/Elements/Search.vue'

export default defineComponent({
  name: 'Map',
  components: {
    Search,
    YandexMap,
    YandexMapDefaultSchemeLayer
  },
  data() {
    return {
      backButton,
      logoUnfilled,
      iconSearch,
      mapSettings: {
        location: {
          center: [49.154205, 55.790713],
          zoom: 10,
          zIndex: 1
        }
      }
    }
  },
  methods: {
    goBack() {
      this.$store.commit('components/selectComponent', 'Main')
      this.$router.go(-1)
    }
  }
})
</script>

<style scoped lang="sass">
.map
  &__header
    display: flex
    flex-direction: row
    width: 100%
    z-index: 999
    background: white
    padding: 0.75rem
    justify-content: space-between
    .icon
      &:hover
        cursor: pointer
  &__content
    background: #DAE8DA
    position: relative
    display: flex
    flex-direction: column
    justify-content: center
  &__search
    display: flex
    flex-direction: column
    background: white
    position: absolute
    border: 1px solid #D0D0D0
    height: 90%
</style>
