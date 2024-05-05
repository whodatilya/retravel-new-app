<template>
  <div class="flex flex-col gap-2 p-2">
    <div class="flex flex-row gap-4 items-center">
      <span class="fs-20 color-main-gray">Имя</span>
      <img src="@/assets/images/iconUser.svg" alt="" />
    </div>
    <span class="fs-18 font-semibold">Отлично</span>
    <span class="fs-16 color-main-gray">
      Бла-бла-бла Бла-бла-бла Бла-бла-бла Бла-бла-бла
    </span>
    <div class="flex flex-row gap-2">
      <span class="fs-14 font-semibold">Дата:</span>
      <span class="fs-14 font-normal color-main-gray">04.05.2024</span>
    </div>
    <hr />
  </div>
</template>

<script setup>
// eslint-disable-next-line no-undef
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
