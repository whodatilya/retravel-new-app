<template>
  <div class="card__wrapper w-full color-semi-white">
    <img :src="cardData.icon" alt="Фото локации">
    <div class="card__text flex flex-col">
      <div class="fs-16">{{ cardData.title }}</div>
      <div class="flex flex-row justify-between">
        <div class="flex flex-row gap-1">
          <img :src="iconLocation" alt="">
          <div class="fs-7">{{ cardData.location }}</div>
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
    border-radius: 0 0 22px 22px
    background: black
    opacity: 0.3
    bottom: 0
    position: absolute
</style>