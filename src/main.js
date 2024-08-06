import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { createYmaps } from 'vue-yandex-maps'
import '@/styles/tailwind.css'
import '@hennge/vue3-pagination/dist/vue3-pagination.css'

const pinia = createPinia()

createApp(App)
  .use(router)
  .use(pinia)
  .use(
    createYmaps({
      apikey: '4cccfb99-09ff-4d82-8717-3b1c22fe295f',
      lang: 'ru_RU'
    })
  )
  .mount('#app')
