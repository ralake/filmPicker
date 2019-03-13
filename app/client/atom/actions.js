import userService from '../lib/user-service'

function showAddFilmForm ({ get, set }, payload) {
  set({
    showModalOverlay: payload.show,
    addFilmFormShowing: payload.show,
    listToAddFilmTo: payload.list
  })
}

function showEditFilmForm ({ get, set }, payload) {
  set({
    showModalOverlay: payload.show,
    editFilmFormShowing: payload.show,
    filmToEdit: payload.id
  })
}

function showPickFilmForm ({ get, set }, payload) {
  set({
    showModalOverlay: payload.show,
    showPickFilmForm: payload.show
  })
}

function showLoginForm ({ get, set }, payload) {
  set({
    showModalOverlay: payload.show,
    showLoginForm: payload.show
  })
}

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

export default {
  showPickFilmForm,
  showAddFilmForm,
  showEditFilmForm,
  showLoginForm,
  submitLoginForm,
  updateUser
}
