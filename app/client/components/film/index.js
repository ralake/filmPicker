/* globals SD_DOWNLOAD_URL, HD_DOWNLOAD_URL */

import React, { Component } from 'react'
import { connect } from 'tiny-atom/react'
import Button from '../button'
import './film.css'

const map = () => {}

const actions = ['removeFilm', 'showEditFilmForm', 'moveFilm']

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
              <Button size='small' onClick={() => { this.moveFilmToWatchList(id) }} text='Move' />
            )}
            <Button size='small' onClick={() => this.showEditFilmModal(film)} text='Edit' />
            <Button size='small' onClick={() => this.deleteFilm(id)} text='Remove' />
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
                size='small'
              />
              <Button
                onClick={() => this.search({ hd: true })}
                text='Download HD'
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
    this.props.removeFilm({ id, list: this.props.parentList })
  }

  showEditFilmModal () {
    const { film } = this.props
    this.props.showEditFilmForm({ show: true, id: film.id })
  }

  moveFilmToWatchList (id) {
    const { parentList } = this.props
    this.props.moveFilm({
      id,
      fromList: parentList,
      toList: 'watchListFilms'
    })
  }
}

export default connect(map, actions)(Film)
