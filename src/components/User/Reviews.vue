<template>
  <div class="content-wrapper flex flex-col gap-5">
    <div class="flex flex-row justify-between pb-[20px]">
      <img
        class="w-[100px]"
        src="@/assets/images/cardImages/iconRating.svg"
        alt=""
      />
      <span class="font-semibold fs-24">Отзывы</span>
    </div>
    <div class="overflow-auto">
      <template v-for="(item, index) in 10" :key="index">
        <Review :data="item" />
      </template>
    </div>
    <button class="button__edit">Новый отзыв</button>
  </div>
</template>

<script setup>
import Review from '@/components/User/Review.vue'
</script>

<style lang="sass" scoped>
.content-wrapper
  border-radius: 20px
  background: white
  padding: 1.5rem
  .button__edit
    color: white
    background: #4E944F
    border-radius: 8px
    padding: 0.5rem 0
  .description
    &-container
      padding: 0.75rem
      height: 100%
      border-radius: 8px
      border: 1px solid rgba(208, 208, 208, 0.50)
      background: rgba(250, 250, 250, 0.70)
    &-wrapper
      flex: 1 0 auto
</style>
