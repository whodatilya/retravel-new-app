<template>
  <div class="component-container">
    <div class="flex flex-row justify-between px-12 pt-6 items-center">
      <Search placeholder-value="Поиск туров..." />
      <div
        v-if="isGuide"
        class="flex flex-row gap-2.5 items-center new-button br-8 cursor-pointer"
        @click="createPublication"
      >
        <img src="@/assets/images/iconPlus.svg" alt="" />
        <span class="fs-14 font-semibold">Создать новый тур</span>
      </div>
    </div>
    <div class="main-container mt-3 mb-7 mx-7 br-20 p-6">
      <favourite-card
        image-path="tourImages"
        v-for="tour in tours"
        @click="openTour(tour.id)"
        :favourite-data="tour"
        :key="tour.id"
      />
    </div>
  </div>
</template>
<script setup>
import 'vue3-carousel/dist/carousel.css'
import Search from '@/components/Elements/Search.vue'
import FavouriteCard from '@/components/Cards/FavouriteCard.vue'
import { computed, onMounted, reactive, ref } from 'vue'
import caves from '@/assets/images/cardImages/favourites/caves.jpg'
import sochi from '@/assets/images/cardImages/favourites/sochi.jpg'
import geyser from '@/assets/images/cardImages/favourites/geyser.jpg'
import router from '@/router'
import { useAuthStore } from '@/store/auth/useAuthStore'
import { useTourStore } from '@/store/tours/useTourStore'

const { getRoles } = useAuthStore()

const { getTours } = useTourStore()

const isGuide = computed(() => getRoles().includes('ROLE_GUIDE'))

const tours = ref([])

onMounted(async () => {
  const toursData = await getTours()
  if (toursData.data) {
    tours.value = toursData.data
  } else {
    tours.value = []
  }
})

const createPublication = () => {
  router.push({
    name: 'createTourGuide'
  })
}

const openTour = id => {
  console.log(id)
  router.push({
    name: 'tour',
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
