<template>
  <div class="flex flex-col h-[100vh]">
    <header class="publication__header">
      <img
        @click="goBack"
        class="icon"
        src="@/assets/images/back_button.svg"
        alt=""
      />
      <img class="icon" src="@/assets/images/logo_unfilled.svg" alt="" />
    </header>
    <main class="publication__content flex !flex-row gap-2.5 flex-1">
      <CreatePublicationGuide @submit="onSubmitForm" />
      <EditPublicationRightBlock />
    </main>
  </div>
</template>

<script setup>
import router from '@/router'
import EditPublicationRightBlock from '@/components/Publications/RightBlocks/EditPublicationRightBlock.vue'
import CreatePublicationGuide from '@/components/Publications/CreatePublicationGuide.vue'
import { useForm } from 'vee-validate'
import { useComponentsStore } from '@/store/components/useComponentsStore'
import { useTourStore } from '@/store/tours/useTourStore'
import { useMapStore } from '@/store/map/useMapStore'
import { storeToRefs } from 'pinia'

const { selectComponent } = useComponentsStore()

const { clearPointsStore } = useMapStore()

const { storeRoutePoints } = storeToRefs(useMapStore())

const { createTour } = useTourStore()

const goBack = () => {
  selectComponent('Main')
  router.go(-1)
}

const { handleSubmit } = useForm()

const onSubmitForm = () => {
  handleSubmit(async values => {
    const preparedValues = {
      name: values.name,
      description: values.description,
      participantsCount: values.participantsCount,
      date: values.date,
      schedule: values.schedule,
      price: values.price,
      tourImages: values.tourImages,
      travelPoints: storeRoutePoints.value
    }
    console.log(preparedValues)
    await createTour(preparedValues)
    clearPointsStore()
  })()
}
</script>

<style lang="sass" scoped>
.publication
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
    //justify-content: center
</style>
