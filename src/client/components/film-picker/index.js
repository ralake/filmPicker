import React from 'react'

import Header from '../header'
import WatchList from '../watch-list'
import AddFilmModal from '../add-film-modal'

const FilmPicker = ({ atom, split }) => {
  return (
    <div>
      <Header />
      <AddFilmModal atom={atom} split={split} />
      <WatchList atom={atom} split={split} />
    </div>
  )
}

export default FilmPicker
