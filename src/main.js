import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createYmaps } from "vue-yandex-maps";
import '@/styles/tailwind.css'

createApp(App)
  .use(store)
  .use(router)
  .use(createYmaps({
    apikey: '4cccfb99-09ff-4d82-8717-3b1c22fe295f',
    lang: 'ru_RU'
  }))
  .mount('#app')
