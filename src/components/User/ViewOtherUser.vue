<template>
  <div
    :class="{ 'w-[60%]': !isMobile, 'pb-5': isMobile }"
    class="flex flex-col flex-1 gap-5"
  >
    <div class="flex flex-col gap-4 justify-center items-center">
      <div class="flex flex-row justify-center">
        <img
          :src="profilePhotoUrl || require('@/assets/images/iconUserBig.svg')"
          style="width: 145px; height: 145px; border-radius: 50%"
          alt=""
        />
      </div>
      <div class="p-2 white-background br-8 flex w-fit flex-row justify-center">
        {{ user?.name }} {{ user?.surname }}
      </div>
    </div>
    <div
      class="content-wrapper flex flex-col flex-auto gap-6 h-full wide-inputs"
    >
      <div class="flex flex-row justify-between items-center">
        <div class="font-semibold">Публикации:</div>
        <div class="flex flex-row relative">
          <div
            class="filter-button flex flex-row p-1.5 br-8 gap-0.5 items-center"
            @click="toggleDropdown"
          >
            <img src="@/assets/images/iconFilter.svg" alt="" />
            <div class="color-main-gray fs-12">Фильтр</div>
          </div>
          <div v-if="isDropdownVisible" class="dropdown-menu">
            <div @click="sortPublications('rating')">По рейтингу</div>
            <div @click="sortPublications('createdAt', 'DESC')">
              По дате создания (убыв.)
            </div>
            <div @click="sortPublications('createdAt', 'ASC')">
              По дате создания (возр.)
            </div>
          </div>
        </div>
      </div>
      <div class="popular-cards-container">
        <popular-card
          v-for="card in popularCards"
          :key="card.id"
          @click="openCard(card.id)"
          :card-data="card"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useForm } from 'vee-validate'
import { useAuthStore } from '@/store/auth/useAuthStore'
import { computed, onMounted, ref, watch } from 'vue'
import PopularCard from '@/components/Cards/PopularCard.vue'
import { usePublicationsStore } from '@/store/publications/usePublicationsStore'

const profilePhotoUrl = ref(null)

const { getUser } = useAuthStore()

// const userId = localStorage.getItem('userId')
// eslint-disable-next-line no-undef
const props = defineProps({
  userId: {
    type: String
  }
})

const { handleSubmit, setValues } = useForm()
const user = ref(null)
const popularCards = ref([])

const { getPublications } = usePublicationsStore()

const isMobile = computed(() => window.innerWidth < 768)

onMounted(async () => {
  user.value = await getUser(props.userId)
  profilePhotoUrl.value = user.value?.profilePhoto
  if (user.value) {
    setValues(user.value)
  }
})

const isDropdownVisible = ref(false)
const sortOrder = ref('rating')

const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value
}
onMounted(async () => {
  const popularData = await getPublications()
  if (popularData.data) {
    const preparedPopularCards = popularData.data.filter(
      item => item.user.id === +props.userId
    )
    popularCards.value = popularData.data
  } else {
    popularCards.value = []
  }
})

const sortPublications = (order, sortDirection = 'DESC') => {
  sortOrder.value = {
    sortBy: order,
    sortDirection: sortDirection
  }
  isDropdownVisible.value = false
}

watch(
  () => sortOrder.value,
  async newValue => {
    const popularCardsData = await getPublications({
      ...newValue
    })

    if (popularCardsData.data) {
      popularCards.value = popularCardsData.data.filter(
        item => item.user.id === +props.userId
      )
    } else {
      popularCards.value = []
    }
  }
)
</script>

<style scoped lang="sass">
.white-background
  background: white
.content-wrapper
  border-radius: 20px
  background: white
  padding: 1.5rem
  .carousel__item
    min-height: 200px
    width: 100%
    background-color: lightgreen
    color: white
    font-size: 20px
    border-radius: 8px
    display: flex
    justify-content: center
    align-items: center
  .carousel__slide
    padding: 4px
.button__edit
  color: white
  background: #4E944F
  width: 60%
  border-radius: 8px
  padding: 0.5rem 0
.dropdown-menu
  position: absolute
  top: 100%
  right: 0
  background: white
  border: 1px solid #d0d0d0
  border-radius: 8px
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1)
  margin-top: 0.5rem
  width: max-content
  div
    padding: 0.5rem 1rem
    cursor: pointer
    &:hover
      background: #f0f0f0
.popular-cards-container
  max-height: 400px
  overflow-y: auto
</style>
