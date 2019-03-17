const _ = require('lodash')
const firebase = require('firebase')
const shortId = require('shortid')

const firebaseCredentials = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
}

firebase.initializeApp(firebaseCredentials)

module.exports = { get, create, update, delete: deleteFilm, pick }

async function get () {
  const films = await firebase.database().ref('films').once('value')
  return _.values(films.val())
}

async function create (input) {
  const film = {
    ...input,
    id: shortId.generate(),
    dateAdded: new Date().toDateString()
  }

  await setFilmById(film.id, film)
  return film
}

async function update (id, updates) {
  const film = await getFilmById(id)
  const updatedFilm = {
    ...film,
    ...updates
  }

  await setFilmById(id, updatedFilm)
  return updatedFilm
}

async function deleteFilm (id) {
  const deletedFilm = await getFilmById(id)

  await firebase
    .database()
    .ref(`films/${id}`)
    .remove()

  return deletedFilm
}

async function getFilmById (id) {
  const film = await firebase
    .database()
    .ref(`films/${id}`)
    .once('value')
  return film.val()
}

async function setFilmById (id, film) {
  return firebase
    .database()
    .ref(`films/${id}`)
    .set(film)
}

async function pick (type, filter) {
  const films = (await get()).filter(film => film.parentList === 'WATCH_LIST')
  const filteredFilms = filterFilms(films, filter)
  const randomFilmIndices = getRandomIndices(filteredFilms)
  const randomFilms = randomFilmIndices.map(index => filteredFilms[index])
  const chosenFilms = type === 'RANDOM'
    ? randomFilms
    : filteredFilms
  console.log('TYPE', type)
  console.log(_.orderBy(chosenFilms, ['dateAdded'], 'asc'))
  return _.first(_.orderBy(chosenFilms, ['dateAdded'], 'asc'))
}

function getRandomIndices (input, chosen = []) {
  const lowerLimit = 0
  const upperLimit = input.length
  const randomIndex = _.random(lowerLimit, upperLimit)

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
