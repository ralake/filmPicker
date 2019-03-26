import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'

import GetFilmsQuery from '../../graphql/GetFilmsQuery.graphql'
import Header from '../Header'

const theme = createMuiTheme({
  palette: {
    primary: blue
  }
})

class FilmPicker extends Component {
  render () {
    return (
      <MuiThemeProvider theme={theme}>
        <Query query={GetFilmsQuery}>
          {({ loading, data, error }) => {
            const { films } = data
            // handle error with a toast bar

            return (
              <Header films={films} loading={loading} />
            )
          }}
        </Query>
      </MuiThemeProvider>
    )
  }
}

export default FilmPicker
