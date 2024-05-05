<template>
  <div class="login-page">
    <div class="login__wrapper">
      <div class="login__form">
        <div class="form__header">Регистрация</div>
        <div class="form__subheader">
          Пожалуйста, создайте аккаунт, чтобы продолжить работу
        </div>
        <div class="login__input-fields_partly">
          <div>
            <div class="form__label" style="padding-bottom: 5px">Имя</div>
            <input
              v-model="firstName"
              class="form__input"
              type="text"
              placeholder="Имя"
              autocomplete="false"
              required
            />
          </div>
          <div>
            <div class="form__label" style="padding-bottom: 5px">Фамилия</div>
            <input
              v-model="secondName"
              class="form__input"
              type="text"
              placeholder="Фамилия"
              autocomplete="false"
              required
            />
          </div>
        </div>
        <div class="login__input-fields">
          <div class="form__label" style="padding-bottom: 5px">Email</div>
          <input
            v-model="email"
            class="form__input"
            type="email"
            placeholder="you@company.com"
            autocomplete="false"
            required
          />
        </div>
        <div class="login__input-fields">
          <div class="form__label" style="padding-bottom: 5px">
            Номер телефона
          </div>
          <input
            v-model="phoneNumber"
            v-mask="'+ # (###) ### ## ##'"
            placeholder="+ 7 (900) 000-00-00"
            class="form__input"
            type="text"
            autocomplete="false"
            required
          />
        </div>
        <div class="login__input-fields">
          <div class="form__label" style="padding-bottom: 5px">Пароль</div>
          <input
            v-model="password"
            class="form__input"
            type="password"
            placeholder="********"
            required
          />
        </div>
        <div class="login__input-fields">
          <div class="form__label" style="padding-bottom: 5px">
            Повторите пароль
          </div>
          <input
            v-model="repassword"
            class="form__input"
            type="password"
            placeholder="********"
            required
          />
        </div>
        <div class="checkboxes">
          <div class="checkbox">
            <input
              type="checkbox"
              v-model="checked_policy"
              required
              style="margin-right: 5px"
            />
            <div>
              Принимаю условия
              <a href="https://retravel.tech/privacy"
                >политики конфиденциальности.</a
              >
            </div>
          </div>
          <div class="checkbox">
            <input
              type="checkbox"
              v-model="checked_guide"
              style="margin-right: 5px"
            />
            <div>
              Я гид (необходим
              <a href="https://www.gosuslugi.ru/543222/2/info"
                >аттестат экскурсовода</a
              >)
            </div>
          </div>
        </div>
        <div class="form__button">
          <button @click="registerUser" type="submit">Создать аккаунт</button>
        </div>
        <span class="form__subheader">
          Есть аккаунт? <a class="form__subheader_link" href="/login">Войти</a>
        </span>
      </div>
    </div>
    <guide-modal
      v-if="isModalOpened"
      @onClose="toggleModal"
      @onSubmit="processFormFile"
    />
  </div>
</template>

<script setup>
import { mask } from 'vue-the-mask'
import GuideModal from '@/components/Modals/GuideModal.vue'
import { ref, watch } from 'vue'
import router from '@/router'
import { useAuthStore } from '@/store/auth/useAuthStore'

const { register } = useAuthStore()

const vMask = mask

const firstName = ref('')
const secondName = ref('')
const email = ref('')
const phoneNumber = ref('')
const password = ref('')
const repassword = ref('')

const guideCertificate = ref(null)
const checked_policy = ref(false)
const checked_guide = ref(false)
const isModalOpened = ref(false)

const toggleModal = () => {
  isModalOpened.value = !isModalOpened.value
}
const processFormFile = formData => {
  guideCertificate.value = formData
  toggleModal()
}

const registerUser = async () => {
  if (
    password.value?.length &&
    password.value === repassword.value &&
    checked_policy.value
  ) {
    const formData = {
      name: firstName.value,
      surname: secondName.value,
      email: email.value,
      phone: phoneNumber.value,
      password: password.value,
      repeatPassword: repassword.value,
      role: 'ROLE_TOURIST',
      documents: ['']
    }
    if (checked_guide.value && guideCertificate.value) {
      formData.guideCertificate = guideCertificate.value
    }
    await register(formData)
      .then(response => {
        router.push({ path: '/login' })
      })
      .catch(e => alert(`Не получается зарегистрироваться из-за ошибки - ${e}`))
  } else {
    alert(
      'Пароли не совпадают или не приняты условия политики конфиденциальности'
    )
  }
}
watch(
  () => checked_guide.value,
  value => {
    if (value) {
      isModalOpened.value = true
    }
  }
)
</script>

<style scoped lang="sass">
.login
  &__wrapper
    display: flex
    border-radius: 40px
    background: rgba(255, 255, 255, 0.70)
    box-shadow: 0 0 22px 3px rgba(137, 137, 137, 0.25)
    width: 75%
    min-height: 85%
    max-height: 100%
    height: fit-content
    padding: 20px 0
    align-items: center
    justify-content: center
    @media (max-width: 576px)
      transition: all 0.3s ease-out
      width: 95%
      height: fit-content
      padding: 5px 0
    @media (min-width: 576px) and (max-width: 765.98px)
      transition: all 0.3s ease-out
      width: 85%
  &__form
    display: flex
    flex-direction: column
    gap: 8px
    align-items: center
    @media (max-width: 576px)
      gap: 3px
  &__input-fields
    display: flex
    flex-wrap: wrap
    flex-direction: column
    width: 100%
    &_partly
      display: flex
      flex-wrap: wrap
      flex-direction: row
      flex-basis: 50%
      gap: 10px
      width: fill-available
      justify-content: space-between
      @media (max-width: 576px)
        flex-direction: column
.checkboxes
  display: flex
  width: 100%
  flex-wrap: wrap
  flex-direction: column
  .checkbox
    display: flex
    align-items: center
    color: #7D7D7D
    font-family: Inter, sans-serif
    font-size: 14px
    font-style: normal
    font-weight: 500
    line-height: 24px
    @media (max-width: 576px)
      font-size: 9px
    a
      text-decoration: none
      color: #7D7D7D
      font-weight: 700
.field_container
  @media (max-width: 576px)
    width: 100%
.input-width-fix
  @media (max-width: 576px)
    width: fill-available
.form
  &__input
    border-radius: 30px
    border: none
    outline: none
    padding: 8px 16px
    background: #FFF
    box-shadow: 0 10px 30px 0 rgb(0 0 0 / 15%)
    @media (max-width: 576px)
      width: fill-available
      font-size: 12px
      padding: 8px 12px
</style>
