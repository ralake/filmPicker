import { h } from 'preact'
import AtomProvider from '../atom-provider'
import Header from '../header'
import List from '../list'
import ModalOverlay from '../modal-overlay'
import PickFilmForm from '../pick-film-form'
import AddFilmForm from '../add-film-form'
import LoginForm from '../login-form'
import {
  ADD_FILM_FORM_DISMISSABLE,
  PICK_FILM_FORM_DISMISSABLE,
  LOGIN_FORM_DISMISSABLE
} from '../../constants'
import './film-picker.css'
/** @jsx h */

const FilmPicker = ({ atom, split }) => {
  return (
    <AtomProvider atom={atom} split={split}>
      <div className='FilmPicker'>
        <Header />
        <ModalOverlay />
        <AddFilmForm dismissable={ADD_FILM_FORM_DISMISSABLE} />
        <PickFilmForm dismissable={PICK_FILM_FORM_DISMISSABLE} />
        <LoginForm dismissable={LOGIN_FORM_DISMISSABLE} />
        <div className='FilmPicker-listWrapper'>
          <List title='Watch List' list='watchListFilms' />
          <List title='Wish List' list='wishListFilms' showMoveFilmButton showDownloadButtons />
        </div>
      </div>
    </AtomProvider>
  )
}

export default FilmPicker
