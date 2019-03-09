import { Component, h } from 'preact'
import _ from 'lodash'
import Toggle from '../toggle'
import Button from '../button'
import Modal from '../modal'
import './add-film-form.css'
/** @jsx h */

class AddFilmForm extends Component {
  constructor () {
    super()
    this.state = {
      film: {
        isFiction: true,
        isEnglishLanguage: true,
        name: ''
      }
    }
  }

  render () {
    const { atom } = this.context
    const { dismissable } = this.props
    const { showAddFilmForm } = atom
    const { isFiction, isEnglishLanguage, name } = this.state.film

    if (showAddFilmForm) {
      return (
        <Modal atom={atom} dismissable={dismissable} handleClose={() => this.handleClose()}>
          <div className='AddFilmForm'>
            <p className='AddFilmForm-title'>Title</p>
            <input
              className='AddFilmForm-input'
              type='text'
              onChange={event => this.updateFilmName(event)}
              onBlur={event => this.updateFilmName(event)}
              value={name}
            />
            <Toggle toggled={!isEnglishLanguage} onChange={() => this.updateForeignLanguageAttribute()} descriptor='Foreign Language?' />
            <Toggle toggled={!isFiction} onChange={() => this.updateDocumentaryAttribute()} descriptor='Documentary?' />
            <Button
              size='large'
              onClick={() => this.handleSubmit()}
              text='Submit'
              fullWidth
              disabled={!name}
            />
          </div>
        </Modal>
      )
    } else {
      return null
    }
  }

  handleClose () {
    const { split } = this.context
    split('showAddFilmForm', { show: false })
  }

  handleSubmit () {
    const { atom, split } = this.context
    const { film } = this.state
    const { listToAddFilmTo } = atom

    split('addNewFilm', { film: _.assign({}, film, { dateAdded: Date.now() }), list: listToAddFilmTo })
    this.handleClose()
  }

  updateFilmAttribute (key, value) {
    const { film } = this.state
    this.setState({
      film: {
        ...film,
        [key]: value
      }
    })
  }

  updateFilmName (event) {
    this.updateFilmAttribute('name', event.target.value)
  }

  updateForeignLanguageAttribute () {
    const { isEnglishLanguage } = this.this.state.film
    this.updateFilmAttribute('isEnglishLanguage', !isEnglishLanguage)
  }

  updateDocumentaryAttribute () {
    const { isFiction } = this.this.state.film
    this.updateFilmAttribute('isFiction', !isFiction)
  }
}

export default AddFilmForm
