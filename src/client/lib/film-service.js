import * as firebase from 'firebase'
import _ from 'lodash'
import shortId from 'shortid'

function get (cb) {
  firebase.database().ref('films').on('value', films => cb(films.val()))
}

function add (film, list) {
  const filmToAdd = film.id ? film : _.assign({}, film, { id: shortId.generate() })
  return firebase.database().ref(`films/${list}/${filmToAdd.id}`).set(filmToAdd)
}

function remove (id, list) {
  return firebase.database().ref(`films/${list}/${id}`).remove()
}

function filter (films, filterCriteria) {
  const { includeDocumentaries, includeForeignLanguageFilms } = filterCriteria
  let filteredFilms = _.values(films)

  if (!includeDocumentaries) filteredFilms = filteredFilms.filter(film => film.isFiction)
  if (!includeForeignLanguageFilms) filteredFilms = filteredFilms.filter(film => film.isEnglishLanguage)

  return filteredFilms
}

function pick (films, filterCriteria) {
  const filteredFilms = filter(films, filterCriteria)
  const randomFilmIndices = getRandomIndices(filteredFilms)
  const randomFilms = randomFilmIndices.map(index => filteredFilms[index])
  return _.orderBy(randomFilms, ['dateAdded'], 'asc')[0]
}

function getRandomIndices (input, chosen = []) {
  const lowerLimit = 0
  const upperLimit = input.length
  const randomIndex = _.random(lowerLimit, upperLimit)

  if (!chosen.includes(randomIndex)) chosen.push(randomIndex)
  if (chosen.length > 4) return chosen
  return getRandomIndices(input, chosen)
}

function move (id, fromList, toList) {
  firebase.database().ref(`films/${fromList}/${id}`).once('value').then(snapshot => {
    const filmToMove = _.assign({}, snapshot.val(), { dateAdded: Date.now() })
    add(filmToMove, toList).then(() => remove(filmToMove.id, fromList))
  })
}

export default { get, add, pick, move, remove }
