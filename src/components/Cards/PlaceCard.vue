<template>
  <div class="card__wrapper w-full color-semi-white">
    <img
      :src="cardData.travelPointImages[0]"
      class="w-full br-22"
      alt="Фото локации"
    />
    <div class="card__text flex flex-col gap-1 justify-center p-2">
      <div class="fs-16 text-ellipsis">{{ cardData.name }}</div>
      <div class="flex flex-row align-middle justify-between">
        <div class="flex flex-row gap-1">
          <img src="@/assets/images/cardImages/locationPin.svg" alt="" />
          <div class="fs-10 text-ellipsis">{{ cardData.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-undef
const props = defineProps({
  cardData: {
    type: Object,
    default: () => {}
  }
})
</script>

<style scoped lang="sass">
.card
  &__wrapper
    display: flex
    position: relative
    border-radius: 22px
  &__text
    width: 100%
    height: 50%
    border-radius: 0 0 22px 22px
    background: rgba(0, 0, 0, 0.38)
    backdrop-filter: blur(1px)
    bottom: 0
    position: absolute
    overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap
    line-clamp: 2

.text-ellipsis
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap
</style>
