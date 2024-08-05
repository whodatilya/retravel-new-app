<template>
  <div class="component-container">
    <template v-if="isMobile">
      <div class="flex flex-row items-center justify-between">
        <div class="p-6 fs-16 font-semibold">Туры</div>
        <div
          style="border-radius: 50%; width: 45px; height: 45px"
          class="flex new-button mr-6 cursor-pointer"
          @click="createTour"
        >
          <img src="@/assets/images/iconPlus.svg" alt="" />
        </div>
      </div>
    </template>
    <template v-else>
      <div class="flex flex-row justify-between px-12 pt-6 items-center">
        <Search />
        <div
          class="flex flex-grow-0 flex-shrink-0 flex-row gap-2.5 items-center new-button br-8 cursor-pointer"
          @click="createTour"
        >
          <img src="@/assets/images/iconPlus.svg" alt="" />
          <span class="fs-14 font-semibold">Новый тур</span>
        </div>
      </div>
    </template>
    <div
      :class="{ 'p-6': !isMobile }"
      class="main-container mt-3 mb-7 mx-7 br-20"
    >
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

const isMobile = computed(() => window.innerWidth < 768)

const tours = ref([])

onMounted(async () => {
  const toursData = await getTours()
  if (toursData.data) {
    tours.value = toursData.data
  } else {
    tours.value = []
  }
})

const createTour = () => {
  router.push({
    name: 'createTourGuide'
  })
}

const openTour = id => {
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
  @media (max-width: 768px)
    grid-template-columns: repeat(1, 1fr)
    grid-template-rows: repeat(1, 1fr)
    box-shadow: none
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
