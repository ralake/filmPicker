import React, { Component } from 'react'
import { connect } from 'tiny-atom/react'
import Button from '../button'
import './header.css'

function map (state) {
  return {
    pickedFilm: state.pickedFilm,
    films: state.films
  }
}

const actions = ['showPickFilmForm']

class Header extends Component {
  render () {
    const { pickedFilm } = this.props
    const notification = pickedFilm && (
      <p className='Header-pickedFilm'>
        <span>Time to watch </span>
        <span className='Header-pickedFilmName'>{pickedFilm.name}</span>!
      </p>
    )
    const pickedFilmNotification = pickedFilm ? notification : null

    return (
      <div className='Header'>
        <h1 className='Header-title'>Film Picker</h1>
        {pickedFilmNotification}
        <div>
          <Button
            size='large'
            onClick={() => this.exportFilms()}
            text='Export films'
          />
          <Button
            size='large'
            onClick={() => this.launchPickFilmModal()}
            text='Pick film'
          />
        </div>
      </div>
    )
  }

  launchPickFilmModal () {
    this.props.showPickFilmForm({ show: true })
  }

  exportFilms () {
    const { films } = this.props
    const encodedFilms = `text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(films))}`
    const downloadLink = document.createElement('a')

    downloadLink.display = 'hidden'
    downloadLink.setAttribute('href', `data:${encodedFilms}`)
    downloadLink.setAttribute('download', 'filmPickerExport.json')
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }
}

export default connect(map, actions)(Header)
