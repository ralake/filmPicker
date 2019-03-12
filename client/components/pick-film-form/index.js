import { Component, h } from 'preact'
import Toggle from '../toggle'
import Button from '../button'
import Modal from '../modal'
import './pick-film-form.css'
/** @jsx h */

const defaultFilterCriteria = {
  includeDocumentaries: true,
  includeForeignLanguageFilms: true
}

class PickFilmForm extends Component {
  constructor () {
    super()
    this.state = {
      filterCriteria: defaultFilterCriteria
    }
  }

  render () {
    const { atom } = this.context
    const { includeDocumentaries, includeForeignLanguageFilms } = this.state.filterCriteria
    const { showPickFilmForm } = atom

    if (showPickFilmForm) {
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
                onClick={() => this.handleSubmit('random')}
                text='Pick random film'
              />
              <Button
                className='PickFilmForm-oldestButton'
                size='medium'
                onClick={() => this.handleSubmit('oldest')}
                text='Pick oldest film'
              />
            </div>
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
    this.setState({ filterCriteria: defaultFilterCriteria })
  }

  handleSubmit (type) {
    const { split } = this.context
    const { filterCriteria } = this.state

    split('pickFilm', { filterCriteria, type })
    this.handleClose()
  }

  updateFilterCriteria (key, value) {
    const { filterCriteria } = this.state

    this.setState({
      filterCriteria: {
        ...filterCriteria,
        [key]: value
      }
    })
  }

  updateForeignLanguageFilter () {
    const { includeForeignLanguageFilms } = this.state.filterCriteria
    this.updateFilterCriteria('includeForeignLanguageFilms', !includeForeignLanguageFilms)
  }

  updateDocumentaryFilter () {
    const { includeDocumentaries } = this.state.filterCriteria
    this.updateFilterCriteria('includeDocumentaries', !includeDocumentaries)
  }
}

export default PickFilmForm
