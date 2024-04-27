<template>
  <div class="content-wrapper basis-4/12 flex flex-col gap-5">
    <div class="flex flex-row justify-between items-center">
      <div class="fs-18 font-semibold">Мои публикации</div>
      <div class="filter-button flex flex-row p-1.5 br-8 gap-0.5">
        <img src="@/assets/images/iconFilter.svg" alt="" />
        <div class="color-main-gray fs-12">Фильтр</div>
      </div>
    </div>
    <template v-for="publication in myPublications" :key="publication.id">
      <popular-card :card-data="publication" :is-tiny="true" />
    </template>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import PopularCard from '@/components/Cards/PopularCard.vue'
import karelia from '@/assets/images/cardImages/popular/image1.svg'
import altay from '@/assets/images/cardImages/popular/image2.svg'
import hibins from '@/assets/images/cardImages/popular/image3.svg'

const myPublications = reactive([
  {
    id: 0,
    icon: karelia,
    title: 'Путешествие по Карелии',
    location: 'Россия, Карелия',
    rating: 3
  },
  {
    id: 1,
    icon: altay,
    title: 'Горный Алтай',
    location: 'Россия, Республика Алтай',
    rating: 4
  },
  {
    id: 2,
    icon: hibins,
    title: 'Хибины',
    location: 'Россия, Кольский полуостров',
    rating: 2
  }
])
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
