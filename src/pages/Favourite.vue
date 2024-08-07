<template>
  <div class="flex flex-col h-[100vh]">
    <header class="favourite__header">
      <img
        @click="goBack"
        class="icon"
        src="@/assets/images/back_button.svg"
        alt=""
      />
      <img class="icon" src="@/assets/images/logo_unfilled.svg" alt="" />
    </header>
    <main class="favourite__content flex !flex-row gap-2.5 flex-1">
      <ViewPublication :publication="publication" />
      <PublicationInfo :publication="publication" />
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
import { onMounted, ref } from 'vue'

const { selectComponent } = useComponentsStore()

const { getPublicationById } = usePublicationsStore()

const route = useRoute()
let publication = ref(null)

const publicationId = route.params.id

onMounted(async () => {
  publication.value = await getPublicationById(publicationId)
})

const goBack = () => {
  selectComponent('Main')
  router.go(-1)
}
</script>

<style lang="sass" scoped>
.favourite
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
    position: relative
    display: flex
    flex-direction: column
    @media (max-width: 768px)
      padding: 1.5rem
    //justify-content: center
</style>
