<template>
  <div class="flex flex-col flex-1 gap-2.5 w-[60%]">
    <div class="content-wrapper flex flex-col flex-auto gap-6 h-full">
      <div class="flex flex-row">
        <div class="fs-18 font-semibold">Новая публикация</div>
      </div>
      <RetravelFileField
        class="!w-full !h-[27rem]"
        drop-zone-text="Перетащите изображение или нажмите для загрузки"
        @process-file="onFileProcess"
      />
      <div
        class="flex flex-row gap-2.5 justify-center new-button br-8 cursor-pointer"
        @click="123"
      >
        <span class="fs-14 font-semibold">Проложить маршрут</span>
      </div>
      <RetravelTextField label-text="Название" />
      <RetravelTextareaField label-text="Описание" />
      <div class="flex flex-row justify-between">
        <button class="button__delete">Удалить</button>
        <button class="button__save">Опубликовать</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import 'vue3-carousel/dist/carousel.css'
import RetravelFileField from '@/components/Fields/RetravelFileField.vue'
import { ref } from 'vue'
import RetravelTextField from '@/components/Fields/RetravelTextField.vue'
import RetravelTextareaField from '@/components/Fields/RetravelTextareaField.vue'

const router = useRouter()

const userFile = ref(null)

const onFileProcess = file => {
  userFile.value = file
}
const openMap = () => {
  router.push({ path: 'map' })
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
  &__save
    border-radius: 10px
    padding: 10px 18px
    background: #4E944F
    color: white
</style>
