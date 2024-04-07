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
      <ViewPublication />
      <PublicationInfo />
    </main>
  </div>
</template>

<script setup>
import ViewPublication from '@/components/Publications/ViewPublication.vue'
import PublicationInfo from '@/components/Publications/RightBlocks/PublicationInfo.vue'
import store from '@/store'
import router from '@/router'

const goBack = () => {
  store.commit('components/selectComponent', 'Main')
  router.go(-1)
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
