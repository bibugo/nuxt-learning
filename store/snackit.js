export const state = () => ({
  message: '',
  type: 'success', //success info warning error
  timeout: 2000,
  dismissible: false,
  show: false,
})

export const mutations = {
  setShow(state, show) {
    state.show = show
  },
  snackIt(state, snack) {
    if (typeof snack === 'object') {
      state.type = snack['type'] ? snack['type'] : 'success'
      state.timeout = snack['timeout'] ? snack['timeout'] : 2000
      state.dismissible = snack['dismissible'] ? snack['dismissible'] : false
      state.message = snack['message'] ? snack['message'] : ''
      state.show = true
    } else {
      state.message = snack
      state.show = true
    }
  }
}
