import React, { Component, Fragment } from 'react'
import omit from 'lodash-es/omit'
import { connect } from 'tiny-atom/react'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import EjectIcon from '@material-ui/icons/Eject'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import TheatersIcon from '@material-ui/icons/Theaters'
import { withStyles } from '@material-ui/core/styles'

import pickFilms from '../../lib/pickFilms'
import user from '../../lib/user'

const actions = ['showSnackbar', 'showFilmForm']

const styles = {
  title: {
    flexGrow: 1
  }
}

function map (state) {
  return {
    userLoggedIn: !state.showLoginForm
  }
}

class Header extends Component {
  render () {
    const { classes } = this.props
    return (
      <AppBar>
        <Toolbar>
          <Typography
            variant='h6'
            color='inherit'
            className={classes.title}
          >
            Film picker
          </Typography>
          {this.renderButtons()}
        </Toolbar>
      </AppBar>
    )
  }

  renderButtons () {
    const { films, loading, userLoggedIn } = this.props
    const disabled = !films || loading || !userLoggedIn

    return (
      <Fragment>
        <IconButton
          color='inherit'
          disabled={disabled}
          onClick={() => this.showAddFilmDialog()}
        >
          <AddIcon />
        </IconButton>
        <IconButton
          color='inherit'
          disabled={disabled}
          onClick={() => this.pickFilms()}
        >
          <TheatersIcon />
        </IconButton>
        <IconButton
          color='inherit'
          disabled={disabled}
          onClick={() => this.exportFilms()}
        >
          <CloudDownloadIcon />
        </IconButton>
        <IconButton
          color='inherit'
          disabled={disabled}
          onClick={() => user.logout()}
        >
          <EjectIcon />
        </IconButton>
      </Fragment>
    )
  }

  pickFilms () {
    const { films: allFilms, showSnackbar } = this.props
    const films = allFilms.filter(film => film.parentList === 'WATCH_LIST')
    const { oldestFilm, randomFilm } = pickFilms(films)

    const Film = (name) => (
      <Typography
        inline
        variant='body2'
        color='primary'
      >
        {name}
      </Typography>
    )

    showSnackbar({
      open: true,
      message: <span>Watch {Film(randomFilm.name)} or {Film(oldestFilm.name)}</span>
    })
  }

  showAddFilmDialog () {
    this.props.showFilmForm({
      show: true,
      action: 'create',
      film: {
        name: '',
        isEnglishLanguage: true,
        isFiction: true,
        isClareFriendly: false
      }
    })
  }

  exportFilms () {
    const films = this.props.films.reduce(
      (memo, film) => ({
        ...memo,
        [film.id]: omit(film, ['__typename'])
      }),
      {}
    )

    const encodedFilms = encodeURIComponent(JSON.stringify({ films }))
    const encodedData = `text/json;charset=utf-8,${encodedFilms}`
    const downloadLink = document.createElement('a')

    downloadLink.display = 'hidden'
    downloadLink.setAttribute('href', `data:${encodedData}`)
    downloadLink.setAttribute('download', 'filmPickerExport.json')
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }
}

export default withStyles(styles)(
  connect(map, actions)(Header)
)
