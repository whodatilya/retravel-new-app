<template>
  <div class="login-page">
    <div class="login__wrapper">
      <div class="login__form">
        <div class="form__header">Авторизация</div>
        <div class="form__subheader">Пожалуйста, войдите, чтобы продолжить работу</div>
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
          <button @click="login" type="submit">Войти</button>
        </div>
        <span class="form__subheader">
          Нет аккаунта? <a class="form__subheader_link" href="/signUp">Зарегистрироваться</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      await this.$store
        .dispatch('user/login', {
          login: this.email,
          password: this.password
        })
        .then(response => {
          this.$router.push({ path: '/' })
        })
        .catch(e => {
          alert(`Не получается авторизироваться из-за ошибки - ${e}`)
        })
    }
  }
}
</script>

<style scoped lang="sass">
.login
  &__wrapper
    display: flex
    border-radius: 40px
    background: rgba(255, 255, 255, 0.70)
    box-shadow: 0 0 22px 3px rgba(137, 137, 137, 0.25)
    width: 65%
    align-items: center
    justify-content: center
    height: 80%
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
</style>
