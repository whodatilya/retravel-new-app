<template>
  <div :class="{ 'w-[60%]': !isMobile }" class="flex flex-col flex-1 gap-2.5">
    <div class="content-wrapper flex flex-col flex-auto gap-6 h-full">
      <span class="fs-18 font-semibold">Новый тур</span>
      <div
        :class="isMobile ? 'flex-col' : 'flex-row'"
        class="flex flex-row gap-7 justify-between"
      >
        <div class="flex flex-col gap-4 basis-4/5">
          <RetravelTextField label-text="Название" field-name="name" />
          <RetravelNumberField label-text="Стоимость" field-name="price" />
          <RetravelNumberField
            label-text="Количество человек"
            field-name="participantsCount"
          />
          <RetravelDateField label-text="Дата" field-name="date" />
        </div>
        <div>
          <RetravelFileField
            :class="isMobile ? 'h-full' : '!h-full'"
            class="!w-auto"
            field-name="tourImages"
            multiple
          />
        </div>
      </div>
      <div
        class="flex flex-row gap-2.5 justify-center new-button br-8 cursor-pointer"
        @click="createRoute"
      >
        <span class="fs-14 font-semibold">Проложить маршрут</span>
      </div>
      <RetravelTextareaField label-text="Описание" field-name="description" />
      <span class="color-main-gray font-semibold fs-12">Расписание</span>
      <hr />
      <RetravelScheduleField field-name="schedule" />
      <div class="flex flex-row justify-between">
        <button class="button__delete">Удалить</button>
        <button class="button__save" @click="emit('submit')">
          Опубликовать
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import 'vue3-carousel/dist/carousel.css'
import RetravelFileField from '@/components/Fields/RetravelFileField.vue'
import { computed, ref } from 'vue'
import RetravelTextField from '@/components/Fields/RetravelTextField.vue'
import RetravelTextareaField from '@/components/Fields/RetravelTextareaField.vue'
import RetravelDateField from '@/components/Fields/RetravelDateField.vue'
import RetravelNumberField from '@/components/Fields/RetravelNumberField.vue'
import RetravelScheduleField from '@/components/Fields/RetravelScheduleField.vue'

const router = useRouter()

// eslint-disable-next-line no-undef
const emit = defineEmits(['submit'])

const isMobile = computed(() => window.innerWidth < 768)

const createRoute = () => {
  router.push({
    name: 'createRoute',
    query: {
      create: true,
      isTour: true
    }
  })
}
</script>

<style scoped lang="sass">
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
.new-button
  background: #4E944F
  padding: 11px 12px
  span
    color: white
  &:hover
    background: rgba(78, 148, 79, 0.85)
.button
  &__delete
    width: 135px
    border-radius: 10px
    padding: 10px 18px
    background: #FF7272
    color: white
    @media (max-width: 768px)
      padding: 10px 12px
  &__save
    border-radius: 10px
    padding: 10px 18px
    background: #4E944F
    color: white
    @media (max-width: 768px)
      padding: 10px 12px
</style>
