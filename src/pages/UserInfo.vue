<template>
  <div class="flex flex-col h-[100vh]">
    <header class="user__header">
      <img
        @click="goBack"
        class="icon"
        src="@/assets/images/back_button.svg"
        alt=""
      />
      <img class="icon" src="@/assets/images/logo_unfilled.svg" alt="" />
    </header>
    <main class="user__content flex !flex-row gap-2.5 flex-1 overflow-y-auto">
      <ViewUser />
      <Reviews />
    </main>
  </div>
</template>

<script setup>
import router from '@/router'
import { useComponentsStore } from '@/store/components/useComponentsStore'
import ViewUser from '@/components/User/ViewUser.vue'
import Reviews from '@/components/User/Reviews.vue'

const { selectComponent } = useComponentsStore()

const goBack = () => {
  selectComponent('Main')
  router.go(-1)
}
</script>

<style lang="sass" scoped>
.user
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
