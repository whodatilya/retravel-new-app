<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <span class="close-button" @click="closeModal">&times;</span>
      <img :src="imageSrc" alt="Modal Image" class="modal-image" />
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
const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 8px;
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}

.modal-image {
  max-width: 100%;
  max-height: 600px;
  object-fit: contain;
}
</style>
