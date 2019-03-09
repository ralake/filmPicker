import { h } from 'preact'
import AtomProvider from '../atom-provider'
import Header from '../header'
import List from '../list'
import ModalOverlay from '../modal-overlay'
import PickFilmForm from '../pick-film-form'
import AddFilmForm from '../add-film-form'
import EditFilmForm from '../edit-film-form'
import LoginForm from '../login-form'
import './film-picker.css'
/** @jsx h */

const FilmPicker = ({ atom, split }) => {
  return (
    <AtomProvider atom={atom} split={split}>
      <div className='FilmPicker'>
        <Header />
        <ModalOverlay />
        <AddFilmForm />
        <EditFilmForm />
        <PickFilmForm />
        <LoginForm />
        <div className='FilmPicker-listWrapper'>
          <List title='Watch List' list='watchListFilms' />
          <List title='Wish List' list='wishListFilms' showMoveFilmButton showDownloadButtons />
        </div>
      </div>
    </AtomProvider>
  )
}

export default FilmPicker
