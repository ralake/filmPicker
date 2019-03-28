import React, { Component, Fragment } from 'react'
import { connect } from 'tiny-atom/react'
import sortBy from 'lodash-es/sortBy'
import get from 'lodash-es/get'
import { Query } from 'react-apollo'
import Grid from '@material-ui/core/Grid'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'

import lists from '../../lib/lists'
import FilmList from '../FilmList'
import Snackbar from '../Snackbar'
import GetFilmsQuery from '../../graphql/GetFilmsQuery.graphql'
import Header from '../Header'
import FilmFormDialog from '../FilmFormDialog'
import LoginFormDialog from '../LoginFormDialog'

const theme = createMuiTheme({
  palette: {
    primary: blue
  }
})

const actions = ['showSnackbar']

class FilmPicker extends Component {
  render () {
    return (
      <MuiThemeProvider theme={theme}>
        <Query
          query={GetFilmsQuery}
          onError={() => this.handleError()}
        >
          {({ loading, data, error }) => {
            const films = get(data, 'films')

            return (
              <Fragment>
                <Header films={films} loading={loading} />
                <Snackbar />
                <FilmFormDialog />
                <LoginFormDialog />
                <Grid container spacing={24}>
                  <FilmList films={this.getFilms(films, lists.WATCH_LIST)} />
                  <FilmList films={this.getFilms(films, lists.WISH_LIST)} />
                </Grid>
              </Fragment>
            )
          }}
        </Query>
      </MuiThemeProvider>
    )
  }

  getFilms (films, list) {
    if (!films) return
    return sortBy(
      films.filter(film => film.parentList === list),
      'name'
    )
  }

  handleError () {
    this.props.showSnackbar({
      show: true,
      duration: 4000,
      message: 'Error trying to get films',
      type: 'error'
    })
  }
}

export default connect(null, actions)(FilmPicker)
