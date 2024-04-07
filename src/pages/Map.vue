<template>
  <div class="flex flex-col h-[100vh]">
    <header class="map__header">
      <img
        @click="goBack"
        class="icon"
        src="@/assets/images/back_button.svg"
        alt=""
      />
      <img class="icon" src="@/assets/images/logo_unfilled.svg" alt="" />
    </header>
    <main class="map__content map-fix flex-1">
      <YandexMap style="padding: 1rem" :settings="mapSettings" width="100%">
        <YandexMapDefaultFeaturesLayer />
        <YandexMapDefaultSchemeLayer />
        <yandex-map-controls :settings="{ position: 'right' }">
          <yandex-map-zoom-control />
        </yandex-map-controls>
        <YandexMapDefaultMarker
          v-for="marker in markers"
          :key="marker.id"
          :settings="{ coordinates: [49.154205, 55.790713, 0] }"
        />
        <YandexMapListener :settings="{ onClick: onCreatePoint }" />
      </YandexMap>
      <div class="map__search ml-8 p-5 br-20 max-w-[350px]">
        <Search placeholder-value="Поиск по направлениям..." />
      </div>
    </main>
    <NewMarkerModal
      v-if="isModalActive"
      @on-close="toggleModal"
      @on-submit="createMarker"
    />
  </div>
</template>
<script setup>
import {
  YandexMap,
  YandexMapControls,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultMarker,
  YandexMapDefaultSchemeLayer,
  YandexMapListener,
  YandexMapMarker,
  YandexMapControlButton,
  YandexMapZoomControl
} from 'vue-yandex-maps'
import Search from '@/components/Elements/Search.vue'
import { ref } from 'vue'
import store from '@/store'
import router from '@/router'
import NewMarkerModal from '@/components/Modals/NewMarkerModal.vue'

const passedMap = ref([])
const myMap = ref({})
const isModalActive = ref(false)
// const map = shallowRef(null)
// console.log(map.value)

const createMarker = () => {
  //Todo: доделать создание маркеров на основе приходящих с модалки данных
}
const toggleModal = () => {
  isModalActive.value = !isModalActive.value
}
const goBack = () => {
  store.commit('components/selectComponent', 'Main')
  router.go(-1)
}
const onCreatePoint = (_, e) => {
  console.log('before', e?.coordinates)
  // console.log('e', e?.entity?.coordinates)
}

const onLoading = map => {
  console.log('map', map)
  myMap.value = map
  passedMap.value.push('loaded')
  console.log(myMap.value)
}

const mapSettings = {
  location: {
    center: [49.154205, 55.790713],
    zoom: 10,
    zIndex: 1
  }
}
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
