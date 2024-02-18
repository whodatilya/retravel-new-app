<template>
  <div class="flex flex-col gap-[6px]" style="height: -webkit-fill-available">
    <span class="color-main-gray font-semibold fs-12">{{ labelText }}</span>
    <textarea class="retravel__input h-full" type="text" v-model="modelValue" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

let modelValue = ref('')

// eslint-disable-next-line no-undef
defineProps({
  labelText: {
    type: String,
    default: 'Наименование'
  }
})

watch(
  () => modelValue.value,
  newValue => {
    console.log(newValue)
  }
)
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
