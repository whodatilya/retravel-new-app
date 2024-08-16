<template>
  <div
    class="drop-zone br-20"
    :class="{ 'drop-zone__filled': isFilled }"
    @click="selectFile"
  >
    <input
      id="uploadFile"
      ref="myFiles"
      type="file"
      :style="additionalStyle"
      name="file"
      :multiple="multiple"
      :accept="fileFormat"
      @change="processFile"
    />
    <template v-if="!previews.length">
      <div class="flex flex-col gap-2 items-center">
        <img class="w-fit" src="@/assets/images/iconUpload.svg" alt="" />
        <div class="w-[238px]">{{ preparedDropZoneText }}</div>
      </div>
    </template>
    <div v-if="previews.length" class="previews">
      <img
        v-for="(preview, index) in previews"
        :key="index"
        :src="preview"
        alt="Preview"
        class="preview-image"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useField } from 'vee-validate'
import { defaultValidator } from '@/shared/validators/defaultValidator'

// eslint-disable-next-line no-undef
const props = defineProps({
  dropZoneText: {
    type: String,
    default: 'Нажмите для загрузки файла'
  },
  fieldName: {
    type: String,
    default: null
  },
  fileFormat: {
    type: String,
    default: 'image/*'
  },
  multiple: {
    type: Boolean,
    default: false
  },
  additionalStyle: {
    type: Object,
    required: false
  }
})

const myFiles = ref(null)
const previews = ref([])

// eslint-disable-next-line no-undef
const emit = defineEmits(['processFile'])
const selectFile = () => {
  const fileInput = document.getElementById('uploadFile')
  fileInput.click()
}

const { value } = useField(() => props.fieldName, defaultValidator, {
  initialValue: props.multiple ? [] : null
})

const isFilled = computed(
  () => (value.value || value.value?.length) && !props.multiple
)

const preparedDropZoneText = computed(() => {
  return isFilled.value ? 'Файл успешно загружен' : props.dropZoneText
})

const MAX_FILE_SIZE = 3.5 * 1024 * 1024 // 3.5 MB in bytes

const processFile = () => {
  previews.value = []
  const files = myFiles.value.files

  if (props.multiple) {
    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        alert(`Файл ${file.name} превышает максимальный размер 3.5 МБ.`)
        return
      }
      value.value.push(file)
      previews.value.push(URL.createObjectURL(file))
    }
  } else {
    const file = files[0]
    if (file.size > MAX_FILE_SIZE) {
      alert(`Файл ${file.name} превышает максимальный размер 3.5 МБ.`)
      return
    }
    value.value = file
    previews.value.push(URL.createObjectURL(file))
  }
}
</script>

<style lang="sass" scoped>
.drop-zone
  display: flex
  flex-direction: column
  justify-content: center
  position: relative
  align-items: center
  text-align: center
  width: 27rem
  height: 14rem
  border: 1px dashed #7D7D7D

  &__filled
    background: #f6f6f6

  &:hover
    background: #f6f6f6
    cursor: pointer

  input
    display: none

  .previews
    display: flex
    flex-wrap: wrap
    margin-top: 1rem

    .preview-image
      max-width: 100px
      max-height: 100px
      margin: 0.5rem
</style>
