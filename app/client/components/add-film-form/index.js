import React, { Component } from 'react'
import { connect } from 'tiny-atom/react'
import _ from 'lodash'
import FilmForm from '../film-form'

const defaultFilm = {
  isFiction: true,
  isEnglishLanguage: true,
  name: ''
}

function map (state) {
  return {
    showAddFilmForm: state.showAddFilmForm,
    listToAddFilmTo: state.listToAddFilmTo
  }
}

const actions = ['addNewFilm']

class AddFilmForm extends Component {
  constructor () {
    super()
    this.state = {
      film: defaultFilm
    }
  }

  render () {
    const { showAddFilmForm } = this.props
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
    this.props.showAddFilmForm({ show: false })
    this.setState({ film: defaultFilm })
  }

  handleSubmit () {
    const { film } = this.state
    const { listToAddFilmTo, addNewFilm } = this.props

    addNewFilm({ film: _.assign({}, film, { dateAdded: Date.now() }), list: listToAddFilmTo })
    this.handleClose()
  }
}

export default connect(map, actions)(AddFilmForm)
