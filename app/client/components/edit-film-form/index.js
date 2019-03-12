import React, { Component } from 'react'
import { connect } from 'tiny-atom/react'
import FilmForm from '../film-form'

function map (state) {
  return {
    filmToEdit: state.filmToEdit,
    showEditFilmForm: state.showEditFilmForm
  }
}

const actions = ['showEditFilmForm', 'editFilm']

class EditFilmForm extends Component {
  constructor (props) {
    super()
    const { filmToEdit } = props
    this.state = {
      film: filmToEdit
    }
  }

  componentDidUpdate (prevProps, prevState, prevContext) {
    const { filmToEdit } = this.props

    if (!this.state.film && filmToEdit) {
      this.setState({ film: filmToEdit })
    }
  }

  render () {
    const { showEditFilmForm } = this.props
    const { film } = this.state

    if (showEditFilmForm && film) {
      return (
        <FilmForm
          film={film}
          buttonText='Save'
          onChange={film => this.handleChange(film)}
          onClose={() => this.handleClose()}
          onSubmit={() => this.handleSubmit()}
        />
      )
    } else {
      return null
    }
  }

  handleChange (film) {
    this.setState({ film })
  }

  handleClose () {
    this.props.showEditFilmForm({ show: false, film: null })
    this.setState({ film: null })
  }

  handleSubmit () {
    const { film } = this.state

    this.props.editFilm({ film })
    this.handleClose()
  }
}

export default connect(map, actions)(EditFilmForm)
