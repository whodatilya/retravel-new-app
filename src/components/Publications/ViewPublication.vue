<template>
  <div class="flex flex-col flex-1 gap-2.5 w-[60%]">
    <div class="content-wrapper flex flex-col flex-auto gap-6">
      <div class="flex flex-row justify-between">
        <div class="flex flex-row gap-2.5">
          <div class="fs-18 font-semibold">Маршрут:</div>
          <div class="flex flex-row gap-1.5">
            <img
              src="@/assets/images/cardImages/iconStarBig.svg"
              alt="рейтинг"
            />
            <span class="fs-18 font-medium">4.8</span>
          </div>
        </div>
        <div class="fs-18">
          <span class="color-main-gray mr-1.5">Дата</span>
          <span class="font-semibold">24.01.2023</span>
        </div>
      </div>
      <YandexMap
        @click="openMap"
        class="map-fix cursor-pointer"
        height="100%"
        :settings="mapSettings"
        width="100%"
      >
        <yandex-map-default-scheme-layer />
      </YandexMap>
    </div>
    <div class="content-wrapper flex flex-1 flex-col">
      <Carousel :items-to-show="2.5" :wrap-around="true">
        <Slide v-for="slide in 10" :key="slide">
          <div class="carousel__item">{{ slide }}</div>
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script setup>
import { YandexMap, YandexMapDefaultSchemeLayer } from 'vue-yandex-maps'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { useRouter } from 'vue-router'
import 'vue3-carousel/dist/carousel.css'

const router = useRouter()

const mapSettings = {
  location: {
    center: [49.154205, 55.790713],
    zoom: 10,
    zIndex: 1
  }
}
const openMap = () => {
  router.push({ path: 'map' })
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
    background-color: lightgreen
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
</style>
