import React, { Component } from 'react'
import { connect } from 'tiny-atom/react'
import Toggle from '../toggle'
import Button from '../button'
import Modal from '../modal'
import './pick-film-form.css'

const defaultFilter = {
  includeDocumentaries: true,
  includeForeignLanguageFilms: true
}

const actions = ['closeModal', 'pickFilm']

class PickFilmForm extends Component {
  constructor () {
    super()
    this.state = {
      filter: defaultFilter
    }
  }

  render () {
    const { includeDocumentaries, includeForeignLanguageFilms } = this.state.filter

    return (
      <Modal dismissable handleClose={() => this.handleClose()}>
        <div className='PickFilmForm'>
          <p className='PickFilmForm-criteria'>Criteria</p>
          <Toggle toggled={includeForeignLanguageFilms} onChange={() => this.updateForeignLanguageFilter()} descriptor='Include foreign language films?' />
          <Toggle toggled={includeDocumentaries} onChange={() => this.updateDocumentaryFilter()} descriptor='Include documentaries?' />
          <div className='PickFilmForm-buttons'>
            <Button
              className='PickFilmForm-randomButton'
              size='medium'
              onClick={() => this.pickFilm('RANDOM')}
              text='Pick random film'
            />
            <Button
              className='PickFilmForm-oldestButton'
              size='medium'
              onClick={() => this.pickFilm('OLDEST')}
              text='Pick oldest film'
            />
          </div>
        </div>
      </Modal>
    )
  }

  handleClose () {
    this.props.closeModal()
    this.setState({ filter: defaultFilter })
  }

  pickFilm (type) {
    const { pickFilm, films } = this.props
    const { filter } = this.state

    pickFilm({ films, type, filter })
    this.handleClose()
  }

  updateFilter (key, value) {
    const { filter } = this.state

    this.setState({
      filter: {
        ...filter,
        [key]: value
      }
    })
  }

  updateForeignLanguageFilter () {
    const { includeForeignLanguageFilms } = this.state.filter
    this.updateFilter('includeForeignLanguageFilms', !includeForeignLanguageFilms)
  }

  updateDocumentaryFilter () {
    const { includeDocumentaries } = this.state.filter
    this.updateFilter('includeDocumentaries', !includeDocumentaries)
  }
}

export default connect(null, actions)(PickFilmForm)
