import React, { Component, Fragment } from 'react'
import get from 'lodash-es/get'
import { connect } from 'tiny-atom/react'
import { Query } from 'react-apollo'
import Header from '../header'
import List from '../list'
import ModalOverlay from '../modal-overlay'
import PickFilmForm from '../pick-film-form'
import CreateFilmForm from '../create-film-form'
import UpdateFilmForm from '../update-film-form'
import LoginForm from '../login-form'
import GetFilmsQuery from '../../graphql/GetFilmsQuery.graphql'
import './film-picker.css'

function map (state) {
  return {
    userLoggedIn: get(state.user, 'loggedIn'),
    modal: state.modal
  }
}

class FilmPicker extends Component {
  render () {
    const { modal, userLoggedIn } = this.props
    return (
      <div className='FilmPicker'>
        <Query
          query={GetFilmsQuery}
        >
          {({ loading, data, error }) => {
            if (loading || error) return null
            const { films } = data
            const wishListFilms = films
              .filter(film => film.parentList === 'WISH_LIST')
            const watchListFilms = films
              .filter(film => film.parentList === 'WATCH_LIST')

            return (
              <Fragment>
                {!!modal && this.renderModal(modal, films)}
                <Header films={films} />
                {userLoggedIn && (
                  <div className='FilmPicker-listWrapper'>
                    <List
                      title='Watch List'
                      list='WATCH_LIST'
                      films={watchListFilms}
                    />
                    <List
                      title='Wish List'
                      list='WISH_LIST'
                      films={wishListFilms}
                      showMoveFilmButton
                      showDownloadButtons
                    />
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
      createFilmForm: data => (
        <CreateFilmForm list={data.list} />),
      updateFilmForm: data => (
        <UpdateFilmForm film={films.find(film => film.id === data.id)} />
      ),
      pickFilmForm: data => (
        <PickFilmForm films={films} />
      ),
      loginForm: data => (
        <LoginForm />
      )
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
