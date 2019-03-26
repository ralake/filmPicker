import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'tiny-atom/react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import * as firebase from 'firebase'
import get from 'lodash-es/get'
import userService from './lib/user-service'
// import FilmPicker from './components/film-picker'
import NewFilmPicker from './material/NewFilmPicker'
import atom from './atom'
import firebaseConfig from './firebaseConfig'
import './app.css'

const client = new ApolloClient()

firebase.initializeApp(firebaseConfig)

userService.onLoginChange(appUser => {
  const { dispatch } = atom
  const loggedIn = get(appUser, 'isAnonymous') === false
  const user = { loggedIn }

  dispatch('updateUser', user)
  if (!user.loggedIn) dispatch('openModal', { type: 'loginForm' })
})

ReactDOM.render(
  (
    <ApolloProvider client={client}>
      <Provider atom={atom}>
        <NewFilmPicker />
      </Provider>
    </ApolloProvider>
  ),
  document.getElementById('FilmPicker')
)
