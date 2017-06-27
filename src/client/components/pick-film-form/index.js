import { Component, h } from 'preact'
import Toggle from '../toggle'
import Button from '../button'
import Modal from '../modal'
import './pick-film-form.css'

class PickFilmForm extends Component {
  render () {
    const fullWidth = true
    const { atom } = this.context
    const { dismissable } = this.props
    const { filterCriteria, showPickFilmForm } = atom
    const { includeDocumentaries, includeForeignLanguageFilms } = filterCriteria

    if (showPickFilmForm) {
      return (
        <Modal atom={atom} dismissable={dismissable} handleClose={() => this.handleClose()}>
          <div className='PickFilmForm'>
            <p className='PickFilmForm-criteria'>Criteria</p>
            <Toggle toggled={includeForeignLanguageFilms} onChange={() => this.updateForeignLanguageFilter()} descriptor='Include foreign language films?' />
            <Toggle toggled={includeDocumentaries} onChange={() => this.updateDocumentaryFilter()} descriptor='Include documentaries?' />
            <Button size='medium' onClick={() => this.handleSubmit()} text='Pick Film' fullWidth={fullWidth} />
          </div>
        </Modal>
      )
    } else {
      return null
    }
  }

  handleClose () {
    const { split } = this.context
    split('showPickFilmForm', { show: false })
  }

  handleSubmit () {
    const { atom, split } = this.context
    const { filterCriteria } = atom

    split('pickFilm', filterCriteria)
    split('showPickFilmForm', { show: false })
  }

  updateFilterCriteria (key, value) {
    this.context.split('updateFilterCriteria', { key, value })
  }

  updateForeignLanguageFilter () {
    const { includeForeignLanguageFilms } = this.context.atom.filterCriteria
    this.updateFilterCriteria('includeForeignLanguageFilms', !includeForeignLanguageFilms)
  }

  updateDocumentaryFilter () {
    const { includeDocumentaries } = this.context.atom.filterCriteria
    this.updateFilterCriteria('includeDocumentaries', !includeDocumentaries)
  }
}

export default PickFilmForm
