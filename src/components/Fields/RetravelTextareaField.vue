<template>
  <div
    class="flex flex-col gap-[6px]"
    style="
      height: -moz-available;
      height: -webkit-fill-available;
      height: fill-available;
    "
  >
    <span class="color-main-gray font-semibold fs-12">{{ labelText }}</span>
    <textarea
      :style="additionalStyle"
      class="retravel__input h-full"
      type="text"
      v-model="value"
    />
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
    default: 'Наименование'
  },
  fieldName: {
    type: String
  },
  additionalStyle: {
    type: Object,
    required: false
  }
})

const { value } = useField(() => props.fieldName, defaultValidator, {
  initialValue: null
})
</script>

<style lang="sass" scoped>
.retravel
  &__input
    resize: none
    outline: none
    padding: 6px
    border: 1px solid #D0D0D0
    border-radius: 8px
</style>
