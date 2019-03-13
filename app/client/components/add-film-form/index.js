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
    listToAddFilmTo: state.listToAddFilmTo
  }
}

const actions = ['closeModal']

class AddFilmForm extends Component {
  constructor () {
    super()
    this.state = {
      film: defaultFilm
    }
  }

  render () {
    const { film } = this.state

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
  }

  handleUpdate (cache, createdFilm) {
    const { films } = cache.readQuery({ query: FilmsQuery })
    cache.writeQuery({
      query: FilmsQuery,
      data: {
        films: films.concat(createdFilm)
      }
    })
  }

  handleChange (film) {
    this.setState({ film })
  }

  handleClose () {
    this.props.closeModal()
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
