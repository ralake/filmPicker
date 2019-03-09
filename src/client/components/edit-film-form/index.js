import { Component, h } from 'preact'
import FilmForm from '../film-form'
/** @jsx h */

class EditFilmForm extends Component {
  constructor (props, context) {
    super()
    const { filmToEdit } = context.atom
    this.state = {
      film: filmToEdit
    }
  }

  componentDidUpdate (prevProps, prevState, prevContext) {
    const { filmToEdit } = this.context.atom

    if (!this.state.film && filmToEdit) {
      this.setState({ film: filmToEdit })
    }
  }

  render () {
    const { atom } = this.context
    const { showEditFilmForm } = atom
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
    const { split } = this.context
    split('showEditFilmForm', { show: false, film: null })
    this.setState({ film: null })
  }

  handleSubmit () {
    const { split } = this.context
    const { film } = this.state

    split('editFilm', { film })
    this.handleClose()
  }
}

export default EditFilmForm
