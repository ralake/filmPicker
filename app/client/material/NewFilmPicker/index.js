import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
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
        <Header />
      </MuiThemeProvider>
    )
  }
}

export default FilmPicker
