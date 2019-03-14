import React, { Component } from 'react'
import isEmpty from 'lodash-es/isEmpty'
import { connect } from 'tiny-atom/react'
import { Mutation } from 'react-apollo'
import FilmForm from '../film-form'
import UpdateFilmMutation from '../../graphql/UpdateFilmMutation.graphql'

const actions = ['closeModal']

class UpdateFilmForm extends Component {
  constructor (props) {
    super()
    this.state = {
      filmUpdates: {}
    }
  }

  render () {
    const { filmUpdates } = this.state
    const { film } = this.props
    const unsavedFilm = {
      ...film,
      ...filmUpdates
    }
    return (
      <Mutation
        mutation={UpdateFilmMutation}
        onCompleted={() => this.handleClose()}
      >
        {(updateFilm, { data, loading, error }) => {
          return (
            <FilmForm
              film={unsavedFilm}
              buttonText='Save'
              buttonDisabled={isEmpty(filmUpdates)}
              onChange={film => this.handleChange(film)}
              onClose={() => this.handleClose()}
              onSubmit={() => this.handleSubmit(updateFilm)}
            />
          )
        }}
      </Mutation>
    )
  }

  handleChange (unsavedFilm) {
    const { film } = this.props
    const editableAttributes = ['name', 'dateAdded', 'isEnglishLanguage', 'isFiction', 'isClareFriendly', 'parentList']
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
    this.props.closeModal()
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

export default connect(null, actions)(UpdateFilmForm)
