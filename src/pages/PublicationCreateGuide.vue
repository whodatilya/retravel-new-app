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
    const preparedValues = new FormData()
    preparedValues.append('name', values.name)
    preparedValues.append('description', values.description)
    preparedValues.append('participantsCount', values.participantsCount)
    preparedValues.append('date', values.date)
    preparedValues.append('price', values.price)

    // Добавляем изображения
    values.tourImages.forEach(image => {
      preparedValues.append('tourImages[]', image)
    })
    preparedValues.append('schedule[]', values.schedule)

    // Преобразуем массив объектов в строку, разделенную запятыми
    const tourTravelPointsString = storeRoutePoints.value
      .map(point => JSON.stringify(point))
      .join(',')
    preparedValues.append('travelPoints[]', tourTravelPointsString)

    const response = await createTour(preparedValues)
    if (response) {
      await router.push({
        name: 'tour',
        params: {
          id: response.id
        }
      })
      clearPointsStore()
    }
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
