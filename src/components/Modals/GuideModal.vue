<template>
  <div class="guide-modal__shadow">
    <div class="guide-modal__outer">
      <div class="guide-modal__inner br-12">
        <img class="w-fit" :src="iconFile" alt="Загрузка" />
        <div class="flex flex-col gap-2">
          <div class="fs-18 font-semibold">Загрузка аттестата</div>
          <div class="fs-14 color-main-gray">
            Загрузите аттестат экскурсовода, чтобы продолжить.
          </div>
        </div>
        <div class="drop-zone br-20" @click="selectFile">
          <input id="uploadFile" ref="myFiles" type="file" name="file" accept="application/pdf" />
          <img class="w-fit" :src="iconUpload" alt="" />
          <div class="w-[238px]">Перетащите файл или нажмите для загрузки</div>
        </div>
        <div class="flex flex-row justify-between gap-3">
          <button @click="closeModal" class="basis-[50%] button button__cancel">Отмена</button>
          <button @click="submitModal" class="basis-[50%] button button__submit">Продолжить</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import iconFile from '@/assets/images/iconFile.svg'
import iconUpload from '@/assets/images/iconUpload.svg'

export default defineComponent({
  name: 'GuideModal',
  data() {
    return {
      iconFile,
      iconUpload
    }
  },
  methods: {
    closeModal() {
      this.$emit('onClose')
    },
    submitModal() {
      this.$emit('onSubmit')
    },
    selectFile() {
      const fileInput = document.getElementById('uploadFile')
      fileInput.click()
    }
  }
})
</script>

<style scoped lang="sass">
.guide-modal
  &__shadow
    z-index: 1000
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: rgba(0, 0, 0, 0.5)
    display: table
    transition: opacity 0.3s ease
  &__outer
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
  &__inner
    display: flex
    flex-direction: column
    padding: 1.5rem
    gap: 1.25rem
    background: white
.drop-zone
  display: flex
  flex-direction: column
  justify-content: center
  position: relative
  align-items: center
  text-align: center
  width: 27rem
  height: 14rem
  border: 1px dashed #7D7D7D
  &:hover
    background: #f6f6f6
    cursor: pointer
  input
    display: none
.button
  border-radius: 8px
  &__submit
    color: white
    padding: 0.7rem 0
    background: #4E944F
  &__cancel
    border: 1px solid #D0D5DD
</style>
