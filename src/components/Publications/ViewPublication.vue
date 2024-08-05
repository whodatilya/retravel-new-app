<template>
  <div class="flex flex-col flex-1 gap-2.5 w-[60%]">
    <div class="content-wrapper flex flex-col flex-auto gap-6 max-h-[450px]">
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
              class="favourite"
              src="@/assets/images/iconPin.svg"
              alt="Избранное"
            />
          </div>
        </div>
      </div>
      <YandexMap
        @click="openMap"
        class="map-fix cursor-pointer"
        height="-webkit-fill-available"
        :settings="mapSettings"
        width="100%"
      >
        <yandex-map-default-scheme-layer />
      </YandexMap>
    </div>
    <div class="content-wrapper flex flex-1 flex-col">
      <Carousel
        :items-to-show="publication?.[imagePath]?.length > 2 ? 2.5 : 1"
        :wrap-around="true"
      >
        <Slide v-for="slide in publication?.[imagePath]" :key="slide">
          <div class="carousel__item" @click="openModal(slide)">
            <img :src="slide" alt="" width="35%" />
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
import { ref } from 'vue'
import { YandexMap, YandexMapDefaultSchemeLayer } from 'vue-yandex-maps'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { useRouter } from 'vue-router'
import 'vue3-carousel/dist/carousel.css'
import ImageModal from '@/components/Modals/ImageModal.vue'
import { useFavouriteStore } from '@/store/favourite/useFavouriteStore'

const router = useRouter()

const { addToFavourites } = useFavouriteStore()

const mapSettings = {
  location: {
    center: [49.154205, 55.790713],
    zoom: 10,
    zIndex: 1
  }
}

const openMap = () => {
  router.push({ name: 'map' })
}

const addRouteToFavourites = async () => {
  await addToFavourites({ routeId: props.publication.id })
}

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
    max-height: 100%
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
</style>
