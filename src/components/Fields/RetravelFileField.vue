<template>
  <div class="drop-zone br-20" @click="selectFile">
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
    <img class="w-fit" src="@/assets/images/iconUpload.svg" alt="" />
    <div class="w-[238px]">{{ dropZoneText }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
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
  value.value = props.multiple ? myFiles.value.files : myFiles.value.files[0]
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
  &:hover
    background: #f6f6f6
    cursor: pointer
  input
    display: none
</style>
