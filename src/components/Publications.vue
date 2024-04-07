<template>
  <div class="component-container">
    <Search class="mt-6 ml-12" placeholder-value="Поиск публикаций..." />
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
</style>
