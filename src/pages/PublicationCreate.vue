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

const { handleSubmit } = useForm()

const { selectComponent } = useComponentsStore()

const { createPublication } = usePublicationsStore()

const { clearPointsStore } = useMapStore()

const { storeRoutePoints } = storeToRefs(useMapStore())

const goBack = () => {
  selectComponent('Main')
  router.go(-1)
}

const convertFileListToBase64Array = fileList => {
  return new Promise((resolve, reject) => {
    const result = []
    const promises = []

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i]
      const reader = new FileReader()

      promises.push(
        new Promise((resolve, reject) => {
          reader.onload = event => {
            result.push({
              id: i,
              data: event.target.result
            })
            resolve()
          }

          reader.onerror = error => {
            reject(error)
          }

          reader.readAsDataURL(file)
        })
      )
    }

    Promise.all(promises)
      .then(() => resolve(result))
      .catch(reject)
  })
}

const onSubmitForm = () => {
  handleSubmit(async values => {
    const preparedRouteImages = await convertFileListToBase64Array(
      values.routeImages?.[0]
    )

    const preparedValues = {
      ...values,
      routeImages: preparedRouteImages
    }

    await createPublication(preparedValues)
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
