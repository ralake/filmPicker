import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'tiny-atom/react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import * as firebase from 'firebase'
import _ from 'lodash'
import userService from './lib/user-service'
import FilmPicker from './components/film-picker'
import atom from './atom'
import firebaseConfig from './firebaseConfig'
import './app.css'

const client = new ApolloClient()

firebase.initializeApp(firebaseConfig)

userService.onLoginChange(appUser => {
  const { dispatch } = atom
  const loggedIn = _.get(appUser, 'isAnonymous') === false
  const user = { loggedIn }

  dispatch('updateUser', user)
  if (!user.loggedIn) dispatch('openModal', { type: 'loginForm' })
})

ReactDOM.render(
  (
    <ApolloProvider client={client}>
      <Provider atom={atom}>
        <FilmPicker />
      </Provider>
    </ApolloProvider>
  ),
  document.getElementById('FilmPicker')
)
