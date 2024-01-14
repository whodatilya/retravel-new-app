<template>
  <div class="error-modal" v-if="isVisible">
    <div class="modal-content">
      <p>{{ errorMessage }}</p>
      <button @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
      errorMessage: '',
    };
  },
  methods: {
    openModal(errorMessage) {
      this.errorMessage = errorMessage;
      this.isVisible = true;
    },
    closeModal() {
      this.isVisible = false;
    },
  },
};
</script>

<style scoped lang="sass">
/* стили модального окна */
.error-modal
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: rgba(0, 0, 0, 0.5)
  display: flex
  justify-content: center
  align-items: center
.modal-content
  background: #fff
  padding: 20px
  border-radius: 8px
</style>