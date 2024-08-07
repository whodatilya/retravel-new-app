<template>
  <div :class="isMobile ? 'h-auto' : 'h-[100vh]'" class="flex flex-col">
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
      <ViewPublication v-if="mode === 'view'" :publication="publication" />
      <CreatePublication
        v-else-if="mode === 'edit'"
        @submit="onSubmitForm"
        @cancel="onCancelForm"
        label-text="Редактировать публикацию"
      />
      <PublicationInfo v-if="mode === 'view'" :publication="publication" />
      <EditPublicationRightBlock v-else-if="mode === 'edit'" />
    </main>
  </div>
</template>

<script setup>
import ViewPublication from '@/components/Publications/ViewPublication.vue'
import PublicationInfo from '@/components/Publications/RightBlocks/PublicationInfo.vue'
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

const { selectComponent } = useComponentsStore()
const { handleSubmit, setValues } = useForm()

const { getPublicationById, updatePublication, deletePublication } =
  usePublicationsStore()

const isMobile = computed(() => window.innerWidth < 768)

const { clearPointsStore } = useMapStore()

const { storeRoutePoints } = storeToRefs(useMapStore())

const { mode } = storeToRefs(usePublicationsStore())

const route = useRoute()
let publication = ref(null)

const publicationId = route.params.id

const onCancelForm = () => {
  deletePublication(publicationId)
  router.go(-1)
}

onMounted(async () => {
  publication.value = await getPublicationById(publicationId)
})

watch(
  () => mode.value,
  async newMode => {
    if (newMode === 'edit') {
      setValues(await getPublicationById(publicationId))
    }
  }
)

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
    await updatePublication(publicationId, preparedValues)
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
    padding: 1.5rem 6rem
    background: #DAE8DA
    height: calc(100vh - 100px)
    position: relative
    display: flex
    flex-direction: column
    @media (max-width: 768px)
      padding: 1.5rem
      background: transparent
      height: unset
    //justify-content: center
</style>
