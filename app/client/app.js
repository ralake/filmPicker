import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'tiny-atom/react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import * as firebase from 'firebase'
import get from 'lodash-es/get'
import user from './lib/user'
import FilmPicker from './components/FilmPicker'
import atom from './atom'
import firebaseConfig from './firebaseConfig'

const client = new ApolloClient()

firebase.initializeApp(firebaseConfig)

user.onLoginChange(appUser => {
  const { dispatch } = atom
  const loggedIn = get(appUser, 'isAnonymous') === false

  if (!loggedIn) dispatch('showLoginForm', { show: true })
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
