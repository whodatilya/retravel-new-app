<template>
  <div class="flex flex-col h-[100vh]">
    <header class="user_info__header">
      <img
        @click="goBack"
        class="icon"
        src="@/assets/images/back_button.svg"
        alt=""
      />
      <img class="icon" src="@/assets/images/logo_unfilled.svg" alt="" />
    </header>
    <main
      :class="isMobile ? '!flex-col' : '!flex-row'"
      class="user_info__content flex gap-2.5 flex-1"
    >
      <ViewPublication
        image-path="tourImages"
        is-tour
        v-if="mode === 'view'"
        @submit="onSubmitForm"
        :publication="tour"
      />
      <!--      <CreatePublication-->
      <!--        v-else-if="mode === 'edit'"-->
      <!--        @submit="onSubmitForm"-->
      <!--        @cancel="onCancelForm"-->
      <!--        label-text="Редактировать публикацию"-->
      <!--      />-->
      <TourInfo v-if="mode === 'view'" :tour="tour" />
      <EditPublicationRightBlock v-else-if="mode === 'edit'" />
    </main>
  </div>
</template>

<script setup>
import ViewPublication from '@/components/Publications/ViewPublication.vue'
import router from '@/router'
import { useComponentsStore } from '@/store/components/useComponentsStore'
import { usePublicationsStore } from '@/store/publications/usePublicationsStore'
import { useRoute } from 'vue-router'
import { computed, onMounted, ref, watch } from 'vue'
import CreatePublication from '@/components/Publications/CreatePublication.vue'
import { storeToRefs } from 'pinia'
import EditPublicationRightBlock from '@/components/Publications/RightBlocks/EditPublicationRightBlock.vue'
import { useForm } from 'vee-validate'
import { useMapStore } from '@/store/map/useMapStore'
import TourInfo from '@/components/Tours/RightBlocks/TourInfo.vue'
import { useTourStore } from '@/store/tours/useTourStore'

const { selectComponent } = useComponentsStore()
const { handleSubmit, setValues } = useForm()

const isMobile = computed(() => window.innerWidth < 768)

const { getTourById, updateTour } = useTourStore()

const { clearPointsStore } = useMapStore()

const { storeRoutePoints } = storeToRefs(useMapStore())

const { mode } = storeToRefs(usePublicationsStore())

const route = useRoute()
let tour = ref(null)

const tourId = route.params.id

// const onCancelForm = () => {
//   deletePublication(publicationId)
//   router.go(-1)
// }

onMounted(async () => {
  tour.value = await getTourById(tourId)
})

watch(
  () => mode.value,
  async newMode => {
    if (newMode === 'edit') {
      setValues(await getTourById(tourId))
    }
  }
)

const goBack = () => {
  selectComponent('Main')
  router.go(-1)
}

const onSubmitForm = () => {
  handleSubmit(async values => {
    const preparedValues = {
      name: values.name,
      description: values.description,
      routeImages: values.routeImages[0],
      routeTravelPoints: storeRoutePoints.value
    }
    await updateTour(tourId, preparedValues)
    clearPointsStore()
  })()
}
</script>

<style lang="sass" scoped>
.user_info
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
  &__content
    padding: 1.5rem
    background: #DAE8DA
    position: relative
    display: flex
    flex-direction: column
    @media (max-width: 768px)
      background: transparent
      height: unset
    //justify-content: center
</style>
