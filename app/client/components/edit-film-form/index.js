import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'tiny-atom/react'
import { Mutation } from 'react-apollo'
import FilmForm from '../film-form'
import UpdateFilmMutation from '../../graphql/UpdateFilmMutation.graphql'
import FilmsQuery from '../../graphql/FilmsQuery.graphql'

function map (state) {
  return {
    filmToEdit: state.filmToEdit,
    editFilmFormShowing: state.editFilmFormShowing
  }
}

const actions = ['showEditFilmForm', 'editFilm']

class EditFilmForm extends Component {
  constructor (props) {
    super()
    this.state = {
      filmUpdates: {}
    }
  }

  render () {
    const { editFilmFormShowing } = this.props
    const { filmUpdates } = this.state
    const { film } = this.props
    const unsavedFilm = {
      ...film,
      ...filmUpdates
    }

    if (editFilmFormShowing && film) {
      return (
        <Mutation
          mutation={UpdateFilmMutation}
          update={(cache, { data: { updateFilm: updatedFilm } }) => {
            this.handleUpdate(cache, updatedFilm)
          }}
          onCompleted={() => this.handleClose()}
        >
          {(updateFilm, { data, loading, error }) => {
            return (
              <FilmForm
                film={unsavedFilm}
                buttonText='Save'
                buttonDisabled={_.isEmpty(filmUpdates)}
                onChange={film => this.handleChange(film)}
                onClose={() => this.handleClose()}
                onSubmit={() => this.handleSubmit(updateFilm)}
              />
            )
          }}
        </Mutation>
      )
    } else {
      return null
    }
  }

  handleUpdate (cache, updatedFilm) {
    const { films } = cache.readQuery({ query: FilmsQuery })
    const updatedFilmIndex = _.findIndex(films, updatedFilm)
    cache.writeQuery({
      query: FilmsQuery,
      data: {
        films: [
          ...films.slice(0, updatedFilmIndex),
          updatedFilm,
          ...films.slice(updatedFilmIndex + 1)
        ]
      }
    })
  }

  handleChange (unsavedFilm) {
    const { film } = this.props
    const editableAttributes = ['name', 'dateAdded', 'isEnglishLanguage', 'isFiction', 'parentList']
    const filmUpdates = editableAttributes
      .reduce(
        (memo, attr) => {
          return (film[attr] !== unsavedFilm[attr])
          ? { ...memo, [attr]: unsavedFilm[attr] }
          : memo
        },
        {}
      )

    this.setState({ filmUpdates })
  }

  handleClose () {
    this.props.showEditFilmForm({ show: false, id: null })
    this.setState({ film: null })
  }

  handleSubmit (updateFilm) {
    const { filmUpdates } = this.state
    const { id } = this.props.film
    updateFilm({
      variables: {
        id,
        input: filmUpdates
      }
    })
  }
}

export default connect(map, actions)(EditFilmForm)
