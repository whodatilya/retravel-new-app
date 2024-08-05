<template>
  <div class="flex flex-col gap-4">
    <div
      v-for="(schedule, index) in schedules"
      :key="index"
      class="flex flex-col gap-2"
    >
      <RetravelDateField label-text="Дата" v-model="schedule.date" />
      <RetravelTextField label-text="Локация" v-model="schedule.location" />
      <RetravelTextField label-text="Активность" v-model="schedule.activity" />
      <button class="button__delete" @click="removeSchedule(index)">
        Удалить
      </button>
    </div>
    <button class="button__add" @click="addSchedule">
      Добавить расписание
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import RetravelDateField from '@/components/Fields/RetravelDateField.vue'
import RetravelTextField from '@/components/Fields/RetravelTextField.vue'

// eslint-disable-next-line no-undef
const props = defineProps({
  fieldName: {
    type: String,
    required: true
  }
})

const schedules = ref([{ date: '', location: '', activity: '' }])

const addSchedule = () => {
  schedules.value.push({ date: '', location: '', activity: '' })
}

const removeSchedule = index => {
  schedules.value.splice(index, 1)
}

watch(
  schedules,
  newVal => {
    emit('update:modelValue', newVal)
  },
  { deep: true }
)
// eslint-disable-next-line no-undef
const emit = defineEmits(['update:modelValue'])
</script>

<style lang="sass" scoped>
.button__add
  background: #4E944F
  color: white
  border-radius: 8px
  padding: 0.5rem 1rem
  margin-top: 1rem
  cursor: pointer

  &:hover
    background: rgba(78, 148, 79, 0.85)

.button__delete
  background: #FF7272
  color: white
  border-radius: 8px
  padding: 0.5rem 1rem
  cursor: pointer

  &:hover
    background: rgba(255, 114, 114, 0.85)
</style>
