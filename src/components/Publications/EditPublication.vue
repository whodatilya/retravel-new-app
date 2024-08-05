<template>
  <div class="flex flex-col basis-7/12 gap-2.5 w-[60%]">
    <div class="content-wrapper flex flex-col h-full p-1.5">
      <span class="fs-18 font-semibold pb-6">Новая публикация</span>
      <div class="content flex flex-col grow gap-4 br-20 mb-4">
        <div class="drop-zone br-20" @click="selectFile">
          <input
            id="uploadFile"
            ref="myFiles"
            type="file"
            name="file"
            accept="application/pdf"
            @change="processFile"
          />
          <img class="w-fit" src="@/assets/images/iconUpload.svg" alt="" />
          <div class="w-[238px]">{{ dropZoneText }}</div>
        </div>
        <button
          class="button__pave fs-14 font-semibold"
          @click="router.push({ name: 'editRoute', params: { routeId: 1 } })"
        >
          Редактировать публикацию
        </button>
        <RetravelTextField label-text="Название" />
        <RetravelTextareaField label-text="Описание" />
      </div>
      <div class="flex flex-row justify-between">
        <button class="button__delete">Удалить</button>
        <button class="button__save">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { ref } from 'vue'
import RetravelTextField from '@/components/Fields/RetravelTextField.vue'
import RetravelTextareaField from '@/components/Fields/RetravelTextareaField.vue'
import router from '@/router'

const dropZoneText = 'Перетащите изображение или нажмите для загрузки'
let file = ref(null)
const selectFile = () => {
  const fileInput = document.getElementById('uploadFile')
  fileInput.click()
}
const processFile = () => {
  file.value = this.$refs.myFiles.files[0]
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
.content
  display: flex
  flex-direction: column
  background: #FAFAFA
  padding: 1.5rem
  border: 1px solid #efefef
.drop-zone
  display: flex
  flex-direction: column
  justify-content: center
  position: relative
  align-items: center
  text-align: center
  min-height: 150px
  height: 150px
  border: 1px dashed #7D7D7D
  &:hover
    background: #f6f6f6
    cursor: pointer
  input
    display: none
.button
  &__pave
    color: white
    background: #4E944F
    border-radius: 8px
    padding: 0.5rem 0
  &__delete
    width: 135px
    border-radius: 10px
    padding: 10px 18px
    background: #FF7272
    color: white
    @media (max-width: 768px)
      padding: 10px 12px
  &__save
    width: 135px
    border-radius: 10px
    padding: 10px 18px
    background: #4E944F
    color: white
    @media (max-width: 768px)
      padding: 10px 12px
</style>
