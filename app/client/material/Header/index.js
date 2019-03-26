import React, { Component, Fragment } from 'react'
import omit from 'lodash-es/omit'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import TheatersIcon from '@material-ui/icons/Theaters'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  title: {
    flexGrow: 1
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
    const { films, loading } = this.props
    const disabled = !films || loading

    return (
      <Fragment>
        <IconButton
          disabled={disabled}
        >
          <AddIcon />
        </IconButton>
        <IconButton
          disabled={disabled}
        >
          <TheatersIcon />
        </IconButton>
        <IconButton
          disabled={disabled}
          onClick={() => this.exportFilms()}
        >
          <CloudDownloadIcon />
        </IconButton>
      </Fragment>
    )
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

export default withStyles(styles)(Header)
