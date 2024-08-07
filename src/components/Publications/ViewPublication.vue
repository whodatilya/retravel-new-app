<template>
  <div :class="{ 'w-[60%]': !isMobile }" class="flex flex-col flex-1 gap-2.5">
    <div class="content-wrapper flex flex-col flex-auto gap-6 max-h-[50%]">
      <div class="flex flex-row justify-between">
        <div class="flex flex-row gap-2.5">
          <div class="fs-18 font-medium">Маршрут:</div>
          <div v-if="publication?.avgRating" class="flex flex-row gap-1.5">
            <img
              src="@/assets/images/cardImages/iconStarBig.svg"
              alt="рейтинг"
            />
            <span class="fs-18 font-medium">{{ publication.avgRating }}</span>
          </div>
        </div>
        <div class="flex flex-row fs-18">
          <div v-if="isTour">
            <span class="color-main-gray mr-1.5">Дата</span>
            <span class="font-semibold">{{
              publication?.createdAt ?? publication?.date
            }}</span>
          </div>
          <div v-if="!isTour" @click="addRouteToFavourites">
            <template v-if="isInFavourites">
              <svg
                width="17"
                height="25"
                viewBox="0 0 17 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.7918 4.71081V23.5626L9.03658 19.269C8.70923 19.061 8.29109 19.061 7.96375 19.269L1.2085 23.5626L1.2085 4.71081C1.2085 2.56936 2.84079 0.833374 4.85433 0.833374L12.146 0.833374C14.1595 0.833374 15.7918 2.56936 15.7918 4.71081Z"
                  fill="#4E944F"
                  stroke="#4E944F"
                  stroke-linecap="round"
                />
              </svg>
            </template>
            <template v-else>
              <svg
                width="17"
                height="25"
                viewBox="0 0 17 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.7918 4.71081V23.5626L9.03658 19.269C8.70923 19.061 8.29109 19.061 7.96375 19.269L1.2085 23.5626L1.2085 4.71081C1.2085 2.56936 2.84079 0.833374 4.85433 0.833374L12.146 0.833374C14.1595 0.833374 15.7918 2.56936 15.7918 4.71081Z"
                  fill="none"
                  stroke="#4E944F"
                  stroke-linecap="round"
                />
              </svg>
            </template>
          </div>
        </div>
      </div>
      <template v-if="publication?.travelPoints">
        <YandexMap
          @click="openMap"
          class="map-fix cursor-pointer"
          :height="isMobile ? '355px' : '-webkit-fill-available'"
          :settings="mapSettings"
          width="100%"
        >
          <YandexMapDefaultFeaturesLayer />
          <yandex-map-default-scheme-layer />
          <YandexMapMarker
            v-for="marker in publication?.travelPoints"
            :key="marker.id"
            :settings="{
              coordinates: [marker.longitude, marker.latitude, 0]
            }"
          >
            <div class="marker">
              <div class="flex flex-row items-center gap-1">
                <img src="@/assets/images/iconMapPin.svg" alt="" />
                <div>{{ marker.name }}</div>
              </div>
            </div>
          </YandexMapMarker>
        </YandexMap>
      </template>
    </div>
    <div class="content-wrapper flex flex-1 flex-col">
      <Carousel :items-to-show="1.5" :wrap-around="true">
        <Slide v-for="slide in publication?.[imagePath]" :key="slide">
          <div class="carousel__item" @click="openModal(slide)">
            <img :src="slide" alt="" class="carousel__image" />
          </div>
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>
    <ImageModal
      :show="isModalOpen"
      :imageSrc="selectedImage"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import {
  YandexMap,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultSchemeLayer,
  YandexMapMarker
} from 'vue-yandex-maps'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { useRouter } from 'vue-router'
import 'vue3-carousel/dist/carousel.css'
import ImageModal from '@/components/Modals/ImageModal.vue'
import { useFavouriteStore } from '@/store/favourite/useFavouriteStore'

const router = useRouter()

const isPinActive = ref(false)

const { addToFavourites } = useFavouriteStore()
// eslint-disable-next-line no-undef
const props = defineProps({
  publication: {
    type: Object,
    default: () => {}
  },
  isTour: {
    type: Boolean,
    default: false
  },
  imagePath: {
    type: String,
    default: 'routeImages'
  }
})

const isMobile = computed(() => window.innerWidth < 768)

const openMap = () => {
  const preparedData = props.publication.travelPoints.map(travelPoint => {
    return {
      id: travelPoint.id,
      number: travelPoint.number
    }
  })
  router.push({
    name: 'view-route',
    query: {
      outerRouteIds: JSON.stringify(preparedData)
    }
  })
}

const addRouteToFavourites = async () => {
  await addToFavourites({ routeId: props.publication.id })
  let favourites = JSON.parse(localStorage.getItem('favourites')) || []
  if (!favourites.includes(props?.publication?.id)) {
    favourites.push(props.publication.id)
    localStorage.setItem('favourites', JSON.stringify(favourites))
  }
}

const isInFavourites = computed(() => {
  let favourites = JSON.parse(localStorage.getItem('favourites')) || []
  return favourites.includes(props?.publication?.id)
})

const coordinatesCenter = computed(() => {
  const travelPoints = props.publication?.travelPoints
  if (!travelPoints || travelPoints.length === 0) {
    return [0, 0] // Возвращаем [0, 0] если нет точек
  }

  const totalLatitude = travelPoints.reduce(
    (sum, point) => sum + point.latitude,
    0
  )
  const totalLongitude = travelPoints.reduce(
    (sum, point) => sum + point.longitude,
    0
  )

  const averageLatitude = totalLatitude / travelPoints.length
  const averageLongitude = totalLongitude / travelPoints.length

  return [averageLatitude, averageLongitude]
})

const mapSettings = computed(() => ({
  location: {
    center: [49.154205, 55.790713],
    zoom: 10,
    zIndex: 1
  }
}))

const isModalOpen = ref(false)
const selectedImage = ref('')

const openModal = imageSrc => {
  selectedImage.value = imageSrc
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}
</script>

<style scoped lang="sass">
.content-wrapper
  border-radius: 20px
  background: white
  padding: 1.5rem
  .carousel__item
    min-height: 200px
    width: 80%
    max-height: 299px
    background-color: transparent
    color: white
    border-radius: 8px
    font-size: 20px
    border-radius: 8px
    display: flex
    justify-content: center
    align-items: center
  .carousel__image
    max-width: 300px
    max-height: 300px
    border-radius: 8px
    width: auto
    height: auto
  .carousel__slide
    padding: 4px
  .button__edit
    color: white
    background: #4E944F
    border-radius: 8px
    padding: 0.5rem 0
  .description
    &-container
      padding: 0.75rem
      height: 100%
      border-radius: 8px
      border: 1px solid rgba(208, 208, 208, 0.50)
      background: rgba(250, 250, 250, 0.70)
    &-wrapper
      flex: 1 0 auto
.favourite
  &:hover
    cursor: pointer
  &_active
    filter: brightness(2) invert(1)
    &:hover
      cursor: pointer
.marker
  background: white
  display: flex
  max-width: 500px
  align-items: center
  font-size: 14px
  font-weight: 300
  justify-content: center
  border: 1px solid #D0D0D0
  border-radius: 0 10px 10px 10px
  cursor: pointer
  color: black
  width: max-content
  padding: 5px 7px
  white-space: nowrap
</style>
