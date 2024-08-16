<template>
  <div class="flex flex-col h-[100vh]">
    <header class="map__header">
      <img
        v-if="!create"
        @click="goBack"
        class="icon"
        src="@/assets/images/back_button.svg"
        alt=""
      />
      <div
        v-if="create"
        :class="isMobile ? 'fs-13' : 'fs-18'"
        class="cancel-button br-8 font-medium cursor-pointer"
        @click="backToForm"
      >
        Завершить
      </div>
      <div
        v-if="mode === 'read' && !routeUsedIds.length"
        :class="isMobile ? 'fs-13' : 'fs-18'"
        class="new-button br-8 cursor-pointer font-medium add-button"
        @click="createNewPointMode"
      >
        Добавить
      </div>
      <img
        @click="goMain"
        class="icon logo_item"
        src="@/assets/images/logo_unfilled.svg"
        alt=""
      />
    </header>
    <main class="map__content map-fix flex-1">
      <YandexMap
        style="padding: 1rem; height: calc(100vh - 45px)"
        :settings="mapSettings"
        width="100%"
      >
        <YandexMapDefaultFeaturesLayer />
        <YandexMapDefaultSchemeLayer />
        <yandex-map-controls :settings="{ position: 'right' }">
          <yandex-map-zoom-control />
        </yandex-map-controls>
        <YandexMapMarker
          v-for="(marker, index) in sortedRoutePoints"
          :key="marker.id"
          :settings="{
            coordinates: [marker.longitude, marker.latitude, 0],
            onClick: () => (openMarker = index),
            zIndex: openMarker === index ? 1 : 0
          }"
        >
          <div class="marker" :class="{ marker_used: isUsed(marker.id) }">
            <div class="flex flex-row items-center gap-1">
              <img src="@/assets/images/iconMapPin.svg" alt="" />
              <div class="123">{{ marker.name }}</div>
            </div>
            <div
              v-if="openMarker === index"
              class="popup"
              @click.stop="openMarker = null"
            >
              <div class="relative">
                <div class="flex relative flex-row justify-between">
                  <div class="flex flex-row gap-2 items-center">
                    <span class="fs-14 font-semibold text-wrap">{{
                      marker.name
                    }}</span>
                    <img
                      src="@/assets/images/cardImages/iconStarBig.svg"
                      alt="рейтинг"
                      @mouseover="isPopupVisible = true"
                    />
                    <div
                      class="popup-rating"
                      :class="{ visible: isPopupVisible }"
                    >
                      <Rating
                        :model-value="rating"
                        @update:model-value="
                          handleUpdateRating($event, marker.id)
                        "
                        :stars="5"
                      />
                    </div>
                  </div>
                  <img
                    v-if="isCurrentUserPoint(marker?.user)"
                    class="cursor-pointer"
                    src="@/assets/images/iconTrash.svg"
                    alt=""
                    @click="deleteMarker(marker.id, index)"
                  />
                </div>
                <div class="description-wrapper mt-2">
                  <div
                    class=""
                    :class="[
                      'fs-14 description-content',
                      { expanded: marker.expanded }
                    ]"
                  >
                    {{ marker.description }}
                  </div>
                  <button
                    v-if="!marker.expanded"
                    class="button__more"
                    @click.stop="toggleDescription(marker)"
                  >
                    далее...
                  </button>
                </div>
                <div>
                  <img
                    class="br-8 mt-3 relative"
                    :src="marker.travelPointImagesFront"
                    alt=""
                  />
                  <button
                    v-if="!isMap && !routeUsedIds.length"
                    class="button__add absolute"
                    style="bottom: 10px; left: 50%; transform: translateX(-50%)"
                    @click="addPointToRoute(marker.id)"
                  >
                    Использовать
                  </button>
                </div>
              </div>
            </div>
          </div>
        </YandexMapMarker>
        <YandexMapListener
          :settings="{ onClick: mode === 'create' ? onCreatePoint : () => {} }"
        />
        <yandex-map-feature
          v-if="route"
          :settings="{
            ...route,
            style: lineStyle
          }"
        />
      </YandexMap>
      <div
        v-if="!isMobile && !routeUsedIds.length"
        class="map__search ml-8 p-5 br-20 max-w-[350px]"
      >
        <search placeholder-value="Поиск по направлениям..." />
      </div>
    </main>
    <NewMarkerModal
      v-if="isModalActive"
      @on-close="backToMap"
      @on-submit="createMarker"
    />
  </div>
