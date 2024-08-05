<template>
  <div class="flex flex-col gap-[6px]">
    <span class="color-main-gray font-semibold fs-12">{{ labelText }}</span>
    <select class="retravel__input" :style="additionalStyle" v-model="value">
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useField } from 'vee-validate'
import { defaultValidator } from '@/shared/validators/defaultValidator'

let modelValue = ref('')

// eslint-disable-next-line no-undef
const props = defineProps({
  labelText: {
    type: String,
    default: 'Выберите'
  },
  fieldName: {
    type: String,
    required: true
  },
  additionalStyle: {
    type: Object,
    required: false
  },
  options: {
    type: Array,
    required: true,
    default: () => []
  }
})

const { value } = useField(() => props.fieldName, defaultValidator, {
  initialValue: null
})
</script>

<style lang="sass" scoped>
.retravel
  &__input
    outline: none
    padding: 6px
    border: 1px solid #D0D0D0
    border-radius: 8px
    height: 30px
    appearance: none
    background-color: white
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6"><path fill="%23D0D0D0" d="M0 0l5 5 5-5z"/></svg>')
    background-repeat: no-repeat
    background-position: right 10px center
    padding-right: 30px
</style>
