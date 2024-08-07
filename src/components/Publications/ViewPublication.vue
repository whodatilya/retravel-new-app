<template>
  <div :class="{ 'w-[60%]': !isMobile }" class="flex flex-col flex-1 gap-2.5">
    <div class="content-wrapper flex flex-col flex-auto gap-6 max-h-[50%]">
      <div class="flex flex-row justify-between">
        <div class="flex flex-row gap-2.5">
          <div class="fs-18 font-semibold">Маршрут:</div>
          <div v-if="publication?.avgRating" class="flex flex-row gap-1.5">
            <img
              src="@/assets/images/cardImages/iconStarBig.svg"
              alt="рейтинг"
            />
            <span class="fs-18 font-medium">{{ publication.avgRating }}</span>
          </div>
        </div>
        <div class="flex flex-row fs-18">
          <div>
            <span class="color-main-gray mr-1.5">Дата</span>
            <span class="font-semibold">{{
              publication?.createdAt ?? publication?.date
            }}</span>
          </div>
          <div v-if="!isTour" @click="addRouteToFavourites">
            <img
              :class="isInFavourites ? 'favourite_active' : ''"
              class="favourite"
              src="@/assets/images/iconPin.svg"
              alt="Избранное"
            />
          </div>
        </div>
      </div>
      <template v-if="publication?.travelPoints">
        <YandexMap
          @click="openMap"
          class="map-fix cursor-pointer"
          height="-webkit-fill-available"
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
              {{ marker.name }}
            </div>
          </YandexMapMarker>
        </YandexMap>
      </template>
    </div>
    <div class="content-wrapper flex flex-1 flex-col">
      <Carousel
        :items-to-show="publication?.[imagePath]?.length > 2 ? 2.5 : 1"
        :wrap-around="true"
      >
        <Slide v-for="slide in publication?.[imagePath]" :key="slide">
          <div class="carousel__item" @click="openModal(slide)">
            <img :src="slide" alt="" />
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

const { addToFavourites } = useFavouriteStore()

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
  if (!favourites.includes(props.publication.id)) {
    favourites.push(props.publication.id)
    localStorage.setItem('favourites', JSON.stringify(favourites))
  }
}

const isInFavourites = computed(() => {
  let favourites = JSON.parse(localStorage.getItem('favourites')) || []
  return favourites.includes(props?.publication?.id)
})

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
    width: 100%
    max-height: 299px
    background-color: transparent
    color: white
    font-size: 20px
    border-radius: 8px
    display: flex
    justify-content: center
    align-items: center
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
  background: red
  display: flex
  max-width: 500px
  align-items: center
  justify-content: center
  border-radius: 10px
  cursor: pointer
  color: #fff
  padding: 8px 12px
  white-space: nowrap
</style>
