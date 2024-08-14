<template>
  <div class="flex flex-row gap-2 items-center">
    <input
      class="retravel__checkbox"
      :style="additionalStyle"
      type="checkbox"
      v-model="value"
    />
    <span class="color-main-gray font-semibold fs-12">{{ labelText }}</span>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useField } from 'vee-validate'
import { defaultValidator } from '@/shared/validators/defaultValidator'

let modelValue = ref(false)

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

const { value } = useField(() => props.fieldName, defaultValidator, {
  initialValue: false
})
</script>

<style lang="sass" scoped>
.retravel
  &__checkbox
    outline: none
    padding: 6px
    border: 1px solid #D0D0D0
    border-radius: 4px
    height: 20px
    width: 20px
</style>
