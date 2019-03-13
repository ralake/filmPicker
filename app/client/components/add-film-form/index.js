import React, { Component } from 'react'
import { connect } from 'tiny-atom/react'
import { Mutation } from 'react-apollo'
import FilmForm from '../film-form'
import CreateFilmMutation from '../../graphql/CreateFilmMutation.graphql'
import FilmsQuery from '../../graphql/FilmsQuery.graphql'

const defaultFilm = {
  isFiction: true,
  isEnglishLanguage: true,
  name: ''
}

function map (state) {
  return {
    listToAddFilmTo: state.listToAddFilmTo,
    addFilmFormShowing: state.addFilmFormShowing
  }
}

const actions = ['showAddFilmForm']

class AddFilmForm extends Component {
  constructor () {
    super()
    this.state = {
      film: defaultFilm
    }
  }

  render () {
    const { addFilmFormShowing } = this.props
    const { film } = this.state

    if (addFilmFormShowing) {
      return (
        <Mutation
          mutation={CreateFilmMutation}
          update={(cache, { data: { createFilm: createdFilm } }) => {
            this.handleUpdate(cache, createdFilm)
          }}
          onCompleted={() => this.handleClose()}
        >
          {(createFilm, { data, loading, error }) => {
            return (
              <FilmForm
                film={film}
                buttonText='Add'
                onChange={film => this.handleChange(film)}
                onClose={() => this.handleClose()}
                onSubmit={() => this.handleSubmit(createFilm)}
              />
            )
          }}
        </Mutation>
      )
    } else {
      return null
    }
  }

  handleUpdate (cache, createdFilm) {
    const { films } = cache.readQuery({ query: FilmsQuery })
    cache.writeQuery({
      query: FilmsQuery,
      data: { films: films.concat(createdFilm) }
    })
  }

  handleChange (film) {
    this.setState({ film })
  }

  handleClose () {
    this.props.showAddFilmForm({ show: false })
    this.setState({ film: defaultFilm })
  }

  handleSubmit (createFilm) {
    const { film } = this.state
    const { listToAddFilmTo } = this.props

    createFilm({
      variables: {
        input: {
          ...film,
          parentList: listToAddFilmTo
        }
      }
    })
  }
}

export default connect(map, actions)(AddFilmForm)
