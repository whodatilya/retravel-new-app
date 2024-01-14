<template>
  <div class="component-container">
    <div class="flex flex-row gap-2.5 my-10 mx-8 h-full">
      <div class="flex flex-col basis-7/12 gap-2.5 w-[60%]">
        <div class="content-wrapper flex flex-col gap-6">
          <div class="flex flex-row justify-between">
            <div class="flex flex-row gap-2.5">
              <div class="fs-18 font-semibold">Маршрут:</div>
              <div class="flex flex-row gap-1.5">
                <img :src="iconStarBig" alt="рейтинг" />
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
            height="16rem"
            :settings="mapSettings"
            width="100%"
          >
            <yandex-map-default-scheme-layer />
          </YandexMap>
        </div>
        <div class="content-wrapper h-full flex flex-row">
          <Carousel
            style="width: 100%"
            :items-to-show="2.5"
            :wrap-around="true"
          >
            <Slide v-for="slide in 10" :key="slide">
              <div class="carousel__item">{{ slide }}</div>
            </Slide>
            <template #addons>
              <Navigation />
            </template>
          </Carousel>
        </div>
      </div>
      <div class="content-wrapper basis-5/12 flex flex-col">
        <div class="flex flex-row justify-between">
          <div class="flex gap-8 pb-10">
            <img :src="iconUser" alt="" />
            <div class="flex flex-col fs-18 font-medium">
              <span>Имя</span>
              <span>Фамилия</span>
            </div>
          </div>
          <div class="flex flex-row items-center gap-1.5">
            <img :src="iconStarBig" alt="рейтинг" />
            <span class="fs-18 font-medium">4.8</span>
          </div>
        </div>
        <span class="fs-16 font-semibold">Наименование</span>
        <span class="fs-12 font-light color-main-gray pb-5">Локация</span>
        <button class="button__edit fs-14 font-semibold">
          Редактировать публикацию
        </button>
        <div class="flex flex-col description-wrapper mt-4">
          <span class="fs-16 font-semibold">Описание</span>
          <div class="description-container mt-2">
            тест тест тест тест тест тест тест тест тест тест тест тест
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import iconStarBig from '@/assets/images/cardImages/iconStarBig.svg'
import { YandexMap, YandexMapDefaultSchemeLayer } from 'vue-yandex-maps'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import iconUser from '@/assets/images/iconUser.svg'

export default defineComponent({
  name: 'Publications',
  data() {
    return {
      iconUser,
      iconStarBig,
      mapSettings: {
        location: {
          center: [49.154205, 55.790713],
          zoom: 10,
          zIndex: 1
        }
      }
    }
  },
  components: {
    YandexMap,
    YandexMapDefaultSchemeLayer,
    Carousel,
    Slide,
    Navigation
  },
  methods: {
    openMap() {
      this.$router.push({ path: 'map' })
    }
  }
})
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
