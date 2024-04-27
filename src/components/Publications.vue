<template>
  <div class="component-container">
    <div class="flex flex-row justify-between px-12 pt-6 items-center">
      <Search placeholder-value="Поиск публикаций..." />
      <div
        class="flex flex-row gap-2.5 items-center new-button br-8 cursor-pointer"
        @click="createPublication"
      >
        <img src="@/assets/images/iconPlus.svg" alt="" />
        <span class="fs-14 font-semibold">Новая публикация</span>
      </div>
    </div>
    <div class="main-container mt-3 mb-7 mx-7 br-20 p-6">
      <favourite-card
        v-for="publication in publications"
        @click="openPublication(publication.id)"
        :favourite-data="publication"
        :key="publication.id"
      />
    </div>
  </div>
</template>
<script setup>
import 'vue3-carousel/dist/carousel.css'
import Search from '@/components/Elements/Search.vue'
import FavouriteCard from '@/components/Cards/FavouriteCard.vue'
import { reactive } from 'vue'
import caves from '@/assets/images/cardImages/favourites/caves.jpg'
import sochi from '@/assets/images/cardImages/favourites/sochi.jpg'
import geyser from '@/assets/images/cardImages/favourites/geyser.jpg'
import router from '@/router'
const publications = reactive([
  {
    id: 0,
    icon: caves,
    title: 'Наименование1',
    location: 'Локация1'
  },
  {
    id: 1,
    icon: sochi,
    title: 'Наименование2',
    location: 'Локация2'
  },
  {
    id: 2,
    icon: geyser,
    title: 'Наименование3',
    location: 'Локация3'
  },
  {
    id: 3,
    icon: sochi,
    title: 'Наименование4',
    location: 'Локация4'
  },
  {
    id: 4,
    icon: sochi,
    title: 'Наименование4',
    location: 'Локация4'
  }
])

const createPublication = () => {
  router.push({
    name: 'createPublication'
  })
}

const openPublication = id => {
  router.push({
    name: 'publication',
    params: {
      id: id
    }
  })
}
</script>
<style scoped lang="sass">
.main-container
  display: grid
  grid-template-columns: repeat(4, 1fr)
  grid-template-rows: repeat(2, 1fr)
  height: 100%
  grid-gap: 1rem
  background: white
  box-shadow: 0 20px 50px 0 rgba(0, 0, 0, 0.05)
.content-wrapper
  border-radius: 20px
  background: white
  padding: 1.5rem
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
.new-button
  background: #4E944F
  padding: 11px 12px
  span
    color: white
  &:hover
    background: rgba(78, 148, 79, 0.85)
</style>
