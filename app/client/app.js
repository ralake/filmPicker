import { render, h } from 'preact'
import * as firebase from 'firebase'
import _ from 'lodash'
import createAtom from 'tiny-atom'
import userService from './lib/user-service'
import filmService from './lib/film-service'
import evolve from './evolve'
import FilmPicker from './components/film-picker'
import dbConfig from './db-config'
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
  const { split } = atom
  const loggedIn = _.get(appUser, 'isAnonymous') === false
  const user = { loggedIn }

  split('updateUser', { user })
  split('showLoginForm', { show: !user.loggedIn })

  if (user.loggedIn) {
    filmService.get(films => split('updateFilms', { films: (films || initialState.films) }))
  }
})

function renderFilmPicker () {
  root = render(<FilmPicker atom={atom.get()} split={atom.split} />, document.getElementById('FilmPicker'), root)
}
