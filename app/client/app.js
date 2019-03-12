import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'tiny-atom/react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import * as firebase from 'firebase'
import _ from 'lodash'
import userService from './lib/user-service'
import FilmPicker from './components/film-picker'
import dbConfig from './db-config'
import atom from './atom'
import './app.css'

const client = new ApolloClient({
  uri: '/graphql'
})

firebase.initializeApp(dbConfig)

userService.onLoginChange(appUser => {
  const { dispatch } = atom
  const loggedIn = _.get(appUser, 'isAnonymous') === false
  const user = { loggedIn }

  dispatch('updateUser', { user })
  dispatch('showLoginForm', { show: !user.loggedIn })
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
