import * as firebase from 'firebase'
import dbConfig from '../db-config'

firebase.initializeApp(dbConfig)
const database = firebase.database()

const filmService = {
  get: function get (cb) {
    database.ref('films').on('value', function (films) { cb(films.val()) })
  },
  add: function add (id, film) {
    database.ref('films/' + id).set(film)
  }
}

export default filmService
