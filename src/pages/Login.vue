<template>
  <div class="login-page">
    <div class="login__wrapper">
      <div class="login__form">
        <div class="form__header">Авторизация</div>
        <div class="form__subheader">
          Пожалуйста, войдите, чтобы продолжить работу
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
          <div class="form__label" style="padding-bottom: 5px">Пароль</div>
          <input
            v-model="password"
            class="form__input"
            type="password"
            placeholder="********"
            required
          />
        </div>
        <div class="form__button">
          <button @click="loginUser" type="submit">Войти</button>
        </div>
        <span class="form__subheader">
          Нет аккаунта?
          <a class="form__subheader_link" href="/signUp">Зарегистрироваться</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '@/router'
import { useAuthStore } from '@/store/auth/useAuthStore'

const { login } = useAuthStore()

const email = ref('')
const password = ref('')

const loginUser = async () => {
  const formData = {
    email: email.value,
    password: password.value
  }
  await login(formData)
    .then(response => {
      router.push({ path: '/' })
    })
    .catch(e => alert(`Не получается авторизироваться из-за ошибки - ${e}`))
}
</script>

<style scoped lang="sass">
.login
  &__wrapper
    display: flex
    border-radius: 40px
    background: rgba(255, 255, 255, 0.70)
    box-shadow: 0 0 22px 3px rgba(137, 137, 137, 0.25)
    width: 70%
    align-items: center
    justify-content: center
    height: 80%
    @media (max-width: 575.98px)
      transition: all 0.3s ease-out
      width: 95%
      height: 65%
    @media (min-width: 576px) and (max-width: 765.98px)
      transition: all 0.3s ease-out
      width: 80%
  &__form
    display: flex
    flex-direction: column
    gap: 15px
    align-items: center
  &__input-fields
    display: flex
    flex-wrap: wrap
    flex-direction: column
    width: 100%
    @media (max-width: 575.98px)
      transition: all 0.3s ease-out
      width: 100%
</style>
