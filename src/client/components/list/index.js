import { Component, h } from 'preact'
import _ from 'lodash'
import Button from '../button'
import Film from '../film'
import './list.css'

class List extends Component {
  render () {
    const { atom } = this.context
    const { title, list } = this.props
    const filmCount = _.keys(atom.films[list]).length

    return (
      <div className='List'>
        <div className='List-headerWrapper'>
          <h1 className='List-title'>{title} <span className='List-count'>({filmCount} films)</span></h1>
          <Button
            size='medium'
            onClick={() => this.launchAddFilmModal()}
            text='Add Film'
            fullWidth={false}
          />
        </div>
        {this.renderFilmList()}
      </div>
    )
  }

  renderFilmList () {
    const { atom } = this.context
    const { list, showMoveFilmButton, showDownloadButtons } = this.props
    const alphabeticallyOrderedFilms = _.sortBy(_.values(atom.films[list]), film => film.name)
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
    this.context.split('showAddFilmForm', { show: true, list: this.props.list })
  }
}

export default List
