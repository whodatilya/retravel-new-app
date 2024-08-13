<template>
  <div class="hover:cursor-pointer flex flex-col gap-2 p-2" @click="goToUser">
    <div class="flex flex-row gap-4 items-center">
      <span class="fs-20 color-main-gray">{{ data?.author?.name }}</span>
      <img
        :src="
          data?.author?.profilePhoto || require('@/assets/images/iconUser.svg')
        "
        style="width: 45px; height: 45px; border-radius: 50%; object-fit: cover"
        alt=""
      />
    </div>
    <span class="fs-18 font-semibold">{{ parseRating(data?.rating) }}</span>
    <span class="fs-16 color-main-gray">
      {{ data?.text }}
    </span>
    <div class="flex flex-row gap-2">
      <span class="fs-14 font-semibold">Дата:</span>
      <span class="fs-14 font-normal color-main-gray">{{
        moment(data?.createdAt).format('DD.MM.YYYY')
      }}</span>
    </div>
    <hr />
  </div>
</template>

<script setup>
import moment from 'moment/moment'
import router from '@/router'
// eslint-disable-next-line no-undef
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const localUserId = localStorage.getItem('userId')

const parseRating = rating => {
  switch (rating) {
    case 1:
      return 'Очень плохо'
    case 2:
      return 'Плохо'
    case 3:
      return 'Удовлетворительно'
    case 4:
      return 'Хорошо'
    case 5:
      return 'Отлично'
    default:
      return 'Неизвестно'
  }
}

const goToUser = () => {
  if (props.data?.author?.id == localUserId) {
    router.push({
      name: 'user'
    })
  } else {
    router.push({
      name: 'other-user',
      params: {
        id: props?.data?.author?.id
      }
    })
  }
}
</script>

<style lang="scss" scoped></style>
