<template>
  <nav class="flex flex-col h-[100vh] justify-between sticky sticky-sidebar">
    <div
      class="flex flex-col gap-2"
      :class="{ 'pt-4': currentWindowWidth < 768 }"
    >
      <img :src="logo" alt="Логотип" class="mb-4" />
      <div
        class="flex gap-6 br-10 menu__text p-1.5 mb-3"
        :class="{ 'menu__text-active': selectedComponent === 'Settings' }"
        @click="switchPage('Settings')"
      >
        <img
          :src="user?.profilePhoto || iconUser"
          style="width: 45px; height: 45px; border-radius: 50%"
          alt=""
        />
        <div class="flex flex-col justify-center user-text">
          <div class="menu__text user-text__active fs-18 font-semibold">
            {{ user?.name }} {{ user?.surname }}
          </div>
          <div class="menu__text user-text__active fs-14 font-medium">
            {{ role }}
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
import { computed, onMounted, ref } from 'vue'
import logo from '@/assets/images/logo.svg'
import iconExit from '@/assets/images/iconExit.svg'
import iconUser from '@/assets/images/iconUser.svg'
import { useAuthStore } from '@/store/auth/useAuthStore'

// eslint-disable-next-line no-undef
const emit = defineEmits(['selectedComponent'])

const { logout, getUser } = useAuthStore()

const user = ref(null)

const currentWindowWidth = computed(() => window.innerWidth)

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
    title: 'Туры',
    icon: 'iconTour',
    componentName: 'Tours'
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
  logout()
}

onMounted(async () => {
  const userId = localStorage.getItem('userId')
  user.value = await getUser(userId)
})

const role = computed(() => {
  const roles = localStorage.getItem('roles')
  if (roles.includes('ROLE_GUIDE')) {
    return 'Гид'
  } else {
    return 'Пользователь'
  }
})
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
