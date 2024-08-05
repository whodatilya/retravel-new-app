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
    <main
      :class="isMobile ? '!flex-col' : '!flex-row'"
      class="publication__content flex !flex-row gap-2.5 flex-1"
    >
      <CreatePublication @submit="onSubmitForm" />
      <EditPublicationRightBlock />
    </main>
  </div>
</template>

<script setup>
import router from '@/router'
import CreatePublication from '@/components/Publications/CreatePublication.vue'
import EditPublicationRightBlock from '@/components/Publications/RightBlocks/EditPublicationRightBlock.vue'
import { useForm } from 'vee-validate'
import { useComponentsStore } from '@/store/components/useComponentsStore'
import { usePublicationsStore } from '@/store/publications/usePublicationsStore'
import { useMapStore } from '@/store/map/useMapStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const { handleSubmit } = useForm()

const { selectComponent } = useComponentsStore()

const { createPublication } = usePublicationsStore()

const { clearPointsStore } = useMapStore()

const { storeRoutePoints } = storeToRefs(useMapStore())

const isMobile = computed(() => window.innerWidth < 768)

const goBack = () => {
  selectComponent('Main')
  router.go(-1)
}

const onSubmitForm = () => {
  handleSubmit(async values => {
    const preparedValues = new FormData()
    preparedValues.append('name', values.name)
    preparedValues.append('description', values.description)

    // Добавляем каждый файл в FormData
    values.routeImages.forEach(image => {
      preparedValues.append('routeImages[]', image)
    })

    const routeTravelPointsString = storeRoutePoints.value
      .map(point => JSON.stringify(point))
      .join(',')
    preparedValues.append('routeTravelPoints[]', routeTravelPointsString)
    const response = await createPublication(preparedValues)
    if (response) {
      clearPointsStore()
      await router.push({
        name: 'publication',
        params: {
          id: response.id
        }
      })
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
