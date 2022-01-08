import { createStore } from 'vuex'
import tasksModule from './modules/tasks'
import alertModule from "./modules/alert"

export default createStore({
  modules: {
    tasks: tasksModule,
    alert: alertModule
  },
  state() {
    return {
      isLoading: false,
    }
  },
  getters: {
    getLoading(state) {
      return state.isLoading
    }
  },
  mutations: {
    handlerLoading(state, boolean) {
      return state.isLoading = boolean
    },
  }
})
