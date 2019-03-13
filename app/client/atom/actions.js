import _ from 'lodash'
import filmService from '../lib/film-service'
import userService from '../lib/user-service'

function removeFilm ({ get }, payload) {
  filmService.remove(payload.id, payload.list)
}

function updateFilms ({ get, set }, payload) {
  set({ films: payload.films })
}

function showAddFilmForm ({ get, set }, payload) {
  set({
    showModalOverlay: payload.show,
    addFilmFormShowing: payload.show,
    listToAddFilmTo: payload.list
  })
}

function editFilm ({ get, set }, payload) {
  const { films } = get()
  const list = _.keys(films).find(list => films[list][payload.film.id])

  filmService.edit(payload.film, list)
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

function pickFilm ({ get, set }, payload) {
  const state = get()
  const pickedFilm = filmService.pick(state.films.watchListFilms, payload.filterCriteria, payload.type)
  set({ pickedFilm })
}

function moveFilm ({ get, set }, payload) {
  const { id, fromList, toList } = payload
  filmService.move(id, fromList, toList)
}

function showLoginForm ({ get, set }, payload) {
  set({
    showModalOverlay: payload.show,
    showLoginForm: payload.show
  })
}

function updateLoginDetails ({ get, set }, payload) {
  set({ user: _.assign({}, get().user, { [payload.key]: payload.value }) })
}

function submitLoginForm ({ get, set }, payload) {
  const { email, password } = payload
  userService.login(email, password)
}

function updateUser ({ get, set }, payload) {
  set({ user: payload.user })
}

export default {
  removeFilm,
  editFilm,
  updateFilms,
  showPickFilmForm,
  showAddFilmForm,
  showEditFilmForm,
  pickFilm,
  moveFilm,
  showLoginForm,
  updateLoginDetails,
  submitLoginForm,
  updateUser
}
