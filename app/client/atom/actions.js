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

function pickFilm ({ set }, payload) {
  set({
    pickFilmCriteria: payload
  })
}

function clearPickedFilm ({ set }) {
  set({
    pickFilmCriteria: null
  })
}

export default {
  openModal,
  closeModal,
  submitLoginForm,
  updateUser,
  pickFilm,
  clearPickedFilm
}
