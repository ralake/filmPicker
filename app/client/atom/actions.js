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
  const { type, data } = payload
  set({
    modal: {
      type,
      data
    }
  })
}

function closeModal ({ set }) {
  set({ modal: null })
}

/* NEW */

function showSnackbar ({ get, set }, payload) {
  set({
    snackbar: {
      ...get().snackbar,
      ...payload
    }
  })
}

export default {
  openModal,
  closeModal,
  submitLoginForm,
  updateUser,
  showSnackbar
}
