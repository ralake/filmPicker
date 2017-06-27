import React from 'react'

class AddFilmForm extends React.Component {
  render () {
    const { isFiction, isDocumentary, isEnglishLanguage, isForeignLanguage } = this.props.atom.filmToBeAdded

    return (
      <div className='AddFilmForm'>
        <input className='AddFilmForm-name' type='text' onChange={this.updateFilmName.bind(this)} />
        <label className='AddFilmForm-englishLanguageToggle'>
          <input type='checkbox' checked={isEnglishLanguage} onChange={this.updateEnglishLanguageFilter.bind(this)} />
          <div className='slider round' />
        </label>
        <label className='AddFilmForm-foreignLanguageToggle'>
          <input type='checkbox' checked={isForeignLanguage} onChange={this.updateForeignLanguageFilter.bind(this)} />
          <div className='slider round' />
        </label>
        <label className='AddFilmForm-documentaryToggle'>
          <input type='checkbox' checked={isDocumentary} onChange={this.updateDocumentaryFilter.bind(this)} />
          <div className='slider round' />
        </label>
        <label className='AddFilmForm-fictionToggle'>
          <input type='checkbox' checked={isFiction} onChange={this.updateFictionFilter.bind(this)} />
          <div className='slider round' />
        </label>
        <div className='AddFilmForm-submit' onClick={this.handleSubmit.bind(this)}>Submit</div>
      </div>
    )
  }

  handleSubmit () {
    const { atom, split } = this.props
    const { filmToBeAdded, films } = atom
    const id = films.length

    split('ADD_NEW_FILM', { id, filmToBeAdded })
    split('SHOW_ADD_FILM_MODAL', false)
  }

  updateFilmAttribute (key, value) {
    this.props.split('UPDATE_NEW_FILM_ATTRIBUTE', { key, value })
  }

  updateFilmName (event) {
    this.updateFilmAttribute('name', event.target.value)
  }

  updateEnglishLanguageFilter () {
    const { isEnglishLanguage } = this.props.atom.filmToBeAdded
    this.updateFilmAttribute('isEnglishLanguage', !isEnglishLanguage)
  }

  updateForeignLanguageFilter () {
    const { isForeignLanguage } = this.props.atom.filmToBeAdded
    this.updateFilmAttribute('isForeignLanguage', !isForeignLanguage)
  }

  updateFictionFilter () {
    const { isFiction } = this.props.atom.filmToBeAdded
    this.updateFilmAttribute('isFiction', !isFiction)
  }

  updateDocumentaryFilter () {
    const { isDocumentary } = this.props.atom.filmToBeAdded
    this.updateFilmAttribute('isDocumentary', !isDocumentary)
  }
}

export default AddFilmForm
