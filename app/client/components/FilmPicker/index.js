import React, { Component, Fragment } from 'react'
import sortBy from 'lodash-es/sortBy'
import { Query } from 'react-apollo'
import Grid from '@material-ui/core/Grid'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'

import FilmList from '../FilmList'
import Snackbar from '../Snackbar'
import GetFilmsQuery from '../../graphql/GetFilmsQuery.graphql'
import Header from '../Header'
import FilmFormDialog from '../FilmFormDialog'

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
            // TODO handle error with a toast bar

            return (
              <Fragment>
                <Header films={films} loading={loading} />
                <Snackbar />
                <FilmFormDialog />
                <Grid container spacing={24}>
                  <FilmList films={this.getFilms(films, 'WATCH_LIST')} />
                  <FilmList films={this.getFilms(films, 'WISH_LIST')} />
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
}

export default FilmPicker
