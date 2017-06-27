import _ from 'lodash'
import filmService from './lib/film-service'
import userService from './lib/user-service'
import {
  defaultFilm,
  defaultFilterCriteria
} from './constants'

function updateNewFilmAttribute (get, split, action) {
  const state = get()
  const { payload } = action
  split({ filmToBeAdded: _.assign({}, state.filmToBeAdded, { [payload.key]: payload.value }) })
}

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

  if (!payload.show) split('setDefaultFilm', { defaultFilm })
}

function setDefaultFilm (get, split, action) {
  split({ filmToBeAdded: action.payload.defaultFilm })
}

function addNewFilm (get, split, action) {
  const { payload } = action
  filmService.add(payload.film, payload.list).then(() => split('setDefaultFilm', { defaultFilm }))
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
  updateNewFilmAttribute,
  removeFilm,
  addNewFilm,
  updateFilms,
  setDefaultFilm,
  showPickFilmForm,
  showAddFilmForm,
  updateFilterCriteria,
  pickFilm,
  moveFilm,
  showLoginForm,
  updateLoginDetails,
  submitLoginForm,
  updateUser
}
