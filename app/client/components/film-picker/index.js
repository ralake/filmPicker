import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'tiny-atom/react'
import { Query } from 'react-apollo'
import Header from '../header'
import List from '../list'
import ModalOverlay from '../modal-overlay'
import PickFilmForm from '../pick-film-form'
import AddFilmForm from '../add-film-form'
import EditFilmForm from '../edit-film-form'
import LoginForm from '../login-form'
import FilmsQuery from '../../graphql/FilmsQuery.graphql'
import './film-picker.css'

function map (state) {
  return {
    userLoggedIn: _.get(state.user, 'loggedIn')
  }
}

class FilmPicker extends Component {
  render () {
    const { userLoggedIn } = this.props
    return (
      <div className='FilmPicker'>
        <Header />
        <ModalOverlay />
        <AddFilmForm />
        <EditFilmForm />
        <PickFilmForm />
        <LoginForm />
        {userLoggedIn && this.renderLists()}
      </div>
    )
  }

  renderLists () {
    return (
      <Query
        query={FilmsQuery}
      >
        {({ loading, data, error }) => {
          if (loading || error) return null

          const wishListFilms = data.films.filter(film => film.parentList === 'WISH_LIST')
          const watchListFilms = data.films.filter(film => film.parentList === 'WATCH_LIST')

          return (
            <div className='FilmPicker-listWrapper'>
              <List title='Watch List' list='WATCH_LIST' films={watchListFilms} />
              <List title='Wish List' list='WISH_LIST' films={wishListFilms} showMoveFilmButton showDownloadButtons />
            </div>
          )
        }}
      </Query>
    )
  }
}

export default connect(map)(FilmPicker)
