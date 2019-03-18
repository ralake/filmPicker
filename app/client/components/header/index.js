import React, { Component } from 'react'
import { connect } from 'tiny-atom/react'
import omit from 'lodash-es/omit'
import Button from '../button'
import './header.css'

function map (state) {
  return {
    pickedFilm: state.pickedFilm
  }
}

const actions = ['openModal', 'clearPickedFilm']

class Header extends Component {
  render () {
    return (
      <div className='Header'>
        <h1 className='Header-title'>Film Picker</h1>
        {this.renderPickedFilm()}
        <div>
          <Button
            size='large'
            onClick={() => this.exportFilms()}
            text='Export films'
          />
          <Button
            size='large'
            onClick={() => this.openPickFilmModal()}
            text='Pick film'
          />
        </div>
      </div>
    )
  }

  renderPickedFilm () {
    const { pickedFilm } = this.props
    if (!pickedFilm) return null

    return (
      <p className='Header-pickedFilm'>
        <span>Time to watch </span>
        <span className='Header-pickedFilmName'>{pickedFilm.name}</span>!
      </p>
    )
  }

  openPickFilmModal () {
    const { clearPickedFilm, openModal } = this.props
    clearPickedFilm()
    openModal({ type: 'pickFilmForm' })
  }

  exportFilms () {
    const films = this.props.films.reduce(
      (memo, film) => ({
        ...memo,
        [film.id]: omit(film, ['__typename'])
      }),
      {}
    )

    const encodedFilms = encodeURIComponent(JSON.stringify({ films }))
    const encodedData = `text/json;charset=utf-8,${encodedFilms}`
    const downloadLink = document.createElement('a')

    downloadLink.display = 'hidden'
    downloadLink.setAttribute('href', `data:${encodedData}`)
    downloadLink.setAttribute('download', 'filmPickerExport.json')
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }
}

export default connect(map, actions)(Header)
