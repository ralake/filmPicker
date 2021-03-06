import React, { Component } from 'react'
import { connect } from 'tiny-atom/react'
import { Mutation } from 'react-apollo'
import omit from 'lodash-es/omit'
import Dialog from '@material-ui/core/Dialog'

import lists from '../../lib/lists'
import FilmForm from '../FilmForm'
import CreateFilmMutation from '../../graphql/CreateFilmMutation.graphql'
import UpdateFilmMutation from '../../graphql/UpdateFilmMutation.graphql'
import GetFilmsQuery from '../../graphql/GetFilmsQuery.graphql'

const actions = ['showFilmForm', 'showSnackbar']

function map (state) {
  const { show, action, film } = state.filmForm
  return { show, action, film }
}

class FilmFormDialog extends Component {
  constructor (props) {
    super(props)
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
        },
        onCompletedFn (data) {
          const { createFilm: createdFilm } = data
          const list = lists.toDisplayName(createdFilm.parentList)
          this.showSnackbar({
            message: `Added ${createdFilm.name} to ${list}!`,
            type: 'success'
          })
        },
        onErrorFn () {
          const { film } = this.state
          const list = lists.toDisplayName(film.parentList)
          this.showSnackbar({
            message: `Error trying to add ${film.name} to ${list}`,
            type: 'error'
          })
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
        updateFn () {},
        onCompletedFn () {
          const { name } = this.state.film
          this.showSnackbar({
            message: `${name} successfully updated!`,
            type: 'success'
          })
        },
        onErrorFn () {
          const { name } = this.state.film
          this.showSnackbar({
            message: `Error trying to update ${name}`,
            type: 'error'
          })
        }
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
        onCompleted={this.mutations[action].onCompletedFn.bind(this)}
        onError={this.mutations[action].onErrorFn.bind(this)}
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

    this.handleClose()
  }

  handleClose () {
    this.props.showFilmForm({ show: false })
  }

  showSnackbar ({ message, type }) {
    this.props.showSnackbar({
      show: true,
      duration: 3000,
      message,
      type
    })
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
}

export default connect(map, actions)(FilmFormDialog)
