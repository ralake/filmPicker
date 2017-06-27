import { Component, h } from 'preact'
import Button from '../button'
import './header.css'

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
        <Button size='large' onClick={() => this.launchPickFilmModal()} fullWidth={false} text='Pick Film' />
      </div>
    )
  }

  launchPickFilmModal () {
    this.context.split('showPickFilmForm', { show: true })
  }
}

export default Header
