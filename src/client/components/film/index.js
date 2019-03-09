/* globals SD_DOWNLOAD_URL, HD_DOWNLOAD_URL */

import { Component, h } from 'preact'
import Button from '../button'
import './film.css'
/** @jsx h */

class Film extends Component {
  render () {
    const { showMoveFilmButton, showDownloadButtons, film } = this.props
    const { name, isEnglishLanguage, isFiction, id, dateAdded } = film
    const language = isEnglishLanguage ? 'English language' : 'Foreign language'
    const type = isFiction ? 'fiction' : 'documentary'
    const date = dateAdded ? new Date(dateAdded).toDateString() : '(not known)'

    return (
      <li className='Film'>
        <div className='Film-section'>
          <div className='Film-descriptorsWrapper'>
            <div>
              <span className='Film-title'>{name}</span>
              <span className='Film-descriptors'> ({language} {type})</span>
            </div>
          </div>
          <div className='Film-btnWrapper'>
            { showMoveFilmButton && (
              <Button size='small' onClick={() => { this.moveFilmToWatchList(id) }} text='Move' fullWidth={false} />
            )}
            <Button size='small' onClick={() => this.showEditFilmModal(film)} text='Edit' fullWidth={false} />
            <Button size='small' onClick={() => this.deleteFilm(id)} text='Remove' fullWidth={false} />
          </div>
        </div>
        <div className='Film-divider' />
        <div className='Film-section'>
          <span className='Film-dateAdded'>Added {date}</span>
          {showDownloadButtons && (
            <div>
              <Button
                onClick={() => this.search({ hd: false })}
                text='Download SD'
                fullWidth={false}
                size='small'
              />
              <Button
                onClick={() => this.search({ hd: true })}
                text='Download HD' fullWidth={false}
                size='small'
              />
            </div>
          )}
        </div>
      </li>
    )
  }

  search ({ hd }) {
    const film = window.encodeURIComponent(this.props.film.name)
    const url = hd
      ? HD_DOWNLOAD_URL.replace('{{film}}', film)
      : SD_DOWNLOAD_URL.replace('{{film}}', film)
    window.open(url, '_blank')
  }

  deleteFilm (id) {
    this.context.split('removeFilm', { id, list: this.props.parentList })
  }

  showEditFilmModal () {
    const { film } = this.props
    this.context.split('showEditFilmForm', { show: true, film })
  }

  moveFilmToWatchList (id) {
    const { split } = this.context
    const { parentList } = this.props
    split('moveFilm', {
      id,
      fromList: parentList,
      toList: 'watchListFilms'
    })
  }
}

export default Film
