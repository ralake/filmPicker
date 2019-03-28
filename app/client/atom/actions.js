/* payload { show, message, duration, type } */
function showSnackbar ({ get, set }, payload) {
  set({
    snackbar: {
      ...get().snackbar,
      ...payload
    }
  })
}

/* payload { show, action, film } */
function showFilmForm ({ get, set }, payload) {
  set({
    filmForm: {
      ...get().filmForm,
      ...payload
    }
  })
}

/* payload { show } */
function showLoginForm ({ set }, payload) {
  set({ showLoginForm: payload.show })
}

export default {
  showLoginForm,
  showSnackbar,
  showFilmForm
}
