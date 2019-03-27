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

/* NEW */

function showSnackbar ({ get, set }, payload) {
  set({
    snackbar: {
      ...get().snackbar,
      ...payload
    }
  })
}

function showFilmForm ({ get, set }, payload) {
  set({
    filmForm: {
      ...get().filmForm,
      ...payload
    }
  })
}

export default {
  submitLoginForm,
  updateUser,
  showSnackbar,
  showFilmForm
}
