import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { createYmaps } from 'vue-yandex-maps'
import '@/styles/tailwind.css'
import '@hennge/vue3-pagination/dist/vue3-pagination.css'
import PrimeVue from 'primevue/config'

const pinia = createPinia()

createApp(App)
  .use(router)
  .use(pinia)
  .use(PrimeVue)
  .use(
    createYmaps({
      apikey: '4cccfb99-09ff-4d82-8717-3b1c22fe295f',
      lang: 'ru_RU',
      servicesApikeys: { router: 'b8489477-ecaa-4b7e-8cc3-db53cc1903d9' }
    })
  )
  .mount('#app')
