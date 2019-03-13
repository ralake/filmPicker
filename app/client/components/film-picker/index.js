import React, { Component, Fragment } from 'react'
import _ from 'lodash'
import { connect } from 'tiny-atom/react'
import { Query } from 'react-apollo'
import Header from '../header'
import List from '../list'
import ModalOverlay from '../modal-overlay'
import PickFilmForm from '../pick-film-form'
import AddFilmForm from '../add-film-form'
import UpdateFilmForm from '../update-film-form'
import LoginForm from '../login-form'
import FilmsQuery from '../../graphql/FilmsQuery.graphql'
import './film-picker.css'

function map (state) {
  return {
    userLoggedIn: _.get(state.user, 'loggedIn'),
    modal: state.modal
  }
}

class FilmPicker extends Component {
  render () {
    const { modal, userLoggedIn } = this.props
    return (
      <div className='FilmPicker'>
        <Query
          query={FilmsQuery}
        >
          {({ loading, data, error }) => {
            if (loading || error) return null
            const { films } = data
            const wishListFilms = films.filter(film => film.parentList === 'WISH_LIST')
            const watchListFilms = films.filter(film => film.parentList === 'WATCH_LIST')

            return (
              <Fragment>
                {!!modal && this.renderModal(modal, films)}
                <Header />
                {userLoggedIn && (
                  <div className='FilmPicker-listWrapper'>
                    <List title='Watch List' list='WATCH_LIST' films={watchListFilms} />
                    <List title='Wish List' list='WISH_LIST' films={wishListFilms} showMoveFilmButton showDownloadButtons />
                  </div>
                )}
              </Fragment>
            )
          }}
        </Query>
      </div>
    )
  }

  renderModal (modal, films) {
    const { type, data } = modal
    const modals = {
      createFilmForm: data => <AddFilmForm />,
      updateFilmForm: data => <UpdateFilmForm film={films.find(film => film.id === data.id)} />,
      pickFilmForm: data => <PickFilmForm />,
      loginForm: data => <LoginForm />
    }

    return (
      <Fragment>
        <ModalOverlay />
        {modals[type](data)}
      </Fragment>
    )
  }
}

export default connect(map)(FilmPicker)
