<template>
  <div
    :class="{ 'min-w-[400px]': !isMobile }"
    class="content-wrapper flex flex-col gap-5"
  >
    <div class="flex flex-row justify-between pb-[20px]">
      <span class="font-semibold fs-24">Отзывы</span>
    </div>
    <div class="overflow-auto">
      <template v-for="(item, index) in reviews" :key="index">
        <Review :data="item" />
      </template>
    </div>
    <button
      v-if="!isCurrentUser && localUserId != userId"
      @click="toggleModal"
      class="button__edit"
    >
      Новый отзыв
    </button>
    <ReviewModal
      v-if="isModalOpened"
      @onClose="toggleModal"
      @onSubmit="processReview"
    />
  </div>
</template>

<script setup>
import Review from '@/components/User/Review.vue'
import { computed, onMounted, ref } from 'vue'
import { useReviewStore } from '@/store/reviews/useReviewStore'
import ReviewModal from '@/components/Modals/ReviewModal.vue'

const reviews = ref([])
const isModalOpened = ref(false)
const isMobile = computed(() => window.innerWidth < 768)

const toggleModal = () => {
  isModalOpened.value = !isModalOpened.value
}

// eslint-disable-next-line no-undef
const props = defineProps({
  isCurrentUser: {
    type: Boolean,
    default: false
  },
  userId: {
    type: String
  }
})
const localUserId = localStorage.getItem('userId')

const processReview = async formData => {
  await createUserReview({
    ...formData,
    userId: props.isCurrentUser ? localUserId : props.userId
  })
  reviews.value = await getReviewsByUserId(+props.userId ?? localUserId)
  toggleModal()
}

const { getReviewsByUserId, createUserReview } = useReviewStore()

onMounted(async () => {
  reviews.value = await getReviewsByUserId(
    +props.isCurrentUser ? localUserId : props.userId
  )
})
</script>

<style lang="sass" scoped>
.content-wrapper
  border-radius: 20px
  background: white
  padding: 1.5rem
  .button__edit
    color: white
    background: #4E944F
    border-radius: 8px
    padding: 0.5rem 0
  .description
    &-container
      padding: 0.75rem
      height: 100%
      border-radius: 8px
      border: 1px solid rgba(208, 208, 208, 0.50)
      background: rgba(250, 250, 250, 0.70)
    &-wrapper
      flex: 1 0 auto
</style>
