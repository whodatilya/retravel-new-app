<template>
  <div class="card flex flex-row justify-between my-2">
    <div class="flex gap-3">
      <img :src="cardData.icon" style="width: 5rem; height: 4rem" alt="Иконка популярного">
      <div class="flex flex-col justify-center">
        <div class="color-main-black fs-16 font-semibold">{{ cardData.title }}</div>
        <div class="color-main-gray fs-12">{{ cardData.location }}</div>
      </div>
    </div>
    <div class="flex flex-row items-center gap-1.5">
      <img :src="iconStarBig" alt="">
      <div class="fs-19">{{ cardData.rating }}</div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import iconStarBig from '@/assets/images/cardImages/iconStarBig.svg'

export default defineComponent({
  name: "PopularCard",
  data () {
    return {
      iconStarBig
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
  &:hover
    cursor: pointer
</style>