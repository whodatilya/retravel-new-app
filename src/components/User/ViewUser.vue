<template>
  <div class="flex flex-col flex-1 gap-5 w-[60%]">
    <div class="flex flex-col gap-4 justify-center items-center">
      <div class="flex flex-row justify-center">
        <img
          src="@/assets/images/iconUserBig.svg"
          style="width: 145px"
          alt=""
        />
      </div>
      <div class="p-2 white-background br-8 flex w-fit flex-row justify-center">
        Имя Фамилия
      </div>
    </div>
    <div
      class="content-wrapper flex flex-col justify-center flex-auto gap-6 h-full wide-inputs"
    >
      <div class="flex flex-row [&>*]:w-full gap-8">
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
import { useForm } from 'vee-validate'
import { useAuthStore } from '@/store/auth/useAuthStore'

const { changeUserData } = useAuthStore()

const { handleSubmit } = useForm()

const submitUserData = () => {
  handleSubmit(async values => {
    await changeUserData(values)
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
    width: 100%
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
