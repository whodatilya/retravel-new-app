<template>
  <div class="component-container">
    <template v-if="isMobile">
      <div class="flex flex-row items-center justify-between">
        <div class="p-6 fs-16 font-semibold">Публикации</div>
        <div
          style="border-radius: 50%; width: 45px; height: 45px"
          class="flex new-button mr-6 cursor-pointer"
          @click="createPublication"
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
          @click="createPublication"
        >
          <img src="@/assets/images/iconPlus.svg" alt="" />
          <span class="fs-14 font-semibold">Новая публикация</span>
        </div>
      </div>
    </template>
    <div
      :class="{ 'p-6': !isMobile }"
      class="main-container mt-3 mb-7 mx-7 br-20"
    >
      <favourite-card
        v-for="publication in publications"
        @click="openPublication(publication.id)"
        :favourite-data="publication"
        :key="publication.id"
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
import { computed, onMounted, ref } from 'vue'
import router from '@/router'
import { usePublicationsStore } from '@/store/publications/usePublicationsStore'
import VPagination from '@hennge/vue3-pagination'

const { getPublications } = usePublicationsStore()

let page = ref(1)
const itemsPerPage = 8

const updateHandler = async newPageNumber => {
  const tempData = await getPublications({
    itemsPerPage: 8,
    page: newPageNumber
  })
  publications.value = tempData.data
}

const publications = ref([])
const paginatedPublications = ref(null)

const pageNumber = computed(() => {
  if (paginatedPublications?.value <= itemsPerPage) {
    return 1
  }
  return paginatedPublications?.value % itemsPerPage === 0
    ? paginatedPublications?.value / itemsPerPage
    : paginatedPublications?.value / itemsPerPage + 1
})

const isMobile = computed(() => window.innerWidth < 768)

onMounted(async () => {
  const paginatedPublicationsData = await getPublications()
  if (paginatedPublicationsData.data) {
    paginatedPublications.value = paginatedPublicationsData.data.length
  } else {
    paginatedPublications.value = 0
  }

  const publicationsData = await getPublications({
    itemsPerPage: 8,
    page: 1
  })
  if (publicationsData.data) {
    publications.value = publicationsData.data
  } else {
    publications.value = []
  }
})

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
