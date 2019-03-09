import _ from 'lodash'
import filmService from './lib/film-service'
import userService from './lib/user-service'
import {
  defaultFilterCriteria
} from './constants'

function removeFilm (get, split, action) {
  const { payload } = action
  filmService.remove(payload.id, payload.list)
}

function updateFilms (get, split, action) {
  split({ films: action.payload.films })
}

function showAddFilmForm (get, split, action) {
  const { payload } = action

  split({
    showModalOverlay: payload.show,
    showAddFilmForm: payload.show,
    listToAddFilmTo: payload.list
  })
}

function addNewFilm (get, split, action) {
  const { payload } = action
  filmService.add(payload.film, payload.list)
}

function editFilm (get, split, action) {
  const { payload } = action
  const { films } = get()
  const list = _.keys(films).find(list => films[list][payload.film.id])

  filmService.edit(payload.film, list)
}

function showEditFilmForm (get, split, action) {
  const { payload } = action

  split({
    showModalOverlay: payload.show,
    showEditFilmForm: payload.show,
    filmToEdit: payload.film
  })
}

function showPickFilmForm (get, split, action) {
  const { payload } = action
  split({
    showModalOverlay: payload.show,
    showPickFilmForm: payload.show
  })

  if (!payload.show) split({ filterCriteria: defaultFilterCriteria })
}

function updateFilterCriteria (get, split, action) {
  const { payload } = action
  const newFilterCriteria = _.assign({}, get().filterCriteria, { [payload.key]: payload.value })
  split({ filterCriteria: newFilterCriteria })
}

function pickFilm (get, split, action) {
  const state = get()
  const pickedFilm = filmService.pick(state.films.watchListFilms, state.filterCriteria)
  split({ pickedFilm })
}

function moveFilm (get, split, action) {
  const { id, fromList, toList } = action.payload
  filmService.move(id, fromList, toList)
}

function showLoginForm (get, split, action) {
  const { payload } = action
  split({
    showModalOverlay: payload.show,
    showLoginForm: payload.show
  })
}

function updateLoginDetails (get, split, action) {
  const { payload } = action
  split({ user: _.assign({}, get().user, { [payload.key]: payload.value }) })
}

function submitLoginForm (get, split, action) {
  const { email, password } = action.payload
  userService.login(email, password)
}

function updateUser (get, split, action) {
  split({ user: action.payload.user })
}

export default {
  removeFilm,
  addNewFilm,
  editFilm,
  updateFilms,
  showPickFilmForm,
  showAddFilmForm,
  showEditFilmForm,
  updateFilterCriteria,
  pickFilm,
  moveFilm,
  showLoginForm,
  updateLoginDetails,
  submitLoginForm,
  updateUser
}
