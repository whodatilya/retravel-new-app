<template>
  <div class="favourite__wrapper br-10">
    <img :src="favouriteData.icon" alt="">
    <div class="favourite__content">
      <div class="flex flex-row justify-between">
        <div class="fs-16 font-semibold">{{ favouriteData.title }}</div>
        <img :src="iconRating" alt="Рейтинг">
      </div>
      <div class="fs-12 font-medium color-main-gray">
        {{ favouriteData.location }}
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import iconRating from '@/assets/images/cardImages/iconRating.svg'

export default defineComponent({
  name: "FavouriteCard",
  data () {
    return {
      iconRating
    }
  },
  props: {
    favouriteData: {
      type: Object,
      default: () => {}
    }
  }
});
</script>

<style scoped lang="sass">
.favourite
  &__wrapper
    display: flex
    flex-direction: column
    background: white
    box-shadow: 0 20px 30px 0 rgba(0, 0, 0, 0.05)
    &:hover
      cursor: pointer
  &__content
    display: flex
    flex-direction: column
    padding: 0.75rem
</style>