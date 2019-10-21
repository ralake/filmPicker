import random from 'lodash-es/random'

export default function pickFilm (films) {
  const lowerLimit = 0
  const upperLimit = films.length
  const randomIndex = random(lowerLimit, upperLimit)
  return films[randomIndex]
}
