import React, { Component } from 'react'
import { connect } from 'tiny-atom/react'
import { Mutation } from 'react-apollo'
import omit from 'lodash-es/omit'
import Dialog from '@material-ui/core/Dialog'

import FilmForm from '../FilmForm'
import CreateFilmMutation from '../../graphql/CreateFilmMutation.graphql'
import UpdateFilmMutation from '../../graphql/UpdateFilmMutation.graphql'
import GetFilmsQuery from '../../graphql/GetFilmsQuery.graphql'

const actions = ['showFilmForm']

function map (state) {
  const { show, action, film } = state.filmForm
  return { show, action, film }
}

class FilmFormDialog extends Component {
  constructor () {
    super()
    this.mutations = {
      create: {
        mutation: CreateFilmMutation,
        getVariables: () => {
          const { film } = this.state
          return { input: film }
        },
        updateFn (cache, resp) {
          const { createFilm: createdFilm } = resp.data
          this.addCreatedFilm(cache, createdFilm)
        }
      },
      update: {
        mutation: UpdateFilmMutation,
        getVariables: () => {
          const prevFilm = this.props.film
          const updatedFilm = this.state.film
          const film = omit(updatedFilm, ['id', '__typename'])
          const dateAdded = prevFilm.parentList !== film.parentList
            ? new Date().toDateString()
            : prevFilm.dateAdded

          return {
            input: { ...film, dateAdded },
            id: updatedFilm.id
          }
        },
        updateFn () {}
      }
    }
    this.state = {
      film: {}
    }
  }

  componentDidUpdate (prevProps) {
    const { show, film } = this.props

    if (!prevProps.show && show) {
      this.setState({ film })
    }
  }

  render () {
    const { show, action } = this.props
    const { film } = this.state

    if (!action) return null

    return (
      <Mutation
        mutation={this.mutations[action].mutation}
        update={this.mutations[action].updateFn.bind(this)}
        onCompleted={() => this.handleCompleted()}
        onError={(e) => this.handleError(e)}
      >
        {(mutationFn, { data, loading, error }) => {
          return (
            <Dialog
              open={show}
              fullWidth
              maxWidth='sm'
              onClose={() => this.handleClose()}
            >
              <FilmForm
                action={action}
                film={film}
                onChange={film => this.handleChange(film)}
                onConfirm={film => this.handleConfirm(mutationFn)}
                onClose={() => this.handleClose()}
              />
            </Dialog>
          )
        }}
      </Mutation>
    )
  }

  handleChange (film) {
    this.setState({ film })
  }

  handleConfirm (mutationFn) {
    const { action } = this.props

    mutationFn({
      variables: this.mutations[action].getVariables.bind(this)()
    })
  }

  handleClose () {
    this.props.showFilmForm({ show: false })
  }

  addCreatedFilm (cache, createdFilm) {
    const { films } = cache.readQuery({ query: GetFilmsQuery })
    cache.writeQuery({
      query: GetFilmsQuery,
      data: {
        films: films.concat(createdFilm)
      }
    })
  }

  handleError () {
    // TODO show snack bar in error
    this.handleClose()
  }

  handleCompleted () {
    // TODO - show snackbar in success
    this.handleClose()
  }
}

export default connect(map, actions)(FilmFormDialog)
