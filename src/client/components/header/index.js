import { Component, h } from 'preact'
import Button from '../button'
import './header.css'
/** @jsx h */

class Header extends Component {
  render () {
    const { pickedFilm } = this.context.atom
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
    this.context.split('showPickFilmForm', { show: true })
  }

  exportFilms () {
    const { films } = this.context.atom
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

export default Header
