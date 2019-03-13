/* globals SD_DOWNLOAD_URL, HD_DOWNLOAD_URL */

import React, { Component } from 'react'
import { connect } from 'tiny-atom/react'
import _ from 'lodash'
import { Mutation } from 'react-apollo'
import Button from '../button'
import UpdateFilmMutation from '../../graphql/UpdateFilmMutation.graphql'
import FilmsQuery from '../../graphql/FilmsQuery.graphql'
import './film.css'

const map = () => {}

const actions = ['removeFilm', 'showEditFilmForm', 'moveFilm']

class Film extends Component {
  render () {
    const { showMoveFilmButton, showDownloadButtons, film } = this.props
    const { name, isEnglishLanguage, isFiction, id, dateAdded } = film
    const language = isEnglishLanguage ? 'English language' : 'Foreign language'
    const type = isFiction ? 'fiction' : 'documentary'
    const date = dateAdded || '(not known)'

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
              <Mutation
                mutation={UpdateFilmMutation}
                update={(cache, { data: { updateFilm: movedFilm } }) => {
                  this.handleMovedFilm(cache, movedFilm)
                }}
              >
                {(updateFilm, { data, loading, error }) => (
                  <Button size='small' onClick={() => this.moveFilm(updateFilm)} text='Move' />
                )}
              </Mutation>
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

  handleMovedFilm (cache, movedFilm) {
    const { films } = cache.readQuery({ query: FilmsQuery })
    const updatedFilmIndex = _.findIndex(films, movedFilm)
    cache.writeQuery({
      query: FilmsQuery,
      data: {
        films: [
          ...films.slice(0, updatedFilmIndex),
          movedFilm,
          ...films.slice(updatedFilmIndex + 1)
        ]
      }
    })
  }

  deleteFilm (id) {
    this.props.removeFilm({ id, list: this.props.parentList })
  }

  showEditFilmModal () {
    const { film } = this.props
    this.props.showEditFilmForm({ show: true, id: film.id })
  }

  moveFilm (updateFilm) {
    const { film } = this.props
    updateFilm({
      variables: {
        id: film.id,
        input: { parentList: 'WATCH_LIST' }
      }
    })
  }
}

export default connect(map, actions)(Film)