</template>

<script setup>
import {
  getLocationFromBounds,
  VueYandexMaps,
  YandexMap,
  YandexMapControls,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultSchemeLayer,
  YandexMapFeature,
  YandexMapListener,
  YandexMapMarker,
  YandexMapZoomControl
} from 'vue-yandex-maps'
import search from '@/components/Elements/Search.vue'
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  watch
} from 'vue'
import router from '@/router'
import NewMarkerModal from '@/components/Modals/NewMarkerModal.vue'
import { useComponentsStore } from '@/store/components/useComponentsStore'
import Rating from 'primevue/rating'
import { useMapStore } from '@/store/map/useMapStore'
import { useRoute } from 'vue-router'
import { useReviewStore } from '@/store/reviews/useReviewStore'

const isMobile = computed(() => window.innerWidth < 768)

const { selectComponent } = useComponentsStore()
const {
  setRoutePoints,
  getTravelPoints,
  createTravelPoint,
  getTravelPointById,
  deleteTravelPoint
} = useMapStore()

const lineStyle = {
  fillRule: 'nonzero',
  fill: '#333',
  fillOpacity: 0.9,
  stroke: [
    {
      width: 6,
      color: '#007afce6'
    },
    {
      width: 10,
      color: '#fff'
    }
  ]
}

const map = shallowRef(null)

const route = ref(null)

const rating = ref(0)

const isModalActive = ref(false)
const isPopupVisible = ref(false)

const routePoints = ref([])
const usedRoutePoints = ref([])
let countUsedRoutePoints = ref(0)
const mode = ref('read')

const { createTravelPointReview } = useReviewStore()

const handleUpdateRating = async (newRating, markerId) => {
  rating.value = newRating
  await createTravelPointReview({
    text: '1',
    rating: newRating,
    pointId: markerId
  })
  isPopupVisible.value = false
}

// eslint-disable-next-line no-undef
const props = defineProps({
  isMap: {
    type: Boolean,
    default: false
  },
  isTour: {
    type: Boolean,
    default: false
  },
  create: {
    type: Boolean,
    default: false
  },
  outerRouteIds: {
    type: String,
    default: ''
  }
})

let routeUsedIds = []
const routeUseRoute = useRoute()
if (routeUseRoute.query.outerRouteIds) {
  routeUsedIds = JSON.parse(routeUseRoute.query.outerRouteIds)
}

const openMarker = ref(null)

const createMarker = async values => {
  routePoints.value[routePoints.value.length - 1] = {
    ...routePoints.value[routePoints.value.length - 1],
    name: values?.name,
    description: values?.description,
    travelPointImagesFront: values?.travelPointImages
      ? URL.createObjectURL(values?.travelPointImages)
      : null,
    travelPointImages: values?.travelPointImages ?? null
  }
  toggleModal()
  mode.value = 'read'
  const formData = new FormData()
  formData.append('name', values?.name)
  formData.append('description', values?.description)
  formData.append('travelPointImages[]', values?.travelPointImages ?? null)
  formData.append(
    'latitude',
    routePoints.value[routePoints.value.length - 1].latitude
  )
  formData.append(
    'longitude',
    routePoints.value[routePoints.value.length - 1].longitude
  )
  await createTravelPoint(formData)
  const response = await getTravelPoints()
  if (routeUsedIds.length) {
    const responseRoute = await Promise.all(
      routeUsedIds.map(async route => {
        return await getTravelPointById(route.id)
      })
    )
    if (responseRoute.length) {
      routePoints.value = responseRoute.map((point, index) =>
        formatResponsePoints(point, routeUsedIds[index].number)
      )
    }
  } else {
    routePoints.value = response.data.map((point, index) =>
      formatResponsePoints(point, index + 1)
    )
  }
}

