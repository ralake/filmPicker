import userService from '../lib/user-service'

function updateUser ({ get, set }, payload) {
  set({
    user: {
      ...get().user || {},
      ...payload
    }
  })
}

function submitLoginForm ({ get, set }, payload) {
  const { email, password } = payload
  userService.login(email, password)
}

function openModal ({ set }, payload) {
  const { show, type, data } = payload
  set({
    modal: {
      show,
      type,
      data
    }
  })
}

function closeModal ({ set }) {
  set({ modal: null })
}

export default {
  openModal,
  closeModal,
  submitLoginForm,
  updateUser
}
