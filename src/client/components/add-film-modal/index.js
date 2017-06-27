import React from 'react'

import AddFilmForm from '../add-film-form'

class AddFilmModal extends React.Component {
  render () {
    const { atom, split } = this.props
    const { showAddFilmModal } = atom

    if (showAddFilmModal) {
      return (
        <div className='AddFilmModal'>
          <div className='AddFilmModal-close' onClick={this.close.bind(this)}>&#x2715;</div>
          <div className='AddFilmModal-body'>
            <AddFilmForm atom={atom} split={split} />
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  close () {
    const { split } = this.props
    split('SHOW_ADD_FILM_MODAL', false)
  }
}

export default AddFilmModal