const isUsed = markerId => {
  return usedRoutePoints.value.some(item => item.travel_point_id === markerId)
}

async function fetchRoute(points) {
  // Request a route from the Router API with the specified parameters.
  // eslint-disable-next-line no-undef
  const routes = await ymaps3.route({
    points: points.map(point => [point.longitude, point.latitude]), // Array of points LngLat[]
    type: 'walking', // Type of the route
    bounds: true // Flag indicating whether to include route boundaries in the response
  })

  // Check if a route was found
  if (!routes[0]) return

  // Convert the received route to a RouteFeature object.
  const firstRoute = routes[0].toRoute()

  // Check if a route has coordinates
  if (firstRoute.geometry.coordinates.length === 0) return

  return firstRoute
}

const routeHandler = async newRoute => {
  // If the route is not found, then we alert a message and clear the route line
  if (!newRoute) {
    alert('Route not found')
    route.value = null
    return
  }

  route.value = newRoute
  if (newRoute.properties.bounds) {
    const newLocation = await getLocationFromBounds({
      bounds: newRoute.properties.bounds,
      map: map.value
    })

    // Чтобы маршрут всегда помещался на экран
    location.value = {
      center: newLocation.center,
      zoom: Math.floor(newLocation.zoom) - 1,
      duration: 300
    }
  }
}

const addPointToRoute = id => {
  usedRoutePoints.value.push({
    travel_point_id: id,
    number: countUsedRoutePoints.value
  })
  countUsedRoutePoints.value++
}

watch(
  VueYandexMaps.loadStatus,
  async status => {
    if (status !== 'loaded') return
  },
  {
    immediate: true
  }
)

watch(
  () => routePoints.value,
  async newValue => {
    if (newValue.length && !props.isMap && !props.isTour && !props.create) {
      const fetchedRoute = await fetchRoute(routePoints.value)
      await routeHandler(fetchedRoute)
    }
  },
  {
    immediate: true
  }
)

const toggleModal = () => {
  isModalActive.value = !isModalActive.value
}

const createNewPointMode = () => {
  mode.value = 'create'
}

const backToMap = () => {
  routePoints.value.pop()
  toggleModal()
}

const goBack = () => {
  selectComponent('Main')
  router.go(-1)
}

const goMain = () => {
  selectComponent('Main')
  router.push({ name: 'index' })
}

const backToForm = () => {
  setRoutePoints(usedRoutePoints.value)
  countUsedRoutePoints.value = 0
  router.go(-1)
}

const onCreatePoint = (_, e) => {
  routePoints.value.push({
    latitude: e?.coordinates?.[1],
    longitude: e?.coordinates?.[0]
  })
  toggleModal()
}

const userPosition = ref([])

const userId = localStorage.getItem('userId')

const isCurrentUserPoint = user => {
  return +userId === user.id
}

onMounted(async () => {
  navigator.geolocation.getCurrentPosition(
    pos => {
      userPosition.value = [pos.coords.latitude, pos.coords.longitude]
    },
    err => console.error(`Ошибка(${err.code}): ${err.message}`),
    { maximumAge: 60000, timeout: 3000, enableHighAccuracy: true } // Для точности необходимо быстроту!
  )

  const response = await getTravelPoints()
  if (routeUsedIds.length) {
    const responseRoute = await Promise.all(
      routeUsedIds.map(async route => {
        return await getTravelPointById(route.id)
      })
    )
    if (responseRoute.length) {
      routePoints.value = responseRoute.map((point, index) =>
        formatResponsePoints(point, routeUsedIds[index].number)
      )
    }
  } else {
    routePoints.value = response.data.map((point, index) =>
      formatResponsePoints(point, index + 1)
    )
  }
})

