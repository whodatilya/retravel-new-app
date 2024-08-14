<template>
  <div class="favourite__wrapper br-10 relative">
    <img
      :src="favouriteData?.[imagePath]?.[0] ?? emptyImage"
      alt=""
      class="object-cover rounded-full"
    />
    <div
      v-if="isFavourite"
      class="absolute"
      style="right: 0.75rem; top: 0.75rem; z-index: 10000000"
      @click.stop="$emit('delete', favouriteData?.id)"
    >
      <div class="close w-[25px] h-[25px] br-8">
        <img src="@/assets/images/iconClose.svg" alt="" />
      </div>
    </div>
    <div class="favourite__content">
      <div class="flex flex-row justify-between">
        <div class="fs-16 font-semibold">{{ favouriteData.name }}</div>
        <div v-if="favouriteData?.avgRating" class="flex flex-row gap-1.5">
          <img src="@/assets/images/cardImages/iconStarBig.svg" alt="рейтинг" />
          <span class="fs-13 font-medium">{{ favouriteData.avgRating }}</span>
        </div>
      </div>
      <div class="fs-12 font-medium color-main-gray text-ellipsis">
        {{ favouriteData.description }}
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import iconRating from '@/assets/images/cardImages/iconRating.svg'
import emptyImage from '@/assets/images/emptyImage.svg'

export default defineComponent({
  name: 'FavouriteCard',
  data() {
    return {
      iconRating,
      emptyImage
    }
  },
  props: {
    favouriteData: {
      type: Object,
      default: () => {}
    },
    isFavourite: {
      type: Boolean,
      default: false
    },
    imagePath: {
      type: String,
      default: 'routeImages'
    }
  }
})
</script>

<style scoped lang="sass">
.favourite__wrapper
  display: flex
  flex-direction: column
  max-height: 300px
  height: -moz-available
  height: -webkit-fill-available
  height: fill-available
  width: -moz-available
  width: -webkit-fill-available
  width: fill-available
  background: white
  box-shadow: 0 20px 30px 0 rgba(0, 0, 0, 0.05)
  img
    border-radius: 10px 10px 0 0
    height: 70%
  &:hover
    cursor: pointer

.favourite__content
  display: flex
  flex-direction: column
  gap: 0.5rem
  padding: 0.7rem
  justify-content: center
  height: 30%

  .fs-12.font-medium.color-main-gray.text-ellipsis
    overflow: hidden
    white-space: normal
    text-overflow: ellipsis
    display: -webkit-box
    -webkit-box-orient: vertical
    -webkit-line-clamp: 3 // Ограничиваем количество строк текста
    max-height: 4.5em // Максимальная высота блока для текста

.close
  display: flex
  flex-direction: row
  justify-content: center
  align-items: center
  background: #FFFFFF
</style>
