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

async function get (list) {
  const films = await firebase.database().ref(`films/${list}`).once('value')
  return films
}

async function create (list, filmToCreate) {
  const id = shortId.generate()
  const dateAdded = new Date().getTime()
  const film = {
    ...filmToCreate,
    id,
    dateAdded
  }

  await firebase
    .database()
    .ref(`films/${list}/${id}`)
    .set(film)

  return film
}

async function update (list, filmId, updatedFilm) {
  await firebase
    .database()
    .ref(`films/${list}/${filmId}`)
    .set(updatedFilm)

  return updatedFilm
}

async function deleteFilm (list, filmId) {
  await firebase
    .database()
    .ref(`films/${list}/${filmId}`)
    .remove()
}
