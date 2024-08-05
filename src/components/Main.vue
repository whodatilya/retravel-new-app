<template>
  <main class="main__wrapper mt-9 m-10 p-6">
    <div class="flex flex-row justify-between items-center color-main-black">
      <div class="flex flex-col">
        <div class="font-bold fs-28">Добрый день!</div>
        <div class="fs-12 w-[16rem]">
          Добро пожаловать на туристическую платформу Re:Travel!
        </div>
      </div>
      <div>
        <search />
      </div>
    </div>
    <div class="cards my-2.5">
      <place-card v-for="card in placeCards" :key="card.id" :card-data="card" />
    </div>
    <div class="popular br-20 my-2.5">
      <div class="flex flex-row justify-between items-center">
        <div class="fs-18 font-semibold color-main-black">
          Популярные маршруты
        </div>
        <div class="filter-button flex flex-row p-1.5 br-8 gap-0.5">
          <img src="@/assets/images/iconFilter.svg" alt="" />
          <div class="color-main-gray fs-12">Фильтр</div>
        </div>
      </div>
      <div class="color-main-gray fs-12">
        <!--        Сделать pluralize-->
        Найдено {{ popularCards.length }} направлений
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
  <div class="sidebar-content flex flex-col gap-4 ml-2 mt-9 max-w-[20%]">
    <template v-if="currentWindowWidth > 768">
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
    </template>
    <div v-if="favourites.length" class="flex flex-col gap-4">
      <div class="fs-18 color-main-black font-semibold pt-10">
        Избранные локации
      </div>
      <popular-card
        v-for="card in favourites"
        :key="card.id"
        @click="openFavourite(card.id)"
        :card-data="card"
        :is-tiny="true"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

import PlaceCard from '@/components/Cards/PlaceCard.vue'
import PopularCard from '@/components/Cards/PopularCard.vue'
import Search from '@/components/Elements/Search.vue'
import { YandexMap, YandexMapDefaultSchemeLayer } from 'vue-yandex-maps'
import { usePublicationsStore } from '@/store/publications/usePublicationsStore'
import router from '@/router'
import { useFavouriteStore } from '@/store/favourite/useFavouriteStore'

const { getPublications } = usePublicationsStore()

const popularCards = ref([])

const { getFavourites } = useFavouriteStore()

const favourites = ref([])

onMounted(async () => {
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
  if (favouriteData.data) {
    favourites.value = favouriteData.data
  } else {
    favourites.value = []
  }
})
const placeCards = ref([])

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
    background: #DAE8DA
    border-radius: 25px
    border: 1px solid #4E944F80
    //@media (max-width: 768px)
    //  flex-direction: column
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
    width: fill-available
  .text
    position: absolute
    top: 39px
    right: 20px
    display: flex
    flex-direction: column
    gap: 0.25rem
    width: 222px
</style>
