<template>
  <div class="card__wrapper w-full color-semi-white">
    <img :src="cardData.icon" class="w-full" alt="Фото локации">
    <div class="card__text flex flex-col justify-center">
      <div class="fs-16 mx-2">{{ cardData.title }}</div>
      <div class="flex flex-row justify-between mx-2">
        <div class="flex flex-row gap-1">
          <img :src="iconLocation" alt="">
          <div class="fs-8">{{ cardData.location }}</div>
        </div>
        <div class="flex flex-row gap-[1px]">
          <img :src="iconStar" alt="Звезда рейтинга">
          <div class="fs-8">{{ cardData.rating }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import iconLocation from '@/assets/images/cardImages/locationPin.svg'
import iconStar from '@/assets/images/cardImages/iconStar.svg'

export default defineComponent({
  name: "PlaceCard",
  data () {
    return {
      iconLocation,
      iconStar
    }
  },
  props: {
    cardData: {
      type: Object,
      default: () => {}
    }
  }
});
</script>

<style scoped lang="sass">
.card
  &__wrapper
    display: flex
    position: relative
    border-radius: 22px
  &__text
    width: 100%
    height: 25%
    border-radius: 0 0 22px 22px
    background: rgba(0, 0, 0, 0.38)
    backdrop-filter: blur(1px)
    bottom: 0
    position: absolute
</style>