import React, { Component } from 'react'
import { connect } from 'tiny-atom/react'
import { Query } from 'react-apollo'
import omit from 'lodash-es/omit'
import Button from '../button'
import PickFilmQuery from '../../graphql/PickFilmQuery.graphql'
import './header.css'

function map (state) {
  return {
    pickFilmCriteria: state.pickFilmCriteria
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
    const { pickFilmCriteria } = this.props
    if (!pickFilmCriteria) return null

    return (
      <Query
        query={PickFilmQuery}
        variables={{ input: pickFilmCriteria }}
      >
        {({ loading, error, data }) => {
          if (loading || error) return null
          const { pickFilm: pickedFilm } = data
          return (
            <p className='Header-pickedFilm'>
              <span>Time to watch </span>
              <span className='Header-pickedFilmName'>{pickedFilm.name}</span>!
            </p>
          )
        }}
      </Query>
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
