<template>
  <div class="component-container">
    <div v-if="isMobile" class="p-6 fs-16 font-semibold">Избранное</div>
    <Search
      v-if="!isMobile"
      class="mt-6 ml-12 w-fit"
      placeholder-value="Поиск"
    />
    <div
      :class="{ 'p-6': !isMobile }"
      class="main-container mt-3 mb-7 mx-7 br-20"
    >
      <favourite-card
        v-for="favourite in favourites"
        @click="openFavourite(favourite.id)"
        :favourite-data="favourite"
        :key="favourite.id"
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
<script lang="js" setup>
import { computed, onMounted, ref } from 'vue'
import Search from '@/components/Elements/Search.vue'
import FavouriteCard from '@/components/Cards/FavouriteCard.vue'
import router from '@/router'
import { useFavouriteStore } from '@/store/favourite/useFavouriteStore'
import VPagination from '@hennge/vue3-pagination'

const { getFavourites } = useFavouriteStore()

const favourites = ref([])
const paginatedFavourites= ref(null)

const pageNumber = computed(() => {
  if (paginatedFavourites?.value <= itemsPerPage) {
    return 1
  }
  return paginatedFavourites?.value % itemsPerPage === 0
    ? paginatedFavourites?.value / itemsPerPage
    : paginatedFavourites?.value / itemsPerPage + 1
})

let page = ref(1)
const itemsPerPage = 8

const updateHandler = async newPageNumber => {
  const tempData = await getFavourites({
    itemsPerPage: 8,
    page: newPageNumber
  })
  favourites.value = tempData.data
}

const isMobile = computed(() => window.innerWidth < 768)

onMounted(async () => {
  const paginatedToursData = await getFavourites()
  if (paginatedToursData.data) {
    paginatedFavourites.value = paginatedToursData.data.length
  } else {
    paginatedFavourites.value = 0
  }
  const favouritesData = await getFavourites({
    itemsPerPage: 8,
    page: 1
  })
  if (favouritesData) {
    favourites.value = favouritesData
  } else {
    favourites.value = []
  }
})



const openFavourite = id => {
  router.push({
    name: 'favourite',
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
</style>
