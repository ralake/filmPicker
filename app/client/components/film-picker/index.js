import { h, Component } from 'preact'
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

class FilmPicker extends Component {
  render () {
    const { atom, split } = this.props
    const { loggedIn } = atom.user
    return (
      <AtomProvider atom={atom} split={split}>
        <div className='FilmPicker'>
          <Header />
          <ModalOverlay />
          <AddFilmForm />
          <EditFilmForm />
          <PickFilmForm />
          <LoginForm />
          {loggedIn && this.renderLists()}
        </div>
      </AtomProvider>
    )
  }

  renderLists () {
    return (
      <div className='FilmPicker-listWrapper'>
        <List title='Watch List' list='watchListFilms' />
        <List title='Wish List' list='wishListFilms' showMoveFilmButton showDownloadButtons />
      </div>
    )
  }
}

export default FilmPicker
