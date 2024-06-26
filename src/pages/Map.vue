<template>
  <div class="flex flex-col h-[100vh]">
    <header class="map__header">
      <img
        v-if="!create"
        @click="goBack"
        class="icon"
        src="@/assets/images/back_button.svg"
        alt=""
      />
      <div
        v-if="create"
        class="cancel-button br-8 cursor-pointer"
        @click="backToForm"
      >
        <div class="fs-18 font-medium">Завершить</div>
      </div>
      <div
        v-if="create && mode === 'read'"
        class="new-button br-8 cursor-pointer"
        @click="createNewPointMode"
      >
        <div class="fs-18 font-medium">Добавить новую точку</div>
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
        <YandexMapMarker
          v-for="(marker, index) in routePoints"
          :key="marker.id"
          :settings="{
            coordinates: [marker.latitude, marker.longitude, 0],
            onClick: () => (openMarker = index),
            zIndex: openMarker === index ? 1 : 0
          }"
        >
          <div class="marker">
            Точка: {{ index + 1 }}
            <div
              v-if="openMarker === index"
              class="popup"
              @click.stop="openMarker = null"
            >
              <span class="fs-14 font-semibold"
                >Наименование:
                <span class="font-normal">{{ marker.name }}</span>
              </span>
              <span class="fs-14 font-semibold"
                >Описание:
                <span class="font-normal">{{ marker.description }}</span></span
              >
              <span class="fs-14 font-semibold">Изображение:</span>
              <img :src="marker.travelPointImages" alt="" />
              <button class="button__delete" @click="deleteMarker(index)">
                Удалить
              </button>
            </div>
          </div>
        </YandexMapMarker>
        <YandexMapListener
          :settings="{ onClick: mode === 'create' ? onCreatePoint : {} }"
        />
      </YandexMap>
      <div class="map__search ml-8 p-5 br-20 max-w-[350px]">
        <Search placeholder-value="Поиск по направлениям..." />
      </div>
    </main>
    <NewMarkerModal
      v-if="isModalActive"
      @on-close="backToMap"
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
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import router from '@/router'
import NewMarkerModal from '@/components/Modals/NewMarkerModal.vue'
import { useForm } from 'vee-validate'
import { useComponentsStore } from '@/store/components/useComponentsStore'

const { selectComponent } = useComponentsStore()

const isModalActive = ref(false)
const routePoints = ref([])
const mode = ref('read')

// eslint-disable-next-line no-undef
defineProps({
  create: {
    type: Boolean,
    default: false
  }
})

const { handleSubmit } = useForm()

const openMarker = ref(null)

const createMarker = values => {
  routePoints.value[routePoints.value.length - 1] = {
    ...routePoints.value[routePoints.value.length - 1],
    name: values?.name,
    description: values?.description,
    travelPointImages: values?.travelPointImages
      ? URL.createObjectURL(values?.travelPointImages)
      : null
  }
  toggleModal()
  mode.value = 'read'
  //Todo: доделать создание маркеров на основе приходящих с модалки данных
}

const toggleModal = () => {
  isModalActive.value = !isModalActive.value
}

const createNewPointMode = () => {
  mode.value = 'create'
}

const backToMap = () => {
  routePoints.value.pop()
  toggleModal()
}

const goBack = () => {
  selectComponent('Main')
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

onBeforeUnmount(() => {
  routePoints.value.forEach(item => {
    if (typeof item.travelPointImages === 'string') {
      URL.revokeObjectURL(item.travelPointImages)
    }
  })
})

const deleteMarker = index => {
  routePoints.value.splice(index, 1)
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
.cancel-button
  background: #FF7272
  color: white
  padding: 8px 12px
  &:hover
    background: #c75858

.new-button
  background: #4E944F
  padding: 8px 12px
  color: white
  &:hover
    background: rgba(78, 148, 79, 0.85)

.marker-popup
  background: #fff
  border-radius: 10px
  padding: 10px
  color: black
  cursor: pointer
  font-size: 14px
  white-space: nowrap

.marker
  background: red
  display: flex
  align-items: center
  justify-content: center
  border-radius: 10px
  cursor: pointer
  color: #fff
  padding: 8px 12px
  white-space: nowrap

.popup
  position: absolute
  bottom: calc(100% + 10px)
  display: flex
  flex-direction: column
  gap: 0.4rem
  max-width: 350px
  width: 300px
  background: #fff
  border-radius: 10px
  padding: 10px
  color: black
.button
  &__delete
    border-radius: 10px
    padding: 10px 18px
    background: #FF7272
    color: white
</style>
