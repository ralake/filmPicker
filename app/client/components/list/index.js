import React, { Component } from 'react'
import { connect } from 'tiny-atom/react'
import _ from 'lodash'
import Button from '../button'
import Film from '../film'
import './list.css'

const map = () => {}

const actions = ['showAddFilmForm']

class List extends Component {
  render () {
    const { films } = this.props
    const { title } = this.props
    const filmCount = films.length

    return (
      <div className='List'>
        <div className='List-headerWrapper'>
          <h1 className='List-title'>{title} <span className='List-count'>({filmCount} films)</span></h1>
          <Button
            size='medium'
            onClick={() => this.launchAddFilmModal()}
            text='Add Film'
          />
        </div>
        {this.renderFilmList()}
      </div>
    )
  }

  renderFilmList () {
    const { films, list, showMoveFilmButton, showDownloadButtons } = this.props
    const alphabeticallyOrderedFilms = _.sortBy(films, 'name')
    return (
      <ul className='List-wrapper'>{
        alphabeticallyOrderedFilms.map(film => (
          <Film
            parentList={list}
            film={film}
            showMoveFilmButton={showMoveFilmButton}
            showDownloadButtons={showDownloadButtons}
          />
        ))}
      </ul>
    )
  }

  launchAddFilmModal () {
    this.props.showAddFilmForm({ show: true, list: this.props.list })
  }
}

export default connect(map, actions)(List)
