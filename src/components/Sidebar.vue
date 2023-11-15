<template>
  <div class="flex mt-[69px] ml-[52px]">
    <div class="flex flex-col gap-4">
      <img :src="logo" alt="Логотип">
      <div
        class="menu__item flex p-4 gap-4 br-10 items-center font-semibold"
        v-for="(item, index) in menuItems"
        :key="index"
        @click="switchPage(item)"
        :class="{ 'menu__item-active': item.componentName === selectedPage }"
      >
        <img
          class="menu__item-image"
          :class="{ 'menu__item-image-active': item.componentName === selectedPage }"
          :src="require(`@/assets/images/${item.icon}.svg`)"
          alt=""
        />
        {{ item.title }}
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import logo from "@/assets/images/logo.svg";
import iconChat from '@/assets/images/iconChat.svg'
import iconFavourite from '@/assets/images/iconFavourite.svg'
import iconFolder from '@/assets/images/iconFolder.svg'
import iconHome from '@/assets/images/iconHome.svg'
import iconMap from '@/assets/images/iconMap.svg'

export default defineComponent({
  name: "Sidebar",
  data () {
    return {
      logo,
      menuItems: [
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
          componentName: 'Favourite'
        }
      ],
      selectedPage: 'Main'
    }
  },
  methods: {
    switchPage(item) {
      this.selectedPage = item.componentName
    },
    processQuit() {
      this.isOpen = !this.isOpen
    },
    quit() {
      this.$store.dispatch('user/logout')
    }
  }
});
</script>
<style scoped lang="sass">
$main-green: #4E944F
.menu__item
  font-family: 'Lato', system-ui
  font-style: normal
  color: #7D7D7D
  letter-spacing: 0.01em
  font-size: 18px
  line-height: 22px
  &:hover
    cursor: pointer
  &-active
    color: #FFFFFF
    background: $main-green
</style>