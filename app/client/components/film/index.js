/* globals SD_DOWNLOAD_URL, HD_DOWNLOAD_URL */

import React, { Component } from 'react'
import { connect } from 'tiny-atom/react'
import { Mutation } from 'react-apollo'
import classnames from 'classnames'
import Button from '../button'
import UpdateFilmMutation from '../../graphql/UpdateFilmMutation.graphql'
import DeleteFilmMutation from '../../graphql/DeleteFilmMutation.graphql'
import GetFilmsQuery from '../../graphql/GetFilmsQuery.graphql'
import './film.css'

const map = () => {}

const actions = ['openModal']

class Film extends Component {
  render () {
    const { showMoveFilmButton, showDownloadButtons, film } = this.props
    const { name, isEnglishLanguage, isFiction, isClareFriendly, dateAdded } = film
    const language = isEnglishLanguage ? 'English language' : 'Foreign language'
    const type = isFiction ? 'fiction' : 'documentary'
    const date = dateAdded || '(not known)'
    const className = classnames('Film', { 'is-clareFriendly': isClareFriendly })

    return (
      <li className={className}>
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
              >
                {(updateFilm, { data, loading, error }) => (
                  <Button size='small' onClick={() => this.moveFilm(updateFilm)} text='Move' />
                )}
              </Mutation>
            )}
            <Button size='small' onClick={() => this.openUpdateFilmModal(film)} text='Edit' />
            <Mutation
              mutation={DeleteFilmMutation}
              update={(cache, { data: { deleteFilm: deletedFilm } }) => {
                this.handleDeletedFilm(cache, deletedFilm.id)
              }}
            >
              {(deleteFilm, { data, loading, error }) => (
                <Button size='small' onClick={() => this.deleteFilm(deleteFilm)} text='Remove' />
              )}
            </Mutation>
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

  moveFilm (updateFilm) {
    const { film } = this.props
    updateFilm({
      variables: {
        id: film.id,
        input: { parentList: 'WATCH_LIST' }
      }
    })
  }

  deleteFilm (deleteFilm) {
    const { id } = this.props.film
    deleteFilm({
      variables: {
        id
      }
    })
  }

  handleDeletedFilm (cache, deletedFilmId) {
    const { films } = cache.readQuery({ query: GetFilmsQuery })
    cache.writeQuery({
      query: GetFilmsQuery,
      data: {
        films: films.filter(f => f.id !== deletedFilmId)
      }
    })
  }

  openUpdateFilmModal () {
    const { film, openModal } = this.props
    openModal({
      type: 'updateFilmForm',
      data: { id: film.id }
    })
  }
}

export default connect(map, actions)(Film)
