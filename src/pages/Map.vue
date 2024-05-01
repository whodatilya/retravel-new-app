<template>
  <div class="flex flex-col h-[100vh]">
    <header class="map__header">
      <img
        @click="goBack"
        class="icon"
        src="@/assets/images/back_button.svg"
        alt=""
      />
      <div
        v-if="create"
        class="new-button br-8 cursor-pointer"
        @click="backToForm"
      >
        <div class="fs-18 font-medium">Завершить прокладывание маршрута</div>
      </div>
      <img class="icon" src="@/assets/images/logo_unfilled.svg" alt="" />
    </header>
    <main v-if="userPosition.length" class="map__content map-fix flex-1">
      <YandexMap style="padding: 1rem" :settings="mapSettings" width="100%">
        <YandexMapDefaultFeaturesLayer />
        <YandexMapDefaultSchemeLayer />
        <yandex-map-controls :settings="{ position: 'right' }">
          <yandex-map-zoom-control />
        </yandex-map-controls>
        <YandexMapDefaultMarker
          v-for="marker in routePoints"
          :key="marker.id"
          :settings="{ coordinates: [marker.latitude, marker.longitude, 0] }"
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
import { onMounted, ref } from 'vue'
import store from '@/store'
import router from '@/router'
import NewMarkerModal from '@/components/Modals/NewMarkerModal.vue'
import { useForm } from 'vee-validate'

const isModalActive = ref(false)
const routePoints = ref([])
// eslint-disable-next-line no-undef
defineProps({
  create: {
    type: Boolean,
    default: false
  }
})

const { handleSubmit } = useForm()

const createMarker = values => {
  console.log('values', values)

  routePoints.value[routePoints.value.length - 1] = {
    ...routePoints.value[routePoints.value.length - 1],
    name: values?.name,
    description: values?.description,
    travelPointsImages: values?.travelPointImages
  }
  console.log('routePoints', routePoints.value)
  toggleModal()
  //Todo: доделать создание маркеров на основе приходящих с модалки данных
}

const toggleModal = () => {
  isModalActive.value = !isModalActive.value
}

const goBack = () => {
  store.commit('components/selectComponent', 'Main')
  router.go(-1)
}

const backToForm = () => {
  router.go(-1)
}

const onCreatePoint = (_, e) => {
  routePoints.value.push({
    latitude: e?.coordinates?.[0],
    longitude: e?.coordinates?.[1]
  })
  toggleModal()
}

const userPosition = ref([])

onMounted(() => {
  navigator.geolocation.getCurrentPosition(
    pos => {
      userPosition.value = [pos.coords.latitude, pos.coords.longitude]
      console.log(userPosition.value)
    },
    err => console.error(`Ошибка(${err.code}): ${err.message}`),
    { maximumAge: 60000, timeout: 3000, enableHighAccuracy: true } // Для точности необходимо быстроту!
  )
})

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
.new-button
  background: #4E944F
  padding: 8px 12px
  color: white
  &:hover
    background: rgba(78, 148, 79, 0.85)
</style>
