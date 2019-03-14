import React, { Component } from 'react'
import Toggle from '../toggle'
import Button from '../button'
import Modal from '../modal'
import './film-form.css'

class FilmForm extends Component {
  componentDidMount () {
    if (this.nameInput) this.nameInput.focus()
  }

  render () {
    const { onSubmit, onClose, film, buttonText, buttonDisabled } = this.props
    const { name, isEnglishLanguage, isFiction, isClareFriendly } = film

    return (
      <Modal
        dismissable
        handleClose={() => onClose()}
      >
        <div className='FilmForm'>
          <p className='FilmForm-title'>Title</p>
          <input
            ref={ref => {
              if (ref) this.nameInput = ref
            }}
            className='FilmForm-input'
            type='text'
            onChange={event => {
              this.updateFilmAttribute({
                name: event.target.value
              })
            }}
            value={name}
          />
          <Toggle
            toggled={!isEnglishLanguage}
            onChange={() => {
              this.updateFilmAttribute({
                isEnglishLanguage: !isEnglishLanguage
              })
            }}
            descriptor='Foreign Language?'
          />
          <Toggle
            toggled={!isFiction}
            onChange={() => {
              this.updateFilmAttribute({
                isFiction: !isFiction
              })
            }}
            descriptor='Documentary?'
          />
          <Toggle
            toggled={isClareFriendly}
            onChange={() => {
              this.updateFilmAttribute({
                isClareFriendly: !isClareFriendly
              })
            }}
            descriptor='Clare friendly?'
          />
          <Button
            size='large'
            onClick={() => onSubmit()}
            text={buttonText}
            fullWidth
            disabled={buttonDisabled || !name}
          />
        </div>
      </Modal>
    )
  }

  updateFilmAttribute (change) {
    const { film, onChange } = this.props
    onChange({
      ...film,
      ...change
    })
  }
}

export default FilmForm
