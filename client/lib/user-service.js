import * as firebase from 'firebase'

function login (email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password)
}

function onLoginChange (cb) {
  firebase.auth().onAuthStateChanged(cb)
}

export default { login, onLoginChange }
