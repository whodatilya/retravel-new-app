<template>
  <div class="flex flex-col gap-[6px]">
    <span class="color-main-gray font-semibold fs-12">{{ labelText }}</span>
    <input class="retravel__input" type="text" v-model="modelValue" />
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
    outline: none
    padding: 6px
    border: 1px solid #D0D0D0
    border-radius: 8px
    height: 30px
</style>
