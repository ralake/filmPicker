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

function showLoginForm ({ set }, payload) {
  set({ showLoginForm: payload.show })
}

export default {
  showLoginForm,
  showSnackbar,
  showFilmForm
}
