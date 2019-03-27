import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'tiny-atom/react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import * as firebase from 'firebase'
import get from 'lodash-es/get'
import userService from './lib/user-service'
import FilmPicker from './components/FilmPicker'
import atom from './atom'
import firebaseConfig from './firebaseConfig'

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
        <FilmPicker />
      </Provider>
    </ApolloProvider>
  ),
  document.getElementById('FilmPicker')
)
