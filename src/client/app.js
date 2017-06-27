import React from 'react'
import ReactDom from 'react-dom'
import createAtom from 'tiny-atom'

import filmService from '../lib/film-service'

import FilmPicker from './components/film-picker'

import { defaultNewFilm } from './constants'

const initialState = {
  films: [],
  filmToBeAdded: defaultNewFilm
}

const atom = createAtom(initialState, evolve, render)

filmService.get(films => atom.split({ films: films }))

function evolve (get, split, action) {
  const state = get()
  const { type, payload } = action

  switch (type) {
    case 'SHOW_ADD_FILM_MODAL':
      split({ showAddFilmModal: payload })
      break
    case 'UPDATE_NEW_FILM_ATTRIBUTE':
      const { key, value } = payload
      split({ filmToBeAdded: Object.assign({}, state.filmToBeAdded, { [key]: value }) })
      break
    case 'ADD_NEW_FILM':
      const { id, filmToBeAdded } = payload
      split({ filmToBeAdded: defaultNewFilm })
      filmService.add(id, filmToBeAdded)
      break
  }
}

function render () {
  console.log('currentState: ', atom.get())
  ReactDom.render(<FilmPicker atom={atom.get()} split={atom.split} />, document.getElementById('FilmPicker'))
}
