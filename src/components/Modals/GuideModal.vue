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
        <RetravelFileField
          drop-zone-text="Нажмите для загрузки файла"
          field-name="documents"
          file-format="application/pdf"
        />
        <div class="flex flex-row justify-between gap-3">
          <button @click="closeModal" class="basis-[50%] button button__cancel">
            Отмена
          </button>
          <button
            @click="submitModal"
            class="basis-[50%] button button__submit"
          >
            Продолжить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineComponent, ref } from 'vue'
import iconFile from '@/assets/images/iconFile.svg'
import iconUpload from '@/assets/images/iconUpload.svg'
import RetravelFileField from '@/components/Fields/RetravelFileField.vue'
import { useForm } from 'vee-validate'

const dropZoneText = ref('Нажмите для загрузки файла')
// eslint-disable-next-line no-undef
const emit = defineEmits(['onClose', 'onSubmit'])

const { values } = useForm()

const closeModal = () => {
  emit('onClose')
}

const submitModal = () => {
  if (values.documents) {
    emit('onSubmit', values.documents)
    dropZoneText.value = 'Нажмите для загрузки файла'
  } else {
    dropZoneText.value = 'Для продолжения загрузите файл'
  }
}
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
    &:hover
      background: rgba(78, 148, 79, 0.85)
  &__cancel
    border: 1px solid #D0D5DD
    &:hover
      background: rgba(234, 234, 234, 0.85)
</style>
