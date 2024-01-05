import { createStore } from 'vuex'
import user from '@/store/user'
import modals from '@/store/modals'
import components from '@/store/components'

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    modals,
    components
  }
})
