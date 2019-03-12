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

  await firebase
    .database()
    .ref(`films/${film.id}`)
    .set(film)

  return film
}

async function update (id, updates) {
  const film = await firebase.database().ref(`films/${id}`).once('value')
  const updatedFilm = {
    ...film.val(),
    ...updates
  }
  await firebase
    .database()
    .ref(`films/${id}`)
    .set(updatedFilm)

  return updatedFilm
}

async function deleteFilm (id) {
  const film = await firebase.database().ref(`films/${id}`).once('value')
  const deletedFilm = film.val()

  await firebase
    .database()
    .ref(`films/${id}`)
    .remove()

  return deletedFilm
}
