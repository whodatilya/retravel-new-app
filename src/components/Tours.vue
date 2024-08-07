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
        <div>
          <Search />
        </div>
        <div class="flex flex-row gap-4">
          <div
            class="flex flex-grow-0 flex-shrink-0 flex-row gap-2.5 items-center new-button br-8 cursor-pointer"
            @click="createTour"
          >
            <img src="@/assets/images/iconPlus.svg" alt="" />
            <span class="fs-14 font-semibold">Новый тур</span>
          </div>
          <div class="flex flex-row relative">
            <div
              class="filter-button flex flex-row p-1.5 br-8 gap-0.5 items-center"
              @click="toggleDropdown"
            >
              <img src="@/assets/images/iconFilter.svg" alt="" />
              <div class="color-main-gray fs-12">Фильтр</div>
            </div>
            <div v-if="isDropdownVisible" class="dropdown-menu">
              <div @click="sortPublications('rating')">По рейтингу</div>
              <div @click="sortPublications('createdAt', 'DESC')">
                По дате создания (убыв.)
              </div>
              <div @click="sortPublications('createdAt', 'ASC')">
                По дате создания (возр.)
              </div>
            </div>
          </div>
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
    <template v-if="pageNumber > 1">
      <v-pagination
        v-model="page"
        :pages="pageNumber"
        :range-size="1"
        active-color="#DCEDFF"
        @update:modelValue="updateHandler"
        class="pagination-container-fix"
      />
    </template>
  </div>
</template>
<script setup>
import 'vue3-carousel/dist/carousel.css'
import Search from '@/components/Elements/Search.vue'
import FavouriteCard from '@/components/Cards/FavouriteCard.vue'
import { computed, onMounted, ref, watch } from 'vue'
import router from '@/router'
import { useAuthStore } from '@/store/auth/useAuthStore'
import { useTourStore } from '@/store/tours/useTourStore'
import VPagination from '@hennge/vue3-pagination'

const { getRoles } = useAuthStore()

const { getTours } = useTourStore()

const isGuide = computed(() => getRoles().includes('ROLE_GUIDE'))

let page = ref(1)
const itemsPerPage = 8

const paginatedTours = ref(null)

const pageNumber = computed(() => {
  if (paginatedTours?.value <= itemsPerPage) {
    return 1
  }
  return paginatedTours?.value % itemsPerPage === 0
    ? paginatedTours?.value / itemsPerPage
    : paginatedTours?.value / itemsPerPage + 1
})

const isMobile = computed(() => window.innerWidth < 768)

const tours = ref([])

const isDropdownVisible = ref(false)
const sortOrder = ref('rating')

const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value
}

const sortPublications = (order, sortDirection = 'DESC') => {
  sortOrder.value = {
    sortBy: order,
    sortDirection: sortDirection
  }
  isDropdownVisible.value = false
}

watch(
  () => sortOrder.value,
  async newValue => {
    const popularCardsData = await getTours({
      ...newValue,
      itemsPerPage: 8,
      page: page.value
    })
    if (popularCardsData.data) {
      tours.value = popularCardsData.data
    } else {
      tours.value = []
    }
  }
)

const updateHandler = async newPageNumber => {
  const tempData = await getTours({
    itemsPerPage: 8,
    page: newPageNumber
  })
  tours.value = tempData.data
}

onMounted(async () => {
  const paginatedToursData = await getTours()
  if (paginatedToursData.data) {
    paginatedTours.value = paginatedToursData.data.length
  } else {
    paginatedTours.value = 0
  }
  const toursData = await getTours({
    itemsPerPage: 8,
    page: 1
  })
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
.filter-button
  cursor: pointer

.dropdown-menu
  position: absolute
  top: 100%
  right: 0
  background: white
  border: 1px solid #d0d0d0
  border-radius: 8px
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1)
  margin-top: 0.5rem
  width: max-content

  div
    padding: 0.5rem 1rem
    cursor: pointer

    &:hover
      background: #f0f0f0
</style>