const formatResponsePoints = (point, number) => {
  return {
    id: point.id,
    latitude: parseFloat(point.latitude),
    longitude: parseFloat(point.longitude),
    name: point.name,
    description: point.description,
    travelPointImagesFront:
      point.travelPointImages && point.travelPointImages[0]
        ? point.travelPointImages[0]
        : null,
    travelPointImages: point.travelPointImages,
    expanded: false, // Добавляем флаг для расширения описания
    user: point.user,
    number: number // Добавляем порядковый номер
  }
}

const userCoordinates = computed(() =>
  JSON.parse(localStorage.getItem('userPosition'))
)

const sortedRoutePoints = computed(() => {
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  return routePoints.value.sort((a, b) => a.number - b.number)
})

const mapSettings = {
  location: {
    center: userCoordinates.value
      ? [userCoordinates.value[1], userCoordinates.value[0]]
      : [49.154205, 55.790713],
    zoom: 10,
    zIndex: 1
  }
}

onBeforeUnmount(() => {
  routePoints.value.forEach(item => {
    if (typeof item.travelPointImages === 'string') {
      URL.revokeObjectURL(item.travelPointImages)
    }
  })
})

const deleteMarker = async (id, index) => {
  await deleteTravelPoint(id)
  routePoints.value.splice(index, 1)
}

const toggleDescription = marker => {
  marker.expanded = !marker.expanded
}
</script>

<style scoped lang="sass">
.map
  &__header
    display: flex
    flex-direction: row
    width: 100%
    z-index: 999
    background: white
    padding: 0.75rem
    justify-content: space-between
    .icon
      &:hover
        cursor: pointer
  &__search
    display: flex
    flex-direction: column
    background: white
    position: absolute
    border: 1px solid #D0D0D0
    height: 90%

  &__content
    background: #DAE8DA
    position: relative
    display: flex
    flex-direction: column
    justify-content: center

.logo_item
  @media (max-width: 768px)
    width: 100px

.cancel-button
  background: #FF7272
  color: white
  padding: 8px 12px
  &:hover
    background: #c75858

.new-button
  background: #4E944F
  padding: 8px 12px
  display: flex
  flex-direction: row
  align-items: center
  justify-content: center
  color: white
  &:hover
    background: rgba(78, 148, 79, 0.85)
  @media (max-width: 768px)
    width: 120px
    height: 40px

.add-button
  position: absolute
  top: 6rem
  right: 3rem
  z-index: 1000

.marker-popup
  background: #fff
  border-radius: 10px
  padding: 10px
  color: black
  cursor: pointer
  font-size: 14px
  white-space: nowrap

.marker
  background: white
  display: flex
  max-width: 500px
  align-items: center
  font-size: 14px
  justify-content: center
  font-weight: 300
  border: 1px solid #D0D0D0
  border-radius: 0 10px 10px 10px
  cursor: pointer
  color: black
  width: max-content
  padding: 5px 7px
  white-space: nowrap
  &_used
    background: lightgreen

.popup
  position: absolute
  border: 1px solid #b5b5b5
  bottom: calc(100% + 10px)
  display: flex
  flex-direction: column
  gap: 0.4rem
  max-width: 350px
  width: 300px
  background: #fff
  border-radius: 10px
  padding: 10px
  color: black

.description-wrapper
  position: relative
  max-height: fit-content
  overflow: hidden

.description-content
  display: -webkit-box
  -webkit-box-orient: vertical
  -webkit-line-clamp: 2
  overflow: hidden
  text-overflow: ellipsis
  &.expanded
    white-space: break-spaces
    -webkit-line-clamp: unset
    max-height: unset
    overflow: visible

.button__more
  background: none
  border: none
  color: #888888
  cursor: pointer

.button
  &__delete
    border-radius: 10px
    padding: 10px 18px
    background: #FF7272
    color: white
  &__add
    border-radius: 10px
    padding: 10px 18px
    background: #4E944F
    color: white
.popup-rating
  position: absolute
  background-color: white
  top: -40px
  border-radius: 10px
  left: 24px
  border: 1px solid #ccc
  padding: 10px
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1)
  z-index: 1000
  display: none


.popup-rating.visible
  display: block
</style>
