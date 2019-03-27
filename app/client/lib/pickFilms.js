import orderBy from 'lodash-es/orderBy'
import first from 'lodash-es/first'
import random from 'lodash-es/random'

export default function pickFilms (films) {
  return {
    oldestFilm: getOldestFilm(films),
    randomFilm: getRandomFilm(films)
  }
}

function getRandomFilm (films) {
  const lowerLimit = 0
  const upperLimit = films.length
  const randomIndex = random(lowerLimit, upperLimit)
  return films[randomIndex]
}

function getOldestFilm (films) {
  return first(
    orderBy(films, film => new Date(film.dateAdded), ['asc'])
  )
}
