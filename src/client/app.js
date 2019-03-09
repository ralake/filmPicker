import { render, h } from 'preact'
import * as firebase from 'firebase'
import _ from 'lodash'
import createAtom from 'tiny-atom'
import filmService from './lib/film-service'
import userService from './lib/user-service'
import evolve from './evolve'
import FilmPicker from './components/film-picker'
import dbConfig from '../db-config'
import './app.css'
/** @jsx h */

let root

firebase.initializeApp(dbConfig)

const initialState = {
  films: {
    watchListFilms: {},
    wishListFilms: {}
  }
}

const atom = createAtom(initialState, evolve, renderFilmPicker)
userService.onLoginChange(appUser => {
  const { get, split } = atom
  const state = get()
  const loggedIn = _.get(appUser, 'isAnonymous') === false
  const user = { loggedIn }

  split('updateUser', { user })

  if (user.loggedIn) {
    if (state.showLoginForm) split('showLoginForm', { show: false })
    filmService.get(films => split('updateFilms', { films: (films || initialState.films) }))
  } else {
    split('updateFilms', { films: initialState.films })
    split('showLoginForm', { show: true })
  }
})

function renderFilmPicker () {
  root = render(<FilmPicker atom={atom.get()} split={atom.split} />, document.getElementById('FilmPicker'), root)
}
