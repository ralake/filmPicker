import React, { Component } from 'react'
import { connect } from 'tiny-atom/react'
import { Mutation } from 'react-apollo'
import FilmForm from '../film-form'
import CreateFilmMutation from '../../graphql/CreateFilmMutation.graphql'
import FilmsQuery from '../../graphql/FilmsQuery.graphql'

const actions = ['closeModal']

class CreateFilmForm extends Component {
  constructor (props) {
    super()
    this.state = {
      film: {
        ...this.getDefaultNewFilm(),
        parentList: props.list
      }
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

  getDefaultNewFilm () {
    return {
      isFiction: true,
      isEnglishLanguage: true,
      name: ''
    }
  }

  handleChange (film) {
    this.setState({ film })
  }

  handleClose () {
    this.props.closeModal()
    this.setState({ film: this.getDefaultNewFilm() })
  }

  handleSubmit (createFilm) {
    const { film } = this.state

    createFilm({
      variables: {
        input: film
      }
    })
  }
}

export default connect(null, actions)(CreateFilmForm)
