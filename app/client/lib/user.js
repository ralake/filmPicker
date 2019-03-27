import * as firebase from 'firebase'

function login ({ email, password }) {
  return firebase.auth().signInWithEmailAndPassword(email, password)
}

function logout () {
  return firebase.auth().signOut()
}

function onLoginChange (cb) {
  firebase.auth().onAuthStateChanged(cb)
}

export default { login, logout, onLoginChange }
