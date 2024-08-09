<template>
  <main class="main__wrapper">
    <div
      v-if="currentWindowWidth > 768"
      class="flex flex-row justify-between items-center pb-1 color-main-black"
    >
      <div class="flex flex-col gap-2">
        <div class="font-bold fs-28">Добрый день!</div>
        <div class="fs-14 w-[16rem]">
          Добро пожаловать на туристическую платформу Re:Travel!
        </div>
      </div>
      <div class="w-1/2 flex">
        <search class="w-full mb-[30px]" />
      </div>
    </div>
    <div class="cards my-2.5">
      <place-card v-for="card in placeCards" :key="card.id" :card-data="card" />
    </div>
    <div class="popular br-20 my-2.5">
      <div class="flex flex-row justify-between items-center pb-2 relative">
        <div class="fs-18 font-semibold color-main-black">
          Популярные маршруты
        </div>
        <div
          class="filter-button flex flex-row p-1.5 br-8 gap-0.5"
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
      <div class="flex flex-row justify-center">
        <hr class="pb-1 w-full" />
      </div>
      <popular-card
        v-for="card in popularCards"
        :key="card.id"
        @click="openCard(card.id)"
        :card-data="card"
      />
    </div>
    <div class="footer-banner color-semi-white my-2.5">
      <img src="@/assets/images/iconBanner.svg" alt="" />
      <div class="text text-end">
        <div class="fs-16 font-semibold">Присоединяйтесь к лучшим турам!</div>
        <div class="fs-12 font-normal">
          Найдите наилучший маршрут для уникального путешествия
        </div>
      </div>
    </div>
  </main>
  <div
    v-if="currentWindowWidth > 768"
    class="sidebar-content flex flex-col gap-4 ml-2 mt-9 max-w-[20%]"
  >
    <div class="fs-18 font-semibold color-main-black">
      Карта достопримечательностей
    </div>
    <YandexMap
      @click="openMap"
      class="map-fix map-outline cursor-pointer"
      height="17rem"
      :settings="mapSettings"
      width="100%"
    >
      <yandex-map-default-scheme-layer />
    </YandexMap>
    <div v-if="favourites.length" class="flex flex-col gap-4">
      <div class="fs-18 color-main-black font-semibold pt-10">
        Избранные локации
      </div>
      <popular-card
        v-for="card in favourites"
        :key="card.id"
        @click="openFavourite(card.id)"
        :card-data="card"
        is-tiny
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'

import PlaceCard from '@/components/Cards/PlaceCard.vue'
import PopularCard from '@/components/Cards/PopularCard.vue'
import Search from '@/components/Elements/Search.vue'
import { YandexMap, YandexMapDefaultSchemeLayer } from 'vue-yandex-maps'
import { usePublicationsStore } from '@/store/publications/usePublicationsStore'
import router from '@/router'
import { useFavouriteStore } from '@/store/favourite/useFavouriteStore'
import { useMapStore } from '@/store/map/useMapStore'

const { getPublications } = usePublicationsStore()

const popularCards = ref([])

const { getFavourites } = useFavouriteStore()

const placeCards = ref([])

const { getTravelPoints } = useMapStore()

const favourites = ref([])

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
    const popularCardsData = await getPublications({
      ...newValue,
      itemsPerPage: 4
    })
    if (popularCardsData.data) {
      popularCards.value = popularCardsData.data
    } else {
      popularCards.value = []
    }
  }
)

onMounted(async () => {
  navigator.geolocation.getCurrentPosition(
    pos => {
      localStorage.setItem(
        'userPosition',
        JSON.stringify([pos.coords.latitude, pos.coords.longitude])
      )
    },
    err => console.error(`Ошибка(${err.code}): ${err.message}`),
    { maximumAge: 60000, timeout: 3000, enableHighAccuracy: true } // Для точности необходимо быстроту!
  )

  const placeCardsData = await getTravelPoints({
    itemsPerPage: 3
  })

  if (placeCardsData.data) {
    placeCards.value = placeCardsData.data.slice(
      0,
      currentWindowWidth.value > 768 ? 3 : 2
    )
  } else {
    placeCards.value = []
  }
  const popularData = await getPublications({
    itemsPerPage: 4,
    sort: 'avgRating'
  })
  if (popularData.data) {
    popularCards.value = popularData.data
  } else {
    popularCards.value = []
  }

  const favouriteData = await getFavourites({
    itemsPerPage: 3,
    sort: 'avgRating'
  })
  if (favouriteData) {
    favourites.value = favouriteData
  } else {
    favourites.value = []
  }
})

const mapSettings = {
  location: {
    center: [49.154205, 55.790713],
    zoom: 10,
    zIndex: 1
  }
}

const openCard = id => {
  router.push({
    name: 'publication',
    params: {
      id: id
    }
  })
}

const openFavourite = id => {
  router.push({
    name: 'favourite',
    params: {
      id: id
    }
  })
}

const openMap = () => {
  router.push({ path: 'map' })
}

const currentWindowWidth = computed(() => window.innerWidth)
</script>

<style scoped lang="sass">
.main
  &__wrapper
    display: flex
    flex-direction: column
    flex-basis: 45%
    margin-top: 2.25rem
    margin: 2.5rem
    padding: 1.5rem
    background: #DAE8DA
    border-radius: 25px
    border: 1px solid #4E944F80
    @media (max-width: 768px)
      background: transparent
      border-radius: unset
      flex-basis: unset
      border: none
      margin: 0.5rem
.cards
  display: grid
  grid-template-columns: repeat(3, 1fr)
  grid-gap: 1.5rem
  @media (max-width: 768px)
    grid-template-columns: repeat(2, 1fr)
.popular
  display: flex
  flex-direction: column
  background: white
  padding: 1.5rem
.footer-banner
  position: relative
  width: 100%
  img
    width: 100%
    height: auto
  .text
    position: absolute
    top: 50%
    right: 20px
    transform: translateY(-50%)
    display: flex
    flex-direction: column
    gap: 0.25rem
    width: 222px
    text-align: right

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
