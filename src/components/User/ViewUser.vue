<template>
  <div
    :class="{ 'w-[60%]': !isMobile, 'pb-5': isMobile }"
    class="flex flex-col flex-1 gap-5"
  >
    <div class="flex flex-col gap-4 justify-center items-center">
      <div class="flex flex-row justify-center">
        <img
          :src="profilePhotoUrl || require('@/assets/images/iconUserBig.svg')"
          style="width: 145px; height: 145px; border-radius: 50%"
          alt=""
        />
      </div>
      <input ref="myFiles" accept="image/*" @change="processFile" type="file" />
      <div class="p-2 white-background br-8 flex w-fit flex-row justify-center">
        {{ user?.name }} {{ user?.surname }}
      </div>
    </div>
    <div
      class="content-wrapper flex flex-col justify-center flex-auto gap-6 h-full wide-inputs"
    >
      <div
        :class="isMobile ? 'flex-col' : 'flex-row'"
        class="flex [&>*]:w-full gap-8"
      >
        <RetravelTextField
          :additional-style="{ height: '48px' }"
          field-name="name"
          label-text="Имя"
        />
        <RetravelTextField
          :additional-style="{ height: '48px' }"
          field-name="surname"
          label-text="Фамилия"
        />
      </div>
      <RetravelTextField
        :additional-style="{ height: '48px' }"
        field-name="email"
        label-text="Email"
      />
      <RetravelPhoneNumberField
        :additional-style="{ height: '48px' }"
        field-name="phone"
        label-text="Номер телефона"
      />
      <RetravelPasswordField
        :additional-style="{ height: '48px' }"
        field-name="password"
        label-text="Пароль"
      />
      <RetravelPasswordField
        :additional-style="{ height: '48px' }"
        field-name="repeatPassword"
        label-text="Повторите пароль"
      />
    </div>
    <div class="flex flex-row justify-center">
      <button class="button__edit" @click="submitUserData">Сохранить</button>
    </div>
  </div>
</template>

<script setup>
import RetravelTextField from '@/components/Fields/RetravelTextField.vue'
import RetravelPhoneNumberField from '@/components/Fields/RetravelPhoneNumberField.vue'
import RetravelPasswordField from '@/components/Fields/RetravelPasswordField.vue'
import { useField, useForm } from 'vee-validate'
import { useAuthStore } from '@/store/auth/useAuthStore'
import { computed, onMounted, ref } from 'vue'
import { defaultValidator } from '@/shared/validators/defaultValidator'

const myFiles = ref(null)
const profilePhotoUrl = ref(null)

const { changeUserData, getUser, changeProfilePhoto } = useAuthStore()

const userId = localStorage.getItem('userId')

const { handleSubmit, setValues } = useForm()
const user = ref(null)

const isMobile = computed(() => window.innerWidth < 768)

onMounted(async () => {
  user.value = await getUser(userId)
  profilePhotoUrl.value = user.value?.profilePhoto
  if (user.value) {
    setValues(user.value)
  }
})

const { value } = useField(() => 'profilePhoto', defaultValidator, {
  initialValue: null
})

const processFile = async () => {
  value.value = myFiles.value.files[0]
  const formData = new FormData()
  formData.append('profilePhoto', value.value)
  const response = await changeProfilePhoto(formData)

  // Создаем URL для отображения загруженного изображения
  profilePhotoUrl.value = URL.createObjectURL(value.value)
}

const submitUserData = () => {
  handleSubmit(async values => {
    const response = await changeUserData(userId, values)
    if (response) {
      user.value = await getUser(userId)
      if (user.value) {
        setValues(user.value)
      }
    }
  })()
}
</script>

<style scoped lang="sass">
.white-background
  background: white
.content-wrapper
  border-radius: 20px
  background: white
  padding: 1.5rem
  .carousel__item
    min-height: 200px
    width: 80%
    background-color: lightgreen
    color: white
    font-size: 20px
    border-radius: 8px
    display: flex
    justify-content: center
    align-items: center
  .carousel__slide
    padding: 4px
.button__edit
  color: white
  background: #4E944F
  width: 60%
  border-radius: 8px
  padding: 0.5rem 0
</style>
