<template>
  <nav class="flex flex-col h-[100vh] justify-between sticky sticky-sidebar">
    <div class="flex flex-col gap-2">
      <img :src="logo" alt="Логотип" class="mb-4" />
      <div
        class="flex gap-6 br-10 menu__text p-1.5"
        :class="{ 'menu__text-active': selectedComponent === 'Settings' }"
        @click="switchPage('Settings')"
      >
        <img :src="iconUser" alt="Пользователь" />
        <div class="flex flex-col justify-center user-text">
          <div class="menu__text user-text__active fs-18 font-semibold">
            Имя Фамилия
          </div>
          <div class="menu__text user-text__active fs-14 font-medium">
            Пользователь
          </div>
        </div>
      </div>
      <div
        class="menu__text fs-18 menu__item p-4 gap-4 br-10 font-semibold"
        v-for="(item, index) in menuItems"
        :key="index"
        @click="switchPage(item.componentName)"
        :class="{
          'menu__text-active': item.componentName === selectedComponent
        }"
      >
        <img
          class="menu__item-image"
          :class="{
            'menu__item-image-active': item.componentName === selectedComponent
          }"
          :src="require(`@/assets/images/${item.icon}.svg`)"
          :alt="item.title"
        />
        {{ item.title }}
      </div>
    </div>
    <div>
      <div
        class="menu__text fs-18 menu__item p-4 gap-4 br-10 font-semibold"
        @click="quit"
      >
        <img class="menu__item-image" :src="iconExit" alt="Выход" />
        Выход
      </div>
    </div>
  </nav>
</template>
<script setup>
import { ref } from 'vue'
import logo from '@/assets/images/logo.svg'
import iconChat from '@/assets/images/iconChat.svg'
import iconExit from '@/assets/images/iconExit.svg'
import iconUser from '@/assets/images/iconUser.svg'
import iconFavourite from '@/assets/images/iconFavourite.svg'
import iconFolder from '@/assets/images/iconFolder.svg'
import iconHome from '@/assets/images/iconHome.svg'
import iconMap from '@/assets/images/iconMap.svg'
import store from '@/store'

const emit = defineEmits(['selectedComponent'])

const menuItems = [
  {
    title: 'Главная',
    icon: 'iconHome',
    componentName: 'Main'
  },
  {
    title: 'Карта',
    icon: 'iconMap',
    componentName: 'Map'
  },
  {
    title: 'Публикации',
    icon: 'iconFolder',
    componentName: 'Publications'
  },
  {
    title: 'Чат',
    icon: 'iconChat',
    componentName: 'Chat'
  },
  {
    title: 'Избранное',
    icon: 'iconFavourite',
    componentName: 'Favourites'
  }
]
const selectedComponent = ref('Main')
const switchPage = componentName => {
  selectedComponent.value = componentName
  emit('selectedComponent', selectedComponent.value)
}
const quit = () => {
  store.dispatch('user/logout')
}
</script>
<style scoped lang="sass">
.sticky-sidebar
  top: 0
$main-green: #4E944F
.menu
  &__item
    display: flex
    align-items: center
    &:hover
      cursor: pointer
    &-image
      &-active
        filter: brightness(0) invert(1)
  &__text
    font-family: 'Lato', system-ui
    font-style: normal
    color: #7D7D7D
    letter-spacing: 0.01em
    line-height: normal
    &-active
      color: #FFFFFF
      background: $main-green
      .user-text
        &__active
          color: #FFFFFF
</style>
