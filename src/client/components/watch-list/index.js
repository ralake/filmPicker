import React from 'react'

class WatchList extends React.Component {
  render () {
    const { films } = this.props.atom
    return (
      <div>
        <button onClick={this.launchAddFilmModal.bind(this)}>Add film</button>
        <ul>{ films.map(film => <li>{film.name}</li>) }</ul>
      </div>
    )
  }

  launchAddFilmModal () {
    const { split } = this.props
    split('SHOW_ADD_FILM_MODAL', true)
  }
}

export default WatchList
