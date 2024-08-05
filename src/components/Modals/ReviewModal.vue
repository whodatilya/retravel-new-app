<template>
  <div class="marker__modal_shadow">
    <div class="marker__modal_outer">
      <div class="marker__modal_inner br-12">
        <img width="48" src="@/assets/images/iconStar.svg" alt="" />
        <span>Новый отзыв</span>
        <RetravelDropdownField
          :options="[
            { value: '5', label: 'Отлично' },
            { value: '4', label: 'Хорошо' },
            { value: '3', label: 'Удовлетворительно' },
            { value: '2', label: 'Плохо' },
            { value: '1', label: 'Очень плохо' }
          ]"
          field-name="rating"
        />
        <RetravelTextareaField label-text="Описание" field-name="description" />
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
import RetravelTextareaField from '@/components/Fields/RetravelTextareaField.vue'
import { useForm } from 'vee-validate'
import RetravelDropdownField from '@/components/Fields/RetravelDropdownField.vue'

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
</style>
