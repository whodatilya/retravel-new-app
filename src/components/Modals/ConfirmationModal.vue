<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <div class="fs-14">
        Нажимая кнопку "Далее" вы соглашаетесь с правилами платформы. Вы будете
        переведены на форму оплаты, после чего вам будет предоставлена вся
        необходимая информация для связи с гидом.
      </div>
      <hr class="w-full line" />
      <div class="flex flex-row justify-between w-full">
        <button @click="closeModal" class="button button__cancel">
          Отменить
        </button>
        <button @click="submitModal" class="button button__submit">
          Продолжить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// eslint-disable-next-line no-undef
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  imageSrc: {
    type: String,
    default: ''
  }
})
// eslint-disable-next-line no-undef
const emit = defineEmits(['close', 'submit'])

const closeModal = () => {
  emit('close')
}

const submitModal = () => {
  emit('submit')
}
</script>

<style scoped lang="sass">
.modal-overlay
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  background: rgba(0, 0, 0, 0.5)
  display: flex
  justify-content: center
  align-items: center
  overflow: hidden


.modal-content
  background: white
  padding: 30px
  border-radius: 8px
  position: relative
  max-width: 400px
  max-height: 300px
  display: flex
  gap: 1rem
  flex-direction: column
  align-items: center

.line
  opacity: 0.8
.button
  padding: 6px 18px
  font-size: 14px
  border-radius: 8px
  border: none
  &__submit
    background: #4E944F
    color: white
  &__cancel
    background: lightgray
    color: black
    border: 1px solid gray
</style>
