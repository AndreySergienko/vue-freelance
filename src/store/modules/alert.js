export default {
  state() {
    return {
      alert: {
        msg: '',
        isOpen: false,
        type: 'error'
      }
    }
  },
  getters: {
    getAlert(state) {
      return state.alert
    }
  },
}
