import orderBy from 'lodash-es/orderBy'
import first from 'lodash-es/first'
import random from 'lodash-es/random'

export default function pickFilm (allFilms, type, filter) {
  const films = allFilms.filter(film => film.parentList === 'WATCH_LIST')
  const filteredFilms = filterFilms(films, filter)
  const randomFilmIndices = getRandomIndices(filteredFilms)
  const randomFilms = randomFilmIndices.map(index => filteredFilms[index])
  const chosenFilms = type === 'RANDOM'
    ? randomFilms
    : filteredFilms

  return first(
    orderBy(chosenFilms, film => new Date(film.dateAdded), ['asc'])
  )
}

function getRandomIndices (input, chosen = []) {
  const lowerLimit = 0
  const upperLimit = input.length
  const randomIndex = random(lowerLimit, upperLimit)

  if (!chosen.includes(randomIndex)) chosen.push(randomIndex)
  if (chosen.length > 4) return chosen
  return getRandomIndices(input, chosen)
}

function filterFilms (films, filterCriteria) {
  const { includeDocumentaries, includeForeignLanguageFilms } = filterCriteria
  let filteredFilms = films

  if (!includeDocumentaries) filteredFilms = filteredFilms.filter(film => film.isFiction)
  if (!includeForeignLanguageFilms) filteredFilms = filteredFilms.filter(film => film.isEnglishLanguage)

  return filteredFilms
}
