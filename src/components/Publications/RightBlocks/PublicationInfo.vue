<template>
  <div class="content-wrapper min-w-[40%] flex flex-col">
    <div class="flex flex-row justify-between pb-5 mb-2">
      <div class="flex flex-row gap-5 cursor-pointer" @click="showUser">
        <div>
          <img
            :src="
              publication?.user?.profilePhoto ||
              require('@/assets/images/iconUser.svg')
            "
            style="
              width: 45px;
              height: 45px;
              border-radius: 50%;
              object-fit: cover;
            "
            alt=""
          />
        </div>
        <div>
          <div class="flex flex-col gap-2 fs-16 font-medium">
            <div class="flex flex-row gap-1">
              <span>{{ publication?.user?.name }}</span>
              <span>{{ publication?.user?.surname }}</span>
            </div>
            <div class="fs-14 font-light color-main-gray">{{ role }}</div>
          </div>
        </div>
      </div>
      <div class="flex flex-row items-center gap-1.5">
        <img src="@/assets/images/cardImages/iconStarBig.svg" alt="рейтинг" />
        <span class="fs-18 font-medium" v-if="publication?.user?.avgRating">{{
          (publication?.user?.avgRating).toFixed(1)
        }}</span>
        <span class="fs-14 font-light color-main-gray" v-else>нет оценок</span>
      </div>
    </div>
    <span class="fs-16 font-semibold">{{ publication?.name }}</span>
    <!--    <span class="fs-12 font-light color-main-gray pb-5">{{-->
    <!--      publication?.description-->
    <!--    }}</span>-->
    <hr class='my-4'>
    <button
      v-if="isCurrentUserPublication"
      @click="changeMode('edit')"
      class="button__edit fs-14 font-semibold mb-4"
    >
      Редактировать публикацию
    </button>
    <div class="flex flex-col description-wrapper ">
      <span class="fs-16 font-medium pb-1">Описание</span>
      <div class="description-container font-normal mt-2">
        {{ publication?.description }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePublicationsStore } from '@/store/publications/usePublicationsStore'
import router from '@/router'
// eslint-disable-next-line no-undef
const props = defineProps({
  publication: {
    type: Object,
    default: () => {}
  }
})

const { changeMode } = usePublicationsStore()

const userId = localStorage.getItem('userId')

const isCurrentUserPublication = computed(
  () => +userId === props?.publication?.user?.id
)

const showUser = () => {
  router.push({
    name: 'other-user',
    params: {
      id: props?.publication?.user?.id
    }
  })
}

const role = computed(() => {
  if (props.publication?.user?.roles?.includes('ROLE_GUIDE')) {
    return 'Гид'
  } else {
    return 'Турист'
  }
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
      padding: 1rem 1.5rem
      border-radius: 8px
      background-color: #dae8da6e
      color: #333333
      line-height: 1.6
      font-size: 1rem
      max-width: 100%
      overflow-wrap: break-word
      text-align: justify
      p
        margin-bottom: 0.75rem
      ul, ol
        padding-left: 1.5rem
        margin-bottom: 1rem
      h1, h2, h3, h4, h5, h6
        margin-top: 1.5rem
        margin-bottom: 0.75rem
        color: #4E944F
    &-wrapper
      flex: 1 0 auto
</style>
