<template>
  <div
    class="card flex flex-row justify-between"
    :class="{ 'tiny_card br-20 p-3': isTiny, 'my-2': !isTiny }"
  >
    <div class="flex gap-4 w-full">
      <img
        class="br-8"
        :src="cardData?.routeImages?.[0]"
        style="width: 5rem; height: 4rem; object-fit: cover"
        alt="Иконка популярного"
      />
      <div class="flex flex-col justify-center">
        <div
          :class="isTiny ? 'fs-15' : 'fs-16'"
          class="color-main-black font-semibold truncate pb-1"
        >
          {{ cardData?.name }}
        </div>
        <div class="flex flex-row gap-1 color-main-gray fs-12">
          <img src="@/assets/images/cardImages/locationPin.svg" alt="локация" />
          <span class="description">{{ cardData?.description }}</span>
        </div>
      </div>
    </div>
    <div v-if="!isTiny" class="flex flex-row items-center gap-1.5">
      <img src="@/assets/images/cardImages/iconStarBig.svg" alt="" />
      <div class="fs-19">{{ cardData?.avgRating }}</div>
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-undef
const props = defineProps({
  cardData: {
    type: Object,
    default: () => {}
  },
  isTiny: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped lang="sass">
.card
  &:hover
    cursor: pointer
.tiny_card
  border: 1px solid #D0D0D0
  box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.10)

.description
  display: -webkit-box
  -webkit-line-clamp: 2
  -webkit-box-orient: vertical
  overflow: hidden
  text-overflow: ellipsis
  white-space: normal
  padding-right: 1rem
</style>
