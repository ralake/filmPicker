import { Component, h } from 'preact'
import _ from 'lodash'
import FilmForm from '../film-form'
/** @jsx h */

const defaultFilm = {
  isFiction: true,
  isEnglishLanguage: true,
  name: ''
}

class AddFilmForm extends Component {
  constructor () {
    super()
    this.state = {
      film: defaultFilm
    }
  }

  render () {
    const { atom } = this.context
    const { showAddFilmForm } = atom
    const { film } = this.state

    if (showAddFilmForm) {
      return (
        <FilmForm
          film={film}
          buttonText='Add'
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
    split('showAddFilmForm', { show: false })
    this.setState({ film: defaultFilm })
  }

  handleSubmit () {
    const { atom, split } = this.context
    const { film } = this.state
    const { listToAddFilmTo } = atom

    split('addNewFilm', { film: _.assign({}, film, { dateAdded: Date.now() }), list: listToAddFilmTo })
    this.handleClose()
  }
}

export default AddFilmForm
