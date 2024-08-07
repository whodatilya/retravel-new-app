<template>
  <div class="content-wrapper basis-5/12 flex flex-col gap-5">
    <div class="flex flex-row justify-between items-center relative">
      <div class="fs-18 font-semibold">Мои публикации</div>
      <div
        class="filter-button flex flex-row p-1.5 br-8 gap-0.5"
        @click="toggleDropdown"
      >
        <img src="@/assets/images/iconFilter.svg" alt="" />
        <div class="color-main-gray fs-12">Фильтр</div>
      </div>
      <div v-if="isDropdownVisible" class="dropdown-menu">
        <div @click="sortPublications('rating')">По рейтингу</div>
        <div @click="sortPublications('createdAt', 'DESC')">
          По дате создания (убыв.)
        </div>
        <div @click="sortPublications('createdAt', 'ASC')">
          По дате создания (возр.)
        </div>
      </div>
    </div>
    <template v-if="sortedPublications.length">
      <template v-for="publication in sortedPublications" :key="publication.id">
        <popular-card :card-data="publication" :is-tiny="true" />
      </template>
    </template>
    <template v-else>
      <div class="no-publications">Пока ни одной публикации</div>
    </template>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
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

const isDropdownVisible = ref(false)
const sortOrder = ref('rating')

const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value
}

const sortPublications = (order, sortDirection = 'DESC') => {
  sortOrder.value = {
    sortBy: order,
    sortDirection: sortDirection
  }
  isDropdownVisible.value = false
}

const sortedPublications = computed(() => {
  return []
})
</script>

<style lang="sass" scoped>
.content-wrapper
  border-radius: 20px
  background: white
  padding: 1.5rem
  position: relative
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
.filter-button
  cursor: pointer

.dropdown-menu
  position: absolute
  top: 100%
  right: 0
  background: white
  border: 1px solid #d0d0d0
  border-radius: 8px
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1)
  margin-top: 0.5rem
  width: max-content
  div
    padding: 0.5rem 1rem
    cursor: pointer
    &:hover
      background: #f0f0f0
.no-publications
  color: #333
  text-align: center
</style>
