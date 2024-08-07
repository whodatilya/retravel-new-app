<template>
  <div class="content-wrapper min-w-[40%] flex flex-col">
    <div class="flex flex-row justify-between pb-5">
      <div class="flex flex-row gap-5 cursor-pointer" @click="showUser">
        <div>
          <img
            :src="
              tour?.user?.profilePhoto ||
              require('@/assets/images/iconUser.svg')
            "
            style="width: 45px; height: 45px; border-radius: 50%"
            alt=""
          />
        </div>
        <div>
          <div class="flex flex-col gap-2 fs-16 font-medium">
            <div class="flex flex-row gap-2">
              <span>{{ tour?.user?.name }}</span>
              <span>{{ tour?.user?.surname }}</span>
            </div>
            <div class="fs-14 font-light color-main-gray">Гид</div>
          </div>
        </div>
      </div>
      <div class="flex flex-row items-center gap-1.5">
        <img src="@/assets/images/cardImages/iconStarBig.svg" alt="рейтинг" />
        <span class="fs-18 font-medium" v-if="tour?.user?.avgRating">{{
          (tour?.user?.avgRating).toFixed(1)
        }}</span>
        <span class="fs-14 font-light color-main-gray" v-else>нет оценок</span>
      </div>
    </div>
    <div class="flex flex-col gap-2 pb-5">
      <div class="flex flex-row justify-between">
        <span class="fs-16 font-semibold">{{ tour?.name }}</span>
        <span class="fs-16 font-semibold">{{ tour?.price }}</span>
      </div>
      <div class="flex flex-row justify-between">
        <span class="fs-12 font-light color-main-gray">Локация</span>
        <span class="fs-12 font-light color-main-gray">За одного человека</span>
      </div>
    </div>
    <button
      class="button__edit fs-14 font-semibold"
      v-if="tour?.participants?.length <= tour?.participantsCount"
      @click="toggleModal"
    >
      Хочу пойти!
    </button>
    <ConfirmationModal
      :show="isModalOpened"
      @submit="createTourParticipant"
      @close="isModalOpened = false"
    />
    <button
      v-if="isCurrentUserPublication"
      @click="changeMode('edit')"
      class="button__edit fs-14 font-semibold"
    >
      Редактировать публикацию
    </button>
    <div
      :class="{ 'description-wrapper': fieldsStore.description.value }"
      class="flex flex-col mt-4"
    >
      <div class="flex flex-row justify-between">
        <span class="fs-16 font-semibold">Описание</span>
        <img
          @click="changeFieldStatus('description')"
          class="cursor-pointer"
          :src="getFieldStatus('description')"
          alt=""
        />
      </div>
      <div
        v-if="fieldsStore.description.value"
        class="description-container mt-2"
      >
        {{ tour?.description }}
      </div>
    </div>
    <div
      :class="{ 'description-wrapper': fieldsStore.schedule.value }"
      class="flex flex-col mt-4"
    >
      <div class="flex flex-row justify-between">
        <span class="fs-16 font-semibold">Расписание</span>
        <img
          @click="changeFieldStatus('schedule')"
          class="cursor-pointer"
          :src="getFieldStatus('schedule')"
          alt=""
        />
      </div>
      <div v-if="fieldsStore.schedule.value" class="description-container mt-2">
        <template v-for="(activity, index) in parsedSchedule" :key="index">
          <div class="flex flex-col gap-2">
            <div class="flex flex-row gap-2 items-center">
              <div class="font-semibold fs-14">
                {{ moment(activity?.date).format('DD.MM.YYYY') }}:
              </div>
              <div class="fs-14 color-main-green">{{ activity?.location }}</div>
            </div>
            <div class="fs-14">{{ activity?.activity }}</div>
          </div>
          <br />
        </template>
      </div>
    </div>
    <div
      :class="{ 'description-wrapper': fieldsStore.participants.value }"
      class="flex flex-col mt-4"
    >
      <div class="flex flex-row justify-between">
        <span class="fs-16 font-semibold">Участники</span>
        <div class="fs-14 color-main-gray">
          {{ tour?.participants?.length }} / {{ tour?.participantsCount }}
        </div>
      </div>
      <div
        v-if="fieldsStore.participants.value"
        class="description-container mt-2"
      >
        <template
          v-for="(participant, index) in tour?.participants"
          :key="index"
        >
          <div class="flex flex-row justify-between">
            <div class="flex flex-row gap-5 cursor-pointer" @click="showUser">
              <img
                :src="
                  participant?.profilePhoto ||
                  require('@/assets/images/iconUser.svg')
                "
                style="width: 42px; height: 42px; border-radius: 50%"
                alt=""
              />
              <div class="flex flex-row gap-1 items-center">
                <span>{{ tour?.user?.name }}</span>
                <span>{{ tour?.user?.surname }}</span>
              </div>
            </div>
            <img
              class="cursor-pointer"
              src="@/assets/images/iconClose.svg"
              alt=""
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { usePublicationsStore } from '@/store/publications/usePublicationsStore'
import iconLess from '@/assets/images/iconLess.svg'
import iconMore from '@/assets/images/iconMore.svg'
import moment from 'moment/moment'
import router from '@/router'
import ConfirmationModal from '@/components/Modals/ConfirmationModal.vue'
import { useTourStore } from '@/store/tours/useTourStore'

// eslint-disable-next-line no-undef
const props = defineProps({
  tour: {
    type: Object,
    default: () => {}
  }
})

const { addTourParticipant } = useTourStore()

const fieldsStore = reactive({
  description: { value: true },
  schedule: { value: false },
  participants: { value: true }
})

const showUser = () => {
  router.push({
    name: 'other-user',
    params: {
      id: props?.tour?.user?.id
    }
  })
}

const isModalOpened = ref(false)

const toggleModal = () => {
  isModalOpened.value = !isModalOpened.value
}

const getFieldStatus = fieldName => {
  return fieldsStore[fieldName].value ? iconLess : iconMore
}

const changeFieldStatus = fieldName => {
  fieldsStore[fieldName].value = !fieldsStore[fieldName].value
}

const { changeMode } = usePublicationsStore()

const parsedSchedule = computed(() => {
  if (props.tour.schedule) {
    // Используем регулярное выражение для поиска всех объектов в строке
    const regex = /\{[^}]+\}/g
    const matches = props.tour.schedule[0].match(regex)
    if (matches) {
      return matches.map(item => JSON.parse(item))
    }
  }
  return []
})

const userId = localStorage.getItem('userId')

const isCurrentUserPublication = computed(
  () => +userId === props?.publication?.user?.id
)

const createTourParticipant = async () => {
  toggleModal()
  await addTourParticipant({
    tourId: props?.tour?.id,
    userId: userId
  })
  location.reload()
}
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
      display: flex
      flex-direction: column
      gap: 0.75rem
      border: 1px solid rgba(208, 208, 208, 0.50)
      background: rgba(250, 250, 250, 0.70)
    &-wrapper
      flex: 1 0 auto
</style>
