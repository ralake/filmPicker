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

module.exports = { get, create, update, delete: deleteFilm }

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
