<template>
  <div class="marker__modal_shadow">
    <div class="marker__modal_outer">
      <div class="marker__modal_inner br-12">
        <img width="48" src="@/assets/images/iconMarker.svg" alt="" />
        <span>Новая точка</span>
        <RetravelTextField label-text="Наименование" field-name="name" />
        <RetravelTextareaField label-text="Описание" field-name="description" />
        <RetravelFileField
          style="width: 100%"
          field-name="travelPointImages"
          drop-zone-text="Перетащите файл или нажмите для загрузки"
        />
        <RetravelCheckboxField
          field-name="isPublic"
          label-text="Сделать точку публичной"
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
import RetravelTextField from '@/components/Fields/RetravelTextField.vue'
import RetravelTextareaField from '@/components/Fields/RetravelTextareaField.vue'
import RetravelFileField from '@/components/Fields/RetravelFileField.vue'
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import RetravelCheckboxField from '@/components/Fields/RetravelCheckboxField.vue'

// eslint-disable-next-line no-undef
const emit = defineEmits(['onClose', 'onSubmit'])

const { values } = useForm()
const closeModal = () => {
  emit('onClose')
}

const submitModal = () => {
  emit('onSubmit', values)
}
</script>

<style lang="sass" scoped>
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
.marker__modal
  &_shadow
    z-index: 1000
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: rgba(30, 30, 30, 0.5)
    display: table
    transition: opacity 0.3s ease
  &_outer
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
  &_inner
    display: flex
    flex-direction: column
    padding: 1.5rem
    gap: 1.25rem
    background: white
    width: 500px
    @media (max-width: 768px)
      width: 90vw
</style>
