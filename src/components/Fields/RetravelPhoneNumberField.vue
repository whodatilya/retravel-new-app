<template>
  <div class="flex flex-col gap-[6px]">
    <span class="color-main-gray font-semibold fs-12">{{ labelText }}</span>
    <input
      :style="additionalStyle"
      v-model="value"
      v-mask="'+ # (###) ### ## ##'"
      placeholder="+ 7 (900) 000-00-00"
      class="retravel__input"
      type="text"
      autocomplete="false"
      required
    />
  </div>
</template>

<script setup>
import { mask } from 'vue-the-mask'

const vMask = mask
import { ref } from 'vue'
import { useField } from 'vee-validate'
import { defaultValidator } from '@/shared/validators/defaultValidator'
// eslint-disable-next-line no-undef
const props = defineProps({
  labelText: {
    type: String,
    default: 'Наименование'
  },
  fieldName: {
    type: String,
    required: true
  },
  additionalStyle: {
    type: Object,
    required: false
  }
})

const myFiles = ref(null)
// eslint-disable-next-line no-undef
const emit = defineEmits(['processFile'])
const selectFile = () => {
  const fileInput = document.getElementById('uploadFile')
  fileInput.click()
}

const { value } = useField(() => props.fieldName, defaultValidator, {
  initialValue: null
})

const processFile = () => {
  value.value = myFiles.value.files
}
</script>
<style lang="sass" scoped>
.retravel
  &__input
    outline: none
    padding: 6px
    border: 1px solid #D0D0D0
    border-radius: 8px
    height: 30px
</style>
